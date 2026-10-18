/*
 * 构建产物检查：发布前最后一道闸。
 *   1. 每个用 hook / 事件的组件产物都保留了 "use client"
 *   2. 产物里不出现 next / antd / 业务路径
 *   3. CSS 已复制到 dist/styles
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const errors = [];

const components = readdirSync(join(DIST, "components"));
for (const name of components.filter((n) => n.endsWith(".js"))) {
    const file = join(DIST, "components", name);
    const text = readFileSync(file, "utf8");
    if (/next\/|antd|@\/|app\//.test(text)) errors.push(`${file} 含有越界依赖`);
    const needsClient = /use(State|Effect|Ref|Reducer|Memo|Callback|Context)\(|onClick|motion\./.test(text);
    if (needsClient && !text.startsWith('"use client"')) errors.push(`${file} 缺少 "use client"`);
}
for (const css of ["tokens.css", "effects.css"]) {
    if (!existsSync(join(DIST, "styles", css))) errors.push(`dist/styles/${css} 缺失`);
}
if (!existsSync(join(DIST, "index.js")) || !existsSync(join(DIST, "index.d.ts"))) errors.push("入口产物缺失");

if (errors.length) {
    console.error(`✖ 产物检查失败：\n- ${errors.join("\n- ")}`);
    process.exit(1);
}
console.log(`✔ 产物检查通过：${components.filter((n) => n.endsWith(".js")).length} 个组件，CSS 与入口齐全`);
