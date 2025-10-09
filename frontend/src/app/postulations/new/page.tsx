import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PostulationsNewPage() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <Card>
        <CardContent className="p-6">
          <form className="space-y-4">
            <div>
              <Label>Nombre de la empresa</Label>
              <Input name="empresa" placeholder="Ej. Google" />
            </div>

            <div>
              <Label>Puesto</Label>
              <Input name="puesto" placeholder="Ej. Desarrollador Frontend" />
            </div>

            <div>
              <Label>Descripción</Label>
              <Input
                name="descripcion"
                placeholder="Ej. Proyecto con React y Next.js"
              />
            </div>

            <div>
              <Label>Link de la oferta</Label>
              <Input
                name="link"
                placeholder="https://ejemplo.com/oferta"
                type="url"
              />
            </div>

            <div>
              <Label>Imagen (logo o referencia)</Label>
              <Input
                name="image"
                placeholder="https://ejemplo.com/logo.png"
                type="url"
              />
            </div>

            <div>
              <Label>Fecha de entrevista</Label>
              <Input name="interviewAt" type="date" />
            </div>

            <div>
              <Label>Fecha de creación</Label>
              <Input name="createdAt" type="date" />
            </div>

            <button type="submit" className={buttonVariants()}>
              Guardar postulación
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
