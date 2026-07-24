"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: "user" | "admin";
  createdAt: string;
  registrationsCount: number;
}

export async function getUsersList(): Promise<AdminUser[]> {
  const adminClient = createAdminClient();
  const supabase = await createClient();

  // L'API admin de Supabase Auth est la seule à donner accès aux emails
  // de tous les comptes — jamais accessible via le client standard.
  const { data: authData } = await adminClient.auth.admin.listUsers({ perPage: 1000 });

  const { data: profiles } = await supabase.from("profiles").select("id, full_name, role, created_at");

  const { data: registrations } = await supabase.from("registrations").select("user_id");

  const counts: Record<string, number> = {};
  (registrations ?? []).forEach((r) => {
    counts[r.user_id] = (counts[r.user_id] ?? 0) + 1;
  });

  return (authData?.users ?? []).map((authUser) => {
    const profile = profiles?.find((p) => p.id === authUser.id);
    return {
      id: authUser.id,
      email: authUser.email ?? "",
      fullName: profile?.full_name || "Sans nom",
      role: (profile?.role as "user" | "admin") ?? "user",
      createdAt: authUser.created_at,
      registrationsCount: counts[authUser.id] ?? 0,
    };
  });
}

export async function toggleUserRole(userId: string, newRole: "user" | "admin") {
  const adminClient = createAdminClient();

  const { error } = await adminClient
    .from("profiles")
    .update({ role: newRole })
    .eq("id", userId);

  if (error) {
    return { error: "Impossible de modifier le rôle de cet utilisateur." };
  }

  revalidatePath("/admin/utilisateurs");
  return { success: true };
}