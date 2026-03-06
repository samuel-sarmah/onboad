import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button, Card } from "@/components/ui";
import { Plus, LayoutGrid, Users, ArrowRight } from "lucide-react";

export default async function DashboardPage({
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

  const { data: projects } = await supabase
    .from("projects")
    .select("id, name, description, created_at")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false })
    .limit(6);

  const { data: members } = await supabase
    .from("workspace_members")
    .select("user_id, role, users(email, name, avatar_url)")
    .eq("workspace_id", workspaceId)
    .limit(5);

  const { data: recentTasks } = await supabase
    .from("tasks")
    .select("id, title, priority, due_date, columns(projects(workspace_id))")
    .eq("columns.projects.workspace_id", workspaceId)
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
            <p className="text-gray-500 mt-1">Overview of your workspace</p>
          </div>
          <Link href={`/dashboard/${workspaceId}/projects/new`}>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                <LayoutGrid className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{projects?.length || 0}</p>
                <p className="text-sm text-gray-500">Projects</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded flex items-center justify-center">
                <Users className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{members?.length || 0}</p>
                <p className="text-sm text-gray-500">Team Members</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-warning/10 rounded flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{recentTasks?.length || 0}</p>
                <p className="text-sm text-gray-500">Active Tasks</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Recent Projects</h2>
              <Link 
                href={`/dashboard/${workspaceId}/projects`}
                className="text-sm text-primary hover:underline"
              >
                View all
              </Link>
            </div>
            {projects && projects.length > 0 ? (
              <div className="space-y-3">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/dashboard/${workspaceId}/projects/${project.id}`}
                    className="block p-3 border border-border rounded hover:border-border-dark transition-colors"
                  >
                    <p className="font-medium text-sm">{project.name}</p>
                    {project.description && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                        {project.description}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm mb-4">No projects yet</p>
                <Link href={`/dashboard/${workspaceId}/projects/new`}>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Create your first project
                  </Button>
                </Link>
              </div>
            )}
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Team Members</h2>
              <Link 
                href={`/dashboard/${workspaceId}/team`}
                className="text-sm text-primary hover:underline"
              >
                View all
              </Link>
            </div>
            {members && members.length > 0 ? (
              <div className="space-y-3">
                {members.map((member) => (
                  <div
                    key={member.user_id}
                    className="flex items-center gap-3 p-2"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {(member.users as unknown as { name?: string }).name?.[0] || "U"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {(member.users as unknown as { name?: string }).name || "Unknown"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {(member.users as unknown as { email?: string }).email}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 capitalize">{member.role}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm">No team members yet</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
