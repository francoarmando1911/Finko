import { redirect } from "next/navigation";

/** @description Página raíz — redirige al dashboard */
export default function HomePage() {
  redirect("/dashboard");
}