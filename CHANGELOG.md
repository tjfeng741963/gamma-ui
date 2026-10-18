# 变更记录

格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，版本号遵循 [SemVer](https://semver.org/lang/zh-CN/)。

0.x 期间 minor 版本可以包含破坏性变更，但必须在下面的条目里写清「破坏性变更」小节。

## [0.1.0] - 2026-10-18

首个版本，从 `VOZEB-PRO/web/src/components/gamma-ui` 抽出为独立包。

### 新增

- 基础能力：`GammaThemeProvider`（深浅主题 + 字体切换）、`GammaLinkProvider`（注入路由 Link）、`GammaLogo`（品牌可替换）、`cn`
- 控件：按钮、图标按钮、Chip、Tabs、Switch、Checkbox、Slider、Input、Badge、Select、表单字段与校验、上传、头像、分页、表格、骨架、快捷键提示
- 导航：22 个可形变导航图标 `GammaNavIcon`、窄图标栏 `GammaRail`、可收缩侧栏 `GammaSidebar`、命令面板、专业方向切换、工具行
- 内容：作品卡、任务卡、统计卡、横幅轮播、创作输入区、图表（面积 / 柱状 / 环形 / 热力 / 迷你趋势）
- 状态：Toast、Modal、Lightbox、Menu、Tooltip、空状态、任务状态、队列卡、审核提示、积分不足、错误页
- 动效与质感：路径形变图标、苹果风玻璃材质、Dock、磁吸 / 光弧 / 长按按钮、点击粒子特效、数字滚动
- 纯函数内核：`core/path-morph`、`core/chart-core`、`core/form-core`、`core/upload-core`

### 与抽取前的差异（接入方需要改的地方）

- `GammaMajorTabs`、`GammaComposer` 新增必填的 `subjects` 参数——专业列表不再内置
- 组件不再 `import "next/link"`：用 `GammaLinkProvider` 注入，或保持默认 `<a>`
- 组件内部不再 import CSS：需显式引入 `tokens.css` 与 `effects.css`
- 外链图片改为原生 `<img>`，不再依赖 `next/image`
