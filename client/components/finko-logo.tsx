/** @description Logo de Finko — ícono cuadrado burgundy con "F." + texto */
import { cn } from "@/lib/utils";

interface FinkoLogoProps {
  /** @description Mostrar solo el ícono sin texto */
  iconOnly?: boolean;
  /** @description Tamaño del logo: sm (32px), md (36px), lg (48px), xl (64px) */
  size?: "sm" | "md" | "lg" | "xl";
  /** @description Clases CSS adicionales */
  className?: string;
}

/** @description Tamaños del ícono y tipografía del logo */
const SIZES = {
  sm: { box: "h-8 w-8", text: "text-xs", label: "text-lg" },
  md: { box: "h-9 w-9", text: "text-sm", label: "text-xl" },
  lg: { box: "h-12 w-12", text: "text-base", label: "text-2xl" },
  xl: { box: "h-16 w-16", text: "text-xl", label: "text-3xl" },
} as const;

export function FinkoLogo({
  iconOnly = false,
  size = "md",
  className,
}: FinkoLogoProps) {
  const s = SIZES[size];

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-xl",
          s.box
        )}
        style={{ backgroundColor: "#5c1a24" }}
      >
        <span
          className={cn("font-bold text-white", s.text)}
          style={{ fontFamily: "var(--font-archivo), serif" }}
        >
          F.
        </span>
      </div>
      {!iconOnly && (
        <span className={cn("font-heading text-foreground", s.label)}>
          Finko
        </span>
      )}
    </div>
  );
}