import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { BodyMapStep } from './body-map-step';

export default async function OnboardingBodyMapPage({
  params,
}: {
  params: Promise<{ locale: 'en' | 'he' }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Shell />;
}

function Shell() {
  const t = useTranslations('onboarding.bodyMap');
  return (
    <main className="container mx-auto max-w-lg py-12">
      <div className="mb-2 flex gap-1">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`h-1 flex-1 rounded-full ${step <= 2 ? 'bg-primary' : 'bg-muted'}`}
          />
        ))}
      </div>
      <h1 className="mt-6 text-3xl font-bold tracking-tight">{t('title')}</h1>
      <p className="mt-2 text-muted-foreground">{t('subtitle')}</p>
      <div className="mt-8">
        <BodyMapStep />
      </div>
    </main>
  );
}
