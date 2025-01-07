'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Shield, Lightbulb } from 'lucide-react'

const MotionCard = motion(Card)

export default function AboutPage() {
    const t = useTranslations('about')

    const fadeInUp = {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    }

    const staggerChildren = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[40vh] flex items-center justify-center text-white">
                <Image
                    src="/images/ong-hero.webp"
                    alt="About Us Hero"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black bg-opacity-50" />
                <div className="relative z-10 text-center">
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold mb-4"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {t('hero.title')}
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {t('hero.subtitle')}
                    </motion.p>
                </div>
            </section>

            {/* Mission and Vision */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <motion.div className="grid md:grid-cols-2 gap-8" variants={staggerChildren} initial="initial" animate="animate">
                        <MotionCard variants={fadeInUp}>
                            <CardHeader>
                                <CardTitle>{t('mission.title')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{t('mission.description')}</p>
                            </CardContent>
                        </MotionCard>
                        <MotionCard variants={fadeInUp}>
                            <CardHeader>
                                <CardTitle>{t('vision.title')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{t('vision.description')}</p>
                            </CardContent>
                        </MotionCard>
                    </motion.div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <motion.h2
                        className="text-3xl font-bold mb-8 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {t('values.title')}
                    </motion.h2>
                    <motion.div className="grid md:grid-cols-3 gap-8" variants={staggerChildren} initial="initial" animate="animate">
                        <MotionCard variants={fadeInUp}>
                            <CardHeader>
                                <Shield className="w-12 h-12 mb-4 text-primary" />
                                <CardTitle>{t('values.integrity.title')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{t('values.integrity.description')}</p>
                            </CardContent>
                        </MotionCard>
                        <MotionCard variants={fadeInUp}>
                            <CardHeader>
                                <Heart className="w-12 h-12 mb-4 text-primary" />
                                <CardTitle>{t('values.compassion.title')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{t('values.compassion.description')}</p>
                            </CardContent>
                        </MotionCard>
                        <MotionCard variants={fadeInUp}>
                            <CardHeader>
                                <Lightbulb className="w-12 h-12 mb-4 text-primary" />
                                <CardTitle>{t('values.innovation.title')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{t('values.innovation.description')}</p>
                            </CardContent>
                        </MotionCard>
                    </motion.div>
                </div>
            </section>

            {/* History */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <motion.h2
                        className="text-3xl font-bold mb-8 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {t('history.title')}
                    </motion.h2>
                    <motion.p
                        className="text-lg text-center max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {t('history.description')}
                    </motion.p>
                </div>
            </section>

            {/* Team */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <motion.h2
                        className="text-3xl font-bold mb-4 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {t('team.title')}
                    </motion.h2>
                    <motion.p
                        className="text-lg text-center mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {t('team.description')}
                    </motion.p>
                    {/* Add team member cards here if needed */}
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 text-center">
                    <motion.h2
                        className="text-3xl font-bold mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {t('cta.title')}
                    </motion.h2>
                    <motion.p
                        className="text-xl mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {t('cta.description')}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Button asChild size="lg" variant="secondary">
                            <Link href="/contact">{t('cta.button')}</Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

