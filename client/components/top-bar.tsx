"use client";

/** @description Barra superior — logo de Finko + controles de usuario */
import { usePathname } from "next/navigation";
import { FinkoLogo } from "./finko-logo";
import { ThemeToggle } from "./theme-toggle";
import { UserMenu } from "./user-menu";

/** @description Rutas donde NO se muestra el top bar */
const HIDDEN_ROUTES = ["/login", "/registro"];

export function TopBar() {
  const pathname = usePathname();

  /* No mostrar en rutas de auth */
  if (HIDDEN_ROUTES.some((route) => pathname.startsWith(route))) {
    return null;
  }

  return (
    <header className="flex items-center justify-between px-5 pb-5 pt-5">
      <FinkoLogo />
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}