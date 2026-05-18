import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Next.js 16: Cache Components (PPR default). Opt-in flag.
  // See plan §"Critical 2026 facts" #3.
  experimental: {
    cacheComponents: true,
  },

  // Supabase Storage videos served via signed URLs — explicit allowlist of host.
  // Update NEXT_PUBLIC_SUPABASE_URL host below once the Supabase project is provisioned.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
