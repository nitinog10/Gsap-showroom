import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Agency-level custom cursor:
 * - Small dot + larger trailing ring
 * - Ring expands + shows label text on interactive element hover
 * - GSAP quickTo for 60fps tracking
 * - Hidden on mobile / touch devices
 */
const MagneticCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [label, setLabel] = useState('');
  const isHovering = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ('ontouchstart' in window || window.innerWidth < 768) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide default cursor
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';

    // GSAP quickTo — ultra-smooth tracking
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    };

    const onLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor], [data-magnetic]');

      if (interactive && !isHovering.current) {
        isHovering.current = true;
        const cursorLabel = (interactive as HTMLElement).dataset.cursor || '';
        setLabel(cursorLabel);

        gsap.to(dot, { scale: 0, duration: 0.25, ease: 'power2.out' });
        gsap.to(ring, {
          width: cursorLabel ? 90 : 60,
          height: cursorLabel ? 90 : 60,
          borderWidth: 1,
          opacity: 0.9,
          duration: 0.35,
          ease: 'power2.out'
        });
      } else if (!interactive && isHovering.current) {
        isHovering.current = false;
        setLabel('');
        gsap.to(dot, { scale: 1, duration: 0.25, ease: 'power2.out' });
        gsap.to(ring, {
          width: 36,
          height: 36,
          borderWidth: 1,
          opacity: 0.4,
          duration: 0.35,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onOver);

    return () => {
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ opacity: 0 }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white" />
      </div>

      {/* Ring + label */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:flex items-center justify-center"
        style={{ opacity: 0, width: 36, height: 36 }}
      >
        <div
          className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30"
          style={{ width: '100%', height: '100%' }}
        />
        {label && (
          <span
            ref={labelRef}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-[9px] font-medium uppercase tracking-[0.15em] text-white whitespace-nowrap"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {label}
          </span>
        )}
      </div>
    </>
  );
};

export default MagneticCursor;