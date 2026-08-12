import { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white border border-dashed rounded-lg border-slate-300 dark:bg-slate-900 dark:border-slate-700">
      <h3 className="mb-1 text-lg font-medium text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
