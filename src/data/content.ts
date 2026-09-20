/**
 * content.ts — single source of truth for all portfolio data.
 * Ported from the original index.html so components stay declarative.
 */

/* ── Hero ── */
export const TYPING_ROLES = [
  'Software Engineer',
  'AI / ML Engineer',
  'Full-Stack Developer',
  'Data Engineer',
  'Research Engineer',
]

/* ── Nav ── */
export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export const SECTION_IDS = ['home', 'about', 'skills', 'journey', 'projects', 'contact']

/* ── Marquee ── */
export const MARQUEE_ITEMS: { text: string; hi?: boolean }[] = [
  { text: 'Full-Stack Engineering', hi: true },
  { text: 'Python · TypeScript · React · Next.js' },
  { text: 'AI / ML Research', hi: true },
  { text: 'IEEE Published · ICC-ROBINS 2024' },
  { text: 'LLMs & Fine-Tuning', hi: true },
  { text: 'QLoRA · RAG · LangGraph · pgvector' },
  { text: 'Production Systems', hi: true },
  { text: 'PostgreSQL · Docker · CI/CD · WebAssembly' },
]

/* ── About ── */
export const PHILOSOPHY = [
  { icon: '⟳', text: 'Iterate fast, ship with care' },
  { icon: '◎', text: 'Systems thinking, not just features' },
  { icon: '△', text: 'Research-informed engineering' },
]

export interface Pillar {
  title: string
  desc: string
  chips: string[]
}

export const PILLARS: Pillar[] = [
  {
    title: 'Full-Stack Engineering',
    desc: 'End-to-end systems from API design to production UIs. React, Next.js, Node.js, PostgreSQL, and FastAPI, shipped to production.',
    chips: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'FastAPI', 'Drizzle ORM'],
  },
  {
    title: 'AI / ML Research',
    desc: 'IEEE-published research in medical imaging, plus production ML rigor: CNN benchmarking, transformers, QLoRA-fine-tuned LLMs, calibration, and ONNX-served inference.',
    chips: ['TensorFlow', 'PyTorch', 'Hugging Face', 'BERT', 'QLoRA', 'Gemini API', 'ONNX Runtime'],
  },
  {
    title: 'Data Engineering & Analytics',
    desc: 'ETL pipelines, normalized schema design, forecasting, and decision-intelligence dashboards that turn raw datasets into auditable, actionable decisions.',
    chips: ['ETL', 'Airflow', 'Tableau', 'Apache ECharts', 'Forecasting', 'Statistical Modeling', 'SQL'],
  },
  {
    title: 'Cloud & Systems Design',
    desc: 'Cloud infrastructure, containerization, multi-tenant and real-time architecture, auth (OAuth, JWT, RBAC), and API design built for reliability.',
    chips: ['AWS', 'Docker', 'CI/CD', 'Vercel', 'Turborepo', 'Serverless', 'System Design'],
  },
]

export interface Education {
  degree: string
  school: string
  period: string
  gpa: string
  gpaLabel: string
  coursework: string[]
  delay: string
}

export const EDUCATION: Education[] = [
  {
    degree: 'M.S. Computer Science',
    school: 'Indiana University Bloomington, IN, USA',
    period: 'Aug 2024 – May 2026',
    gpa: '3.84/4.0',
    gpaLabel: 'GPA: 3.84 out of 4.0',
    coursework: [
      'Applied Machine Learning',
      'Advanced Database Concepts',
      'Applied Algorithms',
      'Engineering Cloud Computing',
      'Fundamentals of LLMs',
      'Software Engineering',
      'Computer Networks',
      'Distributed Systems',
    ],
    delay: '.15s',
  },
  {
    degree: 'B.Tech CS & Engineering',
    school: 'Kalinga Institute of Industrial Technology (KIIT University), Bhubaneswar, India',
    period: 'Aug 2020 – May 2024',
    gpa: '8.85/10.0',
    gpaLabel: 'GPA: 8.85 out of 10.0',
    coursework: [
      'Data Structures & Algorithms',
      'Operating Systems',
      'Database Management Systems',
      'Computer Networks',
      'Object-Oriented Programming',
      'Machine Learning',
    ],
    delay: '.22s',
  },
]

export const CERTIFICATIONS = [
  { issuer: 'Oracle University', name: 'Oracle Agentic AI Foundations Associate' },
  { issuer: 'DeepLearning.AI', name: 'Neural Networks & Deep Learning' },
  { issuer: 'DeepLearning.AI', name: 'Improving DNNs: Hyperparameter Tuning' },
  { issuer: 'Amazon Web Services', name: 'AWS Academy Graduate: Cloud Semester 1' },
]

/* ── Skills — six categorized groups, each with labeled sub-categories.
   Every skill from the knowledge-doc master list appears exactly once. ── */
export interface SkillSubGroup {
  label: string
  skills: string[]
}

export interface SkillCategory {
  id: string
  label: string
  blurb: string
  groups: SkillSubGroup[]
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    label: "Programming & Frontend",
    blurb: "Languages and the interface layer",
    groups: [
      { label: "Programming Languages", skills: ["Python", "TypeScript", "JavaScript", "Java", "C/C++", "SQL"] },
      { label: "Frontend", skills: ["React", "Next.js", "React Native", "Expo", "Vite", "HTML5", "CSS3", "Tailwind CSS", "React Query", "Zustand", "React Hook Form", "GSAP", "WebGL", "Monaco Editor", "Recharts", "Apache ECharts", "Web Accessibility (WCAG AA)", "Web Performance Optimization"] },
      { label: "Browser APIs", skills: ["MediaRecorder", "Canvas", "Web Speech API", "Web Crypto API", "Web Workers", "WebAssembly (Pyodide)", "IndexedDB"] },
    ],
  },
  {
    id: "backend",
    label: "Backend, APIs & Architecture",
    blurb: "Services, APIs, auth and system design",
    groups: [
      { label: "Backend & APIs", skills: ["Node.js", "Express.js", "Fastify", "FastAPI", "REST APIs", "Next.js Server Actions", "WebSockets", "Server-Sent Events", "Swagger/OpenAPI", "Zod", "Pydantic", "APScheduler"] },
      { label: "Auth & Security", skills: ["OAuth 2.0", "JWT", "bcrypt", "better-auth", "Role-Based Access Control", "Rate Limiting"] },
      { label: "Systems & Architecture", skills: ["System Design", "API Design", "Multi-Tenant Architecture", "Real-Time Systems", "Caching", "Fault Tolerance", "Serverless Architecture", "Monorepo Architecture"] },
    ],
  },
  {
    id: "data",
    label: "Databases & Data Engineering",
    blurb: "Storage, pipelines and analytics",
    groups: [
      { label: "Databases & Storage", skills: ["PostgreSQL", "Neon", "pgvector", "Oracle AI Vector Search", "DynamoDB", "MySQL", "MongoDB", "Redis", "Firebase (Auth, Firestore)", "Neo4j", "SQLite", "Drizzle ORM", "Prisma", "SQLAlchemy"] },
      { label: "Data Engineering & Analytics", skills: ["Pandas", "NumPy", "Matplotlib", "Tableau", "Apache Airflow", "ETL Pipelines", "Data Modeling", "Forecasting", "Statistical Modeling", "Backtesting", "A/B Testing"] },
    ],
  },
  {
    id: "ai",
    label: "AI, Machine Learning & LLMs",
    blurb: "Deep learning, LLMs and fine-tuning",
    groups: [
      { label: "AI / ML", skills: ["PyTorch", "TensorFlow/Keras", "Scikit-learn", "Transformers", "CNNs (VGG16, InceptionV3, EfficientNetB3)", "Transfer Learning", "Computer Vision (OpenCV)", "BERT", "ONNX Runtime", "Grad-CAM", "Prompt Engineering"] },
      { label: "LLMs & Fine-Tuning", skills: ["Qwen2.5", "LLM Fine-Tuning", "QLoRA", "PEFT/LoRA", "4-bit Quantization (bitsandbytes)", "lm-evaluation-harness", "Gemini API", "Ollama", "RAG", "LangChain", "LangGraph", "Multi-Agent Workflows", "Model Context Protocol (MCP)", "OpenAI Agents SDK", "OpenAI Responses API", "Tool Use & Function Calling", "Agent Handoffs", "Agent Guardrails & Safety", "Embeddings & Vector Search (sentence-transformers, pgvector/HNSW)", "Citation Grounding & Hallucination Checks", "LLM Evaluation (Recall@k, MRR, ROUGE-L, BERTScore)", "Structured Generation"] },
    ],
  },
  {
    id: "cloud",
    label: "Cloud, DevOps & Security",
    blurb: "Infra, delivery and DevSecOps",
    groups: [
      { label: "Cloud & DevOps", skills: ["AWS (EC2, S3, Lambda, RDS, CloudFront)", "Oracle Cloud Infrastructure (OCI)", "Vercel", "Render", "Cloudinary", "Expo EAS", "Docker", "CI/CD (GitHub Actions)", "Git", "pnpm Workspaces", "Turborepo", "ServiceNow"] },
      { label: "Security & DevSecOps", skills: ["Secrets Detection (SAST)", "Shannon Entropy Analysis", "Git History Auditing", "SARIF / GitHub Code Scanning", "Application Security Auditing (IDOR, Broken Access Control, Path Traversal)"] },
    ],
  },
  {
    id: "testing",
    label: "Testing, Quality & MLOps",
    blurb: "Tests, evaluation and reliability",
    groups: [
      { label: "Testing & Quality", skills: ["Vitest", "pytest", "Unit & Integration Testing", "TypeScript strict mode", "ESLint"] },
      { label: "MLOps & Experimentation", skills: ["Model Evaluation & Benchmarking", "Inference Optimization", "Experiment Tracking", "Hyperparameter Tuning", "Cross-Validation", "Error Analysis", "Data Leakage Auditing", "Confidence Calibration", "Uncertainty Estimation (Test-Time Augmentation)", "Robustness Testing", "OOD Testing", "Data Drift Detection", "Model Cards", "Hugging Face (Hub, Spaces, Inference)", "Gradio"] },
    ],
  },
]

/* ── Journey ── */
export interface JourneyEntry {
  period: string
  datetime: string
  type: string
  role: string
  company: string
  location: string
  desc: string
  current?: boolean
  bullets: string[]
  chips: string[]
  delay?: string
}

export const JOURNEY: JourneyEntry[] = [
  {
    period: "Jun 2026 – Present",
    datetime: "2026-06",
    type: "Full-Time · Remote",
    role: "Senior Consultant",
    company: "Heartland Community Network (HCN)",
    location: "Remote · Indiana, US",
    desc: "Technology consulting practice serving Indiana businesses with software engineering, AI, automation, and analytics work.",
    current: true,
    bullets: [
      "Architect and deliver full-stack applications, backend services, REST APIs, dashboards, and workflow automation solutions tailored to client-specific business and operational requirements",
      "Engineer AI-powered features and LLM-driven automation workflows that reduce manual processes, accelerate information retrieval, and improve data-driven decision-making",
      "Translate complex and ambiguous business requirements into scalable technical designs, collaborating directly with engineering, data, and operations stakeholders",
      "Own end-to-end delivery of production systems, spanning architecture, implementation, testing, deployment, debugging, and ongoing maintenance",
      "Develop solution architectures, technical roadmaps, and implementation documentation that accelerate deployment, knowledge transfer, and long-term system maintainability",
    ],
    chips: ["Full-Stack", "LLMs / AI", "REST APIs", "Automation", "Analytics", "Data Pipelines"],
  },
  {
    period: "Aug 2025 – Present",
    datetime: "2025-08",
    type: "Part-Time · On-site",
    role: "Consultant – IT Services",
    company: "University Information Technology Services (UITS) · Indiana University",
    location: "Bloomington, IN, US",
    desc: "Technical support and systems administration for university-wide infrastructure, including enterprise applications, identity systems, and end-user computing.",
    current: true,
    bullets: [
      "Resolve 100+ technical issues weekly across desktop, mobile, and enterprise applications through structured troubleshooting and root-cause analysis",
      "Diagnose and remediate hardware, software, and network failures to minimize service disruption and keep technology services reliable for a large user base",
      "Support enterprise identity and access management across authentication, authorization, account provisioning, and lifecycle workflows",
      "Analyze recurring incidents and document technical resolutions and troubleshooting workflows in ServiceNow, improving knowledge reuse and consistency across support operations",
      "Collaborate with cross-functional IT teams to triage and resolve complex incidents, coordinate escalations, and restore service availability efficiently",
    ],
    chips: ["Enterprise IT", "Identity & Access", "ServiceNow", "Troubleshooting", "Root-Cause Analysis"],
    delay: ".1s",
  },
  {
    period: "Jan 2026 – Jun 2026",
    datetime: "2026-01",
    type: "Part-Time · Hybrid",
    role: "Software Engineer",
    company: "Global Health Impact Project · Indiana University",
    location: "Bloomington, IN, US",
    desc: "Global health analytics platform that models pharmaceutical intervention impact across populations (treatment coverage, efficacy, and outcomes) through large-scale forecasting workflows.",
    bullets: [
      "Engineered full-stack analytics features using React, TypeScript, and Python to enable researchers to evaluate pharmaceutical intervention coverage, efficacy, and population-level outcomes",
      "Developed backend services and data pipelines for treatment-coverage modeling, efficacy analysis, and large-scale population health forecasting",
      "Designed and maintained REST APIs connecting analytical services and data pipelines with interactive forecasting dashboards and visualization workflows",
      "Optimized database queries and backend processing to improve application responsiveness and support increasingly complex analytical workloads",
      "Identified and resolved application bottlenecks and production issues across the technology stack, translating research requirements into reliable, production-ready features in collaboration with domain experts",
    ],
    chips: ["Python", "React", "TypeScript", "REST APIs", "SQL", "Data Pipelines"],
    delay: ".2s",
  },
]

/* ── Projects ── */
export type ProjectType = 'fs' | 'ml' | 'dt' | 'sys'

export interface ProjectBadge {
  label: string
  cls: 'fs' | 'ml' | 'dt' | 'sys' | 'pub' | 'wip'
}

export interface ProjectStat {
  value: string
  suffix?: string
  label: string
}

/** Expanded case study shown in the project detail drawer. */
export interface ProjectCaseStudy {
  problem: string
  approach: string
  result: string
  highlights: string[]
}

export interface Project {
  /** A project can belong to more than one category. */
  types: ProjectType[]
  num: string
  title: string
  desc: string
  badges: ProjectBadge[]
  chips: string[]
  /** Screenshot shown in the case-study drawer. Omit and the figure is skipped. */
  image?: string
  live?: string
  repo?: string
  paper?: string
  model?: string
  /** Non-link footnote for internal/private work (e.g. university project). */
  note?: string
  stats?: ProjectStat[]
  study?: ProjectCaseStudy
  delay?: string
}

export const PROJECT_FILTERS: { id: ProjectType; label: string }[] = [
  { id: 'fs', label: 'Full-Stack & Software Engineering' },
  { id: 'ml', label: 'AI, Machine Learning & LLMs' },
  { id: 'dt', label: 'Data & Decision Intelligence' },
  { id: 'sys', label: 'Systems, Security & Infrastructure' },
]

export const PROJECTS: Project[] = [
  {
    types: ["ml", "sys"],
    num: "01",
    title: "NeuroClass - Brain Tumor MRI Classifier",
    desc: "Production-grade extension of an IEEE-published brain tumor MRI classifier with confidence calibration, uncertainty estimates, Grad-CAM explainability, ONNX inference, and a live Hugging Face demo.",
    badges: [
      { label: "AI / ML", cls: "ml" },
      { label: "Systems", cls: "sys" },
      { label: "IEEE 2024", cls: "pub" },
    ],
    chips: ["Python", "TensorFlow/Keras", "EfficientNetB3", "ONNX Runtime", "Gradio", "FastAPI", "Hugging Face"],
    image: "/projects/braintumor.png",
    live: "https://huggingface.co/spaces/Udit013/brain-tumor-mri-classifier",
    repo: "https://github.com/Udit013/Brain_Tumor_Classificatioin",
    paper: "https://doi.org/10.1109/ICC-ROBINS60238.2024.10533941",
    model: "https://huggingface.co/Udit013/brain-tumor-efficientnetb3",
    stats: [
      { value: "7023", label: "MRI Scans" },
      { value: "11.7", suffix: "M", label: "Parameters" },
    ],
    study: {
      problem: "A high-accuracy research notebook is not a system anyone can trust or use. The IEEE work proved a model could classify brain-tumor MRIs; it said nothing about whether the confidence was meaningful, how the model behaved on unfamiliar data, or how a clinician would ever run it.",
      approach: "Reproduced the four-architecture benchmark end to end, then layered on the evaluation and deployment work the paper did not cover: calibration, uncertainty, robustness testing, explainability, and a served inference path.",
      result: "A live, documented classifier on Hugging Face Spaces returning a calibrated prediction, an uncertainty estimate, and a Grad-CAM overlay per scan, reproducible from one command and versioned on the Hub.",
      highlights: [
        "Co-authored an IEEE ICC-ROBINS 2024 paper benchmarking four CNN architectures (custom CNN, VGG16, InceptionV3, EfficientNetB3) on 7,023 MRI images, where EfficientNetB3 posted the top reported accuracy (99.844%) with 11.7M parameters, 38% fewer than the next-smallest model",
        "Made confidence scores trustworthy by fitting temperature scaling, cutting expected calibration error 68% (0.0425 → 0.0136)",
        "Added 6-view test-time augmentation whose predictive entropy is 2.2× higher on wrong predictions than correct ones (0.78 vs 0.36), flagging low-certainty scans for review",
        "Benchmarked robustness across 30 corruption conditions (6 types × 5 severities), pinpointing additive Gaussian noise as the critical failure mode while brightness, contrast, and rotation stay above 80%",
        "Deployed a live Gradio app on Hugging Face Spaces with 3.5× lower CPU latency than the Keras model (118 → 33 ms) via ONNX Runtime, returning calibrated confidence, uncertainty, and Grad-CAM heatmaps",
        "Rescued inference accuracy from 53% to 93.9% after a silent collapse toward one class, traced to non-converged BatchNorm statistics on Apple Metal, and kept results reproducible with a 10-stage one-command pipeline and 27 pytest tests in CI",
      ],
    },
  },
  {
    types: ["ml", "sys"],
    num: "02",
    title: "Veritome - Biomedical RAG & QLoRA Assistant",
    desc: "Production biomedical research assistant answering clinical questions with grounded, cited evidence using RAG, a LangGraph multi-agent workflow, and a QLoRA-tuned Qwen2.5-7B on 100% free-tier infrastructure.",
    badges: [
      { label: "AI / ML", cls: "ml" },
      { label: "Systems", cls: "sys" },
    ],
    chips: ["Python", "Qwen2.5-7B", "QLoRA", "LangGraph", "RAG", "pgvector", "FastAPI"],
    image: "/projects/biomed.png",
    live: "https://huggingface.co/spaces/Udit013/biomed-assistant",
    repo: "https://github.com/Udit013/biomed-llm-peft",
    model: "https://huggingface.co/Udit013/qwen2.5-7b-medmcqa-qlora-5k",
    stats: [
      { value: "64.5", suffix: "%", label: "PubMedQA (OOD)" },
      { value: "3.4", suffix: "K", label: "RAG Chunks" },
    ],
    study: {
      problem: "A language model that answers a clinical question fluently but cannot show where the answer came from is unusable for research. The open question was narrower than \"does fine-tuning help\"; it was when fine-tuning helps, at what inference cost, and whether retrieval does more of the work.",
      approach: "Fine-tuned Qwen2.5-7B with 4-bit QLoRA, built a retrieval pipeline over real biomedical literature, and put both behind a LangGraph agent workflow that verifies each claim against retrieved sources, then measured all four combinations against each other.",
      result: "A live assistant returning grounded, [n]-cited answers with every factual claim checked against retrieved sources, served end to end (Gradio Space → FastAPI → Neon → Hugging Face Inference) on free-tier infrastructure.",
      highlights: [
        "QLoRA-fine-tuned Qwen2.5-7B-Instruct (4-bit NF4, r=16, only 0.92% of parameters trainable) on a 5K-question MedMCQA subset on a single free 16 GB Colab T4, publishing the adapter to the Hugging Face Hub with a model card",
        "Measured what fine-tuning actually buys on matched n=200 lm-evaluation-harness runs: +16.5 pp out-of-domain on PubMedQA (48.0% → 64.5%) but a within-noise +2.5 pp in-domain on MedMCQA (47.5% → 50.0%)",
        "Indexed 733 PubMed abstracts into 3,410 retrievable chunks in Neon PostgreSQL + pgvector (384-dim, HNSW) through NCBI E-utilities ingestion, sentence-aware chunking, bge-small embeddings, metadata filters, and optional cross-encoder reranking",
        "Built a LangGraph Planner → Retrieval → Answer → Verify workflow with embedding-based per-claim citation verification, eliminating false \"unsupported\" flags that word-overlap matching produced (0.74–0.86 cosine vs a 0.6 threshold)",
        "Fit the production serving path onto a 512 MB free instance by making it torch-free: local ONNX query embeddings, a vector-store abstraction, and the LLM called through Hugging Face Inference",
        "Built a 4-way evaluation harness (Base / Fine-tuned / Base + RAG / Fine-tuned + RAG) scoring retrieval (Recall@k, MRR), generation (citation coverage, groundedness, ROUGE-L, BERTScore), and cost (p50/p95 latency, tokens)",
      ],
    },
    delay: ".12s",
  },
  {
    types: ["fs", "ml"],
    num: "03",
    title: "PrepWise - AI Voice Interview Platform",
    desc: "AI interview platform running adaptive voice interviews with a delivery-aware interviewer, live coding rounds with in-browser code execution, company-specific modes, and résumé-aware questions, entirely on browser-native and free-tier infrastructure.",
    badges: [
      { label: "Full-Stack", cls: "fs" },
      { label: "AI / ML", cls: "ml" },
    ],
    chips: ["Next.js 15", "TypeScript", "Gemini 2.5 Flash", "Web Speech API", "Monaco Editor", "Pyodide / WASM", "Firebase"],
    image: "/projects/prepwise.png",
    live: "https://mock-ai-prep.vercel.app",
    repo: "https://github.com/Udit013/ai_mock_interview_prep",
    stats: [
      { value: "5", label: "Interview Formats" },
      { value: "9", label: "Company Modes" },
    ],
    study: {
      problem: "Interview practice tools ask scripted questions and score the words you type. They ignore how you actually come across under pressure, and they cannot run a real coding round, the two things that decide onsite outcomes.",
      approach: "Built a delivery-aware interviewer on Gemini that measures how you speak, not just what you say, and paired it with a CoderPad-style live coding round that executes real code in the browser, no paid speech services, no backend runners.",
      result: "Five interview formats (technical, behavioral, mixed, system design, and live coding) with replay, shareable reports, and progress tracking, running at $0 infrastructure cost.",
      highlights: [
        "Made the interviewer react to how candidates answer: the browser measures hesitation, pace, and filler density each turn, and in live Gemini runs a hesitant answer dropped the confidence estimate from 50 to 20 and triggered a fundamentals probe, all in one schema-validated LLM call per turn",
        "Cut per-interview speech costs to $0 across 5 interview formats by replacing paid speech-to-text and text-to-speech with browser-native recognition and synthesis, with continuous capture that survives pauses and recognizer restarts",
        "Shipped live coding rounds with real in-browser execution for JavaScript and Python in a terminable Web Worker with a lazily loaded Pyodide (WASM) runtime, killing infinite loops at a 5 s (JS) / 15 s (Python) timeout without freezing the tab",
        "Supported 9 company interview styles (Google, Amazon, Meta, McKinsey, BCG, and more) from a single config registry, so adding a company is one config entry",
        "Grounded questions in candidates' real projects by extracting résumé PDFs with unpdf and structuring them with Gemini, and scored each interview on 5 competencies plus STAR completeness with replay and revocable share links",
        "Closed a class of IDOR vulnerabilities by cutting the public Server Action surface from 19 to 9, alongside session auth, bounded payloads, and per-user daily rate limits, covered by a 120-test Vitest suite in CI",
      ],
    },
    delay: ".06s",
  },
  {
    types: ["fs", "ml", "dt"],
    num: "04",
    title: "CoreSightIQ - Decision Intelligence Engine",
    desc: "Unified decision-intelligence platform (ingest → score → recommend → report → advise) spanning product, retail, and market analytics on a reusable core engine, with walk-forward backtesting and calibration so every accuracy claim is auditable.",
    badges: [
      { label: "Full-Stack", cls: "fs" },
      { label: "AI / ML", cls: "ml" },
      { label: "Data", cls: "dt" },
    ],
    chips: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Apache ECharts", "Neon PostgreSQL", "Ollama"],
    image: "/projects/coresight.png",
    live: "https://coresightiq.vercel.app",
    repo: "https://github.com/Udit013/decision-intelligence-platform",
    stats: [
      { value: "105", label: "Unit Tests" },
      { value: "1.07", suffix: "M", label: "Transactions" },
    ],
    study: {
      problem: "Three separate analytics products (product, retail, and market expansion) had independently grown the same pipeline three times over: a normal-CDF implemented twice, three near-identical AI clients, three hand-rolled classifiers. None of them could prove their accuracy claims.",
      approach: "Extracted the shared pipeline into one reusable /core engine and rebuilt each product as a thin, pluggable domain module, then added the validation layer all three originals lacked.",
      result: "One platform proving a single pipeline (ingest → score → recommend → report → advise) generalizes across three very different domains, with every accuracy claim auditable.",
      highlights: [
        "Built a domain-agnostic core (forecasting, weighted multi-criteria scoring, recommendation synthesis, RFM segmentation, cohort retention, a two-proportion A/B engine) where one scoring primitive powers both Market (Expand/Investigate/Monitor/Avoid) and Product (RICE/ICE/WSJF) workflows, covered by 105 unit tests",
        "Engineered a walk-forward backtesting and confidence-calibration harness, with a reproducible failure-mode script proving it correctly reports a negative out-of-sample R² (−0.235) on white noise and a 0.77 ECE on a deliberately overconfident classifier",
        "Grounded the Operations module in the real UCI Online Retail II dataset (~1.07M transactions) and surfaced the honest walk-forward result (R² 0.072, MAPE 30.3% across 44 folds), retiring an unverified \"0.90 R² / 86% accuracy\" claim inherited from a legacy build",
        "Designed a bespoke design system from scratch to avoid generic dashboard patterns: masthead module tabs, a divided KPI ledger, a ranked-decision docket with animated confidence meters, and a transcript-style AI console",
        "Built a self-service data pipeline for 6 file formats (CSV, XLSX, JSON, TXT, PDF, DOCX) with per-file progress, heuristic column mapping, and a double-ingest guard that blocks repeat loads from doubling metrics",
        "Cut the Operations Decision Center from a ~5.4 s cold query to ~15 ms warm (~99.7%) with parallel SQL and tag-invalidated caching, keeping the AI advisor local-first via Ollama with a deterministic fallback",
      ],
    },
    delay: ".24s",
  },
  {
    types: ["fs", "dt", "sys"],
    num: "05",
    title: "RxFlow - Multi-Tenant Pharmacy ERP",
    desc: "Multi-tenant pharmacy ERP for the Indian market: GST-compliant billing (CGST/SGST/IGST, GSTR-1/3B), transactionally consistent inventory and accounting, procurement, and payroll, with real-time multi-device sync over Server-Sent Events, deployed on $0 free-tier infra.",
    badges: [
      { label: "Full-Stack", cls: "fs" },
      { label: "Data", cls: "dt" },
      { label: "Systems", cls: "sys" },
    ],
    chips: ["Next.js 14", "TypeScript", "Fastify", "Prisma", "Neon PostgreSQL", "Turborepo", "SSE", "jsPDF"],
    image: "/projects/rxflow.png",
    live: "https://rx-flow-web.vercel.app",
    repo: "https://github.com/Udit013/RxFlow",
    stats: [
      { value: "22", label: "API Route Modules" },
      { value: "5", label: "Distributor Formats" },
    ],
    study: {
      problem: "Indian pharmacies run on legacy desktop software like Marg and Tally: single-machine, no real-time sync across counters, and GST compliance bolted on. Replacing it means getting inventory, billing, accounting, and payroll correct in one system, for tenants who cannot afford downtime or data drift.",
      approach: "Built a multi-tenant monorepo where every signup provisions an isolated tenant, made every money-and-stock operation atomic inside database transactions, and pushed updates to every device over Server-Sent Events.",
      result: "A production ERP covering inventory, GST-compliant billing, procurement, accounting, and payroll, running on $0 free-tier infrastructure with full audit trails.",
      highlights: [
        "Built a pnpm/Turborepo monorepo (Fastify API, Next.js 14 web app, shared Prisma package) spanning 22 API route modules and ~40 Prisma models, where every signup provisions an isolated tenant and every query is tenant-scoped from the JWT",
        "Automated Indian GST compliance end to end (GSTR-1, GSTR-3B, sales/purchase and Schedule H1 registers with Excel/CSV export) with a line-item tax engine that routes CGST+SGST vs IGST by comparing store and party state",
        "Kept stock and ledgers consistent across sales, purchases, returns, transfers, and stock-takes with single Prisma transactions, and prevented order-number collisions under concurrent billing with a unique-constraint retry",
        "Kept every open counter in sync without polling through tenant-scoped Server-Sent Events wired into the audit layer, invalidating the exact React Query caches on every connected client",
        "Built a plugin-based CSV purchase-import architecture where each distributor layout is a small column-map config scored by a shared auto-detector, verified against real invoices from five distributors, so a new distributor is one config addition with zero logic changes",
        "Hardened auth with rotating refresh JWTs, bcrypt-hashed OTPs, and per-route rate limits, added AES-256-GCM client-side encrypted backups via the Web Crypto API, and gated CI with a 32-test Vitest suite that caught a financial-year boundary bug",
      ],
    },
    delay: ".30s",
  },
  {
    types: ["fs", "ml", "sys"],
    num: "06",
    title: "SnapCast - Screen Recording & Video Sharing",
    desc: "Browser-native screen recording and sharing with webcam picture-in-picture, direct-to-CDN uploads, Web Speech transcription, Gemini-generated chapters and summaries, 3-tier privacy with share tokens, and channel analytics.",
    badges: [
      { label: "Full-Stack", cls: "fs" },
      { label: "AI / ML", cls: "ml" },
      { label: "Systems", cls: "sys" },
    ],
    chips: ["Next.js 15", "React 19", "TypeScript", "Neon PostgreSQL", "Drizzle ORM", "Cloudinary", "Gemini"],
    image: "/projects/snapcast.png",
    live: "https://snapcast-video-sharing.vercel.app",
    repo: "https://github.com/Udit013/screen_recording_sharing_app",
    stats: [
      { value: "1080", suffix: "p", label: "Screen + Webcam" },
      { value: "500", suffix: "MB", label: "Direct Uploads" },
    ],
    study: {
      problem: "Screen recording tools either demand an extension or a native install, and once a video exists it becomes an opaque blob: no way to search inside it, jump to the moment that matters, or discuss a specific second of it.",
      approach: "Captured everything in the browser with MediaRecorder and Canvas, uploaded straight to a CDN, transcribed during recording, and used the transcript as the index that makes the video searchable and navigable.",
      result: "A Loom-style platform where recordings arrive already transcribed, chaptered, summarized, and searchable, with a custom player, threaded timestamp comments, and three tiers of sharing control.",
      highlights: [
        "Built extension-free screen recording with webcam picture-in-picture at 1080p / 30 fps by compositing both streams onto a Canvas recorded with MediaRecorder, with a configurable webcam overlay",
        "Fixed recordings freezing on tab switches by moving the compositor off requestAnimationFrame, which browsers suspend in background tabs, onto a Web Worker timer",
        "Limited crash or refresh data loss to about 1 second of footage by persisting each MediaRecorder chunk to IndexedDB and offering one-click restore",
        "Kept video bytes off the app server for uploads up to 500 MB by signing Cloudinary uploads server-side, scoped to a single public_id, and uploading directly from the browser",
        "Generated summaries, tags, and up to 8 chapters per video by running two Gemini calls concurrently, and made every recording searchable with a live Web Speech transcript and click-to-seek",
        "Closed 10 cross-user access flaws found in a security audit by centralizing video-access rules in one tested module, and shipped a fully custom player and threaded timestamp comments gated by a 39-test Vitest suite in CI",
      ],
    },
    delay: ".18s",
  },
  {
    types: ["sys"],
    num: "07",
    title: "CipherWatch - Secret Exposure & Risk Detection",
    desc: "DevSecOps platform detecting hardcoded secrets in GitHub repositories and pasted code via regex, Shannon-entropy gating, and placeholder/test-file filtering, with opt-in git-history scanning, 0–100 exposure risk scoring, differential scanning, real-time WebSocket progress, and SARIF export.",
    badges: [
      { label: "Systems", cls: "sys" },
    ],
    chips: ["Python", "FastAPI", "SQLAlchemy", "SQLite", "WebSockets", "React", "APScheduler"],
    image: "/projects/cipherwatch.png",
    live: "https://cipherwatch-web.vercel.app",
    repo: "https://github.com/Udit013/automated-secrets-scanner",
    stats: [
      { value: "26", label: "Secret Types" },
      { value: "96", suffix: "K", label: "Lines / sec" },
    ],
    study: {
      problem: "A credential committed once stays in git history forever, and scanning only the current checkout misses it entirely. Worse, naive pattern matching floods engineers with false positives until they stop reading the report.",
      approach: "Paired format-specific regexes with Shannon-entropy gating and placeholder and test-path filtering to cut noise, reconstructed each secret's exposure lifecycle from opt-in git-history scans, and scored every finding on a transparent 0–100 scale.",
      result: "A DevSecOps platform detecting 26 credential types across 36 file extensions at ~96K lines/sec, exporting SARIF 2.1.0 for GitHub code scanning, behind a security console built from scratch.",
      highlights: [
        "Detected 26 credential types (AWS, GCP, GitHub, Stripe, Slack, JWTs, SSH/PGP keys, database connection strings) across 36 file extensions at ~96K lines/sec by pairing 23 format-specific regexes with Shannon-entropy gating and 23 placeholder and test-path rules",
        "Collapsed 1,351 per-commit matches across 907 file snapshots into 82 unique findings (−94%) by aggregating each secret and reconstructing its lifecycle: introduced and last-seen dates, exposure days, commits, and distinct authors",
        "Made triage explainable with a 0–100 exposure risk score where every point traces to a stated reason, plus differential scanning that labels findings new, resolved, or unchanged against the prior run",
        "Built an async FastAPI backend with 18 REST endpoints and a WebSocket channel streaming scan-lifecycle events, cron-scheduled scans with SMTP alerts, and bounded inputs on every endpoint, deployed at $0 on Render + Vercel",
        "Plugged findings into existing workflows with 5 export formats, including SARIF 2.1.0 for GitHub code scanning and a downloadable remediation patch for 6 targets",
        "Cut shipped JavaScript by 56% (733 → 321 KB) by replacing charting and icon libraries with hand-built SVG inside a from-scratch design system (15.8:1 text contrast), verified by 75 tests in a 4-job GitHub Actions pipeline",
      ],
    },
    delay: ".36s",
  },
]

/* ── Contact ── */
export const CONTACT_LINKS = [
  {
    icon: '✉',
    label: 'Email',
    value: 'agarwaludit13@gmail.com',
    href: 'mailto:agarwaludit13@gmail.com',
    cursor: 'Email',
  },
  {
    icon: '☎',
    label: 'Phone',
    value: '+1 (930) 904-4901',
    href: 'tel:+19309044901',
    cursor: 'Call',
    ariaLabel: 'Call Udit: +1 (930) 904-4901',
  },
  {
    icon: 'in',
    label: 'LinkedIn',
    value: 'linkedin.com/in/udit013',
    href: 'https://linkedin.com/in/udit013',
    cursor: 'LinkedIn',
    external: true,
  },
  {
    icon: '⌥',
    label: 'GitHub',
    value: 'github.com/Udit013',
    href: 'https://github.com/Udit013',
    cursor: 'GitHub',
    external: true,
  },
]
