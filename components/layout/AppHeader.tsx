"use client";

import Link from "next/link";
import { Plus, CheckSquare, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, useState } from "react";

export function AppHeader() {
  const { isDark, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-slate-200 dark:bg-slate-950 dark:border-slate-800">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto max-w-5xl">
        <Link href="/" className="flex items-center gap-2 text-slate-900 dark:text-white">
          <CheckSquare className="w-6 h-6 text-blue-600 dark:text-blue-500" />
          <span className="text-lg font-bold tracking-tight">Task Board</span>
        </Link>
        <div className="flex items-center gap-2">
          {mounted && (
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-slate-500 dark:text-slate-400">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          )}
          <Button asChild size="sm">
            <Link href="/tasks/new">
              <Plus className="w-4 h-4 mr-1.5" />
              New Task
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
