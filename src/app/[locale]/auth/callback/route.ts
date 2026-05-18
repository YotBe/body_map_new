import { NextResponse, type NextRequest } from 'next/server';

import { createSupabaseServerClient } from '@/lib/supabase/server';

// OAuth + magic-link callback. MUST be a Route Handler (not a Page) so it can
// set cookies via the response. Plan §"Implementation Traps" #5.
//
// Flow:
//   1. `?code=` is exchanged for a session via exchangeCodeForSession.
//   2. We redirect to the post-auth landing route.
//   3. If the user has no profile row yet, the trigger in 0001_init_core.sql
//      created one — we route to /onboarding/profile.
//      Otherwise route to /today.
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const localeMatch = url.pathname.match(/^\/(en|he)\//);
  const locale = localeMatch ? localeMatch[1] : 'en';

  if (!code) {
    return NextResponse.redirect(new URL(`/${locale}/login?error=missing_code`, url));
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(
      new URL(`/${locale}/login?error=${encodeURIComponent(error.message)}`, url),
    );
  }

  // Decide first-page after auth.
  const { data: profile } = await supabase
    .from('profiles')
    .select('onboarded_at')
    .single();

  const target = profile?.onboarded_at ? `/${locale}/today` : `/${locale}/onboarding/profile`;
  return NextResponse.redirect(new URL(target, url));
}
