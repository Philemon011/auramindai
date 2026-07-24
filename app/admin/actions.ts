import { createClient } from "@/lib/supabase/server";

export async function getDashboardStats() {
  const supabase = await createClient();

  const [
    { count: totalMasterclasses },
    { count: upcomingMasterclasses },
    { count: totalRegistrations },
    { count: totalUsers },
    { count: pendingReplays },
  ] = await Promise.all([
    supabase.from("masterclasses").select("*", { count: "exact", head: true }),
    supabase
      .from("masterclasses")
      .select("*", { count: "exact", head: true })
      .in("status", ["scheduled", "live"]),
    supabase.from("registrations").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase
      .from("replay_requests")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
  ]);

  return {
    totalMasterclasses: totalMasterclasses ?? 0,
    upcomingMasterclasses: upcomingMasterclasses ?? 0,
    totalRegistrations: totalRegistrations ?? 0,
    totalUsers: totalUsers ?? 0,
    pendingReplays: pendingReplays ?? 0,
  };
}

export async function getUpcomingMasterclasses() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("masterclasses")
    .select("id, title, scheduled_at, type, status")
    .in("status", ["scheduled", "live"])
    .order("scheduled_at", { ascending: true })
    .limit(5);

  return data ?? [];
}

export async function getRecentRegistrations() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("registrations")
    .select("id, created_at, payment_status, profiles(full_name), masterclasses(title)")
    .order("created_at", { ascending: false })
    .limit(6);

  return data ?? [];
}


export async function getWeeklyRegistrationsCount() {
  const supabase = await createClient();

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { count } = await supabase
    .from("registrations")
    .select("*", { count: "exact", head: true })
    .gte("created_at", sevenDaysAgo.toISOString());

  return count ?? 0;
}