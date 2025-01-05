'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function NewsPage() {
    const t = useTranslations('news')

    const newsItems = [
        { id: 1, title: t('news1.title'), description: t('news1.description'), date: t('news1.date') },
        { id: 2, title: t('news2.title'), description: t('news2.description'), date: t('news2.date') },
        { id: 3, title: t('news3.title'), description: t('news3.description'), date: t('news3.date') },
    ]

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
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {newsItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>
                                    <Badge variant="outline">{item.date}</Badge>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>{item.description}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

