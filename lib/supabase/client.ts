import { createBrowserClient } from "@supabase/ssr";

/**
 * Client Supabase pour le navigateur (Client Components).
 * Utilise la clé publique (publishable) — sans danger à exposer,
 * car les vraies règles de sécurité vivent dans les policies RLS
 * de la base de données, pas dans cette clé.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}