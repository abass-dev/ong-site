import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('navigation')

  return (
    <footer className="bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
          {['about', 'projects', 'news', 'contact'].map((item) => (
            <div key={item} className="px-5 py-2">
              <Link
                href={`/${item === 'about' ? 'a-propos' : item}`}
                className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                {tNav(item)}
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          {[
            { name: 'Facebook', icon: Facebook, href: '#' },
            { name: 'Instagram', icon: Instagram, href: '#' },
            { name: 'Twitter', icon: Twitter, href: '#' },
          ].map((item) => (
            <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; {new Date().getFullYear()} ONG SITE. {t('rights')}
        </p>
      </div>
    </footer>
  )
}

