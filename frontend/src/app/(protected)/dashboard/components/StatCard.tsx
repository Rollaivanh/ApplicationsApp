import { Card, CardHeader, CardTitle, CardContent } from "../../../postulations/dashboard/components/ui/card";

export function StatCard({ label, value }: { label: string; value: number }) {
  const COLORS: any = {
    Enviada: {
      text: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      value: "text-blue-700"
    },
    Entrevista: {
      text: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      value: "text-amber-700"
    },
    Oferta: {
      text: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      value: "text-green-700"
    },
    Rechazada: {
      text: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      value: "text-red-700"
    },
    SinRespuesta: {
      text: "text-gray-600",
      bg: "bg-gray-50",
      border: "border-gray-200",
      value: "text-gray-700"
    },
    Total: {
      text: "text-slate-700",
      bg: "bg-slate-50",
      border: "border-slate-200",
      value: "text-slate-800"
    },
  };

  const colorScheme = COLORS[label] || {
    text: "text-gray-600",
    bg: "bg-gray-50",
    border: "border-gray-200",
    value: "text-gray-800"
  };

  return (
    <Card className={`text-center rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 ${colorScheme.bg} ${colorScheme.border}`}>
      <CardHeader className="pb-2">
        <CardTitle className={`text-xs uppercase tracking-wide font-medium ${colorScheme.text}`}>
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-semibold tracking-tight ${colorScheme.value}`}>
          {value}
        </div>
      </CardContent>
    </Card>
  );
}
