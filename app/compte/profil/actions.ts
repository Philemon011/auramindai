"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(fullName: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Session expirée, reconnecte-toi." };

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName })
    .eq("id", user.id);

  if (error) {
    return { error: "Impossible de mettre à jour ton profil." };
  }

  revalidatePath("/compte/profil");
  return { success: true };
}

export async function updatePassword(currentPassword: string, newPassword: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return { error: "Session expirée, reconnecte-toi." };

  // Supabase n'a pas d'API "changer le mot de passe avec vérification de
  // l'ancien" — on revérifie donc manuellement en tentant une connexion
  // avec l'ancien mot de passe avant d'autoriser le changement.
  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });

  if (verifyError) {
    return { error: "Le mot de passe actuel est incorrect." };
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    return { error: "Impossible de mettre à jour le mot de passe." };
  }

  return { success: true };
}