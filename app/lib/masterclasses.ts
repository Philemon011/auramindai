import { createClient } from "@/lib/supabase/server";
import { PublicMasterclass } from "./masterclasses-types";

export async function getPublicMasterclasses(): Promise<PublicMasterclass[]> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("masterclasses")
    .select("*")
    .neq("status", "archived")
    .order("scheduled_at", { ascending: true });

  return data ?? [];
}

export async function getPublicMasterclassById(id: string): Promise<PublicMasterclass | null> {
  const supabase = await createClient();

  const { data } = await supabase.from("masterclasses").select("*").eq("id", id).maybeSingle();

  return data;
}