import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/** @description Skeleton de carga del dashboard — replica la estructura de la página */
export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Balance card skeleton */}
      <Card className="border-0 bg-primary">
        <CardContent className="p-5">
          <Skeleton className="h-4 w-24 bg-primary-foreground/20" />
          <Skeleton className="mt-2 h-8 w-40 bg-primary-foreground/20" />
        </CardContent>
      </Card>

      {/* Grid ingresos/gastos skeleton */}
      <div className="grid grid-cols-2 gap-3">
        {[0, 1].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="mt-2 h-6 w-28" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Botón skeleton */}
      <Skeleton className="h-11 w-full rounded-md" />

      {/* Transacciones skeleton */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="space-y-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="flex items-center gap-3 p-3">
                <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-4 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}