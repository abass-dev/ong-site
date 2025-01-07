import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface SectionTitleProps {
    title: string
    subtitle?: string
    className?: string
}

export function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
    return (
        <motion.div
            className={cn("text-center space-y-4", className)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h2
                className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {title}
            </motion.h2>
            {subtitle && (
                <motion.p
                    className="text-xl text-muted-foreground max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    {subtitle}
                </motion.p>
            )}
        </motion.div>
    )
}

