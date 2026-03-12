"use client";

import { Droppable, Draggable } from "@hello-pangea/dnd";
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
  lightText?: boolean;
}

export function KanbanColumn({ column, tasks, onAddTask, onTaskClick, lightText }: KanbanColumnProps) {
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.due_date && b.due_date) {
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    }
    if (a.due_date) return -1;
    if (b.due_date) return 1;
    return a.position - b.position;
  });
  const textColor = lightText ? "text-white" : "text-primary";
  const subTextColor = lightText ? "text-white/70" : "text-gray-500";
  const countBg = lightText ? "bg-white/20" : "bg-secondary";

  return (
    <div className="flex-shrink-0 w-64 md:w-72">
      <div className="flex items-center justify-between mb-1 md:mb-3 px-1">
        <div className="flex items-center gap-1 md:gap-2">
          {column.color && (
            <div 
              className="w-2 md:w-3 h-2 md:h-3 rounded-full" 
              style={{ backgroundColor: column.color }}
            />
          )}
          <h3 className={`font-medium text-xs md:text-sm ${textColor}`}>
            {column.name}
          </h3>
          <span className={`text-xs ${subTextColor} ${countBg} px-1 py-0.5 rounded`}>
            {tasks.length}
          </span>
        </div>
        <button 
          onClick={onAddTask}
          className={`p-0.5 md:p-1 hover:bg-white/10 rounded transition-colors ${lightText ? "text-white" : "hover:bg-secondary"}`}
        >
          <Plus className="w-3 md:w-4 h-3 md:h-4" />
        </button>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-1 md:space-y-2 min-h-[60px] md:min-h-[200px] p-0.5 md:p-1 rounded transition-colors ${
              snapshot.isDraggingOver ? "bg-primary/5" : ""
            }`}
          >
            {sortedTasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{ ...provided.draggableProps.style }}
                    className={snapshot.isDragging ? "opacity-50" : ""}
                  >
                    <TaskCard
                      task={task}
                      onClick={() => onTaskClick?.(task)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {tasks.length === 0 && (
              <div className={`text-center py-2 md:py-8 text-xs ${lightText ? "text-white/60" : "text-gray-400"}`}>
                No tasks yet
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}
