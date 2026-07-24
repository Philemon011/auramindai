"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowRight, AlertCircle, Mail, Eye, EyeOff } from "lucide-react";
import { AuthCard } from "../components/AuthCard";
import { signUp } from "../actions/auth";

export default function InscriptionPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (form.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    startTransition(async () => {
      const result = await signUp(form);
      if (result?.error) {
        setError(result.error);
      } else {
        setSent(true);
      }
    });
  }

  if (sent) {
    return (
      <AuthCard
        title="Vérifie ta boîte mail"
        subtitle="On a besoin de confirmer ton adresse email"
        panelHeadline="Rejoins des milliers d'apprenants dans le monde."
        panelQuote="L'ère de l'IA sera grande, nous voulons en être les acteurs incontournables."
        panelAuthor="Ronel OUSSOU, Fondateur d'AURAMIND AI"
        footer={
          <>
            Déjà confirmé ?{" "}
            <Link href="/connexion" className="font-medium text-accent">
              Se connecter
            </Link>
          </>
        }
      >
        <div className="flex flex-col items-center py-4 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft">
            <Mail className="h-6 w-6 text-accent" strokeWidth={1.75} />
          </span>
          <p className="mt-5 max-w-xs font-body text-[14px] leading-relaxed text-foreground-muted">
            Un email de confirmation a été envoyé à <strong className="text-foreground">{form.email}</strong>.
            Clique sur le lien qu&apos;il contient pour activer ton compte.
          </p>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Créer un compte"
      subtitle="Rejoins la communauté AURAMIND AI"
      panelHeadline="Rejoins des milliers d'apprenants dans le monde."
      panelQuote="L'ère de l'IA sera grande, nous voulons en être les acteurs incontournables."
      panelAuthor="Ronel OUSSOU, Fondateur d'AURAMIND AI"
      footer={
        <>
          Déjà un compte ?{" "}
          <Link href="/connexion" className="font-medium text-accent">
            Se connecter
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Ton nom"
            className="mt-2 h-12 w-full rounded-[12px] border border-border bg-surface px-4 font-body text-[15px] text-foreground outline-none transition-all duration-200 placeholder:text-foreground-muted/50 focus:border-accent focus:ring-4 focus:ring-accent/10"
          />
        </div>

        <div>
          <label htmlFor="email" className="font-body text-[13px] font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="ton@email.com"
            className="mt-2 h-12 w-full rounded-[12px] border border-border bg-surface px-4 font-body text-[15px] text-foreground outline-none transition-all duration-200 placeholder:text-foreground-muted/50 focus:border-accent focus:ring-4 focus:ring-accent/10"
          />
        </div>

        <div>
          <label htmlFor="password" className="font-body text-[13px] font-medium text-foreground">
            Mot de passe
          </label>
          <div className="relative mt-2">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="8 caractères minimum"
              className="h-12 w-full rounded-[12px] border border-border bg-surface px-4 pr-12 font-body text-[15px] text-foreground outline-none transition-all duration-200 placeholder:text-foreground-muted/50 focus:border-accent focus:ring-4 focus:ring-accent/10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center text-foreground-muted transition-colors duration-200 hover:text-foreground"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="group mt-3 inline-flex h-12 items-center justify-center gap-2 rounded-button bg-accent font-body text-[15px] font-medium text-white transition-transform duration-200 hover:scale-[1.02] disabled:opacity-60"
        >
          {isPending ? "Création..." : "Créer mon compte"}
          {!isPending && (
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          )}
        </button>
      </form>
    </AuthCard>
  );
}