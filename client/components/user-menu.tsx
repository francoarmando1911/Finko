"use client";

/** @description Menú desplegable del usuario — avatar con opciones de cuenta y cierre de sesión */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut } from "lucide-react";

export function UserMenu() {
  /** @description Placeholder — se reemplaza con Better Auth signOut */
  const handleLogout = () => {
    console.log("TODO: implementar cierre de sesión");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent"
        aria-label="Menú de usuario"
      >
        <User className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem className="gap-2">
          <User className="h-4 w-4" />
          Mi perfil
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Settings className="h-4 w-4" />
          Configuración
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-destructive" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}