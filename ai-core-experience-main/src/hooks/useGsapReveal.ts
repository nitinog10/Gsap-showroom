import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
    y?: number;
    x?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    start?: string;
    end?: string;
    scrub?: boolean | number;
    ease?: string;
    stagger?: number;
    animateChildren?: boolean;
}

/**
 * Reusable scroll-reveal hook.
 * Attach the returned ref to a container; it (or its children) will
 * animate in when scrolled into view.
 */
export const useGsapReveal = (options: RevealOptions = {}) => {
    const ref = useRef<HTMLDivElement>(null);

    const {
        y = 80,
        x = 0,
        opacity = 0,
        duration = 1,
        delay = 0,
        start = 'top 80%',
        end = 'top 30%',
        scrub = false,
        ease = 'power3.out',
        stagger = 0,
        animateChildren = false
    } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            const targets = animateChildren ? el.children : el;

            gsap.from(targets, {
                y,
                x,
                opacity,
                duration,
                delay,
                stagger,
                ease,
                scrollTrigger: {
                    trigger: el,
                    start,
                    end,
                    scrub,
                    toggleActions: scrub ? undefined : 'play none none reverse'
                }
            });
        }, ref);

        return () => ctx.revert();
    }, [y, x, opacity, duration, delay, start, end, scrub, ease, stagger, animateChildren]);

    return ref;
};
