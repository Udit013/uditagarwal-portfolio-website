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
<span class="t-hi">projects</span>       All 10 projects
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
  Software Engineer @ Global Health Impact Project (IU)
  IT Consultant @ UITS, Indiana University

Email: agarwaludit13@gmail.com  ·  Phone: +1 (930) 904-4901
<span class="t-sys">Seeking full-time SWE · AI/ML · Data roles — available June 2026</span>`,

  skills: `<span class="t-hi">Frontend</span>      React · Next.js · TypeScript · Tailwind · GSAP · HTML/CSS
<span class="t-hi">Backend</span>       Node.js · FastAPI · Express.js · REST APIs · GraphQL
<span class="t-hi">AI / ML</span>       Python · TensorFlow · PyTorch · BERT · DeBERTa · Hugging Face
<span class="t-hi">LLMs</span>          Gemini API · Vapi AI · Prompt Engineering · LLM APIs
<span class="t-hi">Databases</span>     PostgreSQL · MySQL · MongoDB · Redis · Firebase
<span class="t-hi">Data / ETL</span>    Pandas · NumPy · Tableau · Airflow · Chart.js
<span class="t-hi">Cloud</span>         AWS · Docker · CI/CD · Git · Vercel
<span class="t-hi">Systems</span>       System Design · Distributed Systems · Auth · API Design`,

  experience: `<span class="t-hi">[ Feb 2026 → Present ]</span>  Software Engineer
  Global Health Impact Project · Indiana University (Volunteer)
  → Data-driven platform (Python, React, SQL) analyzing pharmaceutical impact
  → Forecasting tool for treatment coverage &amp; disease trend modeling
  → Scalable APIs and pipelines for health outcome evaluation
  Stack: Python, React, TypeScript, SQL, FastAPI

<span class="t-hi">[ Aug 2025 → Present ]</span>  IT Consultant
  UITS · Indiana University Bloomington (9 months)
  → 100+ issues/week resolved across enterprise systems
  → Root-cause analysis · Identity &amp; access management
  → Network connectivity and system access support`,

  projects: `<span class="t-hi">01</span>  AI Mock Interview Platform     [Full-Stack]
    Next.js · Firebase · Vapi AI · Gemini API

<span class="t-hi">02</span>  Brain Tumor Classification      [AI/ML] — <span class="t-link">IEEE ICC-ROBINS 2024</span>
    99.84% accuracy · 7,023 MRI scans · EfficientNetB3

<span class="t-hi">03</span>  Screen Recording Platform       [Full-Stack]
    Next.js · Bunny.net · AI transcripts · Arcjet

<span class="t-hi">04</span>  LLM Text Detection              [AI/ML]
    BERT · 95.25% accuracy

<span class="t-hi">05</span>  Automated Secrets Scanner       [Full-Stack]
    Python · FastAPI · entropy-based detection

<span class="t-hi">06</span>  Aphasia Detection — DeBERTa-v3  [AI/ML]
    F1-score: 0.90 · Clinical NLP

<span class="t-hi">07</span>  Retail Analytics Platform       [Data]
    PostgreSQL · ETL · Chart.js · 10K+ records

<span class="t-hi">08</span>  User Behavior Analytics         [Data · In Progress]
    Airflow · PostgreSQL · Tableau

<span class="t-hi">09</span>  Stock Market Prediction         [AI/ML]
    LSTM · TensorFlow · Time Series

<span class="t-hi">10</span>  Market Entry Strategy Simulator [Data]
    Python · SQL · Tableau · Simulation`,

  education: `<span class="t-hi">MS Computer Science</span>  —  Indiana University Bloomington
  Aug 2024 – May 2026  ·  GPA: <span class="t-hi">3.84 / 4.0</span>
  Applied ML · Advanced DB · Cloud Computing · LLMs · Algorithms

<span class="t-hi">B.Tech CS &amp; Engineering</span>  —  KIIT University, India
  Aug 2020 – May 2024  ·  GPA: <span class="t-hi">8.85 / 10.0</span>`,

  research: `<span class="t-hi">IEEE Publication</span>
"Identifying Various Types of Brain Tumors using Deep Neural Networks"
ICC-ROBINS 2024  ·  DOI: 10.1109/ICC-ROBINS60238.2024.10533941

Model:    EfficientNetB3 + CNN/VGG16/InceptionV3 benchmarks
Dataset:  <span class="t-hi">7,023 MRI scans</span>
Result:   <span class="t-hi">99.84% classification accuracy</span>
Role:     Co-author

<span class="t-hi">Other AI work:</span>
  Aphasia Detection · DeBERTa-v3 · 0.90 F1 on clinical data
  LLM Text Detection · BERT · 95.25% accuracy
  Stock Prediction · LSTM · TensorFlow
  NLP Pipelines · Transformers · Prompt Engineering`,

  certifications: `<span class="t-hi">DeepLearning.AI</span>
  Neural Networks and Deep Learning
  Credential: ZKQGVGVJGDX7 · Sep 2023

  Improving Deep Neural Networks: Hyperparameter Tuning
  Credential: ZLN2LZ2YZNLE · Sep 2023

<span class="t-hi">Amazon Web Services</span>
  AWS Academy Graduate — Cloud Semester 1 · Jul 2023`,

  contact: `<span class="t-hi">Email</span>     agarwaludit13@gmail.com
<span class="t-hi">Phone</span>     +1 (930) 904-4901
<span class="t-hi">LinkedIn</span>  linkedin.com/in/udit013
<span class="t-hi">GitHub</span>    github.com/Udit013
<span class="t-hi">Portfolio</span> uditagarwal-website.vercel.app

<span class="t-sys">Seeking SWE · AI/ML · Data roles · Available June 2026</span>`,

  now: `<span class="t-hi">Currently exploring:</span>

🧠  LLM Agents &amp; multi-agent orchestration
🏥  Health AI — Global Health Impact platform (IU)
🎙  Real-time voice AI (Vapi AI + Gemini)
📊  Large-scale ETL and data engineering patterns
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
  { q: /hire|job|full.?time|intern|open.?to|available|role/i, a: 'Udit is available for full-time roles starting June 2026 — SWE, AI/ML, and Data roles. Open to remote, hybrid, and relocation. Email: agarwaludit13@gmail.com · Phone: +1 (930) 904-4901' },
  { q: /ieee|research|paper|publish|brain.?tumor/i, a: 'Udit co-authored an IEEE paper at ICC-ROBINS 2024 on brain tumor classification — 99.84% accuracy on 7,023 MRI scans with EfficientNetB3. DOI: 10.1109/ICC-ROBINS60238.2024.10533941' },
  { q: /gpa|grade|school|degree|university|master|indiana/i, a: 'MS CS at Indiana University Bloomington — GPA 3.84/4.0, May 2026. B.Tech at KIIT — GPA 8.85/10.0.' },
  { q: /skill|tech|stack|language|python|react|framework/i, a: 'Python, TypeScript, React, Next.js, Node.js, FastAPI, PostgreSQL, TensorFlow, PyTorch, BERT, Hugging Face, Gemini API, Vapi AI, Docker, AWS. Type "skills" for the full list.' },
  { q: /project|built|app|demo|portfolio/i, a: '10 projects including AI mock interview, brain tumor classification (IEEE), LLM text detection, aphasia NLP, retail analytics, secrets scanner. Type "projects" for all.' },
  { q: /contact|email|phone|reach|talk/i, a: 'agarwaludit13@gmail.com · +1 (930) 904-4901 · linkedin.com/in/udit013 · Responds within 24h.' },
  { q: /llm|voice|gemini|vapi|gpt|generative/i, a: 'Experience with Gemini API, Vapi AI for real-time voice agents, BERT/DeBERTa fine-tuning, and LLM APIs in production systems.' },
  { q: /data|etl|tableau|airflow|pipeline/i, a: 'Strong data engineering background: ETL pipelines, Airflow, PostgreSQL, Tableau, Pandas, NumPy. Built retail analytics, user behavior pipelines, and health data systems.' },
  { q: /location|remote|reloc|where/i, a: 'Based in Bloomington, IN (EST). Open to remote, hybrid, and relocation.' },
  { q: /cert|aws|deeplearning/i, a: 'Certifications: DeepLearning.AI Neural Networks & Improving DNNs (Sep 2023), AWS Academy Cloud Graduate (Jul 2023).' },
  { q: /now|current|exploring/i, a: 'Currently: LLM Agents, Health AI platform at IU, real-time voice AI, ETL patterns, cloud-native systems.' },
]
