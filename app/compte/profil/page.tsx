import { createClient } from "@/lib/supabase/server";
import { AdminReveal, AdminRevealItem } from "../../admin/components/AdminReveal";
import { ProfileForm } from "./ProfileForm";
import { PasswordForm } from "./PasswordForm";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user!.id)
    .single();

  return (
    <AdminReveal className="flex flex-col gap-8">
      <AdminRevealItem>
        <span className="font-body text-xs font-semibold uppercase tracking-wide text-accent">
          Mon espace
        </span>
        <h1
          className="mt-2 font-heading font-semibold text-foreground"
          style={{ fontSize: "28px", lineHeight: "34px", letterSpacing: "-0.02em" }}
        >
          Profil
        </h1>
      </AdminRevealItem>

      <AdminRevealItem className="max-w-xl rounded-card-lg border border-border bg-surface p-7 sm:p-9">
        <h2 className="font-subheading text-[17px] font-semibold text-foreground">Informations personnelles</h2>
        <div className="mt-6">
          <ProfileForm initialName={profile?.full_name ?? ""} email={user!.email ?? ""} />
        </div>
      </AdminRevealItem>

      <AdminRevealItem className="max-w-xl rounded-card-lg border border-border bg-surface p-7 sm:p-9">
        <h2 className="font-subheading text-[17px] font-semibold text-foreground">Sécurité</h2>
        <div className="mt-6">
          <PasswordForm />
        </div>
      </AdminRevealItem>
    </AdminReveal>
  );
}