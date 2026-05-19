import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

// Exit page shown when any red-flag question is answered "yes".
// This page deliberately has NO link to start a program.
// The user must re-enter via /login after consulting a clinician.
export default async function ReferralPage({
  params,
}: {
  params: Promise<{ locale: 'en' | 'he' }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ReferralContent />;
}

function ReferralContent() {
  const t = useTranslations('onboarding.referral');
  return (
    <main className="container mx-auto max-w-lg py-16">
      <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-8 text-center shadow-sm">
        {/* Warning icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-amber-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-amber-900">{t('title')}</h1>
        <p className="mt-4 text-amber-800 leading-relaxed">{t('body')}</p>

        <div className="mt-8 rounded-lg bg-white p-4 text-start shadow-inner">
          <p className="text-sm font-semibold text-gray-700">In Israel, you can reach a physiotherapist via:</p>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li>• <strong>Maccabi Healthcare</strong> — maccabi.co.il or the Maccabi app</li>
            <li>• <strong>Clalit</strong> — clalit.co.il or your family doctor referral</li>
            <li>• <strong>Meuhedet / Leumit</strong> — via your HMO portal</li>
            <li>• <strong>Private clinic</strong> — no referral needed; typical cost ₪200–₪350/session</li>
          </ul>
        </div>

        <p className="mt-6 text-xs text-amber-700">
          PhysioDesk is designed for prevention, not treatment of medical symptoms.
          This screen is not a diagnosis.
        </p>
      </div>
    </main>
  );
}
