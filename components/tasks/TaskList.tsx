import { Task } from "@/types/task";
import { TaskCard } from "./TaskCard";
import { AnimatePresence, motion } from "framer-motion";

interface TaskListProps {
  tasks: Task[];
  onDeleteClick: (task: Task) => void;
}

export function TaskList({ tasks, onDeleteClick }: TaskListProps) {
  return (
    <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="h-full"
          >
            <TaskCard task={task} onDeleteClick={onDeleteClick} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
