import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TaskSearchProps {
  search: string;
  setSearch: (val: string) => void;
}

export function TaskSearch({ search, setSearch }: TaskSearchProps) {
  return (
    <div className="relative flex-1 w-full md:max-w-sm">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
      <Input
        type="text"
        placeholder="Search tasks..."
        className="pl-9"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
