"use client";

import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import { TaskList } from "./TaskList";
import { TaskSearch } from "./TaskSearch";
import { TaskFilters } from "./TaskFilters";
import { TaskSort } from "./TaskSort";
import { DeleteTaskDialog } from "./DeleteTaskDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";
import { Task } from "@/types/task";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export function TaskBoard() {
  const {
    tasks,
    isLoaded,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    deleteTask,
  } = useTasks();

  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  if (!isLoaded) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  const hasNoTasksAtAll = tasks.length === 0 && !search && statusFilter === "all";

  return (
    <div className="space-y-6">
      {!hasNoTasksAtAll && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4 bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 rounded-xl shadow-sm">
          <TaskSearch search={search} setSearch={setSearch} />
          <div className="flex flex-wrap gap-2">
            <TaskFilters statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
            <TaskSort sortBy={sortBy} setSortBy={setSortBy} />
          </div>
        </div>
      )}

      {hasNoTasksAtAll ? (
        <EmptyState
          title="No tasks yet"
          description="Create your first task to get started."
          action={
            <Button asChild>
              <Link href="/tasks/new">
                <Plus className="w-4 h-4 mr-2" />
                Create Task
              </Link>
            </Button>
          }
        />
      ) : tasks.length === 0 ? (
        <EmptyState
          title="No matching tasks"
          description="Try changing your search or status filter."
        />
      ) : (
        <TaskList tasks={tasks} onDeleteClick={setTaskToDelete} />
      )}

      <DeleteTaskDialog
        task={taskToDelete}
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={deleteTask}
      />
    </div>
  );
}
