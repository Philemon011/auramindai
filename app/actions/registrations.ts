"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function registerForMasterclass(masterclassId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { notAuthenticated: true };
  }

  const { data: mc } = await supabase
    .from("masterclasses")
    .select("type")
    .eq("id", masterclassId)
    .single();

  if (!mc) {
    return { error: "Cette masterclass est introuvable." };
  }

  const { error } = await supabase.from("registrations").insert({
    user_id: user.id,
    masterclass_id: masterclassId,
    // Gratuit → confirmé directement. Payant → en attente, tant que
    // l'intégration d'un vrai moyen de paiement n'est pas branchée.
    payment_status: mc.type === "free" ? "free" : "pending",
  });

  if (error) {
    // Code Postgres pour violation de contrainte unique — l'utilisateur
    // est déjà inscrit, ce n'est pas une vraie erreur à afficher en rouge.
    if (error.code === "23505") {
      return { alreadyRegistered: true };
    }
    return { error: "Impossible de finaliser l'inscription. Réessaie." };
  }

  revalidatePath(`/masterclasses/${masterclassId}`);
  revalidatePath("/compte/masterclasses");
  return { success: true, paymentStatus: mc.type === "free" ? "free" : "pending" };
}

export async function getMyRegistration(masterclassId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("registrations")
    .select("id, payment_status")
    .eq("user_id", user.id)
    .eq("masterclass_id", masterclassId)
    .maybeSingle();

  return data;
}