"use client";

import { useState } from "react";
import { Task, TaskPriority, TaskStatus } from "@/types/task";
import { validateTask, TaskFormValues, ValidationErrors } from "@/utils/validation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TaskFormProps {
  initialValues?: Partial<Task>;
  onSubmit: (values: TaskFormValues) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export function TaskForm({ initialValues, onSubmit, onCancel, isEditing }: TaskFormProps) {
  const [values, setValues] = useState<TaskFormValues>({
    title: initialValues?.title || "",
    description: initialValues?.description || "",
    priority: initialValues?.priority || "medium",
    status: initialValues?.status || "todo",
    dueDate: initialValues?.dueDate || "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateTask(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">Title</label>
        <Input
          id="title"
          value={values.title}
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          placeholder="e.g., Design landing page"
          className={errors.title ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">Description (Optional)</label>
        <Textarea
          id="description"
          value={values.description}
          onChange={(e) => setValues({ ...values, description: e.target.value })}
          placeholder="Add more details..."
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Priority</label>
          <Select 
            value={values.priority} 
            onValueChange={(val: TaskPriority) => setValues({ ...values, priority: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select 
            value={values.status} 
            onValueChange={(val: TaskStatus) => setValues({ ...values, status: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="dueDate" className="text-sm font-medium">Due Date (Optional)</label>
        <Input
          id="dueDate"
          type="date"
          value={values.dueDate}
          onChange={(e) => setValues({ ...values, dueDate: e.target.value })}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? "Update Task" : "Create Task"}
        </Button>
      </div>
    </form>
  );
}
