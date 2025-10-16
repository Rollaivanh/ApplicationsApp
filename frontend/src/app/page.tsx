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
    <div className="p-6 space-y-6">
      {/* Bienvenida + frase */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">¡Hola Iván!</h1>
        <p className="text-muted-foreground">{frase}</p>
      </div>

      {/* Acciones rápidas */}
      <div className="flex flex-wrap gap-3">
        <Link href="/postulations/new" className={buttonVariants()}>
          + Nueva postulación
        </Link>
        <Link
          href="/postulations/dashboard"
          className={buttonVariants({ variant: "outline" })}
        >
          Ver Dashboard
        </Link>
      </div>

      {/* Últimas postulaciones */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Últimas postulaciones</h2>
        {postulations.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Todavía no cargaste ninguna postulación.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {postulations.slice(0, 3).map((postulation: any) => (
              <PostulationCard key={postulation.id} postulation={postulation} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
