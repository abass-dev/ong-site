import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function Hero() {
  const t = useTranslations('home')

  return (
    <div className="relative bg-gray-900 min-h-screen">
      <div className="absolute inset-0">
        <Image
          src="/images/ong-hero.webp"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent" />
      </div>
      <div className="relative z-10 px-4 py-32 sm:px-6 lg:px-8 lg:py-40 max-w-screen-xl mx-auto flex items-center min-h-screen">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">{t('title.part1')}</span>
            <span className="block text-yellow-400">{t('title.part2')}</span>
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            {t('description')}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/projets"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-black bg-yellow-400 hover:bg-yellow-500 transition duration-150 ease-in-out"
            >
              {t('cta.projects')}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-yellow-400 bg-gray-800 hover:bg-gray-700 transition duration-150 ease-in-out"
            >
              {t('cta.contact')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

