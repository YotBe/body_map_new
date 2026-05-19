'use client';

import { useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';
import { saveProfile } from './actions';

export function ProfileForm() {
  const t = useTranslations('onboarding.profile');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setError(null);
    startTransition(async () => {
      const result = await saveProfile(data);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block">
        <span className="text-sm font-medium">{t('displayName')}</span>
        <input
          name="display_name"
          type="text"
          required
          className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">{t('dateOfBirth')}</span>
        <input
          name="date_of_birth"
          type="date"
          className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">{t('sex')}</span>
        <select
          name="sex"
          className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">— prefer not to say —</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer_not_to_say">Prefer not to say</option>
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium">{t('occupation')}</span>
        <input
          name="occupation"
          type="text"
          placeholder="e.g. Software engineer"
          className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </label>

      {error && (
        <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-primary px-4 py-3 font-medium text-primary-foreground shadow-sm hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? 'Saving…' : t('continue')}
      </button>
    </form>
  );
}
