import { setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

import { requireUser } from '@/lib/auth/require-user';

// Gate all routes under `(user)` — redirects unauthenticated visitors to /login.
// Plan §"Auth Flow" — requireUser is a cached server-side guard.
export default async function UserLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: 'en' | 'he' }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  await requireUser(locale);
  return <>{children}</>;
}
