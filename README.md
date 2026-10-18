# gamma-ui

布鲁伽马 BlueGamma 的设计系统与 React 组件库。面向设计与艺术类教育产品（创作工作台、课程、教师备课、数据看板），同时给主项目与后续配套项目共用。

- React 19 + Tailwind CSS 4，深 / 浅两套主题，全部颜色走 CSS 变量
- 组件自带 `"use client"`，可直接在 Next.js App Router 里用
- 不内置路由、不内置业务数据：链接组件可注入，专业列表等由使用方传入
- 逐文件 ESM 输出，支持 `@tjfeng741963/gamma-ui/button` 这样的子路径按需引入

## 安装

包发布在 GitHub Packages（私有）。项目根目录加 `.npmrc`：

```ini
@tjfeng741963:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

`NPM_TOKEN` 需要 `read:packages` 权限的 GitHub 个人访问令牌（classic token 勾选 `read:packages`；fine-grained token 需同时被授权访问本仓库）。CI / Docker 构建里用构建密钥注入，不要把令牌写进仓库。

```bash
pnpm add @tjfeng741963/gamma-ui
```

## 接入（三步）

**1. Tailwind 扫描产物 + 引入样式。** 组件用的是 Tailwind 类名，产物在 `node_modules` 里，Tailwind v4 默认不扫描，必须显式声明：

```css
/* app/globals.css */
@import "tailwindcss";
@source "../node_modules/@tjfeng741963/gamma-ui/dist";

@import "@tjfeng741963/gamma-ui/tokens.css";
@import "@tjfeng741963/gamma-ui/effects.css";
```

`@source` 的路径相对该 CSS 文件。样式**不会自动引入**——组件内部不 import CSS，必须显式引入这两行，否则拿到的是没有颜色的裸结构。

**2. 包一层主题容器。** 所有颜色与字体变量都定义在 `.gm` 下，不包就没有样式：

```tsx
import { GammaThemeProvider } from "@tjfeng741963/gamma-ui";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="zh-CN">
            <body>
                <GammaThemeProvider className="min-h-screen">{children}</GammaThemeProvider>
            </body>
        </html>
    );
}
```

主题与字体选择记在 `localStorage`（键前缀 `gamma`）。同域下有多个应用时传 `storagePrefix` 区分。

**3. （Next.js 可选）注入路由链接。** 不注入时链接渲染为 `<a>`，整页跳转；注入后拿到客户端跳转与预取：

```tsx
import Link from "next/link";
import { GammaLinkProvider, GammaThemeProvider } from "@tjfeng741963/gamma-ui";

<GammaLinkProvider component={Link}>
    <GammaThemeProvider>{children}</GammaThemeProvider>
</GammaLinkProvider>;
```

## 静态资源

组件库不打包图片，以下几项要放到使用方的 `public/`：

| 路径 | 用途 | 缺失时的表现 |
| --- | --- | --- |
| `/brand/bluegamma-mark.png` | 圆形 γ 标 | 破图；也可用 `brand` 参数换路径 |
| `/fonts/**` | 字体切片（MiSans / Inter / Noto Sans SC / Manrope / Geist / Geist Mono / 笑脸黑 / 霞鹜文楷） | 回落到系统字体，不报错 |

字体目录可以放在别处，用 `fontBaseUrl` 指过去：

```tsx
<GammaThemeProvider fontBaseUrl="/static/fonts">…</GammaThemeProvider>
```

品牌名、英文名与标图都能整体替换：

```tsx
<GammaLogo brand={{ name: "你的品牌", nameEn: "YOURS", mark: "/your-mark.png" }} />
```

## 业务数据由使用方提供

组件库只定义形状与配色，不固化某个产品的学科名单：

```tsx
import { GammaMajorTabs, gammaSubjectBySlug, type GammaSubject } from "@tjfeng741963/gamma-ui";

const SUBJECTS: GammaSubject[] = [/* 自己的专业列表 */];

<GammaMajorTabs subjects={SUBJECTS} value={slug} onChange={setSlug} />;
```

`GammaSubject` 需要 `slug / name / nameEn / tagline / outputs / styles / icon / accent / cover / cost / example` 这些字段；`accent` 从 `SUBJECT_ACCENT` 的六个键里取。

## 主题与 Token

所有颜色、圆角、阴影都是 `--gm-*` 变量，深浅两套在 `tokens.css` 里成对定义。给组件加样式时用变量，不要写死色值，否则浅色主题会糊。完整清单见 [docs/TOKENS.md](docs/TOKENS.md)。

Radix 的弹层要挂到最近的 `.gm` 容器里，否则会继承到 `<body>` 上，浅色主题下会变成深色。

## 开发

```bash
pnpm install
pnpm verify        # 类型检查 + lint + 格式 + 单测 + 构建 + 产物检查
pnpm test          # 只跑单测
pnpm build         # 输出 dist/，逐文件 ESM + .d.ts，保留 "use client"
```

### 仓库里不能出现的东西

`tests/boundary.test.ts` 会在 CI 里拦住：

- `next/`、`antd`、`@/` 别名、`app/` 业务路径的 import
- 硬编码的专业名单（`GAMMA_SUBJECTS`）与封面路径
- 除白名单（react / motion / lucide-react / radix-ui / clsx / tailwind-merge）以外的外部依赖
- 用了 hook 或事件处理但没写 `"use client"` 的组件

`tests/public-api.test.ts` 对 `src/index.ts` 的导出名做快照。删改导出会让 CI 失败，必须同步更新 CHANGELOG 再 `pnpm test -u` 重录。

## 发布

```bash
# 1. 改版本号与 CHANGELOG（0.x 期间 minor 可以有破坏性变更，但必须写清楚）
# 2. 合并到 main
# 3. 打标签，推送后 Actions 自动发布
git tag v0.2.0 && git push origin v0.2.0
```

发布工作流会校验：标签号等于 `package.json` 版本、CHANGELOG 有该版本条目、该版本未发布过、全部检查通过。任一不满足就拒绝发布。

## 目录

```
src/
  components/   组件（33 个文件，含导航图标、玻璃质感、形变动效）
  core/         纯函数：路径形变、图表几何、表单校验、上传校验
  styles/       tokens.css（设计变量）、effects.css（特效与玻璃）
  utils/cn.ts   clsx + tailwind-merge
  index.ts      统一导出
tests/          单测 + 边界检查 + 公开 API 快照
docs/TOKENS.md  设计变量清单
```

## 许可

私有，保留所有权利。见 [LICENSE](LICENSE)。
