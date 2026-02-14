import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroCanvas from './HeroCanvas';

gsap.registerPlugin(ScrollTrigger);

/** Split a string into individually-animated chars wrapped in spans */
const SplitText = ({ text, className = '' }: { text: string; className?: string }) => (
    <span className={className}>
        {text.split('').map((ch, i) => (
            <span
                key={i}
                className="char inline-block will-change-transform"
                style={{ display: ch === ' ' ? 'inline' : undefined }}
            >
                {ch === ' ' ? '\u00A0' : ch}
            </span>
        ))}
    </span>
);

const HeroSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollToProjects = useCallback(() => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }, []);
    const scrollToContact = useCallback(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.5 });

            /* Badge */
            tl.from('.hero-badge', { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' });

            /* Letter-split name — each char slides up with clip */
            tl.from('.hero-name .char', {
                y: '110%',
                rotateX: -80,
                opacity: 0,
                stagger: 0.035,
                duration: 1,
                ease: 'power4.out'
            }, '-=0.2');

            /* Subtitle */
            tl.from('.hero-sub', { opacity: 0, y: 25, duration: 0.7, ease: 'power3.out' }, '-=0.5');

            /* Description */
            tl.from('.hero-desc', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.3');

            /* CTA buttons */
            tl.from('.hero-cta', { opacity: 0, y: 20, stagger: 0.12, duration: 0.6, ease: 'power3.out' }, '-=0.2');

            /* Scroll indicator */
            tl.from(scrollRef.current, { opacity: 0, duration: 0.6 }, '-=0.1');

            /* ── Scroll: pin, then scale+fade exit ── */
            gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=120%',
                    scrub: 1.2,
                    pin: stickyRef.current
                }
            })
                .to(contentRef.current, { scale: 1.06, opacity: 0, y: -50, duration: 1, ease: 'power2.in' })
                .to(scrollRef.current, { opacity: 0, duration: 0.3 }, '<');

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative">
            <div ref={stickyRef} className="h-screen w-full overflow-hidden flex items-center justify-center relative" style={{ background: 'hsl(220 14% 4%)' }}>

                {/* Three.js background */}
                <HeroCanvas />

                {/* Soft gradient glows behind text */}
                <div className="absolute inset-0 z-[1] pointer-events-none">
                    <div className="absolute top-[20%] left-[25%] w-[450px] h-[450px] rounded-full opacity-[0.14]"
                        style={{ background: 'radial-gradient(circle, hsl(265 85% 58% / 0.5), transparent 70%)', filter: 'blur(100px)' }} />
                    <div className="absolute top-[35%] right-[20%] w-[350px] h-[350px] rounded-full opacity-[0.10]"
                        style={{ background: 'radial-gradient(circle, hsl(225 90% 58% / 0.4), transparent 70%)', filter: 'blur(90px)' }} />
                    <div className="absolute bottom-[15%] left-[40%] w-[300px] h-[300px] rounded-full opacity-[0.08]"
                        style={{ background: 'radial-gradient(circle, hsl(190 90% 50% / 0.35), transparent 70%)', filter: 'blur(80px)' }} />
                </div>

                {/* Content overlay */}
                <div ref={contentRef} className="relative z-10 text-center max-w-3xl px-6 will-change-transform">
                    {/* Status badge */}
                    <div className="hero-badge inline-flex items-center gap-2.5 mb-10 px-4 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] tracking-[0.18em] text-white/40" style={{ fontFamily: 'var(--font-mono)' }}>
                            Available for work
                        </span>
                    </div>

                    {/* Name — letter-split */}
                    <h1 className="hero-name overflow-hidden mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                        <div className="text-[clamp(2.8rem,11vw,7.5rem)] font-bold leading-[0.95] tracking-tight text-white">
                            <SplitText text="NITIN" />
                            {' '}
                            <span className="text-gradient"><SplitText text="MISHRA" /></span>
                        </div>
                    </h1>

                    {/* Subtitle */}
                    <p className="hero-sub text-base md:text-lg tracking-wide mb-5" style={{ color: 'hsl(215 10% 48%)' }}>
                        AI Developer · GenAI Architect · ML Engineer
                    </p>

                    {/* Description */}
                    <p className="hero-desc text-sm md:text-base max-w-md mx-auto mb-10 leading-relaxed" style={{ color: 'hsl(215 10% 38%)' }}>
                        Building intelligent systems at the intersection of Generative AI,
                        Computer Vision, and scalable architecture.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button onClick={scrollToProjects} className="hero-cta btn-glow" data-cursor="View">
                            View Projects
                        </button>
                        <button onClick={scrollToContact} className="hero-cta btn-outline" data-cursor="Say Hi">
                            Get in Touch
                        </button>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div ref={scrollRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator">
                    <span className="text-[9px] tracking-[0.25em] uppercase" style={{ color: 'hsl(215 10% 30%)', fontFamily: 'var(--font-mono)' }}>
                        Scroll
                    </span>
                    <svg width="14" height="22" viewBox="0 0 14 22" fill="none" className="opacity-30">
                        <rect x="1" y="1" width="12" height="20" rx="6" stroke="white" strokeWidth="1.2" />
                        <circle cx="7" cy="7" r="1.5" fill="white" className="animate-bounce" />
                    </svg>
                </div>

                {/* Corner marks */}
                <div className="absolute top-6 left-6 w-6 h-6 border-l border-t border-white/[0.06]" />
                <div className="absolute top-6 right-6 w-6 h-6 border-r border-t border-white/[0.06]" />
                <div className="absolute bottom-6 left-6 w-6 h-6 border-l border-b border-white/[0.06]" />
                <div className="absolute bottom-6 right-6 w-6 h-6 border-r border-b border-white/[0.06]" />
            </div>
        </div>
    );
};

export default HeroSection;
