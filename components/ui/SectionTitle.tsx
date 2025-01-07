import { cn } from "@/lib/utils"
import { Chau_Philomene_One } from 'next/font/google'

interface SectionTitleProps {
    title: string
    subtitle?: string
    className?: string
}

const chauPhilomeneOne = Chau_Philomene_One({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})

export function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
    return (
        <div className={cn("text-center space-y-4", className)}>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-chau-philomene-one">{title}</h2>
            {subtitle && <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-chau-philomene-one">{subtitle}</p>}
        </div>
    )
}

