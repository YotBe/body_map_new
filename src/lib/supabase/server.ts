import 'server-only';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getPublicEnv } from '@/lib/env';

// Per-request Supabase client for Server Components / Server Actions /
// Route Handlers. Reads & writes the auth cookie via `next/headers.cookies()`.
//
// Plan §"Implementation Traps" #2 — server code MUST use getClaims() / getUser(),
// NEVER getSession(). See @/lib/auth/get-claims.ts.
export async function createSupabaseServerClient() {
  const env = getPublicEnv();
  const cookieStore = await cookies();

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }: { name: string; value: string; options: CookieOptions }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Components can't set cookies; that's fine — proxy.ts refreshes them.
            // This `try/catch` keeps Server Components from crashing on auth-cookie writes.
          }
        },
      },
    },
  );
}
