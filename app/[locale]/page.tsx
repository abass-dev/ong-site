import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('home')

  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
          <svg
            className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white dark:fill-gray-800 lg:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="0,0 90,0 50,100 0,100" />
          </svg>

          <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                {t('title')}
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                {t('description')}
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  href="/projets"
                  className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  {t('cta.projects')}
                </Link>
                <Link href="/contact" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-300">
                  {t('cta.contact')} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-900 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <Image
          className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
          src="/hero-image.jpg"
          alt="Image représentative de notre mission"
          width={1920}
          height={1080}
        />
      </div>
    </div>
  )
}

