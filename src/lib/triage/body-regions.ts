// Canonical body-region codes and display metadata.
// These codes are stored verbatim in `body_map_symptoms.region_code`.
// The SVG body-map forces dir="ltr" so anatomical left/right is always correct
// regardless of the page's RTL/LTR direction (plan §"Implementation Traps" #6).

export type RegionSide = 'left' | 'right' | 'center';

export interface BodyRegion {
  /** Stored in DB — never rename without a migration. */
  code: string;
  /** Anatomical side (for DB side column). */
  side: RegionSide;
  /** Display label key in the messages files. */
  labelEn: string;
  labelHe: string;
  /** Which program track this region belongs to for assignment rules. */
  programHint: 'neck_shoulder' | 'lower_back' | 'wrist_forearm' | 'general_posture';
  /** SVG clickable zone — cx/cy/rx/ry for an ellipse hotspot. */
  svgZone: { cx: number; cy: number; rx: number; ry: number };
}

export const BODY_REGIONS: BodyRegion[] = [
  // ── Neck / Upper ───────────────────────────────────────────────────────
  {
    code: 'neck_center',
    side: 'center',
    labelEn: 'Neck',
    labelHe: 'צוואר',
    programHint: 'neck_shoulder',
    svgZone: { cx: 100, cy: 70, rx: 16, ry: 13 },
  },
  {
    code: 'shoulder_left',
    side: 'left',
    labelEn: 'Left shoulder',
    labelHe: 'כתף שמאל',
    programHint: 'neck_shoulder',
    // Anatomical LEFT = SVG LEFT (self-facing convention).
    svgZone: { cx: 62, cy: 100, rx: 20, ry: 16 },
  },
  {
    code: 'shoulder_right',
    side: 'right',
    labelEn: 'Right shoulder',
    labelHe: 'כתף ימין',
    programHint: 'neck_shoulder',
    svgZone: { cx: 138, cy: 100, rx: 20, ry: 16 },
  },
  {
    code: 'upper_trap',
    side: 'center',
    labelEn: 'Upper back / between shoulders',
    labelHe: 'גב עליון / בין השכמות',
    programHint: 'neck_shoulder',
    svgZone: { cx: 100, cy: 115, rx: 30, ry: 18 },
  },

  // ── Forearm / Wrist ────────────────────────────────────────────────────
  {
    code: 'forearm_left',
    side: 'left',
    labelEn: 'Left forearm',
    labelHe: 'אמה שמאל',
    programHint: 'wrist_forearm',
    svgZone: { cx: 54, cy: 175, rx: 13, ry: 26 },
  },
  {
    code: 'forearm_right',
    side: 'right',
    labelEn: 'Right forearm',
    labelHe: 'אמה ימין',
    programHint: 'wrist_forearm',
    svgZone: { cx: 146, cy: 175, rx: 13, ry: 26 },
  },
  {
    code: 'wrist_left',
    side: 'left',
    labelEn: 'Left wrist / hand',
    labelHe: 'שורש כף יד שמאל',
    programHint: 'wrist_forearm',
    svgZone: { cx: 50, cy: 218, rx: 13, ry: 14 },
  },
  {
    code: 'wrist_right',
    side: 'right',
    labelEn: 'Right wrist / hand',
    labelHe: 'שורש כף יד ימין',
    programHint: 'wrist_forearm',
    svgZone: { cx: 150, cy: 218, rx: 13, ry: 14 },
  },

  // ── Lower back ─────────────────────────────────────────────────────────
  {
    code: 'lumbar',
    side: 'center',
    labelEn: 'Lower back',
    labelHe: 'גב תחתון',
    programHint: 'lower_back',
    svgZone: { cx: 100, cy: 190, rx: 28, ry: 20 },
  },
];

/** Look up a region by its DB code. Returns undefined if not found. */
export function findRegion(code: string): BodyRegion | undefined {
  return BODY_REGIONS.find((r) => r.code === code);
}
