import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getPostulations } from "../app/postulations/postulations.api";
import { PostulationCard } from "../app/postulations/postulation-card";

export const dynamic = "force-dynamic";

const frases = [
  "Tu próximo empleo está a una postulación de distancia.",
  "Cada rechazo es una redirección. Seguimos adelante.",
  "Aplicar todos los días te acerca a tu meta.",
  "No dejes de intentarlo. El siguiente sí puede ser el definitivo.",
];

function obtenerFraseAleatoria() {
  return frases[Math.floor(Math.random() * frases.length)];
}

export default async function HomePage() {
  const postulations = await getPostulations();
  const frase = obtenerFraseAleatoria();

  console.log("postulations", postulations);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header con bienvenida */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl p-8 mb-8 shadow-lg border border-slate-200">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 to-slate-900/50"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <h1 className="text-3xl font-semibold text-white tracking-tight">
                  Bienvenido, Iván
                </h1>
                <p className="text-slate-200 text-base max-w-2xl leading-relaxed font-light">
                  {frase}
                </p>
              </div>
              <div className="hidden md:block">
                <div className="w-20 h-20 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <div className="w-8 h-8 bg-white/30 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <span className="w-1.5 h-1.5 bg-slate-600 rounded-full mr-3"></span>
            Acciones rápidas
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link 
              href="/postulations/new" 
              className={`${buttonVariants()} px-5 py-2.5 text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200`}
            >
              Nueva postulación
            </Link>
            <Link
              href="/postulations/dashboard"
              className={`${buttonVariants({ variant: "outline" })} px-5 py-2.5 text-sm font-medium border border-gray-300 hover:border-slate-600 hover:bg-slate-50 transition-all duration-200`}
            >
              Ver Dashboard
            </Link>
          </div>
        </div>

        {/* Últimas postulaciones */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <span className="w-1.5 h-1.5 bg-slate-600 rounded-full mr-3"></span>
              Últimas postulaciones
            </h2>
            <div className="text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200 font-medium">
              {postulations.length} total
            </div>
          </div>
          
          {postulations.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4 border border-gray-200">
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
              </div>
              <p className="text-gray-600 text-base font-medium">
                No hay postulaciones registradas
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Comience creando su primera postulación
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {postulations.slice(0, 4).map((postulation: any) => (
                <div key={postulation.id} className="transform transition-all duration-200 hover:shadow-md">
                  <PostulationCard postulation={postulation} />
                </div>
              ))}
            </div>
          )}
          
          {postulations.length > 4 && (
            <div className="mt-6 text-center">
              <Link
                href="/postulations/dashboard"
                className="inline-flex items-center text-slate-600 hover:text-slate-800 font-medium transition-colors duration-200 text-sm"
              >
                Ver todas las postulaciones
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
