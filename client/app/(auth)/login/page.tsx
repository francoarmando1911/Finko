/** @description Página de login de Finko */
import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Iniciar sesión — Finko",
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}