"use client";

import { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { KanbanColumn } from "./KanbanColumn";
import { createClient } from "@/lib/supabase/client";
import { Button, Input, Textarea, Badge } from "@/components/ui";
import { X, Calendar, User, Flag } from "lucide-react";

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

interface KanbanBoardProps {
  initialColumns: Column[];
  initialTasks: Task[];
  projectId: string;
}

export function KanbanBoard({ initialColumns, initialTasks, projectId }: KanbanBoardProps) {
  const supabase = createClient();
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [tasks, setTasks] = useState<Record<string, Task[]>>(() => {
    const grouped: Record<string, Task[]> = {};
    initialColumns.forEach((col) => {
      grouped[col.id] = initialTasks
        .filter((t) => t.column_id === col.id)
        .sort((a, b) => a.position - b.position);
    });
    return grouped;
  });
  const [isCreating, setIsCreating] = useState(false);
  const [newTaskColumn, setNewTaskColumn] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;

    const sourceTasks = [...(tasks[sourceColumn] || [])];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (sourceColumn === destColumn) {
      sourceTasks.splice(destination.index, 0, movedTask);
      setTasks({
        ...tasks,
        [sourceColumn]: sourceTasks,
      });
    } else {
      const destTasks = [...(tasks[destColumn] || [])];
      destTasks.splice(destination.index, 0, movedTask);
      setTasks({
        ...tasks,
        [sourceColumn]: sourceTasks,
        [destColumn]: destTasks,
      });

      await supabase
        .from("tasks")
        .update({ 
          column_id: destColumn,
          position: destination.index 
        })
        .eq("id", draggableId);
    }
  };

  const handleCreateTask = async () => {
    if (!newTaskTitle.trim() || !newTaskColumn) return;

    const { data: newTask, error } = await supabase
      .from("tasks")
      .insert({
        column_id: newTaskColumn,
        title: newTaskTitle,
        created_by: (await supabase.auth.getUser()).data.user?.id,
        position: (tasks[newTaskColumn]?.length || 0),
      })
      .select()
      .single();

    if (!error && newTask) {
      setTasks({
        ...tasks,
        [newTaskColumn]: [...(tasks[newTaskColumn] || []), newTask],
      });
    }

    setNewTaskTitle("");
    setNewTaskColumn(null);
    setIsCreating(false);
  };

  const sortedColumns = [...columns].sort((a, b) => a.position - b.position);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {sortedColumns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={tasks[column.id] || []}
              onAddTask={() => {
                setNewTaskColumn(column.id);
                setIsCreating(true);
              }}
              onTaskClick={(task) => setSelectedTask(task)}
            />
          ))}
        </div>
      </DragDropContext>

      {isCreating && newTaskColumn && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Create New Task</h3>
              <button onClick={() => setIsCreating(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <Input
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Task title"
              autoFocus
            />
            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTask}>
                Create Task
              </Button>
            </div>
          </div>
        </div>
      )}

      {selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-lg">{selectedTask.title}</h3>
              <button onClick={() => setSelectedTask(null)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {selectedTask.description && (
              <p className="text-sm text-gray-600 mb-4">
                {selectedTask.description}
              </p>
            )}

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-gray-400" />
                <Badge variant={
                  selectedTask.priority === "urgent" ? "error" :
                  selectedTask.priority === "high" ? "warning" :
                  selectedTask.priority === "medium" ? "info" : "default"
                }>
                  {selectedTask.priority}
                </Badge>
              </div>

              {selectedTask.due_date && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {new Date(selectedTask.due_date).toLocaleDateString()}
                </div>
              )}

              {selectedTask.assigned_to && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <User className="w-4 h-4" />
                  Assigned
                </div>
              )}
            </div>

            <div className="border-t border-border pt-4">
              <h4 className="font-medium text-sm mb-3">Subtasks</h4>
              <div className="text-sm text-gray-500">
                No subtasks yet
              </div>
            </div>

            <div className="border-t border-border pt-4 mt-4">
              <h4 className="font-medium text-sm mb-3">Comments</h4>
              <div className="text-sm text-gray-500">
                No comments yet
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
