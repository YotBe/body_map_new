import { setRequestLocale } from 'next-intl/server';
import RehabApp from './rehab-app';

export default async function TodayPage({
  params,
}: {
  params: Promise<{ locale: 'en' | 'he' }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <RehabApp defaultLang={locale} />;
}
