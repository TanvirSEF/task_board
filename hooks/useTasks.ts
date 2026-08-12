import { useState, useEffect, useMemo } from "react";
import { Task, TaskStatus } from "@/types/task";
import { loadTasks, saveTasks } from "@/lib/storage";
import { sortTasks, TaskSortOption } from "@/utils/taskUtils";
import { toast } from "sonner";

export type TaskStatusFilter = "all" | TaskStatus;

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskStatusFilter>("all");
  const [sortBy, setSortBy] = useState<TaskSortOption>("default");

  useEffect(() => {
    setTasks(loadTasks());
    setIsLoaded(true);
  }, []);

  const createTask = (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    toast("Task created successfully");
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, "id" | "createdAt" | "updatedAt">>) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    toast("Task updated successfully");
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    toast("Task deleted");
  };

  const getTaskById = (id: string) => tasks.find((t) => t.id === id);

  const visibleTasks = useMemo(() => {
    let result = tasks;

    if (search.trim()) {
      const lowerSearch = search.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(lowerSearch));
    }

    if (statusFilter !== "all") {
      result = result.filter((t) => t.status === statusFilter);
    }

    return sortTasks(result, sortBy);
  }, [tasks, search, statusFilter, sortBy]);

  return {
    tasks: visibleTasks,
    isLoaded,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
  };
}
