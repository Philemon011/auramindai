"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface MyNotification {
  id: string;
  type: "info" | "reminder" | "payment" | "replay";
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  link: string | null;
}

export async function getMyNotifications(): Promise<MyNotification[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function markNotificationRead(id: string) {
  const supabase = await createClient();

  await supabase.from("notifications").update({ read: true }).eq("id", id);

  revalidatePath("/compte/notifications");
  return { success: true };
}

export async function markAllNotificationsRead() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Session expirée." };

  await supabase.from("notifications").update({ read: true }).eq("user_id", user.id).eq("read", false);

  revalidatePath("/compte/notifications");
  return { success: true };
}