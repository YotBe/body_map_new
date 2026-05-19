'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { RED_FLAG_QUESTIONS } from '@/lib/triage/red-flags';
import { cn } from '@/lib/utils';

interface RedFlagFormProps {
  onSubmit: (answers: Record<string, boolean>, anyPositive: boolean) => void;
  isPending?: boolean;
}

export function RedFlagForm({ onSubmit, isPending }: RedFlagFormProps) {
  const t = useTranslations('onboarding.redFlag');
  const [answers, setAnswers] = useState<Record<string, boolean | undefined>>({});

  const allAnswered = RED_FLAG_QUESTIONS.every((q) => answers[q.key] !== undefined);

  function setAnswer(key: string, value: boolean) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allAnswered) return;
    const finalAnswers = Object.fromEntries(
      Object.entries(answers).map(([k, v]) => [k, v ?? false]),
    ) as Record<string, boolean>;
    const anyPositive = RED_FLAG_QUESTIONS.some(
      (q) => q.referOnYes && finalAnswers[q.key] === true,
    );
    onSubmit(finalAnswers, anyPositive);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-sm text-muted-foreground">{t('subtitle')}</p>

      {RED_FLAG_QUESTIONS.map((q) => {
        const answer = answers[q.key];
        return (
          <div key={q.key} className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm font-medium leading-relaxed">{q.textEn}</p>
            <div className="mt-3 flex gap-3">
              <YesNoButton
                label={t('yes')}
                selected={answer === true}
                isYes
                onClick={() => setAnswer(q.key, true)}
              />
              <YesNoButton
                label={t('no')}
                selected={answer === false}
                isYes={false}
                onClick={() => setAnswer(q.key, false)}
              />
            </div>
          </div>
        );
      })}

      <button
        type="submit"
        disabled={!allAnswered || isPending}
        className={cn(
          'w-full rounded-md bg-primary px-4 py-3 font-medium text-primary-foreground shadow-sm hover:opacity-90 transition-opacity',
          (!allAnswered || isPending) && 'opacity-40 cursor-not-allowed',
        )}
      >
        {isPending ? 'Saving…' : t('continue')}
      </button>
    </form>
  );
}

function YesNoButton({
  label,
  selected,
  isYes,
  onClick,
}: {
  label: string;
  selected: boolean;
  isYes: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex-1 rounded-md border px-4 py-2 text-sm font-medium transition-colors',
        selected
          ? isYes
            ? 'border-red-400 bg-red-50 text-red-700'
            : 'border-green-400 bg-green-50 text-green-700'
          : 'border-input bg-background hover:bg-muted',
      )}
    >
      {label}
    </button>
  );
}
