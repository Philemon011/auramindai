"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Calendar, Clock, PlayCircle, Check, Loader2 } from "lucide-react";
import { MyRegistration, requestReplay } from "../actions";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

const statusConfig = {
  free: { label: "Confirmée", className: "bg-accent-soft text-accent" },
  paid: { label: "Confirmée", className: "bg-accent-soft text-accent" },
  pending: { label: "Paiement en attente", className: "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400" },
  failed: { label: "Paiement échoué", className: "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400" },
} as const;

export function RegistrationCard({ registration, isPast }: { registration: MyRegistration; isPast: boolean }) {
  const { masterclass: mc, payment_status } = registration;
  const [requested, setRequested] = useState(false);
  const [isPending, startTransition] = useTransition();

  const status = statusConfig[payment_status as keyof typeof statusConfig] ?? statusConfig.free;

  function handleRequestReplay() {
    startTransition(async () => {
      const result = await requestReplay(mc.id);
      if (result?.success || result?.alreadyRequested) {
        setRequested(true);
      }
    });
  }

  return (
    <div className="flex flex-col gap-4 rounded-card-lg border border-border bg-surface p-4 sm:flex-row sm:items-center sm:p-4">
      <Link
        href={`/masterclasses/${mc.id}`}
        className="h-32 w-full shrink-0 overflow-hidden rounded-[12px] bg-accent-soft sm:h-16 sm:w-24"
      >
        {mc.image_url ? (
          <img src={mc.image_url} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-body text-[10px] text-accent">
            AURAMIND AI
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
          <span className="flex items-center gap-1" suppressHydrationWarning>
            <Clock className="h-3 w-3" />
            {formatTime(mc.scheduled_at)}
          </span>
          <span>Par {mc.host_name}</span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
        {!isPast && (
          <span className={`rounded-full px-2.5 py-1 font-body text-[11px] font-semibold ${status.className}`}>
            {status.label}
          </span>
        )}

        {isPast &&
          (mc.replay_url ? (
            
            <a  href={mc.replay_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-2 font-body text-[12px] font-medium text-white"
            >
              <PlayCircle className="h-3.5 w-3.5" />
              Voir le replay
            </a>
          ) : requested ? (
            <span className="flex items-center gap-1.5 rounded-full bg-accent-soft px-3.5 py-2 font-body text-[12px] font-medium text-accent">
              <Check className="h-3.5 w-3.5" />
              Replay demandé
            </span>
          ) : (
            <button
              onClick={handleRequestReplay}
              disabled={isPending}
              className="flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 font-body text-[12px] font-medium text-foreground transition-colors duration-200 hover:border-accent/40 hover:text-accent disabled:opacity-60"
            >
              {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <PlayCircle className="h-3.5 w-3.5" />}
              Demander le replay
            </button>
          ))}
      </div>
    </div>
  );
}