import { TaskStatusFilter } from "@/hooks/useTasks";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TaskFiltersProps {
  statusFilter: TaskStatusFilter;
  setStatusFilter: (val: TaskStatusFilter) => void;
}

export function TaskFilters({ statusFilter, setStatusFilter }: TaskFiltersProps) {
  return (
    <div className="w-[180px]">
      <Select value={statusFilter} onValueChange={(val: TaskStatusFilter) => setStatusFilter(val)}>
        <SelectTrigger>
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="todo">To Do</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="done">Done</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
