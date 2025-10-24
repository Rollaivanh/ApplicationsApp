"use client";

import { useEffect, useState } from "react";
import { getPostulationMetrics } from "../postulations.api";
import { DashboardHeader } from "./components/DashboardHeader";
import { LoadingState } from "./components/LoadingState";
import { MetricsSection } from "./components/MetricsSection";
import { KanbanSection } from "./components/Kanban/KanbanSection";

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        setIsLoading(true);
        const data = await getPostulationMetrics();
        setMetrics(data);
      } catch {
        setError("Error al cargar las métricas del dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    loadMetrics();
  }, []);

  if (isLoading) return <LoadingState />;
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );

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
