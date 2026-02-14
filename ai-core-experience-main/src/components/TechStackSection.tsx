import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiPython, SiTypescript, SiReact, SiNextdotjs,
  SiNodedotjs, SiTailwindcss, SiOpenai, SiTensorflow, SiPytorch,
  SiDocker, SiMongodb, SiPostgresql, SiGit, SiFigma, SiGooglecloud,
} from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const tech = [
  { icon: SiPython, name: 'Python' }, { icon: SiTypescript, name: 'TypeScript' },
  { icon: SiReact, name: 'React' }, { icon: SiNextdotjs, name: 'Next.js' },
  { icon: SiNodedotjs, name: 'Node.js' }, { icon: SiTailwindcss, name: 'Tailwind' },
  { icon: SiOpenai, name: 'OpenAI' }, { icon: SiTensorflow, name: 'TensorFlow' },
  { icon: SiPytorch, name: 'PyTorch' }, { icon: SiDocker, name: 'Docker' },
  { icon: SiGooglecloud, name: 'GCP' }, { icon: SiMongodb, name: 'MongoDB' },
  { icon: SiPostgresql, name: 'PostgreSQL' }, { icon: SiGit, name: 'Git' },
  { icon: SiFigma, name: 'Figma' },
];

const TechStackSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ts-h', {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none reverse' }
      });
      gsap.from('.ts-icon', {
        y: 25, opacity: 0, scale: 0.85,
        stagger: { each: 0.04, from: 'random' }, duration: 0.5, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.ts-grid', start: 'top 85%', toggleActions: 'play none none reverse' }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref}>
      <span className="ts-h section-label">Stack</span>
      <h2 className="ts-h section-heading">Technologies</h2>
      <div className="ts-grid grid grid-cols-3 sm:grid-cols-5 gap-8 mt-12">
        {tech.map(t => (
          <div key={t.name} className="ts-icon group flex flex-col items-center gap-2.5 cursor-default" data-cursor={t.name}>
            <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_-6px_hsl(190_90%_50%_/_0.3)]"
              style={{ background: 'hsl(220 12% 9%)', border: '1px solid hsl(220 12% 15%)' }}>
              <t.icon className="w-6 h-6 md:w-7 md:h-7 transition-colors duration-300 group-hover:text-[hsl(190,90%,50%)]" style={{ color: 'hsl(215 10% 42%)' }} />
            </div>
            <span className="text-[10px] tracking-[0.1em] uppercase transition-colors duration-300 group-hover:text-[hsl(190,90%,50%)]"
              style={{ color: 'hsl(215 10% 35%)' }}>{t.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStackSection;
