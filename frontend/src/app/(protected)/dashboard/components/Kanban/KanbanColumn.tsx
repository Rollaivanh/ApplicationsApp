import { Card, CardHeader, CardTitle, CardContent } from "../ui/card" 
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { PostulationCard } from "./PostulationCard";

export function KanbanColumn({ title, postulaciones }: { title: string; postulaciones: any[] }) {
  const getColumnColors = (title: string) => {
    switch (title) {
      case "Enviada":
        return {
          bg: "bg-gradient-to-b from-blue-50/80 to-blue-100/50",
          title: "text-blue-700",
          badge: "bg-blue-100 text-blue-700 border-blue-200"
        };
      case "Entrevista":
        return {
          bg: "bg-gradient-to-b from-amber-50/80 to-amber-100/50",
          title: "text-amber-700",
          badge: "bg-amber-100 text-amber-700 border-amber-200"
        };
      case "Oferta":
        return {
          bg: "bg-gradient-to-b from-green-50/80 to-green-100/50",
          title: "text-green-700",
          badge: "bg-green-100 text-green-700 border-green-200"
        };
      case "Rechazada":
        return {
          bg: "bg-gradient-to-b from-red-50/80 to-red-100/50",
          title: "text-red-700",
          badge: "bg-red-100 text-red-700 border-red-200"
        };
      case "SinRespuesta":
        return {
          bg: "bg-gradient-to-b from-gray-50/80 to-gray-100/50",
          title: "text-gray-700",
          badge: "bg-gray-100 text-gray-700 border-gray-200"
        };
      default:
        return {
          bg: "bg-gradient-to-b from-gray-50/50 to-white",
          title: "text-gray-700",
          badge: "bg-gray-100 text-gray-700 border-gray-200"
        };
    }
  };

  const colors = getColumnColors(title);

  return (
    <Card className={`rounded-lg border shadow-sm ${colors.bg}`}>
      <CardHeader className="pb-3 flex justify-between items-center">
        <CardTitle className={`text-sm font-medium ${colors.title}`}>{title}</CardTitle>
        <Badge className={`text-xs px-2 py-1 ${colors.badge}`}>
          {postulaciones.length}
        </Badge>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[420px] space-y-2 pr-2">
          {postulaciones.length === 0 ? (
            <div className="text-xs border border-dashed rounded-md p-4 text-center text-gray-400">
              Sin elementos
            </div>
          ) : (
            postulaciones.map((p) => <PostulationCard key={p.id} postulation={p} />)
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
