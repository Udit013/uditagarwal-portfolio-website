import { useState, useEffect, useRef } from "react";
import { MessageCircle, Download, MapPin, Clock, ChevronDown, Github, Linkedin, Mail, Code2, Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Terminal from "./Terminal";

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
    const particleCount = isMobile ? 25 : window.innerWidth < 1024 ? 35 : 50;

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      hue: Math.random() * 60 + 230,
      alpha: Math.random() * 0.4 + 0.25,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let id: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!isMobile) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `hsla(245, 70%, 70%, ${0.08 * (1 - d / 100)})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      particles.forEach((p) => {
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && !isMobile) {
          const force = (120 - dist) / 120;
          p.vx -= (dx / dist) * force * 0.25;
          p.vy -= (dy / dist) * force * 0.25;
        }

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 75%, 68%, ${p.alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        p.hue += 0.2;
        p.vx *= 0.99;
        p.vy *= 0.99;

        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;
        if (p.hue > 290) p.hue = 230;
      });

      id = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [enabled]);

  return canvasRef;
};

const useTypingAnimation = (texts: string[], speed = 95) => {
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
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 45 : speed);
    return () => clearTimeout(timeout);
  }, [displayText, textIndex, isDeleting, texts, speed]);

  return displayText;
};

const SocialLink = ({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-border/60 bg-background/40 backdrop-blur-sm text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-105"
  >
    <Icon className="w-3.5 h-3.5" />
    {label}
  </a>
);

const Hero = () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canvasRef = useParticles(!prefersReducedMotion);
  const [isVisible, setIsVisible] = useState(false);

  const roles = ["Software Engineer", "AI/ML Engineer", "Full-Stack Developer", "Data Engineer"];
  const typingText = useTypingAnimation(roles);

  useEffect(() => {
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
    { icon: Github,   href: "https://github.com/Udit013",      label: "GitHub"   },
    { icon: Linkedin, href: "https://linkedin.com/in/udit013", label: "LinkedIn" },
    { icon: Mail,     href: "mailto:agarwaludit13@gmail.com",   label: "Email"    },
  ];

  const highlights = [
    { icon: Brain, label: "AI / ML",      color: "text-purple-400" },
    { icon: Code2, label: "Full-Stack",   color: "text-cyan-400"   },
    { icon: Zap,   label: "Cloud Native", color: "text-yellow-400" },
  ];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden flex items-center">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none touch-none" />

      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 15% 55%, hsl(250,55%,14%) 0%, transparent 65%)," +
            "radial-gradient(ellipse 45% 40% at 85% 25%, hsl(220,55%,12%) 0%, transparent 60%)",
        }}
      />

      <div
        className={`relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16 sm:py-20 md:py-24 lg:py-32 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-16 items-center">

            {/* ── Left ── */}
            <div className="space-y-5 sm:space-y-6 md:space-y-7">

              {/* Availability badge */}
              <div className={`inline-flex transition-all duration-700 delay-100 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border"
                  style={{
                    background: "hsl(140,45%,9%)",
                    borderColor: "hsl(140,55%,25%)",
                    color: "hsl(140,65%,58%)",
                  }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inset-0 rounded-full bg-green-400 opacity-70" />
                    <span className="relative rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  Available for Full-time · June 2026
                </span>
              </div>

              {/* Name + typing */}
              <div className={`space-y-4 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
                <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary/70">
                  Hi, I'm
                </p>

                {/* Name — inline style avoids descender clipping from gradient-text + leading-none */}
                <h1
                  className=" gradient-text text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
                  style={{
                    lineHeight: 1.15,
                    paddingBottom: "0.1em",
                    background: "linear-gradient(135deg, hsl(270,80%,72%) 0%, hsl(245,75%,65%) 40%, hsl(210,80%,65%) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Udit Agarwal
                </h1>

                {/* Typing row */}
                <div className="flex items-center gap-2.5 h-8 sm:h-10">
                  <span className="w-0.5 h-5 rounded-full bg-primary/60 flex-shrink-0" />
                  <p className="text-base sm:text-xl md:text-2xl font-semibold text-primary/90">
                    {typingText}
                    <span className="inline-block w-0.5 h-4 sm:h-5 bg-primary ml-1 animate-pulse align-middle rounded-full" />
                  </p>
                </div>
              </div>

              {/* Thin rule */}
              <div className={`transition-all duration-700 delay-250 ${isVisible ? "opacity-100" : "opacity-0"}`}>
                <div className="h-px w-14 bg-gradient-to-r from-primary/50 to-transparent" />
              </div>

              {/* Bio */}
              <p className={`text-sm sm:text-base text-muted-foreground max-w-lg leading-relaxed transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
                Building intelligent, scalable systems at the intersection of
                full-stack engineering and applied AI/ML.
              </p>

              {/* Highlight pills */}
              <div className={`flex flex-wrap gap-2 sm:gap-3 transition-all duration-700 delay-350 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                  >
                    <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                    <span className="text-xs sm:text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className={`flex flex-wrap gap-3 sm:gap-4 transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <Button
                  size="lg"
                  onClick={scrollToContact}
                  className="text-sm sm:text-base hover:scale-105 transition-transform shadow-lg shadow-primary/20"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Let's Connect
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleResumeOpen}
                  className="text-sm sm:text-base hover:scale-105 transition-transform hover:border-primary/60"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Resume
                </Button>
              </div>

              {/* Meta row */}
              <div className={`flex flex-wrap gap-4 pt-1 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-primary/70 flex-shrink-0" />
                  Bloomington, IN
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 text-primary/70 flex-shrink-0" />
                  EST (UTC−5)
                </span>
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                  Responds within 24 h
                </span>
              </div>

              {/* Social links */}
              <div className={`flex items-center gap-2.5 transition-all duration-700 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                {socialLinks.map((s) => (
                  <SocialLink key={s.label} href={s.href} label={s.label} icon={s.icon} />
                ))}
              </div>
            </div>

            {/* ── Right — Terminal ── */}
            <div
              className={`max-w-lg w-full mx-auto lg:mx-0 transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ filter: "drop-shadow(0 0 40px hsl(245,55%,25%))" }}
            >
              <Terminal />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-5 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 transition-all duration-700 delay-800 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <span className="text-xs text-muted-foreground tracking-widest uppercase">scroll</span>
          <ChevronDown className="w-5 h-5 text-primary/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;