import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase "admin" — utilise la clé secrète et CONTOURNE toutes
 * les règles de sécurité (Row Level Security) de la base.
 *
 * RÈGLES DE SÉCURITÉ STRICTES :
 * - Ne JAMAIS importer ce fichier dans un composant marqué "use client"
 * - Ne JAMAIS l'utiliser dans une route accessible sans vérification
 *   préalable que l'utilisateur est bien administrateur
 * - Réservé aux Server Actions / Route Handlers du dashboard admin,
 *   après vérification explicite du rôle de l'utilisateur connecté
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}