"use client";

import Link from "next/link";
import { PlayCircle, Clock, Calendar } from "lucide-react";
import { MyReplayRequest } from "./actions";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

export function ReplayRequestCard({ request }: { request: MyReplayRequest }) {
  const { masterclass: mc, status } = request;
  const isReady = status === "sent" && mc.replay_url;

  return (
    <div className="flex flex-col gap-4 rounded-card-lg border border-border bg-surface p-4 sm:flex-row sm:items-center">
      <Link
        href={`/masterclasses/${mc.id}`}
        className="relative h-32 w-full shrink-0 overflow-hidden rounded-[12px] bg-accent-soft sm:h-16 sm:w-24"
      >
        {mc.image_url ? (
          <img src={mc.image_url} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-body text-[10px] text-accent">
            AURAMIND AI
          </div>
        )}
        {isReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <PlayCircle className="h-7 w-7 text-white" strokeWidth={1.5} />
          </div>
        )}
      </Link>

      <div className="min-w-0 flex-1">
        <Link href={`/masterclasses/${mc.id}`}>
          <p className="truncate font-body text-[15px] font-semibold text-foreground hover:text-accent">
            {mc.title}
          </p>
        </Link>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 font-body text-[13px] text-foreground-muted">
          <span className="flex items-center gap-1" suppressHydrationWarning>
            <Calendar className="h-3 w-3" />
            {formatDate(mc.scheduled_at)}
          </span>
          <span>Par {mc.host_name}</span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
        {isReady ? (
          
          <a  href={mc.replay_url!}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 font-body text-[12px] font-medium text-white"
          >
            <PlayCircle className="h-3.5 w-3.5" />
            Regarder le replay
          </a>
        ) : (
          <span className="flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 font-body text-[12px] font-medium text-foreground-muted">
            <Clock className="h-3.5 w-3.5" />
            En attente d&apos;envoi
          </span>
        )}
      </div>
    </div>
  );
}