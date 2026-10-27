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
  { issuer: 'Oracle University', name: 'Oracle Certified Foundations Associate - Agentic AI' },
  { issuer: 'DeepLearning.AI (Coursera)', name: 'Neural Networks and Deep Learning' },
  { issuer: 'DeepLearning.AI (Coursera)', name: 'Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization' },
  { issuer: 'AWS Academy', name: 'AWS Academy Graduate - AWS Academy Introduction to Cloud, Semester 1' },
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
    desc: "Production-grade extension of an IEEE-published brain tumor MRI classifier: a train/test leakage audit, a retrained and redeployed model, confidence calibration, uncertainty, Grad-CAM explainability, ONNX inference on a live Hugging Face demo, and a containerized FastAPI service.",
    badges: [
      { label: "AI / ML", cls: "ml" },
      { label: "Systems", cls: "sys" },
      { label: "IEEE 2024", cls: "pub" },
    ],
    chips: ["Python", "TensorFlow/Keras", "EfficientNetB3", "ONNX Runtime", "Gradio", "FastAPI", "Docker", "Hugging Face"],
    image: "/projects/braintumor.png",
    live: "https://huggingface.co/spaces/Udit013/brain-tumor-mri-classifier",
    repo: "https://github.com/Udit013/Brain_Tumor_Classificatioin",
    paper: "https://doi.org/10.1109/ICC-ROBINS60238.2024.10533941",
    model: "https://huggingface.co/Udit013/brain-tumor-efficientnetb3",
    stats: [
      { value: "7023", label: "MRI Scans" },
      { value: "93.44", suffix: "%", label: "Deployed Accuracy" },
    ],
    study: {
      problem: "A high-accuracy research notebook is not a system anyone can trust or use. The IEEE work proved a model could classify brain-tumor MRIs; it said nothing about whether that accuracy held on genuinely new scans, whether the confidence was meaningful, or how a clinician would ever run it.",
      approach: "Reproduced the four-architecture benchmark end to end, audited it for train/test leakage, retrained on a leakage-safe split, and layered on the evaluation and deployment work the paper did not cover: calibration, uncertainty, robustness testing, explainability, and served inference.",
      result: "A retrained classifier, live on Hugging Face Spaces and as a containerized FastAPI service, returning a calibrated prediction, a stability indicator, and a Grad-CAM overlay per scan, reproducible from one command and versioned on the Hub.",
      highlights: [
        "Co-authored an IEEE ICC-ROBINS 2024 paper benchmarking four CNN architectures (custom CNN, VGG16, InceptionV3, EfficientNetB3) on 7,023 MRI images, where EfficientNetB3 posted the top reported accuracy (99.844%) with 11.7M parameters, 38% fewer than the next-smallest model",
        "Exposed train/test leakage inflating the published benchmark (95.9% accuracy on test images with a near-duplicate in training vs 85.7% on novel ones; 44.6% near-duplicates and 114 exact duplicates in a 1,600-image test set) with a perceptual- and content-hash audit over all 8.96M train/test image pairs",
        "Retrained and redeployed the live classifier, raising test accuracy from 90.25% to 93.44%, novel-image accuracy from 85.7% to 89.4%, glioma recall from 64.3% to 79.5%, and accuracy under 30 image corruptions from 67.3% to 90.7% (paired McNemar p = 1.4e-6), using a leakage-safe validation split and a two-stage fine-tune that trains in 21.5 minutes on a laptop CPU",
        "Found and fixed three silent correctness bugs that each changed reported accuracy: a tensorflow-metal graph-mode defect (93.81% on Metal vs 90.25% on CPU for identical weights), a train/serve resize skew, and a Keras EfficientNet quirk that dropped an input-scaling layer at serving time (95.0% → 86.7%)",
        "Made confidence scores trustworthy, cutting expected calibration error from 0.188 to 0.022 with the retrained model, and added 6-view test-time augmentation whose predictive entropy is 7× higher on wrong predictions than correct ones (0.78 vs 0.11)",
        "Served the model through ONNX Runtime on Hugging Face Spaces at 2.3× lower CPU latency than Keras (78 → 34.5 ms) and as a non-root Docker/FastAPI service that answered 12 concurrent predictions in 1.4 s, with 65 pytest tests plus linting gating CI",
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
    desc: "AI interview platform running adaptive voice interviews with a conversational interviewer that follows up on what the candidate actually said and reacts to hesitation and confidence, plus live coding rounds with in-browser code execution, company-specific styles, and résumé-aware questions, entirely on browser-native and free-tier infrastructure.",
    badges: [
      { label: "Full-Stack", cls: "fs" },
      { label: "AI / ML", cls: "ml" },
    ],
    chips: ["Next.js 15", "TypeScript", "Gemini 3.5 Flash-Lite", "Vercel AI SDK", "Web Speech API", "Monaco Editor", "Pyodide / WASM", "Firebase"],
    image: "/projects/prepwise.png",
    live: "https://mock-ai-prep.vercel.app",
    repo: "https://github.com/Udit013/ai_mock_interview_prep",
    stats: [
      { value: "5", label: "Interview Formats" },
      { value: "9", label: "Company Modes" },
    ],
    study: {
      problem: "Interview practice tools ask scripted questions and score the words you type. They ignore how you actually come across under pressure, rarely follow up on what you just said, and cannot run a real coding round, the things that decide onsite outcomes.",
      approach: "Built a conversational interviewer on Gemini that follows up on the candidate's actual answers and measures how they speak, not just what they say, kept in line by deterministic guards the model can't override, and paired it with a CoderPad-style live coding round that executes real code in the browser: no paid speech services, no backend runners.",
      result: "Five interview formats (technical, behavioral, mixed, system design, and live coding) with replay, shareable reports, and progress tracking, running at $0 infrastructure cost.",
      highlights: [
        "Made the interviewer react to how candidates answer: the browser measures hesitation, pace, and filler density, and in live Gemini runs a hesitant answer dropped the confidence estimate from 50 to 20 and triggered a fundamentals probe while a composed one raised it to 80, all in one schema-validated LLM call per turn",
        "Raised free AI capacity from 20 to 1,000 requests/day and cut latency (question generation ~8–10 s → ~2.5 s, interview turns ~4–7 s → ~2–2.5 s) by moving to Gemini Flash-Lite behind a model chain that fails over to a second model only on quota exhaustion or a retired model",
        "Made interviews feel like a conversation rather than a questionnaire with deterministic guards: a 3-turn cap per topic, a forward-only question index, one question per turn, stripped scripted openers, and content-word similarity scoring that eliminates reworded duplicate questions",
        "Cut per-interview speech costs to $0 across 5 interview formats with browser-native recognition and synthesis, using continuous capture that survives pauses and recognizer restarts, with retryable submissions and a 45 s cap on every model call",
        "Shipped live coding rounds with real in-browser execution for JavaScript and Python in a terminable Web Worker with a lazily loaded Pyodide (WASM) runtime, killing infinite loops at a 5 s (JS) / 15 s (Python) timeout without freezing the tab",
        "Closed a class of IDOR vulnerabilities by cutting the public Server Action surface from 19 to 9 and cleared all 5 critical dependency advisories with a Next.js 15.5 upgrade, alongside per-user daily rate limits on every model-backed endpoint, covered by a 172-test Vitest suite in CI",
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
    desc: "India-first, globally configurable multi-tenant pharmacy ERP: inventory, tax-compliant billing, procurement, accounting, and payroll with real-time sync, role-based access, and transactionally consistent operations. Country-specific tax, formats, and regulation come from regional profiles rather than code, all on $0 free-tier infra.",
    badges: [
      { label: "Full-Stack", cls: "fs" },
      { label: "Data", cls: "dt" },
      { label: "Systems", cls: "sys" },
    ],
    chips: ["Next.js 16", "React 19", "TypeScript", "Fastify 5", "Prisma 7", "Neon PostgreSQL", "Turborepo", "SSE"],
    image: "/projects/rxflow.png",
    live: "https://rx-flow-web.vercel.app",
    repo: "https://github.com/Udit013/RxFlow",
    stats: [
      { value: "135", label: "API Routes" },
      { value: "6", label: "Regional Profiles" },
    ],
    study: {
      problem: "Pharmacies run on legacy desktop software like Marg and Tally: single-machine, no real-time sync across counters, and tax compliance bolted on. Replacing it means getting inventory, billing, accounting, and payroll correct in one system, for tenants who cannot afford downtime or data drift, and in more than one country.",
      approach: "Built a multi-tenant monorepo where every signup provisions an isolated tenant, made every money-and-stock operation atomic inside database transactions, pushed updates to every device over Server-Sent Events, and moved country-specific tax, formats, and regulation into configurable regional profiles.",
      result: "A production ERP covering inventory, tax-compliant billing, procurement, accounting, and payroll across 6 regional profiles, running on $0 free-tier infrastructure with full audit trails.",
      highlights: [
        "Architected a pnpm/Turborepo monorepo (Fastify API, Next.js 16 web app, shared Prisma, types, and regional packages) spanning 135 API routes across 22 modules and 38 Prisma models, where every signup provisions an isolated tenant and every query is tenant-scoped",
        "Made the platform adaptable to any country without code changes: 6 regional profiles (India, US, Canada, UK, UAE, international) and 4 pluggable tax engines (India GST, VAT, US sales tax, none), while keeping India's GST behaviour and GSTR-1/GSTR-3B filing data unchanged",
        "Built a multi-country medicine database of 2,257 products from official open data (FDA NDC Directory via openFDA, Health Canada Drug Product Database), with every ingredient verified against NLM RxNorm and 93.7% classified by ATC therapeutic group, through an import pipeline that fails the build on any route/form contradiction",
        "Closed a critical cross-tenant data-exposure path by signing refresh tokens with a separate key, enforced one shared 8-role matrix across 126 authenticated routes, and moved sessions into rotating httpOnly, SameSite=Strict cookies after finding bcrypt's 72-byte limit made every refresh token of a user interchangeable",
        "Kept stock and ledgers consistent under concurrent billing with single Prisma transactions and an in-decrement stock floor that stops overselling, and kept every counter in sync without polling via tenant-scoped Server-Sent Events",
        "Made deploys refuse destructive changes after discovering the schema sync had been planning to drop all 36 tables on every release, added a database-connection gate that keeps the previous release live on failure, and grew coverage from 32 to 131 Vitest tests plus an 80-check end-to-end API suite",
      ],
    },
    delay: ".30s",
  },
  {
    types: ["fs", "ml", "sys"],
    num: "06",
    title: "SnapCast - Screen Recorder & One-Take Video Editor",
    desc: "Screen recorder with a one-take editor for developer demos and walkthroughs: record without rehearsing, tighten pauses and delete flubbed sentences from the transcript, then share the edit or export an MP4. Transcription, audio analysis, and rendering run in the browser, alongside AI chapters, privacy-controlled sharing, and analytics on free-tier infrastructure.",
    badges: [
      { label: "Full-Stack", cls: "fs" },
      { label: "AI / ML", cls: "ml" },
      { label: "Systems", cls: "sys" },
    ],
    chips: ["Next.js 15", "React 19", "TypeScript", "Whisper (WASM)", "WebCodecs", "Neon PostgreSQL", "Cloudinary", "Gemini"],
    image: "/projects/snapcast.png",
    live: "https://snapcast-video-sharing.vercel.app",
    repo: "https://github.com/Udit013/screen_recording_sharing_app",
    stats: [
      { value: "1080", suffix: "p", label: "Screen + Webcam" },
      { value: "118", label: "Tests in CI" },
    ],
    study: {
      problem: "A clean demo recording usually takes rehearsal or several takes, because the pauses and flubbed sentences of a single take need a separate editing tool, and transcribing or rendering video on a server costs money for every minute processed.",
      approach: "Kept the whole edit in the browser: Whisper transcription, adaptive pause detection, and WebCodecs MP4 rendering run in Web Workers and WASM, while the server only stores a validated cut list, so edits stay non-destructive and live on share links.",
      result: "A Loom-style recorder with a one-take editor: tighten pauses and delete flubbed sentences straight from the transcript, then share the edit or export an MP4, at $0 per minute processed.",
      highlights: [
        "Built a transcript-based video editor at $0 per minute processed by running Whisper, pause detection, and MP4 rendering in the browser (Web Workers + WASM), with the server only storing a validated cut list; the editor opens in ~1.6 s on a 10-minute recording",
        "Detected pauses with an adaptive loudness threshold that matched ffmpeg silencedetect on 8 of 8 pauses within ~60 ms, set from each recording's own noise floor and speech level and refusing to cut below 10 dB of separation",
        "Fixed Whisper word timestamps running 0.2–0.5 s late, which left deleted sentences partly audible, by snapping word edges to measured pauses, locked in by a regression test on real model output",
        "Rendered edits to MP4 on the user's hardware with WebCodecs after measuring Cloudinary splicing as unusable (26.4 s instead of 15 s), keeping audio and video within 31 ms at 5–7× real time",
        "Built extension-free 1080p / 30 fps recording with a webcam overlay, a Web Worker timer so recordings don't freeze in background tabs, IndexedDB crash recovery that loses at most ~1 s, and direct signed uploads up to 500 MB",
        "Closed 10 cross-user access flaws from a security audit by centralizing access rules in one unit-tested module, and shipped a custom player, timestamp comments, revocable share links, and SQL-aggregated analytics gated by 118 tests in CI",
        "Fixed AI summaries and chapters silently failing for every video after Google retired the model in use, by adding a benchmarked model fallback chain, error logging, and retry-on-failure",
      ],
    },
    delay: ".18s",
  },
  {
    types: ["sys"],
    num: "07",
    title: "CipherWatch - Credential Exposure Ledger",
    desc: "Credential exposure ledger for GitHub repositories: detects leaked credentials in current code and git history, collapses every copy into one record keyed by an HMAC fingerprint that never contains the secret, and tracks each to a decision (rotated, false positive, or accepted risk with an expiry), with a CI gate that fails only on new credentials and emits SARIF.",
    badges: [
      { label: "Systems", cls: "sys" },
    ],
    chips: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL / SQLite", "React", "TypeScript", "Docker", "GitHub Actions"],
    image: "/projects/cipherwatch.png",
    live: "https://cipherwatch-web.vercel.app",
    repo: "https://github.com/Udit013/automated-secrets-scanner",
    stats: [
      { value: "26", label: "Credential Types" },
      { value: "130", label: "Backend Tests" },
    ],
    study: {
      problem: "A credential committed once stays in git history until someone rotates it, and scanning only the current checkout misses it. Scanners also report every copy of a key as a separate finding with no memory of what was already triaged, so teams stop reading the report.",
      approach: "Fingerprinted every credential with a keyed HMAC so each copy across files and commits becomes one ledger record tracked to a decision, and gated CI only on credentials that are not already in a committed baseline.",
      result: "A credential exposure ledger with a CLI and composite GitHub Action that emit SARIF, a console with per-project triage and provider rotation links, and an optional private mode, running at $0 on free tiers.",
      highlights: [
        "Detected 26 credential types (8 critical, 17 high, 1 medium) across 40 file extensions plus 11 extensionless credential files (id_rsa, .npmrc, …) by pairing 23 format-specific regexes with Shannon-entropy gating and 14 placeholder rules; measured ~96K lines/sec single-threaded on v2.1 of the engine",
        "Turned line-level findings into a credential ledger with keyed HMAC-SHA256 fingerprints, so one key copied across files and commits is one record whose triage decision persists across rescans; accepted risks require a review date within 366 days and reopen automatically",
        "Built a CI gate that fails only on new credentials: a CLI (exit codes 0 / 1 / 2, text / JSON / SARIF 2.1.0) and a composite GitHub Action that passes inputs only through env vars, with baselines that store fingerprints, never secrets",
        "Added optional private mode covering all 22 HTTP endpoints plus the WebSocket, with the token kept out of URLs and access logs, and bounded the public demo with a per-IP sliding window (10 scans / 10 min) that can't be spoofed through X-Forwarded-For",
        "Found and fixed real defects by testing against PostgreSQL and real repositories, including scheduler timestamps Postgres rejected, fingerprints that changed every scan, and key files never scanned while .venv was (2,392 → 89 files)",
        "Verified every change with 130 backend tests plus 19 legacy tests on SQLite, PostgreSQL 18, and Python 3.11 in a 4-job GitHub Actions pipeline, with 0 known vulnerabilities from pip-audit and runtime npm audit, deployed at $0",
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
