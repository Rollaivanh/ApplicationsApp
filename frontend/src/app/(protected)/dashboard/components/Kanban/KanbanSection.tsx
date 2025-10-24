import { KanbanColumn } from "./KanbanColumn";

export function KanbanSection({ metrics }: { metrics: any }) {
  const APPLICATION_STATES = ["Enviada", "Entrevista", "Oferta", "Rechazada", "SinRespuesta"];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
        <span className="w-1.5 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mr-3" />
        Estado de postulaciones
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {APPLICATION_STATES.map((estado) => (
          <KanbanColumn key={estado} title={estado} postulaciones={metrics.agrupadas[estado] || []} />
        ))}
      </div>
    </div>
  );
}
