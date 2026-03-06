import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { TeamPageClient } from "@/components/team/TeamPageClient";
import { Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";

export default async function TeamPage({
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

  const { data: member } = await supabase
    .from("workspace_members")
    .select("role")
    .eq("workspace_id", workspaceId)
    .eq("user_id", user.id)
    .single();

  if (!member) {
    redirect("/dashboard");
  }

  const { data: members } = await supabase
    .from("workspace_members")
    .select("workspace_id, user_id, role, users(email, name, avatar_url)")
    .eq("workspace_id", workspaceId);

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
            <h1 className="text-xl font-bold text-primary">Team</h1>
            <p className="text-sm text-gray-500">Manage workspace members</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <TeamPageClient
          workspaceId={workspaceId}
          initialMembers={members || []}
          currentUserRole={member.role}
        />
      </div>
    </div>
  );
}
