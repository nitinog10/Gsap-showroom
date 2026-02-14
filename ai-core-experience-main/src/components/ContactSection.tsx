import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiLinkedin, SiGithub } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ct-el', {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none reverse' }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <span className="ct-el section-label">Contact</span>
      <h2 className="ct-el text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-5"
        style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
        Let's build{' '}<span className="text-gradient">the future</span>
      </h2>
      <p className="ct-el section-sub mx-auto mb-10">Got a project in mind? Let's talk.</p>
      <div className="ct-el mb-10">
        <a href="mailto:nitiniszod10@gmail.com" data-cursor="Email"
          className="text-lg md:text-2xl font-medium tracking-tight transition-colors duration-300 hover:text-[hsl(190,90%,50%)]"
          style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
          nitiniszod10@gmail.com
        </a>
      </div>
      <div className="ct-el flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
        <a href="mailto:nitiniszod10@gmail.com" className="btn-glow" data-cursor="Send">Send a Message</a>
        <a href="/Nitin_Kumar_Mishra_AI_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline" data-cursor="PDF">Download Resume</a>
      </div>
      <div className="ct-el flex items-center justify-center gap-4 mb-12">
        <a href="https://www.linkedin.com/in/nitin-kumar-mishra-520615331" target="_blank" rel="noopener noreferrer" className="social-btn" data-cursor="LinkedIn"><SiLinkedin className="w-4 h-4" /></a>
        <a href="https://github.com/nitinog10" target="_blank" rel="noopener noreferrer" className="social-btn" data-cursor="GitHub"><SiGithub className="w-4 h-4" /></a>
      </div>
      <div className="ct-el pt-8 flex flex-col md:flex-row items-center justify-between gap-2" style={{ borderTop: '1px solid hsl(220 12% 11%)' }}>
        <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'hsl(215 10% 26%)' }}>© 2025 Nitin Mishra</span>
        <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'hsl(215 10% 26%)' }}>Bhopal, India</span>
      </div>
    </div>
  );
};

export default ContactSection;
