"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

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

interface UseRealtimeTasksOptions {
  workspaceId?: string;
  projectId?: string;
}

export function useRealtimeTasks({ workspaceId, projectId }: UseRealtimeTasksOptions = {}) {
  const supabase = createClient();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      let query = supabase
        .from("tasks")
        .select("*, columns(projects(workspace_id))")
        .order("position", { ascending: true });

      if (workspaceId) {
        query = query.eq("columns.projects.workspace_id", workspaceId);
      }
      if (projectId) {
        query = query.eq("column_id", projectId);
      }

      const { data } = await query;
      if (data) {
        setTasks(data);
      }
      setLoading(false);
    };

    fetchTasks();

    const channel = supabase
      .channel("tasks-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
        },
        (payload) => {
          const { eventType, new: newRecord, old: oldRecord } = payload;

          setTasks((prev) => {
            if (eventType === "INSERT") {
              return [...prev, newRecord as Task];
            }
            if (eventType === "UPDATE") {
              return prev.map((t) =>
                t.id === (newRecord as Task).id ? (newRecord as Task) : t
              );
            }
            if (eventType === "DELETE") {
              return prev.filter((t) => t.id !== (oldRecord as Task).id);
            }
            return prev;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, workspaceId, projectId]);

  return { tasks, loading };
}
