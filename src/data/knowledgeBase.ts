export interface KnowledgeItem {
  id: string;
  title: string;
  description?: string;
  keywords: string[];
  response: string;
  suggestions?: string[];
  relatedTopics?: string[];
  metadata?: Record<string, string | string[]>;
}

const knowledgeBase: Record<string, KnowledgeItem> = {

  skills: {
    id: "skills",
    title: "Technical Skills",
    keywords: [
      "skill", "skills", "tech", "technology", "stack", "programming",
      "language", "framework", "tools", "coding", "abilities", "languages"
    ],
    response: `💻 Technical Skillset

• Languages: Python, JavaScript, TypeScript, C/C++, SQL
• Frontend: React, Next.js, HTML, CSS, Tailwind CSS
• Backend: Node.js, Express.js, FastAPI, REST APIs
• Databases: PostgreSQL, MySQL, MongoDB, Redis
• AI/ML: TensorFlow, PyTorch, Scikit-learn, CNNs, LSTMs, NLP
• NLP & LLMs: Transformers, BERT, DeBERTa, Hugging Face, Prompt Engineering, Gemini API, Vapi AI
• Data Engineering: ETL Pipelines, Data Modeling, Batch Processing, Data Warehousing
• Analytics: Pandas, NumPy, Matplotlib, Tableau, Chart.js
• Cloud & DevOps: AWS, Docker, CI/CD, Git, Postman
• Systems: System Design, Distributed Systems, Caching, Authentication, API Design
• Business: KPI Analysis, A/B Testing, Data Storytelling, Stakeholder Communication`,
    suggestions: [
      "Tell me about his projects",
      "What AI/ML work has he done?",
      "Does he have LLM experience?",
      "What data engineering tools does he use?"
    ],
    relatedTopics: ["projects", "ai_ml", "data"]
  },

  projects: {
    id: "projects",
    title: "Major Projects",
    keywords: ["project", "projects", "portfolio", "build", "application", "built", "work"],
    response: `🚀 Highlighted Projects

🎤 AI Mock Interview Platform
• Full-stack AI system · Next.js, Firebase, Node.js, Vapi AI, Gemini API
• Real-time voice interviews with LLM-driven question generation and feedback
• Backend pipelines for performance tracking and structured insights

📹 Screen Recording & Video Sharing Platform
• Next.js, TypeScript, Bunny.net, Xata, Drizzle ORM
• Secure uploads, CDN delivery, authentication, privacy controls, AI transcripts

🔐 Automated Secrets Scanner
• Python, FastAPI, PostgreSQL
• Detects hardcoded secrets via pattern matching and entropy analysis
• Scans repositories and surfaces security vulnerabilities via dashboard

📊 Retail Analytics Platform
• Next.js, PostgreSQL, Drizzle ORM, Chart.js
• Normalized schema (10k+ records), ETL pipelines, business insight dashboards

📈 Business Analytics Dashboard
• React, Node.js, PostgreSQL, Tableau
• KPI tracking, trend analysis, forecasting, scenario-based decision support

🔄 User Behavior Analytics Pipeline
• Python, PostgreSQL, Airflow, Tableau
• ETL workflows ingesting simulated app logs; engagement and retention dashboards

🧬 Brain Tumor Classification
• Python, TensorFlow, CNNs · IEEE Publication 2024
• 99.84% accuracy on 7,000+ MRI scans; benchmarked CNN, VGG16, InceptionV3, EfficientNet

🧠 Aphasia Detection · DeBERTa-v3, NLP
• Fine-tuned DeBERTa-v3 on clinical transcripts — F1 score: 0.90
• Custom preprocessing pipeline for annotation cleaning and dysfluency handling

🤖 LLM Text Detection · BERT, NLP
• Transformer-based classifier — 95%+ accuracy on AI-generated text datasets
• Cross-validation evaluation pipeline for reliable model comparison

📈 Stock Market Prediction · LSTM, TensorFlow
• LSTM time series model predicting stock price trends from historical data

🗺️ Market Entry Strategy Simulator · Python, SQL, Tableau
• Decision model evaluating market expansion strategies using simulated business data`,
    suggestions: [
      "Tell me about his ML research",
      "What full-stack projects has he built?",
      "Does he have data engineering projects?",
      "What is his IEEE publication?"
    ],
    relatedTopics: ["ai_ml", "data", "skills"]
  },

  experience: {
    id: "experience",
    title: "Professional Experience",
    keywords: ["experience", "work", "job", "role", "employment", "career"],
    response: `💼 Professional Experience

🏥 Software Engineer — Global Health Impact Project
Indiana University | Feb 2026 – Present (Volunteer)

• Building a data-driven platform to analyze pharmaceutical interventions across populations
• Developing full-stack features (React, TypeScript, Python) for forecasting and analytics
• Designing scalable APIs and data pipelines to evaluate treatment coverage and health outcomes
• Translating cross-functional research requirements into production-ready solutions

🖥️ IT Consultant — UITS (Indiana University)
Aug 2025 – Present

• Resolved 100+ technical issues weekly across enterprise systems
• Applied structured root-cause analysis to reduce recurring system issues
• Managed identity and access systems ensuring secure, seamless authentication
• Documented support workflows to improve operational efficiency and service delivery`,
    suggestions: [
      "What kind of roles is he targeting?",
      "Tell me about his projects",
      "What is his education background?"
    ],
    relatedTopics: ["skills", "projects", "education"]
  },

  education: {
    id: "education",
    title: "Education",
    keywords: ["education", "degree", "university", "masters", "bachelor", "gpa", "school", "study"],
    response: `🎓 Education

📘 Master of Science in Computer Science
Indiana University Bloomington | Aug 2024 – May 2026
GPA: 3.82 / 4.0

Relevant Coursework:
• Applied Machine Learning
• Advanced Database Concepts
• Applied Algorithms
• Computer Networks
• Engineering Cloud Computing
• Fundamentals & Applications of LLMs
• Software Engineering

📗 Bachelor of Technology in Computer Science & Engineering
Kalinga Institute of Industrial Technology (KIIT University), India
Aug 2020 – May 2024
GPA: 8.85 / 10.0`,
    suggestions: [
      "What projects has he done?",
      "What are his technical skills?",
      "Tell me about his work experience"
    ],
    relatedTopics: ["skills", "projects", "experience"]
  },

  ai_ml: {
    id: "ai_ml",
    title: "AI & Machine Learning Expertise",
    keywords: ["ai", "ml", "machine learning", "deep learning", "nlp", "llm", "neural", "transformer", "bert", "model"],
    response: `🤖 AI / ML Expertise

Deep Learning:
• CNNs, LSTMs, EfficientNet, VGG16, InceptionV3
• Brain Tumor Classification — 99.84% accuracy, IEEE publication

NLP & Transformers:
• BERT, DeBERTa-v3, Hugging Face
• Aphasia Detection (F1: 0.90) on clinical transcripts
• LLM Text Detection — 95%+ accuracy (BERT fine-tuned)

LLMs & Generative AI:
• Prompt Engineering, Gemini API, Vapi AI
• AI Mock Interview Platform — real-time voice + LLM feedback

Time Series & Forecasting:
• LSTM-based stock price prediction
• Forecasting pipelines for global health analytics

MLOps:
• Model evaluation, cross-validation, hyperparameter tuning
• Experiment tracking, precision-recall trade-off analysis

Frameworks: TensorFlow, PyTorch, Scikit-learn`,
    suggestions: [
      "Tell me about his NLP work",
      "What is his IEEE publication?",
      "What LLM tools has he used?",
      "Show all his projects"
    ],
    relatedTopics: ["projects", "skills", "publications"]
  },

  data: {
    id: "data",
    title: "Data Engineering & Analytics",
    keywords: ["data", "etl", "analytics", "pipeline", "dashboard", "sql", "tableau", "pandas", "warehouse"],
    response: `📊 Data Engineering & Analytics

Data Engineering:
• ETL pipelines for structured and unstructured data (Python, Airflow, PostgreSQL)
• Normalized database schema design (10k+ records)
• Batch processing and data warehousing

Analytics & Visualization:
• Tableau dashboards for KPI tracking, retention, and trend analysis
• Chart.js and Matplotlib for embedded and exploratory visualization
• Statistical analysis and EDA using Pandas and NumPy

Key Projects:
• User Behavior Analytics Pipeline (Airflow + PostgreSQL + Tableau)
• Retail Analytics Platform (ETL + dashboards + PostgreSQL)
• Business Analytics Dashboard (KPI tracking, forecasting, scenario analysis)
• Global Health Platform (forecasting models, population-level treatment analytics)

Tools: Pandas, NumPy, Tableau, Chart.js, Matplotlib, PostgreSQL, MySQL, Airflow`,
    suggestions: [
      "What ML work has he done?",
      "Does he have SQL experience?",
      "Tell me about his analytics projects"
    ],
    relatedTopics: ["skills", "projects"]
  },

  publications: {
    id: "publications",
    title: "Research Publications",
    keywords: ["publication", "research", "paper", "ieee", "journal", "published"],
    response: `📄 Research Publication

"Identifying Various Types of Brain Tumors using Deep Neural Networks"
IEEE International Conference on Computing, Robotics and Informatics (ICC-ROBINS), 2024

DOI: 10.1109/ICC-ROBINS60238.2024.10533941

• Achieved 99.84% accuracy on 7,000+ MRI scans
• Benchmarked CNN, VGG16, InceptionV3, EfficientNet architectures
• Focused on medical AI, model efficiency, and clinical applicability`,
    suggestions: [
      "Tell me about his AI/ML projects",
      "What are his deep learning skills?",
      "Show all projects"
    ],
    relatedTopics: ["projects", "ai_ml"]
  },

  contact: {
    id: "contact",
    title: "Contact Information",
    keywords: ["contact", "email", "linkedin", "github", "hire", "reach", "portfolio", "website"],
    response: `📬 Contact

Email:     agarwaludit13@gmail.com
Phone:     +1 (930) 904-4901
LinkedIn:  linkedin.com/in/udit013
GitHub:    github.com/Udit013
Portfolio: uditagarwal-website.vercel.app
Location:  Bloomington, IN (EST)

🎯 Actively seeking Software Engineering, AI/ML, and Data roles
   Available from May 2026`,
    suggestions: [
      "Tell me about his experience",
      "What are his skills?",
      "Show his projects"
    ],
    relatedTopics: ["experience", "projects"]
  },

  about: {
    id: "about",
    title: "About Udit",
    keywords: ["about", "who", "whoami", "intro", "introduction", "udit", "background"],
    response: `👋 About Udit Agarwal

AI Engineer & Full-Stack Developer currently pursuing an MS in Computer Science
at Indiana University Bloomington (GPA: 3.82 / 4.0).

Passionate about building intelligent, scalable systems — from deep learning models
achieving 99%+ accuracy to production full-stack platforms with modern architectures.

Background spans:
• AI/ML research (IEEE-published, NLP, LLMs, Computer Vision)
• Full-stack development (React, Next.js, Node.js, Python)
• Data engineering & analytics (ETL, PostgreSQL, Tableau)
• Cloud & systems design (AWS, Docker, distributed systems)

Currently working as a Software Engineer on a Global Health Impact research platform
at Indiana University, and as an IT Consultant at UITS.

🎯 Seeking full-time roles in SWE · AI/ML · Data — available May 2026`,
    suggestions: [
      "Show his projects",
      "What are his skills?",
      "Tell me about his experience"
    ],
    relatedTopics: ["skills", "projects", "experience"]
  }

};

export default knowledgeBase;