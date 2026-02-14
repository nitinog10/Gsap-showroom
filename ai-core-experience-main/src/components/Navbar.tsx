import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const navRef = useRef<HTMLElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            /* Entrance */
            gsap.from(navRef.current, {
                y: -60,
                opacity: 0,
                duration: 0.8,
                delay: 1.6,
                ease: 'power3.out'
            });

            /* Hide on scroll-down, show on scroll-up */
            let lastScroll = 0;
            ScrollTrigger.create({
                start: 0,
                end: 'max',
                onUpdate: (self) => {
                    const dir = self.direction;   // 1 = down, -1 = up
                    const pos = self.scroll();
                    setScrolled(pos > 80);

                    if (pos > 300) {
                        if (dir === 1 && pos > lastScroll + 5) {
                            gsap.to(navRef.current, { y: -100, duration: 0.35, ease: 'power2.in' });
                        } else if (dir === -1) {
                            gsap.to(navRef.current, { y: 0, duration: 0.35, ease: 'power2.out' });
                        }
                    } else {
                        gsap.to(navRef.current, { y: 0, duration: 0.25 });
                    }
                    lastScroll = pos;
                }
            });
        });

        return () => ctx.revert();
    }, []);

    const handleClick = (href: string) => {
        setIsOpen(false);
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 will-change-transform ${scrolled
                    ? 'bg-[hsl(220_14%_4%/0.85)] backdrop-blur-xl border-b border-white/[0.04]'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-5xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
                {/* Logo */}
                <a
                    href="#"
                    className="text-sm font-bold tracking-[0.15em] uppercase text-white/90"
                    style={{ fontFamily: 'var(--font-heading)' }}
                    data-cursor="Home"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                >
                    NM
                </a>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => handleClick(link.href)}
                            className="text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-white/90 transition-colors duration-300"
                            style={{ fontFamily: 'var(--font-mono)' }}
                            data-cursor={link.label}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>

                {/* Mobile toggle */}
                <button
                    className="md:hidden flex flex-col gap-1.5 w-6"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`block h-px bg-white/70 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[4px]' : ''}`} />
                    <span className={`block h-px bg-white/70 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
                </button>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-72 border-t border-white/[0.04]' : 'max-h-0'}`}
                style={{ background: 'hsl(220 14% 4% / 0.95)', backdropFilter: 'blur(20px)' }}
            >
                <div className="px-6 py-6 flex flex-col gap-5">
                    {navLinks.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => handleClick(link.href)}
                            className="text-sm uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors text-left"
                            style={{ fontFamily: 'var(--font-mono)' }}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
