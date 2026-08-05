import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Archivo } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { BottomNav } from "@/components/bottom-nav";
import { TopBar } from "@/components/top-bar";
import "./globals.css";

/** @description Fuente principal para body text */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/** @description Fuente monoespaciada para montos y datos numéricos */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** @description Fuente display para títulos — Archivo 800 Italic */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: "800",
  style: "italic",
});

export const metadata: Metadata = {
  title: "Finko — Control de finanzas personales",
  description:
    "Controlá tus ingresos, gastos, cuentas y presupuestos con claridad.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** @description Layout raíz — fuentes, tema, TopBar y BottomNav */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TopBar />
          <main className="flex-1 px-5 pb-24">{children}</main>
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}