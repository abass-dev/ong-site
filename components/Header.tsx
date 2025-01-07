'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Menu, X, Moon, Sun, Globe, Phone } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { locales } from '@/app/config'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from 'next/image'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const t = useTranslations('navigation')
  const router = useRouter()
  const currentLocale = useLocale()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/a-propos' },
    { name: t('projects'), href: '/projets' },
    { name: t('news'), href: '/actualites' },
    { name: t('contact'), href: '/contact' },
  ]

  const switchLanguage = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '')
    const newPath = `/${newLocale}${pathWithoutLocale}`
    router.push(newPath)
  }

  return (
    <motion.header
      className="fixed w-full z-30 bg-background/80 backdrop-blur-md shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <span className="sr-only">ONG SITE</span>
            {/* <Image fill className="h-8 w-auto" src="/logo.svg" alt="" /> */}
            <span className="text-xl font-semibold">ONG SITE</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open main menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-lg font-semibold leading-6 ${pathname === item.href
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-primary'
                      } transition-colors duration-200`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">+227 99 99 99</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-start hover:text-primary transition-colors duration-200">
                      <Globe className="mr-2 h-4 w-4" />
                      {currentLocale === 'fr' ? 'Français' : currentLocale === 'en' ? 'English' : 'العربية'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {locales.map((loc) => (
                      <DropdownMenuItem key={loc} onClick={() => switchLanguage(loc)}>
                        {loc === 'fr' ? 'Français' : loc === 'en' ? 'English' : 'العربية'}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {mounted && (
                  <Button
                    variant="outline"
                    className="w-full justify-start hover:text-primary transition-colors duration-200"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  >
                    {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 ${pathname === item.href
                ? 'text-primary'
                : 'text-muted-foreground hover:text-primary'
                } transition-colors duration-200`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-8 items-center">
          <div className="flex items-center gap-2 hover:text-primary text-muted-foreground transition-colors duration-200">
            <Phone className="h-4 w-4" />
            <span className="text-sm">+227 99 99 99</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='hover:text-primary transition-colors duration-200' variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {locales.map((loc) => (
                <DropdownMenuItem key={loc} onClick={() => switchLanguage(loc)}>
                  {loc === 'fr' ? 'Français' : loc === 'en' ? 'English' : 'العربية'}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {mounted && (
            <Button
              className='hover:text-primary transition-colors duration-200'
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">
                {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              </span>
            </Button>
          )}
        </div>
      </nav>
    </motion.header>
  )
}

