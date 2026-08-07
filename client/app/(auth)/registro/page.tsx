/** @description Página de registro de Finko */
import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Creá tu cuenta — Finko",
};

export default function RegistroPage() {
  return <AuthForm mode="register" />;
}