import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.abt-el', {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none reverse' }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref}>
      <span className="abt-el section-label">About</span>
      <h2 className="abt-el section-heading">
        Designing intelligent<br /><span className="text-gradient">systems that matter</span>
      </h2>
      <p className="abt-el section-sub mb-6">
        I work at the intersection of <strong className="text-white font-medium">Generative AI</strong>,{' '}
        <strong className="text-white font-medium">Computer Vision</strong>, and{' '}
        <strong className="text-white font-medium">Scalable Architecture</strong> — turning research into production.
      </p>
      <p className="abt-el text-sm leading-relaxed mb-10" style={{ color: 'hsl(215 10% 38%)' }}>
        B.Tech in AI & ML from Oriental Group of Institutes, Bhopal.
      </p>
      <div className="abt-el flex flex-wrap gap-12 md:gap-16">
        {[{ val: '15+', label: 'Hackathons' }, { val: '3', label: 'Wins' }, { val: '5+', label: 'Projects Shipped' }].map(s => (
          <div key={s.label}>
            <span className="text-3xl md:text-4xl font-bold text-gradient block" style={{ fontFamily: 'var(--font-heading)' }}>{s.val}</span>
            <span className="text-[10px] tracking-[0.18em] uppercase mt-1 block" style={{ color: 'hsl(215 10% 38%)' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
