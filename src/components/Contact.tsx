import { useState, useEffect, useRef } from "react";
import { Mail, Phone, Linkedin, Github, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Network topology animation
    const nodes: any[] = [];
    const numNodes = 25;

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 3 + 2,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    let animationFrameId: number;
    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw connections
        nodes.forEach((other, j) => {
          if (i !== j) {
            const dx = other.x - node.x;
            const dy = other.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              ctx.strokeStyle = `rgba(139, 92, 246, ${0.3 * (1 - distance / 120)})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          }
        });

        // Draw node with pulse
        const pulse = Math.sin(frame * 0.05 + node.pulsePhase) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(139, 92, 246, ${0.6 + pulse * 0.4})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw pulse ring
        if (frame % 60 === Math.floor(node.pulsePhase * 10)) {
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.4 * (1 - pulse)})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + pulse * 20, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Create mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany/Organization: ${formData.company || "N/A"}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:agarwaludit13@gmail.com?subject=${subject}&body=${body}`;
    
    toast.success("Opening your email client...");
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to build something amazing together? Let's discuss opportunities and collaborations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left side - Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
              <p className="text-muted-foreground mb-6">
                I'm always open to discussing new opportunities, exciting projects, or just having a great conversation about technology and innovation.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:agarwaludit13@gmail.com"
                className="glass rounded-lg p-4 flex items-center space-x-4 hover-lift group"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 smooth-transition">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <div className="text-sm text-muted-foreground">agarwaludit13@gmail.com</div>
                </div>
              </a>

              <a
                href="tel:+19309044901"
                className="glass rounded-lg p-4 flex items-center space-x-4 hover-lift group"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 smooth-transition">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="text-sm text-muted-foreground">+1 (930) 904-4901</div>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/udit013"
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-lg p-4 flex items-center space-x-4 hover-lift group"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 smooth-transition">
                  <Linkedin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">LinkedIn</div>
                  <div className="text-sm text-muted-foreground">linkedin.com/in/udit013</div>
                </div>
              </a>

              <a
                href="https://github.com/Udit013"
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-lg p-4 flex items-center space-x-4 hover-lift group"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 smooth-transition">
                  <Github className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">GitHub</div>
                  <div className="text-sm text-muted-foreground">github.com/Udit013</div>
                </div>
              </a>
            </div>

            <div className="glass rounded-lg p-6 border-2 border-green-500/30">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h4 className="font-semibold text-green-500">Availability Status</h4>
              </div>
              <p className="text-foreground">Available for Full-time Opportunities starting May 2026</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-lg p-4 text-center">
                <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-semibold">Bloomington, IN, USA</div>
              </div>
              <div className="glass rounded-lg p-4 text-center">
                <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-sm font-semibold">EST</div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground pt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Usually responds within 24 hours</span>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div className="glass rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="bg-background border-border"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Company / Organization</label>
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Your company or organization"
                  className="bg-background border-border"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Message <span className="text-red-500">*</span>
                </label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, opportunity, or just say hello!"
                  className="bg-background border-border min-h-32"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
