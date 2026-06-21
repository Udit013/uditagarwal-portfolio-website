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

/* The core build stack — also used by the 3D skills showcase. */
export const CORE_STACK = [
  'React',
  'TypeScript',
  'GSAP',
  'Three.js',
  'WebGL',
  'HTML',
  'CSS',
  'JavaScript',
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
  { text: 'Python · React · Next.js' },
  { text: 'AI / ML Research', hi: true },
  { text: 'IEEE Published · ICC-ROBINS 2024' },
  { text: 'Cloud Native', hi: true },
  { text: 'PostgreSQL · Docker · AWS' },
  { text: 'NLP · Transformers · LLMs', hi: true },
  { text: 'Data Engineering · ETL' },
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
    desc: 'End-to-end systems from API design to production UIs. React, Next.js, Node.js, PostgreSQL, FastAPI — shipped at scale.',
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
    desc: 'Distributed systems, cloud infrastructure, containerization, auth flows, and API design with a focus on reliability at scale.',
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
    school: 'Kalinga Institute of Industrial Technology (KIIT University), India',
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
  { issuer: 'DeepLearning.AI', name: 'Neural Networks & Deep Learning' },
  { issuer: 'DeepLearning.AI', name: 'Improving DNNs: Hyperparameter Tuning' },
  { issuer: 'Amazon Web Services', name: 'AWS Academy Graduate — Cloud Introduction' },
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
    id: 'frontend',
    label: 'Programming & Frontend',
    blurb: 'Languages and the interface layer',
    groups: [
      { label: 'Programming Languages', skills: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C/C++', 'SQL'] },
      { label: 'Frontend Technologies', skills: ['React', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'GSAP', 'Three.js / WebGL', 'Chart.js', 'Apache ECharts', 'Recharts'] },
    ],
  },
  {
    id: 'backend',
    label: 'Backend, APIs & Architecture',
    blurb: 'Services, APIs and system design',
    groups: [
      { label: 'Backend Frameworks', skills: ['Node.js', 'Express.js', 'Fastify', 'FastAPI'] },
      { label: 'API Development', skills: ['REST APIs', 'WebSockets', 'Server-Sent Events', 'Zod', 'APScheduler', 'React Query'] },
      { label: 'Systems & Architecture', skills: ['System Design', 'Distributed Systems', 'API Design', 'Authentication & Authorization', 'Fault Tolerance', 'Serverless Architecture', 'Monorepo Architecture'] },
    ],
  },
  {
    id: 'data',
    label: 'Databases & Data Engineering',
    blurb: 'Storage, pipelines and analytics',
    groups: [
      { label: 'Databases & Storage', skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Firebase', 'Firestore', 'Neo4j', 'SQLite', 'Drizzle ORM', 'Prisma'] },
      { label: 'Data Engineering', skills: ['Pandas', 'NumPy', 'Apache Airflow', 'ETL Pipelines', 'Data Modeling'] },
      { label: 'Analytics Technologies', skills: ['Matplotlib', 'Tableau', 'Forecasting', 'Statistical Modeling'] },
    ],
  },
  {
    id: 'ai',
    label: 'AI, Machine Learning & LLMs',
    blurb: 'Deep learning, LLMs and fine-tuning',
    groups: [
      { label: 'AI / ML', skills: ['PyTorch', 'TensorFlow/Keras', 'Scikit-learn', 'Hugging Face', 'Transformers', 'CNNs (VGG16 / InceptionV3 / EfficientNetB3)', 'BERT', 'ONNX Runtime', 'Grad-CAM', 'Model Calibration', 'Prompt Engineering'] },
      { label: 'LLM Frameworks', skills: ['Gemini API', 'Ollama', 'RAG', 'Structured Generation', 'Hugging Face Hub', 'Gradio', 'vLLM', 'lm-evaluation-harness'] },
      { label: 'Fine-Tuning Technologies', skills: ['Qwen2.5', 'LLM Fine-Tuning', 'QLoRA', 'PEFT / LoRA', '4-bit Quantization (bitsandbytes)'] },
      { label: 'MLOps & Experimentation', skills: ['Model Evaluation & Benchmarking', 'Inference Optimization', 'Experiment Tracking', 'Hyperparameter Tuning', 'Model Cards'] },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud, DevOps & Security',
    blurb: 'Infra, delivery and DevSecOps',
    groups: [
      { label: 'Cloud Platforms', skills: ['AWS (EC2 / S3 / Lambda / RDS / CloudFront)', 'Vercel', 'Cloudinary'] },
      { label: 'DevOps Tools', skills: ['Docker', 'CI/CD', 'Git', 'Postman', 'ServiceNow', 'Turborepo'] },
      { label: 'Infrastructure', skills: ['Caching', 'Load Balancing', 'Auto-Scaling'] },
      { label: 'Security & DevSecOps', skills: ['Secrets Detection', 'Regex Pattern Matching', 'Entropy Analysis', 'Vulnerability Scanning', 'Git History Auditing', 'SARIF Export', 'SMTP Alerting'] },
    ],
  },
  {
    id: 'testing',
    label: 'Testing & Quality Engineering',
    blurb: 'Tests, validation and reliability',
    groups: [
      { label: 'Testing Frameworks', skills: ['Vitest', 'Unit Testing'] },
      { label: 'Quality Assurance Tools', skills: ['Cross-Validation', 'Error Analysis', 'Data Leakage Auditing', 'jsPDF'] },
      { label: 'Performance & Reliability Testing', skills: ['Backtesting', 'Confidence Calibration', 'OOD Testing', 'A/B Testing'] },
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
  bullets: string[]
  chips: string[]
  delay?: string
}

export const JOURNEY: JourneyEntry[] = [
  {
    period: 'Jan 2026 – May 2026',
    datetime: '2026-01',
    type: 'Health Analytics · Full-Stack',
    role: 'Software Engineer',
    company: 'Global Health Impact Project · Indiana University',
    bullets: [
      'Designed and developed full-stack features for a global health analytics platform using React, TypeScript, and Python, enabling researchers to evaluate pharmaceutical intervention effectiveness across diverse populations',
      'Built scalable backend services and data processing pipelines to support treatment coverage modeling, efficacy analysis, forecasting workflows, and large-scale health outcome evaluation',
      'Developed and maintained REST APIs powering analytics dashboards, forecasting tools, and data-driven decision workflows across multiple platform components',
      'Optimized database queries, backend services, and distributed processing workflows to improve application performance, scalability, and responsiveness under increasing analytical workloads',
      'Performed root-cause analysis of system bottlenecks and production issues, implementing long-term fixes that improved platform reliability and operational stability',
      'Collaborated with researchers, engineers, and domain experts to translate complex health analytics requirements into production-ready software solutions',
    ],
    chips: ['Python', 'React', 'TypeScript', 'REST APIs', 'SQL', 'Data Pipelines'],
  },
  {
    period: 'Aug 2025 – May 2026',
    datetime: '2025-08',
    type: 'Enterprise IT · On-site',
    role: 'Consultant – IT Services',
    company: 'University Information Technology Services (UITS) · Indiana University',
    bullets: [
      'Resolved 100+ technical issues weekly across desktop, mobile, and enterprise systems using structured troubleshooting methodologies and root-cause analysis techniques',
      'Diagnosed hardware, software, authentication, networking, and account-access issues, improving system reliability and minimizing service disruptions for a large user population',
      'Supported identity and access management workflows, ensuring secure authentication, authorization, and account lifecycle management across university systems',
      'Analyzed recurring support incidents and system behavior patterns to identify underlying causes and recommend process or technical improvements',
      'Documented issue resolution procedures, operational workflows, and service requests within ServiceNow to improve knowledge sharing, consistency, and support efficiency',
      'Collaborated with cross-functional IT teams to escalate complex issues, coordinate resolutions, and maintain high levels of service availability',
    ],
    chips: ['Enterprise IT', 'Identity & Access', 'ServiceNow', 'Troubleshooting', 'Root-Cause Analysis'],
    delay: '.12s',
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

export interface Project {
  /** A project can belong to more than one category. */
  types: ProjectType[]
  num: string
  title: string
  desc: string
  badges: ProjectBadge[]
  chips: string[]
  live?: string
  repo?: string
  paper?: string
  /** No live demo yet — show "Demo coming soon" instead of a broken link. */
  demoSoon?: boolean
  /** Non-link footnote for internal/private work (e.g. university project). */
  note?: string
  stats?: ProjectStat[]
  delay?: string
}

export const PROJECT_FILTERS: { id: ProjectType | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'fs', label: 'Full-Stack & Software Engineering' },
  { id: 'ml', label: 'AI, Machine Learning & LLMs' },
  { id: 'dt', label: 'Data & Decision Intelligence' },
  { id: 'sys', label: 'Systems, Security & Infrastructure' },
]

export const PROJECTS: Project[] = [
  {
    types: ['ml', 'sys'],
    num: '01',
    title: 'Brain Tumor Classification — Production ML Pipeline',
    desc: 'Production-grade extension of an IEEE-published brain-tumor MRI classifier — adds train/test leakage auditing, out-of-distribution testing, confidence calibration, Grad-CAM explainability, and a containerized ONNX + FastAPI inference service.',
    badges: [
      { label: 'AI / ML', cls: 'ml' },
      { label: 'Systems', cls: 'sys' },
      { label: 'IEEE 2024', cls: 'pub' },
    ],
    chips: ['Python', 'TensorFlow/Keras', 'EfficientNetB3', 'ONNX Runtime', 'FastAPI', 'Grad-CAM', 'Docker'],
    repo: 'https://github.com/Udit013/Brain_Tumor_Classificatioin',
    paper: 'https://doi.org/10.1109/ICC-ROBINS60238.2024.10533941',
    demoSoon: true,
    stats: [
      { value: '99.84', suffix: '%', label: 'IEEE Accuracy' },
      { value: '7023', label: 'MRI Scans' },
    ],
  },
  {
    types: ['fs', 'ml'],
    num: '02',
    title: 'Voice Interview Simulator',
    desc: 'AI interview-prep platform running adaptive voice interviews with résumé-aware question generation and five-competency scoring — built entirely on browser-native speech and free-tier infrastructure at $0 cost.',
    badges: [
      { label: 'Full-Stack', cls: 'fs' },
      { label: 'AI / ML', cls: 'ml' },
    ],
    chips: ['Next.js', 'TypeScript', 'Firebase', 'Gemini 2.5 Flash', 'Web Speech API', 'Zod'],
    live: 'https://mock-ai-prep.vercel.app',
    repo: 'https://github.com/Udit013/ai_mock_interview_prep',
    delay: '.06s',
  },
  {
    types: ['ml', 'sys'],
    num: '03',
    title: 'Biomedical LLM Adaptation Benchmark',
    desc: 'A reproducible QLoRA pipeline studying when 4-bit fine-tuning actually helps a strong instruction-tuned LLM on biomedical benchmarks — with leakage-safe in-/out-of-domain evaluation and a serving-cost harness, framed as engineering, not an accuracy chase.',
    badges: [
      { label: 'AI / ML', cls: 'ml' },
      { label: 'Systems', cls: 'sys' },
    ],
    chips: ['Python', 'Qwen2.5-7B', 'QLoRA', 'PEFT/TRL', 'Hugging Face', 'vLLM', 'FastAPI'],
    repo: 'https://github.com/Udit013/biomed-llm-peft',
    demoSoon: true,
    stats: [
      { value: '64.5', suffix: '%', label: 'PubMedQA (OOD)' },
      { value: '194', suffix: 'K', label: 'MedMCQA' },
    ],
    delay: '.12s',
  },
  {
    types: ['fs', 'ml', 'sys'],
    num: '04',
    title: 'Screen Recording & Video Sharing Platform',
    desc: 'Browser-native screen recording and sharing with webcam picture-in-picture, direct-to-CDN uploads, Web Speech transcription, Gemini-generated chapters and summaries, 3-tier privacy with share tokens, and channel analytics.',
    badges: [
      { label: 'Full-Stack', cls: 'fs' },
      { label: 'AI / ML', cls: 'ml' },
      { label: 'Systems', cls: 'sys' },
    ],
    chips: ['Next.js', 'TypeScript', 'Cloudinary', 'Neon PostgreSQL', 'Drizzle ORM', 'Gemini', 'better-auth'],
    live: 'https://snapcast-video-sharing.vercel.app',
    repo: 'https://github.com/Udit013/screen_recording_sharing_app',
    delay: '.18s',
  },
  {
    types: ['fs', 'ml', 'dt'],
    num: '05',
    title: 'CoreSight IQ — Decision Intelligence Engine',
    desc: 'Unified decision-intelligence platform (ingest → score → recommend → report → advise) spanning product, retail, and market analytics on a reusable core engine — with walk-forward backtesting and calibration so every accuracy claim is auditable.',
    badges: [
      { label: 'Full-Stack', cls: 'fs' },
      { label: 'AI / ML', cls: 'ml' },
      { label: 'Data', cls: 'dt' },
    ],
    chips: ['Next.js', 'TypeScript', 'Apache ECharts', 'Drizzle ORM', 'Neon PostgreSQL', 'Ollama', 'Vitest'],
    live: 'https://coresightiq.vercel.app',
    repo: 'https://github.com/Udit013/decision-intelligence-platform',
    stats: [
      { value: '85', label: 'Unit Tests' },
      { value: '1.07', suffix: 'M', label: 'Transactions' },
    ],
    delay: '.24s',
  },
  {
    types: ['fs', 'dt', 'sys'],
    num: '06',
    title: 'Pharmacy ERP & Distribution System',
    desc: 'Multi-tenant pharmacy ERP for the Indian market — GST-compliant billing (CGST/SGST/IGST, GSTR-1/3B), transactionally consistent inventory and accounting, procurement, and payroll — with real-time multi-device sync over Server-Sent Events, deployed on $0 free-tier infra.',
    badges: [
      { label: 'Full-Stack', cls: 'fs' },
      { label: 'Data', cls: 'dt' },
      { label: 'Systems', cls: 'sys' },
    ],
    chips: ['Next.js', 'TypeScript', 'Fastify', 'Prisma', 'Neon PostgreSQL', 'Turborepo', 'SSE', 'jsPDF'],
    live: 'https://rx-flow-web.vercel.app',
    repo: 'https://github.com/Udit013/RxFlow',
    delay: '.30s',
  },
  {
    types: ['sys'],
    num: '07',
    title: 'Automated Secrets Scanner',
    desc: 'DevSecOps platform detecting hardcoded secrets across code and full git history via regex, Shannon entropy, and semantic heuristics — with 0–100 exposure risk scoring, differential scanning, real-time WebSocket progress, and SARIF/CI-CD export.',
    badges: [{ label: 'Systems', cls: 'sys' }],
    chips: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'WebSocket', 'APScheduler'],
    live: 'https://automated-secrets-scanner.vercel.app',
    repo: 'https://github.com/Udit013/automated-secrets-scanner',
    stats: [
      { value: '0.94', label: 'F1 Score' },
      { value: '26', label: 'Secret Types' },
    ],
    delay: '.36s',
  },
  {
    types: ['fs', 'dt'],
    num: '08',
    title: 'Product Strategy Platform — ProductLab',
    desc: 'Product-intelligence platform turning behavior data into ranked, confidence-scored decisions — conversion funnels, D1–D90 cohort retention, A/B & multivariate testing, RICE/ICE/WSJF prioritization, and a Decision Center with exportable reports.',
    badges: [
      { label: 'Full-Stack', cls: 'fs' },
      { label: 'Data', cls: 'dt' },
    ],
    chips: ['Next.js', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Apache ECharts', 'Ollama'],
    live: 'https://productlab-platform.vercel.app',
    repo: 'https://github.com/Udit013/productlab',
    stats: [
      { value: '280', suffix: 'K+', label: 'Events' },
      { value: '10', suffix: 'K', label: 'Users' },
    ],
    delay: '.42s',
  },
  {
    types: ['fs', 'dt'],
    num: '09',
    title: 'Operations Intelligence System — RetailNexa',
    desc: 'Retail decision-intelligence platform with sales forecasting, RFM/CLV customer intelligence, inventory optimization, pricing simulation, root-cause analysis, and an Ollama-powered AI analyst with downloadable executive reports.',
    badges: [
      { label: 'Full-Stack', cls: 'fs' },
      { label: 'Data', cls: 'dt' },
    ],
    chips: ['Next.js', 'TypeScript', 'Neon PostgreSQL', 'Drizzle ORM', 'Recharts', 'Ollama'],
    live: 'https://retailnexa.vercel.app',
    repo: 'https://github.com/Udit013/retail-analytics-platform',
    stats: [
      { value: '0.90', label: 'Forecast R²' },
      { value: '86', suffix: '%', label: 'Accuracy' },
    ],
    delay: '.48s',
  },
  {
    types: ['fs', 'dt'],
    num: '10',
    title: 'Market Expansion Engine — GeoStrategy',
    desc: 'Market-expansion intelligence across 121 global markets — opportunity scoring (Expand / Investigate / Monitor / Avoid), scenario simulators for revenue and break-even, competitive and risk frameworks, and an Ollama strategy advisor with PDF exports.',
    badges: [
      { label: 'Full-Stack', cls: 'fs' },
      { label: 'Data', cls: 'dt' },
    ],
    chips: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Apache ECharts', 'PostgreSQL', 'Ollama', 'jsPDF'],
    live: 'https://geostrategy.vercel.app',
    repo: 'https://github.com/Udit013/geostrategy',
    stats: [{ value: '121', label: 'Global Markets' }],
    delay: '.54s',
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
