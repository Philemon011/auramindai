import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "./components/AdminSidebar";
import { AdminMobileNav } from "./components/AdminMobileNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion?next=/admin");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/");
  }

  const displayName = profile.full_name ?? user.email ?? "Admin";

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar name={displayName} email={user.email ?? ""} />
      <AdminMobileNav name={displayName} email={user.email ?? ""} />
      <main className="lg:pl-[272px]">
        <div className="mx-auto max-w-6xl px-5 pb-28 pt-8 sm:px-8 sm:pt-10 lg:pb-10">{children}</div>
      </main>
    </div>
  );
}