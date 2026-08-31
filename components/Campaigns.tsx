'use client'

import * as React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SpotlightCard from './ui/SpotlightCard'
import { SectionTitle } from "@/components/ui/SectionTitle"


export default function Campaigns() {
    const t = useTranslations('campaigns')
    const [api, setApi] = React.useState<any>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    const campaigns = [
        {
            id: 1,
            title: t('fiscal.title'),
            description: t('fiscal.description'),
            image: '/images/ong-hero.webp'
        },
        {
            id: 2,
            title: t('lebanon.title'),
            description: t('lebanon.description'),
            image: '/images/ong-hero.webp'
        },
        {
            id: 3,
            title: t('gaza.title'),
            description: t('gaza.description'),
            image: '/images/ong-hero.webp'
        },
        {
            id: 4,
            title: t('yemen.title'),
            description: t('yemen.description'),
            image: '/images/ong-hero.webp'
        }
    ]

    React.useEffect(() => {
        if (!api) return

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <SectionTitle
                    title={t('title')}
                    subtitle={t('subtitle')}
                    className="mb-12"
                />

                <Carousel
                    setApi={setApi}
                    className="w-full max-w-5xl mx-auto"
                    opts={{
                        align: "start",
                        loop: true
                    }}
                >
                    <CarouselContent>
                        {campaigns.map((campaign, index) => (
                            <CarouselItem key={campaign.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                                <AnimatePresence mode="wait">
                                    <SpotlightCard
                                        className="custom-spotlight-card border-0 bg-slate-50  dark:bg-gray-900"
                                        spotlightColor="rgba(34,211,238,0.3)"
                                    >
                                        <motion.div
                                            key={current}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <Card className="overflow-hidden h-full">
                                                <div className="relative h-48 md:h-64">
                                                    <Image
                                                        src={campaign.image}
                                                        alt={campaign.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <CardHeader>
                                                    <CardTitle>{campaign.title}</CardTitle>
                                                    <CardDescription>{campaign.description}</CardDescription>
                                                </CardHeader>
                                            </Card>
                                        </motion.div>
                                    </SpotlightCard>
                                </AnimatePresence>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex items-center justify-center mt-8 gap-4">
                        <CarouselPrevious variant="outline" size="icon" className="relative left-0">
                            <ChevronLeft className="h-4 w-4" />
                        </CarouselPrevious>
                        <div className="flex gap-2">
                            {Array.from({ length: count }).map((_, index) => (
                                <Button
                                    key={index}
                                    variant={current === index ? "default" : "outline"}
                                    size="icon"
                                    className="w-2 h-2 rounded-full p-0"
                                    onClick={() => api?.scrollTo(index)}
                                >
                                    <span className="sr-only">Go to slide {index + 1}</span>
                                </Button>
                            ))}
                        </div>
                        <CarouselNext variant="outline" size="icon" className="relative right-0">
                            <ChevronRight className="h-4 w-4" />
                        </CarouselNext>
                    </div>
                </Carousel>
            </div>
        </section>
    )
}

