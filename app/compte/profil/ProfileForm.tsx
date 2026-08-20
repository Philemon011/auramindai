"use client";

import { useState, useTransition } from "react";
import { Check, AlertCircle } from "lucide-react";
import { updateProfile } from "./actions";

export function ProfileForm({ initialName, email }: { initialName: string; email: string }) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);

    if (!name.trim()) {
      setError("Le nom ne peut pas être vide.");
      return;
    }

    startTransition(async () => {
      const result = await updateProfile(name.trim());
      if (result?.error) {
        setError(result.error);
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <div className="flex items-center gap-2.5 rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900/40 dark:bg-red-950/30">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
          <p className="font-body text-[13px] text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="font-body text-[13px] font-medium text-foreground">
          Nom complet
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 h-12 w-full rounded-[12px] border border-border bg-background px-4 font-body text-[15px] text-foreground outline-none transition-all duration-200 focus:border-accent focus:ring-4 focus:ring-accent/10"
        />
      </div>

      <div>
        <label className="font-body text-[13px] font-medium text-foreground">Email</label>
        <div className="mt-2 flex h-12 items-center rounded-[12px] border border-border bg-border/30 px-4">
          <span className="font-body text-[15px] text-foreground-muted">{email}</span>
        </div>
        <p className="mt-1.5 font-body text-[12px] text-foreground-muted">
          L&apos;email ne peut pas être modifié pour l&apos;instant.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="flex h-11 items-center justify-center rounded-button bg-accent px-6 font-body text-[14px] font-medium text-white transition-transform duration-200 hover:scale-[1.02] disabled:opacity-60"
        >
          {isPending ? "Enregistrement..." : "Enregistrer"}
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 font-body text-[13px] font-medium text-accent">
            <Check className="h-4 w-4" />
            Profil mis à jour
          </span>
        )}
      </div>
    </form>
  );
}