import { copyFileSync, mkdirSync, readdirSync } from "node:fs";
import { defineConfig } from "tsup";

/*
 * bundle: false —— 逐文件输出，保留目录结构与每个文件顶部的 "use client"。
 * 打包成单文件会把指令指向整包，React Server Components 就无法按文件判断边界。
 */
export default defineConfig({
    entry: ["src/**/*.ts", "src/**/*.tsx"],
    outDir: "dist",
    format: ["esm"],
    bundle: false,
    dts: true,
    sourcemap: true,
    clean: true,
    target: "es2022",
    treeshake: false,
    onSuccess: async () => {
        // CSS 不经过打包器，原样复制
        mkdirSync("dist/styles", { recursive: true });
        for (const file of readdirSync("src/styles")) copyFileSync(`src/styles/${file}`, `dist/styles/${file}`);
    },
});
