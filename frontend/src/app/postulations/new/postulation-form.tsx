"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { createPostulation, updatePostulation } from "../postulations.api";
import { useParams, useRouter } from "next/navigation";

export function PostulationForm({ postulation }: any) {
  console.log(postulation);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      empresa: postulation.empresa,
      puesto: postulation.puesto,
      descripcion: postulation.descripcion,
      link: postulation.link,
      image: postulation.image,
      interviewAt: postulation.interviewAt,
    },
  });
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const onSubmit = handleSubmit(async (data) => {
    if (params?.id) {
      await updatePostulation(params.id, { ...data });
    } else {
      await createPostulation({ ...data });
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

      <Button>{params.id ? "Editar" : "Crear"}</Button>
    </form>
  );
}
