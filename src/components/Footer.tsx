import { Mail, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-foreground font-bold">Udit Agarwal</p>
            <p className="text-muted-foreground text-sm">AI Engineer & Full-Stack Developer</p>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="mailto:agarwaludit13@gmail.com"
              className="text-muted-foreground hover:text-primary smooth-transition"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/udit013"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary smooth-transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/Udit013"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary smooth-transition"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Udit Agarwal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
