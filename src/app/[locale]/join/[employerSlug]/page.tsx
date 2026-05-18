import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';

// Employer-coded signup landing. Visitors arriving from a company-shared link
// see their employer's branding before signing in. After auth, the callback
// route creates the membership row.
//
// MVP: this page is a thin "welcome + login" view. Membership attach moves to
// the callback once the join token mechanism is wired (Phase 1).
export default async function JoinByEmployer({
  params,
}: {
  params: Promise<{ locale: 'en' | 'he'; employerSlug: string }>;
}) {
  const { locale, employerSlug } = await params;
  setRequestLocale(locale);

  const supabase = await createSupabaseServerClient();
  const { data: employer } = await supabase
    .from('employers')
    .select('name, slug')
    .eq('slug', employerSlug)
    .maybeSingle();

  if (!employer) {
    return (
      <main className="container mx-auto max-w-md py-16 text-center">
        <h1 className="text-2xl font-bold">Invalid invite link</h1>
        <p className="mt-2 text-muted-foreground">
          That employer link doesn&apos;t exist. Check with your HR team.
        </p>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-md py-16">
      <h1 className="text-3xl font-bold tracking-tight">
        Welcome from {employer.name}
      </h1>
      <p className="mt-4 text-muted-foreground">
        Your employer has invited you to join PhysioDesk — a 12-week resistance-band
        program for desk-worker pain prevention.
      </p>
      <Link
        href="/login"
        className="mt-8 inline-block rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
      >
        Sign in to get started
      </Link>
    </main>
  );
}
