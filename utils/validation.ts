import { TaskStatus, TaskPriority } from "@/types/task";

export interface TaskFormValues {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
}

export interface ValidationErrors {
  title?: string;
}

export function validateTask(values: Partial<TaskFormValues>): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!values.title || values.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters.";
  }

  return errors;
}
