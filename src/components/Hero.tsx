import { useEffect, useRef, useState } from "react";
import { MessageCircle, Download, MapPin, Clock, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Terminal from "./Terminal";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 3D Shapes
    const shapes: any[] = [];
    const numShapes = 15;

    for (let i = 0; i < numShapes; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 40 + 20,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        type: Math.random() > 0.5 ? "cube" : "pyramid",
        color: `hsl(${250 + Math.random() * 30}, 80%, ${60 + Math.random() * 20}%)`,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    // Particles
    const particles: any[] = [];
    const numParticles = 50;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        hue: Math.random() * 60 + 230,
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw shapes
      shapes.forEach((shape) => {
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);
        ctx.globalAlpha = shape.opacity;

        if (shape.type === "cube") {
          // Draw 3D-ish cube
          ctx.fillStyle = shape.color;
          ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
          ctx.fillStyle = `hsl(${250 + Math.random() * 30}, 60%, 40%)`;
          ctx.beginPath();
          ctx.moveTo(shape.size / 2, -shape.size / 2);
          ctx.lineTo(shape.size / 2 + shape.size / 4, -shape.size / 2 - shape.size / 4);
          ctx.lineTo(shape.size / 2 + shape.size / 4, shape.size / 2 - shape.size / 4);
          ctx.lineTo(shape.size / 2, shape.size / 2);
          ctx.closePath();
          ctx.fill();
        } else {
          // Draw pyramid
          ctx.fillStyle = shape.color;
          ctx.beginPath();
          ctx.moveTo(0, -shape.size / 2);
          ctx.lineTo(shape.size / 2, shape.size / 2);
          ctx.lineTo(-shape.size / 2, shape.size / 2);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
        shape.rotation += shape.rotationSpeed;
      });

      // Draw particles
      particles.forEach((particle) => {
        ctx.fillStyle = `hsl(${particle.hue}, 80%, 60%)`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        particle.hue += 0.5;
        if (particle.hue > 290) particle.hue = 230;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-6 animate-fadeIn">
            <div className="inline-block glass px-4 py-2 rounded-full text-sm text-primary border border-primary/30">
              ✨ Available for Full-time Opportunities starting May 2026
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold">
              Hi, I'm <br />
              <span className="gradient-text">Udit Agarwal</span>
            </h1>
            
            <div className="flex items-center space-x-3 text-xl md:text-2xl text-muted-foreground">
              <span className="text-primary">{"<>"}</span>
              <span>AI Engineer & Full-Stack Developer</span>
            </div>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              Building intelligent systems, scalable applications, and cloud-native solutions
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={scrollToContact}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Let's Connect
              </Button>
              <Button
                onClick={() => window.open("/resume.docx", "_blank")}
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Bloomington, IN, USA</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                <span>EST</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground pt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Usually responds within 24 hours</span>
            </div>
          </div>

          {/* Right side - Terminal */}
          <div className="animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            <Terminal />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm text-muted-foreground">Scroll Down</span>
            <ChevronDown className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
