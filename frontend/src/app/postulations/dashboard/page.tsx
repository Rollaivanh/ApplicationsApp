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
  status: string;
  createdAt: string;
};

type Metrics = {
  total: number;
  porEstado: Record<string, number>;
  agrupadas: Record<string, Postulation[]>;
};

const estados = [
  "Aplicada",
  "Entrevista",
  "Oferta",
  "Rechazada",
  "SinRespuesta",
];

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    getPostulationMetrics()
      .then(setMetrics)
      .catch((err: any) => console.error("Error cargando métricas", err));
  }, []);

  if (!metrics) return <p className="p-6">Cargando dashboard...</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard de Postulaciones</h1>
        <Link href="/postulations/new" className={buttonVariants()}>
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
    <Card className="text-center">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent className="text-2xl font-bold">{value}</CardContent>
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
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] space-y-2 pr-2">
          {postulaciones.map((p) => (
            <div
              key={p.id}
              className="border rounded p-2 text-sm shadow-sm hover:shadow transition cursor-pointer"
            >
              <div className="font-semibold">{p.empresa}</div>
              <div className="text-xs text-muted-foreground">{p.puesto}</div>
              <Badge variant="outline" className="mt-1 text-[10px]">
                {new Date(p.createdAt).toLocaleDateString()}
              </Badge>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
