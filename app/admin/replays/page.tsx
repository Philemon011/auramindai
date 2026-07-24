import { PlayCircle } from "lucide-react";
import { AdminReveal, AdminRevealItem } from "../components/AdminReveal";
import { ReplayCard } from "./ReplayCard";
import { getMasterclassesWithReplayRequests } from "./actions";

export default async function AdminReplaysPage() {
  const masterclasses = await getMasterclassesWithReplayRequests();
  const totalPending = masterclasses.reduce((sum, mc) => sum + mc.pendingCount, 0);

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
          Demandes de replay
        </h1>
        <p className="mt-1.5 font-body text-[14px] text-foreground-muted">
          {totalPending > 0
            ? `${totalPending} demande${totalPending !== 1 ? "s" : ""} en attente.`
            : "Aucune demande en attente."}
        </p>
      </AdminRevealItem>

      {masterclasses.length === 0 ? (
        <AdminRevealItem className="flex flex-col items-center rounded-card-lg border border-border bg-surface py-20 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft">
            <PlayCircle className="h-5 w-5 text-accent" strokeWidth={1.75} />
          </span>
          <p className="mt-4 font-subheading text-lg font-semibold text-foreground">
            Aucune demande de replay pour l&apos;instant
          </p>
          <p className="mt-1.5 max-w-xs font-body text-[14px] text-foreground-muted">
            Elles apparaîtront ici dès qu&apos;un utilisateur en fera la demande.
          </p>
        </AdminRevealItem>
      ) : (
        <AdminRevealItem className="flex flex-col gap-4">
          {masterclasses.map((mc) => (
            <ReplayCard key={mc.id} masterclass={mc} />
          ))}
        </AdminRevealItem>
      )}
    </AdminReveal>
  );
}