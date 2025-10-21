"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPostulationMetrics } from "../postulations.api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { buttonVariants } from "@/components/ui/button";

// Types and Interfaces
interface Postulation {
  id: number;
  empresa: string;
  puesto: string;
  estado: string;
  creadaEn: string;
}

interface Metrics {
  total: number;
  porEstado: Record<string, number>;
  agrupadas: Record<string, Postulation[]>;
}

interface StatCardProps {
  label: string;
  value: number;
}

interface KanbanColumnProps {
  title: string;
  postulaciones: Postulation[];
}

interface CardStyles {
  cardClass: string;
  titleClass: string;
  valueClass?: string;
  badgeClass?: string;
  emptyClass?: string;
}


const APPLICATION_STATES = [
  "Enviada",
  "Entrevista", 
  "Oferta",
  "Rechazada",
  "SinRespuesta"
] as const;

const STAT_CARD_STYLES: Record<string, CardStyles> = {
  Total: {
    cardClass: "bg-gradient-to-br from-slate-50 to-slate-100 border-slate-300",
    titleClass: "text-slate-600",
    valueClass: "text-slate-800"
  },
  Enviada: {
    cardClass: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300",
    titleClass: "text-blue-600",
    valueClass: "text-blue-800"
  },
  Entrevista: {
    cardClass: "bg-gradient-to-br from-amber-50 to-amber-100 border-amber-300",
    titleClass: "text-amber-600",
    valueClass: "text-amber-800"
  },
  Oferta: {
    cardClass: "bg-gradient-to-br from-green-50 to-green-100 border-green-300",
    titleClass: "text-green-600",
    valueClass: "text-green-800"
  },
  Rechazada: {
    cardClass: "bg-gradient-to-br from-red-50 to-red-100 border-red-300",
    titleClass: "text-red-600",
    valueClass: "text-red-800"
  },
  SinRespuesta: {
    cardClass: "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300",
    titleClass: "text-gray-600",
    valueClass: "text-gray-800"
  }
};

const KANBAN_COLUMN_STYLES: Record<string, CardStyles> = {
  Enviada: {
    cardClass: "bg-gradient-to-b from-blue-50/50 to-white border-blue-200",
    titleClass: "text-blue-700",
    badgeClass: "bg-blue-100 text-blue-700 border-blue-200",
    emptyClass: "border-blue-200 text-blue-600"
  },
  Entrevista: {
    cardClass: "bg-gradient-to-b from-amber-50/50 to-white border-amber-200",
    titleClass: "text-amber-700",
    badgeClass: "bg-amber-100 text-amber-700 border-amber-200",
    emptyClass: "border-amber-200 text-amber-600"
  },
  Oferta: {
    cardClass: "bg-gradient-to-b from-green-50/50 to-white border-green-200",
    titleClass: "text-green-700",
    badgeClass: "bg-green-100 text-green-700 border-green-200",
    emptyClass: "border-green-200 text-green-600"
  },
  Rechazada: {
    cardClass: "bg-gradient-to-b from-red-50/50 to-white border-red-200",
    titleClass: "text-red-700",
    badgeClass: "bg-red-100 text-red-700 border-red-200",
    emptyClass: "border-red-200 text-red-600"
  },
  SinRespuesta: {
    cardClass: "bg-gradient-to-b from-gray-50/50 to-white border-gray-200",
    titleClass: "text-gray-700",
    badgeClass: "bg-gray-100 text-gray-700 border-gray-200",
    emptyClass: "border-gray-200 text-gray-600"
  }
};


const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

const getStatCardStyles = (label: string): CardStyles => {
  return STAT_CARD_STYLES[label] || {
    cardClass: "bg-white border-gray-200",
    titleClass: "text-gray-500",
    valueClass: "text-gray-900"
  };
};

const getKanbanColumnStyles = (title: string): CardStyles => {
  return KANBAN_COLUMN_STYLES[title] || {
    cardClass: "bg-white border-gray-200",
    titleClass: "text-gray-900",
    badgeClass: "bg-gray-100 text-gray-600 border-gray-300",
    emptyClass: "border-gray-300 text-gray-500"
  };
};


function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse" />
        <p className="text-gray-600 font-medium">Cargando dashboard...</p>
      </div>
    </div>
  );
}

function BackButton() {
  return (
    <Link
      href="/"
      className="inline-flex items-center text-slate-200 hover:text-white font-medium transition-colors duration-200 text-sm"
      aria-label="Volver a la página principal"
    >
      <svg 
        className="w-4 h-4 mr-2" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M15 19l-7-7 7-7" 
        />
      </svg>
      Volver al inicio
    </Link>
  );
}

function DashboardHeader() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl p-8 mb-8 shadow-lg border border-slate-200">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 to-slate-900/50" />
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <BackButton />
            </div>
            <h1 className="text-3xl font-semibold text-white tracking-tight">
              Dashboard de Postulaciones
            </h1>
            <p className="text-slate-200 text-base mt-2 font-light">
              Vista general y seguimiento de tu proceso de búsqueda laboral
            </p>
          </div>
          <Link 
            href="/postulations/new" 
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium bg-white text-slate-700 hover:bg-slate-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          > 
            Nueva postulación
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: StatCardProps) {
  const styles = getStatCardStyles(label);

  return (
    <Card className={`text-center rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 ${styles.cardClass}`}>
      <CardHeader className="pb-2">
        <CardTitle className={`text-xs uppercase tracking-wide font-medium ${styles.titleClass}`}>
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl md:text-3xl font-semibold tracking-tight ${styles.valueClass}`}>
          {value}
        </div>
      </CardContent>
    </Card>
  );
}

function MetricsSection({ metrics }: { metrics: Metrics }) {
  return (
    <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-gray-200">
      <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
        <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3" />
        Métricas generales
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="Total" value={metrics.total} />
        {APPLICATION_STATES.map((estado) => (
          <StatCard
            key={estado}
            label={estado}
            value={metrics.porEstado[estado] || 0}
          />
        ))}
      </div>
    </div>
  );
}

function PostulationCard({ postulation }: { postulation: Postulation }) {
  return (
    <div className="group border border-gray-200 rounded-lg p-3 text-sm shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer bg-white hover:bg-gray-50 hover:border-gray-300">
      <div className="font-medium truncate text-gray-900">
        {postulation.empresa}
      </div>
      <div className="text-xs text-gray-600 truncate mt-1">
        {postulation.puesto}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <Badge 
          variant="outline" 
          className="text-xs px-2 py-1 border-gray-300 text-gray-600"
        >
          {formatDate(postulation.creadaEn)}
        </Badge>
      </div>
    </div>
  );
}

function KanbanColumn({ title, postulaciones }: KanbanColumnProps) {
  const styles = getKanbanColumnStyles(title);

  return (
    <Card className={`rounded-lg border shadow-sm ${styles.cardClass}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className={`text-sm font-medium ${styles.titleClass}`}>
            {title}
          </CardTitle>
          <Badge className={`text-xs px-2 py-1 ${styles.badgeClass}`}>
            {postulaciones.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[420px] space-y-2 pr-2">
          {postulaciones.length === 0 ? (
            <div className={`text-xs border border-dashed rounded-md p-4 text-center ${styles.emptyClass}`}>
              Sin elementos en esta columna
            </div>
          ) : (
            postulaciones.map((postulation) => (
              <PostulationCard 
                key={postulation.id} 
                postulation={postulation} 
              />
            ))
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function KanbanSection({ metrics }: { metrics: Metrics }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
        <span className="w-1.5 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mr-3" />
        Estado de postulaciones
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {APPLICATION_STATES.map((estado) => (
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

// Main Component
export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getPostulationMetrics();
        setMetrics(data);
      } catch (err) {
        console.error("Error cargando métricas:", err);
        setError("Error al cargar las métricas del dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    loadMetrics();
  }, []);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !metrics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error || "No se pudieron cargar las métricas"}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <DashboardHeader />
        <MetricsSection metrics={metrics} />
        <KanbanSection metrics={metrics} />
      </div>
    </div>
  );
}