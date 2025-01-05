'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
    const t = useTranslations('contact')

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
                className="max-w-md mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>{t('form.title')}</CardTitle>
                        <CardDescription>{t('form.description')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">{t('form.name')}</label>
                                <Input id="name" placeholder={t('form.namePlaceholder')} />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-1">{t('form.email')}</label>
                                <Input id="email" type="email" placeholder={t('form.emailPlaceholder')} />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-1">{t('form.message')}</label>
                                <Textarea id="message" placeholder={t('form.messagePlaceholder')} />
                            </div>
                            <Button type="submit" className="w-full">{t('form.submit')}</Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

