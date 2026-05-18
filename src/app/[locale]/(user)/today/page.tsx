import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

// Stub for Phase 2. Today's session queue + RPE input land here.
export default async function TodayPage({
  params,
}: {
  params: Promise<{ locale: 'en' | 'he' }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TodayShell />;
}

function TodayShell() {
  const t = useTranslations('today');
  return (
    <main className="container mx-auto max-w-2xl py-16">
      <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
      <p className="mt-4 text-muted-foreground">{t('noProgram')}</p>
      <p className="mt-8 text-xs uppercase tracking-wide text-muted-foreground">
        Phase 2 stub — session queue + RPE input land here.
      </p>
    </main>
  );
}
