import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    category: 'Core AI & ML', skills: [
      { name: 'Generative AI', level: 92 }, { name: 'Computer Vision', level: 88 },
      { name: 'NLP & Fine-Tuning', level: 85 }, { name: 'RAG Systems', level: 88 },
    ]
  },
  {
    category: 'Engineering', skills: [
      { name: 'React / Next.js', level: 90 }, { name: 'Node.js / FastAPI', level: 85 },
      { name: 'System Design', level: 82 }, { name: 'Cloud-Native', level: 80 },
    ]
  },
  {
    category: 'Tools', skills: [
      { name: 'PyTorch', level: 85 }, { name: 'Hugging Face', level: 88 },
      { name: 'Docker', level: 75 }, { name: 'Google Cloud', level: 78 },
    ]
  },
];

const techPills = [
  'Python', 'React', 'Next.js', 'FastAPI', 'PyTorch', 'TensorFlow',
  'Docker', 'LangChain', 'OpenAI', 'GSAP', 'Three.js', 'Node.js',
  'MongoDB', 'PostgreSQL', 'Git', 'TypeScript'
];

const SkillsSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sk-el', {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none reverse' }
      });
      gsap.from('.sk-card', {
        y: 50, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.sk-cards', start: 'top 85%', toggleActions: 'play none none reverse' }
      });
      gsap.utils.toArray<HTMLElement>('.sk-bar').forEach(bar => {
        gsap.fromTo(bar, { width: '0%' }, {
          width: `${bar.dataset.level || 0}%`, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: bar.parentElement, start: 'top 90%', toggleActions: 'play none none reverse' }
        });
      });
      gsap.from('.tp', {
        scale: 0.8, opacity: 0, stagger: { each: 0.03, from: 'random' },
        duration: 0.5, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.pill-wrap', start: 'top 90%', toggleActions: 'play none none reverse' }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref}>
      <span className="sk-el section-label">Capabilities</span>
      <h2 className="sk-el section-heading">What I <span className="text-gradient">work with</span></h2>
      <p className="sk-el section-sub mb-12">AI research + full-stack engineering, always production-grade.</p>

      <div className="sk-cards grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {skillGroups.map(g => (
          <div key={g.category} className="sk-card card-agency p-6">
            <h3 className="text-xs font-semibold tracking-[0.12em] uppercase mb-5" style={{ color: 'hsl(190 90% 50%)' }}>{g.category}</h3>
            <div className="space-y-4">
              {g.skills.map(s => (
                <div key={s.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm" style={{ color: 'hsl(210 15% 62%)' }}>{s.name}</span>
                    <span className="text-[10px] font-mono" style={{ color: 'hsl(190 90% 50% / 0.5)' }}>{s.level}%</span>
                  </div>
                  <div className="w-full h-[3px] rounded-full overflow-hidden" style={{ background: 'hsl(220 12% 12%)' }}>
                    <div className="sk-bar h-full rounded-full" data-level={s.level}
                      style={{ width: '0%', background: 'linear-gradient(90deg, hsl(190 90% 50%), hsl(265 85% 58%))' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pill-wrap flex flex-wrap justify-center gap-2.5">
        {techPills.map(t => <span key={t} className="tp pill">{t}</span>)}
      </div>
    </div>
  );
};

export default SkillsSection;
