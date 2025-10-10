import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PostulationForm } from "./postulation-form";
import { getPostulation } from "../postulations.api";

interface Props {
  params: {
    id: string;
  };
}

export default async function PostulationsNewPage({ params }: Props) {
  const postulation = await getPostulation(params.id);

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-full max-w-2xl shadow-md">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-800">
            {params.id ? "Editar postulación" : "Registra tu postulación"}
          </h2>
        </CardHeader>

        <CardContent className="p-8">
          <PostulationForm postulation={postulation} />
        </CardContent>
      </Card>
    </div>
  );
}
