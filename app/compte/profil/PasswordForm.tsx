"use client";

import { useState, useTransition } from "react";
import { Check, AlertCircle, Eye, EyeOff } from "lucide-react";
import { updatePassword } from "./actions";

export function PasswordForm() {
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);

    if (form.next.length < 8) {
      setError("Le nouveau mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (form.next !== form.confirm) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    startTransition(async () => {
      const result = await updatePassword(form.current, form.next);
      if (result?.error) {
        setError(result.error);
      } else {
        setSaved(true);
        setForm({ current: "", next: "", confirm: "" });
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
        <label htmlFor="current" className="font-body text-[13px] font-medium text-foreground">
          Mot de passe actuel
        </label>
        <div className="relative mt-2">
          <input
            id="current"
            type={showCurrent ? "text" : "password"}
            value={form.current}
            onChange={(e) => setForm({ ...form, current: e.target.value })}
            className="h-12 w-full rounded-[12px] border border-border bg-background px-4 pr-12 font-body text-[15px] text-foreground outline-none transition-all duration-200 focus:border-accent focus:ring-4 focus:ring-accent/10"
          />
          <button
            type="button"
            onClick={() => setShowCurrent((v) => !v)}
            className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center text-foreground-muted"
          >
            {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="next" className="font-body text-[13px] font-medium text-foreground">
            Nouveau mot de passe
          </label>
          <div className="relative mt-2">
            <input
              id="next"
              type={showNext ? "text" : "password"}
              value={form.next}
              onChange={(e) => setForm({ ...form, next: e.target.value })}
              className="h-12 w-full rounded-[12px] border border-border bg-background px-4 pr-12 font-body text-[15px] text-foreground outline-none transition-all duration-200 focus:border-accent focus:ring-4 focus:ring-accent/10"
            />
            <button
              type="button"
              onClick={() => setShowNext((v) => !v)}
              className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center text-foreground-muted"
            >
              {showNext ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="confirm" className="font-body text-[13px] font-medium text-foreground">
            Confirmer
          </label>
          <input
            id="confirm"
            type={showNext ? "text" : "password"}
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            className="mt-2 h-12 w-full rounded-[12px] border border-border bg-background px-4 font-body text-[15px] text-foreground outline-none transition-all duration-200 focus:border-accent focus:ring-4 focus:ring-accent/10"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="flex h-11 items-center justify-center rounded-button border border-border px-6 font-body text-[14px] font-medium text-foreground transition-colors duration-200 hover:border-accent/40 disabled:opacity-60"
        >
          {isPending ? "Mise à jour..." : "Changer le mot de passe"}
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 font-body text-[13px] font-medium text-accent">
            <Check className="h-4 w-4" />
            Mot de passe changé
          </span>
        )}
      </div>
    </form>
  );
}