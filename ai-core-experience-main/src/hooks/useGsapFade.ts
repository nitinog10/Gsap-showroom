import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FadeOptions {
    direction?: 'up' | 'down' | 'left' | 'right';
    distance?: number;
    duration?: number;
    delay?: number;
    start?: string;
    scrub?: boolean | number;
    ease?: string;
}

/**
 * Directional fade-in on scroll.
 */
export const useGsapFade = (options: FadeOptions = {}) => {
    const ref = useRef<HTMLDivElement>(null);

    const {
        direction = 'up',
        distance = 60,
        duration = 1,
        delay = 0,
        start = 'top 85%',
        scrub = false,
        ease = 'power2.out'
    } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const props: Record<string, number> = { opacity: 0 };
        if (direction === 'up') props.y = distance;
        if (direction === 'down') props.y = -distance;
        if (direction === 'left') props.x = distance;
        if (direction === 'right') props.x = -distance;

        const ctx = gsap.context(() => {
            gsap.from(el, {
                ...props,
                duration,
                delay,
                ease,
                scrollTrigger: {
                    trigger: el,
                    start,
                    scrub,
                    toggleActions: scrub ? undefined : 'play none none reverse'
                }
            });
        }, ref);

        return () => ctx.revert();
    }, [direction, distance, duration, delay, start, scrub, ease]);

    return ref;
};
