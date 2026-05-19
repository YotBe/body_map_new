'use server';

import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getClaims } from '@/lib/auth/get-claims';
import type { SymptomEntry } from '@/components/body-map/BodyMap';

export async function saveSymptoms(symptoms: SymptomEntry[]) {
  const claims = await getClaims();
  if (!claims) return { error: 'Not authenticated' };

  const supabase = await createSupabaseServerClient();

  // Insert one row per symptom (even if empty — we insert nothing for
  // prevention-only users, which is correct: no body_map_symptoms rows
  // means program-assignment defaults to general_posture).
  if (symptoms.length > 0) {
    const rows = symptoms.map((s) => ({
      user_id: claims.sub,
      region_code: s.region_code,
      side: s.side,
      severity_vas: s.severity_vas,
    }));

    const { error } = await supabase.from('body_map_symptoms').insert(rows);
    if (error) return { error: error.message };
  }

  redirect('/en/onboarding/red-flag');
}
