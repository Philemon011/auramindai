"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getAdminMasterclasses() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("masterclasses")
    .select("id, title, image_url, scheduled_at, type, price, status, language, host_name")
    .order("scheduled_at", { ascending: false });

  return data ?? [];
}

export async function getMasterclassRegistrationCounts() {
  const supabase = await createClient();

  const { data } = await supabase.from("registrations").select("masterclass_id");

  const counts: Record<string, number> = {};
  (data ?? []).forEach((r) => {
    counts[r.masterclass_id] = (counts[r.masterclass_id] ?? 0) + 1;
  });

  return counts;
}

export async function deleteMasterclass(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("masterclasses").delete().eq("id", id);

  if (error) {
    return { error: "Impossible de supprimer cette masterclass." };
  }

  revalidatePath("/admin/masterclasses");
  return { success: true };
}

export async function archiveMasterclass(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("masterclasses")
    .update({ status: "archived" })
    .eq("id", id);

  if (error) {
    return { error: "Impossible d'archiver cette masterclass." };
  }

  revalidatePath("/admin/masterclasses");
  return { success: true };
}


export interface MasterclassInput {
  title: string;
  description: string;
  agenda: string[];
  requirements: string[];
  image_url: string | null;
  scheduled_at: string;
  type: "free" | "paid";
  price: number | null;
  language: "fr" | "en";
  host_name: string;
}

export async function createMasterclass(input: MasterclassInput) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Session expirée, reconnecte-toi." };
  }

  const { data, error } = await supabase
    .from("masterclasses")
    .insert({
      ...input,
      price: input.type === "free" ? null : input.price,
      created_by: user.id,
    })
    .select("id")
    .single();

  if (error) {
    console.error("createMasterclass error:", error);
    return { error: "Impossible de créer la masterclass. Réessaie." };
  }

  revalidatePath("/admin/masterclasses");
  return { success: true, id: data.id };
}

export async function updateMasterclass(id: string, input: MasterclassInput) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("masterclasses")
    .update({
      ...input,
      price: input.type === "free" ? null : input.price,
    })
    .eq("id", id);

  if (error) {
    return { error: "Impossible de mettre à jour la masterclass. Réessaie." };
  }

  revalidatePath("/admin/masterclasses");
  return { success: true };
}

export async function getAdminMasterclassById(id: string) {
  const supabase = await createClient();

  const { data } = await supabase.from("masterclasses").select("*").eq("id", id).single();

  return data;
}