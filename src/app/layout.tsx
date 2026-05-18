import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: 'PhysioDesk',
  description: 'Daily resistance-band care for desk workers.',
};

// The root layout is intentionally minimal — the meaningful `<html>` element
// with `lang` + `dir` lives in `app/[locale]/layout.tsx`, where we know which
// locale we're rendering.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
