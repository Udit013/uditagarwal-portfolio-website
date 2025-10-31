"use client";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { MessageCircle, X, Send, Sparkles, Loader2, RefreshCw, User, Bot } from "lucide-react";
import knowledgeBase from "../data/knowledgeBase";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const PortfolioChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 🌀 Auto-scroll to latest message
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(scrollToBottom, [messages, isTyping]);

  // 📝 Auto-resize input
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const getGreeting = useCallback(() => {
    const hour = new Date().getHours();
    return hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  }, []);

  // 🧠 Core logic to find best match
  const findBestMatch = useCallback((userMessage: string) => {
    const msg = userMessage.toLowerCase();
    let best: { topic: string; score: number } | null = null;

    for (const [topic, item] of Object.entries(knowledgeBase)) {
      const score = item.keywords.filter(k => msg.includes(k)).length;
      if (score > 0 && (!best || score > best.score)) best = { topic, score };
    }

    return best ? knowledgeBase[best.topic] : null;
  }, []);

  // 💬 Response generator
  const generateResponse = useCallback(
    (userMessage: string): { response: string; suggestions?: string[] } => {
      const lower = userMessage.toLowerCase();

      // Greetings
      if (/^(hi|hello|hey|greetings|good (morning|afternoon|evening))$/.test(lower)) {
        return {
          response: `${getGreeting()}! 👋 I'm Udit's AI assistant. I can tell you about his skills, projects, experience, and more.`,
          suggestions: ["Show me his projects", "What are his skills?", "Tell me about his experience"],
        };
      }

      // Help
      if (lower.includes("help") || lower.includes("what can you") || lower.includes("capabilities")) {
        return {
          response:
            "I can provide detailed info about:\n• Skills & Tech Stack\n• Projects & Portfolio\n• Work Experience\n• Education & Certifications\n• Publications & Contact Info",
          suggestions: ["Show me skills", "Show me projects", "Contact info"],
        };
      }

      // Direct matches
      const matched = findBestMatch(userMessage);
      if (matched) {
        setConversationContext(prev => [...prev.slice(-2), matched.id]);
        return { response: matched.response, suggestions: matched.suggestions };
      }

      // Contextual fallback
      if (conversationContext.length) {
        const last = conversationContext[conversationContext.length - 1];
        const related = knowledgeBase[last]?.relatedTopics;
        if (related?.length) {
          return {
            response: `Would you like to hear about ${related.map(r => `his ${r}`).join(", ")}?`,
            suggestions: related.map(r => `Tell me about ${r}`),
          };
        }
      }

      return {
        response: `That's a great question! Try asking about projects, technical skills, experience, or how to contact him.`,
        suggestions: ["Show me projects", "What technologies does he use?", "How to contact him?"],
      };
    },
    [conversationContext, findBestMatch, getGreeting]
  );

  // ✍️ Typing simulation
  const typeMessage = useCallback((text: string, suggestions?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => {
        const last = prev[prev.length - 1];
        return [...prev.slice(0, -1), { ...last, content: text, suggestions }];
      });
      setIsTyping(false);
    }, 300 + Math.random() * 500);
  }, []);

  const handleSend = useCallback(
    (text?: string) => {
      const messageText = text || input.trim();
      if (!messageText || isTyping) return;

      setMessages(prev => [...prev, { role: "user", content: messageText, timestamp: new Date() }]);
      setInput("");

      setTimeout(() => {
        const { response, suggestions } = generateResponse(messageText);
        setMessages(prev => [...prev, { role: "assistant", content: "", timestamp: new Date() }]);
        typeMessage(response, suggestions);
      }, 400);
    },
    [input, isTyping, typeMessage, generateResponse]
  );

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // 🔄 Reset chat
  const resetChat = useCallback(() => {
    setMessages([
      {
        role: "assistant",
        content: `${getGreeting()}! 👋 I'm Udit's AI assistant.`,
        timestamp: new Date(),
        suggestions: ["Tell me about his projects", "What are his skills?", "How can I reach him?"],
      },
    ]);
    setConversationContext([]);
  }, [getGreeting]);

  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      resetChat();
    }
  }, [isOpen, hasGreeted, resetChat]);

  // 🧼 Pre-memoized UI components
  const renderMessage = useCallback(
    (m: Message, idx: number) => (
      <div key={idx} className="animate-in fade-in slide-in-from-bottom-3 duration-300">
        <div className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
          {m.role === "assistant" && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg">
              <Bot className="w-4 h-4 text-white" />
            </div>
          )}
          <div className={`max-w-[75%] ${m.role === "user" ? "order-first" : ""}`}>
            <div
              className={`px-4 py-3 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                m.role === "user"
                  ? "bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-lg"
                  : "bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 text-gray-100 shadow-xl"
              }`}
            >
              {m.content}
            </div>
            {m.suggestions?.length && (
              <div className="mt-2 flex flex-wrap gap-2">
                {m.suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s)}
                    className="px-3 py-1.5 text-xs bg-slate-800/80 text-violet-300 rounded-full border border-violet-500/30 hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-600 hover:text-white transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
          {m.role === "user" && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
              <User className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      </div>
    ),
    [handleSend]
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(o => !o)}
        className="fixed bottom-6 right-6 z-[9999] w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 shadow-2xl hover:scale-110 transition-all flex items-center justify-center"
      >
        {isOpen ? <X className="w-7 h-7 text-white" /> : <MessageCircle className="w-7 h-7 text-white" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[9998] w-[420px] h-[650px] rounded-3xl border border-violet-500/30 backdrop-blur-3xl bg-slate-900/95 shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-5 flex justify-between items-center text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">Udit's AI Assistant</h3>
                <p className="text-xs opacity-90 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={resetChat} className="hover:bg-white/20 p-2 rounded-lg">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 text-sm">
            {messages.map(renderMessage)}
            {isTyping && (
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-slate-800/60 border border-slate-700/50">
                  <Loader2 className="w-4 h-4 text-violet-400 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-violet-500/20 bg-slate-900/60">
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
                  className="w-full resize-none bg-slate-800/80 border border-slate-700/50 rounded-xl px-4 py-3 pr-12 text-sm text-gray-100 focus:ring-2 focus:ring-violet-500/50"
                />
                {input && (
                  <button
                    onClick={() => setInput("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:scale-105 disabled:opacity-50 transition-all p-3 rounded-xl text-white"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-gray-500 mt-2 text-center">Powered by AI • Press Enter to send</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioChatbot;
