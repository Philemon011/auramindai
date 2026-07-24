import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AccountSidebar } from "./components/AccountSidebar";
import { AccountMobileNav } from "./components/AccountMobileNav";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion?next=/compte");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const displayName = profile?.full_name ?? user.email ?? "Utilisateur";

  return (
    <div className="min-h-screen bg-background">
      <AccountSidebar name={displayName} email={user.email ?? ""} />
      <AccountMobileNav name={displayName} email={user.email ?? ""} />
      <main className="lg:pl-[272px]">
        <div className="mx-auto max-w-5xl px-5 pb-28 pt-8 sm:px-8 sm:pt-10 lg:pb-10">{children}</div>
      </main>
    </div>
  );
}