import Link from "next/link";
import { BackButton } from "./BackButton";

export function DashboardHeader() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl p-8 mb-8 shadow-lg border border-slate-200">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 to-slate-900/50" />
      <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <BackButton />
          <h1 className="text-3xl font-semibold text-white tracking-tight mt-3">
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
  );
}
