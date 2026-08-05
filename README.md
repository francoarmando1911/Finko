# Finko

App de finanzas personales. Controlá tus ingresos, gastos, cuentas y presupuestos con claridad.

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16, App Router, TypeScript, Turbopack |
| UI | Tailwind CSS v4 + shadcn/ui (preset Nova) |
| Tipografía | Geist (body), Geist Mono (montos), Archivo 800 Italic (títulos) |
| Base de datos | PostgreSQL en Neon (región São Paulo) |
| ORM | Prisma v6 con migraciones versionadas |
| Autenticación | Better Auth — email/contraseña + Google OAuth |
| Gráficos | Recharts |
| Deploy | Vercel |
| PWA | Web manifest, apple-touch-icon con ImageResponse |

## Estructura del proyecto

```
Finko/
├── client/                        ← Aplicación Next.js
│   ├── app/
│   │   ├── (auth)/                ← Login y registro
│   │   ├── dashboard/             ← Panel principal
│   │   ├── transacciones/         ← Listado y filtros
│   │   ├── cuentas/               ← Gestión de cuentas
│   │   ├── presupuestos/          ← Presupuestos por categoría
│   │   ├── reportes/              ← Gráficos y análisis
│   │   ├── actions/               ← Server actions
│   │   └── api/auth/[...all]/     ← Better Auth handler
│   ├── components/
│   │   ├── ui/                    ← shadcn/ui + custom
│   │   └── sections/              ← Secciones de landing
│   ├── lib/                       ← Auth, Prisma, utils
│   └── prisma/                    ← Schema y migraciones
├── .gitignore
├── LICENSE
└── README.md
```

## Roadmap

### MVP v1.0

- [x] Inicialización del proyecto y configuración base
- [ ] Schema de base de datos (Prisma)
- [ ] Autenticación (Better Auth + Google OAuth)
- [ ] Layout principal y navegación (Bottom Nav)
- [ ] Dashboard — balance, resumen mensual, evolución, últimas transacciones
- [ ] CRUD de transacciones — ingreso/gasto con categorías
- [ ] Gestión de cuentas — efectivo, banco, tarjeta, ahorros
- [ ] Presupuestos mensuales por categoría con barras de progreso
- [ ] Reportes — donut de gastos por categoría, comparación mensual
- [ ] PWA — manifest, iconos, standalone mode
- [ ] Deploy a Vercel

### Post-MVP

- [ ] Exportación de reportes (PDF/CSV)
- [ ] Metas de ahorro con tracking visual
- [ ] Transacciones recurrentes (suscripciones, alquiler)
- [ ] Multi-moneda ARS/USD con tipo de cambio
- [ ] Notificaciones de presupuesto excedido
- [ ] Categorización automática de transacciones

## Arquitectura

**Server components** para páginas que cargan datos. **Client components** (`"use client"`) para interactividad (formularios, filtros, gráficos, bottom nav).

**Server actions** en `app/actions/` para mutaciones. Validación server-side, nunca confiar en el cliente.

**API routes** solo cuando se necesita un endpoint REST (paginación, streaming).

**Loading states:** `loading.tsx` con skeletons en cada ruta que carga datos del servidor.

## Convenciones

- **Comentarios:** español, formato JSDoc (`/** @description */`)
- **Commits:** inglés, conventional commits (`feat:`, `fix:`, `refactor:`, `docs:`)
- **Branching:** GitHub Flow — feature branches desde `main` → squash-and-merge PR
- **Código:** archivos completos, listos para copiar y ejecutar

## Variables de entorno

```env
DATABASE_URL=
DIRECT_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Desarrollo local

```bash
cd client
cp .env.example .env    # Completar variables
npm install
npx prisma generate
npx prisma db push
npm run dev
```

## Licencia

MIT