import {
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const estados = [
  { label: "Enviada", value: "Enviada" },
  { label: "Entrevista", value: "Entrevista" },
  { label: "Oferta", value: "Oferta" },
  { label: "Rechazada", value: "Rechazada" },
  { label: "Sin respuesta", value: "SinRespuesta" },
];

interface Props {
  postulacion?: any;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
}

export function Step2EstadoFecha({
  postulacion,
  register,
  errors,
  watch,
  setValue,
}: Props) {
  const estadoActual = watch("estado");

  return (
    <div className="space-y-6">
      <div>
        <Label className="block mb-2 text-sm font-semibold">Estado</Label>
        <div className="grid grid-cols-2 gap-2">
          {estados.map((estado) => (
            <button
              key={estado.value}
              type="button"
              onClick={() =>
                setValue("estado", estado.value, {
                  shouldValidate: false,
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
              className={cn(
                "border rounded-md px-4 py-2 text-sm font-medium transition",
                estadoActual === estado.value
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-blue-50"
              )}
            >
              {estado.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="fechaEntrevista">Fecha de entrevista</Label>
        <Input
          type="date"
          id="fechaEntrevista"
          {...register("fechaEntrevista")}
        />
        {errors.fechaEntrevista && (
          <p className="text-red-500 text-sm">
            {errors.fechaEntrevista.message as string}
          </p>
        )}
      </div>
    </div>
  );
}
