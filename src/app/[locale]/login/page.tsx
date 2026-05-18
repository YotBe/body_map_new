import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { LoginForm } from './login-form';

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: 'en' | 'he' }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LoginShell />;
}

function LoginShell() {
  const t = useTranslations('login');
  return (
    <main className="container mx-auto flex min-h-screen max-w-md flex-col justify-center py-16">
      <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
      <p className="mt-2 text-muted-foreground">{t('subtitle')}</p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </main>
  );
}
