"use client";

import type { AnchorHTMLAttributes, ComponentType, ReactNode } from "react";
import { createContext, createElement, useContext } from "react";

/*
 * 链接注入：组件库不依赖任何路由库。
 * 默认渲染 <a>；Next.js / React Router 项目在根部注入自己的 Link，就能拿到客户端跳转与预取。
 *
 *   import Link from "next/link";
 *   <GammaLinkProvider component={Link}>…</GammaLinkProvider>
 */

export type GammaLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children?: ReactNode };
export type GammaLinkComponent = ComponentType<GammaLinkProps>;

function PlainLink({ href, children, ...rest }: GammaLinkProps) {
    return (
        <a href={href} {...rest}>
            {children}
        </a>
    );
}

const LinkContext = createContext<GammaLinkComponent>(PlainLink);

export function GammaLinkProvider({ component, children }: { component: GammaLinkComponent; children: ReactNode }) {
    return <LinkContext.Provider value={component}>{children}</LinkContext.Provider>;
}

/** 组件内部用它渲染链接，而不是直接 import 路由库 */
export function useGammaLink() {
    return useContext(LinkContext);
}

/**
 * 组件库内部的链接元素。单独包一层而不是在各处 `const Link = useGammaLink()`：
 * 后者每次渲染都会生成新的组件类型，React 会把整棵子树重新挂载。
 */
export function GammaLink({ children, ...props }: GammaLinkProps) {
    return createElement(useGammaLink(), props, children);
}
