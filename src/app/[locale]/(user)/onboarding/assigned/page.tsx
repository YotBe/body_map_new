import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getClaims } from '@/lib/auth/get-claims';
import { Link } from '@/i18n/navigation';

export const dynamic = 'force-dynamic';

export default async function AssignedPage({
  params,
}: {
  params: Promise<{ locale: 'en' | 'he' }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const claims = await getClaims();
  if (!claims) notFound();

  const supabase = await createSupabaseServerClient();

  const { data: enrollment } = await supabase
    .from('user_programs')
    .select('program_id, programs(name, description_md, duration_weeks)')
    .eq('user_id', claims.sub)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  // Supabase infers FK joins as arrays even for 1-1 relations — cast via unknown.
  const program = (enrollment?.programs as unknown) as
    | { name: string; description_md: string | null; duration_weeks: number }
    | null;

  return <AssignedShell program={program} />;
}

function AssignedShell({
  program,
}: {
  program: { name: string; description_md: string | null; duration_weeks: number } | null;
}) {
  const t = useTranslations('onboarding.assigned');
  const tApp = useTranslations('app');

  if (!program) {
    return (
      <main className="container mx-auto max-w-lg py-16 text-center">
        <p className="text-muted-foreground">No program assigned. Please contact support.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-lg py-16">
      <div className="rounded-xl border border-border bg-card p-8 shadow-sm text-center">
        {/* Check icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <p className="text-sm uppercase tracking-wide text-primary font-semibold">
          {tApp('name')}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="mt-3 text-muted-foreground">
          {t('subtitle', { programName: program.name })}
        </p>

        <div className="mt-6 rounded-lg bg-muted p-4 text-start">
          <p className="font-semibold">{program.name}</p>
          {program.description_md && (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-3">
              {program.description_md}
            </p>
          )}
          <p className="mt-2 text-xs text-muted-foreground">
            {program.duration_weeks} weeks · ~5 min/day
          </p>
        </div>

        <Link
          href="/today"
          className="mt-6 inline-block w-full rounded-md bg-primary px-4 py-3 font-medium text-primary-foreground shadow-sm hover:opacity-90 text-center"
        >
          {t('start')}
        </Link>
      </div>
    </main>
  );
}
