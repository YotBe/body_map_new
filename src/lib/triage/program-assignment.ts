// Program-assignment rules engine (v1 — pure rules, no ML).
//
// Input: the user's body-map symptom records from the DB.
// Output: the `code` of the program to enroll the user in.
//
// Priority logic:
//   1. Any wrist / forearm region with VAS >= 4  → wrist_forearm
//   2. Any neck / shoulder region with VAS >= 4  → neck_shoulder
//   3. Lumbar with VAS >= 4                       → lower_back
//   4. Any region with VAS 1-3 (mild)            → general_posture
//   5. No symptoms / all VAS = 0                 → general_posture

import { BODY_REGIONS } from './body-regions';

export interface SymptomInput {
  region_code: string;
  severity_vas: number;
}

/** Returns the program_code to assign based on the highest-priority symptom. */
export function assignProgram(symptoms: SymptomInput[]): string {
  if (!symptoms || symptoms.length === 0) return 'general_posture';

  // Annotate each symptom with its program hint from the region registry.
  const annotated = symptoms
    .map((s) => {
      const region = BODY_REGIONS.find((r) => r.code === s.region_code);
      return { ...s, programHint: region?.programHint ?? 'general_posture' };
    })
    .filter((s) => s.severity_vas > 0);

  if (annotated.length === 0) return 'general_posture';

  // Find the highest VAS symptom per program hint group.
  const highestByHint = new Map<string, number>();
  for (const s of annotated) {
    const current = highestByHint.get(s.programHint) ?? 0;
    if (s.severity_vas > current) {
      highestByHint.set(s.programHint, s.severity_vas);
    }
  }

  // Priority 1: wrist/forearm VAS >= 4
  const wristVas = highestByHint.get('wrist_forearm') ?? 0;
  if (wristVas >= 4) return 'wrist_forearm';

  // Priority 2: neck/shoulder VAS >= 4
  const neckVas = highestByHint.get('neck_shoulder') ?? 0;
  if (neckVas >= 4) return 'neck_shoulder';

  // Priority 3: lower back VAS >= 4
  const backVas = highestByHint.get('lower_back') ?? 0;
  if (backVas >= 4) return 'lower_back';

  // Priority 4+: mild symptoms or general — pick the program hint with
  // the highest VAS among remaining.
  const sorted = [...highestByHint.entries()].sort((a, b) => b[1] - a[1]);
  if (sorted.length > 0 && sorted[0] !== undefined) {
    return sorted[0][0];
  }

  return 'general_posture';
}
