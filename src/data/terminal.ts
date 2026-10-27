/**
 * terminal.ts — knowledge base + chat FAQ for the interactive terminal.
 * The string values may contain HTML (rendered via dangerouslySetInnerHTML,
 * exactly as in the original vanilla implementation — content is static/trusted).
 *
 * Per-project commands (`prepwise`, `cipherwatch`, …) and their chat answers
 * are generated from PROJECTS in content.ts, so the terminal can't drift from
 * the project cards and case-study drawers.
 */
import { PROJECTS, type Project } from './content'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const link = (href: string, text: string) =>
  `<a class="t-link" href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`

/** "PrepWise - AI Voice Interview Platform" → command "prepwise" */
const projectKey = (p: Project) => p.title.split(' - ')[0].trim().toLowerCase().replace(/[^a-z0-9]/g, '')

function projectDetail(p: Project): string {
  const [name, subtitle] = p.title.split(' - ')
  const stats = (p.stats ?? []).map((s) => `<span class="t-hi">${esc(s.value + (s.suffix ?? ''))}</span> ${esc(s.label)}`).join('  ·  ')
  const links = [
    p.live && link(p.live, 'live'),
    p.repo && link(p.repo, 'code'),
    p.paper && link(p.paper, 'paper'),
    p.model && link(p.model, 'model'),
  ].filter(Boolean).join(' · ')
  return [
    `<span class="t-hi">${esc(name)}</span>${subtitle ? `  ·  ${esc(subtitle)}` : ''}`,
    esc(p.desc),
    stats,
    ...(p.study?.highlights ?? []).map((h) => `  → ${esc(h)}`),
    `<span class="t-sys">${esc(p.chips.join(' · '))}</span>`,
    links,
  ].filter(Boolean).join('\n')
}

const PROJECT_COMMANDS: Record<string, string> = Object.fromEntries(PROJECTS.map((p) => [projectKey(p), projectDetail(p)]))

export const KB: Record<string, string> = {
  help: `<span class="t-sys">Portfolio Terminal  ·  Commands:</span>
─────────────────────────────────────────────
<span class="t-hi">about</span>          Who is Udit
<span class="t-hi">skills</span>         Full tech stack
<span class="t-hi">experience</span>     Work history
<span class="t-hi">projects</span>       Flagship projects
<span class="t-hi">&lt;project&gt;</span>      Details, e.g. <span class="t-hi">prepwise</span> · <span class="t-hi">cipherwatch</span>
<span class="t-hi">education</span>      Academic background
<span class="t-hi">research</span>       IEEE publication &amp; AI/ML
<span class="t-hi">certifications</span> Oracle, DeepLearning.AI &amp; AWS Academy
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
<span class="t-hi">Frontend</span>      React · Next.js · React Native · Expo · Tailwind · GSAP · WebGL
<span class="t-hi">Backend</span>       Node.js · Express · Fastify · FastAPI · REST · WebSockets · SSE
<span class="t-hi">Auth</span>          OAuth 2.0 · JWT · bcrypt · RBAC · Rate Limiting
<span class="t-hi">Databases</span>     PostgreSQL · pgvector · DynamoDB · MongoDB · Redis · Prisma · Drizzle
<span class="t-hi">AI / ML</span>       PyTorch · TensorFlow · Transformers · OpenCV · ONNX · Grad-CAM
<span class="t-hi">LLMs</span>          QLoRA · PEFT · Qwen2.5 · Gemini API · RAG · LangChain/LangGraph · MCP · Agents
<span class="t-hi">Data</span>          Pandas · NumPy · Airflow · Tableau · Forecasting · ETL
<span class="t-hi">Cloud / Sec</span>   AWS · Docker · GitHub Actions · Vercel · Render · SARIF
<span class="t-hi">Testing</span>       Vitest · pytest · ESLint · Calibration · OOD Testing`,

  experience: `<span class="t-hi">[ Jun 2026 – Present ]</span>  Senior Consultant
  Heartland Community Network (HCN) · Remote
  → Full-stack apps, backend services, REST APIs, dashboards &amp; automation for clients
  → AI-powered features and LLM-driven automation workflows
  → End-to-end delivery: architecture → build → test → deploy → maintain

<span class="t-hi">[ Aug 2025 – Present ]</span>  Consultant – IT Services
  UITS · Indiana University
  → 100+ technical issues/week across desktop, mobile &amp; enterprise apps
  → Identity &amp; access management · root-cause analysis
  → Resolutions and troubleshooting workflows documented in ServiceNow

<span class="t-hi">[ Jan 2026 – Jun 2026 ]</span>  Software Engineer
  Global Health Impact Project · Indiana University
  → Full-stack analytics features (React, TypeScript, Python)
  → Backend services &amp; data pipelines for population health forecasting
  → REST APIs powering forecasting dashboards · query &amp; backend optimization`,

  projects: `<span class="t-hi">01</span>  NeuroClass (Brain Tumor MRI)    [AI/ML] · <a class="t-link" href="https://doi.org/10.1109/ICC-ROBINS60238.2024.10533941" target="_blank" rel="noopener noreferrer">IEEE ICC-ROBINS 2024</a>
    99.84% published · 93.44% after leakage audit + retrain · ONNX + Docker
<span class="t-hi">02</span>  Veritome (Biomedical RAG)       [AI/ML] · <a class="t-link" href="https://huggingface.co/spaces/Udit013/biomed-assistant" target="_blank" rel="noopener noreferrer">live</a>
    Qwen2.5-7B QLoRA · RAG · LangGraph agents · pgvector
<span class="t-hi">03</span>  PrepWise (AI Voice Interviews)  [AI/ML · Full-Stack] · <a class="t-link" href="https://mock-ai-prep.vercel.app" target="_blank" rel="noopener noreferrer">live</a>
    Gemini 3.5 Flash-Lite · Web Speech · Monaco + Pyodide/WASM · $0 infra
<span class="t-hi">04</span>  CoreSightIQ (Decision Intel.)   [Analytics] · <a class="t-link" href="https://coresightiq.vercel.app" target="_blank" rel="noopener noreferrer">live</a>
    3 products, 1 core engine · walk-forward backtesting
<span class="t-hi">05</span>  RxFlow (Pharmacy ERP)           [Full-Stack] · <a class="t-link" href="https://rx-flow-web.vercel.app" target="_blank" rel="noopener noreferrer">live</a>
    Multi-tenant · 6 regional profiles · 4 tax engines · SSE sync
<span class="t-hi">06</span>  SnapCast (One-Take Editor)      [Full-Stack] · <a class="t-link" href="https://snapcast-video-sharing.vercel.app" target="_blank" rel="noopener noreferrer">live</a>
    Next.js · Cloudinary · AI chapters · better-auth
<span class="t-hi">07</span>  CipherWatch (Credential Ledger) [Systems] · <a class="t-link" href="https://cipherwatch-web.vercel.app" target="_blank" rel="noopener noreferrer">live</a>
    HMAC ledger · CI gate · SARIF · 26 credential types

<span class="t-sys">Type a project name (e.g. prepwise) for details.</span>`,

  education: `<span class="t-hi">MS Computer Science</span>  ·  Indiana University Bloomington
  Aug 2024 – May 2026  ·  GPA: <span class="t-hi">3.84 / 4.0</span>
  Applied ML · Advanced DB · Cloud Computing · LLMs · Algorithms

<span class="t-hi">B.Tech CS &amp; Engineering</span>  ·  KIIT University, Bhubaneswar, India
  Aug 2020 – May 2024  ·  GPA: <span class="t-hi">8.85 / 10.0</span>`,

  research: `<span class="t-hi">IEEE Publication</span>
"Identifying Various Types of Brain Tumors using Deep Neural Network based Image Features"
ICC-ROBINS 2024  ·  DOI: 10.1109/ICC-ROBINS60238.2024.10533941

Model:    EfficientNetB3 + CNN/VGG16/InceptionV3 benchmarks
Dataset:  <span class="t-hi">7,023 MRI scans</span>
Result:   <span class="t-hi">99.84% classification accuracy</span> (published)
Audit:    train/test leakage found; retrained model: <span class="t-hi">93.44%</span> (89.4% on novel scans)
Role:     Co-author

<span class="t-hi">Production ML &amp; LLM work:</span>
  NeuroClass · leakage audit · retrained model · ONNX + Docker serving · Grad-CAM
  Veritome · Qwen2.5-7B QLoRA · cited RAG · LangGraph 4-agent workflow
  Transformers · BERT · Prompt Engineering · RAG`,

  certifications: `<span class="t-hi">Oracle University</span>
  Oracle Certified Foundations Associate - Agentic AI · Sep 2026

<span class="t-hi">DeepLearning.AI (Coursera)</span>
  Neural Networks and Deep Learning
  Credential: ZKQGVGVJGDX7 · Sep 2023

  Improving Deep Neural Networks: Hyperparameter Tuning,
  Regularization and Optimization
  Credential: ZLN2LZ2YZNLE · Sep 2023

<span class="t-hi">AWS Academy</span>
  AWS Academy Graduate - AWS Academy Introduction to Cloud,
  Semester 1 · Jul 2023`,

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

  ...PROJECT_COMMANDS,
}

export const CHAT_FAQ: { q: RegExp; a: string }[] = [
  // A named project gets its own answer before the generic "projects" one.
  ...PROJECTS.map((p) => ({
    q: new RegExp(`\\b${projectKey(p)}\\b`, 'i'),
    a: `${esc(p.title)}: ${esc(p.desc)} Type <span class="t-hi">${projectKey(p)}</span> for highlights and links.`,
  })),
  { q: /hire|job|full.?time|intern|open.?to|available|role/i, a: 'Udit is open to full-time SWE, AI/ML, and Data roles. Open to remote, hybrid, and relocation anywhere in the US. Email: agarwaludit13@gmail.com · Phone: +1 (930) 904-4901' },
  { q: /ieee|research|paper|publish|brain.?tumor/i, a: 'Udit co-authored an IEEE paper at ICC-ROBINS 2024 on brain tumor classification: 99.84% accuracy on 7,023 MRI scans with EfficientNetB3. A later audit found train/test leakage in that benchmark; the retrained, deployed model scores 93.44% (89.4% on novel scans). DOI: 10.1109/ICC-ROBINS60238.2024.10533941' },
  { q: /gpa|grade|school|degree|university|master|indiana/i, a: 'MS CS at Indiana University Bloomington, GPA 3.84/4.0, May 2026. B.Tech at KIIT, GPA 8.85/10.0.' },
  { q: /skill|tech|stack|language|python|react|framework/i, a: 'Python, TypeScript, React, Next.js, Node.js, Fastify, FastAPI, PostgreSQL, PyTorch, TensorFlow, Hugging Face, QLoRA, Gemini API, Ollama, Docker, AWS. Type "skills" for the full list.' },
  { q: /project|built|app|demo|portfolio/i, a: '7 flagship projects: NeuroClass (IEEE brain tumor MRI classifier), PrepWise (AI voice interviews), Veritome (biomedical RAG + QLoRA), SnapCast (screen recorder and one-take editor), CoreSightIQ (decision intelligence), RxFlow (multi-tenant pharmacy ERP), and CipherWatch (credential exposure ledger). Type "projects" for all, or a project name for details.' },
  { q: /contact|email|phone|reach|talk/i, a: 'agarwaludit13@gmail.com · +1 (930) 904-4901 · linkedin.com/in/udit013 · Responds within 24h.' },
  { q: /llm|voice|gemini|vapi|gpt|generative|qlora|fine.?tun|rag|agent/i, a: 'LLM work spans QLoRA/PEFT fine-tuning (Qwen2.5-7B), cited RAG over PubMed with pgvector, LangGraph multi-agent workflows with per-claim citation verification, Gemini API, Ollama, and LLM evaluation with lm-evaluation-harness. Built Veritome, a live biomedical research assistant, and voice interviews on browser-native speech + Gemini.' },
  { q: /data|etl|tableau|airflow|pipeline|analytics|forecast/i, a: 'Strong data engineering & analytics: ETL pipelines, PostgreSQL, forecasting, cohort retention, and A/B testing; see CoreSightIQ, which unifies three analytics products on one core engine with auditable, calibrated metrics (walk-forward backtesting, Brier/ECE).' },
  { q: /location|remote|reloc|where/i, a: 'Based in Bloomington, IN (EST). Open to remote, hybrid, and relocation.' },
  { q: /cert|aws|deeplearning/i, a: 'Certifications: Oracle Certified Foundations Associate - Agentic AI (Oracle University, Sep 2026), Neural Networks and Deep Learning plus Improving Deep Neural Networks (DeepLearning.AI on Coursera, Sep 2023), and AWS Academy Graduate - Introduction to Cloud, Semester 1 (Jul 2023).' },
  { q: /now|current|exploring/i, a: 'Currently: Senior Consultant at Heartland Community Network and IT Services Consultant at IU UITS. Exploring LLM agents, real-time voice AI, and cloud-native systems.' },
]
