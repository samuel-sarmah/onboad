import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ReportsClient } from "@/components/reports/ReportsClient";
import { Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";

export default async function ReportsPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const { workspaceId } = await params;

  const { data: tasks } = await supabase
    .from("tasks")
    .select("id, priority, due_date, columns(projects(id, name, workspace_id))")
    .eq("columns.projects.workspace_id", workspaceId);

  const { data: projects } = await supabase
    .from("projects")
    .select("id, name")
    .eq("workspace_id", workspaceId);

  const taskStats = {
    total: tasks?.length || 0,
    completed: tasks?.length || 0,
    inProgress: tasks?.length || 0,
    overdue: 0,
  };

  const projectStats = (projects || []).map((project) => ({
    id: project.id,
    name: project.name,
    total: tasks?.filter((t) => (t.columns as unknown as { projects: { id: string } }).projects.id === project.id).length || 0,
    completed: 0,
  }));

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center gap-4">
          <Link href={`/dashboard/${workspaceId}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-primary">Reports</h1>
            <p className="text-sm text-gray-500">Track project progress and team performance</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <ReportsClient taskStats={taskStats} projectStats={projectStats} />
      </div>
    </div>
  );
}
