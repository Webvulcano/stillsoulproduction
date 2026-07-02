import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Szerver-oldali Supabase kliens (session a cookie-kból; server action / guard).
// Next 16: a cookies() aszinkron.
export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
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
            // Server Componentből hívva a set nem engedett — a middleware frissíti.
          }
        },
      },
    }
  );
}
