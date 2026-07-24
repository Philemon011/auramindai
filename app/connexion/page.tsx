"use client";

import { Suspense, useState, useTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";
import { AuthCard } from "../components/AuthCard";
import { signIn } from "../actions/auth";

function ConnexionForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? undefined;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await signIn(form, next);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <AuthCard
      title="Content de te revoir"
      subtitle="Connecte-toi pour accéder à tes masterclasses"
      panelHeadline="Continue à faire travailler l'IA pour toi."
      panelQuote="L'ère de l'IA sera grande, nous voulons en être les acteurs incontournables."
      panelAuthor="Ronel OUSSOU, Fondateur d'AURAMIND AI"
      footer={
        <>
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="font-medium text-accent">
            Créer un compte
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
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="font-body text-[13px] font-medium text-foreground">
              Mot de passe
            </label>
            <Link href="/mot-de-passe-oublie" className="font-body text-[13px] font-medium text-accent">
              Oublié ?
            </Link>
          </div>
          <div className="relative mt-2">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
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
          {isPending ? "Connexion..." : "Se connecter"}
          {!isPending && (
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          )}
        </button>
      </form>
    </AuthCard>
  );
}

export default function ConnexionPage() {
  return (
    <Suspense fallback={null}>
      <ConnexionForm />
    </Suspense>
  );
}