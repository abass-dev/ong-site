'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
    const t = useTranslations('about')

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.h1
                className="text-4xl font-bold mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {t('title')}
            </motion.h1>
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>{t('mission.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{t('mission.description')}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{t('vision.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{t('vision.description')}</p>
                    </CardContent>
                </Card>
            </motion.div>
            <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>{t('history.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{t('history.description')}</p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

