"use client";

import { Droppable } from "@hello-pangea/dnd";
import { TaskCard } from "./TaskCard";
import { Button } from "@/components/ui";
import { Plus } from "lucide-react";

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

interface Column {
  id: string;
  name: string;
  color: string | null;
  position: number;
}

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onAddTask?: () => void;
  onTaskClick?: (task: Task) => void;
}

export function KanbanColumn({ column, tasks, onAddTask, onTaskClick }: KanbanColumnProps) {
  const sortedTasks = [...tasks].sort((a, b) => a.position - b.position);

  return (
    <div className="flex-shrink-0 w-72">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          {column.color && (
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: column.color }}
            />
          )}
          <h3 className="font-medium text-sm text-primary">
            {column.name}
          </h3>
          <span className="text-xs text-gray-500 bg-secondary px-1.5 py-0.5 rounded">
            {tasks.length}
          </span>
        </div>
        <button 
          onClick={onAddTask}
          className="p-1 hover:bg-secondary rounded transition-colors"
        >
          <Plus className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-2 min-h-[200px] p-1 rounded transition-colors ${
              snapshot.isDraggingOver ? "bg-primary/5" : ""
            }`}
          >
            {sortedTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => onTaskClick?.(task)}
              />
            ))}
            {provided.placeholder}
            {tasks.length === 0 && (
              <div className="text-center py-8 text-xs text-gray-400">
                No tasks yet
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}
