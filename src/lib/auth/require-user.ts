import 'server-only';
import { redirect } from '@/i18n/navigation';
import { getClaims } from './get-claims';

// Redirect-if-unauthenticated guard for user-only routes.
// Use inside Server Components / layouts.
export async function requireUser(locale: 'en' | 'he') {
  const claims = await getClaims();
  if (!claims) {
    redirect({ href: '/login', locale });
  }
  return claims!;
}
