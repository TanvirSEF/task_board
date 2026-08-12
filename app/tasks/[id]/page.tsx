"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { TaskForm } from "@/components/tasks/TaskForm";
import { useTasks } from "@/hooks/useTasks";
import { TaskFormValues } from "@/utils/validation";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { getTaskById, updateTask, isLoaded } = useTasks();
  const [task, setTask] = useState(getTaskById(id));

  useEffect(() => {
    if (isLoaded) {
      setTask(getTaskById(id));
    }
  }, [isLoaded, id, getTaskById]);

  if (!isLoaded) return null;

  if (!task) {
    return (
      <EmptyState
        title="Task not found"
        description="The task you are trying to edit does not exist."
        action={
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tasks
            </Link>
          </Button>
        }
      />
    );
  }

  const handleSubmit = (values: TaskFormValues) => {
    updateTask(id, values);
    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Edit Task</h1>
        <p className="text-slate-500 dark:text-slate-400">Update the details of your task.</p>
      </div>
      
      <div className="p-6 bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 rounded-xl shadow-sm">
        <TaskForm 
          initialValues={task}
          onSubmit={handleSubmit} 
          onCancel={() => router.push("/")}
          isEditing
        />
      </div>
    </div>
  );
}
