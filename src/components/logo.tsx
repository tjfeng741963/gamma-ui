import { cn } from "../utils/cn.js";

/*
 * 品牌标识。默认值是布鲁伽马，使用方可以整体替换：
 *   <GammaLogo brand={{ name: "你的品牌", nameEn: "YOURS", mark: "/your-mark.png" }} />
 * 图片本身放在使用方的静态目录，组件库不打包二进制资源。
 */

export interface GammaBrand {
    name: string;
    nameEn: string;
    /** 圆形标的图片地址，相对使用方的静态资源根目录 */
    mark: string;
}

export const GAMMA_BRAND: GammaBrand = {
    name: "布鲁伽马",
    nameEn: "BlueGamma",
    mark: "/brand/bluegamma-mark.png",
};

/** 品牌标识：圆形 γ 标 + 中英文字标 */
export function GammaLogo({ size = 32, showText = true, stacked = false, brand = GAMMA_BRAND, className }: { size?: number; showText?: boolean; stacked?: boolean; brand?: GammaBrand; className?: string }) {
    return (
        <span className={cn("inline-flex items-center gap-2.5", stacked && "flex-col gap-1.5", className)}>
            <img src={brand.mark} alt={brand.name} width={size} height={size} className="shrink-0 rounded-full shadow-[0_0_0_1px_rgba(40,235,250,0.25),0_6px_20px_rgba(0,80,245,0.45)]" />
            {showText ? (
                <span className={cn("flex flex-col leading-none", stacked && "items-center")}>
                    <span className="text-[15px] font-semibold tracking-[0.06em] text-[var(--gm-text)]">{brand.name}</span>
                    <span className="mt-1 text-[10px] font-medium tracking-[0.22em] text-[var(--gm-accent)] uppercase">{brand.nameEn}</span>
                </span>
            ) : null}
        </span>
    );
}
