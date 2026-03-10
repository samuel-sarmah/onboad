import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { KanbanBoard } from "@/components/kanban";
import { Button } from "@/components/ui";
import { ArrowLeft, Settings, Plus } from "lucide-react";

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

export default async function ProjectBoardPage({
  params,
}: {
  params: Promise<{ workspaceId: string; projectId: string }>;
}) {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const { workspaceId, projectId } = await params;

  const { data: project } = await supabase
    .from("projects")
    .select("id, name, description, workspace_id")
    .eq("id", projectId)
    .single();

  if (!project) {
    redirect(`/dashboard/${workspaceId}`);
  }

  const { data: columns } = await supabase
    .from("columns")
    .select("id, name, color, position")
    .eq("project_id", projectId)
    .order("position");

  const { data: tasks } = await supabase
    .from("tasks")
    .select("id, column_id, title, description, priority, due_date, assigned_to, position, created_by")
    .eq("column_id", columns?.map(c => c.id) || [""])
    .order("position");

  const defaultColumns: Column[] = columns?.length ? columns : [
    { id: "todo", name: "To Do", color: "#6b7280", position: 0 },
    { id: "in-progress", name: "In Progress", color: "#2563eb", position: 1 },
    { id: "review", name: "Review", color: "#ca8a04", position: 2 },
    { id: "done", name: "Done", color: "#16a34a", position: 3 },
  ];

  const defaultTasks: Task[] = tasks || [];

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border px-3 py-2 md:px-6 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <Link href={`/dashboard/${workspaceId}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-primary">{project.name}</h1>
              {project.description && (
                <p className="text-xs md:text-sm text-gray-500">{project.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden md:inline">Settings</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-2 md:p-6">
        <KanbanBoard
          initialColumns={defaultColumns}
          initialTasks={defaultTasks}
          projectId={projectId}
          workspaceId={workspaceId}
        />
      </div>
    </div>
  );
}
