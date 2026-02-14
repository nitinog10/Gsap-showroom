import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: 'AI Developer', company: 'TechBus', period: 'Bangalore · Remote',
    description: 'Applied AI solutions — designed and implemented AI-driven features with real-world constraints.'
  },
  {
    role: 'AI Developer & Technical Ops', company: 'Haron India', period: 'India',
    description: 'Delivered functional AI prototypes under strict deadlines with industry-oriented workflows.'
  },
  {
    role: 'B.Tech (AI & ML)', company: 'Oriental Group of Institutes', period: '2024 — Present',
    description: 'Bachelor of Technology in Artificial Intelligence & Machine Learning.'
  },
];

const ExperienceSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.exp-h', {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none reverse' }
      });
      gsap.from('.exp-card', {
        y: 50, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.exp-list', start: 'top 85%', toggleActions: 'play none none reverse' }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref}>
      <span className="exp-h section-label">Experience</span>
      <h2 className="exp-h section-heading">Where I've <span className="text-gradient">worked</span></h2>
      <div className="exp-list space-y-5 mt-10">
        {experiences.map((e, i) => (
          <div key={e.company} className="exp-card card-agency p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] font-mono tracking-wider" style={{ color: 'hsl(190 90% 50% / 0.5)' }}>0{i + 1}</span>
                  <h3 className="text-lg font-semibold tracking-tight" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>{e.role}</h3>
                </div>
                <span className="text-sm font-medium block mb-2" style={{ color: 'hsl(190 90% 50%)' }}>{e.company}</span>
                <p className="text-sm leading-relaxed" style={{ color: 'hsl(215 10% 42%)' }}>{e.description}</p>
              </div>
              <span className="text-[10px] tracking-[0.15em] uppercase whitespace-nowrap" style={{ color: 'hsl(215 10% 30%)', fontFamily: 'var(--font-mono)' }}>{e.period}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
