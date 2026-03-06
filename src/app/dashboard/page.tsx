import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardIndex() {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const { data: memberWorkspaces } = await supabase
    .from("workspace_members")
    .select("workspace_id")
    .eq("user_id", user.id)
    .limit(1);

  if (memberWorkspaces && memberWorkspaces.length > 0) {
    redirect(`/dashboard/${memberWorkspaces[0].workspace_id}`);
  } else {
    redirect("/dashboard/new-workspace");
  }
}
