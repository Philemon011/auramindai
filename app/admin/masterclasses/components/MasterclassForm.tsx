"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, AlertCircle } from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import { ListField } from "./ListField";
import { createMasterclass, updateMasterclass, MasterclassInput } from "../actions";

interface Props {
  mode: "create" | "edit";
  masterclassId?: string;
  initialData?: Partial<MasterclassInput>;
}

const emptyForm: MasterclassInput = {
  title: "",
  description: "",
  agenda: [""],
  requirements: [""],
  image_url: null,
  scheduled_at: "",
  type: "free",
  price: null,
  language: "fr",
  host_name: "",
};

export function MasterclassForm({ mode, masterclassId, initialData }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<MasterclassInput>({ ...emptyForm, ...initialData });
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const cleanedForm = {
      ...form,
      agenda: form.agenda.filter((a) => a.trim() !== ""),
      requirements: form.requirements.filter((r) => r.trim() !== ""),
    };

    if (!cleanedForm.title.trim()) {
      setError("Le titre est obligatoire.");
      return;
    }
    if (!cleanedForm.scheduled_at) {
      setError("La date et l'heure sont obligatoires.");
      return;
    }
    if (cleanedForm.type === "paid" && (!cleanedForm.price || cleanedForm.price <= 0)) {
      setError("Indique un prix pour une masterclass payante.");
      return;
    }

    startTransition(async () => {
      const result =
        mode === "create"
          ? await createMasterclass(cleanedForm)
          : await updateMasterclass(masterclassId!, cleanedForm);

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/admin/masterclasses");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {error && (
        <div className="flex items-center gap-2.5 rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900/40 dark:bg-red-950/30">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
          <p className="font-body text-[13px] text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Image */}
      <div>
        <label className="font-body text-[13px] font-medium text-foreground">Image de couverture</label>
        <div className="mt-2">
          <ImageUploader value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} />
        </div>
      </div>

      {/* Titre + description */}
      <div className="grid grid-cols-1 gap-5">
        <div>
          <label htmlFor="title" className="font-body text-[13px] font-medium text-foreground">
            Titre
          </label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Ex: Automatiser sa prospection avec l'IA"
            className="mt-2 h-12 w-full rounded-[12px] border border-border bg-surface px-4 font-body text-[15px] text-foreground outline-none transition-all duration-200 placeholder:text-foreground-muted/50 focus:border-accent focus:ring-4 focus:ring-accent/10"
          />
        </div>

        <div>
          <label htmlFor="description" className="font-body text-[13px] font-medium text-foreground">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Décris le contenu et les bénéfices de cette session..."
            className="mt-2 w-full resize-none rounded-[12px] border border-border bg-surface px-4 py-3 font-body text-[15px] text-foreground outline-none transition-all duration-200 placeholder:text-foreground-muted/50 focus:border-accent focus:ring-4 focus:ring-accent/10"
          />
        </div>
      </div>

      {/* Date + langue + intervenant */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="scheduled_at" className="font-body text-[13px] font-medium text-foreground">
            Date et heure
          </label>
          <input
            id="scheduled_at"
            type="datetime-local"
            value={form.scheduled_at}
            onChange={(e) => setForm({ ...form, scheduled_at: e.target.value })}
            className="mt-2 h-12 w-full rounded-[12px] border border-border bg-surface px-4 font-body text-[15px] text-foreground outline-none transition-all duration-200 focus:border-accent focus:ring-4 focus:ring-accent/10"
          />
        </div>

        <div>
          <label htmlFor="language" className="font-body text-[13px] font-medium text-foreground">
            Langue
          </label>
          <select
            id="language"
            value={form.language}
            onChange={(e) => setForm({ ...form, language: e.target.value as "fr" | "en" })}
            className="mt-2 h-12 w-full rounded-[12px] border border-border bg-surface px-4 font-body text-[15px] text-foreground outline-none transition-all duration-200 focus:border-accent focus:ring-4 focus:ring-accent/10"
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>

        <div>
          <label htmlFor="host_name" className="font-body text-[13px] font-medium text-foreground">
            Intervenant
          </label>
          <input
            id="host_name"
            type="text"
            value={form.host_name}
            onChange={(e) => setForm({ ...form, host_name: e.target.value })}
            placeholder="Ex: Ronel OUSSOU"
            className="mt-2 h-12 w-full rounded-[12px] border border-border bg-surface px-4 font-body text-[15px] text-foreground outline-none transition-all duration-200 placeholder:text-foreground-muted/50 focus:border-accent focus:ring-4 focus:ring-accent/10"
          />
        </div>
      </div>

      {/* Type + prix */}
      <div>
        <label className="font-body text-[13px] font-medium text-foreground">Tarif</label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <div className="inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1">
            {(["free", "paid"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setForm({ ...form, type: t })}
                className={`rounded-full px-5 py-2 font-body text-sm font-medium transition-colors duration-200 ${
                  form.type === t ? "bg-accent text-white" : "text-foreground-muted"
                }`}
              >
                {t === "free" ? "Gratuit" : "Payant"}
              </button>
            ))}
          </div>

          {form.type === "paid" && (
            <div className="relative flex-1">
              <input
                type="number"
                min={0}
                value={form.price ?? ""}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                placeholder="Prix"
                className="h-11 w-full rounded-[12px] border border-border bg-surface px-4 pr-16 font-body text-[15px] text-foreground outline-none transition-all duration-200 placeholder:text-foreground-muted/50 focus:border-accent focus:ring-4 focus:ring-accent/10"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-[13px] text-foreground-muted">
                FCFA
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Programme */}
      <ListField
        label="Programme de la session"
        placeholder="Ex: Construire un prompt de qualification"
        items={form.agenda}
        onChange={(agenda) => setForm({ ...form, agenda })}
      />

      {/* Prérequis */}
      <ListField
        label="Prérequis"
        placeholder="Ex: Avoir un ordinateur portable"
        items={form.requirements}
        onChange={(requirements) => setForm({ ...form, requirements })}
      />

      {/* Actions */}
      <div className="flex items-center gap-3 border-t border-border pt-6">
        <button
          type="submit"
          disabled={isPending}
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-button bg-accent px-7 font-body text-[15px] font-medium text-white transition-transform duration-200 hover:scale-[1.02] disabled:opacity-60"
        >
          {isPending ? "Enregistrement..." : mode === "create" ? "Créer la masterclass" : "Enregistrer"}
          {!isPending && (
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          )}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/masterclasses")}
          className="inline-flex h-12 items-center justify-center rounded-button border border-border px-7 font-body text-[15px] font-medium text-foreground"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}