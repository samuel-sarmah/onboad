"use client";

import { CalendarView } from "./CalendarView";
import { useRealtimeTasks } from "@/hooks/useRealtimeTasks";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  priority: "low" | "medium" | "high" | "urgent";
}

interface CalendarViewWrapperProps {
  workspaceId: string;
  initialEvents?: CalendarEvent[];
}

export function CalendarViewWrapper({ workspaceId, initialEvents = [] }: CalendarViewWrapperProps) {
  const { tasks } = useRealtimeTasks({ workspaceId });

  const events: CalendarEvent[] = tasks
    .filter((t) => t.due_date)
    .map((t) => ({
      id: t.id,
      title: t.title,
      date: new Date(t.due_date!),
      priority: t.priority,
    }));

  return <CalendarView events={events.length > 0 ? events : initialEvents} />;
}
