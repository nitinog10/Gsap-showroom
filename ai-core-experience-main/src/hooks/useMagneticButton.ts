import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

/**
 * Magnetic hover effect hook — makes an element subtly follow  
 * the cursor when nearby, creating a "pull" feel.
 * Pure GSAP, no framer-motion.
 */
export const useMagneticButton = (strength = 0.35) => {
    const ref = useRef<HTMLElement>(null);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;

        gsap.to(el, {
            x: deltaX,
            y: deltaY,
            duration: 0.4,
            ease: 'power3.out'
        });
    }, [strength]);

    const handleMouseLeave = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.4)'
        });
    }, []);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            el.removeEventListener('mousemove', handleMouseMove);
            el.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [handleMouseMove, handleMouseLeave]);

    return ref;
};
