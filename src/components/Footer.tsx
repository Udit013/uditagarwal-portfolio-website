import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const links = [
    { href: "#about",    label: "About"    },
    { href: "#skills",   label: "Skills"   },
    { href: "#journey",  label: "Journey"  },
    { href: "#projects", label: "Projects" },
    { href: "#contact",  label: "Contact"  },
  ];

  const socials = [
    { href: "mailto:agarwaludit13@gmail.com", icon: Mail,     label: "Email"    },
    { href: "https://linkedin.com/in/udit013", icon: Linkedin, label: "LinkedIn" },
    { href: "https://github.com/Udit013",      icon: Github,   label: "GitHub"   },
  ];

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border/40">
      {/* Top section */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">

          {/* Brand */}
          <div className="space-y-3">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection("#home"); }}
              className="text-xl font-bold gradient-text tracking-tight"
            >
              Udit.dev
            </a>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Software Engineer · MS Computer Science @ Indiana University.
              Building intelligent, scalable systems.
            </p>
            {/* Availability pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium"
              style={{
                background: "hsl(140,45%,9%)",
                borderColor: "hsl(140,55%,22%)",
                color: "hsl(140,60%,55%)",
              }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inset-0 rounded-full bg-green-400 opacity-70" />
                <span className="relative rounded-full h-1.5 w-1.5 bg-green-500" />
              </span>
              Available · June 2026
            </div>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Navigation
            </p>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Connect
            </p>
            <div className="flex flex-col gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group"
                >
                  <s.icon className="w-3.5 h-3.5" />
                  {s.label}
                  {s.href.startsWith("http") && (
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/30">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Udit Agarwal. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with React · TypeScript · Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;