import { z } from 'zod';

// Public env — safe in browser bundle.
const publicEnv = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
});

// Server-only env. NEVER reference these from client components or this object
// will be `undefined` at runtime.
const serverEnv = z.object({
  SUPABASE_SECRET_KEY: z.string().min(1).optional(),
});

export const publicEnvParsed = publicEnv.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});

// Don't throw at import-time — Supabase project might not be linked yet during
// initial scaffold. Throw at first call instead.
export function getPublicEnv() {
  if (!publicEnvParsed.success) {
    throw new Error(
      `Invalid public env: ${publicEnvParsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(', ')}`,
    );
  }
  return publicEnvParsed.data;
}

export function getServerEnv() {
  const parsed = serverEnv.safeParse({
    SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
  });
  if (!parsed.success) {
    throw new Error(
      `Invalid server env: ${parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(', ')}`,
    );
  }
  return parsed.data;
}
