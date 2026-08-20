"use server";

import { createClient } from "@/lib/supabase/server";

export interface MyReplayRequest {
  id: string;
  status: "pending" | "sent";
  created_at: string;
  masterclass: {
    id: string;
    title: string;
    image_url: string | null;
    scheduled_at: string;
    replay_url: string | null;
    host_name: string;
  };
}

export async function getMyReplayRequests(): Promise<MyReplayRequest[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("replay_requests")
    .select(
      "id, status, created_at, masterclass:masterclasses(id, title, image_url, scheduled_at, replay_url, host_name)"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (data ?? []).map((r: any) => ({
    ...r,
    masterclass: Array.isArray(r.masterclass) ? r.masterclass[0] : r.masterclass,
  }));
}