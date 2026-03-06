"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button, Input, Checkbox } from "@/components/ui";
import { Plus, Trash2 } from "lucide-react";

interface Subtask {
  id: string;
  task_id: string;
  title: string;
  completed: boolean;
}

interface SubtaskListProps {
  taskId: string;
  initialSubtasks: Subtask[];
}

export function SubtaskList({ taskId, initialSubtasks }: SubtaskListProps) {
  const supabase = createClient();
  const [subtasks, setSubtasks] = useState<Subtask[]>(initialSubtasks);
  const [newSubtask, setNewSubtask] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddSubtask = async () => {
    if (!newSubtask.trim()) return;

    const { data: subtask, error } = await supabase
      .from("subtasks")
      .insert({
        task_id: taskId,
        title: newSubtask,
        completed: false,
      })
      .select()
      .single();

    if (!error && subtask) {
      setSubtasks([...subtasks, subtask]);
    }

    setNewSubtask("");
    setIsAdding(false);
  };

  const handleToggleSubtask = async (subtaskId: string, completed: boolean) => {
    await supabase
      .from("subtasks")
      .update({ completed: !completed })
      .eq("id", subtaskId);

    setSubtasks(
      subtasks.map((st) =>
        st.id === subtaskId ? { ...st, completed: !completed } : st
      )
    );
  };

  const handleDeleteSubtask = async (subtaskId: string) => {
    await supabase
      .from("subtasks")
      .delete()
      .eq("id", subtaskId);

    setSubtasks(subtasks.filter((st) => st.id !== subtaskId));
  };

  const completedCount = subtasks.filter((st) => st.completed).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-sm">Subtasks</h4>
        <span className="text-xs text-gray-500">
          {completedCount}/{subtasks.length}
        </span>
      </div>

      <div className="space-y-2">
        {subtasks.map((subtask) => (
          <div
            key={subtask.id}
            className="flex items-center gap-2 group"
          >
            <Checkbox
              checked={subtask.completed}
              onCheckedChange={() => handleToggleSubtask(subtask.id, subtask.completed)}
            />
            <span
              className={`flex-1 text-sm ${
                subtask.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {subtask.title}
            </span>
            <button
              onClick={() => handleDeleteSubtask(subtask.id)}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-secondary rounded transition-opacity"
            >
              <Trash2 className="w-3 h-3 text-gray-400" />
            </button>
          </div>
        ))}

        {isAdding ? (
          <div className="flex items-center gap-2">
            <Input
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              placeholder="Subtask title"
              className="flex-1"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddSubtask();
                if (e.key === "Escape") setIsAdding(false);
              }}
            />
            <Button size="sm" onClick={handleAddSubtask}>
              Add
            </Button>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add subtask
          </button>
        )}
      </div>
    </div>
  );
}
