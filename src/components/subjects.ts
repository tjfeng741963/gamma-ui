import type { LucideIcon } from "lucide-react";

/*
 * 专业方向的「形状」与配色表。具体有哪些专业是业务数据，由使用方提供并传入组件，
 * 组件库只约定字段与取色，避免把某个产品的学科名单固化进通用组件。
 */

export type SubjectAccent = "blue" | "cyan" | "indigo" | "teal" | "violet" | "sky";

export interface GammaSubject {
    slug: string;
    name: string;
    /** 英文名：卡片副标题与等宽装饰 */
    nameEn: string;
    tagline: string;
    /** 该方向常用的产出形态 */
    outputs: readonly string[];
    /** 代表性风格标签 */
    styles: readonly string[];
    icon: LucideIcon;
    accent: SubjectAccent;
    cover: string;
    badge?: "new" | "hot";
    /** 单次生成基础消耗积分 */
    cost: number;
    /** 「帮我写」示例提示词 */
    example: string;
}

export const SUBJECT_ACCENT: Record<SubjectAccent, { glow: string; chip: string; text: string }> = {
    blue: { glow: "rgba(0,80,245,0.42)", chip: "bg-[rgba(0,80,245,0.16)]", text: "text-[var(--gm-blue-text)]" },
    cyan: { glow: "rgba(40,235,250,0.34)", chip: "bg-[var(--gm-accent-soft)]", text: "text-[var(--gm-accent)]" },
    indigo: { glow: "rgba(99,102,241,0.38)", chip: "bg-[rgba(99,102,241,0.16)]", text: "text-[#7c83f5]" },
    teal: { glow: "rgba(45,212,191,0.32)", chip: "bg-[rgba(45,212,191,0.14)]", text: "text-[#14b8a6]" },
    violet: { glow: "rgba(139,92,246,0.34)", chip: "bg-[rgba(139,92,246,0.16)]", text: "text-[#9b7cf6]" },
    sky: { glow: "rgba(56,189,248,0.34)", chip: "bg-[rgba(56,189,248,0.14)]", text: "text-[#38a5e0]" },
};

/** 画面比例：设计类产出的常用比例 */
export const GAMMA_RATIOS = ["16:9", "4:3", "1:1", "3:4", "9:16"] as const;
export type GammaRatio = (typeof GAMMA_RATIOS)[number];

/** 在一组专业里按 slug 找；找不到回落到第一个 */
export function gammaSubjectBySlug(subjects: readonly GammaSubject[], slug: string) {
    return subjects.find((subject) => subject.slug === slug) ?? subjects[0];
}
