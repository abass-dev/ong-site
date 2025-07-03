import '../globals.css'
// import { Roboto, Chau_Philomene_One } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { locales } from '../i18n'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { Montserrat, Open_Sans, Playfair_Display } from 'next/font/google';
import type { Metadata } from 'next';
import Analytics from "@/components/Analytics"
// Define the fonts
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
});

export const metadata: Metadata = {
  title: 'ONG Site Web',
  description: 'Site web professionnel pour une ONG',
};
/* const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

const fraunChauPhilomeneOneces = Chau_Philomene_One({
  subsets: ['latin'],
  weight: "400",
  variable: '--font-chau-philomene-one',
  display: 'swap',
})
 */

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  if (!locales.includes(locale as any)) notFound();

  // Check if analytics IDs are available
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID

  return (
    <html className={`${montserrat.variable} ${openSans.variable} ${playfairDisplay.variable}`} lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4160637975098001"
          as="script"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-body">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow pt-16">{children}</main>
              <Footer />
              <ScrollToTopButton />
            </div>
          </ThemeProvider>
          {(GA_MEASUREMENT_ID || ADS_ID) && (
            <Analytics
              GA_MEASUREMENT_ID={GA_MEASUREMENT_ID}
              ADS_ID={ADS_ID}
            />
          )}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
