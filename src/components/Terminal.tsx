import { useState, useRef, useEffect } from "react";
import { Terminal, X, Minimize2, Maximize2 } from "lucide-react";

const PortfolioTerminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Array<{ command: string; output: React.ReactNode }>>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMinimized, setIsMinimized] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: {
      description: "Show all available commands",
      output: (
        <div className="space-y-2">
          <p className="text-green-400 font-semibold">Available Commands:</p>
          <div className="grid gap-1 text-sm">
            <div><span className="text-cyan-400">about</span> - Learn about Udit</div>
            <div><span className="text-cyan-400">skills</span> - View technical skills</div>
            <div><span className="text-cyan-400">projects</span> - See notable projects</div>
            <div><span className="text-cyan-400">experience</span> - Work experience</div>
            <div><span className="text-cyan-400">education</span> - Academic background</div>
            <div><span className="text-cyan-400">contact</span> - Get contact information</div>
            <div><span className="text-cyan-400">resume</span> - Download resume</div>
            <div><span className="text-cyan-400">clear</span> - Clear terminal</div>
            <div><span className="text-cyan-400">linkedin</span> - Open LinkedIn profile</div>
            <div><span className="text-cyan-400">github</span> - Open GitHub profile</div>
          </div>
        </div>
      ),
    },
    about: {
      description: "Learn about Udit",
      output: (
        <div className="space-y-2">
          <p className="text-green-400 font-semibold">About Udit Agarwal</p>
          <p className="text-sm leading-relaxed">
            AI Engineer & Full-Stack Developer pursuing MS in Computer Science at Indiana University Bloomington (GPA: 3.73/4).
          </p>
          <p className="text-sm leading-relaxed">
            Passionate about building intelligent, scalable applications that solve real-world problems. 
            Experience spans from deep learning models achieving 99%+ accuracy to full-stack platforms with modern architectures.
          </p>
          <p className="text-sm text-yellow-400 mt-2">
            🚀 Available for full-time roles from May 2026
          </p>
        </div>
      ),
    },
    skills: {
      description: "View technical skills",
      output: (
        <div className="space-y-3">
          <p className="text-green-400 font-semibold">Technical Skills</p>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-cyan-400">Languages:</span>
              <span className="ml-2">Python, JavaScript, TypeScript, C, C++, SQL</span>
            </div>
            <div>
              <span className="text-cyan-400">Frontend:</span>
              <span className="ml-2">React, Next.js, HTML5, CSS3, Tailwind</span>
            </div>
            <div>
              <span className="text-cyan-400">Backend:</span>
              <span className="ml-2">Node.js, Express.js, REST APIs, Firebase, MongoDB, Postgres, Redis</span>
            </div>
            <div>
              <span className="text-cyan-400">Cloud & DevOps:</span>
              <span className="ml-2">AWS, Docker, Git, Postman, Unix CLI, CI/CD</span>
            </div>
            <div>
              <span className="text-cyan-400">AI/ML:</span>
              <span className="ml-2">TensorFlow, Keras, Scikit-learn, Deep Learning, CNNs, LSTM, NLP, Computer Vision</span>
            </div>
          </div>
        </div>
      ),
    },
    projects: {
      description: "See notable projects",
      output: (
        <div className="space-y-3">
          <p className="text-green-400 font-semibold">Notable Projects</p>
          <div className="space-y-3 text-sm">
            <div className="border-l-2 border-cyan-400 pl-3">
              <p className="text-yellow-400 font-semibold">AI Mock Interview Platform</p>
              <p className="text-xs text-gray-400 mb-1">Next.js, Firebase, Vapi AI, Google Gemini</p>
              <p>Full-stack interview prep platform with AI voice agents and instant feedback</p>
            </div>
            <div className="border-l-2 border-cyan-400 pl-3">
              <p className="text-yellow-400 font-semibold">Video Sharing Platform</p>
              <p className="text-xs text-gray-400 mb-1">Next.js, TypeScript, Bunny.net, Better Auth</p>
              <p>Screen recording & video sharing with AI transcripts and serverless architecture</p>
            </div>
            <div className="border-l-2 border-cyan-400 pl-3">
              <p className="text-yellow-400 font-semibold">Brain Tumor Classification</p>
              <p className="text-xs text-gray-400 mb-1">Python, TensorFlow, Deep Learning</p>
              <p>99.84% accuracy on 7,023 MRI scans | Published at IEEE Conference 2024</p>
            </div>
            <div className="border-l-2 border-cyan-400 pl-3">
              <p className="text-yellow-400 font-semibold">LLM Text Detection</p>
              <p className="text-xs text-gray-400 mb-1">Python, BERT, NLP</p>
              <p>95.25% accuracy in detecting AI-generated content</p>
            </div>
          </div>
        </div>
      ),
    },
    experience: {
      description: "Work experience",
      output: (
        <div className="space-y-3">
          <p className="text-green-400 font-semibold">Work Experience</p>
          <div className="border-l-2 border-cyan-400 pl-3">
            <p className="text-yellow-400 font-semibold">IT Consultant - Indiana University</p>
            <p className="text-xs text-gray-400 mb-1">Aug 2025 - Present | University Information Technology Services</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Resolved cross-platform software, hardware, and network issues</li>
              <li>Enhanced enterprise services (authentication, cloud storage, learning systems)</li>
              <li>Optimized workflows to reduce resolution time and improve user experience</li>
            </ul>
          </div>
        </div>
      ),
    },
    education: {
      description: "Academic background",
      output: (
        <div className="space-y-3">
          <p className="text-green-400 font-semibold">Education</p>
          <div className="space-y-3 text-sm">
            <div className="border-l-2 border-cyan-400 pl-3">
              <p className="text-yellow-400 font-semibold">Indiana University Bloomington</p>
              <p className="text-xs text-gray-400">Aug 2024 - May 2026</p>
              <p>Master of Science in Computer Science | <span className="text-green-400">GPA: 3.73/4</span></p>
              <p className="text-xs mt-1">Coursework: Applied Algorithms, ML, Cloud Computing, LLMs, Database Systems</p>
            </div>
            <div className="border-l-2 border-cyan-400 pl-3">
              <p className="text-yellow-400 font-semibold">KIIT University</p>
              <p className="text-xs text-gray-400">Aug 2020 - May 2024</p>
              <p>Bachelor of Technology in Computer Science | <span className="text-green-400">GPA: 3.54/4</span></p>
            </div>
          </div>
        </div>
      ),
    },
    contact: {
      description: "Get contact information",
      output: (
        <div className="space-y-2">
          <p className="text-green-400 font-semibold">Contact Information</p>
          <div className="space-y-1 text-sm">
            <p>📧 Email: <a href="mailto:agarwaludit13@gmail.com" className="text-cyan-400 hover:underline">agarwaludit13@gmail.com</a></p>
            <p>📱 Phone: <span className="text-cyan-400">+1 (930) 904-4901</span></p>
            <p>📍 Location: <span className="text-cyan-400">Bloomington, IN (EST)</span></p>
            <p>💼 LinkedIn: <a href="https://linkedin.com/in/udit013" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">linkedin.com/in/udit013</a></p>
            <p>💻 GitHub: <a href="https://github.com/Udit013" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">github.com/Udit013</a></p>
          </div>
        </div>
      ),
    },
    resume: {
      description: "Download resume",
      output: (
        <div className="space-y-2">
          <p className="text-green-400">Opening resume...</p>
          <p className="text-sm">Download will start automatically</p>
        </div>
      ),
      action: () => window.open("/resume.pdf", "_blank"),
    },
    linkedin: {
      description: "Open LinkedIn profile",
      output: <p className="text-green-400">Opening LinkedIn profile...</p>,
      action: () => window.open("https://linkedin.com/in/udit013", "_blank"),
    },
    github: {
      description: "Open GitHub profile",
      output: <p className="text-green-400">Opening GitHub profile...</p>,
      action: () => window.open("https://github.com/Udit013", "_blank"),
    },
    clear: {
      description: "Clear terminal",
      output: null,
    },
  };

  useEffect(() => {
    // Show welcome message on mount
    setHistory([
      {
        command: "",
        output: (
          <div className="space-y-2 text-sm">
            <p className="text-green-400 font-bold text-lg">Welcome to Udit's Portfolio Terminal</p>
            <p>Type <span className="text-cyan-400">help</span> to see available commands</p>
            <p className="text-xs text-gray-400">Tip: Use ↑/↓ arrows for command history, Tab for auto-complete</p>
          </div>
        ),
      },
    ]);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    // Update suggestions based on input
    if (input) {
      const matches = Object.keys(commands).filter((cmd) =>
        cmd.startsWith(input.toLowerCase())
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [input]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (!trimmedCmd) return;

    // Add to command history
    setCommandHistory((prev) => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }

    const command = commands[trimmedCmd as keyof typeof commands];

    if (command) {
      if (command.action) {
        command.action();
      }
      if (command.output) {
        setHistory((prev) => [
          ...prev,
          { command: trimmedCmd, output: command.output },
        ]);
      }
    } else {
      setHistory((prev) => [
        ...prev,
        {
          command: trimmedCmd,
          output: (
            <p className="text-red-400">
              Command not found: {trimmedCmd}. Type 'help' for available commands.
            </p>
          ),
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length === 1) {
        setInput(suggestions[0]);
        setSuggestions([]);
      }
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Terminal Window */}
      <div className="bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-700/50 overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <button
                onClick={() => setHistory([])}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                aria-label="Clear"
              />
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
                aria-label="Minimize"
              />
              <button
                className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
                aria-label="Maximize"
              />
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Terminal className="w-4 h-4" />
              <span className="text-sm font-medium">portfolio@udit:~</span>
            </div>
          </div>
          <div className="text-xs text-gray-400 hidden sm:block">Interactive Terminal</div>
        </div>

        {/* Terminal Body */}
        {!isMinimized && (
          <div
            ref={terminalRef}
            onClick={focusInput}
            className="p-4 h-72 sm:h-96 overflow-y-auto font-mono text-sm cursor-text custom-scrollbar"
          >
            {/* Command History */}
            {history.map((item, index) => (
              <div key={index} className="mb-4">
                {item.command && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-400">➜</span>
                    <span className="text-cyan-400">~</span>
                    <span className="text-white">{item.command}</span>
                  </div>
                )}
                {item.output && (
                  <div className="ml-4 text-gray-300">{item.output}</div>
                )}
              </div>
            ))}

            {/* Current Input Line */}
            <div className="flex items-center gap-2">
              <span className="text-green-400">➜</span>
              <span className="text-cyan-400">~</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-white caret-white"
                autoFocus
                spellCheck={false}
              />
            </div>

            {/* Auto-complete Suggestions */}
            {suggestions.length > 0 && (
              <div className="ml-4 mt-2 text-xs text-gray-500">
                Suggestions: {suggestions.map((s, i) => (
                  <span key={s}>
                    <span className="text-cyan-400">{s}</span>
                    {i < suggestions.length - 1 && ", "}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.8);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.9);
        }
      `}</style>
    </div>
  );
};

export default PortfolioTerminal;