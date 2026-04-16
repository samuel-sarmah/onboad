"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface Notification {
  id: string;
  type: string;
  message: string;
  read: boolean;
  created_at: string;
}

interface UseRealtimeNotificationsOptions {
  showToasts?: boolean;
}

const NOTIFICATION_LIMIT = 20;

function upsertNotificationList(
  list: Notification[],
  incoming: Notification
): Notification[] {
  const withoutDuplicate = list.filter((item) => item.id !== incoming.id);
  return [incoming, ...withoutDuplicate].slice(0, NOTIFICATION_LIMIT);
}

export function useRealtimeNotifications(
  userId?: string,
  options: UseRealtimeNotificationsOptions = {}
) {
  const supabase = useMemo(() => createClient(), []);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { showToasts = false } = options;

  useEffect(() => {
    if (!userId) {
      setNotifications([]);
      return;
    }

    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(NOTIFICATION_LIMIT);

      if (!error && data) {
        setNotifications(data);
      }
    };

    fetchNotifications();

    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const { eventType } = payload;

          if (eventType === "INSERT") {
            const newNotification = payload.new as Notification;
            setNotifications((prev) => upsertNotificationList(prev, newNotification));

            if (showToasts) {
              toast.info(newNotification.message);
            }
            return;
          }

          if (eventType === "UPDATE") {
            const updatedNotification = payload.new as Notification;
            setNotifications((prev) =>
              prev.map((item) =>
                item.id === updatedNotification.id ? updatedNotification : item
              )
            );
            return;
          }

          if (eventType === "DELETE") {
            const deletedNotification = payload.old as Notification;
            setNotifications((prev) =>
              prev.filter((item) => item.id !== deletedNotification.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, supabase, showToasts]);

  const markAsRead = async (notificationId: string) => {
    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", notificationId);

    if (error) {
      return;
    }

    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    unreadCount,
    markAsRead,
  };
}
