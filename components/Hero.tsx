'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import BlurText from './ui/BlurText'
import SplitText from './ui/SplitText'

const heroContent = [
  {
    image: '/images/ong-hero.webp',
    titleKey: 'slide1.title',
    descriptionKey: 'slide1.description'
  },
  {
    image: '/images/ong-hero.webp',
    titleKey: 'slide2.title',
    descriptionKey: 'slide2.description'
  },
  {
    image: '/images/ong-hero.webp',
    titleKey: 'slide3.title',
    descriptionKey: 'slide3.description'
  }
]

export default function Hero() {
  const t = useTranslations('home')
  const tHero = useTranslations('hero')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroContent.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative bg-gray-900 min-h-screen flex items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={heroContent[currentIndex].image}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
        </motion.div>
      </AnimatePresence>
      <div className="relative z-10 container mx-auto px-4 py-32 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.h1
          key={currentIndex}
          className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="block font-chau-philomene-one">
            <SplitText text={tHero(`${heroContent[currentIndex].titleKey}.part1`)} className="tracking-wide" delay={50} />
          </span>
          <span className="block text-cyan-400 font-chau-philomene-one">
            <BlurText text={tHero(`${heroContent[currentIndex].titleKey}.part2`)} className="tracking-wide" delay={50} />
          </span>
        </motion.h1>
        <motion.div
          key={`desc-${currentIndex}`}
          className="mt-6 text-xl text-gray-100 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <BlurText text={tHero(heroContent[currentIndex].descriptionKey)} className="custom-class" delay={50} />
        </motion.div>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-cyan-400 text-white hover:text-gray-200 hover:bg-cyan-500">
            <Link href="/projets">
              {t('cta.projects')}
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-cyan-400 hover:text-white hover:bg-cyan-500 border-cyan-400 hover:bg-cyan-400/10">
            <Link href="/contact">
              {t('cta.contact')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

