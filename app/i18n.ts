import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'fr', 'ar'];
export const defaultLocale = 'fr';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../messages/${locale}.json`)).default,
  locale: 'en'
}));


export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({ locales });

