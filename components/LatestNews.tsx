'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import SpotlightCard from './ui/SpotlightCard'
import { SectionTitle } from "@/components/ui/SectionTitle"

export default function LatestNews() {
    const t = useTranslations('news')

    const news = [
        { id: 1, title: t('news1.title'), description: t('news1.description'), date: t('news1.date') },
        { id: 2, title: t('news2.title'), description: t('news2.description'), date: t('news2.date') },
        { id: 3, title: t('news3.title'), description: t('news3.description'), date: t('news3.date') },
    ]

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <SectionTitle
                    title={t('title')}
                    subtitle={t('subtitle')}
                    className="mb-12"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.map((item, index) => (
                        <SpotlightCard
                            key={item.id}
                            className="custom-spotlight-card border-0 bg-white  dark:bg-gray-900"
                            spotlightColor="rgba(34,211,238,0.3)"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="h-full flex flex-col">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
                                        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">{item.date}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                                    </CardContent>
                                    <div className="p-4 pt-0 mt-auto">
                                        <Button variant="outline" asChild className="w-full group">
                                            <Link href="/actualites" className="flex items-center justify-center">
                                                {t('readMore')}
                                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </Link>
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        </SpotlightCard>
                    ))}
                </div>
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Button asChild size="lg">
                        <Link href="/actualites" className="flex items-center">
                            {t('viewAll')}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}

