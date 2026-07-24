"use client";

import { useState, useTransition } from "react";
import { Link2, Check, Users, ExternalLink } from "lucide-react";
import { setReplayUrl } from "./actions";

interface Props {
  masterclass: {
    id: string;
    title: string;
    scheduled_at: string;
    replay_url: string | null;
    pendingCount: number;
    requests: { id: string; status: string; profiles: { full_name: string }[] | null }[];
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

export function ReplayCard({ masterclass }: Props) {
  const [url, setUrl] = useState(masterclass.replay_url ?? "");
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSave() {
    if (!url.trim()) return;
    startTransition(async () => {
      const result = await setReplayUrl(masterclass.id, url.trim());
      if (result?.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    });
  }

  return (
    <div className="rounded-card-lg border border-border bg-surface p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-body text-[15px] font-semibold text-foreground">{masterclass.title}</p>
          <p className="mt-1 font-body text-[13px] text-foreground-muted">
            {formatDate(masterclass.scheduled_at)}
          </p>
        </div>

        <span className="flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 font-body text-[12px] font-semibold text-accent">
          <Users className="h-3.5 w-3.5" />
          {masterclass.requests.length} demande{masterclass.requests.length !== 1 ? "s" : ""}
          {masterclass.pendingCount > 0 && ` · ${masterclass.pendingCount} en attente`}
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Link2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="h-11 w-full rounded-[12px] border border-border bg-background pl-10 pr-4 font-body text-[14px] text-foreground outline-none transition-all duration-200 placeholder:text-foreground-muted/50 focus:border-accent focus:ring-4 focus:ring-accent/10"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={isPending || !url.trim()}
          className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-button bg-accent px-5 font-body text-[14px] font-medium text-white transition-transform duration-200 hover:scale-[1.02] disabled:opacity-50"
        >
          {saved ? <Check className="h-4 w-4" /> : null}
          {isPending ? "..." : saved ? "Enregistré" : masterclass.replay_url ? "Mettre à jour" : "Envoyer aux inscrits"}
        </button>

        {masterclass.replay_url && (
          
         <a   href={masterclass.replay_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ouvrir le replay"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-button border border-border text-foreground-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>

      {/* Liste des demandeurs, repliable visuellement en petite liste discrète */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {masterclass.requests.map((req) => (
          <span
            key={req.id}
            className={`rounded-full px-2.5 py-1 font-body text-[11px] font-medium ${
              req.status === "sent"
                ? "bg-accent-soft text-accent"
                : "border border-border text-foreground-muted"
            }`}
          >
            {req.profiles?.[0]?.full_name ?? "Utilisateur"}
          </span>
        ))}
      </div>
    </div>
  );
}