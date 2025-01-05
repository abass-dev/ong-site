'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ProjectsPage() {
    const t = useTranslations('projects')

    const projects = [
        { id: 1, title: t('project1.title'), description: t('project1.description'), category: t('project1.category') },
        { id: 2, title: t('project2.title'), description: t('project2.description'), category: t('project2.category') },
        { id: 3, title: t('project3.title'), description: t('project3.description'), category: t('project3.category') },
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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>{project.title}</CardTitle>
                                <CardDescription>
                                    <Badge variant="secondary">{project.category}</Badge>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>{project.description}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

