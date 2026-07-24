import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Client Supabase pour le serveur (Server Components, Server Actions,
 * Route Handlers). Lit/écrit la session depuis les cookies HTTP de la
 * requête, ce qui permet de savoir qui est connecté côté serveur.
 *
 * Toujours créer un nouveau client à chaque requête (jamais de singleton
 * global ici) — sinon la session d'un utilisateur peut fuiter vers un
 * autre utilisateur sur un serveur qui traite plusieurs requêtes.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll est appelé depuis un Server Component, où l'écriture
            // de cookies n'est pas autorisée. Sans danger à ignorer ici :
            // le middleware (étape suivante) se charge de rafraîchir
            // la session à chaque requête.
          }
        },
      },
    }
  );
}