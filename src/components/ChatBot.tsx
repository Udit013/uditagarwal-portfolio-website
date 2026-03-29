import { useState, useRef, useEffect, useCallback } from "react";
import {
  MessageCircle, X, Send, RotateCcw,
  User, Copy, Check, ChevronDown,
} from "lucide-react";
import knowledgeBase from "@/data/knowledgeBase"; // adjust path if needed

// ─── STATIC SUGGESTIONS shown before first message ────────────────────────────
const QUICK_PROMPTS = [
  "What are his technical skills?",
  "Show me his projects",
  "Tell me about his experience",
  "How can I contact him?",
];

// ─── KEYWORD → KB KEY MATCHER ─────────────────────────────────────────────────
const KEYWORD_MAP = {
  about:        ["who", "about", "udit", "background", "intro"],
  skills:       ["skill", "tech", "stack", "language", "framework", "tools", "coding", "expert"],
  projects:     ["project", "portfolio", "built", "app", "application", "demo", "work"],
  experience:   ["experience", "job", "role", "career", "employment", "consultant", "work"],
  education:    ["education", "degree", "university", "study", "gpa", "master", "bachelor", "school"],
  ai_ml:        ["machine learning", "deep learning", "neural", "ai", "ml", "tensorflow", "model", "bert"],
  data:         ["data", "etl", "analytics", "pipeline", "tableau", "dashboard", "sql"],
  publications: ["publication", "paper", "research", "ieee", "published", "conference"],
  contact:      ["contact", "email", "phone", "linkedin", "github", "reach", "hire", "connect"],
};

const FALLBACK = `I can help you learn about Udit. Try asking about:\n\n• Technical skills & tech stack\n• Projects & portfolio\n• Work experience\n• Education & publications\n• Contact & availability\n\nWhat would you like to know?`;

function findResponse(text) {
  const lower = text.toLowerCase();
  let best = null;
  let bestScore = 0;

  for (const [key, keywords] of Object.entries(KEYWORD_MAP)) {
    let score = 0;
    for (const kw of keywords) {
      if (lower.includes(kw)) score += kw.length;
    }
    if (score > bestScore && knowledgeBase[key]) {
      bestScore = score;
      best = knowledgeBase[key];
    }
  }

  if (!best) return { response: FALLBACK, suggestions: QUICK_PROMPTS.slice(0, 3) };
  return { response: best.response, suggestions: best.suggestions ?? [] };
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const PortfolioChatbot = () => {
  const [isOpen, setIsOpen]       = useState(false);
  const [messages, setMessages]   = useState([]);
  const [input, setInput]         = useState("");
  const [isTyping, setIsTyping]   = useState(false);
  const [copied, setCopied]       = useState(null);

  const endRef      = useRef(null);
  const inputRef    = useRef(null);
  const timerRef    = useRef(null);

  // ── scroll ──
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ── focus input when opened ──
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 120);
  }, [isOpen]);

  // ── welcome on first open ──
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: "assistant",
        content: "Hi, I'm Udit's assistant. Ask me anything about his work, skills, or background.",
        suggestions: QUICK_PROMPTS,
        id: Date.now(),
      }]);
    }
  }, [isOpen]);

  // ── send ──
  const handleSend = useCallback((text) => {
    const msg = (text ?? input).trim();
    if (!msg || isTyping) return;

    setInput("");
    setMessages((p) => [...p, { role: "user", content: msg, id: Date.now() }]);

    // typing indicator
    setIsTyping(true);
    const { response, suggestions } = findResponse(msg);

    timerRef.current = setTimeout(() => {
      setIsTyping(false);
      setMessages((p) => [...p, {
        role: "assistant",
        content: response,
        suggestions,
        id: Date.now(),
      }]);
    }, 620 + Math.min(response.length * 5, 900));
  }, [input, isTyping]);

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const reset = () => {
    clearTimeout(timerRef.current);
    setIsTyping(false);
    setInput("");
    setMessages([{
      role: "assistant",
      content: "Conversation cleared. How can I help you?",
      suggestions: QUICK_PROMPTS,
      id: Date.now(),
    }]);
  };

  const copyMsg = (content, id) => {
    navigator.clipboard.writeText(content);
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  };

  // ─── RENDER ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        .cb-root {
          --bg:      #0a0a0a;
          --surface: #111111;
          --raised:  #1a1a1a;
          --border:  #242424;
          --border2: #2e2e2e;
          --fg:      #e8e8e8;
          --muted:   #888888;
          --dim:     #444444;
          --accent:  #e8e8e8;
          --accent2: #c0c0c0;
          --user-bg: #1e1e1e;
          --send:    #ffffff;
          --send-fg: #0a0a0a;
          font-family: 'DM Sans', 'Instrument Sans', system-ui, sans-serif;
        }

        /* scrollbar */
        .cb-messages::-webkit-scrollbar { width: 4px; }
        .cb-messages::-webkit-scrollbar-track { background: transparent; }
        .cb-messages::-webkit-scrollbar-thumb {
          background: var(--border2); border-radius: 2px;
        }

        /* FAB */
        .cb-fab {
          position: fixed; bottom: 24px; right: 24px; z-index: 9999;
          width: 52px; height: 52px; border-radius: 50%;
          background: var(--fg); border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 24px rgba(0,0,0,0.6);
          transition: transform .2s, box-shadow .2s;
        }
        .cb-fab:hover { transform: scale(1.06); box-shadow: 0 6px 32px rgba(0,0,0,0.8); }
        .cb-fab:active { transform: scale(.96); }
        .cb-fab svg { color: #0a0a0a; }

        /* pulse dot */
        .cb-dot {
          position: absolute; top: 2px; right: 2px;
          width: 10px; height: 10px; border-radius: 50%;
          background: #4ade80;
          border: 2px solid #0a0a0a;
          animation: pulse-dot 2.4s ease infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: .6; transform: scale(.85); }
        }

        /* window */
        .cb-window {
          position: fixed; bottom: 88px; right: 24px; z-index: 9998;
          width: 380px; height: 560px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          display: flex; flex-direction: column; overflow: hidden;
          box-shadow: 0 24px 64px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.04) inset;
          animation: window-in .22s cubic-bezier(.16,1,.3,1);
        }
        @media (max-width: 480px) {
          .cb-window {
            width: calc(100vw - 24px); right: 12px;
            bottom: 80px; height: calc(100dvh - 100px);
          }
          .cb-fab { bottom: 16px; right: 16px; }
        }
        @keyframes window-in {
          from { opacity: 0; transform: translateY(12px) scale(.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* header */
        .cb-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 16px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }
        .cb-header-left { display: flex; align-items: center; gap: 10px; }
        .cb-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          background: var(--raised); border: 1px solid var(--border2);
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .cb-avatar-dot {
          position: absolute; bottom: 0; right: 0;
          width: 8px; height: 8px; border-radius: 50%;
          background: #4ade80; border: 1.5px solid var(--bg);
        }
        .cb-title { font-size: 13px; font-weight: 600; color: var(--fg); letter-spacing: -.01em; }
        .cb-sub   { font-size: 11px; color: var(--muted); margin-top: 1px; }
        .cb-icon-btn {
          background: none; border: none; cursor: pointer;
          color: var(--dim); padding: 6px; border-radius: 8px;
          display: flex; align-items: center;
          transition: color .15s, background .15s;
        }
        .cb-icon-btn:hover { color: var(--fg); background: var(--raised); }

        /* messages */
        .cb-messages {
          flex: 1; overflow-y: auto;
          padding: 16px; display: flex; flex-direction: column; gap: 16px;
        }

        /* message row */
        .cb-row { display: flex; gap: 8px; }
        .cb-row.user { flex-direction: row-reverse; }

        .cb-bubble-avatar {
          width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
          background: var(--raised); border: 1px solid var(--border2);
          display: flex; align-items: center; justify-content: center;
          margin-top: 2px;
        }
        .cb-bubble-avatar svg { color: var(--muted); }

        .cb-bubble-wrap { display: flex; flex-direction: column; gap: 4px; max-width: 82%; }
        .cb-row.user .cb-bubble-wrap { align-items: flex-end; }

        .cb-bubble {
          padding: 10px 14px;
          border-radius: 14px;
          font-size: 13px; line-height: 1.6;
          white-space: pre-wrap; word-break: break-word;
          position: relative;
        }
        .cb-bubble.assistant {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--fg);
          border-top-left-radius: 4px;
        }
        .cb-bubble.user {
          background: var(--raised);
          border: 1px solid var(--border2);
          color: var(--fg);
          border-top-right-radius: 4px;
        }

        /* copy btn */
        .cb-copy {
          position: absolute; top: 8px; right: 8px;
          opacity: 0; transition: opacity .15s;
          background: var(--bg); border: 1px solid var(--border2);
          border-radius: 6px; padding: 3px 5px;
          cursor: pointer; display: flex;
        }
        .cb-bubble.assistant:hover .cb-copy { opacity: 1; }
        .cb-copy svg { color: var(--muted); }
        .cb-copy:hover svg { color: var(--fg); }

        /* suggestions */
        .cb-suggestions { display: flex; flex-wrap: wrap; gap: 6px; padding-top: 2px; }
        .cb-chip {
          padding: 5px 11px;
          font-size: 11.5px;
          background: var(--surface);
          border: 1px solid var(--border2);
          border-radius: 20px; color: var(--muted);
          cursor: pointer; font-family: inherit;
          transition: border-color .15s, color .15s, background .15s;
        }
        .cb-chip:hover { border-color: var(--dim); color: var(--fg); background: var(--raised); }

        /* typing dots */
        .cb-typing {
          display: flex; align-items: center; gap: 5px;
          padding: 10px 14px;
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 14px; border-top-left-radius: 4px;
          width: fit-content;
        }
        .cb-dot-typing {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--dim); animation: dot-bounce .9s ease infinite;
        }
        .cb-dot-typing:nth-child(2) { animation-delay: .15s; }
        .cb-dot-typing:nth-child(3) { animation-delay: .30s; }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: .4; }
          40%            { transform: translateY(-5px); opacity: 1; }
        }

        /* input area */
        .cb-input-area {
          padding: 12px 14px 14px;
          border-top: 1px solid var(--border);
          flex-shrink: 0;
        }
        .cb-input-row {
          display: flex; align-items: flex-end; gap: 8px;
          background: var(--surface);
          border: 1px solid var(--border2);
          border-radius: 12px;
          padding: 10px 10px 10px 14px;
          transition: border-color .2s;
        }
        .cb-input-row:focus-within { border-color: var(--dim); }
        .cb-textarea {
          flex: 1; resize: none; background: transparent; border: none;
          outline: none; font-family: inherit;
          font-size: 13px; line-height: 1.5;
          color: var(--fg); max-height: 100px;
        }
        .cb-textarea::placeholder { color: var(--dim); }
        .cb-send {
          width: 32px; height: 32px; border-radius: 8px; border: none;
          background: var(--send); color: var(--send-fg);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; flex-shrink: 0;
          transition: opacity .15s, transform .15s;
        }
        .cb-send:disabled { opacity: .25; cursor: default; }
        .cb-send:not(:disabled):hover { transform: scale(1.05); }
        .cb-send:not(:disabled):active { transform: scale(.95); }

        .cb-footer {
          text-align: center; font-size: 10.5px;
          color: var(--dim); margin-top: 8px; letter-spacing: .01em;
        }

        /* fade-up entry */
        @keyframes msg-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cb-row { animation: msg-in .2s ease forwards; }
      `}</style>

      <div className="cb-root">
        {/* ── FAB ── */}
        <button
          className="cb-fab"
          onClick={() => setIsOpen((p) => !p)}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen
            ? <ChevronDown size={20} />
            : <>
                <MessageCircle size={20} />
                <span className="cb-dot" />
              </>
          }
        </button>

        {/* ── WINDOW ── */}
        {isOpen && (
          <div className="cb-window">

            {/* HEADER */}
            <div className="cb-header">
              <div className="cb-header-left">
                <div className="cb-avatar">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" style={{ color: "var(--muted)" }}>
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                  </svg>
                  <span className="cb-avatar-dot" />
                </div>
                <div>
                  <div className="cb-title">Udit's Assistant</div>
                  <div className="cb-sub">Online · replies instantly</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 2 }}>
                <button className="cb-icon-btn" onClick={reset} title="Reset">
                  <RotateCcw size={15} />
                </button>
                <button className="cb-icon-btn" onClick={() => setIsOpen(false)} title="Close">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* MESSAGES */}
            <div className="cb-messages">
              {messages.map((msg, i) => {
                const isLast = i === messages.length - 1;
                return (
                  <div key={msg.id} className={`cb-row ${msg.role}`}>
                    {msg.role === "assistant" && (
                      <div className="cb-bubble-avatar">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="3" />
                          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                        </svg>
                      </div>
                    )}

                    <div className="cb-bubble-wrap">
                      <div className={`cb-bubble ${msg.role}`}>
                        {msg.content}
                        {msg.role === "assistant" && (
                          <button
                            className="cb-copy"
                            onClick={() => copyMsg(msg.content, msg.id)}
                            title="Copy"
                          >
                            {copied === msg.id
                              ? <Check size={12} style={{ color: "#4ade80" }} />
                              : <Copy size={12} />}
                          </button>
                        )}
                      </div>

                      {/* suggestions only on last assistant message */}
                      {msg.role === "assistant" && isLast && !isTyping && msg.suggestions?.length > 0 && (
                        <div className="cb-suggestions">
                          {msg.suggestions.map((s, j) => (
                            <button key={j} className="cb-chip" onClick={() => handleSend(s)}>
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {msg.role === "user" && (
                      <div className="cb-bubble-avatar">
                        <User size={12} style={{ color: "var(--muted)" }} />
                      </div>
                    )}
                  </div>
                );
              })}

              {isTyping && (
                <div className="cb-row assistant" style={{ animation: "msg-in .2s ease forwards" }}>
                  <div className="cb-bubble-avatar">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" style={{ color: "var(--muted)" }}>
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                    </svg>
                  </div>
                  <div className="cb-typing">
                    <span className="cb-dot-typing" />
                    <span className="cb-dot-typing" />
                    <span className="cb-dot-typing" />
                  </div>
                </div>
              )}

              <div ref={endRef} />
            </div>

            {/* INPUT */}
            <div className="cb-input-area">
              <div className="cb-input-row">
                <textarea
                  ref={inputRef}
                  className="cb-textarea"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask anything…"
                  rows={1}
                  disabled={isTyping}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px";
                  }}
                />
                <button
                  className="cb-send"
                  disabled={!input.trim() || isTyping}
                  onClick={() => handleSend()}
                  aria-label="Send"
                >
                  <Send size={14} />
                </button>
              </div>
              <p className="cb-footer">Enter to send · Shift+Enter for new line</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PortfolioChatbot;