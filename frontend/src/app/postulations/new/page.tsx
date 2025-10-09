import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PostulationForm } from "./postulation-form";

export default function PostulationsNewPage() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <Card>
        <CardHeader className="text center font bold text-lg">
          Registra tu postulacion
        </CardHeader>

        <CardContent className="p-6">
          <PostulationForm />
        </CardContent>
      </Card>
    </div>
  );
}
