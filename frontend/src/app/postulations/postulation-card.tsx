"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
      className="cursor-pointer hover:shadow-md transition"
    >
      <CardHeader>
        <CardTitle>
          <p className="font-semibold text-lg">{postulation.empresa}</p>
        </CardTitle>

        <p className="text-sm text-gray-600">{postulation.puesto}</p>

        {/* 🔹 Badge de status */}
        {postulation.status && (
          <Badge
            variant={
              postulation.status === "rechazada"
                ? "destructive"
                : postulation.status === "aceptada"
                ? "success"
                : postulation.status === "en proceso"
                ? "secondary"
                : "pending"
            }
            className="mt-1 capitalize"
          >
            {postulation.status}
          </Badge>
        )}

        {/* 🔹 Fecha de creación */}
        {postulation.createdAt && (
          <p className="text-sm text-gray-500 mt-1">
            Creada el:{" "}
            {new Date(postulation.createdAt).toLocaleDateString("es-AR", {
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
