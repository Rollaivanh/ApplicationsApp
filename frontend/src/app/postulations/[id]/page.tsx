import { getPostulation } from "@/app/postulations/postulations.api";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

async function postulationDetail({ params }: { params: { id: string } }) {
  const postulation: Postulation = await getPostulation(params.id);

  const formattedDate = postulation.interviewAt
    ? new Date(postulation.interviewAt).toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Sin fecha asignada";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="text-center border-b pb-4">
          <CardTitle className="text-lg font-semibold text-gray-800">
            {postulation.empresa}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 p-6">
          <div>
            <p className="text-sm text-gray-500">Puesto</p>
            <p className="text-base font-medium">{postulation.puesto}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Descripción</p>
            <p className="text-base">{postulation.descripcion}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Fecha de entrevista</p>
            <p className="text-base font-medium">{formattedDate}</p>
          </div>

          {postulation.image && (
            <img
              src={postulation.image}
              alt={postulation.empresa}
              className="w-full h-48 object-cover rounded-md border mt-4"
            />
          )}

          <div className="flex justify-center mt-6">
            <Link className={buttonVariants()} href="/">
              Volver
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default postulationDetail;
