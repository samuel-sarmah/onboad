import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CalendarView } from "@/components/calendar/CalendarView";
import { Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";

interface Task {
  id: string;
  title: string;
  due_date: string | null;
  priority: "low" | "medium" | "high" | "urgent";
}

export default async function CalendarPage({
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
    .select("id, title, due_date, priority, columns(projects(workspace_id))")
    .eq("columns.projects.workspace_id", workspaceId)
    .not("due_date", "is", null);

  const events = (tasks || [])
    .filter((t) => t.due_date)
    .map((t) => ({
      id: t.id,
      title: t.title,
      date: new Date(t.due_date!),
      priority: t.priority as "low" | "medium" | "high" | "urgent",
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
            <h1 className="text-xl font-bold text-primary">Calendar</h1>
            <p className="text-sm text-gray-500">View tasks by deadline</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <CalendarView events={events} />
      </div>
    </div>
  );
}
