import { useState, useEffect, useRef } from "react";
import { ExternalLink, Github, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  title: string;
  description: string;
  tags: string[];
  category: string;
  achievements: string[];
  metrics?: { label: string; value: string }[];
  publication?: string;
  github?: string;
  status?: "live" | "in-progress";
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const projects: Project[] = [
    // ── Full-Stack ──────────────────────────────────────────────────
    {
      title: "AI Mock Interview Platform",
      description:
        "Full-stack AI platform that simulates real-time interview scenarios using voice agents and LLM APIs for dynamic Q&A and structured feedback",
      tags: ["Next.js", "TypeScript", "Node.js", "Firebase", "Vapi AI", "Gemini API"],
      category: "Full-Stack",
      achievements: [
        "Built backend workflows for dynamic question generation and structured feedback evaluation",
        "Integrated Vapi AI voice agents for natural real-time conversation flow",
        "Developed data pipelines to capture user responses and generate performance insights",
      ],
      github: "https://github.com/Udit013",
    },
    {
      title: "Screen Recording & Video Sharing Platform",
      description:
        "Serverless platform for screen recording, video uploads, and secure sharing with AI-generated transcripts and CDN-based media delivery",
      tags: ["Next.js", "TypeScript", "Bunny.net", "Better Auth", "Xata", "Arcjet", "Drizzle ORM"],
      category: "Full-Stack",
      achievements: [
        "Implemented scalable backend architecture with CDN-based media delivery via Bunny.net",
        "Designed authentication, privacy controls, and AI transcript generation features",
        "Secured platform using Arcjet for advanced rate limiting and bot protection",
      ],
      github: "https://github.com/Udit013",
    },
    {
      title: "Automated Secrets Scanner",
      description:
        "Security tool to detect hardcoded secrets and credentials in codebases using pattern matching and entropy-based analysis",
      tags: ["Python", "FastAPI", "React", "PostgreSQL"],
      category: "Full-Stack",
      achievements: [
        "Built backend pipelines to scan repositories and identify exposed credentials",
        "Designed entropy-based detection alongside regex pattern matching for high accuracy",
        "Developed REST APIs and dashboards to visualize security risks and vulnerabilities",
      ],
      github: "https://github.com/Udit013",
    },
    // ── Data ────────────────────────────────────────────────────────
    {
      title: "Retail Analytics Platform",
      description:
        "Data analytics platform with normalized schema, ETL pipelines, and dashboards for tracking business metrics and retail trends",
      tags: ["Next.js", "PostgreSQL", "Drizzle ORM", "Chart.js"],
      category: "Data",
      achievements: [
        "Designed normalized database schema handling 10K+ records with full data integrity",
        "Built SQL-based ETL pipelines and REST APIs for data processing and analytics",
        "Developed interactive dashboards to visualize KPIs and business performance trends",
      ],
      github: "https://github.com/Udit013",
    },
    {
      title: "Business Analytics Dashboard",
      description:
        "Decision-support system to track KPIs, analyze business performance trends, and enable scenario-based strategic decision making",
      tags: ["React", "Node.js", "PostgreSQL", "Tableau"],
      category: "Data",
      status: "in-progress",
      achievements: [
        "Built decision-support system to track KPIs and analyze business performance across datasets",
        "Designed SQL queries and aggregation pipelines for trend analysis and reporting",
        "Implemented dashboards enabling scenario-based decision making for stakeholders",
      ],
      github: "https://github.com/Udit013",
    },
    {
      title: "User Behavior Analytics Pipeline",
      description:
        "End-to-end ETL pipeline to ingest, process, and visualize user activity data for engagement and retention analysis",
      tags: ["Python", "PostgreSQL", "Airflow", "Tableau"],
      category: "Data",
      status: "in-progress",
      achievements: [
        "Built ETL pipelines to ingest and process user activity data at scale",
        "Analyzed engagement and retention patterns to generate actionable product insights",
        "Developed dashboards to visualize key metrics and surface behavioral trends",
      ],
      github: "https://github.com/Udit013",
    },
    {
      title: "Market Entry Strategy Simulator",
      description:
        "Decision model to evaluate market expansion strategies by analyzing revenue, cost, and competition with scenario-based trade-off visualization",
      tags: ["Python", "SQL", "Tableau"],
      category: "Data",
      status: "in-progress",
      achievements: [
        "Developed decision model to evaluate market expansion strategies across scenarios",
        "Analyzed revenue, cost, and competitive dynamics to recommend optimal entry paths",
        "Built dashboards for scenario analysis and trade-off visualization",
      ],
      github: "https://github.com/Udit013",
    },
    // ── AI / ML ─────────────────────────────────────────────────────
    {
      title: "Brain Tumor Classification",
      description:
        "Deep learning model for MRI-based brain tumor classification, benchmarked across CNN architectures and published at IEEE 2024",
      tags: ["Python", "TensorFlow", "Keras", "CNN", "EfficientNetB3"],
      category: "AI/ML",
      metrics: [
        { label: "Accuracy", value: "99.84%" },
        { label: "MRI Scans", value: "7,023" },
        { label: "Parameters", value: "11.7M" },
      ],
      achievements: [
        "Processed 7,023 MRI scans; achieved 99.84% classification accuracy with EfficientNetB3",
        "Benchmarked CNN, VGG16, InceptionV3, and EfficientNetB3 to find optimal architecture",
        "Co-authored IEEE publication contributing to medical imaging research",
      ],
      publication: "IEEE International Conference on Cognitive Robotics and Intelligent Systems 2024",
      github: "https://github.com/Udit013",
    },
    {
      title: "Aphasia Detection using Transformer Models",
      description:
        "NLP system for clinical aphasia detection using fine-tuned DeBERTa-v3 on speech transcripts with custom preprocessing for dysfluency handling",
      tags: ["Python", "DeBERTa-v3", "Hugging Face", "NLP", "Fine-tuning"],
      category: "AI/ML",
      metrics: [
        { label: "F1-Score", value: "0.90" },
        { label: "Model", value: "DeBERTa-v3" },
        { label: "Domain", value: "Clinical NLP" },
      ],
      achievements: [
        "Fine-tuned DeBERTa-v3 on clinical transcripts achieving 0.90 F1-score",
        "Built preprocessing pipeline for annotation cleaning, dysfluency handling, and text normalization",
        "Applied weighted loss and optimized thresholds to handle class imbalance in clinical data",
      ],
      github: "https://github.com/Udit013",
    },
    {
      title: "LLM Generated Text Detection",
      description:
        "BERT-based classifier to distinguish human-written from AI-generated text, targeting academic integrity and disinformation prevention",
      tags: ["Python", "BERT", "Hugging Face", "NLP", "Deep Learning"],
      category: "AI/ML",
      metrics: [
        { label: "Accuracy", value: "95.25%" },
        { label: "Model", value: "Fine-tuned BERT" },
        { label: "Use Case", value: "Academic Integrity" },
      ],
      achievements: [
        "Achieved 95.25% accuracy distinguishing human vs. AI-generated text",
        "Fine-tuned BERT to capture contextual linguistic patterns unique to LLM output",
        "Built evaluation pipelines for multi-model performance comparison",
      ],
      github: "https://github.com/Udit013",
    },
  ];

  const filters = ["All", "Full-Stack", "Data", "AI/ML"];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const categoryColors: Record<string, string> = {
    "Full-Stack": "bg-blue-500/20 text-blue-400",
    "AI/ML": "bg-red-500/20 text-red-400",
    "Data": "bg-emerald-500/20 text-emerald-400",
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const paths: any[] = [];
    for (let i = 0; i < 20; i++) {
      paths.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 200 + 100,
        angle: Math.random() * Math.PI * 2,
        progress: 0,
      });
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      paths.forEach((path) => {
        const endX = path.x + Math.cos(path.angle) * path.length * path.progress;
        const endY = path.y + Math.sin(path.angle) * path.length * path.progress;

        ctx.strokeStyle = "rgba(139, 92, 246, 0.3)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(path.x, path.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        if (path.progress > 0.5) {
          ctx.fillStyle = "rgba(139, 92, 246, 0.6)";
          ctx.beginPath();
          ctx.arc(endX, endY, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        path.progress += 0.01;
        if (path.progress > 1) {
          path.progress = 0;
          path.x = Math.random() * canvas.width;
          path.y = Math.random() * canvas.height;
          path.angle = Math.random() * Math.PI * 2;
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => { cancelAnimationFrame(animationFrameId); };
  }, []);

  return (
    <section id="projects" className="relative py-20 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Showcasing my technical expertise through impactful projects and research
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-semibold smooth-transition ${
                activeFilter === filter
                  ? "bg-primary text-primary-foreground"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="glass rounded-lg p-6 hover-lift group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary smooth-transition">
                      {project.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${categoryColors[project.category]}`}>
                      {project.category}
                    </span>
                    {project.status === "in-progress" && (
                      <span className="px-2 py-1 text-xs rounded-full whitespace-nowrap bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-secondary text-foreground rounded-md text-sm">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Metrics */}
              {project.metrics && (
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-bold text-primary">{metric.value}</div>
                      <div className="text-xs text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Achievements */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-primary mb-2 flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  Key Highlights
                </h4>
                <ul className="space-y-1">
                  {project.achievements.map((achievement, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start">
                      <span className="text-primary mr-2">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Publication */}
              {project.publication && (
                <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <div className="flex items-start">
                    <Award className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-yellow-500">Published Research</div>
                      <div className="text-xs text-muted-foreground">{project.publication}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer */}
              {project.github && (
                <div className="flex justify-end pt-4 border-t border-border">
                  <Button
                    onClick={() => window.open(project.github, "_blank")}
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;