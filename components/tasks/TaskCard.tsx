import { Task } from "@/types/task";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { formatDate } from "@/utils/dateUtils";
import { Calendar, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface TaskCardProps {
  task: Task;
  onDeleteClick: (task: Task) => void;
}

export function TaskCard({ task, onDeleteClick }: TaskCardProps) {
  return (
    <div className="flex flex-col p-4 bg-white border rounded-xl border-slate-200 dark:bg-slate-900 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <StatusBadge status={task.status} />
        <PriorityBadge priority={task.priority} />
      </div>
      
      <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">
        {task.title}
      </h3>
      
      {task.description && (
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400 line-clamp-3 flex-grow">
          {task.description}
        </p>
      )}
      
      {!task.description && <div className="flex-grow" />}
      
      <div className="flex items-center gap-2 mt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
        {task.dueDate && (
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <Button variant="ghost" size="sm" asChild className="h-8 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100">
          <Link href={`/tasks/${task.id}`}>
            <Edit className="w-4 h-4 mr-1.5" />
            Edit
          </Link>
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onDeleteClick(task)}
          className="h-8 text-slate-500 hover:text-red-600 dark:hover:text-red-500"
        >
          <Trash2 className="w-4 h-4 mr-1.5" />
          Delete
        </Button>
      </div>
    </div>
  );
}
