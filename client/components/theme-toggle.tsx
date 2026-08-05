"use client";

/** @description Botón toggle de tema claro/oscuro */
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  /* Evitar hydration mismatch */
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent"
      aria-label="Cambiar tema"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}