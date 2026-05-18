import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { getPublicEnv, getServerEnv } from '@/lib/env';

// Service-role client. BYPASSES Row Level Security.
// Use ONLY in webhook route handlers, cron jobs, or admin scripts.
// NEVER import from a Server Component or Server Action that runs in the
// per-user request context — that defeats RLS.
//
// The `import 'server-only'` directive plus the explicit name `admin.ts` are
// the boundary. If this file is ever imported by a `'use client'` file, the
// Next.js build will fail.
export function createSupabaseAdminClient() {
  const publicEnv = getPublicEnv();
  const serverEnv = getServerEnv();
  if (!serverEnv.SUPABASE_SECRET_KEY) {
    throw new Error('SUPABASE_SECRET_KEY is required to create an admin client.');
  }
  return createClient(publicEnv.NEXT_PUBLIC_SUPABASE_URL, serverEnv.SUPABASE_SECRET_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
