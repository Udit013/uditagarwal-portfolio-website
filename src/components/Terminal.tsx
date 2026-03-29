import { useState, useRef, useEffect, useCallback } from "react";
import { Terminal } from "lucide-react";
import knowledgeBase from "@/data/knowledgeBase"; // adjust path if needed

// ─── ALIASES ──────────────────────────────────────────────────────────────────
const ALIASES = {
  whoami: "about",
  ls: "projects",
  stack: "skills",
  work: "experience",
  pub: "publications",
  ml: "ai_ml",
  ai: "ai_ml",
};

const URL_COMMANDS = {
  resume:   () => window.open("/resume.pdf", "_blank"),
  linkedin: () => window.open("https://linkedin.com/in/udit013", "_blank"),
  github:   () => window.open("https://github.com/Udit013", "_blank"),
  website:  () => window.open("https://uditagarwal-website.vercel.app", "_blank"),
};

const ALL_COMMANDS = [
  "about", "skills", "projects", "experience", "education",
  "ai_ml", "data", "publications", "contact",
  "resume", "linkedin", "github", "website", "clear", "help",
];

// ─── RICH JSX RENDERERS (pull data from KB) ───────────────────────────────────
const RICH_OUTPUT = {
  help: () => (
    <div className="space-y-1">
      <p style={{ color: "var(--accent)" }} className="mb-2 font-semibold tracking-widest text-xs uppercase">
        Available Commands
      </p>
      {[
        ["about",        "Who is Udit"],
        ["skills",       "Technical skill set"],
        ["projects",     "Notable work"],
        ["experience",   "Work history"],
        ["education",    "Academic background"],
        ["ai_ml",        "AI & ML expertise"],
        ["data",         "Data engineering & analytics"],
        ["publications", "Research & IEEE paper"],
        ["contact",      "Reach out"],
        ["resume",       "Open resume PDF"],
        ["linkedin",     "Open LinkedIn"],
        ["github",       "Open GitHub"],
        ["website",      "Open portfolio site"],
        ["clear",        "Clear terminal"],
      ].map(([cmd, desc]) => (
        <div key={cmd} className="flex gap-3 text-sm">
          <span style={{ color: "var(--cmd)" }} className="w-28 shrink-0 font-mono">{cmd}</span>
          <span style={{ color: "var(--muted)" }}>{desc}</span>
        </div>
      ))}
      <p style={{ color: "var(--dim)" }} className="text-xs mt-3 leading-relaxed">
        Aliases: <span style={{ color: "var(--cmd)" }}>whoami</span>→about &nbsp;·&nbsp;
        <span style={{ color: "var(--cmd)" }}>ls</span>→projects &nbsp;·&nbsp;
        <span style={{ color: "var(--cmd)" }}>stack</span>→skills &nbsp;·&nbsp;
        <span style={{ color: "var(--cmd)" }}>work</span>→experience &nbsp;·&nbsp;
        <span style={{ color: "var(--cmd)" }}>ai</span>/<span style={{ color: "var(--cmd)" }}>ml</span>→ai_ml
      </p>
    </div>
  ),

  about: () => (
    <div className="space-y-2">
      <Label>About Udit Agarwal</Label>
      <p className="text-sm leading-relaxed" style={{ color: "var(--fg)" }}>
        AI Engineer & Full-Stack Developer pursuing an MS in Computer Science at{" "}
        <span style={{ color: "var(--accent)" }}>Indiana University Bloomington</span>{" "}
        <span style={{ color: "var(--accent)" }}>(GPA: 3.82 / 4.0)</span>.
      </p>
      <p className="text-sm leading-relaxed" style={{ color: "var(--fg)" }}>
        Passionate about building intelligent, scalable systems — from IEEE-published deep learning
        research to production full-stack platforms. Background spans AI/ML, full-stack dev,
        data engineering, and cloud systems.
      </p>
      <p className="text-sm mt-1" style={{ color: "var(--hi)" }}>
        🎯 Seeking SWE · AI/ML · Data roles — available May 2026
      </p>
    </div>
  ),

  skills: () => (
    <div className="space-y-2">
      <Label>Technical Skills</Label>
      {[
        ["Languages",       "Python, JavaScript, TypeScript, C/C++, SQL"],
        ["Frontend",        "React, Next.js, HTML, CSS, Tailwind CSS"],
        ["Backend",         "Node.js, Express.js, FastAPI, REST APIs"],
        ["Databases",       "PostgreSQL, MySQL, MongoDB, Redis"],
        ["AI / ML",         "TensorFlow, PyTorch, Scikit-learn, CNNs, LSTMs, NLP"],
        ["NLP & LLMs",      "BERT, DeBERTa, Hugging Face, Gemini API, Vapi AI, Prompt Engineering"],
        ["Data Eng.",       "ETL Pipelines, Data Modeling, Batch Processing, Airflow"],
        ["Analytics",       "Pandas, NumPy, Matplotlib, Tableau, Chart.js"],
        ["Cloud & DevOps",  "AWS, Docker, CI/CD, Git, Postman"],
        ["Systems",         "System Design, Distributed Systems, Caching, Auth, API Design"],
      ].map(([label, val]) => (
        <div key={label} className="text-sm flex flex-wrap gap-1">
          <span style={{ color: "var(--cmd)" }} className="shrink-0 w-28">{label}:</span>
          <span style={{ color: "var(--fg)" }}>{val}</span>
        </div>
      ))}
    </div>
  ),

  projects: () => (
    <div className="space-y-3">
      <Label>Notable Projects</Label>
      {[
        {
          title: "AI Mock Interview Platform",
          tech: "Next.js · Firebase · Node.js · Vapi AI · Gemini API",
          desc: "Full-stack AI platform with real-time voice interviews, LLM-driven question generation, and structured feedback evaluation.",
        },
        {
          title: "Screen Recording & Video Sharing",
          tech: "Next.js · TypeScript · Bunny.net · Xata · Drizzle ORM",
          desc: "Secure uploads, CDN delivery, authentication, privacy controls, and AI-generated transcripts.",
        },
        {
          title: "Automated Secrets Scanner",
          tech: "Python · FastAPI · PostgreSQL",
          desc: "Detects hardcoded secrets via pattern matching and entropy analysis; dashboard for visualizing security risks.",
        },
        {
          title: "Retail Analytics Platform",
          tech: "Next.js · PostgreSQL · Drizzle ORM · Chart.js",
          desc: "Normalized schema (10k+ records), ETL pipelines, business insight dashboards. Deployed on Vercel + Supabase.",
        },
        {
          title: "Business Analytics Dashboard",
          tech: "React · Node.js · PostgreSQL · Tableau",
          desc: "KPI tracking, trend analysis, forecasting, and scenario-based decision support.",
        },
        {
          title: "User Behavior Analytics Pipeline",
          tech: "Python · PostgreSQL · Airflow · Tableau",
          desc: "ETL workflows ingesting simulated app logs; engagement and retention dashboards.",
        },
        {
          title: "Brain Tumor Classification",
          tech: "Python · TensorFlow · CNNs — IEEE 2024",
          desc: "99.84% accuracy on 7,000+ MRI scans. Benchmarked CNN, VGG16, InceptionV3, EfficientNet.",
        },
        {
          title: "Aphasia Detection · DeBERTa-v3",
          tech: "Python · DeBERTa-v3 · NLP",
          desc: "Fine-tuned on clinical transcripts — F1: 0.90. Custom preprocessing for dysfluency and annotation cleaning.",
        },
        {
          title: "LLM Text Detection",
          tech: "Python · BERT · NLP",
          desc: "Transformer classifier at 95%+ accuracy distinguishing AI-generated vs human-written content.",
        },
        {
          title: "Stock Market Prediction",
          tech: "Python · TensorFlow · LSTM",
          desc: "LSTM time series model predicting stock price trends from historical financial data.",
        },
      ].map((p) => (
        <div key={p.title} className="border-l-2 pl-3 text-sm space-y-0.5"
          style={{ borderColor: "var(--cmd)" }}>
          <p style={{ color: "var(--hi)" }} className="font-semibold">{p.title}</p>
          <p style={{ color: "var(--dim)" }} className="text-xs">{p.tech}</p>
          <p style={{ color: "var(--fg)" }}>{p.desc}</p>
        </div>
      ))}
    </div>
  ),

  experience: () => (
    <div className="space-y-3">
      <Label>Work Experience</Label>
      {[
        {
          role: "Software Engineer — Global Health Impact Project",
          org: "Indiana University | Feb 2026 – Present (Volunteer)",
          bullets: [
            "Building a data-driven platform to analyze pharmaceutical interventions across populations",
            "Developing full-stack features (React, TypeScript, Python) for forecasting and analytics",
            "Designing scalable APIs and data pipelines to evaluate treatment coverage and health outcomes",
            "Translating cross-functional research requirements into production-ready solutions",
          ],
        },
        {
          role: "IT Consultant — UITS",
          org: "Indiana University | Aug 2025 – Present",
          bullets: [
            "Resolved 100+ technical issues weekly across enterprise systems",
            "Applied structured root-cause analysis to reduce recurring system issues",
            "Managed identity and access systems ensuring secure, seamless authentication",
            "Documented support workflows to improve operational efficiency",
          ],
        },
      ].map((e) => (
        <div key={e.role} className="border-l-2 pl-3 text-sm space-y-1"
          style={{ borderColor: "var(--cmd)" }}>
          <p style={{ color: "var(--hi)" }} className="font-semibold">{e.role}</p>
          <p style={{ color: "var(--dim)" }} className="text-xs">{e.org}</p>
          <ul className="space-y-0.5 mt-1" style={{ color: "var(--fg)" }}>
            {e.bullets.map((b) => <li key={b}>› {b}</li>)}
          </ul>
        </div>
      ))}
    </div>
  ),

  education: () => (
    <div className="space-y-3">
      <Label>Education</Label>
      {[
        {
          school: "Indiana University Bloomington",
          period: "Aug 2024 – May 2026",
          degree: "MS Computer Science",
          gpa: "3.82 / 4.0",
          note: "Applied Algorithms · Applied ML · Advanced DB · Cloud Computing · LLMs · Software Engineering",
        },
        {
          school: "KIIT University, India",
          period: "Aug 2020 – May 2024",
          degree: "BTech Computer Science & Engineering",
          gpa: "8.85 / 10.0",
          note: null,
        },
      ].map((e) => (
        <div key={e.school} className="border-l-2 pl-3 text-sm space-y-0.5"
          style={{ borderColor: "var(--cmd)" }}>
          <p style={{ color: "var(--hi)" }} className="font-semibold">{e.school}</p>
          <p style={{ color: "var(--dim)" }} className="text-xs">{e.period}</p>
          <p style={{ color: "var(--fg)" }}>
            {e.degree} · <span style={{ color: "var(--accent)" }}>GPA {e.gpa}</span>
          </p>
          {e.note && <p style={{ color: "var(--dim)" }} className="text-xs">{e.note}</p>}
        </div>
      ))}
    </div>
  ),

  ai_ml: () => (
    <div className="space-y-3">
      <Label>AI & Machine Learning</Label>
      {[
        {
          area: "Deep Learning",
          items: ["CNNs, LSTMs, EfficientNet, VGG16, InceptionV3", "Brain Tumor Classification — 99.84% accuracy, IEEE 2024"],
        },
        {
          area: "NLP & Transformers",
          items: ["BERT, DeBERTa-v3, Hugging Face", "Aphasia Detection (F1: 0.90)", "LLM Text Detection — 95%+ accuracy"],
        },
        {
          area: "LLMs & Generative AI",
          items: ["Prompt Engineering, Gemini API, Vapi AI", "AI Mock Interview Platform — real-time voice + LLM feedback"],
        },
        {
          area: "Time Series & Forecasting",
          items: ["LSTM-based stock price prediction", "Forecasting pipelines for global health analytics"],
        },
        {
          area: "MLOps",
          items: ["Model evaluation, cross-validation, hyperparameter tuning", "Precision-recall trade-off analysis, experiment tracking"],
        },
      ].map((s) => (
        <div key={s.area} className="border-l-2 pl-3 text-sm space-y-0.5"
          style={{ borderColor: "var(--cmd)" }}>
          <p style={{ color: "var(--hi)" }} className="font-semibold">{s.area}</p>
          {s.items.map((it) => (
            <p key={it} style={{ color: "var(--fg)" }}>› {it}</p>
          ))}
        </div>
      ))}
    </div>
  ),

  data: () => (
    <div className="space-y-3">
      <Label>Data Engineering & Analytics</Label>
      <div className="space-y-2 text-sm">
        {[
          ["Engineering",    "ETL pipelines (Python, Airflow, PostgreSQL), normalized schema design, batch processing, data warehousing"],
          ["Analytics",      "Tableau dashboards for KPI tracking, retention, and trend analysis"],
          ["Visualization",  "Chart.js, Matplotlib for embedded and exploratory visualization"],
          ["Analysis",       "Statistical analysis and EDA using Pandas and NumPy"],
          ["Tools",          "Pandas, NumPy, Tableau, Chart.js, Matplotlib, PostgreSQL, MySQL, Airflow"],
        ].map(([label, val]) => (
          <div key={label} className="flex flex-wrap gap-1">
            <span style={{ color: "var(--cmd)" }} className="shrink-0 w-28">{label}:</span>
            <span style={{ color: "var(--fg)" }}>{val}</span>
          </div>
        ))}
      </div>
      <p style={{ color: "var(--accent)" }} className="text-xs mt-1 font-semibold">Key Projects</p>
      {[
        ["User Behavior Analytics Pipeline", "Airflow + PostgreSQL + Tableau"],
        ["Retail Analytics Platform",        "ETL + dashboards + PostgreSQL"],
        ["Business Analytics Dashboard",     "KPI tracking, forecasting, scenario analysis"],
        ["Global Health Platform",           "Forecasting models, population-level treatment analytics"],
      ].map(([p, t]) => (
        <div key={p} className="text-sm border-l-2 pl-3" style={{ borderColor: "var(--cmd)" }}>
          <span style={{ color: "var(--hi)" }}>{p}</span>
          <span style={{ color: "var(--dim)" }} className="text-xs"> · {t}</span>
        </div>
      ))}
    </div>
  ),

  publications: () => (
    <div className="space-y-2">
      <Label>Research Publication</Label>
      <div className="border-l-2 pl-3 text-sm space-y-1" style={{ borderColor: "var(--cmd)" }}>
        <p style={{ color: "var(--hi)" }} className="font-semibold leading-snug">
          "Identifying Various Types of Brain Tumors using Deep Neural Networks"
        </p>
        <p style={{ color: "var(--accent)" }} className="text-xs">
          IEEE ICC-ROBINS Conference, 2024
        </p>
        <p style={{ color: "var(--dim)" }} className="text-xs">
          DOI: 10.1109/ICC-ROBINS60238.2024.10533941
        </p>
        <ul className="mt-1 space-y-0.5" style={{ color: "var(--fg)" }}>
          <li>› 99.84% accuracy on 7,000+ MRI scans</li>
          <li>› Benchmarked CNN, VGG16, InceptionV3, EfficientNet</li>
          <li>› Focused on medical AI, model efficiency, and clinical applicability</li>
        </ul>
      </div>
    </div>
  ),

  contact: () => (
    <div className="space-y-2">
      <Label>Contact</Label>
      {[
        ["📧", "Email",     "agarwaludit13@gmail.com",          "mailto:agarwaludit13@gmail.com"],
        ["📱", "Phone",     "+1 (930) 904-4901",                 null],
        ["📍", "Location",  "Bloomington, IN (EST)",             null],
        ["💼", "LinkedIn",  "linkedin.com/in/udit013",           "https://linkedin.com/in/udit013"],
        ["💻", "GitHub",    "github.com/Udit013",                "https://github.com/Udit013"],
        ["🌐", "Portfolio", "uditagarwal-website.vercel.app",    "https://uditagarwal-website.vercel.app"],
      ].map(([icon, label, val, href]) => (
        <div key={label} className="text-sm flex gap-2">
          <span>{icon}</span>
          <span style={{ color: "var(--dim)" }} className="w-20 shrink-0">{label}:</span>
          {href
            ? <a href={href} target="_blank" rel="noopener noreferrer"
                style={{ color: "var(--cmd)" }} className="hover:underline">{val}</a>
            : <span style={{ color: "var(--cmd)" }}>{val}</span>}
        </div>
      ))}
      <p className="text-xs mt-2" style={{ color: "var(--hi)" }}>
        🎯 Actively seeking SWE · AI/ML · Data roles — available May 2026
      </p>
    </div>
  ),
};

// Small helper so label style is consistent
const Label = ({ children }) => (
  <p style={{ color: "var(--accent)" }} className="font-semibold tracking-widest text-xs uppercase mb-2">
    {children}
  </p>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const PortfolioTerminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [suggestions, setSuggestions] = useState([]);

  const inputRef = useRef(null);
  const termRef  = useRef(null);

  // ── auto-scroll ──
  useEffect(() => {
    termRef.current?.scrollTo({ top: termRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

  // ── suggestions ──
  useEffect(() => {
    const trimmed = input.trim().toLowerCase();
    setSuggestions(trimmed ? ALL_COMMANDS.filter((c) => c.startsWith(trimmed)) : []);
  }, [input]);

  // ── welcome ──
  useEffect(() => {
    setHistory([{
      cmd: "",
      node: (
        <div className="space-y-2">
          <pre style={{ color: "var(--accent)", lineHeight: 1.15, fontSize: 11 }} className="font-mono">
{`██╗   ██╗██████╗ ██╗████████╗
██║   ██║██╔══██╗██║╚══██╔══╝
██║   ██║██║  ██║██║   ██║
██║   ██║██║  ██║██║   ██║
╚██████╔╝██████╔╝██║   ██║
 ╚═════╝ ╚═════╝ ╚═╝   ╚═╝`}
          </pre>
          <p style={{ color: "var(--fg)" }} className="text-sm">
            Welcome to <span style={{ color: "var(--accent)" }}>Udit's Portfolio Terminal</span>
          </p>
          <p style={{ color: "var(--muted)" }} className="text-xs">
            Type <span style={{ color: "var(--cmd)" }}>help</span> to see all commands
            &nbsp;·&nbsp; ↑↓ for history &nbsp;·&nbsp; Tab to autocomplete
          </p>
        </div>
      ),
    }]);
  }, []);

  // ── command handler ──
  const handleCommand = useCallback((raw) => {
    let cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (ALIASES[cmd]) cmd = ALIASES[cmd];

    setCmdHistory((p) => [...p, cmd]);
    setHistIdx(-1);

    if (cmd === "clear") { setHistory([]); return; }

    // rich JSX renderers
    if (RICH_OUTPUT[cmd]) {
      setHistory((p) => [...p, { cmd, node: RICH_OUTPUT[cmd]() }]);
      return;
    }

    // URL openers
    if (URL_COMMANDS[cmd]) {
      URL_COMMANDS[cmd]();
      setHistory((p) => [...p, {
        cmd,
        node: <p style={{ color: "var(--accent)" }}>Opening {cmd}…</p>,
      }]);
      return;
    }

    // fallback to knowledge base plain text (shouldn't hit for known cmds)
    const kb = knowledgeBase[cmd];
    if (kb) {
      setHistory((p) => [...p, {
        cmd,
        node: <pre style={{ color: "var(--fg)", whiteSpace: "pre-wrap", lineHeight: 1.65 }}>{kb.response}</pre>,
      }]);
      return;
    }

    // not found
    setHistory((p) => [...p, {
      cmd,
      node: (
        <p style={{ color: "var(--err)" }}>
          Command not found: <span style={{ color: "var(--hi)" }}>{cmd}</span>
          {" "}— type <span style={{ color: "var(--cmd)" }}>help</span> for all commands.
        </p>
      ),
    }]);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!cmdHistory.length) return;
      const idx = histIdx === -1 ? cmdHistory.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx); setInput(cmdHistory[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const idx = histIdx + 1;
      if (idx >= cmdHistory.length) { setHistIdx(-1); setInput(""); }
      else { setHistIdx(idx); setInput(cmdHistory[idx]); }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length === 1) { setInput(suggestions[0]); setSuggestions([]); }
    }
  };

  // ─── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        :root {
          --bg:     #080c10;
          --panel:  #0d1117;
          --border: #1e2d3d;
          --accent: #00ffe1;
          --cmd:    #58a6ff;
          --hi:     #ffa657;
          --fg:     #c9d1d9;
          --muted:  #8b949e;
          --dim:    #484f58;
          --err:    #ff7b72;
          --glow:   0 0 12px rgba(0,255,225,0.35);
        }
        .term-scroll::-webkit-scrollbar { width: 5px; }
        .term-scroll::-webkit-scrollbar-track { background: transparent; }
        .term-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
        .scanlines {
          pointer-events: none; position: absolute; inset: 0; z-index: 10;
          background: repeating-linear-gradient(
            to bottom, transparent 0px, transparent 2px,
            rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px
          );
        }
        .cursor-block {
          display: inline-block; width: 8px; height: 14px;
          background: var(--accent); margin-left: 2px;
          vertical-align: middle; box-shadow: var(--glow);
          animation: cblink 1.1s step-end infinite;
        }
        @keyframes cblink { 50% { opacity: 0; } }
        .term-input { caret-color: transparent; }
        .term-input::selection { background: var(--accent); color: var(--bg); }
        .chip {
          display: inline-block; padding: 1px 7px;
          border: 1px solid var(--border); border-radius: 3px;
          color: var(--cmd); font-size: 11px; cursor: pointer;
          transition: border-color .15s, color .15s; font-family: inherit;
        }
        .chip:hover { border-color: var(--cmd); color: var(--accent); }
        .prompt-sym { color: var(--accent); text-shadow: var(--glow); font-size: 11px; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .entry { animation: fadeUp .16s ease forwards; }
      `}</style>

      <div
        style={{
          fontFamily: "'JetBrains Mono','Fira Code','Cascadia Code',monospace",
          background: "var(--bg)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow:
            "0 0 40px rgba(0,255,225,0.06), 0 0 2px rgba(0,255,225,0.18), 0 28px 56px rgba(0,0,0,0.7)",
        }}
        className="w-full max-w-2xl mx-auto"
      >
        {/* ── TITLE BAR ── */}
        <div
          style={{ background: "var(--panel)", borderBottom: "1px solid var(--border)" }}
          className="px-4 py-2.5 flex items-center justify-between select-none"
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
                <div key={i} style={{ background: c, width: 12, height: 12, borderRadius: "50%", opacity: 0.9 }} />
              ))}
            </div>
            <div className="flex items-center gap-1.5" style={{ color: "var(--muted)" }}>
              <Terminal style={{ width: 13, height: 13, color: "var(--accent)" }} />
              <span style={{ fontSize: 12 }}>portfolio@udit:~</span>
            </div>
          </div>
          <span style={{ color: "var(--dim)", fontSize: 11 }} className="hidden sm:block">
            Interactive Terminal
          </span>
        </div>

        {/* ── BODY ── */}
        <div style={{ position: "relative" }}>
          <div className="scanlines" />
          <div
            ref={termRef}
            className="term-scroll"
            onClick={() => inputRef.current?.focus()}
            style={{ padding: 16, height: 384, overflowY: "auto", cursor: "text", fontSize: 13 }}
          >
            {history.map((item, i) => (
              <div key={i} className="entry" style={{ marginBottom: 16 }}>
                {item.cmd && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span className="prompt-sym">❯</span>
                    <span style={{ color: "var(--cmd)", fontSize: 11 }}>~</span>
                    <span style={{ color: "var(--fg)" }}>{item.cmd}</span>
                  </div>
                )}
                <div style={{ marginLeft: item.cmd ? 20 : 0 }}>{item.node}</div>
              </div>
            ))}

            {/* ── INPUT LINE ── */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="prompt-sym">❯</span>
              <span style={{ color: "var(--cmd)", fontSize: 11 }}>~</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                spellCheck={false}
                autoComplete="off"
                className="term-input"
                style={{
                  flex: 1, background: "transparent", border: "none",
                  outline: "none", color: "var(--fg)", fontSize: 13,
                  fontFamily: "inherit",
                }}
              />
              <span className="cursor-block" />
            </div>

            {/* ── AUTOCOMPLETE CHIPS ── */}
            {suggestions.length > 0 && (
              <div style={{ marginLeft: 20, marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
                {suggestions.map((s) => (
                  <span
                    key={s}
                    className="chip"
                    onClick={(e) => {
                      e.stopPropagation();
                      setInput(s);
                      setSuggestions([]);
                      inputRef.current?.focus();
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioTerminal;