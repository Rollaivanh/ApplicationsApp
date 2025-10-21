"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Props {
  register: any;
  errors: any;
  postulacion: any;
}

export function Step3InfoExtra({ register, postulacion }: Props) {
  return (
    <div className="grid gap-4">
      <div>
        <Label htmlFor="descripcion" className="mb-2 block">
          Descripción de la oferta
        </Label>
        <Textarea
          id="descripcion"
          rows={4}
          {...register("descripcion")}
          placeholder="Copiá el texto de la oferta si querés guardarlo"
        />
      </div>

      <div>
        <Label htmlFor="notas" className="mb-2 block">
          Notas adicionales
        </Label>
        <Textarea
          id="notas"
          rows={4}
          {...register("notas")}
          placeholder="Recordatorios, contactos, horarios, etc."
        />
      </div>
    </div>
  );
}
