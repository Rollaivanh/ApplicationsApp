"use client";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { createPostulation } from "../postulations.api";
import { useRouter } from "next/navigation";
export function PostulationForm() {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    try {
      await createPostulation(data);
      reset();
      alert(" Postulación creada correctamente");
    } catch (err) {
      alert(" Error al crear la postulación");
    }
    router.push("/");
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
        <Label>Nombre de la empresa</Label>
        <Input {...register("empresa", { required: true })} />
      </div>

      <div>
        <Label>Puesto</Label>
        <Input {...register("puesto", { required: true })} />
      </div>

      <div>
        <Label>Descripción</Label>
        <Input {...register("descripcion")} />
      </div>

      <div>
        <Label>Link de la oferta</Label>
        <Input {...register("link")} />
      </div>

      <div>
        <Label>Imagen (logo o referencia)</Label>
        <Input {...register("image")} />
      </div>

      <div>
        <Label>Fecha de entrevista</Label>
        <Input type="date" {...register("interviewAt")} />
      </div>

      <button type="submit" className={buttonVariants()}>
        Guardar postulación
      </button>
    </form>
  );
}
