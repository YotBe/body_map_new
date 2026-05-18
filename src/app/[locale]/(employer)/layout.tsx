import { setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

import { requireEmployerAdmin } from '@/lib/auth/require-employer-admin';

// Gate all routes under `(employer)` — redirects non-admins to /today.
export default async function EmployerLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: 'en' | 'he' }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  await requireEmployerAdmin(locale);
  return <>{children}</>;
}
