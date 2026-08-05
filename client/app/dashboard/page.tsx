import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowRight,
  Wallet,
} from "lucide-react";
import Link from "next/link";

/** @description Datos placeholder hasta conectar con la base de datos */
const MOCK_BALANCE = 485750;
const MOCK_INCOME = 620000;
const MOCK_EXPENSES = 134250;

/** @description Últimas transacciones de ejemplo */
const MOCK_TRANSACTIONS = [
  {
    id: "1",
    description: "Supermercado",
    category: "Alimentación",
    amount: -12500,
    icon: "A",
    hue: 25,
  },
  {
    id: "2",
    description: "Salario",
    category: "Trabajo",
    amount: 620000,
    icon: "T",
    hue: 150,
  },
  {
    id: "3",
    description: "Netflix",
    category: "Entretenimiento",
    amount: -5999,
    icon: "E",
    hue: 275,
  },
  {
    id: "4",
    description: "Farmacia",
    category: "Salud",
    amount: -3200,
    icon: "S",
    hue: 200,
  },
  {
    id: "5",
    description: "Freelance",
    category: "Trabajo",
    amount: 45000,
    icon: "T",
    hue: 150,
  },
];

/**
 * @description Formatea un número como moneda ARS
 * @param amount — monto en centavos (entero)
 */
function formatCurrency(amount: number): string {
  const abs = Math.abs(amount);
  return `${amount < 0 ? "-" : ""}$${abs.toLocaleString("es-AR")}`;
}

/** @description Página principal del dashboard — balance, resumen y últimas transacciones */
export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      {/* Saludo personalizado */}
      <div>
        <h1 className="font-heading text-2xl text-foreground">Hola, Usuario</h1>
        <p className="text-sm text-muted-foreground">
          Resumen de tus finanzas este mes
        </p>
      </div>

      {/* Card de balance total */}
      <Card className="border-0 bg-primary text-primary-foreground">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Balance total</p>
              <p className="mt-1 font-mono text-3xl font-bold tracking-tight">
                {formatCurrency(MOCK_BALANCE)}
              </p>
            </div>
            <Link href="/cuentas">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-foreground/15 transition-colors hover:bg-primary-foreground/25">
                <Wallet className="h-5 w-5" />
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Grid de ingresos y gastos del mes */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-income">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">Ingresos</span>
            </div>
            <p className="mt-2 font-mono text-xl font-bold text-income">
              {formatCurrency(MOCK_INCOME)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 text-expense">
              <TrendingDown className="h-4 w-4" />
              <span className="text-sm font-medium">Gastos</span>
            </div>
            <p className="mt-2 font-mono text-xl font-bold text-expense">
              {formatCurrency(MOCK_EXPENSES)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Botón nueva transacción */}
      <Link href="/transacciones/crear" className="block">
        <Button className="w-full gap-2" size="lg">
          <Plus className="h-5 w-5" />
          Nueva transacción
        </Button>
      </Link>

      {/* Últimas transacciones */}
      <div className="pt-2">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold">Últimas transacciones</h2>
          <Link
            href="/transacciones"
            className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Ver todas
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="space-y-3">
          {MOCK_TRANSACTIONS.map((tx) => (
            <Card key={tx.id}>
              <CardContent className="flex items-center gap-4 p-4">
                {/* Badge de categoría */}
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-bold text-white"
                  style={{
                    backgroundColor: `oklch(0.55 0.15 ${tx.hue})`,
                  }}
                >
                  {tx.icon}
                </div>
                {/* Descripción y categoría */}
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium">
                    {tx.description}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {tx.category}
                  </p>
                </div>
                {/* Monto */}
                <span
                  className={`font-mono text-sm font-bold ${
                    tx.amount >= 0 ? "text-income" : "text-expense"
                  }`}
                >
                  {formatCurrency(tx.amount)}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}