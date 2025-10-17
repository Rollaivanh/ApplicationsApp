"use client";

import { useEffect, useState } from "react";
import { getPostulationMetrics } from "../postulations.api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

type Postulation = {
  id: number;
  empresa: string;
  puesto: string;
  estado: string;
  creadaEn: string;
};

type Metrics = {
  total: number;
  porEstado: Record<string, number>;
  agrupadas: Record<string, Postulation[]>;
};

const estados = ["Enviada", "Entrevista", "Oferta", "Rechazada", "SinRespuesta"];

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    getPostulationMetrics()
      .then(setMetrics)
      .catch((err: any) => console.error("Error cargando métricas", err));
  }, []);

  if (!metrics) return <p className="p-6">Cargando dashboard...</p>;

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground/70 bg-clip-text text-transparent">
            Dashboard de Postulaciones
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Vista general y seguimiento de tu proceso de búsqueda laboral
          </p>
        </div>
        <Link href="/postulations/new" className={buttonVariants({ variant: "default" })}> 
          + Nueva postulación
        </Link>
      </div>

      {/* Tarjetas de métricas */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="Total" value={metrics.total} />
        {estados.map((estado) => (
          <StatCard
            key={estado}
            label={estado}
            value={metrics.porEstado[estado] || 0}
          />
        ))}
      </div>

      {/* Columnas tipo Kanban */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {estados.map((estado) => (
          <KanbanColumn
            key={estado}
            title={estado}
            postulaciones={metrics.agrupadas[estado] || []}
          />
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card className="text-center rounded-xl border-muted/30 shadow-sm hover:shadow-md hover:border-foreground/20 transition-all bg-background/60">
      <CardHeader className="pb-2">
        <CardTitle className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground/90">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl md:text-3xl font-semibold tracking-tight">{value}</div>
      </CardContent>
    </Card>
  );
}

function KanbanColumn({
  title,
  postulaciones,
}: {
  title: string;
  postulaciones: Postulation[];
}) {
  return (
    <Card className="rounded-xl border-muted/30 shadow-sm bg-background/60">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-foreground/90">{title}</CardTitle>
          <Badge variant="outline" className="text-[10px] px-2 py-0.5 border-muted/40">
            {postulaciones.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[420px] space-y-2 pr-2">
          {postulaciones.length === 0 ? (
            <div className="text-xs text-muted-foreground border border-dashed rounded-md p-4 text-center border-muted/40">
              Sin elementos en esta columna
            </div>
          ) : (
            postulaciones.map((p) => (
              <div
                key={p.id}
                className="group border rounded-lg p-3 text-sm shadow-sm hover:shadow-md transition-all cursor-pointer bg-background/70 hover:bg-background border-muted/30 hover:border-foreground/20 hover:-translate-y-[1px]"
              >
                <div className="font-semibold truncate">{p.empresa}</div>
                <div className="text-xs text-muted-foreground truncate">{p.puesto}</div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] px-2 py-0.5 border-muted/40">
                    {new Date(p.creadaEn).toLocaleDateString()}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
