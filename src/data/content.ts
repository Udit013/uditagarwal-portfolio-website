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
    desc: 'IEEE-published research in medical imaging. CNNs, LSTMs, NLP pipelines, transformers, fine-tuned LLMs, and real-time voice AI in production.',
    chips: ['TensorFlow', 'PyTorch', 'BERT', 'DeBERTa', 'Hugging Face', 'Gemini API', 'Vapi AI'],
  },
  {
    title: 'Data Engineering & Analytics',
    desc: 'ETL pipelines, normalized schema design, batch processing, and dashboards that transform raw datasets into actionable decisions.',
    chips: ['ETL', 'Airflow', 'Tableau', 'SQL', 'Pandas', 'NumPy', 'Chart.js'],
  },
  {
    title: 'Cloud & Systems Design',
    desc: 'Distributed systems, cloud infrastructure, containerization, auth flows, and API design with a focus on reliability at scale.',
    chips: ['AWS', 'Docker', 'CI/CD', 'Redis', 'Vercel', 'Firebase', 'System Design'],
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

/* ── Skills — grouped into selectable categories (the Toolkit) ── */
export interface SkillCategory {
  id: string
  label: string
  blurb: string
  techs: string[]
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    blurb: 'Core programming & query languages',
    techs: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'HTML', 'CSS'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    blurb: 'Interfaces, motion & real-time 3D',
    techs: ['React', 'Next.js', 'Tailwind CSS', 'GSAP', 'Three.js', 'WebGL', 'HTML5', 'CSS3'],
  },
  {
    id: 'backend',
    label: 'Backend',
    blurb: 'APIs, services & system design',
    techs: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'GraphQL', 'API Design', 'Authentication', 'System Design', 'Distributed Systems'],
  },
  {
    id: 'ai',
    label: 'AI / ML',
    blurb: 'Deep learning, NLP & LLMs',
    techs: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'BERT', 'DeBERTa', 'Transformers', 'Hugging Face', 'NLP', 'Prompt Engineering', 'LLM APIs', 'Gemini API', 'Vapi AI', 'Deep Learning'],
  },
  {
    id: 'data',
    label: 'Data',
    blurb: 'Databases, pipelines & analytics',
    techs: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Firebase', 'Drizzle ORM', 'Pandas', 'NumPy', 'Tableau', 'Chart.js', 'Airflow', 'ETL Pipelines', 'Data Modeling'],
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    blurb: 'Infra, containers & delivery',
    techs: ['AWS', 'Docker', 'CI/CD', 'Vercel', 'Git', 'GitHub Actions'],
  },
  {
    id: 'tools',
    label: 'Tools',
    blurb: 'Day-to-day developer toolkit',
    techs: ['Git', 'GitHub', 'Postman', 'VS Code', 'Jupyter', 'Linux'],
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
    period: 'Feb 2026 → Present',
    datetime: '2026-02',
    type: 'Part-Time · Hybrid',
    role: 'Software Engineer',
    company: 'Global Health Impact Project · Indiana University',
    bullets: [
      'Building a data-driven global health platform (Python, React, SQL) analyzing pharmaceutical impact across populations',
      'Contributing to a forecasting tool modeling treatment coverage, efficacy, and disease trend outcomes',
      'Designing scalable APIs and data pipelines to evaluate health outcomes and treatment coverage',
      'Translating cross-functional research requirements into production-ready full-stack solutions',
      'Collaborating with research teams to improve data accessibility and usability',
    ],
    chips: ['Python', 'React', 'TypeScript', 'SQL', 'FastAPI', 'Data Analysis'],
  },
  {
    period: 'Aug 2025 → Present',
    datetime: '2025-08',
    type: 'Part-Time · On-site',
    role: 'Technology Consultant',
    company: 'University Information Technology Services (UITS) · Indiana University Bloomington',
    bullets: [
      'Resolved 100+ technical issues weekly across desktop, mobile, and enterprise systems for a large campus user base',
      'Applied structured root-cause analysis to reduce recurring system issues and improve reliability',
      'Managed identity and access systems ensuring secure and seamless user authentication',
      'Assisted with network connectivity and system access across campus environments',
      'Documented support workflows to improve operational efficiency and service delivery',
    ],
    chips: ['Enterprise IT', 'Identity & Access', 'Troubleshooting', 'Problem Solving'],
    delay: '.12s',
  },
]

/* ── Projects ── */
export type ProjectType = 'fs' | 'ml' | 'dt'

export interface ProjectBadge {
  label: string
  cls: 'fs' | 'ml' | 'dt' | 'pub' | 'wip'
}

export interface ProjectStat {
  value: string
  suffix?: string
  label: string
}

export interface Project {
  type: ProjectType
  num: string
  title: string
  desc: string
  badges: ProjectBadge[]
  chips: string[]
  href: string
  cursor: string
  stats?: ProjectStat[]
  delay?: string
}

export const PROJECT_FILTERS: { id: ProjectType | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'fs', label: 'Full-Stack' },
  { id: 'ml', label: 'AI / ML' },
  { id: 'dt', label: 'Data' },
]

export const PROJECTS: Project[] = [
  {
    type: 'fs',
    num: '01',
    title: 'AI Mock Interview Platform',
    desc: 'Full-stack AI system with real-time voice interviews, LLM-driven question generation via Gemini API, and structured feedback evaluation pipelines.',
    badges: [{ label: 'Full-Stack', cls: 'fs' }],
    chips: ['Next.js', 'Firebase', 'Node.js', 'Vapi AI', 'Gemini API'],
    href: 'https://github.com/Udit013',
    cursor: 'View',
  },
  {
    type: 'ml',
    num: '02',
    title: 'Brain Tumor Classification',
    desc: 'Deep learning model published at ICC-ROBINS 2024. Benchmarked CNN, VGG16, InceptionV3, and EfficientNet on 7,000+ MRI scans.',
    badges: [
      { label: 'AI / ML', cls: 'ml' },
      { label: 'IEEE 2024', cls: 'pub' },
    ],
    chips: ['TensorFlow', 'Keras', 'EfficientNetB3', 'CNN'],
    href: 'https://doi.org/10.1109/ICC-ROBINS60238.2024.10533941',
    cursor: 'Paper',
    stats: [
      { value: '99.84', suffix: '%', label: 'Accuracy' },
      { value: '7023', label: 'MRI Scans' },
    ],
    delay: '.06s',
  },
  {
    type: 'fs',
    num: '03',
    title: 'Screen Recording & Video Platform',
    desc: 'Serverless platform with screen recording, CDN delivery via Bunny.net, AI-generated transcripts, privacy controls, and Arcjet rate limiting.',
    badges: [{ label: 'Full-Stack', cls: 'fs' }],
    chips: ['Next.js', 'TypeScript', 'Bunny.net', 'Xata', 'Drizzle ORM', 'Arcjet'],
    href: 'https://github.com/Udit013',
    cursor: 'View',
    delay: '.12s',
  },
  {
    type: 'ml',
    num: '04',
    title: 'LLM Generated Text Detection',
    desc: 'BERT-based classifier fine-tuned to distinguish human vs. AI-generated text with a cross-validation evaluation pipeline for reliable comparison.',
    badges: [{ label: 'AI / ML', cls: 'ml' }],
    chips: ['BERT', 'Hugging Face', 'PyTorch', 'NLP'],
    href: 'https://github.com/Udit013',
    cursor: 'View',
    stats: [{ value: '95.25', suffix: '%', label: 'Accuracy' }],
    delay: '.18s',
  },
  {
    type: 'fs',
    num: '05',
    title: 'Automated Secrets Scanner',
    desc: 'Security tool detecting hardcoded credentials via entropy-based analysis and regex pattern matching with a full vulnerability dashboard.',
    badges: [{ label: 'Full-Stack', cls: 'fs' }],
    chips: ['Python', 'FastAPI', 'React', 'PostgreSQL'],
    href: 'https://github.com/Udit013',
    cursor: 'View',
    delay: '.24s',
  },
  {
    type: 'ml',
    num: '06',
    title: 'Aphasia Detection — DeBERTa-v3',
    desc: 'Clinical NLP system using fine-tuned DeBERTa-v3 on speech transcripts with custom preprocessing for dysfluency and annotation handling.',
    badges: [{ label: 'AI / ML', cls: 'ml' }],
    chips: ['DeBERTa-v3', 'Hugging Face', 'Clinical NLP', 'PyTorch'],
    href: 'https://github.com/Udit013',
    cursor: 'View',
    stats: [{ value: '0.90', label: 'F1-Score' }],
    delay: '.30s',
  },
  {
    type: 'dt',
    num: '07',
    title: 'Retail Analytics Platform',
    desc: 'Normalized schema handling 10K+ records, SQL-based ETL pipelines, and interactive KPI dashboards for business performance. Deployed on Vercel + Supabase.',
    badges: [{ label: 'Data', cls: 'dt' }],
    chips: ['Next.js', 'PostgreSQL', 'Drizzle ORM', 'Chart.js', 'ETL'],
    href: 'https://github.com/Udit013',
    cursor: 'View',
    delay: '.36s',
  },
  {
    type: 'dt',
    num: '08',
    title: 'User Behavior Analytics Pipeline',
    desc: 'End-to-end ETL pipeline ingesting app logs for engagement and retention analysis with Airflow orchestration and Tableau dashboards.',
    badges: [
      { label: 'Data', cls: 'dt' },
      { label: 'In Progress', cls: 'wip' },
    ],
    chips: ['Python', 'PostgreSQL', 'Airflow', 'Tableau'],
    href: 'https://github.com/Udit013',
    cursor: 'View',
    delay: '.42s',
  },
  {
    type: 'ml',
    num: '09',
    title: 'Stock Market Prediction — LSTM',
    desc: 'LSTM time series model predicting stock price trends from historical financial data with attention-based feature extraction and backtesting pipeline.',
    badges: [{ label: 'AI / ML', cls: 'ml' }],
    chips: ['Python', 'TensorFlow', 'LSTM', 'Pandas', 'Time Series'],
    href: 'https://github.com/Udit013',
    cursor: 'View',
    delay: '.48s',
  },
  {
    type: 'dt',
    num: '10',
    title: 'Market Entry Strategy Simulator',
    desc: 'Decision model evaluating market expansion strategies using simulated business data, SQL analytics, and scenario-based Tableau visualizations.',
    badges: [{ label: 'Data', cls: 'dt' }],
    chips: ['Python', 'SQL', 'Tableau', 'Simulation'],
    href: 'https://github.com/Udit013',
    cursor: 'View',
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
