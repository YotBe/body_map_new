import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from '@/i18n/routing';
import { createSupabaseProxyClient } from '@/lib/supabase/proxy-client';

// Next.js 16 renamed `middleware.ts` to `proxy.ts`. Plan §"Critical 2026 facts" #1.
//
// Responsibilities here, in order:
//   1. Locale negotiation + locale-prefix redirect via next-intl.
//   2. Supabase session-cookie refresh (so SSR sees a fresh JWT every request).
//   3. Cache-Control: private, no-store on authenticated responses
//      so Vercel's CDN never caches per-user content.

const intlMiddleware = createIntlMiddleware(routing);

const PUBLIC_PATHS = new Set<string>([
  '/login',
  '/auth/callback',
]);

function isPublicPath(pathname: string): boolean {
  // Strip locale prefix: /en/login -> /login, /he/auth/callback -> /auth/callback
  const stripped = pathname.replace(/^\/(en|he)(?=\/|$)/, '') || '/';
  if (PUBLIC_PATHS.has(stripped)) return true;
  if (stripped === '/') return true;
  if (stripped.startsWith('/join/')) return true;
  return false;
}

export async function proxy(request: NextRequest) {
  // 1. next-intl handles locale routing first.
  const response = intlMiddleware(request);

  // 2. Refresh Supabase session cookies on every request.
  // Wrap in try/catch so an unconfigured Supabase env doesn't 500 the whole site
  // before the user has provisioned the project.
  try {
    const supabase = createSupabaseProxyClient(request, response);
    // Touch the session to trigger refresh. We don't check the result here —
    // page-level guards (requireUser / requireEmployerAdmin) do the auth check.
    if (
      typeof (supabase.auth as unknown as { getClaims?: unknown }).getClaims === 'function'
    ) {
      await (supabase.auth as unknown as {
        getClaims: () => Promise<unknown>;
      }).getClaims();
    } else {
      await supabase.auth.getUser();
    }
  } catch {
    // Supabase not configured yet — let the request through; pages will redirect.
  }

  // 3. Set Cache-Control on non-public paths so the CDN never caches per-user content.
  if (!isPublicPath(request.nextUrl.pathname)) {
    response.headers.set('Cache-Control', 'private, no-store, max-age=0');
  }

  return response;
}

export const config = {
  // Skip static assets, API routes, _next internals, favicon.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
