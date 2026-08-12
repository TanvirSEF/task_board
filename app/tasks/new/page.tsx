"use client";

import { useRouter } from "next/navigation";
import { TaskForm } from "@/components/tasks/TaskForm";
import { useTasks } from "@/hooks/useTasks";
import { TaskFormValues } from "@/utils/validation";

export default function NewTaskPage() {
  const router = useRouter();
  const { createTask } = useTasks();

  const handleSubmit = (values: TaskFormValues) => {
    createTask(values);
    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Create Task</h1>
        <p className="text-slate-500 dark:text-slate-400">Add a new task to your board.</p>
      </div>
      
      <div className="p-6 bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 rounded-xl shadow-sm">
        <TaskForm 
          onSubmit={handleSubmit} 
          onCancel={() => router.push("/")} 
        />
      </div>
    </div>
  );
}
