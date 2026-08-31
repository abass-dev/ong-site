'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SectionTitle } from "@/components/ui/SectionTitle"

export default function Projects() {
    const t = useTranslations('projects')

    const projects = [
        {
            id: 1,
            title: t('project1.title'),
            description: t('project1.description'),
            image: '/images/eau.webp',
            category: t('project1.category'),
        },
        {
            id: 2,
            title: t('project2.title'),
            description: t('project2.description'),
            image: '/images/education.webp',
            category: t('project2.category'),
        },
        {
            id: 3,
            title: t('project3.title'),
            description: t('project3.description'),
            image: '/images/agriculture.webp',
            category: t('project3.category'),
        },
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
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full flex flex-col">
                                <div className="relative h-48">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover rounded-t-lg"
                                    />
                                </div>
                                <CardHeader>
                                    <CardTitle className="font-heading">{project.title}</CardTitle>
                                    <CardDescription>
                                        <Badge variant="secondary" className="bg-secondary text-white font-body text-xs">
                                            {project.category}
                                        </Badge>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="font-body text-dark">{project.description}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        variant="outline"
                                        className="w-full border-primary text-primary hover:bg-primary hover:text-white font-heading"
                                    >
                                        {t('learnMore')}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}