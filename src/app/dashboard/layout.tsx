import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ChatProvider, ChatWidget } from "@/components/chat";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ workspaceId?: string }>;
}) {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const { workspaceId } = await params;

  let workspaces: { id: string; name: string }[] = [];
  let currentWorkspace: { id: string; name: string } | undefined;

  if (workspaceId) {
    const { data: ws } = await supabase
      .from("workspaces")
      .select("id, name")
      .eq("id", workspaceId)
      .single();
    
    if (ws) {
      currentWorkspace = ws;
    }
  }

  const { data: memberWorkspaces } = await supabase
    .from("workspace_members")
    .select("workspace_id, workspaces(id, name)")
    .eq("user_id", user.id);

  if (memberWorkspaces) {
    workspaces = memberWorkspaces
      .map((m) => (m.workspaces as unknown as { id: string; name: string }))
      .filter(Boolean);
  }

  if (!currentWorkspace && workspaces.length > 0) {
    currentWorkspace = workspaces[0];
  }

  return (
    <ChatProvider workspaceId={currentWorkspace?.id || ""}>
      <div className="flex h-screen">
        <Sidebar 
          workspaces={workspaces} 
          currentWorkspace={currentWorkspace} 
          user={{
            id: user.id,
            name: user.user_metadata?.name ?? null,
            email: user.email ?? null,
          }}
        />
        <main className="flex-1 overflow-auto bg-white">
          {children}
        </main>
        <ChatWidget />
      </div>
    </ChatProvider>
  );
}
