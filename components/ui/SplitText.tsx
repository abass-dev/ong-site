"use client";

import { useSprings, animated, SpringValue } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
}

const SplitText: React.FC<SplitTextProps> = ({ text, className = '', delay = 100 }) => {
    const letters = text.split('');
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            { threshold: 0.1, rootMargin: '-100px' }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    const springs = useSprings(
        letters.length,
        letters.map((_, i) => ({
            from: { opacity: 0, transform: 'translate3d(0,40px,0)' },
            to: inView
                ? async (next: (styles: { opacity: number; transform: string }) => Promise<void>) => {
                    await next({ opacity: 1, transform: 'translate3d(0,-10px,0)' });
                    await next({ opacity: 1, transform: 'translate3d(0,0,0)' });
                }
                : { opacity: 0, transform: 'translate3d(0,40px,0)' },
            delay: i * delay,
        }))
    );

    return (
        <p className={`inline-block overflow-hidden ${className}`} ref={ref}>
            {springs.map((props: { opacity: SpringValue<number>; transform: SpringValue<string>; }, index: number) => (
                <animated.span
                    key={index}
                    style={props as {
                        opacity: SpringValue<number>;
                        transform: SpringValue<string>;
                    }}
                    className="inline-block transform will-change-transform will-change-opacity"
                >
                    {letters[index] === ' ' ? ' ' : letters[index]}
                </animated.span>
            ))}
        </p>
    );
};

export default SplitText;
