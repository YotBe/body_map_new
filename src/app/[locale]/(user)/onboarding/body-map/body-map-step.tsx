'use client';

import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { BodyMap, type SymptomEntry } from '@/components/body-map/BodyMap';
import { saveSymptoms } from './actions';

export function BodyMapStep() {
  const t = useTranslations('onboarding.bodyMap');
  const [symptoms, setSymptoms] = useState<SymptomEntry[]>([]);
  const [noSymptoms, setNoSymptoms] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await saveSymptoms(noSymptoms ? [] : symptoms);
      if (result?.error) setError(result.error);
    });
  }

  const canContinue = noSymptoms || symptoms.length > 0;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <BodyMap
        onChange={(s) => {
          setSymptoms(s);
          if (s.length > 0) setNoSymptoms(false);
        }}
      />

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={noSymptoms}
          onChange={(e) => {
            setNoSymptoms(e.target.checked);
            if (e.target.checked) setSymptoms([]);
          }}
          className="h-4 w-4 rounded border-input"
        />
        <span className="text-sm">{t('noSymptoms')}</span>
      </label>

      {error && (
        <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>
      )}

      <button
        type="submit"
        disabled={!canContinue || isPending}
        className="w-full rounded-md bg-primary px-4 py-3 font-medium text-primary-foreground shadow-sm hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? 'Saving…' : t('continue')}
      </button>
    </form>
  );
}
