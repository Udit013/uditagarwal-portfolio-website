import { useState } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Hi! I'm Udit's AI assistant. Ask me anything about his skills, projects, or experience!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickResponses: Record<string, string> = {
    skills: "Udit specializes in AI/ML with TensorFlow and Keras, Full-Stack development with React and Next.js, and cloud technologies like AWS and Firebase. He has hands-on experience with deep learning, CNNs, and NLP.",
    projects: "Udit has built impressive projects including:\n• Brain Tumor Classification (99.84% accuracy) 🧠\n• AI Mock Interview Platform with voice agents 🎤\n• LLM Text Detection System (95.25% accuracy) 📝\n• Full-Stack Video Platform with AI transcripts 🎥",
    education: "Udit is pursuing his MS in Computer Science at Indiana University Bloomington (GPA: 3.73/4) graduating in May 2026. He completed his B.Tech in CSE from KIIT (GPA: 3.54/4).",
    experience: "Udit currently works as an IT Consultant at Indiana University, handling cross-platform troubleshooting and enterprise IT systems. He's seeking full-time opportunities starting May 2026.",
    contact: "You can reach Udit at:\n📧 agarwaludit13@gmail.com\n📱 +1 (930) 904-4901\n💼 linkedin.com/in/udit013\n🐙 github.com/Udit013",
    default: "I can help you learn about Udit's skills, projects, education, experience, or contact information. What would you like to know?",
  };

  const generateResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes("skill") || msg.includes("technology") || msg.includes("tech stack")) {
      return quickResponses.skills;
    }
    if (msg.includes("project") || msg.includes("work") || msg.includes("built")) {
      return quickResponses.projects;
    }
    if (msg.includes("education") || msg.includes("degree") || msg.includes("university") || msg.includes("study")) {
      return quickResponses.education;
    }
    if (msg.includes("experience") || msg.includes("job") || msg.includes("work")) {
      return quickResponses.experience;
    }
    if (msg.includes("contact") || msg.includes("email") || msg.includes("phone") || msg.includes("reach")) {
      return quickResponses.contact;
    }
    if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
      return "Hello! 👋 I'm here to help you learn about Udit's impressive portfolio. Feel free to ask about his skills, projects, education, or how to get in touch!";
    }
    
    return quickResponses.default;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(input);
      const assistantMessage: Message = { role: "assistant", content: response };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full shadow-2xl flex items-center justify-center hover:scale-110 smooth-transition animate-pulse-glow"
      >
        {isOpen ? (
          <X className="w-8 h-8 text-white" />
        ) : (
          <MessageCircle className="w-8 h-8 text-white" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[32rem] glass rounded-2xl shadow-2xl flex flex-col overflow-hidden border-2 border-primary/30 animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-white">AI Assistant</h3>
              <p className="text-xs text-white/80">Ask me about Udit</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start space-x-2 ${
                  message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user" ? "bg-primary" : "bg-accent"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] rounded-2xl p-3 ${
                    message.role === "user"
                      ? "bg-primary text-white"
                      : "glass text-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="glass rounded-2xl p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 bg-background/50 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {["Skills", "Projects", "Contact"].map((action) => (
                <button
                  key={action}
                  onClick={() => {
                    setInput(action);
                    setTimeout(() => handleSend(), 100);
                  }}
                  className="px-3 py-1 text-xs bg-secondary hover:bg-primary hover:text-white rounded-full smooth-transition"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 bg-background/50 border-t border-border">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 bg-background border-border"
              />
              <Button
                onClick={handleSend}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
