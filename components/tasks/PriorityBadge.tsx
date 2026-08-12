import { Badge } from "@/components/ui/badge";
import { TaskPriority } from "@/types/task";

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  switch (priority) {
    case "high":
      return <Badge variant="destructive">High</Badge>;
    case "medium":
      return <Badge variant="outline" className="text-amber-600 border-amber-600 dark:text-amber-500 dark:border-amber-500">Medium</Badge>;
    default:
      return <Badge variant="outline" className="text-slate-500 border-slate-500">Low</Badge>;
  }
}
