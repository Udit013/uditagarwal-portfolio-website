# Udit Agarwal — Knowledge Document
# Last updated: Jul 1 2026
 
---
 
## PERSONAL PROFILE
 
- **Name:** Udit Agarwal
- **Email:** agarwaludit13@gmail.com
- **Phone:** +1 (930) 904-4901
- **LinkedIn:** linkedin.com/in/udit013
- **GitHub:** github.com/Udit013
- **Portfolio:** uditagarwal.vercel.app
- **Location:** Bloomington, IN, US
---
 
## EDUCATION
 
**Indiana University Bloomington** — Bloomington, IN, US
Master of Science in Computer Science — GPA: 3.84 / 4.0
Aug 2024 – May 2026
 
**Kalinga Institute of Industrial Technology (KIIT University)** — Bhubaneswar, India
Bachelor of Technology in Computer Science & Engineering — GPA: 8.85 / 10.0
Aug 2020 – May 2024
 
---
 
## EXPERIENCE

### Heartland Community Network (HCN)

**Role:** Senior Consultant  
**Period:** Jun 2026 – Present  
**Location:** Remote (Indiana, US)
**type:** Full-Time · Remote
**Description:** Technology consulting initiative that partners with businesses across Indiana to deliver software engineering, AI, automation, analytics, and digital transformation solutions that improve operational efficiency and support business growth.
**Bullets:**
- Partner with business stakeholders to analyze operational challenges and translate business requirements into scalable software, AI, and data-driven solutions
- Design and develop full-stack applications, backend services, REST APIs, analytics dashboards, automation workflows, and data pipelines tailored to client requirements
- Build AI-powered solutions leveraging LLMs, data analytics, and workflow automation to streamline business processes and enhance decision-making
- Collaborate with cross-functional engineering, data, marketing, and business teams to deliver scalable digital transformation initiatives across multiple industries
- Produce technical documentation, solution architectures, implementation roadmaps, and project recommendations that support successful client deployments
- Contribute across the complete software development lifecycle, including solution design, implementation, testing, deployment, and ongoing maintenance of production systems

---
 
### University Information Technology Services (UITS) — Indiana University
**Role:** Consultant – IT Services  
**Period:** Aug 2025 – Present 
**Location:** Bloomington, IN, US
**type:** Part-Time · On-site
**Description:** Provides technical support and systems administration services for university-wide technology infrastructure, supporting enterprise applications, identity systems, and end-user computing environments.
**Bullets:**
- Resolved **100+ technical issues weekly** across desktop, mobile, and enterprise systems using structured troubleshooting methodologies and root-cause analysis techniques
- Diagnosed hardware, software, authentication, networking, and account-access issues, improving system reliability and minimizing service disruptions for a large user population
- Supported identity and access management workflows, ensuring secure authentication, authorization, and account lifecycle management across university systems
- Analyzed recurring support incidents and system behavior patterns to identify underlying causes and recommend process or technical improvements
- Documented issue resolution procedures, operational workflows, and service requests within ServiceNow to improve knowledge sharing, consistency, and support efficiency
- Collaborated with cross-functional IT teams to escalate complex issues, coordinate resolutions, and maintain high levels of service availability

---

### Global Health Impact Project — Indiana University
**Role:** Software Engineer  
**Period:** Jan 2026 – Jun 2026  
**Location:** Bloomington, IN, US
**type:** Part-Time · Hybrid
**Description:** Data-driven global health analytics platform that models pharmaceutical intervention impact across global populations, analyzing treatment coverage, efficacy, and health outcomes through large-scale forecasting and analytics workflows
**Bullets:**
- Designed and developed full-stack features for a global health analytics platform using React, TypeScript, and Python, enabling researchers to evaluate pharmaceutical intervention effectiveness across diverse populations
- Built scalable backend services and data processing pipelines to support treatment coverage modeling, efficacy analysis, forecasting workflows, and large-scale health outcome evaluation
- Developed and maintained REST APIs powering analytics dashboards, forecasting tools, and data-driven decision workflows across multiple platform components
- Optimized database queries, backend services, and distributed processing workflows to improve application performance, scalability, and responsiveness under increasing analytical workloads
- Performed root-cause analysis of system bottlenecks and production issues, implementing long-term fixes that improved platform reliability and operational stability
- Collaborated with researchers, engineers, and domain experts to translate complex health analytics requirements into production-ready software solutions

---
 
## PROJECTS (full inventory)
 
### Voice Interview Simulator
**Stack:** Next.js · TypeScript · Firebase Auth & Firestore · Gemini 2.5 Flash · Web Speech API · Zod · unpdf  
**Live:** https://mock-ai-prep.vercel.app  
**Code:** https://github.com/Udit013/ai_mock_interview_prep  
**Description:** AI-powered interview preparation platform that conducts adaptive voice interviews, generates résumé-aware questions, analyzes speaking delivery, and tracks long-term performance trends using entirely browser-native and free-tier infrastructure.
**Bullets:**
- Built a full-stack AI interview platform that conducts end-to-end voice interviews using browser-native speech recognition and synthesis, eliminating paid STT/TTS dependencies while supporting technical, behavioral, mixed, and résumé-based interview formats.
- Engineered an adaptive interview engine powered by Gemini that maintains a live interview state across sessions, dynamically adjusts question difficulty, identifies knowledge gaps through targeted follow-ups, probes fundamentals when necessary, and guarantees deterministic interview completion through bounded conversational workflows.
- Developed résumé-aware interview generation by extracting text from uploaded PDF résumés using `unpdf`, structuring candidate experiences and technical skills through LLM-powered parsing, and generating personalized questions grounded in users' real projects, architectural decisions, and technology trade-offs.
- Implemented a Zod-validated AI evaluation pipeline that assesses candidates across five competency dimensions—Communication, Technical Knowledge, Problem Solving, Confidence, and Cultural Fit—while evaluating STAR-method completeness to generate actionable strengths, weaknesses, and improvement recommendations.
- Designed deterministic, browser-computed speaking analytics that measure words per minute, filler-word usage, speaking duration, and response quality without relying on external speech-processing services, preserving user privacy while maintaining explainable coaching insights.
- Created a personalized progress dashboard with secure Firebase-backed persistence, enabling users to track historical performance trends, competency-level strengths and weaknesses, interview streaks, and longitudinal improvement through lightweight, dependency-free visualizations delivered within a serverless Next.js architecture at **$0 infrastructure cost**.

---
 
### Screen Recording & Video Sharing Platform
**Live:** [snapcast-video-sharing.vercel.app](https://snapcast-video-sharing.vercel.app)
**Code:** [Udit013/screen_recording_sharing_app](https://github.com/Udit013/screen_recording_sharing_app)
**Stack:** Next.js · TypeScript · Cloudinary CDN · Neon PostgreSQL · Drizzle ORM · Gemini · better-auth
**Description:** AI-powered screen recording and video sharing platform combining browser-native media capture, automatic transcription, intelligent content indexing, privacy-controlled sharing, and channel-level analytics over a cloud-scale delivery pipeline.
**Bullets:**
- Built a browser-native screen recording platform using MediaRecorder and Canvas APIs with real-time webcam picture-in-picture compositing, eliminating the need for browser extensions or native software
- Architected a direct signed-upload pipeline to Cloudinary CDN for scalable storage and global delivery, removing server-side file proxying and reducing backend complexity
- Implemented automatic speech-to-text transcription via the Web Speech API, capturing timestamped narration to power keyword search and AI-driven chapter generation
- Integrated Gemini to generate AI summaries, semantic tags, and auto-segmented chapters from transcripts, enabling intelligent search across metadata and generated content
- Implemented 3-tier privacy controls (public, private, link-only) with cryptographically generated share tokens, configurable expiration, and one-click revocation
- Engineered a channel analytics dashboard tracking unique viewers, watch time, and completion rates via an event-sourced viewing model with anonymous-viewer attribution
- Designed a full-stack data layer with Neon PostgreSQL and Drizzle ORM supporting transcripts, collections, timestamped notes, view analytics, and chapter navigation

---

### Automated Secrets Scanner
**Live:** [automated-secrets-scanner.vercel.app](https://automated-secrets-scanner.vercel.app)
**Code:** [Udit013/automated-secrets-scanner](https://github.com/Udit013/automated-secrets-scanner)
**Stack:** Python · FastAPI · React · TypeScript · PostgreSQL · SQLite · WebSocket · APScheduler
**Description:** Production-grade DevSecOps platform that detects hardcoded secrets across source code and full git history using pattern matching, entropy analysis, and semantic heuristics — with exposure risk scoring, secret lifecycle intelligence, differential scanning, real-time monitoring, automated alerting, and SARIF-based CI/CD integration.
**Bullets:**
- Engineered a secret detection engine covering **26 credential and secret types** (AWS, GCP, GitHub, Stripe, JWTs, SSH keys, database connection strings, and more), achieving **~95% precision**, **~94% recall**, and **0.94 F1 score** through regex matching, entropy analysis, and false-positive suppression
- Implemented Shannon entropy analysis and semantic heuristics to surface high-risk secrets that evade pattern-based detection, with configurable thresholds, variable-context scoring, placeholder filtering, and test-file severity downgrading
- Designed a transparent **0–100 exposure risk scoring model** combining severity, occurrence count, git-history presence, and exposure duration, paired with a secret lifecycle timeline (introduced date, last-seen date, commits affected, and authors involved)
- Built an asynchronous FastAPI backend with **18 REST endpoints**, WebSocket-based real-time scan progress, background task execution, recurring cron scheduling via APScheduler, and automated SMTP alerts for critical findings
- Added **differential scanning** to compare runs over time (new vs. resolved secrets with net-change summaries) and a remediation patch generator that produces env-var code replacements, `.env.example` snippets, and downloadable git diffs — no repository write access required
- Implemented **SARIF 2.1.0 export** (plus JSON and CSV) for native GitHub Advanced Security and CI/CD pipeline integration, alongside git-history scanning that detects credentials even after removal from the latest codebase
- Built a React and TypeScript security dashboard with a GitHub-style high-contrast dark theme, live KPI monitoring, severity analytics, historical trend visualization, and exportable audit reports across SQLite and PostgreSQL backends

---

### Brain Tumor Classification: Production ML System (IEEE 2024)

**Live demo:** https://huggingface.co/spaces/Udit013/brain-tumor-mri-classifier
**Model:** https://huggingface.co/Udit013/brain-tumor-efficientnetb3
**Code:** https://github.com/Udit013/Brain_Tumor_Classificatioin
**Publication:** [Identifying Various Types of Brain Tumors using Deep Neural Network based Image Features](https://doi.org/10.1109/ICC-ROBINS60238.2024.10533941), ICC-ROBINS 2024, IEEE (co-author)
**Stack:** Python, TensorFlow/Keras, EfficientNetB3, ONNX Runtime, Gradio, FastAPI, Grad-CAM, Docker, GitHub Actions, Hugging Face

**Description:** Production-grade extension of an IEEE-published brain-tumor MRI classifier. Beyond reproducing the original four-architecture benchmark, this work adds the evaluation rigor and deployment engineering that turn a high-accuracy notebook into a trustworthy, served system: leakage auditing, out-of-distribution testing, calibration, uncertainty, robustness, explainability, and a live web app.

**Bullets:**
- Co-authored an IEEE 2024 publication benchmarking CNN, VGG16, InceptionV3, and EfficientNetB3 for 4-class brain-tumor MRI classification, with EfficientNetB3 reaching **99.844% accuracy** on **7,023 MRI images** at just **11.7M parameters** (smallest of the four models).
- Audited the published benchmark and found the 99.844% is inflated by train/test leakage: a perceptual-hash audit surfaced **44.6% near-duplicate** and **114 exact-duplicate** images across the split, with **98.9% accuracy on leaked images vs 90.0% on novel ones**, and documented that patient-level de-duplication is irrecoverable from the multi-source compilation.
- Reproduced the EfficientNetB3 pipeline end-to-end (**93.94%** on the rebalanced test set; **macro ROC-AUC 0.985**) with per-class metrics, confusion matrices, ROC/PR curves, and confidence distributions, and quantified an honest **72.3% out-of-distribution accuracy** on a separate public MRI dataset.
- Calibrated confidence via temperature scaling (**ECE 0.0425 to 0.0136**), added Test-Time-Augmentation uncertainty (entropy **0.36 on correct vs 0.78 on wrong** predictions), and ran corruption-robustness testing across 6 perturbation types, exposing near-random accuracy under Gaussian noise.
- Deployed a **live Gradio web app** on Hugging Face Spaces backed by **ONNX Runtime** CPU inference, returning predicted class, calibrated confidence, uncertainty, Grad-CAM overlay, latency, and a medical disclaimer; model versioned on Hugging Face Hub.
- Engineered for reproducibility: modular package, pinned dependencies, one-command reproduction script, Dockerfile, pytest suite, and **GitHub Actions CI**, with a model card and every reported number backed by a measured run.
- Debugged and fixed a deployment-time accuracy collapse (53% to 94%) traced to non-converged BatchNorm statistics on Apple Metal, resolved with a recalibration pass.

---

### Pharmacy ERP & Distribution System
**Live:** https://rx-flow-web.vercel.app  
**Code:** https://github.com/Udit013/RxFlow  
**Stack:** Next.js · TypeScript · Fastify · Prisma · PostgreSQL (Neon) · Turborepo · Server-Sent Events · React Query · jsPDF  
**Description:** Production-grade multi-tenant pharmacy ERP built for the Indian pharmaceutical market, combining inventory management, GST-compliant billing, procurement, accounting, and payroll into a unified platform. Designed to replace legacy solutions such as Marg and Tally through real-time synchronization, transactionally consistent operations, and deployment entirely on free-tier infrastructure.
**Bullets:**
- Built a full-stack, multi-tenant pharmacy ERP as a pnpm/Turborepo monorepo comprising a Fastify API, Next.js 14 web application, and shared Prisma data layer, where every self-service signup provisions an isolated tenant environment with dedicated stores, employees, financial books, and configurable role-based permissions secured through JWT authentication.
- Engineered an India-specific GST and invoicing engine capable of calculating CGST, SGST, and IGST at the line-item level, automatically routing interstate transactions, applying credit-note adjustments, and generating GSTR-1 and GSTR-3B returns with Excel/CSV export support for regulatory compliance.
- Designed transactionally correct inventory and accounting workflows in which sales, purchases, returns, inter-store transfers, and physical stock reconciliations atomically update batch inventories, per-store stock positions, supplier/customer ledgers, and financial records within database transactions to prevent inconsistencies.
- Implemented real-time multi-device synchronization using Server-Sent Events and tenant-scoped publish/subscribe channels, enabling pharmacists, cashiers, and administrators to observe inventory and billing updates across counters, tablets, and mobile devices within seconds while maintaining complete audit logs of every business action.
- Developed integrated business modules spanning procurement, accounts payable and receivable, expense and income tracking, Profit & Loss statements, cash-flow reporting, employee attendance management, and payroll computation with automated loss-of-pay proration.
- Built an intelligent CSV purchase-import pipeline that accelerates distributor invoice processing by fuzzy-matching free-text product descriptions against the medicine catalog using letter- and digit-aware token scoring, while supporting reusable supplier-specific import templates.
- Implemented operational capabilities including AES-256-GCM encrypted backup and restore, global command-palette search, PDF invoice generation, and comprehensive audit trails to improve reliability, traceability, and day-to-day usability for pharmacy operators.
- Delivered the entire platform using $0 free-tier infrastructure (Vercel, Render, and Neon), overcoming production deployment challenges involving Prisma connection strategies, serverless constraints, package management issues, and environment-specific build behavior while demonstrating end-to-end ownership across architecture, backend systems, frontend experiences, database design, and DevOps.

---

### Biomedical AI Research Assistant
**Live:** [huggingface.co/spaces/Udit013/biomed-assistant](https://huggingface.co/spaces/Udit013/biomed-assistant)
**Model:** [Udit013/qwen2.5-7b-medmcqa-qlora-5k](https://huggingface.co/Udit013/qwen2.5-7b-medmcqa-qlora-5k)
**Code:** [Udit013/biomed-llm-peft](https://github.com/Udit013/biomed-llm-peft)
**Stack:** Python · PyTorch · Transformers · PEFT/QLoRA · LangGraph · FastAPI · Gradio · PostgreSQL + pgvector (Neon) · Hugging Face Hub/Inference · Docker · GitHub Actions
**Description:** A production-grade Biomedical AI Research Assistant that answers clinical/research questions with grounded, cited evidence — retrieval-augmented generation over PubMed abstracts and NIH/WHO/CDC guidelines, a LangGraph multi-agent workflow with per-claim citation verification, and a 4-way evaluation harness (Base / Fine-tuned / Base + RAG / Fine-tuned + RAG) — built on a QLoRA-fine-tuned Qwen2.5-7B and deployed end-to-end on 100% free-tier infrastructure.
**Bullets:**
- Fine-tuned **Qwen2.5-7B-Instruct with 4-bit QLoRA** (only **0.92%** of parameters trainable) on **MedMCQA (~194K** medical MCQs**)** and evaluated with **EleutherAI lm-evaluation-harness**, measuring in-domain MedMCQA **47.5% → 50.0%** (a within-noise null showing strong instruction tuning already near-saturates the task) and out-of-domain PubMedQA **48.0% → 64.5%**; **published** the adapter to the Hugging Face Hub with a full model card.
- Built a **production RAG pipeline** over biomedical literature — reproducible ingestion (NCBI E-utilities), sentence-aware chunking, `bge-small` embeddings, semantic retrieval with metadata filtering, cross-encoder reranking, and inline citation generation — indexing **733 PubMed abstracts into 3,410 vector chunks** in **Neon PostgreSQL + pgvector**.
- Implemented a **LangGraph 4-agent workflow** (Planner → Retrieval → Answer → **Citation-Verification**) that returns grounded, `[n]`-cited answers and flags every factual claim as supported or unsupported, with a dependency-free sequential fallback for testing.
- **Deployed the system end-to-end on 100% free-tier infrastructure** (Gradio Space → FastAPI on Render → Neon pgvector → HF Inference) serving live, cited **Base + RAG** answers at **~4 s** end-to-end; the API returns the exact config it served and the UI displays it, so a **swap to Fine-tuned + RAG via a GPU endpoint requires zero UI or API change**.
- Engineered a **backend-agnostic, torch-free serving path** for the free tier — a vector-store abstraction (local NumPy for dev/CI, Neon pgvector for prod), local **ONNX query embeddings** (fastembed), and a router-based HF Inference LLM — small enough to run on a 512 MB instance.
- Designed a **4-way evaluation harness** comparing Base / Fine-tuned / Base + RAG / Fine-tuned + RAG across **retrieval** (Recall@k, MRR), **generation** (citation coverage, groundedness, ROUGE-L, BERTScore), and **systems** (p50/p95 latency, token usage, estimated cost), rendering comparison tables and an interactive Benchmark Explorer.
- Established **production engineering rigor** — a modular package cleanly separating the research pipeline from the production system, pinned dependencies, a Dockerized backend, structured JSON logging with per-stage latency, and **GitHub Actions CI running a 12-test suite** on every push.

---

### Decision Intelligence Engine
**Live:** [coresightiq.vercel.app](https://coresightiq.vercel.app)  
**Code:** [github.com/Udit013/decision-intelligence-platform](https://github.com/Udit013/decision-intelligence-platform)  
**Stack:** Next.js · React · TypeScript · Tailwind · Apache ECharts · Drizzle ORM · Neon PostgreSQL · jsPDF · Ollama · Vitest  
**Description:** Full-stack decision intelligence platform unifying product analytics, retail operations, and market expansion through a reusable analytics engine (ingest → score → recommend → report → advise), with validation designed to make every accuracy claim auditable.
**Bullets:**
- Re-architected three independent analytics applications into a single platform by extracting a reusable **`/core` engine** and converting each product into a thin, pluggable domain module, eliminating duplicated forecasting, scoring, and AI logic.
- Built a domain-agnostic analytics engine covering **time-series forecasting, weighted multi-criteria scoring + bucket classification, recommendation synthesis, RFM/CLV segmentation, cohort retention, and two-proportion A/B testing**, backed by **85 unit tests**; the same scoring primitive powers both Market (*Expand/Investigate/Monitor/Avoid*) and Product (*RICE/ICE/WSJF*) prioritization workflows.
- Engineered a **validation harness** with leakage-free **walk-forward backtesting** and **confidence calibration** (Brier score, Expected Calibration Error), including reproducible failure cases (**white-noise R² ≈ −0.17**) to ensure model performance claims are auditable rather than asserted.
- Evaluated forecasting models on the **UCI Online Retail II dataset (~1.07M transactions)** and reported honest out-of-sample performance (**weekly revenue R² ≈ 0.07, MAPE ≈ 30%**), replacing unreproducible metrics from an earlier implementation.
- Prioritized data integrity over vanity metrics by enforcing test-backed validation, including detection of a duplicated market record (**121 → 120 distinct markets**) and surfacing statistically insignificant experiments instead of cherry-picked outcomes.
- Consolidated the platform onto a unified **Next.js + Postgres architecture** with a shared design system and **Apache ECharts**, reducing Decision Center latency from **~5s cold to ~15ms after warm-up** through caching and precomputation, while providing a **local-first Ollama advisor with deterministic fallback** for reproducible recommendations.

---
 
### Personal Portfolio Website
**Stack:** React · TypeScript · Vite · GSAP · Three.js / WebGL · Lenis
**Code:** github.com/Udit013/uditagarwal-portfolio-website
**Live:** https://uditagarwal.vercel.app
**Description:** An interactive, animated personal portfolio with a liquid-glass
UI (light & dark themes) and a cursor-reactive WebGL particle backdrop. Standout
touches include a real ⇆ anime portrait reveal slider, a category-filtered
"floating skills" toolkit, GSAP + Lenis scroll motion, and a built-in interactive
terminal. Fully responsive, accessibility-aware (honors reduced-motion), and
deployed on Vercel with push-to-deploy.
 
--- 

## TECHNICAL SKILLS (full master list)
 
**Programming Languages:** Python, TypeScript, JavaScript, Java, C/C++, SQL
**Frontend:** React, Next.js, HTML5, CSS3, Tailwind CSS, GSAP, Three.js/WebGL, Chart.js, Apache ECharts, Recharts
**Backend & APIs:** Node.js, Express.js, Fastify, FastAPI, REST APIs, WebSockets, Server-Sent Events, Zod, APScheduler, React Query
**Databases & Storage:** PostgreSQL, MySQL, MongoDB, Redis, Firebase, Firestore, Neo4j, SQLite, Drizzle ORM, Prisma
**Cloud & DevOps:** AWS (EC2, S3, Lambda, RDS, CloudFront), Docker, CI/CD, Git, Postman, Vercel, Cloudinary, ServiceNow, Turborepo
**AI/ML:** PyTorch, TensorFlow/Keras, Scikit-learn, Hugging Face, Transformers, CNNs (VGG16, InceptionV3, EfficientNetB3), BERT, ONNX Runtime, Grad-CAM, Model Calibration, Prompt Engineering
**LLMs & Fine-Tuning:** Qwen2.5, LLM Fine-Tuning, QLoRA, PEFT/LoRA, 4-bit Quantization (bitsandbytes), lm-evaluation-harness, vLLM, Gemini API, Ollama, RAG, Structured Generation, Hugging Face Hub, Gradio
**Data Engineering & Analytics:** Pandas, NumPy, Matplotlib, Tableau, Apache Airflow, ETL Pipelines, Data Modeling, Forecasting, Statistical Modeling, Backtesting, Confidence Calibration
**Security & DevSecOps:** Secrets Detection, Regex Pattern Matching, Entropy Analysis, Vulnerability Scanning, Git History Auditing, SARIF Export, SMTP Alerting
**Testing & Quality:** Vitest, Unit Testing, jsPDF
**Systems & Architecture:** System Design, Distributed Systems, API Design, Authentication & Authorization, Caching, Fault Tolerance, Load Balancing, Auto-Scaling, Serverless Architecture, Monorepo Architecture
**MLOps & Experimentation:** Model Evaluation & Benchmarking, Inference Optimization, Experiment Tracking, Hyperparameter Tuning, Cross-Validation, Error Analysis, Data Leakage Auditing, Confidence Calibration, OOD Testing, Model Cards, A/B Testing
 
---