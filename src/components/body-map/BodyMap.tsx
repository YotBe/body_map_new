'use client';

// IMPORTANT: The outer wrapper uses dir="ltr" explicitly so that the SVG
// coordinate system is never flipped by Hebrew RTL page direction.
// Anatomical LEFT = SVG LEFT (self-facing convention).
// Plan §"Implementation Traps" #6.

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { BODY_REGIONS, type BodyRegion } from '@/lib/triage/body-regions';
import { SeveritySlider } from './SeveritySlider';

export interface SymptomEntry {
  region_code: string;
  side: string;
  severity_vas: number;
}

interface BodyMapProps {
  /** Called whenever the selected symptoms change. */
  onChange: (symptoms: SymptomEntry[]) => void;
}

const VIEWBOX_W = 200;
const VIEWBOX_H = 270;

// Simplified body silhouette paths — drawn as a single SVG so users
// understand the spatial layout of the clickable zones.
function BodySilhouette() {
  return (
    <g aria-hidden="true" fill="none">
      {/* Head */}
      <ellipse cx={100} cy={35} rx={22} ry={24} stroke="#d1d5db" strokeWidth={1.5} fill="#f9fafb" />
      {/* Neck */}
      <rect x={91} y={57} width={18} height={16} rx={3} stroke="#d1d5db" strokeWidth={1} fill="#f9fafb" />
      {/* Torso */}
      <path
        d="M65,73 Q55,80 52,130 Q50,155 60,165 L140,165 Q150,155 148,130 Q145,80 135,73 Z"
        stroke="#d1d5db"
        strokeWidth={1.5}
        fill="#f9fafb"
      />
      {/* Left upper arm */}
      <path d="M65,73 Q50,90 48,140 Q50,148 58,148 Q66,148 68,140 L72,80 Z"
        stroke="#d1d5db" strokeWidth={1} fill="#f9fafb" />
      {/* Right upper arm */}
      <path d="M135,73 Q150,90 152,140 Q150,148 142,148 Q134,148 132,140 L128,80 Z"
        stroke="#d1d5db" strokeWidth={1} fill="#f9fafb" />
      {/* Left forearm */}
      <path d="M48,140 Q44,200 44,215 Q50,220 56,215 Q58,200 58,148 Z"
        stroke="#d1d5db" strokeWidth={1} fill="#f9fafb" />
      {/* Right forearm */}
      <path d="M152,140 Q156,200 156,215 Q150,220 144,215 Q142,200 142,148 Z"
        stroke="#d1d5db" strokeWidth={1} fill="#f9fafb" />
      {/* Hips / pelvis */}
      <path d="M60,165 Q62,200 70,205 L130,205 Q138,200 140,165 Z"
        stroke="#d1d5db" strokeWidth={1} fill="#f9fafb" />
    </g>
  );
}

interface HotspotProps {
  region: BodyRegion;
  isSelected: boolean;
  vas: number;
  onClick: () => void;
}

function Hotspot({ region, isSelected, vas, onClick }: HotspotProps) {
  const { cx, cy, rx, ry } = region.svgZone;

  // Color scale: unselected = transparent, selected = green→red by VAS
  const fill = isSelected
    ? vas >= 7
      ? '#ef4444'   // red
      : vas >= 4
      ? '#f97316'   // orange
      : '#22c55e'   // green (mild)
    : 'transparent';

  return (
    <g
      onClick={onClick}
      role="button"
      aria-pressed={isSelected}
      aria-label={region.labelEn}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? onClick() : undefined}
      style={{ cursor: 'pointer' }}
    >
      <ellipse
        cx={cx} cy={cy} rx={rx} ry={ry}
        fill={fill}
        fillOpacity={isSelected ? 0.65 : 0}
        stroke={isSelected ? fill : '#9ca3af'}
        strokeWidth={isSelected ? 2 : 1.5}
        strokeDasharray={isSelected ? undefined : '3 2'}
      />
      {/* Invisible, larger hit area for touch */}
      <ellipse cx={cx} cy={cy} rx={rx + 6} ry={ry + 6} fill="transparent" />
    </g>
  );
}

export function BodyMap({ onChange }: BodyMapProps) {
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  function toggleRegion(code: string) {
    setSelected((prev) => {
      const next = { ...prev };
      if (next[code] !== undefined) {
        delete next[code];
        if (activeRegion === code) setActiveRegion(null);
      } else {
        next[code] = 5; // default VAS = 5 on first click
        setActiveRegion(code);
      }
      emitChange(next);
      return next;
    });
  }

  function updateVas(code: string, vas: number) {
    setSelected((prev) => {
      const next = { ...prev, [code]: vas };
      emitChange(next);
      return next;
    });
  }

  function emitChange(state: Record<string, number>) {
    const symptoms: SymptomEntry[] = Object.entries(state).map(([code, vas]) => {
      const region = BODY_REGIONS.find((r) => r.code === code);
      return {
        region_code: code,
        side: region?.side ?? 'center',
        severity_vas: vas,
      };
    });
    onChange(symptoms);
  }

  const activeRegionMeta = activeRegion
    ? BODY_REGIONS.find((r) => r.code === activeRegion)
    : null;

  return (
    // dir="ltr" is mandatory — prevents RTL from mirroring the SVG coordinate
    // system and swapping anatomical left/right.
    <div dir="ltr" className="flex flex-col items-center gap-6">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        Tap a region where you feel pain or tightness
      </p>

      <svg
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        width={220}
        height={297}
        aria-label="Body diagram — click regions to report pain"
        role="img"
        className="select-none"
      >
        <BodySilhouette />
        {BODY_REGIONS.map((region) => (
          <Hotspot
            key={region.code}
            region={region}
            isSelected={region.code in selected}
            vas={selected[region.code] ?? 5}
            onClick={() => {
              toggleRegion(region.code);
              setActiveRegion(
                activeRegion === region.code ? null : region.code,
              );
            }}
          />
        ))}
      </svg>

      {/* Severity slider for the most-recently-clicked region */}
      {activeRegionMeta && activeRegion && selected[activeRegion] !== undefined && (
        <div className="w-full max-w-xs rounded-lg border border-border bg-card p-4 shadow-sm">
          <p className="font-medium">{activeRegionMeta.labelEn}</p>
          <SeveritySlider
            regionCode={activeRegion}
            value={selected[activeRegion] ?? 5}
            onChange={updateVas}
          />
          <button
            type="button"
            onClick={() => setActiveRegion(null)}
            className="mt-3 text-xs text-muted-foreground underline"
          >
            Done with this region
          </button>
        </div>
      )}

      {/* Selected region chips */}
      {Object.keys(selected).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(selected).map(([code, vas]) => {
            const meta = BODY_REGIONS.find((r) => r.code === code);
            return (
              <button
                key={code}
                type="button"
                onClick={() => setActiveRegion(code)}
                className={cn(
                  'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                  vas >= 7
                    ? 'border-red-300 bg-red-50 text-red-700'
                    : vas >= 4
                    ? 'border-orange-300 bg-orange-50 text-orange-700'
                    : 'border-green-300 bg-green-50 text-green-700',
                )}
              >
                {meta?.labelEn ?? code} · {vas}/10
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
