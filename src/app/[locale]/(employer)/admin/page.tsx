import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { requireEmployerAdmin } from '@/lib/auth/require-employer-admin';
import { createSupabaseServerClient } from '@/lib/supabase/server';

// Force dynamic — never cache aggregate dashboard. Plan §"Caching strategy".
export const dynamic = 'force-dynamic';

type DashboardStats = {
  enrolled: number;
  active_8wk: number;
  avg_pain_reduction: number | null;
  completion_pct: number | null;
  k_anonymous: boolean;
};

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: 'en' | 'he' }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { employerId } = await requireEmployerAdmin(locale);
  const supabase = await createSupabaseServerClient();

  // Call the SECURITY DEFINER aggregate function. THIS is the only path by
  // which an employer admin can read user-linked numbers. RLS prohibits
  // direct selects from memberships / session_logs.
  const { data, error } = await supabase.rpc('employer_dashboard_stats', {
    p_employer_id: employerId,
  });

  const stats: DashboardStats | null =
    Array.isArray(data) && data.length > 0 ? (data[0] as DashboardStats) : null;

  return <AdminShell stats={stats} hasError={!!error} />;
}

function AdminShell({
  stats,
  hasError,
}: {
  stats: DashboardStats | null;
  hasError: boolean;
}) {
  const t = useTranslations('admin');

  if (hasError || !stats) {
    return (
      <main className="container mx-auto max-w-4xl py-16">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="mt-4 rounded-md bg-destructive/10 p-3 text-destructive">
          Failed to load dashboard.
        </p>
      </main>
    );
  }

  if (!stats.k_anonymous) {
    return (
      <main className="container mx-auto max-w-4xl py-16">
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="mt-2 text-muted-foreground">
          {t('enrolled')}: {stats.enrolled}
        </p>
        <p className="mt-8 rounded-md bg-muted p-4 text-sm">{t('kAnonNotice')}</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-4xl py-16">
      <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card label={t('enrolled')} value={String(stats.enrolled)} />
        <Card label={t('active8wk')} value={String(stats.active_8wk)} />
        <Card
          label={t('painReduction')}
          value={stats.avg_pain_reduction !== null ? `${stats.avg_pain_reduction}` : '—'}
        />
        <Card
          label={t('completionPct')}
          value={stats.completion_pct !== null ? `${stats.completion_pct}%` : '—'}
        />
      </div>
    </main>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}
