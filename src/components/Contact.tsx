import { useState, useEffect, useRef } from "react";
import { Mail, Linkedin, Github, MapPin, Clock, Send, ArrowUpRight } from "lucide-react";
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
  const [sending, setSending] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const nodes: any[] = [];
    for (let i = 0; i < 25; i++) {
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

        nodes.forEach((other, j) => {
          if (i !== j) {
            const dx = other.x - node.x;
            const dy = other.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 120) {
              ctx.strokeStyle = `rgba(139, 92, 246, ${0.25 * (1 - distance / 120)})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          }
        });

        const pulse = Math.sin(frame * 0.05 + node.pulsePhase) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(139, 92, 246, ${0.5 + pulse * 0.3})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setSending(true);
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany/Organization: ${formData.company || "N/A"}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:agarwaludit13@gmail.com?subject=${subject}&body=${body}`;
    toast.success("Opening your email client...");
    setFormData({ name: "", email: "", company: "", message: "" });
    setSending(false);
  };

  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "agarwaludit13@gmail.com",
      href: "mailto:agarwaludit13@gmail.com",
      external: false,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/udit013",
      href: "https://linkedin.com/in/udit013",
      external: true,
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/Udit013",
      href: "https://github.com/Udit013",
      external: true,
    },
  ];

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Open to full-time roles, research collaborations, and interesting projects.
            Let's talk.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

          {/* ── Left ── */}
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold mb-1.5">Get in Touch</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I'm always open to discussing new opportunities, exciting projects,
                or just having a good conversation about technology.
              </p>
            </div>

            {/* Contact links */}
            <div className="space-y-3">
              {contactLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="glass rounded-xl p-4 flex items-center gap-4 hover-lift group transition-all duration-300"
                >
                  <div className="w-11 h-11 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-sm font-medium text-foreground truncate">
                      {item.value}
                    </div>
                  </div>
                  {item.external && (
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors duration-300 flex-shrink-0" />
                  )}
                </a>
              ))}
            </div>

            {/* Availability */}
            <div className="glass rounded-xl p-5 border border-green-500/25">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inset-0 rounded-full bg-green-400 opacity-70" />
                  <span className="relative rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="text-xs font-semibold text-green-500 uppercase tracking-wider">
                  Availability Status
                </span>
              </div>
              <p className="text-sm text-foreground font-medium">
                Available for Full-time Opportunities starting June 2026
              </p>
            </div>

            {/* Location + timezone + response */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass rounded-xl p-4 flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs text-muted-foreground">Location</div>
                  <div className="text-sm font-semibold">Bloomington, IN</div>
                </div>
              </div>
              <div className="glass rounded-xl p-4 flex items-center gap-3">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs text-muted-foreground">Timezone</div>
                  <div className="text-sm font-semibold">EST (UTC−5)</div>
                </div>
              </div>
            </div>

            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              Usually responds within 24 hours
            </p>
          </div>

          {/* ── Right — Form ── */}
          <div className="glass rounded-xl p-7">
            <h3 className="text-xl font-bold mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="bg-background/50 border-border/60 focus:border-primary/60 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="bg-background/50 border-border/60 focus:border-primary/60 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  Company / Organization
                </label>
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Where do you work? (optional)"
                  className="bg-background/50 border-border/60 focus:border-primary/60 text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                  Message <span className="text-red-400">*</span>
                </label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, opportunity, or just say hello!"
                  className="bg-background/50 border-border/60 focus:border-primary/60 text-sm min-h-36 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={sending}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-primary/20"
                size="lg"
              >
                <Send className="w-4 h-4 mr-2" />
                {sending ? "Opening email..." : "Send Message"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                This will open your email client with the message pre-filled.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;