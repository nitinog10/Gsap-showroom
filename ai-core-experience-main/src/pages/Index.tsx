import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiLinkedin, SiGithub } from 'react-icons/si';
import { HiDocumentText } from 'react-icons/hi';
import {
  SiPython, SiTypescript, SiReact, SiNextdotjs,
  SiNodedotjs, SiTailwindcss, SiOpenai, SiTensorflow, SiPytorch,
  SiDocker, SiMongodb, SiPostgresql, SiGit, SiFigma, SiGooglecloud,
} from 'react-icons/si';
import Navbar from '@/components/Navbar';
import NoiseOverlay from '@/components/NoiseOverlay';
import ScrollProgress from '@/components/ScrollProgress';
import MagneticCursor from '@/components/MagneticCursor';
import Starfield from '@/components/Starfield';
import HeroSection from '@/components/HeroSection';

gsap.registerPlugin(ScrollTrigger);

/* ─── All card data ──────────────────────────────────────────── */

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

const projects = [
  { name: 'BHARATTRIPAI', desc: 'Smart AI-based travel companion for India.', stack: ['AI', 'Python', 'NLP'], image: '/Bharattripai.png', link: 'https://github.com/nitinog10/Beta-20-.git' },
  { name: 'LEARNING MANAGEMENT SYSTEM', desc: 'Platform for managing courses and educational content.', stack: ['Full Stack', 'React'], image: '/learning management system.png', link: 'https://github.com/nitinog10/Learning-management-system.git' },
  { name: 'CAMPUS MITRA', desc: 'RAG-powered AI chat for campus assistance.', stack: ['RAG', 'LLM', 'Python'], image: '/campusmitra.png', link: 'https://github.com/nitinog10/Campus-mitra.git' },
  { name: 'AIRPULSE', desc: 'Analyze AQI with insights and predictions.', stack: ['Streamlit', 'ML'], image: '/airpulse.png', link: 'https://github.com/nitinog10/air-pulse.git' },
  { name: 'ATMOPREDICT', desc: 'NASA Space Apps Challenge winner — weather prediction.', stack: ['ML', 'Earth Data'], image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80', link: 'https://github.com/nitinog10/AtmoPredict.git' },
];

const achievements = [
  { title: 'NASA Space Apps Challenge', badge: 'Winner', year: '2025', desc: "Global hackathon winner — weather prediction using NASA's Earth data and ML.", image: '/Nasa space apps challenge.jpeg' },
  { title: '15+ Hackathons', badge: 'Finalist', year: '2024–25', desc: 'Consistently recognized across 15+ hackathons for AI solutions.', image: '/15+ hackathons.jpeg' },
  { title: '3 Hackathon Wins', badge: 'Wins', year: '2024–25', desc: 'Multiple victories in AI, full-stack, and problem-solving.', image: '/abc.jpeg' },
  { title: 'National Level Ideathon', badge: 'Winner', year: '2024', desc: 'First place for innovative tech solutions.', image: '/national level ideathon.jpeg' },
];

const experiences = [
  { role: 'AI Developer', company: 'TechBus', period: 'Bangalore · Remote', desc: 'Applied AI solutions with real-world constraints.' },
  { role: 'AI Developer & Technical Ops', company: 'Haron India', period: 'India', desc: 'Delivered AI prototypes under strict deadlines.' },
  { role: 'B.Tech (AI & ML)', company: 'Oriental Group of Institutes', period: '2024 — Present', desc: 'AI & Machine Learning.' },
];

/* ─── Card renderers ─────────────────────────────────────────── */

const IntroCard = () => (
  <div className="text-center">
    <div className="card-el mb-6 flex justify-center">
      <div className="relative group">
        <div className="absolute -inset-4 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, hsl(265 85% 58% / 0.4), transparent 70%)', filter: 'blur(25px)' }} />
        <div className="relative w-28 h-28 rounded-full overflow-hidden border border-white/[0.06]">
          <img src="/Nitin.png" alt="Nitin" className="w-full h-full object-cover object-top" />
        </div>
      </div>
    </div>
    <h2 className="card-el text-3xl md:text-5xl font-bold tracking-tight mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>NITIN <span className="text-gradient">MISHRA</span></h2>
    <div className="card-el flex flex-wrap justify-center gap-2 mb-5">
      {['GENAI ARCHITECT', 'ML ENGINEER', 'AI DEVELOPER'].map(r => <span key={r} className="pill text-[10px]">{r}</span>)}
    </div>
    <p className="card-el text-sm mb-6 max-w-sm mx-auto" style={{ color: 'hsl(215 10% 42%)' }}>Passionate developer creating immersive digital experiences at the intersection of AI and design.</p>
    <div className="card-el flex items-center justify-center gap-3">
      <a href="https://www.linkedin.com/in/nitin-kumar-mishra-520615331" target="_blank" rel="noopener noreferrer" className="social-btn" data-cursor="LinkedIn"><SiLinkedin className="w-4 h-4" /></a>
      <a href="https://github.com/nitinog10" target="_blank" rel="noopener noreferrer" className="social-btn" data-cursor="GitHub"><SiGithub className="w-4 h-4" /></a>
      <a href="/Nitin_Kumar_Mishra_AI_Resume.pdf" target="_blank" rel="noopener noreferrer" className="social-btn" data-cursor="Resume"><HiDocumentText className="w-4 h-4" /></a>
    </div>
  </div>
);

const AboutCard = () => (
  <div>
    <span className="card-el section-label">About</span>
    <h2 className="card-el text-2xl md:text-4xl font-bold tracking-tight mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>Designing <span className="text-gradient">intelligent systems</span></h2>
    <p className="card-el text-sm leading-relaxed mb-6" style={{ color: 'hsl(215 10% 42%)' }}>
      I work at the intersection of <strong className="text-white">Generative AI</strong>, <strong className="text-white">Computer Vision</strong>, and <strong className="text-white">Scalable Architecture</strong>.
    </p>
    <div className="card-el flex gap-10">
      {[{ v: '15+', l: 'Hackathons' }, { v: '3', l: 'Wins' }, { v: '5+', l: 'Shipped' }].map(s => (
        <div key={s.l}><span className="text-2xl md:text-3xl font-bold text-gradient block">{s.v}</span><span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: 'hsl(215 10% 38%)' }}>{s.l}</span></div>
      ))}
    </div>
  </div>
);

const SkillsCard = () => (
  <div>
    <span className="card-el section-label">Skills</span>
    <h2 className="card-el text-2xl md:text-3xl font-bold tracking-tight mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>What I <span className="text-gradient">work with</span></h2>
    <div className="card-el grid grid-cols-2 gap-x-8 gap-y-3 mb-6">
      {[
        { n: 'Generative AI', l: 92 }, { n: 'Computer Vision', l: 88 },
        { n: 'NLP & Fine-Tuning', l: 85 }, { n: 'RAG Systems', l: 88 },
        { n: 'React / Next.js', l: 90 }, { n: 'Node.js / FastAPI', l: 85 },
        { n: 'System Design', l: 82 }, { n: 'PyTorch', l: 85 },
      ].map(s => (
        <div key={s.n}>
          <div className="flex justify-between mb-1"><span className="text-xs" style={{ color: 'hsl(210 15% 55%)' }}>{s.n}</span><span className="text-[9px] font-mono" style={{ color: 'hsl(190 90% 50% / 0.4)' }}>{s.l}%</span></div>
          <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'hsl(220 12% 12%)' }}>
            <div className="h-full rounded-full" style={{ width: `${s.l}%`, background: 'linear-gradient(90deg, hsl(190 90% 50%), hsl(265 85% 58%))' }} />
          </div>
        </div>
      ))}
    </div>
    <div className="card-el flex flex-wrap gap-2">
      {['Python', 'React', 'FastAPI', 'PyTorch', 'Docker', 'LangChain', 'TypeScript', 'Three.js'].map(t => <span key={t} className="pill text-[9px]">{t}</span>)}
    </div>
  </div>
);

const TechCard = () => (
  <div>
    <span className="card-el section-label">Stack</span>
    <h2 className="card-el text-2xl md:text-3xl font-bold tracking-tight mb-8" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>Technologies</h2>
    <div className="card-el grid grid-cols-5 gap-6">
      {tech.map(t => (
        <div key={t.name} className="group flex flex-col items-center gap-2" data-cursor={t.name}>
          <div className="w-11 h-11 flex items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110" style={{ background: 'hsl(220 12% 9%)', border: '1px solid hsl(220 12% 15%)' }}>
            <t.icon className="w-5 h-5 transition-colors group-hover:text-[hsl(190,90%,50%)]" style={{ color: 'hsl(215 10% 42%)' }} />
          </div>
          <span className="text-[9px] tracking-wider uppercase" style={{ color: 'hsl(215 10% 35%)' }}>{t.name}</span>
        </div>
      ))}
    </div>
  </div>
);

const ProjectCard = ({ p, i }: { p: typeof projects[0]; i: number }) => (
  <a href={p.link} target="_blank" rel="noopener noreferrer" className="block group" data-cursor="View">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full">
      <div className={`card-el relative overflow-hidden h-44 md:h-full min-h-[200px] ${i % 2 === 1 ? 'md:order-2' : ''}`}>
        <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      <div className="p-6 flex flex-col justify-center">
        <span className="card-el text-[10px] tracking-[0.2em] uppercase mb-2 font-mono" style={{ color: 'hsl(215 10% 30%)' }}>Project 0{i + 1}</span>
        <h3 className="card-el text-lg font-bold tracking-tight mb-2 group-hover:text-[hsl(190,90%,50%)] transition-colors" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>{p.name}</h3>
        <p className="card-el text-sm mb-3" style={{ color: 'hsl(215 10% 42%)' }}>{p.desc}</p>
        <div className="card-el flex flex-wrap gap-2">{p.stack.map(t => <span key={t} className="pill text-[9px]">{t}</span>)}</div>
      </div>
    </div>
  </a>
);

const AchievementCard = ({ a }: { a: typeof achievements[0] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full">
    <div className="card-el relative overflow-hidden h-44 md:h-full min-h-[200px]">
      <img src={a.image} alt={a.title} loading="lazy" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <span className="absolute top-3 left-3 pill text-[9px] bg-black/50 backdrop-blur-sm">{a.badge}</span>
    </div>
    <div className="p-6 flex flex-col justify-center">
      <h3 className="card-el text-lg font-bold tracking-tight mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>{a.title}</h3>
      <p className="card-el text-sm mb-3" style={{ color: 'hsl(215 10% 42%)' }}>{a.desc}</p>
      <span className="card-el text-[10px] tracking-[0.2em] uppercase font-mono" style={{ color: 'hsl(215 10% 28%)' }}>{a.year}</span>
    </div>
  </div>
);

const ExperienceCard = () => (
  <div>
    <span className="card-el section-label">Experience</span>
    <h2 className="card-el text-2xl md:text-3xl font-bold tracking-tight mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>Where I've <span className="text-gradient">worked</span></h2>
    <div className="space-y-4">
      {experiences.map((e, i) => (
        <div key={e.company} className="card-el p-4 rounded-xl" style={{ background: 'hsl(220 12% 8%)', border: '1px solid hsl(220 12% 13%)' }}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono" style={{ color: 'hsl(190 90% 50% / 0.5)' }}>0{i + 1}</span>
                <h3 className="text-sm font-semibold" style={{ color: 'white' }}>{e.role}</h3>
              </div>
              <span className="text-xs block mb-1" style={{ color: 'hsl(190 90% 50%)' }}>{e.company}</span>
              <p className="text-xs" style={{ color: 'hsl(215 10% 42%)' }}>{e.desc}</p>
            </div>
            <span className="text-[9px] tracking-wider uppercase whitespace-nowrap font-mono" style={{ color: 'hsl(215 10% 28%)' }}>{e.period}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ContactCard = () => (
  <div className="text-center">
    <span className="card-el section-label">Contact</span>
    <h2 className="card-el text-2xl md:text-4xl font-bold tracking-tight mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>Let's build <span className="text-gradient">the future</span></h2>
    <p className="card-el text-sm mb-6" style={{ color: 'hsl(215 10% 42%)' }}>Got a project in mind? Let's talk.</p>
    <a href="mailto:nitiniszod10@gmail.com" data-cursor="Email" className="card-el text-lg md:text-xl font-medium transition-colors hover:text-[hsl(190,90%,50%)] block mb-6" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>nitiniszod10@gmail.com</a>
    <div className="card-el flex gap-3 justify-center mb-6">
      <a href="mailto:nitiniszod10@gmail.com" className="btn-glow text-sm" data-cursor="Send">Send Message</a>
      <a href="/Nitin_Kumar_Mishra_AI_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline text-sm" data-cursor="PDF">Resume</a>
    </div>
    <div className="card-el flex justify-center gap-3">
      <a href="https://www.linkedin.com/in/nitin-kumar-mishra-520615331" target="_blank" rel="noopener noreferrer" className="social-btn" data-cursor="LinkedIn"><SiLinkedin className="w-4 h-4" /></a>
      <a href="https://github.com/nitinog10" target="_blank" rel="noopener noreferrer" className="social-btn" data-cursor="GitHub"><SiGithub className="w-4 h-4" /></a>
    </div>
  </div>
);

/* ─── Card definitions with zig-zag alignment ────────────────── */

type CardDef = {
  id: string;
  label: string;
  render: () => JSX.Element;
};

const cards: CardDef[] = [
  { id: 'intro', label: '01 · INTRO', render: () => <IntroCard /> },
  { id: 'about', label: '02 · ABOUT', render: () => <AboutCard /> },
  { id: 'skills', label: '03 · SKILLS', render: () => <SkillsCard /> },
  { id: 'tech', label: '04 · TECH STACK', render: () => <TechCard /> },
  // Individual achievements
  ...achievements.map((a, i) => ({
    id: `ach-${i}`,
    label: `05.${i + 1} · ${a.badge.toUpperCase()}`,
    render: () => <AchievementCard a={a} />,
  })),
  { id: 'exp', label: '06 · EXPERIENCE', render: () => <ExperienceCard /> },
  // Individual projects
  ...projects.map((p, i) => ({
    id: `proj-${i}`,
    label: `07.${i + 1} · PROJECT`,
    render: () => <ProjectCard p={p} i={i} />,
  })),
  { id: 'contact', label: '08 · CONTACT', render: () => <ContactCard /> },
];

/* ─── Main Page ──────────────────────────────────────────────── */

const Index = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'NITIN MISHRA — AI DEVELOPER';

    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // @ts-ignore
      smoothWheel: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray<HTMLElement>('.flight-card');
      const total = cardEls.length;
      const cardBodies = cardEls.map(el => el.querySelector('.card-agency'));

      // ── Initial state: all cards deep in space, invisible ──
      cardEls.forEach((el, i) => {
        const isLeft = i % 2 === 0;
        gsap.set(el, {
          position: 'absolute',
          top: '50%',
          yPercent: -50,
          left: isLeft ? '5%' : 'auto',
          right: !isLeft ? '5%' : 'auto',
          zIndex: total - i,
          opacity: 0,
          scale: 0.2,
          z: -900,
          rotateY: isLeft ? -18 : 18,
          rotateX: 6,
          filter: 'blur(12px)',
        });

        // Inner elements: deeply hidden
        const innerEls = el.querySelectorAll('.card-el');
        gsap.set(innerEls, {
          y: 50,
          opacity: 0,
          rotateX: -12,
          scale: 0.92,
          filter: 'blur(4px)',
        });
      });

      // ── First card: already visible, content assembled ──
      gsap.set(cardEls[0], {
        opacity: 1, scale: 1, z: 0,
        rotateY: 0, rotateX: 0, filter: 'blur(0px)',
      });
      const firstInner = cardEls[0].querySelectorAll('.card-el');
      gsap.set(firstInner, {
        y: 0, opacity: 1, rotateX: 0, scale: 1, filter: 'blur(0px)',
      });

      // ── Second card peeking in distance ──
      if (cardEls[1]) {
        const isLeft = 1 % 2 === 0;
        gsap.set(cardEls[1], {
          opacity: 0.15, scale: 0.6, z: -500,
          rotateY: isLeft ? -8 : 8, rotateX: 3,
          filter: 'blur(6px)',
        });
      }

      // ── Master timeline ──
      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: `+=${total * 130}%`,
          scrub: 1.2,
          pin: pinnedRef.current,
          anticipatePin: 1,
        }
      });

      for (let i = 0; i < total; i++) {
        const pos = i / total;
        const seg = 1 / total;
        const innerEls = cardEls[i].querySelectorAll('.card-el');
        const isLeft = i % 2 === 0;
        const body = cardBodies[i];

        if (i > 0) {
          // ═══ PHASE 1: Approach from deep space (0% → 25%) ═══
          // Card starts far away, rotated, blurred — drifts closer
          masterTL.to(cardEls[i], {
            z: -200,
            scale: 0.65,
            opacity: 0.6,
            rotateY: isLeft ? -8 : 8,
            rotateX: 3,
            filter: 'blur(4px)',
            duration: seg * 0.25,
            ease: 'power1.out',
          }, pos);

          // ═══ PHASE 2: Final approach + landing (25% → 50%) ═══
          // Card snaps to center — rotation unwinds, blur clears,
          // slight back.out overshoot for that satisfying "land"
          masterTL.to(cardEls[i], {
            z: 0,
            scale: 1,
            opacity: 1,
            rotateY: 0,
            rotateX: 0,
            filter: 'blur(0px)',
            duration: seg * 0.25,
            ease: 'back.out(1.4)',
          }, pos + seg * 0.25);

          // ═══ PHASE 2b: Landing glow flash ═══
          // Card border briefly pulses with cyan glow on arrival
          if (body) {
            masterTL.fromTo(body, {
              boxShadow: '0 0 0px 0px hsl(190 90% 50% / 0)',
            }, {
              boxShadow: '0 0 40px 4px hsl(190 90% 50% / 0.15)',
              duration: seg * 0.1,
              ease: 'power2.out',
            }, pos + seg * 0.45);
            masterTL.to(body, {
              boxShadow: '0 0 0px 0px hsl(190 90% 50% / 0)',
              duration: seg * 0.12,
              ease: 'power2.in',
            }, pos + seg * 0.55);
          }

          // ═══ PHASE 3: Content cascade (30% → 55%) ═══
          // Each inner element slides up with perspective tilt,
          // de-blurs, and scales to 1 — staggered for cascade feel
          if (innerEls.length > 0) {
            masterTL.to(innerEls, {
              y: 0,
              opacity: 1,
              rotateX: 0,
              scale: 1,
              filter: 'blur(0px)',
              stagger: seg * 0.02,
              duration: seg * 0.22,
              ease: 'power4.out',
            }, pos + seg * 0.32);
          }
        }

        // ═══ EXIT ANIMATION ═══
        if (i < total - 1) {
          // Next card: drift into peek position
          const nextIsLeft = (i + 1) % 2 === 0;
          masterTL.to(cardEls[i + 1], {
            opacity: 0.15, scale: 0.6, z: -500,
            rotateY: nextIsLeft ? -8 : 8, rotateX: 3,
            filter: 'blur(6px)',
            duration: seg * 0.2,
            ease: 'power2.out',
          }, pos + seg * 0.35);

          // Inner content: slides up and fades before exit
          if (innerEls.length > 0) {
            masterTL.to(innerEls, {
              y: -25,
              opacity: 0,
              rotateX: 8,
              scale: 0.95,
              filter: 'blur(2px)',
              stagger: seg * 0.008,
              duration: seg * 0.15,
              ease: 'power2.in',
            }, pos + seg * 0.6);
          }

          // Card warps past the viewer — dramatic exit
          masterTL.to(cardEls[i], {
            opacity: 0,
            scale: 1.5,
            z: 500,
            rotateY: isLeft ? 12 : -12,
            rotateX: -4,
            filter: 'blur(8px)',
            duration: seg * 0.25,
            ease: 'power3.in',
          }, pos + seg * 0.75);
        }
      }
    }, wrapperRef);

    const t = setTimeout(() => ScrollTrigger.refresh(), 600);
    let rt: ReturnType<typeof setTimeout>;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(() => ScrollTrigger.refresh(), 250); };
    window.addEventListener('resize', onResize);

    return () => { ctx.revert(); lenis.destroy(); clearTimeout(t); clearTimeout(rt); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <main className="relative text-foreground scrollbar-hide" style={{ fontFamily: 'var(--font-sans)' }}>
      <Starfield />
      <NoiseOverlay />
      <Navbar />
      <MagneticCursor />
      <ScrollProgress />

      {/* Hero — normal flow */}
      <HeroSection />

      {/* Spaceship card tunnel */}
      <div ref={wrapperRef}>
        <div
          ref={pinnedRef}
          className="relative w-full h-screen overflow-hidden"
          style={{ perspective: '1000px', perspectiveOrigin: '50% 50%' }}
        >
          {cards.map(({ id, label, render }) => (
            <div
              key={id}
              id={id}
              className="flight-card will-change-transform"
              style={{
                transformStyle: 'preserve-3d',
                width: 'min(90vw, 640px)',
              }}
            >
              {/* Station label */}
              <div className="mb-3">
                <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: 'hsl(190 90% 50% / 0.35)', fontFamily: 'var(--font-mono)' }}>{label}</span>
              </div>
              {/* Card body */}
              <div className="card-agency overflow-hidden">
                <div className="p-5 md:p-7">
                  {render()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Index;
