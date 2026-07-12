# Udit Agarwal — Knowledge Document
*Last updated: Jul 8 2026*

---

## PERSONAL PROFILE

- **Name:** Udit Agarwal
- **Email:** agarwaludit13@gmail.com
- **Phone:** +1 (930) 904-4901
- **LinkedIn:** linkedin.com/in/udit013
- **GitHub:** github.com/Udit013
- **Portfolio:** uditagarwal.vercel.app
- **Location:** Bloomington, IN, US (open to relocation anywhere in the US)

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
**Type:** Full-Time · Remote
**Description:** Technology consulting practice serving Indiana businesses with software engineering, AI, automation, and analytics work.
**Bullets:**
- Build full-stack applications, backend services, REST APIs, dashboards, and automation workflows for client businesses, scoped to each client's operational needs
- Develop AI features on top of LLMs and workflow automation to cut manual effort in client processes and support decision-making
- Translate business requirements into technical designs, working directly with stakeholders across engineering, data, and operations
- Own delivery end to end — design, implementation, testing, deployment, and maintenance of production systems
- Write solution architectures, implementation roadmaps, and handoff documentation for client deployments

---

### University Information Technology Services (UITS) — Indiana University
**Role:** Consultant – IT Services
**Period:** Aug 2025 – Present
**Location:** Bloomington, IN, US
**Type:** Part-Time · On-site
**Description:** Technical support and systems administration for university-wide infrastructure, including enterprise applications, identity systems, and end-user computing.
**Bullets:**
- Resolve **100+ technical issues weekly** across desktop, mobile, and enterprise systems using structured troubleshooting and root-cause analysis
- Diagnose hardware, software, authentication, networking, and account-access problems to keep systems available for a large user base
- Support identity and access management — authentication, authorization, and account lifecycle across university systems
- Document resolutions and workflows in **ServiceNow**, and flag recurring incidents for process or technical fixes
- Escalate complex issues with cross-functional IT teams to coordinate resolution and maintain service availability

---

### Global Health Impact Project — Indiana University
**Role:** Software Engineer
**Period:** Jan 2026 – Jun 2026
**Location:** Bloomington, IN, US
**Type:** Part-Time · Hybrid
**Description:** Global health analytics platform that models pharmaceutical intervention impact across populations — treatment coverage, efficacy, and outcomes — through large-scale forecasting workflows.
**Bullets:**
- Built full-stack features (React, TypeScript, Python) for a global health analytics platform used by researchers to evaluate pharmaceutical intervention effectiveness across populations
- Developed backend services and data pipelines for treatment-coverage modeling, efficacy analysis, and large-scale forecasting
- Built and maintained REST APIs powering the platform's analytics dashboards and forecasting tools
- Optimized queries and backend services to keep the platform responsive under growing analytical workloads
- Traced and fixed system bottlenecks and production issues, translating research requirements into production-ready features with domain experts

---

## PROJECTS (full inventory)

### Voice Interview Simulator
**Live:** https://mock-ai-prep.vercel.app
**Code:** https://github.com/Udit013/ai_mock_interview_prep
**Stack:** Next.js · TypeScript · Firebase Auth & Firestore · Gemini 2.5 Flash · Web Speech API · Zod · unpdf
**Description:** AI interview-prep platform that runs adaptive voice interviews, generates résumé-aware questions, analyzes delivery, and tracks performance over time — entirely on browser-native and free-tier infrastructure.
**Bullets:**
- Built a full-stack AI interview platform that runs end-to-end voice interviews using browser-native speech recognition and synthesis, avoiding paid STT/TTS; supports technical, behavioral, mixed, and résumé-based formats
- Built an adaptive interview engine on Gemini that tracks live state across a session, adjusts question difficulty, probes knowledge gaps with targeted follow-ups, and guarantees completion through bounded workflows
- Added résumé-aware question generation: extract text from uploaded PDFs with `unpdf`, parse experience and skills via LLM, and ground questions in the candidate's real projects and trade-offs
- Built a Zod-validated evaluation pipeline scoring five dimensions (Communication, Technical Knowledge, Problem Solving, Confidence, Cultural Fit) plus STAR completeness, producing strengths, weaknesses, and next steps
- Computed speaking analytics in-browser (words per minute, filler words, duration, response quality) with no external speech services, preserving privacy while keeping the coaching explainable
- Built a progress dashboard with Firebase persistence tracking performance trends, streaks, and improvement over time, running at **$0 infrastructure cost**

---

### Screen Recording & Video Sharing Platform
**Live:** [snapcast-video-sharing.vercel.app](https://snapcast-video-sharing.vercel.app)
**Code:** [Udit013/screen_recording_sharing_app](https://github.com/Udit013/screen_recording_sharing_app)
**Stack:** Next.js · TypeScript · Cloudinary CDN · Neon PostgreSQL · Drizzle ORM · Gemini · better-auth
**Description:** Screen recording and video sharing platform with browser-native capture, automatic transcription, AI content indexing, privacy-controlled sharing, and channel analytics over a cloud delivery pipeline.
**Bullets:**
- Built browser-native screen recording with MediaRecorder and Canvas APIs, including real-time webcam picture-in-picture, with no extensions or native software required
- Built a direct signed-upload pipeline to Cloudinary CDN for storage and global delivery, removing server-side file proxying
- Added automatic speech-to-text via the Web Speech API, capturing timestamped narration to power keyword search and AI chapter generation
- Integrated Gemini to generate summaries, semantic tags, and auto-segmented chapters from transcripts, enabling search across metadata and generated content
- Implemented 3-tier privacy controls (public, private, link-only) with cryptographic share tokens, configurable expiration, and one-click revocation
- Built a channel analytics dashboard tracking unique viewers, watch time, and completion rates via an event-sourced viewing model with anonymous-viewer attribution
- Designed the data layer on Neon PostgreSQL and Drizzle ORM for transcripts, collections, timestamped notes, view analytics, and chapter navigation

---

### Secret Exposure Detection
**Live:** [cipherwatch-web.vercel.app/](https://cipherwatch-web.vercel.app/)
**Code:** [Udit013/automated-secrets-scanner](https://github.com/Udit013/automated-secrets-scanner)
**Stack:** Python · FastAPI · React · TypeScript · PostgreSQL · SQLite · WebSocket · APScheduler
**Description:** Production-grade DevSecOps platform that detects hardcoded secrets across source code and full git history using pattern matching, entropy analysis, and semantic heuristics — with exposure risk scoring, secret lifecycle intelligence, differential scanning, SARIF export, and a custom-built security operations console.
**Bullets:**
- Engineered a secret detection engine covering **26 credential and secret types** (AWS, GCP, GitHub, Stripe, JWTs, SSH keys, database connection strings, and more), achieving **~95% precision**, **~94% recall**, and **0.94 F1 score** through regex matching, Shannon-entropy analysis, and false-positive suppression
- Designed a transparent **0–100 exposure risk scoring model** and git-history **secret lifecycle intelligence** (introduced/last-seen dates, exposure duration, commits affected, authors involved), plus **differential scanning** that surfaces new vs. resolved secrets across runs
- Built an asynchronous FastAPI backend with **18 REST endpoints**, WebSocket-based real-time scan progress, background task execution, recurring cron scheduling via APScheduler, and automated SMTP alerts, hardened with input validation and covered by a **75-test suite** running in GitHub Actions CI
- Added **SARIF 2.1.0 export** for native GitHub Advanced Security / CI-CD integration alongside JSON, CSV, and env-var remediation-patch generation
- **Redesigned the entire frontend from scratch** into a bespoke "ops console" design system — signal-only color semantics, a warm-ink/ivory palette, Instrument Sans + IBM Plex Mono typography, and a command-bar layout — replacing generic dashboard patterns with a production-grade product identity
- Hand-built all data visualizations in **custom SVG** (severity spectrum bar, stepped trend chart with crosshair tooltips, ranked-magnitude bars), **eliminating the charting dependency and cutting the JS bundle by ~410 KB** to a 42 KB app shell
- Shipped accessible interactions end-to-end — keyboard-first navigation (`/`-to-search), visible focus states, `prefers-reduced-motion` support, and ~15:1 text contrast — deployed on Render + Vercel free tiers

---

### Brain Tumor Classification: Production ML Framework (IEEE 2024)
**Live:** https://huggingface.co/spaces/Udit013/brain-tumor-mri-classifier
**Model:** https://huggingface.co/Udit013/brain-tumor-efficientnetb3
**Code:** https://github.com/Udit013/Brain_Tumor_Classificatioin
**Publication:** [Identifying Various Types of Brain Tumors using Deep Neural Network based Image Features](https://doi.org/10.1109/ICC-ROBINS60238.2024.10533941), ICC-ROBINS 2024, IEEE (co-author)
**Stack:** Python · TensorFlow/Keras · EfficientNetB3 · ONNX Runtime · Gradio · FastAPI · Grad-CAM · Docker · GitHub Actions · Hugging Face
**Description:** Production extension of an IEEE-published brain-tumor MRI classifier. Beyond reproducing the original four-architecture benchmark, it adds the evaluation and deployment work that turns a high-accuracy notebook into a served, trustworthy system: leakage auditing, out-of-distribution testing, calibration, uncertainty, robustness, explainability, and a live web app.
**Bullets:**
- Co-authored an IEEE 2024 paper benchmarking CNN, VGG16, InceptionV3, and EfficientNetB3 for 4-class brain-tumor MRI classification, with EfficientNetB3 reaching **99.844% accuracy** on **7,023 MRI images** at **11.7M parameters** (smallest of the four)
- Audited the benchmark and found the 99.844% inflated by train/test leakage: a perceptual-hash audit surfaced **44.6% near-duplicate** and **114 exact-duplicate** images across the split, with **98.9% accuracy on leaked vs 90.0% on novel** images; documented that patient-level de-duplication is irrecoverable from the multi-source compilation
- Reproduced the EfficientNetB3 pipeline end to end (**93.94%** on the rebalanced test set, **macro ROC-AUC 0.985**) with per-class metrics, confusion matrices, ROC/PR curves, and confidence distributions, plus an honest **72.3% out-of-distribution accuracy** on a separate public MRI dataset
- Calibrated confidence via temperature scaling (**ECE 0.0425 → 0.0136**), added Test-Time-Augmentation uncertainty (entropy **0.36 on correct vs 0.78 on wrong**), and ran corruption-robustness testing across 6 perturbation types, exposing near-random accuracy under Gaussian noise
- Deployed a live Gradio app on Hugging Face Spaces backed by **ONNX Runtime** CPU inference, returning predicted class, calibrated confidence, uncertainty, Grad-CAM overlay, latency, and a medical disclaimer; model versioned on Hugging Face Hub
- Built for reproducibility: modular package, pinned dependencies, one-command reproduction script, Dockerfile, pytest suite, **GitHub Actions CI**, and a model card with every number backed by a measured run
- Debugged a deployment-time accuracy collapse (53% → 94%) traced to non-converged BatchNorm statistics on Apple Metal, fixed with a recalibration pass

---

### Pharmacy ERP & Distribution System
**Live:** https://rx-flow-web.vercel.app
**Code:** https://github.com/Udit013/RxFlow
**Stack:** Next.js · TypeScript · Fastify · Prisma · PostgreSQL (Neon) · Turborepo · Server-Sent Events · React Query · jsPDF
**Description:** Multi-tenant pharmacy ERP for the Indian pharmaceutical market — inventory, GST-compliant billing, procurement, accounting, and payroll in one platform, with real-time sync and transactionally consistent operations, deployed entirely on free-tier infrastructure. Built to replace legacy tools like Marg and Tally.
**Bullets:**
- Built a multi-tenant pharmacy ERP as a pnpm/Turborepo monorepo (Fastify API, Next.js 14 web app, shared Prisma layer); each signup provisions an isolated tenant with its own stores, employees, financial books, and role-based permissions, secured with JWT auth
- Built an India-specific GST and invoicing engine: CGST/SGST/IGST at the line-item level, automatic interstate routing, credit-note adjustments, and GSTR-1 / GSTR-3B returns with Excel/CSV export
- Designed transactionally correct inventory and accounting: sales, purchases, returns, inter-store transfers, and stock reconciliations atomically update batch inventory, per-store stock, supplier/customer ledgers, and financial records inside DB transactions
- Implemented real-time multi-device sync with Server-Sent Events and tenant-scoped pub/sub, propagating inventory and billing updates across counters, tablets, and mobile within seconds, with full audit logs
- Built business modules across procurement, accounts payable/receivable, expense and income tracking, P&L, cash-flow reporting, attendance, and payroll with automated loss-of-pay proration
- Built a CSV purchase-import pipeline that fuzzy-matches free-text product descriptions to the medicine catalog via letter- and digit-aware token scoring, with reusable supplier-specific templates
- Added AES-256-GCM encrypted backup/restore, global command-palette search, PDF invoice generation, and audit trails
- Deployed on **$0 free-tier infrastructure** (Vercel, Render, Neon), working through Prisma connection strategies, serverless constraints, and environment-specific build behavior — full ownership across architecture, backend, frontend, database, and DevOps

---

### Biomedical AI Research Assistant
**Live:** [huggingface.co/spaces/Udit013/biomed-assistant](https://huggingface.co/spaces/Udit013/biomed-assistant)
**Model:** [Udit013/qwen2.5-7b-medmcqa-qlora-5k](https://huggingface.co/Udit013/qwen2.5-7b-medmcqa-qlora-5k)
**Code:** [Udit013/biomed-llm-peft](https://github.com/Udit013/biomed-llm-peft)
**Stack:** Python · PyTorch · Transformers · PEFT/QLoRA · LangGraph · FastAPI · Gradio · PostgreSQL + pgvector (Neon) · Hugging Face Hub/Inference · Docker · GitHub Actions
**Description:** Biomedical research assistant that answers clinical questions with grounded, cited evidence — RAG over PubMed abstracts and NIH/WHO/CDC guidelines, a LangGraph multi-agent workflow with per-claim citation verification, and a 4-way evaluation harness (Base / Fine-tuned / Base + RAG / Fine-tuned + RAG) — built on a QLoRA-fine-tuned Qwen2.5-7B and deployed end to end on free-tier infrastructure.
**Bullets:**
- Fine-tuned **Qwen2.5-7B-Instruct with 4-bit QLoRA** (**0.92%** of parameters trainable) on **MedMCQA (~194K MCQs)** and evaluated with **EleutherAI lm-evaluation-harness**: in-domain MedMCQA **47.5% → 50.0%** (a within-noise null, since instruction tuning already near-saturates the task) and out-of-domain PubMedQA **48.0% → 64.5%**; published the adapter to the Hugging Face Hub with a full model card
- Built a RAG pipeline over biomedical literature — reproducible ingestion (NCBI E-utilities), sentence-aware chunking, `bge-small` embeddings, semantic retrieval with metadata filtering, cross-encoder reranking, and inline citations — indexing **733 PubMed abstracts into 3,410 vector chunks** in **Neon PostgreSQL + pgvector**
- Implemented a **LangGraph 4-agent workflow** (Planner → Retrieval → Answer → Citation-Verification) returning grounded, `[n]`-cited answers that flag every claim as supported or unsupported, with a dependency-free sequential fallback for testing
- Deployed end to end on **free-tier infrastructure** (Gradio Space → FastAPI on Render → Neon pgvector → HF Inference), serving live cited **Base + RAG** answers at **~4 s**; the API reports the exact config it served, so a swap to **Fine-tuned + RAG** via a GPU endpoint needs zero UI or API change
- Engineered a torch-free serving path for the free tier — a vector-store abstraction (local NumPy for dev/CI, Neon pgvector for prod), local **ONNX query embeddings** (fastembed), and a router-based HF Inference LLM — small enough for a 512 MB instance
- Designed a **4-way evaluation harness** across retrieval (Recall@k, MRR), generation (citation coverage, groundedness, ROUGE-L, BERTScore), and systems (p50/p95 latency, token usage, estimated cost), with comparison tables and an interactive Benchmark Explorer
- Separated the research pipeline from the production system in a modular package, with pinned dependencies, a Dockerized backend, structured JSON logging with per-stage latency, and **GitHub Actions CI running a 12-test suite** on every push

---

### Decision Intelligence Engine
**Live:** [coresightiq.vercel.app](https://coresightiq.vercel.app)
**Code:** [github.com/Udit013/decision-intelligence-platform](https://github.com/Udit013/decision-intelligence-platform)
**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind v4 · Apache ECharts · Drizzle ORM · Neon PostgreSQL · jsPDF · Ollama · Vitest · GitHub Actions
**Description:** Unified decision intelligence platform that merges three separate full-stack products — product analytics, retail operations, and market expansion — onto one reusable analytics engine, proving a single pipeline (ingest → score → recommend → report → advise) generalizes across three very different domains, behind a bespoke, handcrafted design system.
**Bullets:**
- Re-architected three independent apps into one platform by extracting their shared pipeline into a reusable **`/core` engine** and turning each product into a thin, pluggable domain module — eliminating triplicated logic (a normal-CDF implemented twice, three near-identical AI clients, three hand-rolled classifiers)
- Built a domain-agnostic core — time-series forecasting, weighted **multi-criteria scoring + bucket classifier**, a recommendation synthesizer, RFM segmentation, cohort retention, a two-proportion A/B engine, PDF reporting, and a local-AI advisor — covered by **105 unit tests**; the single scoring primitive powers both Market's *Expand/Investigate/Monitor/Avoid* and Product's *RICE/ICE/WSJF → Now/Next/Later/Backlog*
- Engineered a **validation harness** (absent from the originals) doing leakage-free **walk-forward backtesting** and **confidence calibration** (Brier, ECE), and shipped a reproducible demo proving the harness can *fail* (white-noise R² ≈ −0.17), making every accuracy claim auditable
- Grounded the Operations module in the **real UCI Online Retail II dataset (~1.07M transactions)** and reported honest out-of-sample accuracy — **weekly-revenue R² ≈ 0.07, MAPE ≈ 30%** — explicitly retiring an unreproducible "0.90 R² / 86% accuracy" claim from the legacy build
- Designed and built a bespoke design system from scratch to deliberately avoid generic dashboard and UI-kit patterns; every screen is a custom component — masthead module tabs, a numbered index rail, a divided figures ledger, a ranked-decision docket with inline confidence meters, and a transcript-style AI console
- Built a **shared data-upload workspace** (drag-and-drop, multi-file with per-file progress, CSV/XLSX/JSON/PDF/DOCX validation and preview) with one-click ingestion of tabular files into the live analytics via heuristic column mapping and a double-ingest guard
- Hardened for production: **CI pipeline** (lint, typecheck, 105 tests, build on every push), route-level error/loading boundaries, security headers, input validation, and a health endpoint; parallelized queries and added caching to cut the data-heavy Decision Center from ~5 s to ~15 ms warm
- Shipped a single Next.js app with push-to-deploy on Vercel; the AI advisor is **local-first via Ollama with a deterministic fallback**, keeping recommendations reproducible, explainable, and free of paid AI APIs

---

### Personal Portfolio Website
**Live:** https://uditagarwal.vercel.app
**Code:** github.com/Udit013/uditagarwal-portfolio-website
**Stack:** React · TypeScript · Vite · GSAP · Three.js / WebGL · Lenis
**Description:** Interactive, animated portfolio with a liquid-glass UI (light and dark themes) and a cursor-reactive WebGL particle backdrop. Notable touches: a real ⇆ anime portrait reveal slider, a category-filtered "floating skills" toolkit, GSAP + Lenis scroll motion, and a built-in interactive terminal. Fully responsive, honors reduced-motion, and deployed on Vercel with push-to-deploy.

---

## TECHNICAL SKILLS (full master list)

**Programming Languages:** Python, TypeScript, JavaScript, Java, C/C++, SQL
**Frontend:** React, Next.js, Vite, HTML5, CSS3, Tailwind CSS, GSAP, Three.js/WebGL, Web Speech API, Chart.js, Apache ECharts, Recharts
**Backend & APIs:** Node.js, Express.js, Fastify, FastAPI, REST APIs, WebSockets, Server-Sent Events, better-auth, Zod, APScheduler, React Query
**Databases & Storage:** PostgreSQL, pgvector, MySQL, MongoDB, Redis, Firebase, Firestore, Neo4j, SQLite, Drizzle ORM, Prisma
**Cloud & DevOps:** AWS (EC2, S3, Lambda, RDS, CloudFront), Docker, CI/CD, Git, Postman, Vercel, Cloudinary, ServiceNow, Turborepo
**AI/ML:** PyTorch, TensorFlow/Keras, Scikit-learn, Hugging Face, Transformers, CNNs (VGG16, InceptionV3, EfficientNetB3), BERT, ONNX Runtime, Grad-CAM, Model Calibration, Prompt Engineering
**LLMs & Fine-Tuning:** Qwen2.5, LLM Fine-Tuning, QLoRA, PEFT/LoRA, 4-bit Quantization (bitsandbytes), lm-evaluation-harness, vLLM, Gemini API, Ollama, RAG, LangGraph, Structured Generation, Hugging Face Hub, Gradio
**Data Engineering & Analytics:** Pandas, NumPy, Matplotlib, Tableau, Apache Airflow, ETL Pipelines, Data Modeling, Forecasting, Statistical Modeling, Backtesting
**Security & DevSecOps:** Secrets Detection, Regex Pattern Matching, Entropy Analysis, Vulnerability Scanning, Git History Auditing, SARIF Export, SMTP Alerting
**Testing & Quality:** Vitest, Unit Testing, jsPDF
**Systems & Architecture:** System Design, Distributed Systems, API Design, Authentication & Authorization, Caching, Fault Tolerance, Load Balancing, Auto-Scaling, Serverless Architecture, Monorepo Architecture
**MLOps & Experimentation:** Model Evaluation & Benchmarking, Inference Optimization, Experiment Tracking, Hyperparameter Tuning, Cross-Validation, Error Analysis, Data Leakage Auditing, Confidence Calibration, OOD Testing, Model Cards, A/B Testing

---
