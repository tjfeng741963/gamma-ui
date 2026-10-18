/*
 * 统一入口。也可以按子路径按需引入，例如：
 *   import { GammaButton } from "@tjfeng741963/gamma-ui/button";
 * 样式需要单独引入一次：
 *   import "@tjfeng741963/gamma-ui/tokens.css";
 *   import "@tjfeng741963/gamma-ui/effects.css";
 */

// 基础能力
export * from "./utils/cn";
export * from "./components/link";
export * from "./components/theme";
export * from "./components/fonts";
export * from "./components/logo";
export * from "./components/subjects";

// 控件
export * from "./components/button";
export * from "./components/controls";
export * from "./components/select";
export * from "./components/form";
export * from "./components/upload";
export * from "./components/data";

// 导航与骨架
export * from "./components/nav-icon";
export * from "./components/shell";
export * from "./components/sidebar";
export * from "./components/command";
export * from "./components/major-tabs";
export * from "./components/tool-row";

// 内容与业务形态
export * from "./components/cards";
export * from "./components/hero";
export * from "./components/composer";
export * from "./components/charts";

// 状态与反馈
export * from "./components/overlays";
export * from "./components/states";
export * from "./components/state-views";
export * from "./components/skeletons";
export * from "./components/generation-states";
export * from "./components/error-page";

// 动效与质感
export * from "./components/motion";
export * from "./components/burst";
export * from "./components/glass";
export * from "./components/material";
export * from "./components/hero-buttons";
export * from "./components/icon-morph";
export * from "./components/morph-icon";

// 纯函数内核（也可从 ./core/* 子路径单独引入）
export * from "./core/chart-core";
export * from "./core/form-core";
export * from "./core/path-morph";
export * from "./core/upload-core";
