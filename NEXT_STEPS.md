# PhysioDesk — Next Steps

Phase 0 (scaffold) is complete. This document explains what you need to do
to bring the app to life locally, then how to deploy a preview to Vercel.

## 1. Move out of OneDrive (recommended)

The project currently sits in a OneDrive-synced folder:
`C:\Users\YotamBenEliezer\OneDrive - RAYZONE GROUP LTD\Desktop\project`

OneDrive will try to sync `node_modules/` (now hundreds of thousands of files)
and `.next/` build output. That causes:
- Slow installs
- Frequent sync conflicts
- Surprise CPU/disk churn

**Recommended fix**: copy or move the folder to `C:\dev\physiodesk` (or anywhere
outside OneDrive). Alternative: right-click the `node_modules` and `.next`
folders → OneDrive → "Always keep on this device" → "Free up space" to exclude
from sync (but you must re-do this after every `npm install`).

## 2. Set up the Supabase project

### Option A — Local Supabase (recommended for development)

1. Install the Supabase CLI: `npm i -g supabase` (or use the [native installer](https://supabase.com/docs/guides/local-development/cli/getting-started))
2. Install Docker Desktop (the local stack needs it).
3. From the project root, start the local stack:
   ```powershell
   supabase start
   ```
   This runs Postgres, the API server, Studio, and Inbucket (for magic-link emails).
4. Apply migrations and seed:
   ```powershell
   supabase db reset
   ```
   This drops the local DB, applies all migrations in `supabase/migrations/`,
   then runs `supabase/seed.sql` (demo employer + 6 users).
5. Copy the printed `API URL` and `anon key` (it's called `publishable key` in
   newer Supabase setups) into `.env.local` (see section 3).
6. Studio is at http://127.0.0.1:54323 — inspect tables, run SQL, manage users.

### Option B — Hosted Supabase

1. Create a new project at https://supabase.com (Frankfurt region recommended
   for Israeli latency).
2. In Project Settings → API, copy the project URL and the publishable key.
3. In the Supabase dashboard, run each migration file from `supabase/migrations/`
   in order (SQL Editor → New query → paste → run), then run `supabase/seed.sql`
   ONLY if this is a development project — never on prod.
4. Configure auth providers (Auth → Providers): enable Email + Google.
5. Add redirect URLs (Auth → URL Configuration):
   - `http://localhost:3000/en/auth/callback`
   - `http://localhost:3000/he/auth/callback`
   - Your preview/prod URLs once deployed.

## 3. Create `.env.local`

`.env.local` is git-ignored. Create it at the project root with these keys:

```bash
# Public — safe in browser
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Server-only — NEVER expose to browser. Bypasses RLS.
# Only needed if you use the admin client (webhooks, cron). Skip for normal dev.
SUPABASE_SECRET_KEY=sb_secret_...
```

For local Supabase, `supabase start` prints these. For hosted, copy from
Project Settings → API.

## 4. Install dependencies (if node_modules is missing)

OneDrive may remove `node_modules` between sessions. If it's gone, reinstall with:

```powershell
npm install --legacy-peer-deps
```

The `--legacy-peer-deps` flag is needed because `next-intl@3.26` hasn't yet
declared `next@16` in its `peerDependencies` (the actual code is compatible —
it's a metadata lag). You'll see a warning about this; it's expected.

## 5. Run the dev server

```powershell
npm run dev
```

Open http://localhost:3000 — Next.js will auto-redirect to `/en` (or `/he`
based on your browser's `Accept-Language`).

### Smoke test (works without auth):
- http://localhost:3000/en — marketing landing stub
- http://localhost:3000/he — same in Hebrew (RTL)
- http://localhost:3000/en/login — login page

### Smoke test (needs local Supabase + seed):
- Sign in as `admin@demo.test` / `password` via magic link (check Inbucket at
  http://127.0.0.1:54324)
- http://localhost:3000/en/admin — employer dashboard (you should see 6
  enrolled, ≥5 = k-anon-safe)
- Sign in as `seed_user_1@demo.test` / `password`
- http://localhost:3000/en/today — user view (currently a Phase 2 stub)

## 5. Deploy a Vercel preview

1. Install the Vercel CLI: `npm i -g vercel`
2. Run `vercel link` (creates `.vercel/` — already git-ignored).
3. Add the same env vars in Vercel Dashboard → Project → Settings → Environment
   Variables. Point `NEXT_PUBLIC_APP_URL` to the preview/prod URL.
4. Push to `main` (or any branch) and Vercel will build automatically. Or
   trigger manually with `vercel` (preview) or `vercel --prod` (production).

## 6. What's next (Phase 1)

Per the approved plan (`~/.claude/plans/strategic-research-majestic-hedgehog.md`):

- **Phase 1 (weeks 2–3) — Triage**: body-map SVG, severity slider, red-flag
  form, doctor-referral exit page, program-assignment rules engine, more
  curriculum seed data. The `(user)/onboarding/*` route tree is the starting
  point.
- **Phase 2 (weeks 4–5) — Daily session**: `/today` queue, video player (signed
  URLs from Supabase Storage), RPE input, session_logs Server Actions, auto
  -progression.
- **Phase 3 (week 6) — Progress + admin polish**: VAS trend chart, adherence
  streak, PROMs (RMDQ/NDI/DASH), Vercel Cron for week 0/6/12 prompts, full
  Hebrew copy pass, axe-core a11y audit, production deploy.

## File map (what was scaffolded)

```
project/
├── package.json, tsconfig.json, next.config.ts, tailwind.config.ts, postcss.config.mjs
├── vercel.ts                   # placeholder; install @vercel/config before linking
├── proxy.ts                    # Next.js 16 middleware (renamed)
├── components.json             # shadcn config (run `npx shadcn add <component>` later)
├── messages/{en,he}.json
├── supabase/
│   ├── config.toml             # local-dev config
│   ├── seed.sql                # demo employer + 6 users
│   └── migrations/
│       ├── 0001_init_core.sql
│       ├── 0002_clinical_tables.sql
│       ├── 0003_rls_policies.sql
│       ├── 0004_dashboard_fn.sql    ← k-anonymity privacy keystone
│       └── 0005_seed_curriculum.sql
└── src/
    ├── i18n/{routing,request,navigation}.ts
    ├── lib/
    │   ├── supabase/{server,client,proxy-client,admin}.ts
    │   ├── auth/{get-claims,require-user,require-employer-admin}.ts
    │   ├── env.ts, utils.ts
    └── app/
        ├── layout.tsx, globals.css
        └── [locale]/
            ├── layout.tsx, page.tsx (marketing stub)
            ├── login/{page,login-form}.tsx
            ├── auth/callback/route.ts
            ├── join/[employerSlug]/page.tsx
            ├── (user)/{layout,today/page}.tsx
            └── (employer)/{layout,admin/page}.tsx
```

## Critical reminders (from the plan)

1. `middleware.ts` is renamed `proxy.ts` in Next.js 16. Many Supabase docs
   online still say `middleware.ts` — ignore them.
2. **Never** use `supabase.auth.getSession()` server-side — use `getClaims()`
   (see `src/lib/auth/get-claims.ts`).
3. The service-role client (`src/lib/supabase/admin.ts`) bypasses RLS. Only
   import it in webhook / cron route handlers under `import 'server-only'`.
4. Employer admins can ONLY read user data via the `employer_dashboard_stats`
   RPC, which enforces a k-anonymity floor of 5. Do not add an RLS policy
   granting them direct SELECT on user tables — that would silently leak PHI.
5. The body-map SVG (Phase 1) must force `dir="ltr"` so anatomical left/right
   doesn't flip under Hebrew RTL.

## Common pitfalls you'll hit

- **"Module not found: '@vercel/config/v1'"** — `vercel.ts` references a
  package we haven't installed yet (per the plan, install when you link the
  project). For now `vercel.ts` only documents intent; Next.js doesn't load it.
- **"NEXT_PUBLIC_SUPABASE_URL is required"** — you haven't created `.env.local`
  yet (section 3).
- **OneDrive errors locking `.next/trace`** — see section 1; move out of OneDrive.
- **"Cookies can only be modified in a Server Action or Route Handler"** — a
  Server Component tried to write the auth cookie. Should never happen because
  `proxy.ts` refreshes cookies before the request hits any page. The try/catch
  in `src/lib/supabase/server.ts` handles the edge case.
