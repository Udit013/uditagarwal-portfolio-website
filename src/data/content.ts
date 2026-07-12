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
  location: string
  desc: string
  current?: boolean
  bullets: string[]
  chips: string[]
  delay?: string
}

export const JOURNEY: JourneyEntry[] = [
  {
    period: 'Jun 2026 – Present',
    datetime: '2026-06',
    type: 'Full-Time · Remote',
    role: 'Senior Consultant',
    company: 'Heartland Community Network (HCN)',
    location: 'Remote · Indiana, US',
    desc: 'Technology consulting initiative delivering software engineering, AI, automation, and analytics solutions for businesses across Indiana.',
    current: true,
    bullets: [
      'Partner with business stakeholders to translate operational challenges and requirements into scalable software, AI, and data-driven solutions',
      'Design and build full-stack applications, backend services, REST APIs, analytics dashboards, and automation workflows tailored to client needs',
      'Build AI-powered solutions leveraging LLMs, data analytics, and workflow automation to streamline business processes and enhance decision-making',
      'Collaborate with cross-functional engineering, data, and business teams to deliver digital transformation initiatives across multiple industries',
      'Own the full software development lifecycle — solution design, implementation, testing, deployment, and ongoing maintenance of production systems',
    ],
    chips: ['Full-Stack', 'LLMs / AI', 'REST APIs', 'Automation', 'Analytics', 'Data Pipelines'],
  },
  {
    period: 'Aug 2025 – Present',
    datetime: '2025-08',
    type: 'Part-Time · On-site',
    role: 'Consultant – IT Services',
    company: 'University Information Technology Services (UITS) · Indiana University',
    location: 'Bloomington, IN, US',
    desc: 'Technical support and systems administration for university-wide infrastructure, enterprise applications, and identity systems.',
    current: true,
    bullets: [
      'Resolved 100+ technical issues weekly across desktop, mobile, and enterprise systems using structured troubleshooting and root-cause analysis',
      'Diagnosed hardware, software, authentication, and networking issues, improving reliability and minimizing disruptions for a large user population',
      'Supported identity and access management workflows, ensuring secure authentication, authorization, and account lifecycle management',
      'Analyzed recurring incidents and system behavior patterns to identify root causes and recommend process and technical improvements',
      'Documented resolution procedures and operational workflows in ServiceNow to improve knowledge sharing, consistency, and support efficiency',
    ],
    chips: ['Enterprise IT', 'Identity & Access', 'ServiceNow', 'Troubleshooting', 'Root-Cause Analysis'],
    delay: '.1s',
  },
  {
    period: 'Jan 2026 – Jun 2026',
    datetime: '2026-01',
    type: 'Part-Time · Hybrid',
    role: 'Software Engineer',
    company: 'Global Health Impact Project · Indiana University',
    location: 'Bloomington, IN, US',
    desc: 'Data-driven global health analytics platform modeling pharmaceutical intervention impact across populations.',
    bullets: [
      'Designed and built full-stack features with React, TypeScript, and Python so researchers could evaluate pharmaceutical intervention effectiveness across populations',
      'Built scalable backend services and data pipelines for treatment-coverage modeling, efficacy analysis, and large-scale health-outcome evaluation',
      'Developed and maintained REST APIs powering analytics dashboards, forecasting tools, and data-driven decision workflows',
      'Optimized database queries and distributed processing workflows to improve performance and scalability under heavy analytical workloads',
      'Performed root-cause analysis of bottlenecks and production issues, implementing long-term fixes that improved platform reliability',
    ],
    chips: ['Python', 'React', 'TypeScript', 'REST APIs', 'SQL', 'Data Pipelines'],
    delay: '.2s',
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

export const PROJECT_FILTERS: { id: ProjectType; label: string }[] = [
  { id: 'fs', label: 'Full-Stack & Software Engineering' },
  { id: 'ml', label: 'AI, Machine Learning & LLMs' },
  { id: 'dt', label: 'Data & Decision Intelligence' },
  { id: 'sys', label: 'Systems, Security & Infrastructure' },
]

export const PROJECTS: Project[] = [
  {
    types: ['ml', 'sys'],
    num: '01',
    title: 'Brain Tumor Classification — Production ML Framework',
    desc: 'Production-grade extension of an IEEE-published brain tumor MRI classifier with leakage auditing, confidence calibration, Grad-CAM explainability, ONNX inference, and a live Hugging Face demo.',
    badges: [
      { label: 'AI / ML', cls: 'ml' },
      { label: 'Systems', cls: 'sys' },
      { label: 'IEEE 2024', cls: 'pub' },
    ],
    chips: [
      'Python',
      'TensorFlow/Keras',
      'EfficientNetB3',
      'ONNX Runtime',
      'FastAPI',
      'Gradio',
      'Docker',
    ],
    repo: 'https://github.com/Udit013/Brain_Tumor_Classificatioin',
    paper: 'https://doi.org/10.1109/ICC-ROBINS60238.2024.10533941',
    live: 'https://huggingface.co/spaces/Udit013/brain-tumor-mri-classifier',
    stats: [
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
    title: 'Biomedical AI Research Assistant',
    desc: 'Production biomedical research assistant answering clinical questions with grounded, cited evidence using RAG, a LangGraph multi-agent workflow, and a QLoRA-tuned Qwen2.5-7B on 100% free-tier infrastructure.',
    badges: [
      { label: 'AI / ML', cls: 'ml' },
      { label: 'Systems', cls: 'sys' },
    ],
    chips: ['Python', 'Qwen2.5-7B', 'QLoRA', 'LangGraph', 'RAG', 'pgvector', 'FastAPI'],
    live: 'https://huggingface.co/spaces/Udit013/biomed-assistant',
    repo: 'https://github.com/Udit013/biomed-llm-peft',
    stats: [
      { value: '64.5', suffix: '%', label: 'PubMedQA (OOD)' },
      { value: '3.4', suffix: 'K', label: 'RAG Chunks' },
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
    title: 'Decision Intelligence Engine',
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
    title: 'Secret Exposure Detection',
    desc: 'DevSecOps platform detecting hardcoded secrets across code and full git history via regex, Shannon entropy, and semantic heuristics — with 0–100 exposure risk scoring, differential scanning, real-time WebSocket progress, and SARIF/CI-CD export.',
    badges: [{ label: 'Systems', cls: 'sys' }],
    chips: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'WebSocket', 'APScheduler'],
    live: 'https://cipherwatch-web.vercel.app',
    repo: 'https://github.com/Udit013/automated-secrets-scanner',
    stats: [
      { value: '0.94', label: 'F1 Score' },
      { value: '26', label: 'Secret Types' },
    ],
    delay: '.36s',
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
