import { Loader2 } from "lucide-react";

export function Spinner({ className = "" }: { className?: string }) {
  return <Loader2 className={`w-5 h-5 animate-spin text-slate-500 ${className}`} />;
}
