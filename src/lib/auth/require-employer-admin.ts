import 'server-only';
import { cache } from 'react';
import { redirect } from '@/i18n/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getClaims } from './get-claims';

// Redirect-if-not-admin guard for employer dashboard routes.
// Cached so layout + page only hit the DB once per render.
export const requireEmployerAdmin = cache(async (locale: 'en' | 'he') => {
  const claims = await getClaims();
  if (!claims) {
    redirect({ href: '/login', locale });
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('employer_admins')
    .select('employer_id, role')
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    redirect({ href: '/today', locale });
  }

  return {
    userId: claims!.sub,
    employerId: data!.employer_id as string,
    role: data!.role as 'admin' | 'viewer',
  };
});
