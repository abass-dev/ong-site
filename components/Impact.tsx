'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Users, Droplet, BookOpen } from 'lucide-react'
import CountUp from '@/components/ui/CountUp'
import SpotlightCard from './ui/SpotlightCard'
import { SectionTitle } from "@/components/ui/SectionTitle"

const impactData = [
    { icon: Users, key: 'peopleHelped', to: 500000 },
    { icon: Droplet, key: 'waterAccess', to: 1000 },
    { icon: BookOpen, key: 'educationPrograms', to: 250 },
]

export default function Impact() {
    const t = useTranslations('impact')

    return (
        <section className="py-16 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <SectionTitle
                    title={t('title')}
                    subtitle={t('subtitle')}
                    className="mb-12"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {impactData.map((item, index) => (
                        <SpotlightCard
                            key={item.key}
                            className="custom-spotlight-card border-0 bg-white  dark:bg-gray-900"
                            spotlightColor="rgba(34,211,238,0.3)"
                        >
                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="bg-primary/10 dark:bg-primary/20 rounded-full p-6 inline-block mb-6">
                                    <item.icon className="w-12 h-12 text-primary" />
                                </div>

                                <h3 className="text-4xl font-bold mb-4 text-primary">
                                    <CountUp
                                        from={0}
                                        to={item.to}
                                        separator=","
                                        direction="up"
                                        duration={2}
                                        className="count-up-text"
                                    />
                                    {item.key === 'peopleHelped' && '+'}
                                </h3>
                                <p className="text-xl text-gray-600 dark:text-gray-300">{t(`${item.key}.text`)}</p>
                            </motion.div>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </section>
    )
}

