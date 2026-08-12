import { TaskSortOption } from "@/utils/taskUtils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TaskSortProps {
  sortBy: TaskSortOption;
  setSortBy: (val: TaskSortOption) => void;
}

export function TaskSort({ sortBy, setSortBy }: TaskSortProps) {
  return (
    <div className="w-[180px]">
      <Select value={sortBy} onValueChange={(val: TaskSortOption) => setSortBy(val)}>
        <SelectTrigger>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="due-earliest">Due Date (Earliest)</SelectItem>
          <SelectItem value="due-latest">Due Date (Latest)</SelectItem>
          <SelectItem value="priority-high">Priority (High-Low)</SelectItem>
          <SelectItem value="priority-low">Priority (Low-High)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
