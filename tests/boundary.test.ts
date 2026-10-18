import { readdirSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

import { describe, expect, it } from "vitest";

/*
 * 边界守卫：组件库是「通用件」，一旦混进某个产品的框架、路径别名或业务数据，
 * 下次复用就得再拆一遍。这几条规则就是为了让那次事故不可能发生。
 */

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "src");

function walk(dir: string): string[] {
    return readdirSync(dir).flatMap((name) => {
        const full = join(dir, name);
        return statSync(full).isDirectory() ? walk(full) : /\.(ts|tsx|css)$/.test(name) ? [full] : [];
    });
}

const files = walk(SRC).map((full) => {
    const raw = readFileSync(full, "utf8");
    // 注释里的示例代码（比如「这样注入 next/link」）不算依赖，先剥掉再检查
    const code = raw.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    return { path: relative(root, full).split("\\").join("/"), text: raw, code };
});

/** 依赖别的框架 / 业务路径的写法，一个都不能出现 */
const FORBIDDEN_IMPORTS: [RegExp, string][] = [
    [/from\s+["']next(\/[^"']*)?["']/g, "next 框架依赖"],
    [/from\s+["']antd[^"']*["']/g, "antd 依赖"],
    [/from\s+["']@\/[^"']*["']/g, "@/ 路径别名"],
    [/from\s+["'][^"']*\/app\/[^"']*["']/g, "业务 app/ 路径"],
    [/from\s+["'][^"']*\/components\/gamma-ui\//g, "主项目内部路径"],
];

describe("边界", () => {
    it.each(FORBIDDEN_IMPORTS)("源码里没有 %s", (pattern, label) => {
        const hits = files.filter((file) => new RegExp(pattern.source).test(file.code)).map((file) => file.path);
        expect(hits, `${label} 出现在这些文件里`).toEqual([]);
    });

    it("没有 hardcode 的专业名单与封面路径", () => {
        const hits = files.filter((file) => /GAMMA_SUBJECTS|style-thumbs/.test(file.text)).map((file) => file.path);
        expect(hits, "专业列表是业务数据，应由使用方传入").toEqual([]);
    });

    it("没有写死的品牌文案（品牌名由使用方通过 props 传入）", () => {
        // 允许 logo.tsx 里的默认值：那是可被 brand prop 整体替换的示例
        const hits = files.filter((file) => file.path !== "src/components/logo.tsx" && /布鲁伽马|BlueGamma/.test(file.code)).map((file) => file.path);
        expect(hits).toEqual([]);
    });

    it("用了 React hook 或事件处理的组件必须声明 use client", () => {
        const needsDirective = /use(State|Effect|Ref|Reducer|Memo|Callback|Context|SyncExternalStore)\(|onClick=|onChange=|motion\./;
        const missing = files.filter((file) => file.path.endsWith(".tsx") && needsDirective.test(file.text) && !file.text.startsWith('"use client";')).map((file) => file.path);
        expect(missing, "这些文件在 Next.js App Router 里会被当成服务端组件").toEqual([]);
    });

    it("只依赖白名单里的外部包", () => {
        const allowed = /^(react|react-dom|react\/.*|motion|motion\/.*|lucide-react|radix-ui|clsx|tailwind-merge|\.\.?\/.*|node:.*)$/;
        const bad = new Set<string>();
        for (const file of files) {
            for (const match of file.code.matchAll(/from\s+["']([^"']+)["']/g)) {
                if (!allowed.test(match[1])) bad.add(`${file.path} → ${match[1]}`);
            }
        }
        expect([...bad]).toEqual([]);
    });
});
