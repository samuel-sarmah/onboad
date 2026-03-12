"use client";

import { Calendar } from "lucide-react";

interface Task {
  id: string;
  column_id: string;
  title: string;
  description: string | null;
  priority: "low" | "medium" | "high" | "urgent";
  due_date: string | null;
  assigned_to: string | null;
  position: number;
  created_by: string;
}

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

const priorityConfig = {
  low: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    badge: "bg-yellow-400 text-yellow-900",
    accent: "text-yellow-600",
  },
  medium: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-400 text-blue-900",
    accent: "text-blue-600",
  },
  high: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    badge: "bg-orange-400 text-orange-900",
    accent: "text-orange-600",
  },
  urgent: {
    bg: "bg-pink-50",
    border: "border-pink-200",
    badge: "bg-pink-400 text-pink-900",
    accent: "text-pink-600",
  },
};

export function TaskCard({ task, onClick }: TaskCardProps) {
  const config = priorityConfig[task.priority];

  return (
    <div
      onClick={onClick}
      className={`${config.bg} ${config.border} border-t-4 rounded-md p-3 cursor-pointer hover:shadow-md transition-all shadow-sm font-[family-name:var(--font-patrick)]`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${config.badge}`}>
          {task.priority.toUpperCase()}
        </span>
      </div>

      <h4 className="text-base font-medium text-gray-800 leading-tight mb-1">
        {task.title}
      </h4>

      {task.description && (
        <p className="text-sm text-gray-600 line-clamp-2 mb-2 font-[family-name:var(--font-caveat)]">
          {task.description}
        </p>
      )}

      {task.due_date && (
        <div className={`flex items-center gap-1 text-xs ${config.accent} font-medium`}>
          <Calendar className="w-3 h-3" />
          {new Date(task.due_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </div>
      )}
    </div>
  );
}
