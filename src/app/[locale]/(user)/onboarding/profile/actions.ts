'use server';

import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getClaims } from '@/lib/auth/get-claims';

export async function saveProfile(formData: FormData) {
  const claims = await getClaims();
  if (!claims) return { error: 'Not authenticated' };

  const supabase = await createSupabaseServerClient();

  const display_name = formData.get('display_name')?.toString().trim();
  const date_of_birth = formData.get('date_of_birth')?.toString() || null;
  const sex = formData.get('sex')?.toString() || null;
  const occupation = formData.get('occupation')?.toString().trim() || null;

  if (!display_name) return { error: 'Display name is required.' };

  const { error } = await supabase
    .from('profiles')
    .update({
      display_name,
      date_of_birth: date_of_birth || null,
      sex: sex || null,
      occupation: occupation || null,
    })
    .eq('user_id', claims.sub);

  if (error) return { error: error.message };

  // Get current locale from Referer or default to 'en'.
  redirect('/en/onboarding/body-map');
}
