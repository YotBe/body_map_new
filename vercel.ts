// vercel.ts — Next.js 16 / Vercel 2026 configuration (replaces vercel.json).
// Install `@vercel/config` when you link the project: `npm i -D @vercel/config`.
// Until installed this file is a TYPE-ONLY placeholder; the build does not load it.

// import { type VercelConfig } from '@vercel/config/v1';

export const config = {
  buildCommand: 'next build',
  framework: 'nextjs',
  // Israeli market wedge — choose Frankfurt (fra1) or Stockholm (arn1) for low Tel Aviv latency.
  // Vercel routes Functions to the nearest region by default; this is an override hint.
  regions: ['fra1'],
  // Vercel Cron jobs (replaces pg_cron for app-layer scheduling).
  // Activates once vercel.ts is linked to the Vercel project + matching route exists.
  crons: [
    // Enqueue PROM prompts (RMDQ / NDI / DASH) at user weeks 0, 6, 12.
    // The route checks user_programs.started_at and inserts a notification.
    { path: '/api/cron/enqueue-proms', schedule: '0 9 * * *' },
  ],
};

export default config;
