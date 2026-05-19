import { getRequestConfig } from 'next-intl/server';
import { routing, type Locale } from './routing';

// Plan §"Implementation Traps" #10:
// Messages MUST be `await import(\`../../messages/${locale}.json\`)).default`
// inside this function. Top-level imports break SSR.
//
// Note: next-intl@3.26 doesn't export `hasLocale` at runtime — use a simple
// type-cast guard instead.
function isValidLocale(l: string | undefined): l is Locale {
  return typeof l === 'string' && (routing.locales as readonly string[]).includes(l);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = isValidLocale(requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
