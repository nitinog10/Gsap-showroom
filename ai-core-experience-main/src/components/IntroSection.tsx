import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiLinkedin, SiGithub } from 'react-icons/si';
import { HiDocumentText } from 'react-icons/hi';

gsap.registerPlugin(ScrollTrigger);

const roles = ['GENAI ARCHITECT', 'ML ENGINEER', 'AI DEVELOPER'];

const IntroSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.intro-el', {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none reverse' }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <div className="intro-el mb-8 flex justify-center">
        <div className="relative group">
          <div className="absolute -inset-4 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-700"
            style={{ background: 'radial-gradient(circle, hsl(265 85% 58% / 0.4), hsl(190 90% 50% / 0.1), transparent 70%)', filter: 'blur(25px)' }} />
          <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border border-white/[0.06]">
            <img src="/Nitin.png" alt="Nitin Mishra"
              className="w-full h-full object-cover object-top scale-110 group-hover:scale-125 transition-transform duration-700" />
          </div>
        </div>
      </div>
      <h2 className="intro-el text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
        style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
        NITIN <span className="text-gradient">MISHRA</span>
      </h2>
      <div className="intro-el flex flex-wrap justify-center gap-3 mb-6">
        {roles.map(r => <span key={r} className="pill text-[10px] tracking-[0.15em]">{r}</span>)}
      </div>
      <p className="intro-el section-sub mx-auto mb-8 max-w-lg">
        Passionate developer creating immersive digital experiences.
        Blending technical expertise with creative design.
      </p>
      <div className="intro-el flex items-center justify-center gap-4">
        <a href="https://www.linkedin.com/in/nitin-kumar-mishra-520615331" target="_blank" rel="noopener noreferrer" className="social-btn" data-cursor="LinkedIn"><SiLinkedin className="w-4 h-4" /></a>
        <a href="https://github.com/nitinog10" target="_blank" rel="noopener noreferrer" className="social-btn" data-cursor="GitHub"><SiGithub className="w-4 h-4" /></a>
        <a href="/Nitin_Kumar_Mishra_AI_Resume.pdf" target="_blank" rel="noopener noreferrer" className="social-btn" data-cursor="Resume"><HiDocumentText className="w-4 h-4" /></a>
      </div>
    </div>
  );
};

export default IntroSection;
