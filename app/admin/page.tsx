import { Calendar, Users, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { AdminReveal, AdminRevealItem } from "./components/AdminReveal";
import { StatCard } from "./components/StatCard";
import { QuickActions } from "./components/QuickActions";
import {
  getDashboardStats,
  getUpcomingMasterclasses,
  getRecentRegistrations,
  getWeeklyRegistrationsCount,
} from "./actions";
import { createClient } from "@/lib/supabase/server";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Bonjour";
  if (hour < 18) return "Bon après-midi";
  return "Bonsoir";
}

export default async function AdminOverviewPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user!.id)
    .single();

  const firstName = (profile?.full_name ?? "").split(" ")[0] || "là";

  const [stats, upcoming, recent, weeklyRegistrations] = await Promise.all([
    getDashboardStats(),
    getUpcomingMasterclasses(),
    getRecentRegistrations(),
    getWeeklyRegistrationsCount(),
  ]);

  return (
    <AdminReveal className="flex flex-col gap-8">
      {/* En-tête */}
      <AdminRevealItem className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-body text-xs font-semibold uppercase tracking-wide text-accent">
            Dashboard
          </span>
          <h1
            className="mt-2 font-heading font-semibold text-foreground"
            style={{ fontSize: "30px", lineHeight: "36px", letterSpacing: "-0.02em" }}
          >
            {getGreeting()}, {firstName}
          </h1>
          <p className="mt-1.5 font-body text-[14px] text-foreground-muted">
            Voici ce qui se passe sur AURAMIND AI aujourd&apos;hui.
          </p>
        </div>
        <QuickActions />
      </AdminRevealItem>

      <AdminRevealItem className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon="graduation"
          label="Masterclasses au total"
          value={stats.totalMasterclasses}
          trend={weeklyRegistrations > 0 ? `+${weeklyRegistrations} cette semaine` : undefined}
          accent
        />
        <StatCard icon="calendar" label="À venir ou en live" value={stats.upcomingMasterclasses} />
        <StatCard icon="users" label="Inscriptions au total" value={stats.totalRegistrations} />
        <StatCard icon="play" label="Replays en attente" value={stats.pendingReplays} />
      </AdminRevealItem>

      {/* Deux colonnes : prochaines sessions + inscriptions récentes */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Prochaines masterclasses */}
        <AdminRevealItem className="rounded-card-lg border border-border bg-surface p-7">
          <div className="flex items-center justify-between">
            <h2 className="font-subheading text-[17px] font-semibold text-foreground">
              Prochaines sessions
            </h2>
            <Link
              href="/admin/masterclasses"
              className="group flex items-center gap-1 font-body text-[13px] font-medium text-accent"
            >
              Tout voir
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="mt-5 flex flex-col">
            {upcoming.length === 0 ? (
              <div className="flex flex-col items-center py-10 text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft">
                  <Calendar className="h-4.5 w-4.5 text-accent" strokeWidth={1.75} />
                </span>
                <p className="mt-4 font-body text-[13px] text-foreground-muted">
                  Aucune session programmée pour l&apos;instant.
                </p>
              </div>
            ) : (
              upcoming.map((mc) => (
                <div
                  key={mc.id}
                  className="flex items-center justify-between border-b border-border py-4 last:border-0"
                >
                  <div className="min-w-0">
                    <p className="truncate font-body text-[14px] font-medium text-foreground">
                      {mc.title}
                    </p>
                    <p className="mt-1 font-body text-[12px] text-foreground-muted">
                      {formatDate(mc.scheduled_at)}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 font-body text-[11px] font-semibold ${
                      mc.status === "live"
                        ? "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400"
                        : "bg-accent-soft text-accent"
                    }`}
                  >
                    {mc.status === "live" ? "En direct" : "Programmée"}
                  </span>
                </div>
              ))
            )}
          </div>
        </AdminRevealItem>

        {/* Inscriptions récentes */}
        <AdminRevealItem className="rounded-card-lg border border-border bg-surface p-7">
          <h2 className="font-subheading text-[17px] font-semibold text-foreground">
            Inscriptions récentes
          </h2>

          <div className="mt-5 flex flex-col">
            {recent.length === 0 ? (
              <div className="flex flex-col items-center py-10 text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft">
                  <Users className="h-4.5 w-4.5 text-accent" strokeWidth={1.75} />
                </span>
                <p className="mt-4 font-body text-[13px] text-foreground-muted">
                  Aucune inscription pour l&apos;instant.
                </p>
              </div>
            ) : (
              recent.map((reg: any) => {
                const name = reg.profiles?.full_name ?? "Utilisateur";
                return (
                  <div
                    key={reg.id}
                    className="flex items-center gap-3 border-b border-border py-4 last:border-0"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft font-body text-[12px] font-semibold text-accent">
                      {name.slice(0, 2).toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-body text-[14px] font-medium text-foreground">
                        {name}
                      </p>
                      <p className="mt-0.5 truncate font-body text-[12px] text-foreground-muted">
                        {reg.masterclasses?.title}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 font-body text-[11px] font-semibold ${
                        reg.payment_status === "paid" || reg.payment_status === "free"
                          ? "bg-accent-soft text-accent"
                          : "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400"
                      }`}
                    >
                      {reg.payment_status === "free"
                        ? "Gratuit"
                        : reg.payment_status === "paid"
                          ? "Payé"
                          : "En attente"}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </AdminRevealItem>
      </div>
    </AdminReveal>
  );
}