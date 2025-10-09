import Link from "next/link";
import { buttonVariants } from "../components/ui/button";

export default function HomePage() {
  return (
    <div className="flex justify-between p-6">
      <h1 className="text-2xl font-bold mb-4">POSTULACIONES</h1>
      <Link href="/postulations/new" className={buttonVariants()}>
        Crear nueva postulación
      </Link>
    </div>
  );
}
