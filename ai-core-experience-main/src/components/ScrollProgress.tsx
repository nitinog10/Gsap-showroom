import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP-powered scroll progress indicator.
 * Replaces framer-motion useScroll/useSpring.
 */
const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 1,
        delay: 2
      });

      // Scroll-driven progress bar
      gsap.to(barRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Vertical progress bar */}
      <div
        ref={containerRef}
        className="fixed right-6 top-1/2 -translate-y-1/2 w-px h-32 bg-border z-50 hidden md:block"
      >
        <div
          ref={barRef}
          className="w-full h-full bg-accent origin-top"
          style={{ transform: 'scaleY(0)' }}
        />
      </div>

      {/* Section dot indicators */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-4">
        {['HERO', 'INTRO', 'ABOUT', 'SKILLS', 'WORK', 'EXP', 'CONTACT'].map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full bg-muted-foreground/30 hover:scale-[2] hover:bg-accent transition-all duration-300"
          />
        ))}
      </div>
    </>
  );
};

export default ScrollProgress;
