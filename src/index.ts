/*
 * 统一入口。也可以按子路径按需引入，例如：
 *   import { GammaButton } from "@tjfeng741963/gamma-ui/button";
 * 样式需要单独引入一次：
 *   import "@tjfeng741963/gamma-ui/tokens.css";
 *   import "@tjfeng741963/gamma-ui/effects.css";
 */

// 基础能力
export * from "./utils/cn.js";
export * from "./components/link.js";
export * from "./components/theme.js";
export * from "./components/fonts.js";
export * from "./components/logo.js";
export * from "./components/subjects.js";

// 控件
export * from "./components/button.js";
export * from "./components/controls.js";
export * from "./components/select.js";
export * from "./components/form.js";
export * from "./components/upload.js";
export * from "./components/data.js";

// 导航与骨架
export * from "./components/nav-icon.js";
export * from "./components/shell.js";
export * from "./components/sidebar.js";
export * from "./components/command.js";
export * from "./components/major-tabs.js";
export * from "./components/tool-row.js";

// 内容与业务形态
export * from "./components/cards.js";
export * from "./components/hero.js";
export * from "./components/composer.js";
export * from "./components/charts.js";

// 状态与反馈
export * from "./components/overlays.js";
export * from "./components/states.js";
export * from "./components/state-views.js";
export * from "./components/skeletons.js";
export * from "./components/generation-states.js";
export * from "./components/error-page.js";

// 动效与质感
export * from "./components/motion.js";
export * from "./components/burst.js";
export * from "./components/glass.js";
export * from "./components/material.js";
export * from "./components/hero-buttons.js";
export * from "./components/icon-morph.js";
export * from "./components/morph-icon.js";

// 纯函数内核（也可从 ./core/* 子路径单独引入）
export * from "./core/chart-core.js";
export * from "./core/form-core.js";
export * from "./core/path-morph.js";
export * from "./core/upload-core.js";
