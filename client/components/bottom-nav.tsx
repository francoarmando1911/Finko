"use client";

/** @description Barra de navegación inferior mobile-first con FAB central para nueva transacción */
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Plus,
  PiggyBank,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

/** @description Items de navegación del bottom nav */
const NAV_ITEMS: {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  isFab?: boolean;
}[] = [
  { href: "/dashboard", label: "Inicio", icon: LayoutDashboard },
  { href: "/transacciones", label: "Movimientos", icon: ArrowLeftRight },
  { href: "/transacciones/crear", label: "Nueva", icon: Plus, isFab: true },
  { href: "/presupuestos", label: "Presupuestos", icon: PiggyBank },
  { href: "/reportes", label: "Reportes", icon: BarChart3 },
];

/** @description Rutas donde NO se muestra el bottom nav */
const HIDDEN_ROUTES = ["/login", "/registro"];

export function BottomNav() {
  const pathname = usePathname();

  /* No mostrar en rutas de auth */
  if (HIDDEN_ROUTES.some((route) => pathname.startsWith(route))) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/80 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60">
      <div className="mx-auto flex max-w-md items-center justify-around pb-[env(safe-area-inset-bottom)] px-2 pt-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          /* FAB central para nueva transacción */
          if (item.isFab) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-center -mt-5"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/25 transition-transform active:scale-95">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-2 transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon
                className={cn("h-5 w-5", isActive && "text-primary")}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}