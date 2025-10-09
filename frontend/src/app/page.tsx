import Link from "next/link";
import { buttonVariants } from "../components/ui/button";
import { getPostulations } from "../app/postulations/postulations.api";
import { PostulationCard } from "../app/postulations/postulation-card";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const postulations = await getPostulations();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Postulaciones</h1>
        <Link href="/postulations/new" className={buttonVariants()}>
          Crear nueva postulación
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {postulations.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No hay postulaciones registradas aún.
          </p>
        ) : (
          postulations.map((postulation: any) => (
            <PostulationCard key={postulation.id} postulation={postulation} />
          ))
        )}
      </div>
    </div>
  );
}
