import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'BHARATTRIPAI', description: 'Smart AI-based travel companion for India with personalized recommendations and insights.',
    stack: ['AI', 'Travel', 'Python', 'NLP'], image: '/Bharattripai.png', github: 'https://github.com/nitinog10/Beta-20-.git'
  },
  {
    name: 'LEARNING MANAGEMENT SYSTEM', description: 'A comprehensive platform for managing courses, students, and educational content.',
    stack: ['Full Stack', 'Education', 'React'], image: '/learning management system.png', github: 'https://github.com/nitinog10/Learning-management-system.git'
  },
  {
    name: 'CAMPUS MITRA', description: 'RAG-powered AI chat platform for campus assistance using retrieval-augmented generation.',
    stack: ['RAG', 'LLM', 'AI Chat', 'Python'], image: '/campusmitra.png', github: 'https://github.com/nitinog10/Campus-mitra.git'
  },
  {
    name: 'AIRPULSE', description: 'Analyze current AQI of different areas with insights and future predictions.',
    stack: ['Streamlit', 'Python', 'ML', 'Data'], image: '/airpulse.png', github: 'https://github.com/nitinog10/air-pulse.git'
  },
  {
    name: 'ATMOPREDICT', description: 'NASA Space Apps Challenge winning project — weather prediction using historical climate data.',
    stack: ['ML', 'Python', 'Earth Data'], image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80', github: 'https://github.com/nitinog10/AtmoPredict.git'
  },
];

const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pj-h', {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none reverse' }
      });
      gsap.from('.pj-card', {
        y: 50, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.pj-grid', start: 'top 85%', toggleActions: 'play none none reverse' }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref}>
      <span className="pj-h section-label">Work</span>
      <h2 className="pj-h section-heading">Selected <span className="text-gradient">Projects</span></h2>
      <p className="pj-h section-sub mb-12">AI-powered applications built for real-world impact.</p>

      <div className="pj-grid space-y-8">
        {projects.map((p, i) => (
          <a key={p.name} href={p.github} target="_blank" rel="noopener noreferrer"
            className="pj-card card-agency block overflow-hidden group" data-cursor="View">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className={`relative overflow-hidden h-52 md:h-64 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                <img src={p.image} alt={p.name} loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <span className="text-[10px] tracking-[0.2em] uppercase mb-2 font-mono" style={{ color: 'hsl(215 10% 32%)' }}>0{i + 1}</span>
                <h3 className="text-lg md:text-xl font-bold tracking-tight mb-2 transition-colors duration-300 group-hover:text-[hsl(190,90%,50%)]"
                  style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>{p.name}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'hsl(215 10% 42%)' }}>{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.stack.map(t => <span key={t} className="pill text-[10px]">{t}</span>)}
                </div>
                <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 group-hover:text-[hsl(190,90%,50%)]"
                  style={{ color: 'hsl(215 10% 32%)' }}>
                  <span>View on GitHub</span>
                  <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
