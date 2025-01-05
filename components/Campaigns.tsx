'use client'

import * as React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
            image: '/images/campaign-fiscal.jpg'
        },
        {
            id: 2,
            title: t('lebanon.title'),
            description: t('lebanon.description'),
            image: '/images/campaign-lebanon.jpg'
        },
        {
            id: 3,
            title: t('gaza.title'),
            description: t('gaza.description'),
            image: '/images/campaign-gaza.jpg'
        },
        {
            id: 4,
            title: t('yemen.title'),
            description: t('yemen.description'),
            image: '/images/campaign-yemen.jpg'
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
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
                    <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
                </motion.div>

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

