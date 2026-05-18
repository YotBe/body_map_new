import 'server-only';
import { cache } from 'react';
import { createSupabaseServerClient } from '@/lib/supabase/server';

// React-cached server-side claims fetch. Multiple callers in the same render
// (e.g. layout + page) share a single Supabase round-trip.
//
// Plan §"Critical 2026 facts" #2 — Supabase auth.getClaims() is the new
// canonical primitive for server-side identity verification. It validates the
// JWT signature against Supabase's published public keys, so it works without
// any extra network round-trip once the cache is warm. NEVER use getSession()
// server-side — Supabase explicitly warns against it.
export const getClaims = cache(async () => {
  const supabase = await createSupabaseServerClient();
  // Supabase JS ≥ 2.47 exposes auth.getClaims(). On older versions, fall back
  // to getUser() which is still safe (round-trips to the auth server, costs
  // ~30ms — getClaims is preferred for perf).
  if (typeof (supabase.auth as unknown as { getClaims?: unknown }).getClaims === 'function') {
    const { data, error } = await (supabase.auth as unknown as {
      getClaims: () => Promise<{ data: { claims: { sub: string; email?: string } | null }; error: Error | null }>;
    }).getClaims();
    if (error) return null;
    return data.claims;
  }
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return { sub: data.user.id, email: data.user.email ?? undefined };
});
