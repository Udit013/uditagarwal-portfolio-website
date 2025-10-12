import { useState, useEffect, useRef } from "react";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([
    "Welcome to Udit's Interactive Terminal! Type 'help' to see available commands.",
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, () => string> = {
    help: () =>
      "Available commands:\n• whoami - Personal information\n• skills - Technical skills\n• projects - Portfolio projects\n• education - Academic background\n• experience - Work experience\n• github - GitHub profile\n• contact - Contact information\n• resume - Download resume\n• quote - Random coding quote\n• clear - Clear terminal",
    whoami: () =>
      "Udit Agarwal\nAI Engineer & Full-Stack Developer\nGraduate Student at Indiana University Bloomington\nCGPA: 3.73/4\nPassionate about building intelligent systems and scalable applications.",
    skills: () =>
      "Technical Skills:\n\nLanguages: Python, JavaScript, TypeScript, C, C++, SQL\nFrontend: React, Next.js, HTML5, CSS3, Tailwind\nBackend: Node.js, Express.js, REST APIs, Firebase, MongoDB\nCloud & DevOps: AWS, Docker, Git, Postman, Unix CLI\nAI/ML: TensorFlow, Keras, Scikit-learn, Deep Learning, CNNs, LSTM, NLP",
    projects: () =>
      "Featured Projects:\n\n1. AI Mock Interview Platform\n   Tech: Next.js, Firebase, Vapi AI, Google Gemini\n\n2. Full-Stack Screen Recording & Video Sharing Platform\n   Tech: Next.js, TypeScript, Bunny.net, Better Auth\n\n3. LLM Generated Text Detection\n   Tech: Python, BERT, Deep Learning, NLP\n   Achievement: 95.25% accuracy\n\n4. Brain Tumor Classification\n   Tech: Python, TensorFlow, Deep Learning\n   Achievement: 99.84% accuracy, IEEE Publication",
    education: () =>
      "Education:\n\nMaster of Science in Computer Science\nIndiana University Bloomington (Aug 2024 - May 2026)\nCGPA: 3.73/4\n\nBachelor of Technology in Computer Science & Engineering\nKalinga Institute of Industrial Technology (Aug 2020 - May 2024)\nCGPA: 3.54/4",
    experience: () =>
      "Professional Experience:\n\n• Software Development Intern @ Vikas Corp (May 2023 - July 2023)\n  Optimized API performance by 60% using Node.js, Express\n\n• Web Development Intern @ Vikas Corp (May 2022 - July 2022)\n  Designed promotional campaigns, increased engagement by 20%",
    github: () => {
      window.open("https://github.com/Udit013", "_blank");
      return "Opening GitHub profile...";
    },
    contact: () =>
      "Contact Information:\n\nEmail: agarwaludit13@gmail.com\nPhone: +1 (930) 904-4901\nLinkedIn: linkedin.com/in/udit013\nGitHub: github.com/Udit013\n\nAvailable for full-time opportunities starting May 2026",
    quote: () => {
      const quotes = [
        '"First, solve the problem. Then, write the code." - John Johnson',
        '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
        '"Make it work, make it right, make it fast." - Kent Beck',
        '"The best error message is the one that never shows up." - Thomas Fuchs',
        '"Simplicity is the soul of efficiency." - Austin Freeman'
      ];
      return quotes[Math.floor(Math.random() * quotes.length)];
    },
    resume: () => {
      window.open("/resume.docx", "_blank");
      return "Opening resume...";
    },
    clear: () => {
      setOutput([]);
      return "";
    },
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    if (!trimmedCmd) return;

    setHistory([...history, cmd]);
    setHistoryIndex(-1);

    const response = commands[trimmedCmd]
      ? commands[trimmedCmd]()
      : `Command not found: ${cmd}. Type 'help' for available commands.`;

    if (trimmedCmd !== "clear") {
      setOutput([...output, `$ ${cmd}`, response]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const quickCommands = ["skills", "projects", "contact", "help", "clear"];

  return (
    <div className="glass rounded-lg overflow-hidden">
      {/* Terminal Header */}
      <div className="flex items-center space-x-2 px-4 py-3 bg-secondary border-b border-border">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-sm font-mono text-muted-foreground flex-1 text-center">
          Terminal
        </span>
      </div>

      {/* Terminal Output */}
      <div
        ref={outputRef}
        className="h-80 overflow-y-auto p-4 font-mono text-sm space-y-2 bg-card/50"
        onClick={() => inputRef.current?.focus()}
      >
        {output.map((line, index) => (
          <div
            key={index}
            className={`${
              line.startsWith("$") ? "text-primary" : "text-muted-foreground"
            } whitespace-pre-wrap`}
          >
            {line}
          </div>
        ))}
        
        {/* Input Line */}
        <div className="flex items-center space-x-2">
          <span className="text-primary">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-foreground"
            placeholder="Type a command..."
            autoFocus
          />
          <span className="animate-pulse text-primary">|</span>
        </div>
      </div>

      {/* Quick Commands */}
      <div className="px-4 py-3 bg-secondary border-t border-border flex flex-wrap gap-2">
        {quickCommands.map((cmd) => (
          <button
            key={cmd}
            onClick={() => {
              setInput(cmd);
              inputRef.current?.focus();
            }}
            className="px-3 py-1 text-xs font-mono bg-card hover:bg-primary/20 text-primary rounded smooth-transition"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Terminal;
