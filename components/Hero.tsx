'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'


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
          <motion.h1
            className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="block">{t('title.part1')}</span>
            <span className="block text-yellow-400">{t('title.part2')}</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-xl text-gray-300 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('description')}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button asChild size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500">
              <Link href="/projets">
                {t('cta.projects')}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-yellow-400 border-yellow-400 hover:bg-yellow-400/10">
              <Link href="/contact">
                {t('cta.contact')}
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

