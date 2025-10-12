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
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const projects: Project[] = [
    {
      title: "AI Mock Interview Platform",
      description:
        "A full-stack job interview preparation platform with AI-powered voice agents for realistic mock interviews",
      tags: ["Next.js", "Firebase", "Vapi AI", "Google Gemini", "Tailwind CSS"],
      category: "Full-Stack",
      achievements: [
        "Integrated Vapi AI voice agents for natural conversation flow",
        "Real-time performance feedback using Google Gemini API",
        "Responsive UI with modern design principles",
      ],
      github: "https://github.com/Udit013",
    },
    {
      title: "Brain Tumor Classification using Deep Neural Networks",
      description:
        "Advanced deep learning model for medical image analysis achieving state-of-the-art accuracy",
      tags: ["Python", "TensorFlow", "Keras", "CNN", "EfficientNetB3"],
      category: "AI/ML",
      metrics: [
        { label: "Accuracy", value: "99.84%" },
        { label: "Dataset", value: "7,023 MRI scans" },
        { label: "Parameters", value: "11.7M" },
      ],
      achievements: [
        "99.84% accuracy in tumor classification",
        "Analyzed 7,023 MRI scans",
        "Benchmarked multiple models (CNN, VGG16, InceptionV3, EfficientNetB3)",
      ],
      publication:
        "IEEE International Conference on Cognitive Robotics and Intelligent Systems 2024",
      github: "https://github.com/Udit013",
    },
    {
      title: "Full-Stack Screen Recording & Video Sharing Platform",
      description:
        "Modern serverless platform for screen recording and video sharing with AI-generated transcripts",
      tags: ["Next.js", "TypeScript", "Bunny.net", "Better Auth", "Xata", "Arcjet", "Drizzle"],
      category: "Full-Stack",
      achievements: [
        "Next.js + AI transcripts",
        "Bunny.net CDN integration",
        "Advanced security with Arcjet",
      ],
    },
    {
      title: "LLM Generated Text Detection",
      description:
        "Advanced NLP model to detect AI-generated text for academic integrity and disinformation prevention",
      tags: ["Python", "BERT", "Deep Learning", "NLP", "Fine-tuning"],
      category: "AI/ML",
      metrics: [
        { label: "Accuracy", value: "95.25%" },
        { label: "Model", value: "Fine-tuned BERT" },
        { label: "Application", value: "Academic Integrity" },
      ],
      achievements: [
        "95.25% accuracy in text detection",
        "Fine-tuned BERT for optimal performance",
        "Contextual understanding of linguistic patterns",
      ],
    },
  ];

  const filters = ["All", "AI/ML", "Full-Stack"];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Circuit board pattern
    const paths: any[] = [];
    const numPaths = 20;

    for (let i = 0; i < numPaths; i++) {
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

        // Draw connection point
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

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
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
        <div className="flex justify-center gap-4 mb-12">
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
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary smooth-transition">
                      {project.title}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        project.category === "AI/ML"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {project.category}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-secondary text-foreground rounded-md text-sm"
                  >
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
                  Key Achievements
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
