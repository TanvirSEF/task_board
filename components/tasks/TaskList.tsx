import { Task } from "@/types/task";
import { TaskCard } from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onDeleteClick: (task: Task) => void;
}

export function TaskList({ tasks, onDeleteClick }: TaskListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDeleteClick={onDeleteClick} />
      ))}
    </div>
  );
}
