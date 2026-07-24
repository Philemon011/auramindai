"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getMasterclassesWithReplayRequests() {
  const supabase = await createClient();

  const { data: requests } = await supabase
    .from("replay_requests")
    .select("id, status, masterclass_id, profiles(full_name)");

  const { data: masterclasses } = await supabase
    .from("masterclasses")
    .select("id, title, scheduled_at, replay_url")
    .in("id", [...new Set((requests ?? []).map((r) => r.masterclass_id))]);

  return (masterclasses ?? []).map((mc) => {
    const mcRequests = (requests ?? []).filter((r) => r.masterclass_id === mc.id);
    return {
      ...mc,
      requests: mcRequests,
      pendingCount: mcRequests.filter((r) => r.status === "pending").length,
    };
  });
}

export async function setReplayUrl(masterclassId: string, url: string) {
  const supabase = await createClient();

  const { error: mcError } = await supabase
    .from("masterclasses")
    .update({ replay_url: url })
    .eq("id", masterclassId);

  if (mcError) {
    return { error: "Impossible d'enregistrer le lien." };
  }

  // Une fois le lien renseigné, toutes les demandes en attente pour
  // cette masterclass passent automatiquement à "envoyée".
  await supabase
    .from("replay_requests")
    .update({ status: "sent" })
    .eq("masterclass_id", masterclassId)
    .eq("status", "pending");

  revalidatePath("/admin/replays");
  return { success: true };
}