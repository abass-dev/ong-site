import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

export const locales = ['en', 'fr', 'ar'] as const;
export const defaultLocale = 'fr';

export default getRequestConfig(async () => {
  const headersList = await headers();
  const locale = headersList.get('X-NEXT-INTL-LOCALE') || defaultLocale;

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    locale: locale
  };
});

