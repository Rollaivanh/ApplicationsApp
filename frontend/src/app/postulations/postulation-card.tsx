"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deletePostulation } from "@/app/postulations/postulations.api";
import { useRouter } from "next/navigation";

export function PostulationCard({ postulation }: { postulation: any }) {
  const router = useRouter();

  async function handleRemovePostulatition(id: any) {
    console.log(id);
    await deletePostulation(id);
    router.refresh();
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <p className="font-semibold text-lg">{postulation.empresa}</p>
        </CardTitle>
        <p className="text-sm text-gray-600">{postulation.puesto}</p>
      </CardHeader>

      <CardContent className="flex justify-between p-4 space-y-2">
        {postulation.interviewAt && (
          <p className="text-xs text-gray-500 flex justify-end">
            Entrevista: {new Date(postulation.interviewAt).toLocaleDateString()}
          </p>
        )}
        <div>
          <Button onClick={() => handleRemovePostulatition(postulation.id)}>
            Eliminar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
