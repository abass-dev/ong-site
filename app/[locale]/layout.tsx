import '../globals.css'
import { Roboto, Chau_Philomene_One } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { locales } from '../i18n'
import ScrollToTopButton from '@/components/ScrollToTopButton'

const roboto = Roboto({
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

export const metadata = {
  title: 'ONG Site Web',
  description: 'Site web professionnel pour une ONG',
}

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

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`${fraunChauPhilomeneOneces.variable} ${roboto.className}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow pt-16">{children}</main>
              <Footer />
              <ScrollToTopButton />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
