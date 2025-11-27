import { useState, useEffect, useRef } from "react";
import { MessageCircle, Download, MapPin, Clock, ChevronDown, Github, Linkedin, Mail, Code2, Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Terminal from "./Terminal";

/** Optimized background particle system with mouse interaction */
const useParticles = (enabled: boolean) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 25 : window.innerWidth < 1024 ? 35 : 45;

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      hue: Math.random() * 60 + 230,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let id: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Mouse interaction - particles move away from cursor
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 120 && !isMobile) {
          const force = (120 - dist) / 120;
          p.vx -= (dx / dist) * force * 0.3;
          p.vy -= (dy / dist) * force * 0.3;
        }

        ctx.beginPath();
        ctx.fillStyle = `hsl(${p.hue}, 80%, 65%)`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        p.hue += 0.3;

        // Velocity damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;
        if (p.hue > 290) p.hue = 230;
      });

      id = requestAnimationFrame(animate);
    };

    animate();
    
    const handleResize = () => {
      resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [enabled]);

  return canvasRef;
};

/** Typing animation for dynamic text */
const useTypingAnimation = (texts: string[], speed = 100) => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : speed);

    return () => clearTimeout(timeout);
  }, [displayText, textIndex, isDeleting, texts, speed]);

  return displayText;
};

const Hero = () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canvasRef = useParticles(!prefersReducedMotion);
  const [isVisible, setIsVisible] = useState(false);

  const roles = ["AI Engineer", "Full-Stack Developer", "ML Specialist"];
  const typingText = useTypingAnimation(roles);

  useEffect(() => {
    // Trigger fade-in animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleResumeOpen = () => {
    window.open("/resume.pdf", "_blank");
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/Udit013", label: "GitHub", color: "hover:text-purple-400" },
    { icon: Linkedin, href: "https://linkedin.com/in/udit013", label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: Mail, href: "mailto:agarwaludit13@gmail.com", label: "Email", color: "hover:text-green-400" }
  ];

  const highlights = [
    { icon: Brain, label: "AI/ML Expert", color: "text-purple-400" },
    { icon: Code2, label: "Full-Stack", color: "text-cyan-400" },
    { icon: Zap, label: "Cloud Native", color: "text-yellow-400" }
  ];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden flex items-center">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none touch-none" />

      <div className={`relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-5 sm:space-y-6 md:space-y-7">
              {/* Availability Badge */}
              <div className={`inline-flex transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <span className="glass px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm border border-primary/30 inline-flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="hidden xs:inline">✨ </span>
                  Available for Full-time Roles from May 2026
                </span>
              </div>

              {/* Main Heading */}
              <div className={`space-y-3 sm:space-y-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Hi, I'm <br />
                  <span className="gradient-text">Udit Agarwal</span>
                </h1>

                {/* Typing Animation */}
                <div className="h-8 sm:h-10 md:h-12">
                  <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold text-primary">
                    {typingText}
                    <span className="inline-block w-0.5 h-5 sm:h-6 md:h-7 bg-primary ml-1 animate-pulse align-middle"></span>
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className={`text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                Building intelligent, scalable cloud applications with cutting-edge AI/ML technologies and modern development practices.
              </p>

              {/* Highlight Pills */}
              <div className={`flex flex-wrap gap-2 sm:gap-3 transition-all duration-700 delay-350 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {highlights.map((item) => (
                  <div 
                    key={item.label}
                    className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                  >
                    <item.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${item.color}`} />
                    <span className="text-xs sm:text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className={`flex flex-wrap gap-3 sm:gap-4 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <Button 
                  size="lg" 
                  onClick={scrollToContact}
                  className="text-sm sm:text-base hover:scale-105 transition-transform shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> 
                  <span className="hidden xs:inline">Let's </span>Connect
                </Button>

                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={handleResumeOpen}
                  className="text-sm sm:text-base hover:scale-105 transition-transform"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> Resume
                </Button>
              </div>

              {/* Location Info */}
              <div className={`flex flex-wrap gap-3 sm:gap-4 pt-2 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <span className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" /> 
                  <span>Bloomington, IN</span>
                </span>
                <span className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" /> 
                  <span>EST</span>
                </span>
              </div>

              {/* Social Links */}
              <div className={`flex items-center gap-3 sm:gap-4 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 sm:p-2.5 rounded-lg border border-border hover:border-primary bg-background/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                ))}
              </div>

              {/* Response Time */}
              <p className={`flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0"></span>
                <span>Responds within 24 hours</span>
              </p>
            </div>

            {/* Right Terminal */}
            <div className={`max-w-lg w-full mx-auto lg:mx-0 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <Terminal />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center animate-bounce transition-all duration-700 delay-800 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-xs text-muted-foreground mb-1">Scroll Down</span>
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        </div>
      </div>
    </section>
  );
};

export default Hero;