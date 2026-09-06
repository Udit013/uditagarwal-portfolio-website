/**
 * terminal.ts — knowledge base + chat FAQ for the interactive terminal.
 * The string values may contain HTML (rendered via dangerouslySetInnerHTML,
 * exactly as in the original vanilla implementation — content is static/trusted).
 */

export const KB: Record<string, string> = {
  help: `<span class="t-sys">Portfolio Terminal  ·  Commands:</span>
─────────────────────────────────────────────
<span class="t-hi">about</span>          Who is Udit
<span class="t-hi">skills</span>         Full tech stack
<span class="t-hi">experience</span>     Work history
<span class="t-hi">projects</span>       Flagship projects
<span class="t-hi">education</span>      Academic background
<span class="t-hi">research</span>       IEEE publication &amp; AI/ML
<span class="t-hi">certifications</span> DeepLearning.AI &amp; AWS
<span class="t-hi">contact</span>        How to reach Udit
<span class="t-hi">now</span>            What Udit is currently doing
<span class="t-hi">github</span>         Open GitHub
<span class="t-hi">resume</span>         Open resume PDF
<span class="t-hi">linkedin</span>       Open LinkedIn
<span class="t-hi">chat</span>           Ask me anything
<span class="t-hi">history</span>        Show command history
<span class="t-hi">date</span>           Show current date/time
<span class="t-hi">clear</span>          Clear output
<span class="t-sys">Tip: press \` to toggle  ·  Tab autocompletes  ·  ↑↓ history</span>`,

  about: `<span class="t-hi">Udit Agarwal</span>  ·  Software Engineer &amp; AI/ML Researcher

MS Computer Science @ Indiana University Bloomington
GPA: <span class="t-hi">3.84 / 4.0</span>  ·  May 2026

Building intelligent, scalable systems at the intersection of
full-stack engineering and applied AI/ML. IEEE-published researcher.

<span class="t-hi">Currently:</span>
  Senior Consultant @ Heartland Community Network
  Consultant – IT Services @ UITS, Indiana University

Email: agarwaludit13@gmail.com  ·  Phone: +1 (930) 904-4901
<span class="t-sys">Open to full-time SWE · AI/ML · Data roles</span>`,

  skills: `<span class="t-hi">Languages</span>     Python · TypeScript · JavaScript · Java · C/C++ · SQL
<span class="t-hi">Frontend</span>      React · Next.js · Tailwind · GSAP · Three.js/WebGL · ECharts
<span class="t-hi">Backend</span>       Node.js · Fastify · FastAPI · REST · WebSockets · SSE
<span class="t-hi">Databases</span>     PostgreSQL · MySQL · MongoDB · Redis · Drizzle · Prisma
<span class="t-hi">AI / ML</span>       PyTorch · TensorFlow · Hugging Face · BERT · ONNX · Grad-CAM
<span class="t-hi">LLMs</span>          QLoRA · PEFT · Qwen2.5 · Gemini API · Ollama · RAG · vLLM
<span class="t-hi">Data</span>          Pandas · NumPy · Airflow · Tableau · Forecasting · ETL
<span class="t-hi">Cloud / Sec</span>   AWS · Docker · CI/CD · Vercel · SARIF · Secrets Detection
<span class="t-hi">Testing</span>       Vitest · Unit Testing · Backtesting · A/B · Calibration`,

  experience: `<span class="t-hi">[ Jun 2026 – Present ]</span>  Senior Consultant
  Heartland Community Network (HCN) · Remote
  → Full-stack apps, REST APIs, analytics dashboards &amp; automation for clients
  → AI-powered solutions with LLMs, analytics &amp; workflow automation
  → Own the full SDLC: design → build → test → deploy → maintain
  Stack: Full-Stack, LLMs/AI, REST APIs, Automation, Analytics

<span class="t-hi">[ Aug 2025 – Present ]</span>  Consultant – IT Services
  UITS · Indiana University
  → 100+ issues/week across enterprise systems
  → Identity &amp; access management · root-cause analysis
  → Documented workflows in ServiceNow

<span class="t-hi">[ Jan 2026 – May 2026 ]</span>  Software Engineer
  Global Health Impact Project · Indiana University
  → Full-stack health analytics (React, TypeScript, Python)
  → Backend services &amp; data pipelines for forecasting and outcomes
  → REST APIs powering analytics dashboards · perf optimization`,

  projects: `<span class="t-hi">01</span>  Brain Tumor Classification      [AI/ML] · <span class="t-link">IEEE ICC-ROBINS 2024</span>
    EfficientNetB3 · 99.84% (published) · ONNX + FastAPI serving
<span class="t-hi">02</span>  Biomedical AI Research Assistant [AI/ML] · <span class="t-link">live</span>
    Qwen2.5-7B QLoRA · RAG · LangGraph agents · pgvector
<span class="t-hi">03</span>  AI Interview Simulator          [AI/ML · Full-Stack] · <span class="t-link">live</span>
    Gemini 2.5 · Web Speech · Monaco + Pyodide/WASM · $0 infra
<span class="t-hi">04</span>  Decision Intelligence Engine    [Analytics] · <span class="t-link">live</span>
    3 products, 1 core engine · walk-forward backtesting
<span class="t-hi">05</span>  Pharmacy ERP (RxFlow)           [Full-Stack] · <span class="t-link">live</span>
    Multi-tenant · GST billing · real-time sync (SSE)
<span class="t-hi">06</span>  Screen Recording &amp; Sharing      [Full-Stack] · <span class="t-link">live</span>
    Next.js · Cloudinary · AI chapters · better-auth
<span class="t-hi">07</span>  Secret Exposure Detection       [Systems] · <span class="t-link">live</span>
    FastAPI · entropy + regex · SARIF · 0.94 F1`,

  education: `<span class="t-hi">MS Computer Science</span>  ·  Indiana University Bloomington
  Aug 2024 – May 2026  ·  GPA: <span class="t-hi">3.84 / 4.0</span>
  Applied ML · Advanced DB · Cloud Computing · LLMs · Algorithms

<span class="t-hi">B.Tech CS &amp; Engineering</span>  ·  KIIT University, India
  Aug 2020 – May 2024  ·  GPA: <span class="t-hi">8.85 / 10.0</span>`,

  research: `<span class="t-hi">IEEE Publication</span>
"Identifying Various Types of Brain Tumors using Deep Neural Network based Image Features"
ICC-ROBINS 2024  ·  DOI: 10.1109/ICC-ROBINS60238.2024.10533941

Model:    EfficientNetB3 + CNN/VGG16/InceptionV3 benchmarks
Dataset:  <span class="t-hi">7,023 MRI scans</span>
Result:   <span class="t-hi">99.84% classification accuracy</span> (published)
Role:     Co-author

<span class="t-hi">Production ML &amp; LLM work:</span>
  Brain Tumor · ONNX serving · confidence calibration · Grad-CAM explainability
  Biomedical AI Assistant · Qwen2.5-7B QLoRA · cited RAG · LangGraph 4-agent workflow
  Transformers · BERT · Prompt Engineering · RAG`,

  certifications: `<span class="t-hi">DeepLearning.AI</span>
  Neural Networks and Deep Learning
  Credential: ZKQGVGVJGDX7 · Sep 2023

  Improving Deep Neural Networks: Hyperparameter Tuning
  Credential: ZLN2LZ2YZNLE · Sep 2023

<span class="t-hi">Amazon Web Services</span>
  AWS Academy Graduate: Cloud Semester 1 · Jul 2023`,

  contact: `<span class="t-hi">Email</span>     agarwaludit13@gmail.com
<span class="t-hi">Phone</span>     +1 (930) 904-4901
<span class="t-hi">LinkedIn</span>  linkedin.com/in/udit013
<span class="t-hi">GitHub</span>    github.com/Udit013
<span class="t-hi">Portfolio</span> uditagarwal.vercel.app

<span class="t-sys">Open to full-time SWE · AI/ML · Data roles</span>`,

  now: `<span class="t-hi">Currently exploring:</span>

🧠  LLM agents &amp; multi-agent orchestration (LangGraph)
🔬  Retrieval-augmented generation over scientific literature
🎙  Browser-native voice AI (Web Speech API + Gemini)
🧩  WebAssembly &amp; in-browser code execution (Pyodide)
☁️  Cloud-native distributed systems design

<span class="t-sys">Side interests: Open source · Research writing · Systems programming</span>`,

  github: '__open__https://github.com/Udit013',
  resume: '__open__/resume.pdf',
  linkedin: '__open__https://linkedin.com/in/udit013',
  chat: '__chat__',

  /* Aliases */
  whoami: 'about',
  ls: 'projects',
  stack: 'skills',
  work: 'experience',
  ai: 'research',
  ml: 'research',
  pub: 'research',
  certs: 'certifications',
}

export const CHAT_FAQ: { q: RegExp; a: string }[] = [
  { q: /hire|job|full.?time|intern|open.?to|available|role/i, a: 'Udit is open to full-time SWE, AI/ML, and Data roles. Open to remote, hybrid, and relocation anywhere in the US. Email: agarwaludit13@gmail.com · Phone: +1 (930) 904-4901' },
  { q: /ieee|research|paper|publish|brain.?tumor/i, a: 'Udit co-authored an IEEE paper at ICC-ROBINS 2024 on brain tumor classification: 99.84% accuracy on 7,023 MRI scans with EfficientNetB3. DOI: 10.1109/ICC-ROBINS60238.2024.10533941' },
  { q: /gpa|grade|school|degree|university|master|indiana/i, a: 'MS CS at Indiana University Bloomington, GPA 3.84/4.0, May 2026. B.Tech at KIIT, GPA 8.85/10.0.' },
  { q: /skill|tech|stack|language|python|react|framework/i, a: 'Python, TypeScript, React, Next.js, Node.js, Fastify, FastAPI, PostgreSQL, PyTorch, TensorFlow, Hugging Face, QLoRA, Gemini API, Ollama, Docker, AWS. Type "skills" for the full list.' },
  { q: /project|built|app|demo|portfolio/i, a: '7 flagship projects: brain tumor classification (IEEE), the AI Interview Simulator, a cited biomedical AI research assistant (RAG + QLoRA), a screen-recording platform, the Decision Intelligence Engine, a multi-tenant pharmacy ERP (RxFlow), and Secret Exposure Detection. Type "projects" for all.' },
  { q: /contact|email|phone|reach|talk/i, a: 'agarwaludit13@gmail.com · +1 (930) 904-4901 · linkedin.com/in/udit013 · Responds within 24h.' },
  { q: /llm|voice|gemini|vapi|gpt|generative|qlora|fine.?tun|rag|agent/i, a: 'LLM work spans QLoRA/PEFT fine-tuning (Qwen2.5-7B), cited RAG over PubMed with pgvector, LangGraph multi-agent workflows with per-claim citation verification, Gemini API, Ollama, and LLM evaluation with lm-evaluation-harness. Built a live biomedical AI research assistant and voice interviews on browser-native speech + Gemini.' },
  { q: /data|etl|tableau|airflow|pipeline|analytics|forecast/i, a: 'Strong data engineering & analytics: ETL pipelines, PostgreSQL, forecasting, cohort retention, and A/B testing; see the Decision Intelligence Engine, which unifies three analytics products on one core engine with auditable, calibrated metrics (walk-forward backtesting, Brier/ECE).' },
  { q: /location|remote|reloc|where/i, a: 'Based in Bloomington, IN (EST). Open to remote, hybrid, and relocation.' },
  { q: /cert|aws|deeplearning/i, a: 'Certifications: DeepLearning.AI Neural Networks & Improving DNNs (Sep 2023), AWS Academy Cloud Graduate (Jul 2023).' },
  { q: /now|current|exploring/i, a: 'Currently: LLM Agents, Health AI platform at IU, real-time voice AI, ETL patterns, cloud-native systems.' },
]
