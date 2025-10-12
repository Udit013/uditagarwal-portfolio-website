import { useEffect, useRef } from "react";
import { BookOpen, Award, Zap } from "lucide-react";

const About = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Neural network nodes
    const nodes: any[] = [];
    const numNodes = 50;

    for (let i = 0; i < numNodes; i++) {
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

      // Update and draw nodes
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

        // Draw node
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

  return (
    <section id="about" className="relative py-20 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            "Bridging AI research with real-world applications"
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="glass rounded-lg p-6 text-center hover-lift">
            <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Current Status</h3>
            <p className="text-muted-foreground">Graduate Student</p>
          </div>
          
          <div className="glass rounded-lg p-6 text-center hover-lift">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Research Impact</h3>
            <p className="text-muted-foreground">IEEE Publication</p>
          </div>
          
          <div className="glass rounded-lg p-6 text-center hover-lift">
            <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Focus Areas</h3>
            <p className="text-muted-foreground">AI/ML + Full-Stack</p>
          </div>
        </div>

        {/* Education Journey */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold gradient-text mb-8 text-center">Education Journey</h3>
          
          <div className="space-y-8 max-w-4xl mx-auto">
            {/* Master's */}
            <div className="glass rounded-lg p-8 hover-lift">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h4 className="text-2xl font-bold text-foreground mb-2">
                    Master of Science in Computer Science
                  </h4>
                  <p className="text-primary font-semibold text-lg">Indiana University Bloomington</p>
                  <p className="text-muted-foreground">Bloomington, IN, USA</p>
                </div>
                <div className="mt-4 md:mt-0 text-left md:text-right">
                  <p className="text-muted-foreground">August 2024 – May 2026</p>
                  <p className="text-green-500 font-bold text-lg">GPA: 3.73/4</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                  Applied Algorithms
                </span>
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                  Software Engineering
                </span>
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                  Advanced Database Concepts
                </span>
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                  Applied Machine Learning
                </span>
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                  +3 more
                </span>
              </div>
            </div>

            {/* Bachelor's */}
            <div className="glass rounded-lg p-8 hover-lift">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h4 className="text-2xl font-bold text-foreground mb-2">
                    Bachelor of Technology in Computer Science & Engineering
                  </h4>
                  <p className="text-primary font-semibold text-lg">
                    Kalinga Institute of Industrial Technology (KIIT)
                  </p>
                  <p className="text-muted-foreground">Bhubaneswar, OD, India</p>
                </div>
                <div className="mt-4 md:mt-0 text-left md:text-right">
                  <p className="text-muted-foreground">August 2020 – May 2024</p>
                  <p className="text-green-500 font-bold text-lg">GPA: 3.54/4</p>
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
