import { TaskBoard } from "@/components/tasks/TaskBoard";

export default function Home() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Task Board</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your tasks in one simple workspace.</p>
      </div>
      <TaskBoard />
    </div>
  );
}
