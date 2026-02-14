import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const recognitions = [
  {
    title: 'NASA Space Apps Challenge', category: 'Winner', year: '2025',
    description: "Global hackathon winner with innovative weather prediction using NASA's Earth observation data and ML.",
    image: '/Nasa space apps challenge.jpeg'
  },
  {
    title: '15+ Hackathons', category: 'Finalist', year: '2024–25',
    description: 'Consistently recognized across 15+ hackathons for innovative AI solutions and technical excellence.',
    image: '/15+ hackathons.jpeg'
  },
  {
    title: '3 Hackathon Wins', category: 'Wins', year: '2024–25',
    description: 'Multiple victories showcasing expertise in AI, full-stack development, and problem-solving.',
    image: '/abc.jpeg'
  },
  {
    title: 'National Level Ideathon', category: 'Winner', year: '2024',
    description: 'First place at national ideathon for innovative tech solutions addressing real-world challenges.',
    image: '/national level ideathon.jpeg'
  },
];

const RecognitionSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.rg-h', {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none reverse' }
      });
      gsap.from('.rg-card', {
        y: 50, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.rg-grid', start: 'top 85%', toggleActions: 'play none none reverse' }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref}>
      <span className="rg-h section-label">Recognition</span>
      <h2 className="rg-h section-heading">Awards & <span className="text-gradient">Wins</span></h2>

      <div className="rg-grid grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {recognitions.map(r => (
          <div key={r.title} className="rg-card card-agency overflow-hidden group">
            <div className="relative overflow-hidden h-48">
              <img src={r.image} alt={r.title} loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,14%,6%)] to-transparent" />
              <span className="absolute top-4 left-4 pill text-[10px] tracking-[0.12em] bg-black/50 backdrop-blur-sm">{r.category}</span>
            </div>
            <div className="p-5 md:p-6">
              <h3 className="text-lg font-semibold tracking-tight mb-2 transition-colors duration-300 group-hover:text-[hsl(190,90%,50%)]"
                style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>{r.title}</h3>
              <p className="text-sm leading-relaxed mb-2" style={{ color: 'hsl(215 10% 42%)' }}>{r.description}</p>
              <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'hsl(215 10% 28%)', fontFamily: 'var(--font-mono)' }}>{r.year}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecognitionSection;
