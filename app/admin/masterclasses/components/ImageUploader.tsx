"use client";

import { useRef, useState } from "react";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

/**
 * Génère un identifiant unique pour le nom de fichier, sans dépendre de
 * crypto.randomUUID() qui n'est pas disponible dans tous les contextes
 * (ex: accès via une IP locale plutôt que localhost). Suffisant ici : on a
 * juste besoin d'éviter une collision de nom de fichier, pas d'un UUID
 * cryptographiquement robuste.
 */
function generateFileId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function ImageUploader({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (url: string | null) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Le fichier doit être une image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("L'image ne doit pas dépasser 5 Mo.");
      return;
    }

    setUploading(true);
    const supabase = createClient();

    // Nom de fichier unique pour éviter tout écrasement accidentel d'une
    // image existante si deux masterclasses uploadent au même moment.
    const fileExt = file.name.split(".").pop();
    const fileName = `${generateFileId()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("masterclass-images")
      .upload(fileName, file);

    if (uploadError) {
      setError("Échec de l'upload. Réessaie.");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("masterclass-images").getPublicUrl(fileName);
    onChange(data.publicUrl);
    setUploading(false);
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {value ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-card border border-border">
          <img src={value} alt="" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label="Retirer l'image"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/80"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed border-border bg-background transition-colors duration-200 hover:border-accent/40 disabled:opacity-60"
        >
          {uploading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin text-accent" />
              <span className="font-body text-[13px] text-foreground-muted">Envoi en cours...</span>
            </>
          ) : (
            <>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft">
                <ImagePlus className="h-4.5 w-4.5 text-accent" strokeWidth={1.75} />
              </span>
              <span className="font-body text-[13px] font-medium text-foreground">
                Cliquer pour ajouter une image
              </span>
              <span className="font-body text-[12px] text-foreground-muted">JPG, PNG — 5 Mo max</span>
            </>
          )}
        </button>
      )}

      {error && <p className="mt-2 font-body text-[13px] text-red-500">{error}</p>}
    </div>
  );
}