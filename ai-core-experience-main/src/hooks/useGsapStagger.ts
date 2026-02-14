import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StaggerOptions {
    y?: number;
    x?: number;
    stagger?: number;
    duration?: number;
    delay?: number;
    start?: string;
    ease?: string;
    selector?: string; // CSS selector for children
}

/**
 * Stagger children animation on scroll.
 * By default targets all direct children; pass `selector` to target specific elements.
 */
export const useGsapStagger = (options: StaggerOptions = {}) => {
    const ref = useRef<HTMLDivElement>(null);

    const {
        y = 60,
        x = 0,
        stagger = 0.1,
        duration = 0.8,
        delay = 0,
        start = 'top 80%',
        ease = 'power3.out',
        selector
    } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const targets = selector ? el.querySelectorAll(selector) : el.children;
        if (!targets.length) return;

        const ctx = gsap.context(() => {
            gsap.from(targets, {
                y,
                x,
                opacity: 0,
                stagger,
                duration,
                delay,
                ease,
                scrollTrigger: {
                    trigger: el,
                    start,
                    toggleActions: 'play none none reverse'
                }
            });
        }, ref);

        return () => ctx.revert();
    }, [y, x, stagger, duration, delay, start, ease, selector]);

    return ref;
};
