import { Badge } from "@/components/ui/badge";
import { TaskStatus } from "@/types/task";

export function StatusBadge({ status }: { status: TaskStatus }) {
  switch (status) {
    case "done":
      return <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-white">Done</Badge>;
    case "in-progress":
      return <Badge variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">In Progress</Badge>;
    default:
      return <Badge variant="secondary">To Do</Badge>;
  }
}
