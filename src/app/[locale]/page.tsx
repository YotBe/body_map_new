import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/i18n/navigation';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: 'en' | 'he' }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations('app');

  return (
    <main className="container mx-auto max-w-2xl py-16">
      <h1 className="text-4xl font-bold tracking-tight">{t('name')}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{t('tagline')}</p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/login"
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
        >
          Sign in
        </Link>
      </div>
    </main>
  );
}
