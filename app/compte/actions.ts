"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export interface MyRegistration {
  id: string;
  payment_status: string;
  masterclass: {
    id: string;
    title: string;
    image_url: string | null;
    scheduled_at: string;
    type: "free" | "paid";
    price: number | null;
    status: "scheduled" | "live" | "ended" | "archived";
    replay_url: string | null;
    host_name: string;
  };
}

export async function getMyRegistrations(): Promise<MyRegistration[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("registrations")
    .select(
      "id, payment_status, masterclass:masterclasses(id, title, image_url, scheduled_at, type, price, status, replay_url, host_name)"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (data ?? []).map((r: any) => ({
    ...r,
    masterclass: Array.isArray(r.masterclass) ? r.masterclass[0] : r.masterclass,
  }));
}

export async function requestReplay(masterclassId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Reconnecte-toi pour demander un replay." };

  const { error } = await supabase.from("replay_requests").insert({
    user_id: user.id,
    masterclass_id: masterclassId,
  });

  if (error) {
    if (error.code === "23505") {
      return { alreadyRequested: true };
    }
    return { error: "Impossible d'envoyer la demande. Réessaie." };
  }

  revalidatePath("/compte");
  return { success: true };
}