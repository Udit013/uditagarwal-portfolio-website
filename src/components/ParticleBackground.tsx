import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  connectionDistance?: number;
  mouseInteractionRadius?: number;
  enablePulse?: boolean;
  enableGlow?: boolean;
  colorScheme?: 'purple' | 'blue' | 'cyan' | 'rainbow';
  opacity?: number;
}

const ParticleBackground = ({
  particleCount = 80,
  connectionDistance = 120,
  mouseInteractionRadius = 150,
  enablePulse = true,
  enableGlow = true,
  colorScheme = 'purple',
  opacity = 0.5,
}: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // High DPI support
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();

    // Adjust particle count based on device
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;
    const adjustedCount = isMobile ? Math.floor(particleCount * 0.4) : isTablet ? Math.floor(particleCount * 0.6) : particleCount;

    // Color schemes
    const colorSchemes = {
      purple: { hueMin: 260, hueMax: 300 },
      blue: { hueMin: 200, hueMax: 240 },
      cyan: { hueMin: 170, hueMax: 210 },
      rainbow: { hueMin: 0, hueMax: 360 },
    };

    const selectedScheme = colorSchemes[colorScheme];
    const particles: Particle[] = [];

    // Initialize particles
    for (let i = 0; i < adjustedCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        hue: Math.random() * (selectedScheme.hueMax - selectedScheme.hueMin) + selectedScheme.hueMin,
        alpha: Math.random() * 0.3 + 0.5,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let animationFrameId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let time = 0;

    // Mouse tracking with throttling
    let lastMouseUpdate = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMouseUpdate > 16) { // ~60fps throttle
        mouseX = e.clientX;
        mouseY = e.clientY;
        lastMouseUpdate = now;
      }
    };

    // Touch support
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseX = touch.clientX;
        mouseY = touch.clientY;
      }
    };

    const handleTouchEnd = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      particles.forEach((particle, i) => {
        // Pulse effect
        if (enablePulse) {
          particle.pulsePhase += particle.pulseSpeed;
          const pulseScale = 1 + Math.sin(particle.pulsePhase) * 0.3;
          particle.radius = (Math.random() * 2 + 1) * pulseScale;
        }

        // Mouse interaction with smooth repulsion
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseInteractionRadius) {
          const force = (mouseInteractionRadius - distance) / mouseInteractionRadius;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * force * 0.3;
          particle.vy -= Math.sin(angle) * force * 0.3;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary handling with smooth wrap-around
        if (particle.x < -10) particle.x = window.innerWidth + 10;
        if (particle.x > window.innerWidth + 10) particle.x = -10;
        if (particle.y < -10) particle.y = window.innerHeight + 10;
        if (particle.y > window.innerHeight + 10) particle.y = -10;

        // Velocity damping
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Subtle drift to prevent stagnation
        particle.vx += (Math.random() - 0.5) * 0.01;
        particle.vy += (Math.random() - 0.5) * 0.01;

        // Hue shift for rainbow effect
        if (colorScheme === 'rainbow') {
          particle.hue = (particle.hue + 0.2) % 360;
        }

        // Draw connections first (behind particles)
        particles.forEach((other, j) => {
          if (i < j) { // Avoid duplicate lines
            const dx2 = other.x - particle.x;
            const dy2 = other.y - particle.y;
            const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);

            if (dist < connectionDistance) {
              const lineAlpha = (1 - dist / connectionDistance) * 0.2 * opacity;
              const avgHue = (particle.hue + other.hue) / 2;
              
              ctx.beginPath();
              ctx.strokeStyle = `hsla(${avgHue}, 80%, 60%, ${lineAlpha})`;
              ctx.lineWidth = 0.8;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          }
        });

        // Draw particle with glow effect
        if (enableGlow) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = `hsl(${particle.hue}, 80%, 60%)`;
        }

        ctx.fillStyle = `hsla(${particle.hue}, 80%, 65%, ${particle.alpha * opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        // Reset shadow
        if (enableGlow) {
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      resize();
      // Reposition particles that are now out of bounds
      particles.forEach(particle => {
        if (particle.x > window.innerWidth) particle.x = window.innerWidth;
        if (particle.y > window.innerHeight) particle.y = window.innerHeight;
      });
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animate();
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [particleCount, connectionDistance, mouseInteractionRadius, enablePulse, enableGlow, colorScheme, opacity]);

  if (!isVisible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: "transparent",
        opacity: opacity,
      }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;