import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Rafraîchit la session Supabase à chaque requête et la propage dans
 * les cookies de la réponse. Sans ça, la session d'un utilisateur peut
 * expirer silencieusement côté serveur alors qu'elle semble valide
 * côté navigateur — comportement classique avec Next.js App Router.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Important : ce getUser() revalide le token auprès de Supabase
  // (contrairement à getSession() qui fait juste confiance au cookie),
  // donc une session révoquée ou expirée est bien détectée ici.
  await supabase.auth.getUser();

  return response;
}