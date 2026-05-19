'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface SeveritySliderProps {
  regionCode: string;
  value: number;
  onChange: (regionCode: string, vas: number) => void;
}

const SEVERITY_LABELS: Record<number, { en: string; color: string }> = {
  0: { en: 'None', color: 'text-gray-400' },
  1: { en: 'Minimal', color: 'text-green-500' },
  2: { en: 'Minimal', color: 'text-green-500' },
  3: { en: 'Mild', color: 'text-yellow-500' },
  4: { en: 'Mild', color: 'text-yellow-500' },
  5: { en: 'Moderate', color: 'text-orange-400' },
  6: { en: 'Moderate', color: 'text-orange-500' },
  7: { en: 'Severe', color: 'text-red-400' },
  8: { en: 'Severe', color: 'text-red-500' },
  9: { en: 'Very severe', color: 'text-red-600' },
  10: { en: 'Worst possible', color: 'text-red-700' },
};

export function SeveritySlider({ regionCode, value, onChange }: SeveritySliderProps) {
  const t = useTranslations('onboarding.bodyMap');
  const label = SEVERITY_LABELS[value];

  return (
    <div className="mt-3 space-y-2">
      <p className="text-sm text-muted-foreground">{t('severityLabel')}</p>
      <input
        type="range"
        min={0}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(regionCode, Number(e.target.value))}
        className="w-full accent-primary"
        aria-label={`Severity for ${regionCode}`}
      />
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">0 — None</span>
        <span className={cn('font-semibold', label?.color ?? '')}>
          {value} — {label?.en ?? ''}
        </span>
        <span className="text-muted-foreground">10 — Worst</span>
      </div>
    </div>
  );
}
