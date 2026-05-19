'use client';

import { useTransition } from 'react';
import { RedFlagForm } from '@/components/red-flag/RedFlagForm';
import { submitRedFlag } from './actions';

export function RedFlagStep() {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(answers: Record<string, boolean>, anyPositive: boolean) {
    startTransition(async () => {
      await submitRedFlag(answers, anyPositive);
    });
  }

  return <RedFlagForm onSubmit={handleSubmit} isPending={isPending} />;
}
