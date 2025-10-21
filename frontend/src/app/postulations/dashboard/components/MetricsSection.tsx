import { StatCard } from "./StatCard";

export function MetricsSection({ metrics }: { metrics: any }) {
  const APPLICATION_STATES = ["Enviada", "Entrevista", "Oferta", "Rechazada", "SinRespuesta"];

  return (
    <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-gray-200">
      <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
        <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3" />
        Métricas generales
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="Total" value={metrics.total} />
        {APPLICATION_STATES.map((estado) => (
          <StatCard key={estado} label={estado} value={metrics.porEstado[estado] || 0} />
        ))}
      </div>
    </div>
  );
}
