import { createClient } from "@/lib/supabase/server";
import { AdminReveal, AdminRevealItem } from "../components/AdminReveal";
import { UsersTable } from "./UsersTable";
import { getUsersList } from "./actions";

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const users = await getUsersList();
  const adminCount = users.filter((u) => u.role === "admin").length;

  return (
    <AdminReveal className="flex flex-col gap-8">
      <AdminRevealItem>
        <span className="font-body text-xs font-semibold uppercase tracking-wide text-accent">
          Gestion
        </span>
        <h1
          className="mt-2 font-heading font-semibold text-foreground"
          style={{ fontSize: "28px", lineHeight: "34px", letterSpacing: "-0.02em" }}
        >
          Utilisateurs
        </h1>
        <p className="mt-1.5 font-body text-[14px] text-foreground-muted">
          {users.length} compte{users.length !== 1 ? "s" : ""} au total, dont {adminCount} admin
          {adminCount !== 1 ? "s" : ""}.
        </p>
      </AdminRevealItem>

      <AdminRevealItem>
        <UsersTable users={users} currentUserId={user!.id} />
      </AdminRevealItem>
    </AdminReveal>
  );
}