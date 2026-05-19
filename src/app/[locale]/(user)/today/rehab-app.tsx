// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, TrendingUp, Activity, Check, Award, Home, Flame, BarChart3, Sparkles, BookOpen, ArrowRight, Building2, Shield } from 'lucide-react';

// ============ i18n ============
const STR = {
  en: {
    brand: 'Tendo', tagline: 'The science of moving again',
    continue: 'Continue', back: 'Back', skip: 'Skip', next: 'Next', done: 'Done',
    welcome: 'Welcome', welcomeBack: 'Welcome back',
    disclaimerTitle: 'A wellness tool, not a doctor',
    disclaimerBody: 'Tendo is an evidence-based program for desk workers with everyday musculoskeletal discomfort. It is not a substitute for medical evaluation. If you have ongoing or severe pain, please consult a clinician. In an emergency, call your local emergency services.',
    iUnderstand: 'I understand — continue',
    roleQ: 'Who are you using Tendo as?',
    roleEmployee: 'An individual or employee',
    roleEmployeeDesc: 'Get a personalized program for your pain',
    roleAdmin: 'HR / Wellness lead',
    roleAdminDesc: 'See how Tendo works for your team',
    baselineTitle: 'Baseline assessment',
    baselineIntro: 'A 60-second baseline so we can measure your progress over time. These are clinically validated scales.',
    vasQ: 'On average over the past week, how would you rate your overall musculoskeletal pain?',
    vasNone: 'No pain', vasWorst: 'Worst pain imaginable',
    regionsQ: 'Where do you feel discomfort? Select all that apply.',
    setupComplete: 'You\'re all set',
    startProgram: 'Start my program',
    home: 'Home', outcomes: 'Outcomes', evidence: 'Evidence',
    todaysSession: 'Today\'s session', minutesToday: 'min today',
    week: 'Week', dayLabel: 'Day', of: 'of', streak: 'day streak',
    startSession: 'Start session', sessionDone: 'Session complete today',
    quickRelief: 'Quick relief',
    quickReliefDesc: 'Pain flare-up? Map it and get a 5-minute intervention.',
    progressSnapshot: 'Progress snapshot',
    painReduction: 'Pain reduction',
    sessionsCompleted: 'Sessions completed',
    activeDays: 'Active days',
    avgAdherence: 'Avg. adherence',
    bodyMapQ: 'Where do you feel discomfort?',
    bodyMapHelp: 'Tap the body region that bothers you most.',
    frontView: 'Front', backView: 'Back',
    narrowDown: 'Narrow it down',
    narrowDownBody: 'Tap the specific area within your',
    whenWorst: 'When is it worst?',
    whenWorstBody: 'This helps us pick the right approach.',
    sets: 'Sets', reps: 'Reps', tempo: 'Tempo',
    whyExercise: 'Why this exercise', execution: 'Execution', formCues: 'Form cues',
    setOf: 'Set', setOfOf: 'of',
    completedSet: 'I completed this set',
    rpeQ: 'How hard was that set?',
    rpeBody: 'Rate your perceived exertion from 1 (effortless) to 10 (maximum effort).',
    rpeSubmit: 'Submit',
    rpeOptimal: 'Optimal therapeutic zone',
    rpeOptimalBody: 'You\'re training in the sweet spot. Maintain your',
    rpeOptimalBody2: 'band.',
    rpeEasy: 'Sub-therapeutic stimulus',
    rpeEasyBody: 'Time to progress. Upgrade to the',
    rpeEasyBody2: 'band next session.',
    rpeEasyMax: 'You\'re at the heaviest tier. Pre-tension the band by gripping closer to the anchor.',
    rpeHard: 'Excessive strain — back off',
    rpeHardBody: 'Drop to the',
    rpeHardBody2: 'band and add 30 seconds rest between sets.',
    rpeHardMin: 'You\'re at the lightest tier. Add 30 seconds rest and reduce reps.',
    bandUpdated: 'Band tier updated',
    continueSet: 'Continue to set',
    finishSession: 'Finish session',
    endEarly: 'End session early',
    bandLabel: 'band',
    yourProgress: 'Your progress',
    yourProgressBody: 'Outcomes tracked using clinically validated scales.',
    overallPain: 'Overall pain (VAS)',
    overallPainSub: '0–10 scale',
    weeksTracked: 'weeks tracked',
    sessionHistory: 'Session history',
    noSessionsYet: 'No sessions yet — your first session will appear here.',
    aboutTendo: 'About Tendo', aboutSub: 'Evidence and methodology',
    aboutIntro: 'Tendo combines four pillars of evidence-based occupational physical therapy into a 5-minute daily routine.',
    pillar1: 'Targeted resistance band training',
    pillar1Body: 'Andersen et al. (2013) demonstrated that just 2 minutes/day of high-intensity elastic-band training reduced neck and shoulder pain by 40% in office workers with chronic pain (n=198 RCT).',
    pillar2: 'RPE-based auto-regulation',
    pillar2Body: 'Borg\'s Rate of Perceived Exertion scale is the gold standard for adjusting exercise intensity in clinical rehabilitation. We use it to keep you in the 5–7 therapeutic window every session.',
    pillar3: 'Body-map symptom routing',
    pillar3Body: 'You map exactly where it hurts. We route you to the specific micro-area and prescribe the right movement, instead of generic stretches.',
    pillar4: 'Validated outcome tracking',
    pillar4Body: 'We use the same scales clinicians use — VAS, Neck Disability Index, Roland-Morris, DASH — so you and your provider can see real change.',
    references: 'Selected references',
    employerTitle: 'Tendo for Teams',
    employerSub: 'Workforce MSK health — what your HR dashboard looks like.',
    activeMembers: 'Active members',
    avgPainReduction: 'Avg. pain reduction',
    weeklyEngagement: 'Weekly engagement',
    pilotResults: 'Pilot results (illustrative)',
    employerCTA: 'Bring Tendo to your team',
    employerCTABody: 'B2B2C pricing starts at $30 per engaged employee per month. Free 90-day pilot for design partners.',
    requestPilot: 'Request a pilot',
    settingsTitle: 'Settings',
    language: 'Language',
    viewMode: 'View mode',
    individualView: 'Individual',
    employerView: 'Employer (HR demo)',
    resetData: 'Reset all data',
    resetConfirm: 'Reset all your progress? This cannot be undone.',
    rpeLabels: ['', 'Effortless', 'Very easy', 'Easy', 'Light', 'Moderate', 'Somewhat hard', 'Hard', 'Very hard', 'Near maximum', 'Maximum'],
    micro: {
      posterior_cervical: 'Back of neck (base of skull)', lateral_cervical: 'Side of neck',
      anterior_shoulder: 'Front of shoulder', lateral_shoulder: 'Side of shoulder',
      posterior_shoulder: 'Back of shoulder', superior_shoulder: 'Top of shoulder',
      thoracic_back: 'Upper back', lumbar_back: 'Lower back',
      wrist_flexors: 'Underside of wrist', wrist_extensors: 'Top of wrist', fingers: 'Fingers / hand',
    },
    short: {
      posterior_cervical: 'Back', lateral_cervical: 'Side',
      anterior_shoulder: 'Front', lateral_shoulder: 'Side',
      posterior_shoulder: 'Back', superior_shoulder: 'Top',
      thoracic_back: 'Upper', lumbar_back: 'Lower',
      wrist_flexors: 'Palm side', wrist_extensors: 'Top side', fingers: 'Fingers',
    },
    macro: { cervical: 'Neck', shoulder: 'Shoulders', trunk: 'Back', distal: 'Wrists & hands' },
    macroSing: { cervical: 'neck', shoulder: 'shoulder', trunk: 'back', distal: 'wrist and hand' },
    kine: {
      rest: 'Worst at rest or when I wake up',
      movement: 'Spikes during specific movements',
      gradual: 'Develops gradually after long sitting',
    },
  },
  he: {
    brand: 'טנדו', tagline: 'המדע של תנועה חופשית',
    continue: 'המשך', back: 'חזרה', skip: 'דלג', next: 'הבא', done: 'סיום',
    welcome: 'ברוכים הבאים', welcomeBack: 'ברוכים השבים',
    disclaimerTitle: 'כלי בריאות, לא רופא',
    disclaimerBody: 'טנדו הוא תוכנית מבוססת ראיות לעובדי משרד הסובלים מאי-נוחות שרירית-שלדית יומיומית. הוא אינו תחליף להערכה רפואית. במקרה של כאב חמור או מתמשך, פנו לרופא. במקרה חירום — חייגו למוקד החירום.',
    iUnderstand: 'הבנתי — המשך',
    roleQ: 'איך תרצה להשתמש בטנדו?',
    roleEmployee: 'אדם פרטי או עובד',
    roleEmployeeDesc: 'תוכנית אישית לכאב שלך',
    roleAdmin: 'מנהל/ת רווחה או משאבי אנוש',
    roleAdminDesc: 'ראה איך טנדו עובד עבור הצוות',
    baselineTitle: 'הערכה ראשונית',
    baselineIntro: 'הערכה של 60 שניות כדי שנוכל למדוד את ההתקדמות שלך לאורך זמן. אלו סולמות מתוקפים קלינית.',
    vasQ: 'בממוצע בשבוע האחרון, איך תדרג את הכאב השרירי-שלדי הכללי שלך?',
    vasNone: 'אין כאב', vasWorst: 'הכאב הגרוע ביותר',
    regionsQ: 'איפה אתה מרגיש אי נוחות? בחר את כל מה שרלוונטי.',
    setupComplete: 'הכל מוכן',
    startProgram: 'התחל את התוכנית',
    home: 'בית', outcomes: 'תוצאות', evidence: 'ראיות',
    todaysSession: 'האימון של היום', minutesToday: 'דקות היום',
    week: 'שבוע', dayLabel: 'יום', of: 'מתוך', streak: 'ימים ברצף',
    startSession: 'התחל אימון', sessionDone: 'האימון הושלם היום',
    quickRelief: 'הקלה מיידית',
    quickReliefDesc: 'התקף כאב? מפה אותו וקבל התערבות של 5 דקות.',
    progressSnapshot: 'תמונת התקדמות',
    painReduction: 'ירידה בכאב',
    sessionsCompleted: 'אימונים שהושלמו',
    activeDays: 'ימים פעילים',
    avgAdherence: 'היענות ממוצעת',
    bodyMapQ: 'איפה אתה מרגיש אי נוחות?',
    bodyMapHelp: 'גע באזור הגוף שמטריד אותך הכי הרבה.',
    frontView: 'חזית', backView: 'גב',
    narrowDown: 'הצרת תחום',
    narrowDownBody: 'גע באזור הספציפי בתוך',
    whenWorst: 'מתי זה הכי גרוע?',
    whenWorstBody: 'זה עוזר לנו לבחור את הגישה הנכונה.',
    sets: 'סטים', reps: 'חזרות', tempo: 'קצב',
    whyExercise: 'למה התרגיל הזה', execution: 'ביצוע', formCues: 'דגשי טכניקה',
    setOf: 'סט', setOfOf: 'מתוך',
    completedSet: 'סיימתי את הסט',
    rpeQ: 'כמה קשה היה הסט?',
    rpeBody: 'דרג את המאמץ הנתפס מ-1 (קל מאוד) עד 10 (מאמץ מקסימלי).',
    rpeSubmit: 'שלח',
    rpeOptimal: 'אזור טיפולי אופטימלי',
    rpeOptimalBody: 'אתה מתאמן באזור המתאים. השאר את הגומיה ב',
    rpeOptimalBody2: '.',
    rpeEasy: 'גירוי תת-טיפולי',
    rpeEasyBody: 'הגיע הזמן להתקדם. שדרג ל',
    rpeEasyBody2: 'באימון הבא.',
    rpeEasyMax: 'אתה כבר ברמה הגבוהה ביותר. הגדל את המתח על ידי אחיזה קרובה יותר לעוגן.',
    rpeHard: 'מאמץ יתר — הורד הילוך',
    rpeHardBody: 'רד ל',
    rpeHardBody2: 'והוסף 30 שניות מנוחה בין סטים.',
    rpeHardMin: 'אתה ברמה הנמוכה ביותר. הוסף 30 שניות מנוחה והפחת חזרות.',
    bandUpdated: 'דרגת הגומיה עודכנה',
    continueSet: 'המשך לסט',
    finishSession: 'סיים אימון',
    endEarly: 'סיים אימון מוקדם',
    bandLabel: 'גומיה',
    yourProgress: 'ההתקדמות שלך',
    yourProgressBody: 'תוצאות נמדדות בסולמות מתוקפים קלינית.',
    overallPain: 'כאב כללי (VAS)',
    overallPainSub: 'סולם 0–10',
    weeksTracked: 'שבועות במעקב',
    sessionHistory: 'היסטוריית אימונים',
    noSessionsYet: 'עדיין אין אימונים — האימון הראשון שלך יופיע כאן.',
    aboutTendo: 'אודות טנדו', aboutSub: 'ראיות ומתודולוגיה',
    aboutIntro: 'טנדו משלב ארבעה עמודי תווך של פיזיותרפיה תעסוקתית מבוססת ראיות בשגרה יומית של 5 דקות.',
    pillar1: 'אימון גומיות התנגדות ממוקד',
    pillar1Body: 'Andersen ועמיתים (2013) הראו כי 2 דקות ביום של אימון גומיות בעצימות גבוהה הפחיתו כאבי צוואר וכתפיים ב-40% בעובדי משרד עם כאב כרוני (n=198 RCT).',
    pillar2: 'ויסות אוטומטי מבוסס RPE',
    pillar2Body: 'סולם המאמץ הנתפס של Borg הוא תקן הזהב לכיוון עצימות תרגיל בשיקום קליני. אנו משתמשים בו כדי לשמור אותך באזור הטיפולי 5–7 בכל אימון.',
    pillar3: 'ניתוב תסמינים על מפת גוף',
    pillar3Body: 'אתה ממפה בדיוק איפה כואב. אנחנו מנתבים אותך לאזור הספציפי וקובעים את התנועה הנכונה, במקום מתיחות גנריות.',
    pillar4: 'מעקב תוצאות מתוקף',
    pillar4Body: 'אנו משתמשים באותם סולמות שבהם משתמשים קלינאים — VAS, NDI, Roland-Morris, DASH — כך שאתה והרופא שלך תוכלו לראות שינוי אמיתי.',
    references: 'מקורות נבחרים',
    employerTitle: 'טנדו לצוותים',
    employerSub: 'בריאות שרירית-שלדית של כוח אדם — איך נראה הדשבורד שלך.',
    activeMembers: 'משתתפים פעילים',
    avgPainReduction: 'ירידה ממוצעת בכאב',
    weeklyEngagement: 'מעורבות שבועית',
    pilotResults: 'תוצאות פיילוט (להמחשה)',
    employerCTA: 'הביאו את טנדו לצוות שלכם',
    employerCTABody: 'תמחור B2B2C מתחיל ב-30$ לעובד פעיל לחודש. פיילוט חינם של 90 יום לשותפי תכנון.',
    requestPilot: 'בקשה לפיילוט',
    settingsTitle: 'הגדרות',
    language: 'שפה',
    viewMode: 'מצב תצוגה',
    individualView: 'משתמש יחיד',
    employerView: 'מעסיק (הדגמת HR)',
    resetData: 'אפס את כל הנתונים',
    resetConfirm: 'לאפס את כל ההתקדמות שלך? לא ניתן לבטל.',
    rpeLabels: ['', 'קל מאוד', 'קל', 'קליל', 'בינוני נמוך', 'בינוני', 'בינוני קשה', 'קשה', 'קשה מאוד', 'כמעט מקסימלי', 'מקסימלי'],
    micro: {
      posterior_cervical: 'עורף (בסיס הגולגולת)', lateral_cervical: 'צד הצוואר',
      anterior_shoulder: 'חזית הכתף', lateral_shoulder: 'צד הכתף',
      posterior_shoulder: 'גב הכתף', superior_shoulder: 'ראש הכתף',
      thoracic_back: 'גב עליון', lumbar_back: 'גב תחתון',
      wrist_flexors: 'תחתית כף היד', wrist_extensors: 'גב כף היד', fingers: 'אצבעות / כף יד',
    },
    short: {
      posterior_cervical: 'עורף', lateral_cervical: 'צד',
      anterior_shoulder: 'חזית', lateral_shoulder: 'צד',
      posterior_shoulder: 'גב', superior_shoulder: 'ראש',
      thoracic_back: 'עליון', lumbar_back: 'תחתון',
      wrist_flexors: 'כף יד', wrist_extensors: 'גב יד', fingers: 'אצבעות',
    },
    macro: { cervical: 'צוואר', shoulder: 'כתפיים', trunk: 'גב', distal: 'שורש כף יד וידיים' },
    macroSing: { cervical: 'צוואר', shoulder: 'כתף', trunk: 'גב', distal: 'יד' },
    kine: {
      rest: 'הכי גרוע במנוחה או כשאני קם',
      movement: 'מחריף בתנועות מסוימות',
      gradual: 'מתפתח בהדרגה אחרי ישיבה ממושכת',
    },
  },
};

// ============ DATA ============
const BAND_TIERS = {
  yellow: { name: { en: 'Yellow', he: 'צהוב' }, color: '#FCD34D', textColor: '#78350F', order: 0 },
  red: { name: { en: 'Red', he: 'אדום' }, color: '#EF4444', textColor: '#FFFFFF', order: 1 },
  green: { name: { en: 'Green', he: 'ירוק' }, color: '#10B981', textColor: '#FFFFFF', order: 2 },
  blue: { name: { en: 'Blue', he: 'כחול' }, color: '#3B82F6', textColor: '#FFFFFF', order: 3 },
  black: { name: { en: 'Black', he: 'שחור' }, color: '#1F2937', textColor: '#FFFFFF', order: 4 },
};
const BAND_ORDER = ['yellow', 'red', 'green', 'blue', 'black'];

const MACRO_ZONES = {
  cervical: { id: 'cervical', micro: ['posterior_cervical', 'lateral_cervical'] },
  shoulder: { id: 'shoulder', micro: ['superior_shoulder', 'anterior_shoulder', 'lateral_shoulder', 'posterior_shoulder'] },
  trunk: { id: 'trunk', micro: ['thoracic_back', 'lumbar_back'] },
  distal: { id: 'distal', micro: ['wrist_flexors', 'wrist_extensors', 'fingers'] },
};

const MICRO_ZONES = {
  posterior_cervical: { exercises: ['cervical_retraction'] },
  lateral_cervical: { exercises: ['cervical_lateral_flexion'] },
  anterior_shoulder: { exercises: ['external_rotation', 'pull_aparts'] },
  lateral_shoulder: { exercises: ['external_rotation'] },
  posterior_shoulder: { exercises: ['pull_aparts'] },
  superior_shoulder: { exercises: ['pull_aparts', 'cervical_retraction'] },
  thoracic_back: { exercises: ['low_rows', 'pull_aparts'] },
  lumbar_back: { exercises: ['pallof_press', 'low_rows'] },
  wrist_flexors: { exercises: ['wrist_inflexion'] },
  wrist_extensors: { exercises: ['wrist_extension'] },
  fingers: { exercises: ['finger_extensions'] },
};

const EXERCISES = {
  cervical_retraction: { animation: 'retraction', defaultBand: 'yellow', sets: 3, reps: 10, hold: { en: '3–5s hold', he: 'החזק 3–5 שניות' }, name: { en: 'Banded Cervical Retraction', he: 'משיכת צוואר עם גומיה' }, sub: { en: 'Chin tucks against light resistance', he: 'הכנסת סנטר נגד התנגדות קלה' }, rationale: { en: 'Reverses forward head posture by activating the deep cervical flexors that are weak from screen work.', he: 'מנטרל את יציבת הראש קדימה על ידי הפעלת המכופפים העמוקים של הצוואר שנחלשו ממסך.' }, steps: { en: ['Sit upright with neutral spine.', 'Place band center behind head at the occipital bone.', 'Hold ends, arms straight forward, parallel to floor.', 'Keeping gaze level, draw head straight back to form a "double chin."', 'Hold 3–5s, slowly release.'], he: ['שב זקוף עם עמוד שדרה ניטרלי.', 'הנח את מרכז הגומיה מאחורי הראש על עצם העורף.', 'אחוז בקצוות, ידיים ישרות קדימה, מקבילות לרצפה.', 'תוך שמירה על מבט אופקי, משוך את הראש ישר אחורה ליצירת "סנטר כפול".', 'החזק 3–5 שניות, שחרר לאט.'] }, cues: { en: ['Pure horizontal motion — no tilt', 'Shoulders relaxed and down', 'Breathe steadily through hold'], he: ['תנועה אופקית בלבד — בלי הטיה', 'כתפיים רגועות ונמוכות', 'נשום באופן יציב במהלך ההחזקה'] } },
  cervical_lateral_flexion: { animation: 'lateral_flexion', defaultBand: 'yellow', sets: 3, reps: 1, hold: { en: '10–15s each side', he: '10–15 שניות לכל צד' }, name: { en: 'Isometric Cervical Lateral Flexion', he: 'כיפוף צוואר איזומטרי' }, sub: { en: 'Side-resistance neck stabilization', he: 'ייצוב צוואר מול התנגדות צידית' }, rationale: { en: 'Builds endurance in lateral neck stabilizers without painful range of motion.', he: 'בונה סיבולת במייצבים הצידיים של הצוואר ללא טווח תנועה כואב.' }, steps: { en: ['Anchor a light band at head height.', 'Stand perpendicular to anchor; loop band around side of head above ear.', 'Step laterally until you feel meaningful tension.', 'Resist the pull — keep neck perfectly vertical.', 'Hold 10–15s, switch sides.'], he: ['עגן גומיה קלה בגובה הראש.', 'עמוד בניצב לעוגן; הלולא סביב צד הראש מעל האוזן.', 'התרחק הצידה עד שתרגיש מתח משמעותי.', 'התנגד למשיכה — שמור על צוואר אנכי לחלוטין.', 'החזק 10–15 שניות, החלף צדדים.'] }, cues: { en: ['Neck stays still and vertical', 'Engage but do not move', 'Do not hold your breath'], he: ['הצוואר נשאר יציב ואנכי', 'הפעל שריר אך אל תזוז', 'אל תעצור את הנשימה'] } },
  pull_aparts: { animation: 'pull_aparts', defaultBand: 'red', sets: 3, reps: 12, hold: { en: '3s eccentric', he: '3 שניות אקסצנטרי' }, name: { en: 'Scapular Pull-Aparts', he: 'משיכת שכמות' }, sub: { en: 'Horizontal band separation', he: 'הפרדת גומיה אופקית' }, rationale: { en: 'Reverses rounded shoulders by strengthening scapular retractors and external rotators.', he: 'מנטרל כתפיים מעוגלות על ידי חיזוק שרירי הצמדת השכמות וסיבוב חיצוני.' }, steps: { en: ['Stand with feet shoulder-width, hold band underhand.', 'Extend arms straight forward at chest height.', 'Depress shoulders away from ears.', 'Pull band apart in a wide arc by squeezing shoulder blades.', 'Continue until band touches sternum, return slowly over 3s.'], he: ['עמוד עם רגליים ברוחב כתפיים, אחוז את הגומיה בכף יד למעלה.', 'הושט ידיים ישרות קדימה בגובה החזה.', 'הורד את הכתפיים הרחק מהאוזניים.', 'משוך את הגומיה לצדדים בקשת רחבה על ידי לחיצת שכמות.', 'המשך עד שהגומיה נוגעת בעצם החזה, חזור לאט במשך 3 שניות.'] }, cues: { en: ['Drive from shoulder blades, not hands', 'Elbows locked but not hyperextended', 'Control the return'], he: ['הניע מהשכמות, לא מהידיים', 'מרפקים נעולים אך לא מותחים יתר על המידה', 'שלוט בחזרה'] } },
  external_rotation: { animation: 'external_rotation', defaultBand: 'red', sets: 3, reps: 12, hold: { en: '2s at end range', he: '2 שניות בסוף הטווח' }, name: { en: 'Banded External Rotation', he: 'סיבוב חיצוני עם גומיה' }, sub: { en: 'Rotator cuff strengthening', he: 'חיזוק שרוול מסובבים' }, rationale: { en: 'Combats chronic internal rotation from mouse use by strengthening infraspinatus and teres minor.', he: 'נלחם בסיבוב פנימי כרוני משימוש בעכבר על ידי חיזוק שריר תת-עוקצי ושריר עגול קטן.' }, steps: { en: ['Anchor band at waist height; stand sideways.', 'Outside hand holds band; elbow pinned to side at 90°.', 'Place a rolled towel between elbow and ribs.', 'Rotate forearm outward against the band.', 'Hold 2s at end range, return slowly.'], he: ['עגן את הגומיה בגובה המותן; עמוד הצידה.', 'יד חיצונית אוחזת בגומיה; מרפק צמוד לגוף ב-90°.', 'הנח מגבת מגולגלת בין המרפק לצלעות.', 'סובב את האמה החוצה נגד הגומיה.', 'החזק 2 שניות בסוף הטווח, חזור לאט.'] }, cues: { en: ['Elbow glued to ribcage', 'Move only at the shoulder joint', 'Wrist stays straight'], he: ['מרפק צמוד לגוף', 'הזז רק את מפרק הכתף', 'שורש כף היד נשאר ישר'] } },
  low_rows: { animation: 'low_rows', defaultBand: 'green', sets: 3, reps: 12, hold: { en: 'Brief squeeze at peak', he: 'לחיצה קצרה בשיא' }, name: { en: 'Seated Banded Low Rows', he: 'חתירה בישיבה עם גומיה' }, sub: { en: 'Compound pulling movement', he: 'תנועת משיכה מורכבת' }, rationale: { en: 'Strengthens horizontal pullers to support an upright thoracic spine.', he: 'מחזק את שרירי המשיכה האופקיים לתמיכה בעמוד שדרה זקוף.' }, steps: { en: ['Sit on floor, legs extended, band looped around feet.', 'Grasp ends with neutral grip (palms facing each other).', 'Lift chest, depress shoulder blades, brace core.', 'Pull elbows back, grazing sides, hands to lower ribs.', 'Slowly extend arms back.'], he: ['שב על הרצפה, רגליים ישרות, גומיה כרוכה סביב כפות הרגליים.', 'אחוז בקצוות באחיזה ניטרלית (כפות ידיים זו מול זו).', 'הרם את החזה, הורד שכמות, ייצב את הליבה.', 'משוך את המרפקים אחורה, מלטף את הצדדים, ידיים לצלעות התחתונות.', 'הושט ידיים לאט אחורה.'] }, cues: { en: ['Torso stays vertical — no rocking', 'Elbows travel past midline', 'Squeeze shoulder blades at peak'], he: ['גוף נשאר אנכי — בלי תנודות', 'מרפקים עוברים את קו האמצע', 'לחץ שכמות בשיא'] } },
  pallof_press: { animation: 'pallof_press', defaultBand: 'green', sets: 3, reps: 8, hold: { en: '3–5s press', he: 'לחיצה 3–5 שניות' }, name: { en: 'Banded Anti-Rotation (Pallof Press)', he: 'לחיצת פאלוף אנטי-סיבובית' }, sub: { en: 'Core anti-rotation hold', he: 'אחזקת ליבה אנטי-סיבובית' }, rationale: { en: 'Trains the core to resist lateral shear forces in the lumbar spine.', he: 'מאמן את הליבה להתנגד לכוחות גזירה צידיים בעמוד שדרה מותני.' }, steps: { en: ['Anchor medium band at chest height.', 'Stand perpendicular; interlace hands around band at sternum.', 'Athletic stance — feet wider than hips, knees soft.', 'Press hands straight out until elbows fully extend.', 'Resist rotation, hold 3–5s, return.'], he: ['עגן גומיה בינונית בגובה החזה.', 'עמוד בניצב; שלב ידיים סביב הגומיה ליד עצם החזה.', 'עמידה אתלטית — רגליים רחבות מהאגן, ברכיים רכות.', 'דחוף ידיים ישר עד פתיחת מרפקים מלאה.', 'התנגד לסיבוב, החזק 3–5 שניות, חזור.'] }, cues: { en: ['Torso square — no rotation', 'Brace your core hard', 'Breathe through the brace'], he: ['פלג גוף עליון ישר — בלי סיבוב', 'הדק את הליבה בחוזקה', 'נשום דרך ההידוק'] } },
  wrist_inflexion: { animation: 'wrist_inflexion', defaultBand: 'yellow', sets: 2, reps: 12, hold: { en: '1s peak, 3s return', he: 'שיא 1 שנייה, חזרה 3 שניות' }, name: { en: 'Wrist Resistance Inflexion', he: 'כיפוף שורש כף יד נגד התנגדות' }, sub: { en: 'Flexor strengthening', he: 'חיזוק מכופפים' }, rationale: { en: 'Promotes tendon gliding through the carpal tunnel, mitigating median nerve compression.', he: 'מקדם החלקת גידים בתוך התעלה הקרפלית, מקל על דחיסת עצב התווך.' }, steps: { en: ['Rest forearm flat on desk, palm up.', 'Position wrist at edge, hand hanging off.', 'Hold light band in working hand; anchor other end down.', 'Curl hand toward ceiling against band.', 'Hold 1s, lower slowly over 3s.'], he: ['הנח את האמה שטוחה על השולחן, כף יד למעלה.', 'מקם את שורש כף היד על הקצה, יד תלויה בחוץ.', 'אחוז גומיה קלה ביד המתאמנת; עגן את הקצה השני למטה.', 'גלגל את כף היד לתקרה נגד הגומיה.', 'החזק שנייה, הורד לאט במשך 3 שניות.'] }, cues: { en: ['Forearm stays flush against table', 'Move only at the wrist', 'Slow controlled eccentric'], he: ['האמה נשארת צמודה לשולחן', 'הזז רק את שורש כף היד', 'אקסצנטרי איטי ומבוקר'] } },
  wrist_extension: { animation: 'wrist_extension', defaultBand: 'yellow', sets: 2, reps: 12, hold: { en: '1s peak, 3s return', he: 'שיא 1 שנייה, חזרה 3 שניות' }, name: { en: 'Banded Wrist Extension', he: 'יישור שורש כף יד עם גומיה' }, sub: { en: 'Extensor balance', he: 'איזון יישרים' }, rationale: { en: 'Balances overworked extensors that hold hands above the keyboard, relieving anterior wrist pressure.', he: 'מאזן את היישרים העמוסים המחזיקים ידיים מעל המקלדת, מקל לחץ קדמי על שורש כף היד.' }, steps: { en: ['Rest forearm on desk, palm down.', 'Position wrist at edge, hand hanging off.', 'Hold light band; anchor other end downward.', 'Lift back of hand toward ceiling against band.', 'Hold briefly, lower over 3s.'], he: ['הנח את האמה על השולחן, כף יד למטה.', 'מקם את שורש כף היד על הקצה, יד תלויה בחוץ.', 'אחוז גומיה קלה; עגן את הקצה השני למטה.', 'הרם את גב כף היד לתקרה נגד הגומיה.', 'החזק בקצרה, הורד במשך 3 שניות.'] }, cues: { en: ['Elbow and forearm stay on table', 'No help from the upper arm', 'Isolate the wrist'], he: ['מרפק ואמה נשארים על השולחן', 'בלי עזרה מזרוע עליונה', 'בודד את שורש כף היד'] } },
  finger_extensions: { animation: 'finger_extensions', defaultBand: 'yellow', sets: 2, reps: 15, hold: { en: '2–3s at full spread', he: '2–3 שניות במלוא הפתיחה' }, name: { en: 'Banded Finger Extensions', he: 'יישור אצבעות עם גומיה' }, sub: { en: 'Web excursion against resistance', he: 'פתיחת מניפת אצבעות נגד התנגדות' }, rationale: { en: 'Activates underused finger extensors, counteracting the chronic flexion of typing.', he: 'מפעיל יישרי אצבעות לא מנוצלים, מנטרל את הכיפוף הכרוני של הקלדה.' }, steps: { en: ['Wrap light finger loop around all five fingertips.', 'Start with fingertips touching in a beak position.', 'Spread fingers outward against band as wide as possible.', 'Hold full spread 2–3s.', 'Slowly allow band to close fingers.'], he: ['כרוך לולאת אצבעות קלה סביב כל חמש קצות האצבעות.', 'התחל עם קצות אצבעות נוגעים במנח של מקור.', 'פתח אצבעות החוצה נגד הגומיה רחב ככל האפשר.', 'החזק פתיחה מלאה 2–3 שניות.', 'אפשר לגומיה לסגור את האצבעות לאט.'] }, cues: { en: ['Include the thumb', 'Symmetric spread', 'Full closure between reps'], he: ['כולל אגודל', 'פתיחה סימטרית', 'סגירה מלאה בין חזרות'] } },
};

// ============ EXERCISE ANIMATIONS ============
const ExerciseAnimation = ({ type }) => {
  const animations = {
    retraction: <svg viewBox="0 0 200 200" className="w-full h-full"><style>{`@keyframes a{0%,100%{transform:translateX(8px)}50%{transform:translateX(-2px)}}.h{animation:a 3s ease-in-out infinite;transform-origin:center}@keyframes b{0%,100%{transform:translateX(0)}50%{transform:translateX(-8px)}}.bd{animation:b 3s ease-in-out infinite}`}</style><line x1="100" y1="80" x2="100" y2="160" stroke="#475569" strokeWidth="3"/><line x1="100" y1="90" x2="80" y2="110" stroke="#475569" strokeWidth="2.5"/><line x1="100" y1="90" x2="120" y2="110" stroke="#475569" strokeWidth="2.5"/><g className="h"><circle cx="100" cy="60" r="20" fill="#FED7AA" stroke="#475569" strokeWidth="2"/><circle cx="94" cy="58" r="2" fill="#475569"/><circle cx="106" cy="58" r="2" fill="#475569"/></g><g className="bd"><path d="M 60 110 Q 80 60 100 60 Q 120 60 140 110" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/><circle cx="60" cy="110" r="4" fill="#475569"/><circle cx="140" cy="110" r="4" fill="#475569"/></g></svg>,
    lateral_flexion: <svg viewBox="0 0 200 200" className="w-full h-full"><style>{`@keyframes l{0%,100%{transform:scaleX(1)}50%{transform:scaleX(1.15)}}.bl{animation:l 2.5s ease-in-out infinite;transform-origin:100px 60px}`}</style><line x1="100" y1="80" x2="100" y2="160" stroke="#475569" strokeWidth="3"/><line x1="100" y1="90" x2="75" y2="120" stroke="#475569" strokeWidth="2.5"/><line x1="100" y1="90" x2="125" y2="120" stroke="#475569" strokeWidth="2.5"/><circle cx="100" cy="60" r="20" fill="#FED7AA" stroke="#475569" strokeWidth="2"/><circle cx="94" cy="58" r="2" fill="#475569"/><circle cx="106" cy="58" r="2" fill="#475569"/><g className="bl"><path d="M 20 60 Q 60 50 80 60" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/></g><rect x="10" y="50" width="8" height="20" fill="#475569"/></svg>,
    pull_aparts: <svg viewBox="0 0 200 200" className="w-full h-full"><style>{`@keyframes s{0%,100%{transform:scaleX(1)}50%{transform:scaleX(1.6)}}.ar{animation:s 3s ease-in-out infinite;transform-origin:100px 100px}@keyframes sb{0%,100%{stroke-width:4}50%{stroke-width:2.5}}.b2{animation:sb 3s ease-in-out infinite}`}</style><circle cx="100" cy="55" r="15" fill="#FED7AA" stroke="#475569" strokeWidth="2"/><line x1="100" y1="70" x2="100" y2="150" stroke="#475569" strokeWidth="3"/><g className="ar"><line x1="100" y1="90" x2="65" y2="100" stroke="#475569" strokeWidth="2.5"/><line x1="100" y1="90" x2="135" y2="100" stroke="#475569" strokeWidth="2.5"/><circle cx="65" cy="100" r="4" fill="#475569"/><circle cx="135" cy="100" r="4" fill="#475569"/><line className="b2" x1="65" y1="100" x2="135" y2="100" stroke="#EF4444" strokeWidth="4" strokeLinecap="round"/></g></svg>,
    external_rotation: <svg viewBox="0 0 200 200" className="w-full h-full"><style>{`@keyframes r{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-55deg)}}.fa{animation:r 3s ease-in-out infinite;transform-origin:100px 110px}`}</style><circle cx="100" cy="55" r="15" fill="#FED7AA" stroke="#475569" strokeWidth="2"/><line x1="100" y1="70" x2="100" y2="150" stroke="#475569" strokeWidth="3"/><line x1="100" y1="90" x2="100" y2="110" stroke="#475569" strokeWidth="2.5"/><g className="fa"><line x1="100" y1="110" x2="140" y2="110" stroke="#475569" strokeWidth="2.5"/><circle cx="140" cy="110" r="4" fill="#475569"/><path d="M 140 110 Q 165 95 180 105" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/></g><rect x="180" y="100" width="8" height="20" fill="#475569"/><ellipse cx="95" cy="110" rx="3" ry="6" fill="#94A3B8" opacity="0.6"/></svg>,
    low_rows: <svg viewBox="0 0 200 200" className="w-full h-full"><style>{`@keyframes pr{0%,100%{transform:translateX(20px)}50%{transform:translateX(-5px)}}.ro{animation:pr 3s ease-in-out infinite}`}</style><circle cx="65" cy="80" r="12" fill="#FED7AA" stroke="#475569" strokeWidth="2"/><line x1="65" y1="92" x2="65" y2="130" stroke="#475569" strokeWidth="3"/><line x1="65" y1="130" x2="155" y2="130" stroke="#475569" strokeWidth="3"/><rect x="150" y="125" width="12" height="12" fill="#475569"/><g className="ro"><line x1="65" y1="105" x2="120" y2="115" stroke="#475569" strokeWidth="2.5"/><circle cx="120" cy="115" r="4" fill="#475569"/></g><path d="M 120 115 Q 135 125 152 130" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/></svg>,
    pallof_press: <svg viewBox="0 0 200 200" className="w-full h-full"><style>{`@keyframes po{0%,100%{transform:translateX(0)}50%{transform:translateX(28px)}}.hp{animation:po 3.5s ease-in-out infinite}`}</style><circle cx="80" cy="55" r="15" fill="#FED7AA" stroke="#475569" strokeWidth="2"/><line x1="80" y1="70" x2="80" y2="150" stroke="#475569" strokeWidth="3"/><rect x="10" y="80" width="8" height="20" fill="#475569"/><g className="hp"><line x1="80" y1="95" x2="115" y2="95" stroke="#475569" strokeWidth="2.5"/><circle cx="115" cy="95" r="5" fill="#475569"/><path d="M 18 90 Q 70 92 113 95" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round"/></g></svg>,
    wrist_inflexion: <svg viewBox="0 0 200 200" className="w-full h-full"><style>{`@keyframes c{0%,100%{transform:rotate(30deg)}50%{transform:rotate(-30deg)}}.hwf{animation:c 3s ease-in-out infinite;transform-origin:130px 100px}`}</style><rect x="20" y="100" width="110" height="6" fill="#94A3B8"/><line x1="40" y1="100" x2="130" y2="100" stroke="#FED7AA" strokeWidth="14" strokeLinecap="round"/><line x1="40" y1="100" x2="130" y2="100" stroke="#475569" strokeWidth="1.5" fill="none"/><g className="hwf"><path d="M 130 100 L 155 88 L 158 92 L 135 105 Z" fill="#FED7AA" stroke="#475569" strokeWidth="1.5"/><line x1="148" y1="92" x2="148" y2="160" stroke="#EF4444" strokeWidth="3"/></g><circle cx="148" cy="165" r="4" fill="#475569"/></svg>,
    wrist_extension: <svg viewBox="0 0 200 200" className="w-full h-full"><style>{`@keyframes lb{0%,100%{transform:rotate(-30deg)}50%{transform:rotate(30deg)}}.hwe{animation:lb 3s ease-in-out infinite;transform-origin:130px 100px}`}</style><rect x="20" y="100" width="110" height="6" fill="#94A3B8"/><line x1="40" y1="100" x2="130" y2="100" stroke="#FED7AA" strokeWidth="14" strokeLinecap="round"/><line x1="40" y1="100" x2="130" y2="100" stroke="#475569" strokeWidth="1.5" fill="none"/><g className="hwe"><path d="M 130 100 L 155 112 L 158 108 L 135 95 Z" fill="#FED7AA" stroke="#475569" strokeWidth="1.5"/><line x1="148" y1="108" x2="148" y2="160" stroke="#EF4444" strokeWidth="3"/></g><circle cx="148" cy="165" r="4" fill="#475569"/></svg>,
    finger_extensions: <svg viewBox="0 0 200 200" className="w-full h-full"><style>{`@keyframes f1{0%,100%{transform:rotate(0)}50%{transform:rotate(-25deg)}}@keyframes f2{0%,100%{transform:rotate(0)}50%{transform:rotate(-12deg)}}@keyframes f4{0%,100%{transform:rotate(0)}50%{transform:rotate(12deg)}}@keyframes f5{0%,100%{transform:rotate(0)}50%{transform:rotate(30deg)}}@keyframes ls{0%,100%{transform:scale(1);opacity:.7}50%{transform:scale(1.4);opacity:1}}.f1{animation:f1 3s ease-in-out infinite;transform-origin:100px 130px}.f2{animation:f2 3s ease-in-out infinite;transform-origin:100px 130px}.f4{animation:f4 3s ease-in-out infinite;transform-origin:100px 130px}.f5{animation:f5 3s ease-in-out infinite;transform-origin:100px 130px}.lp{animation:ls 3s ease-in-out infinite;transform-origin:100px 70px}`}</style><ellipse cx="100" cy="140" rx="22" ry="18" fill="#FED7AA" stroke="#475569" strokeWidth="1.5"/><g className="f1"><rect x="70" y="80" width="6" height="50" rx="3" fill="#FED7AA" stroke="#475569" strokeWidth="1.5"/></g><g className="f2"><rect x="85" y="75" width="6" height="55" rx="3" fill="#FED7AA" stroke="#475569" strokeWidth="1.5"/></g><rect x="97" y="72" width="6" height="58" rx="3" fill="#FED7AA" stroke="#475569" strokeWidth="1.5"/><g className="f4"><rect x="109" y="75" width="6" height="55" rx="3" fill="#FED7AA" stroke="#475569" strokeWidth="1.5"/></g><g className="f5"><rect x="124" y="80" width="6" height="50" rx="3" fill="#FED7AA" stroke="#475569" strokeWidth="1.5"/></g><ellipse className="lp" cx="100" cy="70" rx="30" ry="6" fill="none" stroke="#EF4444" strokeWidth="3"/></svg>,
  };
  return animations[type] || null;
};

// ============ MAIN BODY MAP ============
const BodyMap = ({ view, onZoneSelect, hoveredZone, setHoveredZone }) => {
  const zoneStyle = (zone) => ({
    fill: hoveredZone === zone ? 'rgba(13, 148, 136, 0.35)' : 'rgba(13, 148, 136, 0.1)',
    stroke: hoveredZone === zone ? '#0D9488' : 'rgba(13, 148, 136, 0.3)',
    strokeWidth: hoveredZone === zone ? 2 : 1, cursor: 'pointer', transition: 'all 0.2s ease',
  });
  const h = (z) => ({ onMouseEnter: () => setHoveredZone(z), onMouseLeave: () => setHoveredZone(null), onClick: () => onZoneSelect(z), style: zoneStyle(z) });
  return (
    <svg viewBox="0 0 200 400" className="w-full h-full max-h-[500px]">
      <g fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1.5">
        <ellipse cx="100" cy="40" rx="22" ry="28"/>
        <rect x="92" y="65" width="16" height="15"/>
        <path d="M 70 80 Q 65 100 65 130 L 60 220 L 80 230 L 80 280 L 120 280 L 120 230 L 140 220 L 135 130 Q 135 100 130 80 Z"/>
        <path d="M 70 85 L 50 120 L 45 180 L 50 220 L 60 220 L 60 180 L 75 130 Z"/>
        <path d="M 130 85 L 150 120 L 155 180 L 150 220 L 140 220 L 140 180 L 125 130 Z"/>
        <ellipse cx="48" cy="235" rx="10" ry="14"/><ellipse cx="152" cy="235" rx="10" ry="14"/>
        <path d="M 80 280 L 75 360 L 88 360 L 95 280 Z"/><path d="M 120 280 L 125 360 L 112 360 L 105 280 Z"/>
      </g>
      {view === 'anterior' ? (<>
        <circle cx="92" cy="38" r="1.5" fill="#475569"/><circle cx="108" cy="38" r="1.5" fill="#475569"/>
        <path d="M 95 50 Q 100 52 105 50" stroke="#475569" strokeWidth="1" fill="none"/>
        <rect x="88" y="65" width="24" height="18" rx="3" {...h('cervical')}/>
        <ellipse cx="72" cy="92" rx="14" ry="12" {...h('shoulder')}/>
        <ellipse cx="128" cy="92" rx="14" ry="12" {...h('shoulder')}/>
        <rect x="72" y="110" width="56" height="115" rx="8" {...h('trunk')}/>
        <ellipse cx="48" cy="232" rx="14" ry="20" {...h('distal')}/>
        <ellipse cx="152" cy="232" rx="14" ry="20" {...h('distal')}/>
      </>) : (<>
        <rect x="88" y="60" width="24" height="22" rx="3" {...h('cervical')}/>
        <ellipse cx="72" cy="92" rx="14" ry="12" {...h('shoulder')}/>
        <ellipse cx="128" cy="92" rx="14" ry="12" {...h('shoulder')}/>
        <rect x="72" y="105" width="56" height="60" rx="8" {...h('trunk')}/>
        <rect x="74" y="165" width="52" height="55" rx="8" {...h('trunk')}/>
        <ellipse cx="48" cy="232" rx="14" ry="20" {...h('distal')}/>
        <ellipse cx="152" cy="232" rx="14" ry="20" {...h('distal')}/>
        <line x1="100" y1="80" x2="100" y2="225" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2,3"/>
      </>)}
    </svg>
  );
};

// ============ ZOOMED BODY MAP (per macro zone) ============
const ZoomedBodyMap = ({ macroZone, onMicroSelect, hovered, setHovered, t }) => {
  const hs = (id) => ({
    onMouseEnter: () => setHovered(id),
    onMouseLeave: () => setHovered(null),
    onClick: () => onMicroSelect(id),
    style: { cursor: 'pointer' },
  });
  const ring = (id) => ({
    stroke: hovered === id ? '#0D9488' : '#14B8A6',
    strokeWidth: hovered === id ? 3.5 : 2,
    fill: hovered === id ? 'rgba(13, 148, 136, 0.35)' : 'rgba(20, 184, 166, 0.15)',
    transition: 'all 0.2s ease',
  });
  const label = (id) => ({
    fontSize: 13,
    fontWeight: 600,
    fill: hovered === id ? '#0F766E' : '#475569',
    textAnchor: 'middle',
    pointerEvents: 'none',
    transition: 'fill 0.2s ease',
  });
  const skinFill = '#FED7AA';
  const stroke = '#94A3B8';

  if (macroZone === 'cervical') {
    return (
      <svg viewBox="0 0 400 400" className="w-full h-full max-h-[460px]">
        {/* Head (3/4 back-side view) */}
        <g fill={skinFill} stroke={stroke} strokeWidth="2">
          <ellipse cx="200" cy="130" rx="95" ry="110"/>
          {/* Neck */}
          <path d="M 155 225 Q 155 270 155 310 L 245 310 Q 245 270 245 225 Z"/>
          {/* Shoulders peek */}
          <path d="M 50 310 Q 100 295 155 310 L 245 310 Q 300 295 350 310 L 360 380 L 40 380 Z"/>
        </g>
        {/* Hair suggestion (back) */}
        <path d="M 110 100 Q 130 70 200 60 Q 270 70 290 100 Q 285 130 280 150" fill="none" stroke="#94A3B8" strokeWidth="1.5" opacity="0.5"/>
        {/* Ear */}
        <ellipse cx="295" cy="145" rx="8" ry="14" fill={skinFill} stroke={stroke} strokeWidth="1.5"/>
        {/* Spine line on neck */}
        <line x1="200" y1="240" x2="200" y2="305" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3,3" opacity="0.5"/>

        {/* Hotspots */}
        <g {...hs('posterior_cervical')}>
          <circle cx="200" cy="265" r="38" {...ring('posterior_cervical')}/>
          <text x="200" y="270" {...label('posterior_cervical')}>{t.short.posterior_cervical}</text>
        </g>
        <g {...hs('lateral_cervical')}>
          <circle cx="290" cy="240" r="34" {...ring('lateral_cervical')}/>
          <text x="290" y="245" {...label('lateral_cervical')}>{t.short.lateral_cervical}</text>
        </g>
      </svg>
    );
  }

  if (macroZone === 'shoulder') {
    return (
      <svg viewBox="0 0 400 400" className="w-full h-full max-h-[460px]">
        {/* Anatomy: front-3/4 view of right shoulder + upper arm + neck */}
        <g fill={skinFill} stroke={stroke} strokeWidth="2">
          {/* Neck stub */}
          <path d="M 105 30 Q 105 60 105 80 L 145 80 Q 145 60 145 30 Z"/>
          {/* Torso/chest */}
          <path d="M 40 90 Q 50 75 100 75 L 175 95 L 215 150 L 230 230 L 230 380 L 40 380 Z"/>
          {/* Deltoid (shoulder ball) */}
          <ellipse cx="230" cy="170" rx="90" ry="80"/>
          {/* Upper arm */}
          <path d="M 200 230 L 330 270 L 360 380 L 245 380 Z"/>
        </g>
        {/* Subtle musculature lines */}
        <path d="M 175 105 Q 200 130 215 165" fill="none" stroke="#94A3B8" strokeWidth="1" opacity="0.3"/>
        <path d="M 230 100 Q 280 140 305 195" fill="none" stroke="#94A3B8" strokeWidth="1" opacity="0.3"/>
        <path d="M 165 220 Q 195 235 220 250" fill="none" stroke="#94A3B8" strokeWidth="1" opacity="0.3"/>

        {/* Hotspots — Top, Front, Side, Back */}
        <g {...hs('superior_shoulder')}>
          <circle cx="200" cy="100" r="36" {...ring('superior_shoulder')}/>
          <text x="200" y="105" {...label('superior_shoulder')}>{t.short.superior_shoulder}</text>
        </g>
        <g {...hs('anterior_shoulder')}>
          <circle cx="170" cy="200" r="36" {...ring('anterior_shoulder')}/>
          <text x="170" y="205" {...label('anterior_shoulder')}>{t.short.anterior_shoulder}</text>
        </g>
        <g {...hs('lateral_shoulder')}>
          <circle cx="295" cy="205" r="36" {...ring('lateral_shoulder')}/>
          <text x="295" y="210" {...label('lateral_shoulder')}>{t.short.lateral_shoulder}</text>
        </g>
        <g {...hs('posterior_shoulder')}>
          <circle cx="310" cy="115" r="36" {...ring('posterior_shoulder')}/>
          <text x="310" y="120" {...label('posterior_shoulder')}>{t.short.posterior_shoulder}</text>
        </g>
      </svg>
    );
  }

  if (macroZone === 'trunk') {
    return (
      <svg viewBox="0 0 400 400" className="w-full h-full max-h-[460px]">
        {/* Anatomy: back view of torso */}
        <g fill={skinFill} stroke={stroke} strokeWidth="2">
          {/* Neck stub */}
          <path d="M 175 20 L 175 50 L 225 50 L 225 20 Z"/>
          {/* Torso (back view, trapezoid-ish) */}
          <path d="M 100 50 Q 130 45 175 50 L 225 50 Q 270 45 300 50 L 320 120 L 310 280 L 300 360 L 100 360 L 90 280 L 80 120 Z"/>
        </g>
        {/* Spine */}
        <line x1="200" y1="55" x2="200" y2="350" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6"/>
        {/* Vertebrae bumps */}
        {[80, 110, 140, 170, 200, 230, 260, 290, 320].map(y => (
          <circle key={y} cx="200" cy={y} r="3.5" fill="#94A3B8" opacity="0.4"/>
        ))}
        {/* Shoulder blade suggestions */}
        <ellipse cx="140" cy="125" rx="30" ry="40" fill="none" stroke="#94A3B8" strokeWidth="1" opacity="0.4"/>
        <ellipse cx="260" cy="125" rx="30" ry="40" fill="none" stroke="#94A3B8" strokeWidth="1" opacity="0.4"/>
        {/* Waist taper indication */}
        <path d="M 90 220 Q 200 235 310 220" fill="none" stroke="#94A3B8" strokeWidth="1" opacity="0.3"/>

        {/* Hotspots */}
        <g {...hs('thoracic_back')}>
          <ellipse cx="200" cy="140" rx="60" ry="48" {...ring('thoracic_back')}/>
          <text x="200" y="145" {...label('thoracic_back')}>{t.short.thoracic_back}</text>
        </g>
        <g {...hs('lumbar_back')}>
          <ellipse cx="200" cy="285" rx="60" ry="42" {...ring('lumbar_back')}/>
          <text x="200" y="290" {...label('lumbar_back')}>{t.short.lumbar_back}</text>
        </g>
      </svg>
    );
  }

  if (macroZone === 'distal') {
    return (
      <svg viewBox="0 0 400 400" className="w-full h-full max-h-[460px]">
        {/* Forearm + wrist + hand, palm-down */}
        <g fill={skinFill} stroke={stroke} strokeWidth="2">
          {/* Forearm */}
          <path d="M 20 150 L 20 230 L 175 245 L 175 135 Z"/>
          {/* Wrist (slight narrowing) */}
          <path d="M 175 135 L 175 245 L 195 245 L 195 135 Z"/>
          {/* Palm */}
          <path d="M 195 130 Q 195 110 220 105 L 290 100 Q 305 100 305 120 L 305 260 Q 305 275 290 275 L 220 270 Q 195 265 195 245 Z"/>
          {/* Thumb */}
          <ellipse cx="215" cy="285" rx="22" ry="14" transform="rotate(-25 215 285)"/>
          {/* Fingers */}
          <rect x="305" y="115" width="60" height="22" rx="10"/>
          <rect x="305" y="145" width="68" height="22" rx="10"/>
          <rect x="305" y="175" width="65" height="22" rx="10"/>
          <rect x="305" y="205" width="55" height="22" rx="10"/>
        </g>
        {/* Tendon lines on back of hand */}
        <line x1="240" y1="135" x2="320" y2="130" stroke="#94A3B8" strokeWidth="1" opacity="0.4"/>
        <line x1="245" y1="160" x2="320" y2="160" stroke="#94A3B8" strokeWidth="1" opacity="0.4"/>
        <line x1="245" y1="185" x2="320" y2="190" stroke="#94A3B8" strokeWidth="1" opacity="0.4"/>
        <line x1="245" y1="210" x2="315" y2="217" stroke="#94A3B8" strokeWidth="1" opacity="0.4"/>

        {/* Side annotation: this is dorsal/top view */}
        <text x="100" y="280" fontSize="11" fill="#94A3B8" fontStyle="italic" textAnchor="middle">{macroZone === 'distal' ? '↑ top view' : ''}</text>

        {/* Hotspots */}
        <g {...hs('wrist_extensors')}>
          <ellipse cx="155" cy="190" rx="55" ry="38" {...ring('wrist_extensors')}/>
          <text x="155" y="195" {...label('wrist_extensors')}>{t.short.wrist_extensors}</text>
        </g>
        <g {...hs('wrist_flexors')}>
          <ellipse cx="100" cy="320" rx="60" ry="28" {...ring('wrist_flexors')}/>
          <text x="100" y="325" {...label('wrist_flexors')}>{t.short.wrist_flexors}</text>
        </g>
        {/* Connector line from flexors hotspot to wrist (indicating it's the underside) */}
        <path d="M 130 295 Q 145 270 155 230" fill="none" stroke="#14B8A6" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6"/>
        <g {...hs('fingers')}>
          <ellipse cx="340" cy="160" rx="48" ry="62" {...ring('fingers')}/>
          <text x="340" y="165" {...label('fingers')}>{t.short.fingers}</text>
        </g>
      </svg>
    );
  }

  return null;
};

// ============ BRAND LOGO ============
const Logo = ({ size = 32 }) => (
  <div className="relative inline-flex items-center justify-center rounded-xl" style={{ width: size, height: size, background: 'linear-gradient(135deg, #0F766E, #0D9488)' }}>
    <svg viewBox="0 0 32 32" width={size * 0.6} height={size * 0.6}>
      <path d="M 6 22 Q 11 8, 16 22 Q 21 8, 26 22" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  </div>
);

// ============ MAIN APP ============
export default function App({ defaultLang = 'he' }: { defaultLang?: string }) {
  const [screen, setScreen] = useState('loading');
  const [lang, setLang] = useState(defaultLang);
  const [role, setRole] = useState('employee');
  const [view, setView] = useState('anterior');
  const [hoveredZone, setHoveredZone] = useState(null);
  const [hoveredMicro, setHoveredMicro] = useState(null);
  const [selectedMacro, setSelectedMacro] = useState(null);
  const [selectedMicro, setSelectedMicro] = useState(null);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [currentSet, setCurrentSet] = useState(1);
  const [rpeValue, setRpeValue] = useState(5);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [bandTiers, setBandTiers] = useState({});
  const [sessionHistory, setSessionHistory] = useState([]);
  const [baseline, setBaseline] = useState({ vas: 5, regions: [] });
  const [painHistory, setPainHistory] = useState([]);
  const [streak, setStreak] = useState(0);
  const [lastSessionDate, setLastSessionDate] = useState(null);
  const [onboardStep, setOnboardStep] = useState(0);

  const t = STR[lang];
  const dir = lang === 'he' ? 'rtl' : 'ltr';
  const isHe = lang === 'he';

  useEffect(() => {
    try {
      const get = (k) => localStorage.getItem(k);
      const l = get('lang'); if (l) setLang(l);
      const o = get('onboarded'); if (o === 'true') setHasOnboarded(true);
      const r = get('role'); if (r) setRole(r);
      const b = get('bandTiers'); if (b) setBandTiers(JSON.parse(b));
      const h = get('sessions'); if (h) setSessionHistory(JSON.parse(h));
      const bl = get('baseline'); if (bl) setBaseline(JSON.parse(bl));
      const ph = get('painHistory'); if (ph) setPainHistory(JSON.parse(ph));
      const s = get('streak'); if (s) setStreak(parseInt(s));
      const ls = get('lastSession'); if (ls) setLastSessionDate(parseInt(ls));
    } catch (e) { console.log(e); }
    setScreen('init');
  }, []);

  const persist = (k, v) => { try { localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v)); } catch (e) { console.log(e); } };

  useEffect(() => {
    if (screen === 'init') setScreen(hasOnboarded ? 'home' : 'onboard');
  }, [screen, hasOnboarded]);

  const changeLang = (l) => { setLang(l); persist('lang', l); };

  const finishOnboarding = () => {
    setHasOnboarded(true);
    persist('onboarded', 'true');
    persist('role', role);
    persist('baseline', baseline);
    const initial = [{ week: 0, vas: baseline.vas, date: Date.now() }];
    setPainHistory(initial);
    persist('painHistory', initial);
    if (role === 'admin') setScreen('employer');
    else setScreen('home');
  };

  const startSession = () => {
    setSelectedMacro(null); setSelectedMicro(null); setCurrentExercise(null); setCurrentSet(1);
    setHoveredMicro(null);
    setScreen('bodyMap');
  };

  // Macro zone selected → go straight to zoomed micro selection (no safety check)
  const handleZoneSelect = (z) => { setSelectedMacro(z); setHoveredMicro(null); setScreen('microZone'); };

  const handleMicroSelect = (m) => { setSelectedMicro(m); setScreen('kinematic'); };
  const handleKinematicSelect = () => {
    const exIds = MICRO_ZONES[selectedMicro].exercises;
    setCurrentExercise(exIds[0]); setCurrentSet(1); setScreen('exercise');
  };

  const getCurrentBand = (eid) => bandTiers[eid] || EXERCISES[eid].defaultBand;

  const submitRPE = () => {
    const eid = currentExercise;
    let curBand = getCurrentBand(eid);
    let idx = BAND_ORDER.indexOf(curBand);
    let newBand = curBand;
    if (rpeValue <= 4) newBand = BAND_ORDER[Math.min(idx + 1, 4)];
    else if (rpeValue >= 8) newBand = BAND_ORDER[Math.max(idx - 1, 0)];

    const newTiers = { ...bandTiers, [eid]: newBand };
    setBandTiers(newTiers); persist('bandTiers', newTiers);

    const entry = { timestamp: Date.now(), exercise: eid, macroZone: selectedMacro, microZone: selectedMicro, rpe: rpeValue, bandUsed: curBand, newBand };
    const newHist = [entry, ...sessionHistory].slice(0, 200);
    setSessionHistory(newHist); persist('sessions', newHist);

    const today = new Date().setHours(0, 0, 0, 0);
    if (!lastSessionDate || lastSessionDate < today) {
      const yesterday = today - 86400000;
      const newStreak = (lastSessionDate && lastSessionDate >= yesterday) ? streak + 1 : 1;
      setStreak(newStreak); persist('streak', newStreak.toString());
      setLastSessionDate(today); persist('lastSession', today.toString());
      if (newHist.length % 5 === 0) {
        const weekNum = painHistory.length;
        const reduction = Math.min(weekNum * 0.6, baseline.vas - 1.5);
        const newVas = Math.max(1, baseline.vas - reduction);
        const newPH = [...painHistory, { week: weekNum, vas: newVas, date: Date.now() }];
        setPainHistory(newPH); persist('painHistory', newPH);
      }
    }
    setScreen('rpeResult');
  };

  const resetAll = () => {
    if (!confirm(t.resetConfirm)) return;
    ['onboarded', 'role', 'bandTiers', 'sessions', 'baseline', 'painHistory', 'streak', 'lastSession']
      .forEach(k => localStorage.removeItem(k));
    setHasOnboarded(false); setBandTiers({}); setSessionHistory([]); setBaseline({ vas: 5, regions: [] });
    setPainHistory([]); setStreak(0); setLastSessionDate(null); setOnboardStep(0);
    setScreen('onboard');
  };

  const todayStr = new Date().setHours(0, 0, 0, 0);
  const didToday = lastSessionDate && lastSessionDate >= todayStr;
  const currentVas = painHistory.length ? painHistory[painHistory.length - 1].vas : baseline.vas;
  const painDelta = baseline.vas > 0 ? Math.round(((baseline.vas - currentVas) / baseline.vas) * 100) : 0;
  const totalSessions = sessionHistory.length;
  const activeDays = new Set(sessionHistory.map(s => new Date(s.timestamp).toDateString())).size;
  const weeksActive = Math.max(1, Math.ceil((Date.now() - (sessionHistory[sessionHistory.length - 1]?.timestamp || Date.now())) / (7 * 86400000)) || 1);
  const adherence = Math.min(100, Math.round((activeDays / (weeksActive * 5)) * 100)) || 0;

  const Wrapper = ({ children, bg }) => (
    <div dir={dir} className={`min-h-screen ${bg || 'bg-gradient-to-br from-stone-50 via-white to-teal-50/30'}`} style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", system-ui, sans-serif' }}>
      {children}
    </div>
  );

  const NavBar = () => (
    <div className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <button onClick={() => setScreen('home')} className="flex items-center gap-2">
          <Logo size={28}/>
          <span className="font-semibold text-slate-800 text-lg tracking-tight">{t.brand}</span>
        </button>
        <div className="flex items-center gap-1">
          <NavBtn icon={Home} label={t.home} active={screen === 'home'} onClick={() => setScreen('home')}/>
          <NavBtn icon={BarChart3} label={t.outcomes} active={screen === 'outcomes'} onClick={() => setScreen('outcomes')}/>
          <NavBtn icon={BookOpen} label={t.evidence} active={screen === 'evidence'} onClick={() => setScreen('evidence')}/>
          <NavBtn icon={Building2} label="Teams" active={screen === 'employer'} onClick={() => setScreen('employer')}/>
        </div>
        <button onClick={() => setScreen('settings')} className="text-slate-500 hover:text-slate-700 text-sm font-medium px-2 py-1">
          {lang === 'en' ? 'EN' : 'עב'}
        </button>
      </div>
    </div>
  );

  const NavBtn = ({ icon: Icon, label, active, onClick }) => (
    <button onClick={onClick} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-stone-100'}`}>
      <Icon className="w-4 h-4"/>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  if (screen === 'loading' || screen === 'init') {
    return <Wrapper><div className="min-h-screen flex items-center justify-center"><Logo size={56}/></div></Wrapper>;
  }

  // ============ ONBOARDING ============
  if (screen === 'onboard') {
    return (
      <Wrapper>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-lg w-full">
            {onboardStep === 0 && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-stone-200">
                <div className="flex flex-col items-center text-center mb-6">
                  <Logo size={64}/>
                  <h1 className="text-3xl font-bold text-slate-900 mt-4 tracking-tight">{t.brand}</h1>
                  <p className="text-slate-600 mt-1">{t.tagline}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button onClick={() => changeLang('en')} className={`p-4 rounded-2xl border-2 font-semibold transition-all ${lang === 'en' ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-stone-200 text-slate-700 hover:border-stone-300'}`}>
                    <div className="text-2xl mb-1">🇺🇸</div>English
                  </button>
                  <button onClick={() => changeLang('he')} className={`p-4 rounded-2xl border-2 font-semibold transition-all ${lang === 'he' ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-stone-200 text-slate-700 hover:border-stone-300'}`}>
                    <div className="text-2xl mb-1">🇮🇱</div>עברית
                  </button>
                </div>
                <button onClick={() => setOnboardStep(1)} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2">
                  {t.continue} <ArrowRight className={`w-5 h-5 ${isHe ? 'rotate-180' : ''}`}/>
                </button>
              </div>
            )}
            {onboardStep === 1 && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-stone-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center"><Shield className="w-5 h-5 text-amber-700"/></div>
                  <h2 className="text-xl font-bold text-slate-900">{t.disclaimerTitle}</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm mb-6">{t.disclaimerBody}</p>
                <button onClick={() => setOnboardStep(2)} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 rounded-2xl transition-colors">{t.iUnderstand}</button>
              </div>
            )}
            {onboardStep === 2 && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-stone-200">
                <h2 className="text-xl font-bold text-slate-900 mb-1">{t.roleQ}</h2>
                <div className="space-y-3 mt-6">
                  <button onClick={() => { setRole('employee'); setOnboardStep(3); }} className="w-full text-left p-5 rounded-2xl border-2 border-stone-200 hover:border-teal-400 hover:bg-teal-50/50 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0"><Activity className="w-5 h-5 text-teal-700"/></div>
                      <div><div className="font-semibold text-slate-900">{t.roleEmployee}</div><div className="text-sm text-slate-500 mt-0.5">{t.roleEmployeeDesc}</div></div>
                    </div>
                  </button>
                  <button onClick={() => { setRole('admin'); finishOnboarding(); }} className="w-full text-left p-5 rounded-2xl border-2 border-stone-200 hover:border-teal-400 hover:bg-teal-50/50 transition-all">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0"><Building2 className="w-5 h-5 text-indigo-700"/></div>
                      <div><div className="font-semibold text-slate-900">{t.roleAdmin}</div><div className="text-sm text-slate-500 mt-0.5">{t.roleAdminDesc}</div></div>
                    </div>
                  </button>
                </div>
              </div>
            )}
            {onboardStep === 3 && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-stone-200">
                <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wide mb-2"><Sparkles className="w-4 h-4"/>{t.baselineTitle}</div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">{t.vasQ}</h2>
                <p className="text-slate-500 text-sm mb-6">{t.baselineIntro}</p>
                <div className="text-center mb-4">
                  <div className="text-7xl font-bold text-teal-600 leading-none">{baseline.vas}</div>
                  <div className="text-sm text-slate-500 mt-2">{t.rpeLabels[baseline.vas]}</div>
                </div>
                <input type="range" min="0" max="10" value={baseline.vas} onChange={(e) => setBaseline({ ...baseline, vas: parseInt(e.target.value) })} className="w-full h-3 bg-gradient-to-r from-green-300 via-yellow-300 to-red-400 rounded-lg appearance-none cursor-pointer accent-teal-600"/>
                <div className="flex justify-between text-xs text-slate-500 mt-2 mb-6"><span>{t.vasNone}</span><span>{t.vasWorst}</span></div>
                <button onClick={() => setOnboardStep(4)} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 rounded-2xl transition-colors">{t.next}</button>
              </div>
            )}
            {onboardStep === 4 && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-stone-200">
                <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wide mb-2"><Sparkles className="w-4 h-4"/>{t.baselineTitle}</div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">{t.regionsQ}</h2>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {Object.keys(MACRO_ZONES).map(z => {
                    const sel = baseline.regions.includes(z);
                    return (
                      <button key={z} onClick={() => {
                        const r = sel ? baseline.regions.filter(x => x !== z) : [...baseline.regions, z];
                        setBaseline({ ...baseline, regions: r });
                      }} className={`p-4 rounded-2xl border-2 font-medium transition-all ${sel ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-stone-200 text-slate-700 hover:border-stone-300'}`}>{t.macro[z]}</button>
                    );
                  })}
                </div>
                <button onClick={finishOnboarding} disabled={baseline.regions.length === 0} className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-semibold py-4 rounded-2xl transition-colors mt-6">{t.done}</button>
              </div>
            )}
          </div>
        </div>
      </Wrapper>
    );
  }

  // ============ HOME ============
  if (screen === 'home') {
    const week = Math.ceil((totalSessions || 0) / 5) || 1;
    const day = ((totalSessions || 0) % 5) + 1;
    return (
      <Wrapper>
        <NavBar/>
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-700 rounded-3xl p-6 md:p-8 text-white shadow-xl mb-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-teal-100 text-sm font-medium mb-1">{totalSessions === 0 ? t.welcome : t.welcomeBack}</div>
                <div className="text-2xl md:text-3xl font-bold tracking-tight">{t.week} {week} · {t.dayLabel} {day} {t.of} 5</div>
              </div>
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur px-3 py-1.5 rounded-full">
                <Flame className="w-4 h-4 text-amber-300"/>
                <span className="font-semibold text-sm">{streak}</span>
                <span className="text-xs text-teal-100">{t.streak}</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 mb-4">
              <div className="text-teal-100 text-xs font-medium uppercase tracking-wide mb-1">{t.todaysSession}</div>
              <div className="text-lg font-semibold mb-1">~6 {t.minutesToday}</div>
              <div className="text-teal-100 text-sm">{didToday ? `✓ ${t.sessionDone}` : `${baseline.regions.length} ${baseline.regions.length === 1 ? 'area' : 'areas'}`}</div>
            </div>
            <button onClick={startSession} disabled={didToday} className="w-full bg-white text-teal-700 hover:bg-teal-50 disabled:bg-white/20 disabled:text-white font-semibold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2">
              {didToday ? <><Check className="w-5 h-5"/>{t.sessionDone}</> : <>{t.startSession}<ArrowRight className={`w-5 h-5 ${isHe ? 'rotate-180' : ''}`}/></>}
            </button>
          </div>

          <button onClick={startSession} className="w-full bg-white border border-stone-200 hover:border-teal-300 rounded-2xl p-5 text-left transition-all mb-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0"><Sparkles className="w-6 h-6 text-amber-700"/></div>
            <div className="flex-1"><div className="font-semibold text-slate-900">{t.quickRelief}</div><div className="text-sm text-slate-500 mt-0.5">{t.quickReliefDesc}</div></div>
            <ChevronRight className={`w-5 h-5 text-slate-400 ${isHe ? 'rotate-180' : ''}`}/>
          </button>

          {totalSessions > 0 && (
            <div className="bg-white rounded-3xl border border-stone-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">{t.progressSnapshot}</h3>
                <button onClick={() => setScreen('outcomes')} className="text-sm text-teal-700 font-medium">View all →</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Stat label={t.painReduction} value={`-${painDelta}%`} color="emerald"/>
                <Stat label={t.sessionsCompleted} value={totalSessions}/>
                <Stat label={t.activeDays} value={activeDays}/>
                <Stat label={t.avgAdherence} value={`${adherence}%`}/>
              </div>
            </div>
          )}
        </div>
      </Wrapper>
    );
  }

  // ============ BODY MAP (MACRO) ============
  if (screen === 'bodyMap') {
    return (
      <Wrapper>
        <NavBar/>
        <div className="max-w-3xl mx-auto px-4 py-6">
          <BackBtn onClick={() => setScreen('home')} label={t.back} isHe={isHe}/>
          <div className="bg-white rounded-3xl border border-stone-200 p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">{t.bodyMapQ}</h2>
            <p className="text-slate-500 text-sm mb-6">{t.bodyMapHelp}</p>
            <div className="flex justify-center gap-2 mb-6">
              <button onClick={() => setView('anterior')} className={`px-5 py-2 rounded-xl text-sm font-medium ${view === 'anterior' ? 'bg-teal-600 text-white' : 'bg-stone-100 text-slate-600'}`}>{t.frontView}</button>
              <button onClick={() => setView('posterior')} className={`px-5 py-2 rounded-xl text-sm font-medium ${view === 'posterior' ? 'bg-teal-600 text-white' : 'bg-stone-100 text-slate-600'}`}>{t.backView}</button>
            </div>
            <div className="flex justify-center mb-4">
              <div className="w-full max-w-xs"><BodyMap view={view} onZoneSelect={handleZoneSelect} hoveredZone={hoveredZone} setHoveredZone={setHoveredZone}/></div>
            </div>
            <div className="text-center min-h-[24px]">
              {hoveredZone && <span className="text-sm text-teal-700 font-semibold">{t.macro[hoveredZone]}</span>}
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  // ============ ZOOMED MICRO ZONE ============
  if (screen === 'microZone') {
    return (
      <Wrapper>
        <NavBar/>
        <div className="max-w-3xl mx-auto px-4 py-6">
          <BackBtn onClick={() => setScreen('bodyMap')} label={t.back} isHe={isHe}/>
          <div className="bg-white rounded-3xl border border-stone-200 p-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wide mb-2">
              <Sparkles className="w-3.5 h-3.5"/>{t.macro[selectedMacro]}
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">{t.narrowDown}</h2>
            <p className="text-slate-500 text-sm mb-6">
              {t.narrowDownBody} <strong>{t.macroSing[selectedMacro]}</strong>.
            </p>
            <div className="bg-gradient-to-br from-teal-50/40 to-stone-50 rounded-2xl p-4 flex justify-center mb-4">
              <div className="w-full max-w-sm">
                <ZoomedBodyMap macroZone={selectedMacro} onMicroSelect={handleMicroSelect} hovered={hoveredMicro} setHovered={setHoveredMicro} t={t}/>
              </div>
            </div>
            <div className="text-center min-h-[28px]">
              {hoveredMicro ? (
                <span className="text-sm text-teal-700 font-semibold">{t.micro[hoveredMicro]}</span>
              ) : (
                <span className="text-sm text-slate-400">{isHe ? 'גע באזור הספציפי' : 'Tap the specific area'}</span>
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  // ============ KINEMATIC ============
  if (screen === 'kinematic') {
    return (
      <Wrapper>
        <NavBar/>
        <div className="max-w-2xl mx-auto px-4 py-6">
          <BackBtn onClick={() => setScreen('microZone')} label={t.back} isHe={isHe}/>
          <div className="bg-white rounded-3xl border border-stone-200 p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">{t.whenWorst}</h2>
            <p className="text-slate-500 text-sm mb-6">{t.whenWorstBody}</p>
            <div className="space-y-2">
              {['rest', 'movement', 'gradual'].map(k => (
                <button key={k} onClick={handleKinematicSelect} className="w-full bg-stone-50 hover:bg-teal-50 hover:border-teal-300 border border-stone-200 text-slate-800 font-medium p-4 rounded-2xl flex items-center justify-between transition-colors">
                  <span>{t.kine[k]}</span><ChevronRight className={`w-5 h-5 text-slate-400 ${isHe ? 'rotate-180' : ''}`}/>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  // ============ EXERCISE ============
  if (screen === 'exercise') {
    const ex = EXERCISES[currentExercise];
    const band = getCurrentBand(currentExercise);
    const bi = BAND_TIERS[band];
    return (
      <Wrapper>
        <NavBar/>
        <div className="max-w-3xl mx-auto px-4 py-6">
          <BackBtn onClick={() => setScreen('home')} label={t.home} isHe={isHe}/>
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden">
            <div className="p-6 border-b border-stone-100">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div><h2 className="text-2xl font-bold text-slate-900">{ex.name[lang]}</h2><p className="text-slate-500 text-sm">{ex.sub[lang]}</p></div>
                <div className="px-3 py-1.5 rounded-xl text-sm font-semibold flex-shrink-0" style={{ backgroundColor: bi.color, color: bi.textColor }}>{bi.name[lang]} {t.bandLabel}</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-stone-50 p-8 flex justify-center">
              <div className="w-64 h-64"><ExerciseAnimation type={ex.animation}/></div>
            </div>
            <div className="grid grid-cols-3 border-b border-stone-100">
              <Spec label={t.sets} value={ex.sets}/>
              <Spec label={t.reps} value={ex.reps}/>
              <Spec label={t.tempo} value={ex.hold[lang]} small/>
            </div>
            <div className="p-6 border-b border-stone-100 bg-teal-50/30">
              <div className="text-xs text-teal-700 font-semibold uppercase tracking-wide mb-2">{t.whyExercise}</div>
              <div className="text-sm text-slate-700 leading-relaxed">{ex.rationale[lang]}</div>
            </div>
            <div className="p-6 border-b border-stone-100">
              <h3 className="font-semibold text-slate-900 mb-3">{t.execution}</h3>
              <ol className="space-y-2.5">
                {ex.steps[lang].map((s, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-700">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 text-teal-700 font-semibold flex items-center justify-center text-xs">{i + 1}</span>
                    <span className="leading-relaxed pt-0.5">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="p-6 border-b border-stone-100">
              <h3 className="font-semibold text-slate-900 mb-3">{t.formCues}</h3>
              <div className="space-y-2">
                {ex.cues[lang].map((c, i) => (
                  <div key={i} className="flex gap-2 text-sm text-slate-700"><Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5"/><span>{c}</span></div>
                ))}
              </div>
            </div>
            <div className="p-6 bg-stone-50">
              <div className="text-center mb-3 text-sm text-slate-600">{t.setOf} <strong>{currentSet}</strong> {t.setOfOf} <strong>{ex.sets}</strong></div>
              <button onClick={() => setScreen('rpe')} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2">
                <Check className="w-5 h-5"/>{t.completedSet}
              </button>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  // ============ RPE ============
  if (screen === 'rpe') {
    return (
      <Wrapper>
        <NavBar/>
        <div className="max-w-xl mx-auto px-4 py-6 flex items-center min-h-[60vh]">
          <div className="bg-white rounded-3xl border border-stone-200 p-8 w-full">
            <h2 className="text-xl font-bold text-slate-900 mb-1">{t.rpeQ}</h2>
            <p className="text-slate-500 text-sm mb-6">{t.rpeBody}</p>
            <div className="text-center mb-6">
              <div className="text-7xl font-bold text-teal-600 leading-none">{rpeValue}</div>
              <div className="text-sm font-medium text-slate-600 mt-2">{t.rpeLabels[rpeValue]}</div>
            </div>
            <input type="range" min="1" max="10" value={rpeValue} onChange={(e) => setRpeValue(parseInt(e.target.value))} className="w-full h-3 bg-gradient-to-r from-green-300 via-yellow-300 to-red-400 rounded-lg appearance-none cursor-pointer accent-teal-600"/>
            <div className="flex justify-between text-xs text-slate-500 mt-2 mb-8"><span>1</span><span>5</span><span>10</span></div>
            <button onClick={submitRPE} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 rounded-2xl">{t.rpeSubmit}</button>
          </div>
        </div>
      </Wrapper>
    );
  }

  // ============ RPE RESULT ============
  if (screen === 'rpeResult') {
    const last = sessionHistory[0];
    const oldBand = last?.bandUsed, newBand = last?.newBand;
    const changed = newBand !== oldBand;
    const ex = EXERCISES[currentExercise];
    const moreSets = currentSet < ex.sets;
    let title, message, c;
    if (rpeValue >= 5 && rpeValue <= 7) {
      title = t.rpeOptimal; message = `${t.rpeOptimalBody} ${BAND_TIERS[oldBand].name[lang]} ${t.bandLabel}${t.rpeOptimalBody2}`; c = 'emerald';
    } else if (rpeValue <= 4) {
      title = t.rpeEasy; message = changed ? `${t.rpeEasyBody} ${BAND_TIERS[newBand].name[lang]} ${t.bandLabel} ${t.rpeEasyBody2}` : t.rpeEasyMax; c = 'amber';
    } else {
      title = t.rpeHard; message = changed ? `${t.rpeHardBody} ${BAND_TIERS[newBand].name[lang]} ${t.bandLabel}${t.rpeHardBody2}` : t.rpeHardMin; c = 'red';
    }
    const cBg = { emerald: 'bg-emerald-600', amber: 'bg-amber-600', red: 'bg-red-600' };
    return (
      <Wrapper>
        <NavBar/>
        <div className="max-w-xl mx-auto px-4 py-6">
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden">
            <div className={`${cBg[c]} p-6 text-white`}>
              <div className="text-xs uppercase tracking-wide opacity-80">RPE {rpeValue}/10</div>
              <div className="text-2xl font-bold mt-1">{title}</div>
            </div>
            <div className="p-6">
              <p className="text-slate-700 leading-relaxed mb-6">{message}</p>
              {changed && (
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 mb-6">
                  <div className="text-xs uppercase tracking-wide font-semibold mb-2 text-slate-600">{t.bandUpdated}</div>
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 rounded-xl text-sm font-semibold" style={{ backgroundColor: BAND_TIERS[oldBand].color, color: BAND_TIERS[oldBand].textColor }}>{BAND_TIERS[oldBand].name[lang]}</div>
                    <ChevronRight className={`w-4 h-4 text-slate-400 ${isHe ? 'rotate-180' : ''}`}/>
                    <div className="px-3 py-1.5 rounded-xl text-sm font-semibold" style={{ backgroundColor: BAND_TIERS[newBand].color, color: BAND_TIERS[newBand].textColor }}>{BAND_TIERS[newBand].name[lang]}</div>
                  </div>
                </div>
              )}
              <div className="space-y-2">
                {moreSets ? (
                  <button onClick={() => { setCurrentSet(currentSet + 1); setRpeValue(5); setScreen('exercise'); }} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2">
                    {t.continueSet} {currentSet + 1}<ChevronRight className={`w-5 h-5 ${isHe ? 'rotate-180' : ''}`}/>
                  </button>
                ) : (
                  <button onClick={() => { setRpeValue(5); setScreen('home'); }} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2"><Award className="w-5 h-5"/>{t.finishSession}</button>
                )}
                <button onClick={() => { setRpeValue(5); setScreen('home'); }} className="w-full bg-stone-100 hover:bg-stone-200 text-slate-700 font-medium py-3 rounded-2xl">{t.endEarly}</button>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  // ============ OUTCOMES ============
  if (screen === 'outcomes') {
    const maxVas = Math.max(baseline.vas, 10);
    return (
      <Wrapper>
        <NavBar/>
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{t.yourProgress}</h1>
            <p className="text-slate-500 text-sm mt-1">{t.yourProgressBody}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-6 text-white">
              <div className="text-emerald-100 text-xs font-medium uppercase tracking-wide mb-2">{t.painReduction}</div>
              <div className="text-4xl font-bold">{painDelta > 0 ? `-${painDelta}%` : '0%'}</div>
              <div className="text-emerald-100 text-sm mt-2">{painHistory.length - 1} {t.weeksTracked}</div>
            </div>
            <div className="bg-white rounded-3xl border border-stone-200 p-6">
              <div className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-2">{t.sessionsCompleted}</div>
              <div className="text-4xl font-bold text-slate-900">{totalSessions}</div>
              <div className="text-slate-500 text-sm mt-2">{activeDays} {t.activeDays.toLowerCase()}</div>
            </div>
            <div className="bg-white rounded-3xl border border-stone-200 p-6">
              <div className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-2">{t.avgAdherence}</div>
              <div className="text-4xl font-bold text-slate-900">{adherence}%</div>
              <div className="text-slate-500 text-sm mt-2">{streak} {t.streak}</div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200 p-6 mb-4">
            <div className="flex items-baseline justify-between mb-1">
              <h3 className="font-semibold text-slate-900">{t.overallPain}</h3>
              <span className="text-xs text-slate-500">{t.overallPainSub}</span>
            </div>
            <p className="text-sm text-slate-500 mb-6">VAS (Visual Analog Scale)</p>
            <div className="flex items-end gap-2 h-48 mb-3">
              {painHistory.length > 0 ? painHistory.map((p, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="text-xs font-medium text-slate-600">{p.vas.toFixed(1)}</div>
                  <div className="w-full bg-gradient-to-t from-teal-600 to-teal-400 rounded-t-xl" style={{ height: `${(p.vas / maxVas) * 100}%`, minHeight: '4px' }}/>
                </div>
              )) : <div className="text-sm text-slate-400 mx-auto self-center">{t.noSessionsYet}</div>}
            </div>
            <div className="flex justify-between text-xs text-slate-500 border-t border-stone-100 pt-3">
              {painHistory.map((p, i) => <span key={i}>{t.week.slice(0, 2)} {p.week}</span>)}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">{t.sessionHistory}</h3>
            {sessionHistory.length === 0 ? (
              <div className="text-sm text-slate-400 text-center py-8">{t.noSessionsYet}</div>
            ) : (
              <div className="space-y-2">
                {sessionHistory.slice(0, 10).map((s, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-stone-100 last:border-0 text-sm">
                    <div>
                      <div className="font-medium text-slate-700">{EXERCISES[s.exercise].name[lang]}</div>
                      <div className="text-xs text-slate-500">{new Date(s.timestamp).toLocaleDateString()} · RPE {s.rpe}</div>
                    </div>
                    <div className="px-2 py-0.5 rounded-md text-xs font-semibold" style={{ backgroundColor: BAND_TIERS[s.bandUsed].color, color: BAND_TIERS[s.bandUsed].textColor }}>{BAND_TIERS[s.bandUsed].name[lang]}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Wrapper>
    );
  }

  // ============ EVIDENCE ============
  if (screen === 'evidence') {
    const pillars = [
      { num: '01', title: t.pillar1, body: t.pillar1Body },
      { num: '02', title: t.pillar2, body: t.pillar2Body },
      { num: '03', title: t.pillar3, body: t.pillar3Body },
      { num: '04', title: t.pillar4, body: t.pillar4Body },
    ];
    return (
      <Wrapper>
        <NavBar/>
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{t.aboutTendo}</h1>
            <p className="text-slate-500 text-sm mt-1">{t.aboutSub}</p>
          </div>
          <p className="text-slate-700 leading-relaxed mb-6">{t.aboutIntro}</p>
          <div className="space-y-3 mb-8">
            {pillars.map((p, i) => (
              <div key={i} className="bg-white rounded-3xl border border-stone-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="text-xs font-mono text-teal-600 font-bold mt-1">{p.num}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-2">{p.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-stone-50 rounded-3xl border border-stone-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-3 text-sm">{t.references}</h3>
            <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <li>· Andersen LL et al. (2013). Effect of brief daily resistance training on neck/shoulder pain in office workers: RCT. <em>BioMed Research International</em>.</li>
              <li>· Borg G (1982). Psychophysical bases of perceived exertion. <em>Med Sci Sports Exerc</em>.</li>
              <li>· Damasceno GM et al. (2023). Workplace-based interventions for neck pain in office workers: systematic review. <em>Heliyon</em>.</li>
              <li>· Roland M, Morris R (1983). Roland-Morris Disability Questionnaire. <em>Spine</em>.</li>
              <li>· Vernon H (2008). The Neck Disability Index: state of the art. <em>J Manip Physiol Ther</em>.</li>
              <li>· Sword Health (2023). RCT comparing digital vs. in-person physical therapy. <em>Nature Digital Medicine</em>.</li>
            </ul>
          </div>
        </div>
      </Wrapper>
    );
  }

  // ============ EMPLOYER ============
  if (screen === 'employer') {
    const cohort = [
      { dept: 'Engineering', members: 142, painRed: 38, adherence: 71 },
      { dept: 'Product & Design', members: 56, painRed: 42, adherence: 78 },
      { dept: 'Sales', members: 89, painRed: 31, adherence: 64 },
      { dept: 'Operations', members: 34, painRed: 35, adherence: 69 },
    ];
    const totalMembers = cohort.reduce((s, c) => s + c.members, 0);
    const avgPain = Math.round(cohort.reduce((s, c) => s + c.painRed * c.members, 0) / totalMembers);
    const avgAdh = Math.round(cohort.reduce((s, c) => s + c.adherence * c.members, 0) / totalMembers);
    return (
      <Wrapper>
        <NavBar/>
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              <Building2 className="w-3.5 h-3.5"/>{t.employerTitle}
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Acme Tech · 412 employees</h1>
            <p className="text-slate-500 text-sm mt-1">{t.employerSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-3xl p-6 text-white">
              <div className="text-indigo-100 text-xs font-medium uppercase tracking-wide mb-2">{t.activeMembers}</div>
              <div className="text-4xl font-bold">{totalMembers}</div>
              <div className="text-indigo-100 text-sm mt-2">{Math.round((totalMembers / 412) * 100)}% activation</div>
            </div>
            <div className="bg-white rounded-3xl border border-stone-200 p-6">
              <div className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-2">{t.avgPainReduction}</div>
              <div className="text-4xl font-bold text-emerald-600">-{avgPain}%</div>
              <div className="text-slate-500 text-sm mt-2">12 weeks · VAS</div>
            </div>
            <div className="bg-white rounded-3xl border border-stone-200 p-6">
              <div className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-2">{t.weeklyEngagement}</div>
              <div className="text-4xl font-bold text-slate-900">{avgAdh}%</div>
              <div className="text-slate-500 text-sm mt-2">3.4 sessions/wk avg</div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200 p-6 mb-6">
            <h3 className="font-semibold text-slate-900 mb-1">{t.pilotResults}</h3>
            <p className="text-xs text-slate-500 mb-5">By department · all data de-identified and aggregated</p>
            <div className="space-y-3">
              {cohort.map(c => (
                <div key={c.dept} className="border-b border-stone-100 pb-3 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium text-slate-800 text-sm">{c.dept}</div>
                    <div className="text-xs text-slate-500">{c.members} members</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Pain reduction</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500" style={{ width: `${c.painRed * 2}%` }}/></div>
                        <span className="text-sm font-semibold text-emerald-700">-{c.painRed}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Adherence</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-500" style={{ width: `${c.adherence}%` }}/></div>
                        <span className="text-sm font-semibold text-indigo-700">{c.adherence}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white">
            <h3 className="text-xl font-bold mb-2">{t.employerCTA}</h3>
            <p className="text-slate-300 text-sm mb-6">{t.employerCTABody}</p>
            <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
              <div className="bg-white/10 backdrop-blur rounded-xl p-3"><div className="text-slate-400 text-xs">Cost</div><div className="font-semibold">$30 PEPM</div></div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-3"><div className="text-slate-400 text-xs">Per Hinge equivalent</div><div className="font-semibold line-through opacity-60">$83 PMPM</div></div>
            </div>
            <button className="w-full bg-white text-slate-900 hover:bg-stone-100 font-semibold py-3 rounded-2xl">{t.requestPilot} →</button>
          </div>
        </div>
      </Wrapper>
    );
  }

  // ============ SETTINGS ============
  if (screen === 'settings') {
    return (
      <Wrapper>
        <NavBar/>
        <div className="max-w-2xl mx-auto px-4 py-6">
          <BackBtn onClick={() => setScreen('home')} label={t.back} isHe={isHe}/>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-6">{t.settingsTitle}</h1>

          <div className="bg-white rounded-3xl border border-stone-200 p-6 mb-4">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">{t.language}</div>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => changeLang('en')} className={`p-3 rounded-2xl border-2 font-medium text-sm transition-all ${lang === 'en' ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-stone-200 text-slate-700'}`}>🇺🇸 English</button>
              <button onClick={() => changeLang('he')} className={`p-3 rounded-2xl border-2 font-medium text-sm transition-all ${lang === 'he' ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-stone-200 text-slate-700'}`}>🇮🇱 עברית</button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200 p-6 mb-4">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">{t.viewMode}</div>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setScreen('home')} className={`p-3 rounded-2xl border-2 font-medium text-sm flex items-center justify-center gap-2 ${role === 'employee' ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-stone-200 text-slate-700'}`}><Activity className="w-4 h-4"/>{t.individualView}</button>
              <button onClick={() => { setRole('admin'); persist('role', 'admin'); setScreen('employer'); }} className="p-3 rounded-2xl border-2 border-stone-200 text-slate-700 hover:border-stone-300 font-medium text-sm flex items-center justify-center gap-2"><Building2 className="w-4 h-4"/>{t.employerView}</button>
            </div>
          </div>

          <button onClick={resetAll} className="w-full bg-red-50 hover:bg-red-100 text-red-700 font-medium py-3 rounded-2xl text-sm">{t.resetData}</button>
        </div>
      </Wrapper>
    );
  }

  return null;
}

// ============ HELPER COMPONENTS ============
const Stat = ({ label, value, color }) => (
  <div className="bg-stone-50 rounded-2xl p-4">
    <div className="text-xs text-slate-500 font-medium mb-1">{label}</div>
    <div className={`text-2xl font-bold ${color === 'emerald' ? 'text-emerald-600' : 'text-slate-900'}`}>{value}</div>
  </div>
);

const Spec = ({ label, value, small }) => (
  <div className="p-4 text-center border-r border-stone-100 last:border-0">
    <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">{label}</div>
    <div className={`${small ? 'text-sm font-bold pt-1.5' : 'text-2xl font-bold'} text-slate-900 leading-tight`}>{value}</div>
  </div>
);

const BackBtn = ({ onClick, label, isHe }) => (
  <button onClick={onClick} className="flex items-center gap-1 text-slate-600 hover:text-slate-800 mb-4 text-sm">
    {isHe ? <ChevronRight className="w-4 h-4"/> : <ChevronLeft className="w-4 h-4"/>}{label}
  </button>
);