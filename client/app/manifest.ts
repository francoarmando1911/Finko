import type { MetadataRoute } from "next";

/** @description Web App Manifest — configuración PWA de Finko */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Finko — Control de finanzas personales",
    short_name: "Finko",
    description:
      "Controlá tus ingresos, gastos, cuentas y presupuestos con claridad.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#1c0e10",
    theme_color: "#5c1a24",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}