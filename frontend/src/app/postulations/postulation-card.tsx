"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/postulations/dashboard/components/ui/card";
import { Button } from "@/app/postulations/dashboard/components/ui/button";
import { Badge } from "@/app/postulations/dashboard/components/ui/badge";
import { deletePostulation } from "@/app/postulations/postulations.api";
import { useRouter } from "next/navigation";

export function PostulationCard({ postulation }: { postulation: any }) {
  const router = useRouter();

  async function handleRemovePostulatition(id: any) {
    await deletePostulation(id);
    router.refresh();
  }

  return (
    <Card
      onClick={() => {
        router.push(`/postulations/${postulation.id}`);
      }}
      className="cursor-pointer hover:shadow-md transition-all border border-muted/30 hover:border-foreground/20 bg-background/60 rounded-xl hover:-translate-y-[1px]"
    >
      <CardHeader>
        <CardTitle>
          <p className="font-semibold text-lg text-foreground/90">{postulation.empresa}</p>
        </CardTitle>

        <p className="text-sm text-muted-foreground">{postulation.puesto}</p>

        {/* 🔹 Badge de status */}
        {postulation.estado && (
          <Badge
            variant={
              postulation.estado === "Rechazada"
                ? "destructive"
                : postulation.estado === "Oferta"
                ? "success"
                : postulation.estado === "Entrevista"
                ? "secondary"
                : "pending"
            }
            className="mt-1 capitalize border-muted/40"
          >
            {postulation.estado}
          </Badge>
        )}

        {/* 🔹 Fecha de creación */}
        {postulation.creadaEn && (
          <p className="text-sm text-muted-foreground mt-1">
            Creada el:{" "}
            {new Date(postulation.creadaEn).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}
      </CardHeader>

      <CardContent className="flex flex-col gap-2 p-4">
        <div className="flex justify-end gap-2 mt-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/postulations/${postulation.id}/edit`);
            }}
            variant="secondary"
          >
            Editar
          </Button>

          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleRemovePostulatition(postulation.id);
            }}
            variant="destructive"
          >
            Eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
