'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import BlurText from './ui/BlurText'
import SplitText from './ui/SplitText'

export default function Hero() {
  const t = useTranslations('home')

  return (
    <div className="relative bg-gray-900 min-h-screen flex items-center">
      <div className="absolute inset-0">
        <Image
          src="/images/ong-hero.webp"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>
      <div className="relative z-10 container mx-auto px-4 py-32 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.h1
          className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="block font-chau-philomene-one">
            <SplitText text={t('title.part1')} className="tracking-wide" delay={10} />

          </span>
          <span className="block text-cyan-400 font-chau-philomene-one">
            <BlurText text={t('title.part2')} className="tracking-wide" delay={50} />
          </span>
        </motion.h1>
        <motion.div
          className="mt-6 text-xl text-gray-100 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >

          <BlurText text={t('description')} className="custom-class" delay={50} />
        </motion.div>
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button asChild size="lg" className="bg-cyan-400 text-white hover:text-gray-200 hover:bg-cyan-500">
            <Link href="/projets">
              <BlurText text={t('cta.projects')} className="custom-class" delay={50} />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-cyan-400 hover:text-white hover:bg-cyan-500 border-cyan-400 hover:bg-cyan-400/10">
            <Link href="/contact">
              <BlurText text={t('cta.contact')} className="custom-class" delay={50} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

