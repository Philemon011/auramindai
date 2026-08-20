"use client";

import { useEffect, useState } from "react";
import { PlayCircle } from "lucide-react";
import Link from "next/link";
import { AdminReveal, AdminRevealItem } from "../../admin/components/AdminReveal";
import { ReplayRequestCard } from "./ReplayRequestCard";
import { getMyReplayRequests, MyReplayRequest } from "./actions";

export default function MyReplaysPage() {
  const [requests, setRequests] = useState<MyReplayRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyReplayRequests().then((data) => {
      setRequests(data);
      setLoading(false);
    });
  }, []);

  const readyCount = requests.filter((r) => r.status === "sent" && r.masterclass?.replay_url).length;

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
          Replays demandés
        </h1>
        <p className="mt-1.5 font-body text-[14px] text-foreground-muted">
          {requests.length === 0
            ? "Aucune demande pour l'instant."
            : `${readyCount} sur ${requests.length} disponible${readyCount > 1 ? "s" : ""}.`}
        </p>
      </AdminRevealItem>

      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-card-lg bg-surface" />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <AdminRevealItem className="flex flex-col items-center rounded-card-lg border border-border bg-surface py-20 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft">
            <PlayCircle className="h-5 w-5 text-accent" strokeWidth={1.75} />
          </span>
          <p className="mt-4 font-subheading text-lg font-semibold text-foreground">
            Aucun replay demandé
          </p>
          <p className="mt-1.5 max-w-xs font-body text-[14px] text-foreground-muted">
            Tu peux demander le replay d&apos;une masterclass passée depuis
            l&apos;onglet &laquo;&nbsp;Mes masterclasses&nbsp;&raquo;.
          </p>
          <Link
            href="/compte"
            className="mt-6 inline-flex items-center gap-2 rounded-button bg-accent px-6 font-body text-[14px] font-medium text-white"
            style={{ height: "44px" }}
          >
            Voir mes masterclasses
          </Link>
        </AdminRevealItem>
      ) : (
        <AdminRevealItem className="flex flex-col gap-3">
          {requests.map((r) => (
            <ReplayRequestCard key={r.id} request={r} />
          ))}
        </AdminRevealItem>
      )}
    </AdminReveal>
  );
}