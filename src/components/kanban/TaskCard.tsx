"use client";

import { Badge } from "@/components/ui";
import { Calendar, MessageSquare, User } from "lucide-react";

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

const priorityColors = {
  low: "default",
  medium: "info",
  high: "warning",
  urgent: "error",
} as const;

export function TaskCard({ task, onClick }: TaskCardProps) {
  const completedSubtasks = 0;
  const totalSubtasks = 0;

  return (
    <div
      onClick={onClick}
      className="bg-white border border-border rounded p-3 cursor-pointer hover:border-border-dark transition-colors shadow-sm"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="text-sm font-medium text-primary line-clamp-2">
          {task.title}
        </h4>
      </div>

      {task.description && (
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">
          {task.description}
        </p>
      )}

      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant={priorityColors[task.priority]}>
          {task.priority}
        </Badge>

        {task.due_date && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            {new Date(task.due_date).toLocaleDateString()}
          </div>
        )}

        {task.assigned_to && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <User className="w-3 h-3" />
          </div>
        )}

        <div className="flex items-center gap-1 text-xs text-gray-500 ml-auto">
          <MessageSquare className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
}
