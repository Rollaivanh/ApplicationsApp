"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Step1InfoBasica } from "../steps/Step1InfoBasica";
import { Step2EstadoFecha } from "../steps/Step2EstadoFecha";
import { Step3InfoExtra } from "../steps/Step3InfoExtra";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createPostulation } from "../postulations.api";

export function FormularioPostulacion({ postulacion }: { postulacion?: any }) {
  const [paso, setPaso] = useState(1);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      empresa: postulacion?.empresa || "",
      puesto: postulacion?.puesto || "",
      link: postulacion?.link || "",
      estado: postulacion?.estado || "",
      fechaEntrevista: postulacion?.fechaEntrevista || "",
      descripcion: postulacion?.descripcion || "",
    },
  });

  function avanzarPaso() {
    setPaso((prev) => Math.min(prev + 1, 3));
  }

  function retrocederPaso() {
    setPaso((prev) => Math.max(prev - 1, 1));
  }

  async function onSubmit(data: any) {
    console.log("✅ Datos completos:", data);

    try {
      await createPostulation(data); // 👈 Envío real a la API
      router.push("/postulations/dashboard"); // 👈 Redirección al dashboard
    } catch (error) {
      console.error("❌ Error al crear la postulación:", error);
      alert("Ocurrió un error al guardar la postulación.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6"
    >
      <div className="text-lg font-bold text-center">
        {paso === 1 && "Paso 1: Información básica"}
        {paso === 2 && "Paso 2: Estado y entrevista"}
        {paso === 3 && "Paso 3: Información adicional"}
      </div>

      {paso === 1 && (
        <Step1InfoBasica
          postulacion={postulacion}
          register={register}
          errors={errors}
        />
      )}
      {paso === 2 && (
        <Step2EstadoFecha
          postulacion={postulacion}
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
      )}
      {paso === 3 && (
        <Step3InfoExtra
          postulacion={postulacion}
          register={register}
          errors={errors}
        />
      )}

      <div className="flex justify-between">
        {paso > 1 ? (
          <Button type="button" variant="outline" onClick={retrocederPaso}>
            Anterior
          </Button>
        ) : (
          <div />
        )}

        {paso < 3 ? (
          <Button type="button" onClick={avanzarPaso}>
            Siguiente
          </Button>
        ) : (
          <Button type="submit">Guardar postulación</Button>
        )}
      </div>
    </form>
  );
}
