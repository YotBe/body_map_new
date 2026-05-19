// Versioned red-flag screening checklist.
//
// REGULATORY NOTE: This checklist is a SCREENING tool only — it determines
// whether a user should seek clinician evaluation BEFORE starting an exercise
// program. It is NOT a diagnostic tool. Each question has a conservative
// threshold; any "yes" routes the user to the referral page (plan §"Regulatory
// pathway"). Keeping this in a versioned, immutable structure means DB records
// reference the exact question text used at screen time.
//
// Class I positioning: the screening is functionally equivalent to the
// "health history questionnaire" required by any gym/PT before starting a
// program. It does NOT diagnose or recommend treatment.

export const RED_FLAG_VERSION = 'v1.0';

export interface RedFlagQuestion {
  /** Stable key stored in DB answers JSONB. Never rename without a new version. */
  key: string;
  textEn: string;
  textHe: string;
  /** True = conservative. If YES → must refer. */
  referOnYes: boolean;
}

export const RED_FLAG_QUESTIONS: RedFlagQuestion[] = [
  {
    key: 'q_cauda_equina',
    textEn:
      'Do you have any loss of bladder or bowel control, or numbness/tingling in the groin or inner thighs?',
    textHe:
      'האם אתה/את חווה אובדן שליטה על שלפוחית השתן או המעי, או חוסר תחושה/עקצוץ בסביבת הקשתית או הירכיים הפנימיות?',
    referOnYes: true,
  },
  {
    key: 'q_unexplained_weight_loss',
    textEn: 'Have you had unexplained weight loss (more than 5 kg) in the past 6 months?',
    textHe: 'האם ירדת במשקל ללא הסבר (יותר מ-5 ק"ג) ב-6 החודשים האחרונים?',
    referOnYes: true,
  },
  {
    key: 'q_fever',
    textEn:
      'Have you had a fever (temperature above 38°C / 100.4°F) alongside your pain in the past 4 weeks?',
    textHe: 'האם סבלת מחום (מעל 38 מעלות) בנוסף לכאב ב-4 השבועות האחרונים?',
    referOnYes: true,
  },
  {
    key: 'q_cancer_history',
    textEn: 'Have you ever been diagnosed with cancer?',
    textHe: 'האם אובחנת אי פעם עם סרטן?',
    referOnYes: true,
  },
  {
    key: 'q_recent_trauma',
    textEn:
      'Did your pain start following a significant trauma (car accident, fall from height, sports injury) in the past 3 months?',
    textHe:
      'האם הכאב שלך התחיל לאחר טראומה משמעותית (תאונת דרכים, נפילה מגובה, פגיעת ספורט) ב-3 החודשים האחרונים?',
    referOnYes: true,
  },
  {
    key: 'q_progressive_neurological',
    textEn:
      'Do you have progressive weakness, numbness, or tingling in your arms or legs (getting worse over days or weeks)?',
    textHe:
      'האם אתה/את חווה חולשה, חוסר תחושה, או עקצוץ מחמיר בידיים או ברגליים (שמחמיר לאורך ימים או שבועות)?',
    referOnYes: true,
  },
  {
    key: 'q_osteoporosis_fracture',
    textEn:
      'Have you been told you have osteoporosis, or have you had a stress fracture in the past year?',
    textHe:
      'האם נאמר לך שיש לך אוסטיאופורוזיס, או שסבלת משבר מאמץ ב-12 החודשים האחרונים?',
    referOnYes: true,
  },
  {
    key: 'q_pregnancy',
    textEn:
      'Are you currently pregnant or within 12 weeks postpartum?',
    textHe: 'האם את בהריון כרגע, או בתוך 12 שבועות לאחר לידה?',
    referOnYes: true,
  },
];

/**
 * Evaluate a set of answers against the current checklist.
 * Returns `true` if ANY question with `referOnYes: true` was answered "yes".
 */
export function evaluateRedFlags(answers: Record<string, boolean>): boolean {
  return RED_FLAG_QUESTIONS.some(
    (q) => q.referOnYes && answers[q.key] === true,
  );
}
