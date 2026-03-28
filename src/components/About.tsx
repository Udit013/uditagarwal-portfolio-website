import { useEffect, useRef } from "react";
import { BookOpen, Award, Zap, MapPin, GraduationCap } from "lucide-react";

const About = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const nodes: any[] = [];
    for (let i = 0; i < 50; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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
            if (distance < 150) {
              ctx.strokeStyle = `rgba(160, 120, 220, ${0.2 * (1 - distance / 150)})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          }
        });

        ctx.fillStyle = "rgba(160, 120, 220, 0.8)";
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

  const coursework = [
    "Advanced Database Concepts",
    "Applied Algorithms",
    "Applied Machine Learning",
    "Computer Networks",
    "Engineering Cloud Computing",
    "Fundamentals & Applications of LLMs",
    "Software Engineering",
  ];

  const cards = [
    {
      icon: BookOpen,
      title: "Full-Stack Engineering",
      body: "End-to-end systems using React, Next.js, Node.js, and PostgreSQL; from API design to production-ready UIs.",
      tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
    },
    {
      icon: Award,
      title: "AI / ML Research",
      body: "Published IEEE research in medical imaging. Hands-on with transformers, CNNs, NLP pipelines, and LLM APIs.",
      tags: ["TensorFlow", "BERT", "CNNs", "LLM APIs"],
    },
    {
      icon: Zap,
      title: "Data & Analytics",
      body: "ETL pipelines, data modeling, and dashboards that turn structured datasets into decisions.",
      tags: ["ETL Pipelines", "Tableau", "SQL", "Pandas"],
    },
  ];

  return (
    <section id="about" className="relative py-20 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30" />

      <div className="container mx-auto px-4 relative z-10">

        {/* ── Section header ── */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I'm a software engineer and graduate student focused on building intelligent,
            scalable systems; from full-stack applications to applied AI/ML pipelines.
            I care about writing clean, purposeful code and creating solutions that are
            both technically sound and genuinely useful.
          </p>
        </div>

        {/* ── What I do cards ── */}
        <div className="grid md:grid-cols-3 gap-5 mb-20 max-w-4xl mx-auto">
          {cards.map((card) => (
            <div
              key={card.title}
              className="glass rounded-xl p-6 hover-lift group transition-all duration-300 flex flex-col"
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                <card.icon className="w-5 h-5 text-primary" />
              </div>

              {/* Title + body */}
              <h3 className="text-base font-bold text-foreground mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{card.body}</p>

              {/* Divider */}
              <div className="h-px bg-border/50 my-4" />

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Education ── */}
        <div>
          <h3 className="text-3xl font-bold gradient-text mb-10 text-center">Education</h3>

          <div className="space-y-6 max-w-4xl mx-auto">

            {/* Master's */}
            <div className="glass rounded-xl p-7 hover-lift group relative overflow-hidden transition-all duration-300">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/70 rounded-l-xl transition-all duration-300 group-hover:w-2" />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5 pl-2">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
                      Master of Science in Computer Science
                    </h4>
                    <p className="text-primary font-semibold mt-0.5">Indiana University Bloomington</p>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      Bloomington, IN, USA
                    </div>
                  </div>
                </div>
                <div className="pl-16 sm:pl-0 sm:text-right flex-shrink-0">
                  <p className="text-xs text-muted-foreground">Aug 2024 – May 2026</p>
                  <p className="text-green-500 font-black text-xl mt-1">
                    3.82 <span className="text-sm font-normal text-muted-foreground">/ 4.0</span>
                  </p>
                </div>
              </div>

              <div className="pl-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
                  Relevant Coursework
                </p>
                <div className="flex flex-wrap gap-2">
                  {coursework.map((c) => (
                    <span
                      key={c}
                      className="px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-medium hover:bg-primary/20 transition-colors duration-200"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bachelor's — no icon, same GraduationCap style */}
            <div className="glass rounded-xl p-7 hover-lift group relative overflow-hidden transition-all duration-300">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/40 rounded-l-xl transition-all duration-300 group-hover:w-2" />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pl-2">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
                      Bachelor of Technology in Computer Science & Engineering
                    </h4>
                    <p className="text-primary/80 font-semibold mt-0.5">
                      Kalinga Institute of Industrial Technology (KIIT)
                    </p>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      Bhubaneswar, Odisha, India
                    </div>
                  </div>
                </div>
                <div className="pl-16 sm:pl-0 sm:text-right flex-shrink-0">
                  <p className="text-xs text-muted-foreground">Aug 2020 – May 2024</p>
                  <p className="text-green-500 font-black text-xl mt-1">
                    8.85 <span className="text-sm font-normal text-muted-foreground">/ 10.0</span>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;