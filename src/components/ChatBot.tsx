import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Sparkles, Loader2, RefreshCw, User, Bot, Copy, Check, Minimize2, Maximize2, Zap, Brain } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

// Advanced knowledge base with rich responses
const knowledgeBase = {
  greeting: {
    keywords: ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening", "sup", "yo"],
    response: "Hello! 👋 I'm Udit's AI assistant. I can help you learn about his:\n\n🎯 Skills & Technologies\n💼 Projects & Work\n🎓 Education & Experience\n📫 Contact Information\n\nWhat would you like to know?",
    suggestions: ["Show me projects", "What are his skills?", "How to contact him?"],
    category: "general"
  },
  skills: {
    keywords: ["skill", "technology", "tech stack", "language", "framework", "tool", "proficient", "good at", "expert"],
    response: "**Technical Expertise:**\n\n💻 **Languages**\nPython • JavaScript • TypeScript • C++ • SQL\n\n🎨 **Frontend**\nReact • Next.js • Tailwind CSS • HTML5 • CSS3\n\n⚙️ **Backend**\nNode.js • Express.js • REST APIs • Firebase • MongoDB • PostgreSQL • Redis\n\n🤖 **AI/ML**\nTensorFlow • Keras • PyTorch • Scikit-learn\nDeep Learning • CNNs • LSTM • NLP • Computer Vision\n\n☁️ **Cloud & DevOps**\nAWS • Docker • Git • CI/CD • Unix CLI\n\nHe's particularly strong in AI/ML and full-stack development!",
    suggestions: ["Show me projects using these", "Tell me about his experience", "What's his education?"],
    category: "technical"
  },
  projects: {
    keywords: ["project", "portfolio", "work", "built", "developed", "created", "app", "application", "demo"],
    response: "**Featured Projects:**\n\n🎤 **AI Mock Interview Platform**\n• Next.js + Firebase + Vapi AI + Gemini\n• Real-time voice AI interviews\n• Instant performance feedback\n• Full-stack with responsive UI\n\n🎥 **Video Sharing Platform**\n• Next.js + TypeScript + Bunny.net\n• Screen recording & sharing\n• AI-generated transcripts\n• Serverless architecture with Better Auth\n\n🧠 **Brain Tumor Classification**\n• 99.84% accuracy on 7,023 MRI scans\n• Deep Learning (CNN, VGG16, EfficientNetB3)\n• Published at IEEE Conference 2024\n• Optimized for clinical deployment\n\n✍️ **LLM Text Detection**\n• BERT-based model, 95.25% accuracy\n• Detects AI-generated content\n• Combat disinformation & maintain integrity",
    suggestions: ["What technologies did he use?", "Tell me more about AI projects", "Show his publications"],
    category: "portfolio"
  },
  experience: {
    keywords: ["experience", "work", "job", "employment", "consultant", "position", "role", "career", "professional"],
    response: "**Professional Experience:**\n\n💼 **IT Consultant** (Part-Time)\nIndiana University - UITS | Aug 2025 - Present\n\n**Key Responsibilities:**\n• Cross-platform troubleshooting (Windows, macOS, mobile)\n• Enterprise service optimization (auth, cloud, learning systems)\n• Technical support & documentation\n• Root-cause analysis & workflow optimization\n\n**Skills Applied:**\n✓ Enterprise IT Systems\n✓ Identity & Access Management\n✓ Technical Communication\n✓ Systematic Debugging\n\nCurrently balancing work with Master's studies at IU Bloomington!",
    suggestions: ["What's his educational background?", "Is he available for hire?", "Show me his skills"],
    category: "professional"
  },
  education: {
    keywords: ["education", "degree", "university", "study", "graduate", "master", "bachelor", "school", "academic"],
    response: "**Academic Background:**\n\n🎓 **Master of Science in Computer Science**\nIndiana University Bloomington (2024-2026)\n• GPA: 3.73/4.0\n• Coursework: Applied ML, Advanced Algorithms, Cloud Computing, LLMs, Database Systems, Computer Networks\n\n🎓 **Bachelor of Technology**\nComputer Science & Engineering\nKIIT University, India (2020-2024)\n• GPA: 3.54/4.0\n\n**Certifications & Awards:**\n🏆 AWS Academy Graduate - Cloud Computing\n🏆 DeepLearning.AI - Neural Networks & Deep Learning\n🏆 Built UAV with KIIT Robotics Society\n📄 Published at IEEE Conference 2024",
    suggestions: ["Tell me about his projects", "What's his work experience?", "Show contact info"],
    category: "academic"
  },
  contact: {
    keywords: ["contact", "reach", "email", "phone", "connect", "hire", "available", "get in touch", "linkedin", "github"],
    response: "**Let's Connect! 📬**\n\n📧 **Email**\nagarwaludit13@gmail.com\n\n📱 **Phone**\n+1 (930) 904-4901\n\n📍 **Location**\nBloomington, IN (EST)\n\n🔗 **Professional Links**\n💼 LinkedIn: linkedin.com/in/udit013\n💻 GitHub: github.com/Udit013\n\n⚡ **Response Time**\nTypically responds within 24 hours\n\n🚀 **Available for full-time roles from May 2026!**",
    suggestions: ["What roles is he interested in?", "Tell me about his skills", "Show me his projects"],
    category: "contact"
  },
  availability: {
    keywords: ["available", "hire", "hiring", "job", "opportunity", "full-time", "when", "start", "join", "looking for"],
    response: "**Career Availability:**\n\n✨ **Current Status**\n• Pursuing MS in Computer Science at IU Bloomington\n• Working part-time as IT Consultant\n• Actively seeking full-time opportunities\n\n🎯 **Available From:** May 2026\n\n💼 **Interested Roles:**\n• AI/ML Engineer\n• Full-Stack Developer\n• Cloud Solutions Architect\n• Software Engineer\n• Machine Learning Engineer\n\n🌟 **What He Brings:**\n✓ Strong AI/ML background (99%+ model accuracy)\n✓ Full-stack development expertise\n✓ Cloud & DevOps experience\n✓ Published research at IEEE Conference\n✓ 3.73 GPA in MS program\n\nReady to make an impact from day one!",
    suggestions: ["Show contact information", "What are his technical skills?", "Tell me about projects"],
    category: "career"
  },
  publications: {
    keywords: ["publication", "paper", "research", "published", "conference", "ieee", "academic"],
    response: "**Research & Publications:**\n\n📄 **IEEE Conference Publication (2024)**\n\"Identifying Various Types of Brain Tumors using Deep Neural Network based Image Features\"\n\n**Conference:**\nIEEE International Conference on Cognitive Robotics and Intelligent Systems\n\n**Key Achievements:**\n• 99.84% classification accuracy\n• Analyzed 7,023 MRI scans\n• Benchmarked multiple architectures (CNN, VGG16, InceptionV3, EfficientNetB3)\n• Selected EfficientNetB3 for optimal parameter efficiency\n• Focus on real-world clinical applications\n\n**Impact:**\nContributes to early cancer detection and improved patient outcomes through AI-assisted diagnosis.",
    suggestions: ["Show me more projects", "What AI/ML skills does he have?", "How to contact him?"],
    category: "research"
  },
  ai_ml: {
    keywords: ["machine learning", "deep learning", "neural network", "ai", "artificial intelligence", "model", "training", "tensorflow"],
    response: "**AI/ML Expertise:**\n\n🧠 **Core Competencies**\n• Deep Neural Networks (CNNs, LSTM, RNN)\n• Natural Language Processing (NLP)\n• Computer Vision\n• Time Series Analysis\n• Model Optimization & Fine-tuning\n\n🛠️ **Tools & Frameworks**\n• TensorFlow • Keras • PyTorch\n• Scikit-learn • Pandas • NumPy\n• BERT • Transformers\n\n🏆 **Notable Achievements**\n• 99.84% accuracy - Brain tumor classification\n• 95.25% accuracy - LLM text detection\n• Published research at IEEE Conference\n• Real-world model deployment experience\n\n💡 **Applications**\nMedical imaging, text analysis, conversational AI, predictive modeling",
    suggestions: ["Show AI/ML projects", "What other skills does he have?", "Tell me about education"],
    category: "technical"
  },
  fullstack: {
    keywords: ["full stack", "fullstack", "web development", "frontend", "backend", "web app", "react", "next"],
    response: "**Full-Stack Development:**\n\n🎨 **Frontend Mastery**\n• React.js & Next.js (SSR, SSG, ISR)\n• TypeScript for type safety\n• Tailwind CSS & modern styling\n• Responsive design & accessibility\n• State management (Context, Redux)\n\n⚙️ **Backend Excellence**\n• Node.js & Express.js\n• RESTful API design\n• Database design (SQL & NoSQL)\n• Authentication & authorization\n• Real-time features (WebSockets)\n\n☁️ **Cloud & Deployment**\n• AWS services (EC2, S3, Lambda)\n• Docker containerization\n• CI/CD pipelines\n• Serverless architectures\n\n🚀 **Full-Stack Projects**\n✓ AI Mock Interview Platform\n✓ Video Sharing Platform with AI transcripts\n✓ Real-time collaborative applications",
    suggestions: ["Show me these projects in detail", "What about AI/ML skills?", "How to contact?"],
    category: "technical"
  }
};

const PortfolioChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [messageCount, setMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll with smooth behavior
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isTyping, scrollToBottom]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  // Get time-based greeting
  const getGreeting = useCallback(() => {
    const hour = new Date().getHours();
    return hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  }, []);

  // Advanced keyword matching with scoring
  const findBestMatch = useCallback((userMessage: string) => {
    const msg = userMessage.toLowerCase();
    const scores: Array<{ key: string; score: number; category: string }> = [];

    for (const [key, data] of Object.entries(knowledgeBase)) {
      let score = 0;
      
      // Check for exact phrase matches (higher weight)
      data.keywords.forEach(keyword => {
        if (msg.includes(keyword)) {
          // Longer keywords get higher scores
          score += keyword.length;
        }
      });

      if (score > 0) {
        scores.push({ key, score, category: data.category });
      }
    }

    // Sort by score descending
    scores.sort((a, b) => b.score - a.score);

    return scores.length > 0 ? knowledgeBase[scores[0].key as keyof typeof knowledgeBase] : null;
  }, []);

  // Generate intelligent response
  const generateResponse = useCallback((userMessage: string): { response: string; suggestions?: string[] } => {
    const matched = findBestMatch(userMessage);
    
    if (matched) {
      return { response: matched.response, suggestions: matched.suggestions };
    }

    // Smart fallback based on context
    const lower = userMessage.toLowerCase();
    
    // Check for specific intents
    if (lower.includes("help") || lower.includes("what can you")) {
      return {
        response: "I can provide detailed information about:\n\n🎯 **Skills & Technologies** - Programming languages, frameworks, tools\n💼 **Projects** - AI/ML projects, full-stack applications\n🎓 **Education** - Degrees, coursework, certifications\n🏢 **Experience** - Current role, responsibilities\n📫 **Contact** - Email, phone, LinkedIn, GitHub\n🚀 **Availability** - Job opportunities and timeline\n\nJust ask me anything!",
        suggestions: ["Show technical skills", "Tell me about projects", "Is he available for hire?"]
      };
    }

    // Generic fallback
    return {
      response: "I'd be happy to help! Try asking about:\n\n• Technical skills and expertise\n• Projects and portfolio work\n• Educational background\n• Work experience\n• Contact information\n• Availability for opportunities\n\nWhat interests you most?",
      suggestions: ["Show me skills", "Tell me about projects", "How to contact him?"]
    };
  }, [findBestMatch]);

  // Realistic typing simulation
  const simulateTyping = useCallback((text: string, suggestions?: string[]) => {
    setIsTyping(true);
    
    // Calculate realistic delay based on text length
    const baseDelay = 400;
    const charDelay = Math.min(text.length * 8, 1200);
    const totalDelay = baseDelay + charDelay;
    
    setTimeout(() => {
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        newMessages[newMessages.length - 1] = {
          ...lastMessage,
          content: text,
          suggestions
        };
        return newMessages;
      });
      setIsTyping(false);
      setMessageCount(prev => prev + 1);
    }, totalDelay);
  }, []);

  // Send message
  const handleSend = useCallback((text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isTyping) return;

    // Add user message
    setMessages(prev => [...prev, {
      role: "user",
      content: messageText,
      timestamp: new Date()
    }]);
    setInput("");
    setMessageCount(prev => prev + 1);

    // Generate response after delay
    setTimeout(() => {
      const { response, suggestions } = generateResponse(messageText);
      
      // Add placeholder assistant message
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "",
        timestamp: new Date()
      }]);

      // Simulate typing
      simulateTyping(response, suggestions);
    }, 600);
  }, [input, isTyping, generateResponse, simulateTyping]);

  // Handle keyboard shortcuts
  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  // Reset conversation
  const resetChat = useCallback(() => {
    const greeting = getGreeting();
    setMessages([{
      role: "assistant",
      content: `${greeting}! 👋 I'm Udit's AI assistant. I can help you learn about his:\n\n🎯 Skills & Technologies\n💼 Projects & Work\n🎓 Education & Experience\n📫 Contact Information\n\nWhat would you like to know?`,
      timestamp: new Date(),
      suggestions: ["Show me projects", "What are his skills?", "How to contact him?"]
    }]);
    setMessageCount(0);
  }, [getGreeting]);

  // Initialize on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      resetChat();
    }
  }, [isOpen, messages.length, resetChat]);

  // Copy message
  const copyMessage = useCallback((content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 shadow-2xl hover:shadow-violet-500/50 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-[9998] w-[calc(100vw-2rem)] sm:w-[440px] ${
            isMinimized ? "h-auto" : "h-[500px] sm:h-[620px]"
          } rounded-2xl sm:rounded-3xl border border-violet-500/30 backdrop-blur-3xl bg-gradient-to-b from-slate-900/98 to-slate-950/98 shadow-2xl flex flex-col overflow-hidden transition-all duration-300`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-4 flex justify-between items-center text-white flex-shrink-0">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 relative">
                <Sparkles className="w-5 h-5" />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-violet-600 animate-pulse"></div>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-base truncate">Udit's AI Assistant</h3>
                <p className="text-[10px] sm:text-xs opacity-90 flex items-center gap-1.5">
                  <Zap className="w-3 h-3" />
                  <span>Online • Responds instantly</span>
                </p>
              </div>
            </div>
            <div className="flex gap-1.5 flex-shrink-0 ml-2">
              <button
                onClick={() => setIsMinimized(prev => !prev)}
                className="hover:bg-white/20 p-1.5 sm:p-2 rounded-lg transition-colors"
                aria-label={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={resetChat}
                className="hover:bg-white/20 p-1.5 sm:p-2 rounded-lg transition-colors"
                aria-label="Reset conversation"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1.5 sm:p-2 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm custom-scrollbar">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className="animate-in fade-in slide-in-from-bottom-2 duration-300"
                  >
                    <div className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      {msg.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0">
                          <Brain className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      <div className={`flex-1 max-w-[85%] ${msg.role === "user" ? "order-first" : ""}`}>
                        <div className="relative group">
                          <div
                            className={`px-4 py-3 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                              msg.role === "user"
                                ? "bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-lg rounded-br-md"
                                : "bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 text-gray-100 shadow-xl rounded-bl-md"
                            }`}
                          >
                            {msg.content}
                          </div>
                          
                          {/* Copy button */}
                          {msg.role === "assistant" && msg.content && (
                            <button
                              onClick={() => copyMessage(msg.content, idx)}
                              className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-700 hover:bg-slate-600 p-1.5 rounded-lg shadow-lg"
                              aria-label="Copy message"
                            >
                              {copiedIndex === idx ? (
                                <Check className="w-3.5 h-3.5 text-green-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5 text-gray-300" />
                              )}
                            </button>
                          )}
                        </div>

                        {/* Suggestions */}
                        {msg.suggestions?.length && idx === messages.length - 1 && !isTyping && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {msg.suggestions.map((suggestion, i) => (
                              <button
                                key={i}
                                onClick={() => handleSend(suggestion)}
                                className="px-3 py-1.5 text-xs bg-slate-800/90 text-violet-300 rounded-full border border-violet-500/40 hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Timestamp */}
                        <p className="text-[10px] text-gray-500 mt-1.5 px-1">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>

                      {msg.role === "user" && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg flex-shrink-0">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-2.5 items-start animate-in fade-in duration-300">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-slate-800/70 border border-slate-700/50 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-violet-400 animate-spin" />
                      <span className="text-xs text-gray-400">Thinking...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-violet-500/20 bg-slate-900/80 backdrop-blur-sm flex-shrink-0">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Ask me anything about Udit..."
                      rows={1}
                      disabled={isTyping}
                      className="w-full resize-none bg-slate-800/90 border border-slate-700/50 rounded-xl px-4 py-3 pr-10 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      style={{ maxHeight: "120px" }}
                    />
                    {input && (
                      <button
                        onClick={() => setInput("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                        aria-label="Clear input"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isTyping}
                    className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 p-3 rounded-xl text-white shadow-lg flex-shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="w-[18px] h-[18px]" />
                  </button>
                </div>
                <p className="text-[10px] text-gray-500 mt-2 text-center">
                  Powered by AI • Press Enter to send • Shift+Enter for new line
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.4);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
        
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-in {
          animation: slideInFromBottom 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default PortfolioChatbot;