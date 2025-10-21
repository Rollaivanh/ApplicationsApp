import { Badge } from "../ui/badge";
import { formatDate } from "../../utils/formatDate";

export function PostulationCard({ postulation }: { postulation: any }) {
  return (
    <div className="group border border-gray-200 rounded-lg p-3 text-sm shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer bg-white hover:bg-gray-50 hover:border-gray-300">
      <div className="font-medium truncate text-gray-900">{postulation.empresa}</div>
      <div className="text-xs text-gray-600 truncate mt-1">{postulation.puesto}</div>
      <div className="mt-2 flex items-center gap-2">
        <Badge variant="outline" className="text-xs px-2 py-1 border-gray-300 text-gray-600 bg-gray-50">
          {formatDate(postulation.creadaEn)}
        </Badge>
      </div>
    </div>
  );
}
