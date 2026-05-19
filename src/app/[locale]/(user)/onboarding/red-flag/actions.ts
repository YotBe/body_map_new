'use server';

import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getClaims } from '@/lib/auth/get-claims';
import { RED_FLAG_VERSION } from '@/lib/triage/red-flags';
import { assignProgram } from '@/lib/triage/program-assignment';

export async function submitRedFlag(
  answers: Record<string, boolean>,
  anyPositive: boolean,
) {
  const claims = await getClaims();
  if (!claims) return { error: 'Not authenticated' };

  const supabase = await createSupabaseServerClient();

  // 1. Persist the immutable red-flag screen record (versioned).
  const { error: rfError } = await supabase.from('red_flag_screens').insert({
    user_id: claims.sub,
    version: RED_FLAG_VERSION,
    answers,
    any_positive: anyPositive,
  });
  if (rfError) return { error: rfError.message };

  // 2. If any red flag is positive → route to referral, do NOT create a program.
  if (anyPositive) {
    redirect('/en/onboarding/referral');
  }

  // 3. Fetch the user's body-map symptoms to assign a program.
  const { data: symptoms } = await supabase
    .from('body_map_symptoms')
    .select('region_code, severity_vas')
    .eq('user_id', claims.sub)
    .order('created_at', { ascending: false });

  const programCode = assignProgram(symptoms ?? []);

  // 4. Look up the program row.
  const { data: program } = await supabase
    .from('programs')
    .select('id')
    .eq('code', programCode)
    .single();

  if (!program) {
    // Fallback: use general_posture program.
    const { data: fallback } = await supabase
      .from('programs')
      .select('id')
      .eq('code', 'general_posture')
      .single();
    if (!fallback) return { error: 'Program not found. Run database seed.' };

    await supabase.from('user_programs').insert({
      user_id: claims.sub,
      program_id: fallback.id,
    });
  } else {
    await supabase.from('user_programs').insert({
      user_id: claims.sub,
      program_id: program.id,
    });
  }

  // 5. Mark onboarding complete.
  await supabase
    .from('profiles')
    .update({ onboarded_at: new Date().toISOString() })
    .eq('user_id', claims.sub);

  redirect('/en/onboarding/assigned');
}
