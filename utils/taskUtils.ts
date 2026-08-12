import { Task, TaskPriority } from "@/types/task";

const priorityWeight: Record<TaskPriority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export type TaskSortOption = "default" | "due-earliest" | "due-latest" | "priority-high" | "priority-low";

export function sortTasks(tasks: Task[], sortBy: TaskSortOption): Task[] {
  const sorted = [...tasks];

  switch (sortBy) {
    case "priority-high":
      return sorted.sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
    case "priority-low":
      return sorted.sort((a, b) => priorityWeight[a.priority] - priorityWeight[b.priority]);
    case "due-earliest":
      return sorted.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    case "due-latest":
      return sorted.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      });
    default:
      return sorted;
  }
}
