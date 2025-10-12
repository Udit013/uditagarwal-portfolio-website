import { useState, useEffect, useRef } from "react";

interface Skill {
  name: string;
  logo: string;
  color: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
  theme: string;
}

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const categories: SkillCategory[] = [
    {
      name: "Programming Languages",
      theme: "blue",
      skills: [
        { name: "Python", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/python.svg", color: "hsl(220, 90%, 60%)" },
        { name: "JavaScript", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/javascript.svg", color: "hsl(50, 98%, 64%)" },
        { name: "TypeScript", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/typescript.svg", color: "hsl(211, 100%, 50%)" },
        { name: "C", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/c.svg", color: "hsl(211, 60%, 55%)" },
        { name: "C++", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cplusplus.svg", color: "hsl(211, 70%, 60%)" },
        { name: "SQL", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mysql.svg", color: "hsl(220, 90%, 60%)" },
      ],
    },
    {
      name: "Frontend Development",
      theme: "green",
      skills: [
        { name: "React", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/react.svg", color: "hsl(193, 95%, 68%)" },
        { name: "Next.js", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nextdotjs.svg", color: "hsl(0, 0%, 90%)" },
        { name: "HTML5", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/html5.svg", color: "hsl(13, 78%, 54%)" },
        { name: "CSS3", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/css3.svg", color: "hsl(228, 77%, 58%)" },
        { name: "Tailwind", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tailwindcss.svg", color: "hsl(199, 89%, 48%)" },
      ],
    },
    {
      name: "Backend & Cloud",
      theme: "purple",
      skills: [
        { name: "Node.js", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nodedotjs.svg", color: "hsl(120, 60%, 50%)" },
        { name: "Express.js", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/express.svg", color: "hsl(0, 0%, 85%)" },
        { name: "REST APIs", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/fastapi.svg", color: "hsl(270, 80%, 60%)" },
        { name: "Firebase", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/firebase.svg", color: "hsl(36, 100%, 50%)" },
        { name: "MongoDB", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mongodb.svg", color: "hsl(120, 65%, 45%)" },
        { name: "AWS", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazonaws.svg", color: "hsl(28, 100%, 50%)" },
        { name: "Docker", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/docker.svg", color: "hsl(199, 100%, 48%)" },
        { name: "Git", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/git.svg", color: "hsl(14, 100%, 53%)" },
      ],
    },
    {
      name: "AI/ML Technologies",
      theme: "red",
      skills: [
        { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tensorflow.svg", color: "hsl(28, 100%, 50%)" },
        { name: "Keras", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/keras.svg", color: "hsl(0, 100%, 50%)" },
        { name: "Scikit-learn", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/scikitlearn.svg", color: "hsl(28, 84%, 55%)" },
        { name: "Deep Learning", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/pytorch.svg", color: "hsl(265, 89%, 64%)" },
        { name: "CNNs", logo: "https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/cnn.svg", color: "hsl(0, 80%, 60%)" },
        { name: "LSTM", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/numpy.svg", color: "hsl(210, 80%, 60%)" },
        { name: "NLP", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg", color: "hsl(210, 89%, 64%)" },
        { name: "Computer Vision", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/opencv.svg", color: "hsl(0, 80%, 60%)" },
      ],
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Code rain effect
    const characters = "01";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * canvas.height;
    }

    let animationFrameId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(10, 15, 30, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#8b5cf6";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="skills" className="relative py-20 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[hsl(250,70%,60%)] to-[hsl(35,65%,50%)] bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building intelligent and scalable solutions
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out ${
                activeCategory === index
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-[rgba(5,5,5,0.8)] backdrop-blur-[16px] border border-[rgba(255,255,255,0.1)] text-muted-foreground hover:text-foreground hover:border-[rgba(255,255,255,0.2)]"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories[activeCategory].skills.map((skill, index) => {
            return (
              <div
                key={index}
                className="bg-[rgba(5,5,5,0.8)] backdrop-blur-[16px] border border-[rgba(255,255,255,0.1)] rounded-xl p-6 text-center group cursor-pointer relative overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(139,92,246,0.2)]"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div
                    className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg p-4"
                    style={{
                      backgroundColor: `${skill.color}15`,
                      border: `2px solid ${skill.color}30`,
                    }}
                  >
                    <img 
                      src={skill.logo} 
                      alt={skill.name}
                      className="w-full h-full object-contain"
                      style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
                      onLoad={(e) => {
                        e.currentTarget.style.filter = 'invert(1)';
                      }}
                    />
                  </div>
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {skill.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;