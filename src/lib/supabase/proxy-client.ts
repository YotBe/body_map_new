import 'server-only';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import type { NextRequest, NextResponse } from 'next/server';
import { getPublicEnv } from '@/lib/env';

// Supabase client for use inside `proxy.ts` (Next.js 16's renamed middleware).
// Reads cookies from the incoming request; writes to BOTH request and response
// so downstream RSCs see the refreshed cookie immediately.
export function createSupabaseProxyClient(
  request: NextRequest,
  response: NextResponse,
) {
  const env = getPublicEnv();
  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );
}
