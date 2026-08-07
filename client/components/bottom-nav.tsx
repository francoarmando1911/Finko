"use client";

/** @description Barra de navegación inferior mobile-first con FAB central centrado y estados interactivos */
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

/** @description Tipo de item del bottom nav */
interface NavItem {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  isFab?: boolean;
}

/** @description Items de navegación — el FAB central no tiene label visible */
const NAV_ITEMS: NavItem[] = [
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
      <div className="mx-auto grid max-w-md grid-cols-5 pb-[env(safe-area-inset-bottom)]">
        {NAV_ITEMS.map((item) => {
          const isActive =
            !item.isFab &&
            (pathname === item.href || pathname.startsWith(item.href + "/"));
          const Icon = item.icon;

          /* FAB central para nueva transacción */
          if (item.isFab) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-center"
              >
                <div className="flex h-14 w-14 -mt-5 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30 transition-all duration-200 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 active:scale-95">
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
                "group flex flex-col items-center justify-center gap-0.5 py-2 transition-colors duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {/* Indicador de fondo al hover */}
              <div
                className={cn(
                  "flex h-8 w-12 items-center justify-center rounded-2xl transition-all duration-200",
                  isActive
                    ? "bg-primary/10"
                    : "group-hover:bg-muted group-active:bg-muted/80"
                )}
              >
                <Icon
                  className="h-5 w-5 transition-all duration-200"
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
              </div>
              <span
                className={cn(
                  "text-[10px] transition-all duration-200",
                  isActive ? "font-bold" : "font-medium group-hover:text-foreground"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}