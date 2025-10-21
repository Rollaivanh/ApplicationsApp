"use client";

import { Input } from "@/app/postulations/dashboard/components/ui/input";
import { Label } from "@/app/postulations/dashboard/components/ui/label";

interface Props {
  register: any;
  errors: any;
  postulacion: any;
}

export function Step1InfoBasica({ register, errors, postulacion }: Props) {
  return (
    <div className="grid gap-4">
      <div>
        <Label htmlFor="empresa">Empresa *</Label>
        <Input id="empresa" {...register("empresa", { required: true })} />
        {errors.empresa && (
          <p className="text-red-500 text-sm">Este campo es obligatorio.</p>
        )}
      </div>

      <div>
        <Label htmlFor="puesto">Puesto *</Label>
        <Input id="puesto" {...register("puesto", { required: true })} />
        {errors.puesto && (
          <p className="text-red-500 text-sm">Este campo es obligatorio.</p>
        )}
      </div>

      <div>
        <Label htmlFor="link">URL de la oferta</Label>
        <Input id="link" {...register("link")} />
      </div>
    </div>
  );
}
