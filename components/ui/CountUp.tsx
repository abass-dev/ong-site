'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

interface CountUpProps {
    from: number
    to: number
    duration?: number
    delay?: number
    separator?: string
    direction?: 'up' | 'down'
    className?: string
}

const easeOutQuad = (t: number): number => t * (2 - t)

const CountUp: React.FC<CountUpProps> = ({
    from,
    to,
    duration = 2,
    delay = 0,
    separator = ',',
    direction = 'up',
    className = '',
}) => {
    const [count, setCount] = useState(from)
    const countRef = useRef<number>(from)
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    useEffect(() => {
        let startTime: number
        let animationFrame: number

        const updateCount = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = (timestamp - startTime) / (duration * 1000)

            if (progress < 1) {
                const easedProgress = easeOutQuad(progress)
                const nextCount = direction === 'up'
                    ? from + (to - from) * easedProgress
                    : to + (from - to) * (1 - easedProgress)

                countRef.current = nextCount
                setCount(Math.round(nextCount))
                animationFrame = requestAnimationFrame(updateCount)
            } else {
                countRef.current = to
                setCount(to)
            }
        }

        if (inView) {
            setTimeout(() => {
                animationFrame = requestAnimationFrame(updateCount)
            }, delay * 1000)
        }

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame)
            }
        }
    }, [from, to, duration, delay, direction, inView])

    const formattedCount = count.toLocaleString('en-US', { useGrouping: true }).replace(/,/g, separator)

    return <span ref={ref} className={className}>{formattedCount}</span>
}

export default CountUp

