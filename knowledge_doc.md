# Udit Agarwal — Knowledge Document
*Last updated: Sep 13 2026*

---

## PERSONAL PROFILE

- **Name:** Udit Agarwal
- **Email:** agarwaludit13@gmail.com
- **Phone:** +1 (930) 904-4901
- **LinkedIn:** linkedin.com/in/udit013
- **GitHub:** github.com/Udit013
- **Portfolio:** uditagarwal.vercel.app
<!-- Use "United States" as the location on the resume. Current location is Bloomington, Indiana, United States and I am open to relocation anywhere in the United States. -->
- **Location:** United States

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
- Architect and deliver full-stack applications, backend services, REST APIs, dashboards, and workflow automation solutions tailored to client-specific business and operational requirements
- Engineer AI-powered features and LLM-driven automation workflows that reduce manual processes, accelerate information retrieval, and improve data-driven decision-making
- Translate complex and ambiguous business requirements into scalable technical designs, collaborating directly with engineering, data, and operations stakeholders
- Own end-to-end delivery of production systems, spanning architecture, implementation, testing, deployment, debugging, and ongoing maintenance
- Develop solution architectures, technical roadmaps, and implementation documentation that accelerate deployment, knowledge transfer, and long-term system maintainability

---

### University Information Technology Services (UITS) — Indiana University

**Role:** Consultant – IT Services
**Period:** Aug 2025 – Present
**Location:** Bloomington, IN, US
**Type:** Part-Time · On-site
**Description:** Technical support and systems administration for university-wide infrastructure, including enterprise applications, identity systems, and end-user computing.
**Bullets:**
- Resolve **100+ technical issues weekly** across desktop, mobile, and enterprise applications through structured troubleshooting and root-cause analysis
- Diagnose and remediate hardware, software, and network failures to minimize service disruption and keep technology services reliable for a large user base
- Support enterprise identity and access management across authentication, authorization, account provisioning, and lifecycle workflows
- Analyze recurring incidents and document technical resolutions and troubleshooting workflows in **ServiceNow**, improving knowledge reuse and consistency across support operations
- Collaborate with cross-functional IT teams to triage and resolve complex incidents, coordinate escalations, and restore service availability efficiently

---

### Global Health Impact Project — Indiana University

**Role:** Software Engineer
**Period:** Jan 2026 – Jun 2026
**Location:** Bloomington, IN, US
**Type:** Part-Time · Hybrid
**Description:** Global health analytics platform that models pharmaceutical intervention impact across populations — treatment coverage, efficacy, and outcomes — through large-scale forecasting workflows.
**Bullets:**
- Engineered full-stack analytics features using **React, TypeScript, and Python** to enable researchers to evaluate pharmaceutical intervention coverage, efficacy, and population-level outcomes
- Developed backend services and data pipelines for treatment-coverage modeling, efficacy analysis, and large-scale population health forecasting
- Designed and maintained **REST APIs** connecting analytical services and data pipelines with interactive forecasting dashboards and visualization workflows
- Optimized database queries and backend processing to improve application responsiveness and support increasingly complex analytical workloads
- Identified and resolved application bottlenecks and production issues across the technology stack, translating research requirements into reliable, production-ready features in collaboration with domain experts

---

## PROJECTS (full inventory)

### Chomp — Social Recipe & Creator App
**Live:** Private — client project via Heartland Community Network (pre-launch)
**Code:** Private repositories
**Stack:** React Native 0.81 · Expo SDK 54 (EAS) · Expo Router · TypeScript · Node.js · Express · AWS DynamoDB · JWT · Swagger/OpenAPI
**Description:** Cross-platform (iOS/Android) social recipe app where users share recipes, posts, and stories, follow chefs, explore trending content, and organize recipe books and grocery lists — plus a creator program (application, admin review, creator dashboard) and Stripe-backed premium subscriptions and creator payouts, on a Node.js/Express backend over AWS DynamoDB, S3, and CloudFront.
**Bullets:**
- Closed a privilege-escalation flaw that let any signed-in user approve their own creator application and assign themselves any tier, as measured by **3** previously unprotected admin endpoints now returning **403** to non-admins, by resolving roles from the user record — the JWT carried only id and email — and enforcing them through shared role middleware
- Restored a creator-program backend that could never have run — its controller required MongoDB models deleted in the DynamoDB migration — by rebuilding its data layer on DynamoDB and shipping the first working version: **6 REST endpoints** (apply, list, detail, admin list, review, stats) with Swagger docs, verified across **21** scripted API scenarios before merge
- Unblocked peer review of the admin workflow, which teammates couldn't test because the app had no way to grant admin, by writing an operator script to grant, revoke, and list admins — keeping privilege changes off the public API; closed a reviewer-reported bug where approved applications could be flipped to rejected by returning **409** for reviews of already-decided applications
- Shipped **~1,300 lines** of abandoned creator UI across **12 files** — left unmerged and **19 commits** behind `main` after its author left — by bringing it up to date with `main` instead of rebuilding it from Figma, resolving conflicts and fixing dead navigation: **3** dashboard links to non-existent screens, an "Apply" button with no handler, and a dashboard entry that opened the wrong screen
- Shipped a working creator-application flow in place of a submit button that only showed a fake success alert, as measured by all **4** application states (pending, under review, approved, rejected) rendering the correct screen, by building a typed API service and mapping the design's fields onto the API contract; caught two regressions before merge (under-review applicants shown a form that could only fail, and a merge that silently dropped the router) and verified with Android and iOS production builds
- Diagnosed a build failure that stopped the app compiling for the whole team — a merged PR imported a module that existed only in an unmerged one — by stubbing the module locally to isolate the fault and confirm the rest of the app still built; also restored the Explore feed from a 404 caused by a stripped `/api` URL prefix (one-line fix, merged)

---

### PrepWise - AI Voice Interview Platform
**Live:** https://mock-ai-prep.vercel.app
**Code:** https://github.com/Udit013/ai_mock_interview_prep
**Stack:** Next.js 15 · TypeScript · Firebase Auth & Firestore · Gemini 2.5 Flash · Web Speech API · Monaco Editor · Pyodide/WASM · Zod · unpdf · Vitest
**Description:** AI interview platform that runs adaptive voice interviews with a human-like interviewer that reacts to hesitation and confidence, live coding rounds with in-browser code execution, company-specific interview styles, résumé-aware questions, replay, shareable reports, and progress tracking — entirely on browser-native and free-tier infrastructure.
**Bullets:**
- Cut per-interview speech costs to **$0** across **5 interview formats** by replacing paid STT/TTS services with browser-native speech recognition and synthesis, trading some accuracy and Chrome/Edge-only support for zero marginal cost per session
- Made the interviewer react to *how* candidates answer — in live Gemini runs a hesitant, filler-heavy answer dropped its confidence estimate from **50 → 20** and triggered a fundamentals probe, while a composed answer raised it to **80** and escalated difficulty — by measuring hesitation, pace, and filler density in the browser and folding grading, state updates, and next-question selection into **1 schema-validated LLM call per turn** (median **4.35 s**)
- Guaranteed every interview ends by enforcing a hard cap of **min(questions + 4, 12) turns** in code, overriding the model's own stopping decision rather than trusting an unbounded agent loop
- Cut the response to an unanswered question from a **4.35 s** model round trip to **~1.6 µs** of local computation with a deterministic "I don't know" detector, validated by **58 tests** — including **14** hedged answers that must never be skipped, such as "I don't know the exact number, but I'd estimate ~50ms"
- Stopped long spoken answers from being cut off at the first pause by rebuilding capture as continuous recognition that accumulates segments across pauses, recovers from Chrome's periodic recognizer shutdowns, and lets candidates edit the transcript before sending, with a typed fallback when the mic is blocked
- Shipped live coding rounds with real in-browser execution for JavaScript and Python, killing infinite loops at a **5 s** (JS) / **15 s** (Python) timeout without freezing the tab, by running code in a terminable Web Worker with a lazily loaded Pyodide (WASM) runtime — trading server-grade isolation for a zero-infrastructure sandbox
- Supported **9 company interview styles** (Google, Amazon, Meta, McKinsey, BCG, and more) from a single config registry with no duplicated prompt logic, so adding a company is one config entry
- Grounded questions in candidates' real projects by extracting résumé PDFs with `unpdf` and structuring them with Gemini, rejecting image-only PDFs before spending a model call, and de-duplicating generated question sets so a sloppy generation fails cleanly instead of producing a repetitive interview
- Scored each interview on **5 competencies** plus STAR completeness through Zod-validated structured output, with full interview replay and revocable **128-bit** share links
- Closed a class of IDOR vulnerabilities by cutting the public Server Action surface from **19 to 9** endpoints — removing **7** that accepted caller-supplied user IDs and exposed transcripts, code, and résumés — alongside session auth, bounded payloads, and transactional per-user daily rate limits
- Kept the progress dashboard to **183 B** of route-level JavaScript and halved its Firestore reads (**2 → 1** per load) by rendering hand-built SVG charts as React Server Components and reusing already-fetched data, all covered by a **120-test** Vitest suite in GitHub Actions CI

---

### SnapCast - Screen Recording & Video Sharing
**Live:** [snapcast-video-sharing.vercel.app](https://snapcast-video-sharing.vercel.app)
**Code:** [Udit013/screen_recording_sharing_app](https://github.com/Udit013/screen_recording_sharing_app)
**Stack:** Next.js 15 · React 19 · TypeScript · Neon PostgreSQL · Drizzle ORM · better-auth (Google OAuth) · Cloudinary · Gemini 2.0 Flash · MediaRecorder / Canvas / Web Speech APIs · IndexedDB · Web Workers · Vitest · GitHub Actions
**Description:** Loom-style screen recording and video sharing platform with browser-native capture, live narration transcription, AI summaries and chapters, a custom player, threaded timestamp comments, privacy-controlled sharing, and channel analytics — running entirely on free-tier infrastructure.
**Bullets:**
- Built extension-free screen recording with webcam picture-in-picture at **1080p / 30 fps** by compositing the screen and camera streams onto a Canvas and recording it with MediaRecorder (VP9/Opus), with configurable corner, shape, and size for the webcam overlay
- Fixed recordings freezing whenever users switched tabs by moving the compositor off `requestAnimationFrame`, which browsers suspend in background tabs, onto a Web Worker timer that keeps firing while the tab is hidden
- Limited data loss from a crash or accidental refresh to about **1 second** of footage by persisting each 1-second MediaRecorder chunk to IndexedDB as it's produced and offering one-click restore on return, with pause-aware timing that excludes paused time from duration and transcript timestamps
- Kept video bytes off the application server entirely for uploads up to **500 MB** by signing Cloudinary uploads server-side, scoped to a single `public_id`, and uploading directly from the browser with byte-level progress
- Made every recording searchable and navigable — click-to-seek transcript, live search with highlighting, playback-synced active segments — by transcribing narration live with the Web Speech API during recording, at no per-minute transcription cost
- Generated a summary, tags, and up to **8** chapters per video by running the **2** independent Gemini calls concurrently (latency of the slower call, not their sum), clamping AI timestamps to the real duration, never overwriting chapters the owner wrote by hand, and falling back to title and description when a video has no transcript
- Closed **10** cross-user access flaws found in a security audit — including any signed-in user being able to delete another user's video files, profile pages leaking every user's email address, and private videos exposed through comments and playlists — by centralizing video-access rules in one unit-tested module and folding the view-count check into its `UPDATE` so the hot path stays a single query
- Delivered 3-tier privacy (public / private / link-only) with revocable share links expiring in **1–30 days**, and channel analytics (unique viewers, watch time, completion rate) aggregated in SQL from a per-session event log that also counts anonymous share-link viewers
- Built a fully custom video player (**7** playback speeds, J/K/L and 0–9 keyboard seeking, chapter markers on the seek bar, picture-in-picture, `?t=` deep links) and threaded timestamp comments over a **10-table** Postgres schema, gated by a **39-test** Vitest suite and CI (typecheck → tests → build)

---

### CipherWatch - Secret Exposure & Risk Detection
**Live:** [cipherwatch-web.vercel.app/](https://cipherwatch-web.vercel.app/)
**Code:** [Udit013/automated-secrets-scanner](https://github.com/Udit013/automated-secrets-scanner)
**Stack:** Python · FastAPI · SQLAlchemy 2.0 (async) · Pydantic · SQLite · GitPython · APScheduler · WebSockets · React · TypeScript · TanStack Query · Tailwind CSS · Vite · pytest · GitHub Actions
**Description:** Full-stack DevSecOps platform that detects hardcoded credentials in GitHub repositories and pasted code across 26 secret types, using regex pattern matching, Shannon-entropy gating, and placeholder/test-file filtering — with opt-in git-history scanning that reconstructs each secret's exposure lifecycle, a transparent 0–100 risk score, run-over-run differential scanning, SARIF/JSON/CSV/remediation-patch export, real-time scan progress, cron-scheduled scans with email alerts, and a custom-built security operations console.
**Bullets:**
- Detected **26 credential types** — **8 CRITICAL, 17 HIGH, 1 MEDIUM** (AWS, GCP, GitHub, Stripe, Slack, JWTs, SSH/PGP keys, database connection strings, and more) — across **36 file extensions** at **~96K lines/sec (~630 files/sec)**, as measured single-threaded on the project's own **12.4K-line** codebase, by pairing **23** format-specific regexes with Shannon-entropy gating (default **3.5 bits**) reserved for the **3** shape-less generic patterns, and filtering noise through **14** placeholder rules plus **9** test-path rules that downgrade severity one tier
- Scanned public GitHub repositories end to end in **~1.2 s** — **101 source/config files of `pallets/flask`**, including download, extraction, and scanning — as measured over the network, by pulling each repo as a single API zipball instead of running `git clone`, validating every archive path before extraction, and pruning **13** dependency/build directories (`node_modules`, `dist`, `.git`, …)
- Turned noisy git history into actionable findings, as measured by collapsing **1,351 per-commit matches across 907 file snapshots into 82 unique findings (−94%)** over 14 commits in **1.6 s** on the project's own repository, by aggregating each secret by file, type, and masked value and reconstructing its lifecycle (introduced and last-seen dates, exposure days, commits, distinct authors) — kept **opt-in and capped at 1–1,000 commits** (default 100) because it re-scans the full tree at every commit, O(commits × files)
- Made triage explainable, as measured by every point of a **0–100 exposure risk score** tracing to a stated reason (covered by **13 unit tests**), by combining a severity base (**55 / 35 / 18 / 8**) with **5** capped bonuses — git history **+18**, repeat occurrences up to **+12**, exposure window **+5–15**, multiple authors **+5**, entropy ≥ 5 bits **+5** — bucketed into **4** risk bands, alongside differential scanning that labels findings new, resolved, or unchanged against the prior run using a **3-field** identity key (file, type, masked value) so shifted line numbers never read as new leaks
- Delivered an async FastAPI backend, as measured by **18 REST endpoints** plus a WebSocket channel streaming **4** scan-lifecycle events, by running scans as background tasks with APScheduler cron schedules and SMTP alerts on CRITICAL findings, and bounding every input on the unauthenticated API — **512 KB** pastes, a GitHub-URL allowlist, **1–1,000** commits, **0–8**-bit entropy, and page sizes capped at **200 / 2,000** — deployed at **$0** on Render + Vercel free tiers
- Kept every push verified, as measured by **75 tests** (56 API/unit + 19 CLI) at **73%** backend line coverage — **100%** on the risk-scoring, SARIF, input-validation, and stats modules — by gating a **4-job** GitHub Actions pipeline (backend, CLI, frontend typecheck + build, and a self-scan of the repo with its own scanner) that finishes in **under 90 s**
- Plugged findings into existing security workflows, as measured by **5** export formats — **SARIF 2.1.0** in the schema GitHub code scanning ingests (verified by **8 tests**, mapping each tier to GitHub security-severity **9.5 / 8.0 / 5.0 / 2.5**), JSON, CSV, a structured remediation report, and a downloadable patch — by generating idiomatic env-var replacements for **6** targets (Python, Node, Ruby, Go, PHP, `.env`) from **26** conventional variable-name mappings plus a deduplicated `.env.example`, with no repository write access required
- Closed security and performance flaws found in a codebase audit, as measured by a **zip-slip** path traversal fixed in repository-archive extraction (verified against a crafted `../../` payload), two WebSocket registry leaks closed (disconnected clients were never removed — **1 → 1** before, **1 → 0** after), and SQL per dashboard-stats request cut from **9 to 6**, by validating archive paths before extraction, reading on the socket to detect disconnects, collapsing four per-severity counts into one `GROUP BY`, and indexing the **5** hot filter/sort columns
- Cut shipped JavaScript by **56% (733 → 321 KB; 212 → 102 KB gzipped)** and bundled modules from **2,600 to 479**, as measured by production builds before and after, by replacing a charting and an icon library with hand-built SVG charts inside a from-scratch design system (**15.8:1** primary-text contrast, `/`-to-search, `prefers-reduced-motion`); also stopped scans that finish in **under 10 ms** server-side from outrunning the WebSocket handshake and freezing progress at **0%**, via a **1.5 s** HTTP-poll fallback where whichever channel reports completion first wins

---

### NeuroClass - Brain Tumor MRI Classifier (IEEE 2024)
**Live:** https://huggingface.co/spaces/Udit013/brain-tumor-mri-classifier
**Model:** https://huggingface.co/Udit013/brain-tumor-efficientnetb3
**Code:** https://github.com/Udit013/Brain_Tumor_Classificatioin
**Publication:** [Identifying Various Types of Brain Tumors using Deep Neural Network based Image Features](https://doi.org/10.1109/ICC-ROBINS60238.2024.10533941), ICC-ROBINS 2024, IEEE (co-author)
**Stack:** Python · TensorFlow/Keras · EfficientNetB3 · ONNX Runtime · OpenCV · scikit-learn · Gradio · FastAPI · Hugging Face Hub & Spaces · pytest · GitHub Actions
**Description:** Production extension of an IEEE-published brain-tumor MRI classifier. Beyond reproducing the original four-architecture benchmark, it adds the evaluation and deployment work that turns a high-accuracy notebook into a served, trustworthy system: leakage auditing, out-of-distribution testing, calibration, uncertainty, robustness, explainability, and a live web app.
**Bullets:**
- Co-authored an IEEE ICC-ROBINS 2024 paper benchmarking **4** CNN architectures (custom CNN, VGG16, InceptionV3, EfficientNetB3) for 4-class brain-tumor MRI classification on a **7,023-image** dataset, where EfficientNetB3 posted the top reported accuracy (**99.844%**) with **11.7M** parameters — **38%** fewer than the next-smallest model (VGG16, 18.9M)
- Exposed train/test leakage inflating the published benchmark, as measured by **98.9%** accuracy on test images with a near-duplicate in training vs **90.0%** on novel ones (**44.6%** near-duplicates and **114** exact pixel duplicates across a **1,600**-image test set), by building a perceptual- and content-hash audit over all **8.96M** train/test image pairs — reported as a lower bound, since the multi-source dataset carries no patient IDs
- Replaced a single headline number with a defensible evaluation, as measured by **93.94%** accuracy and **0.985** macro ROC-AUC in-distribution plus an honest **72.3%** on a separate **253**-image external MRI dataset, by re-implementing the published notebook as a tested Python package with exact recipe parity, per-class precision/recall/F1, confusion matrices, ROC/PR curves, and a tumor-vs-no-tumor evaluation for the external set
- Made confidence scores trustworthy enough to act on, as measured by expected calibration error cut **68%** (**0.0425 → 0.0136**) and predictive entropy **2.2×** higher on wrong predictions than correct ones (**0.78** vs **0.36**, n=200), by fitting temperature scaling and adding **6**-view test-time augmentation that flags low-certainty predictions for review
- Pinpointed the model's critical failure mode, as measured by accuracy across **30** corruption conditions (6 types × 5 severities; **93.0%** clean → **72.5%** mean), by building a robustness benchmark showing additive Gaussian noise drops accuracy to near-chance (**~25%**) at every severity while brightness, contrast, and rotation stay above **80%**
- Rescued inference accuracy from **53%** to **93.9%** after a silent collapse toward one class, by isolating the fault to non-converged BatchNorm running statistics on Apple Metal — training-mode vs inference-mode accuracy on identical inputs (**78% vs 53%**) while ROC-AUC held at **0.97** — and re-estimating those statistics with forward passes that leave the learned weights untouched
- Deployed a live web app delivering **3.5×** lower CPU latency than the Keras model (**118 → 33 ms**, 50-run mean), by exporting to ONNX Runtime and serving predictions with calibrated confidence, uncertainty, and Grad-CAM heatmaps through Gradio on Hugging Face Spaces, with the model versioned on the Hugging Face Hub
- Kept every result reproducible and the serving layer reliable, as measured by a **10**-stage one-command reproduction pipeline, a README results table generated only from measured run outputs, and **27** pytest tests gating GitHub Actions CI, by also fixing a FastAPI bug that failed every `/predict` request and capping uploads at **10 MB** to block memory-exhaustion attacks

---

### RxFlow - Multi-Tenant Pharmacy ERP
**Live:** https://rx-flow-web.vercel.app
**Code:** https://github.com/Udit013/RxFlow
**Stack:** Next.js 14 (App Router) · TypeScript · Fastify · Prisma · PostgreSQL (Neon) · pnpm + Turborepo · Server-Sent Events · React Query · Zustand · Zod · React Hook Form · Recharts · JWT + bcrypt · Web Crypto · jsPDF · SheetJS · Vitest · GitHub Actions
**Description:** Multi-tenant pharmacy ERP for the Indian pharmaceutical market — inventory, GST-compliant billing, procurement, accounting, and payroll in one platform, with real-time sync and transactionally consistent operations, deployed entirely on free-tier infrastructure. Built to replace legacy tools like Marg and Tally.
**Bullets:**
- Delivered a full-stack multi-tenant pharmacy ERP covering inventory, billing, procurement, accounting, HR, and payroll, spanning 22 API route modules and ~40 Prisma models, by architecting a pnpm/Turborepo monorepo (Fastify API, Next.js 14 web app, shared Prisma package) where every signup provisions an isolated tenant and every query is tenant-scoped from the JWT
- Automated Indian GST compliance end to end, generating GSTR-1 (B2B/B2C, credit/debit notes, HSN summary) and GSTR-3B plus sales/purchase and Schedule H1 registers with Excel/CSV export, by building a line-item tax engine that routes CGST+SGST vs IGST by comparing store and party state, pro-rates GST under special discounts, and caps credit-note returns per batch against quantity sold
- Kept stock and ledgers consistent across sales, purchases, returns, inter-store transfers, and stock-takes by wrapping batch inventory, per-store stock, party ledgers, and financial entries in single Prisma transactions, and prevented order-number collisions under concurrent billing with a unique-constraint retry (up to 3 attempts) on financial-year-scoped numbering
- Kept every open counter in sync without polling by building tenant-scoped Server-Sent Events pub/sub (25s heartbeat) wired into the audit layer, so each mutation writes an audit log and invalidates the exact React Query caches on every connected client — deliberately in-memory for the single-instance free tier, with Redis pub/sub as the documented scale-out path
- Replaced line-by-line manual entry of distributor invoices with a file upload, verified on real invoices from 5 distributors, by designing a plugin CSV-import pipeline — per-distributor column-map configs scored by a shared auto-detector (≥0.6 confidence, HSN-plausibility tiebreak), normalized to one model, then fuzzy-matched to the catalog via a barcode → exact → alias → fuzzy-name → generic cascade — so a new distributor is one config with zero changes to matching logic
- Hardened authentication against brute force and account enumeration with 15-minute access / 7-day rotating refresh JWTs (refresh tokens stored bcrypt-hashed), bcrypt-hashed 6-digit email OTPs capped at 5 attempts with 10-minute expiry, per-route rate limits on login/register/reset, and uniform responses for unknown accounts
- Protected tenant data exports with client-side encrypted backup/restore using AES-256-GCM and PBKDF2-SHA256 key derivation (200K iterations) via the Web Crypto API, so backup files are unreadable without the user's passphrase
- Built operations and HR modules — accounts payable/receivable, expense and income tracking, P&L, cash-flow, attendance, and payroll — where loss-of-pay is prorated from attendance status and paid payslips post automatically as expenses into the P&L
- Shipped to production on $0 free-tier infrastructure (Vercel, Render, Neon) by diagnosing environment-specific failures — a `useSearchParams` Suspense requirement breaking the Vercel static build, `NODE_ENV=production` hiding the Prisma CLI on Render, and Neon's pooled-vs-direct connection split for runtime vs schema sync
- Caught a UTC-vs-local financial-year boundary bug and brought API type errors from 13 to 0 by adding a 32-test Vitest suite (fiscal year, GST/discount/commission math, CSV parsers) and a GitHub Actions CI gate that typechecks, tests, and builds on every push

---

### Veritome - Biomedical RAG & QLoRA Assistant
**Live:** [huggingface.co/spaces/Udit013/biomed-assistant](https://huggingface.co/spaces/Udit013/biomed-assistant)
**Model:** [Udit013/qwen2.5-7b-medmcqa-qlora-5k](https://huggingface.co/Udit013/qwen2.5-7b-medmcqa-qlora-5k)
**Code:** [Udit013/biomed-llm-peft](https://github.com/Udit013/biomed-llm-peft)
**Stack:** Python · PyTorch · Transformers · PEFT/QLoRA (bitsandbytes 4-bit) · lm-evaluation-harness · LangGraph · sentence-transformers · fastembed (ONNX) · PostgreSQL + pgvector (Neon) · FastAPI · Gradio · Hugging Face Hub/Inference · Docker · GitHub Actions
**Description:** Biomedical research assistant that answers clinical questions with cited, claim-verified evidence — RAG over PubMed abstracts (ingestion also supports curated NIH/WHO/CDC guidelines), a LangGraph 4-agent workflow with per-claim citation verification, and a 4-way evaluation harness (Base / Fine-tuned / Base + RAG / Fine-tuned + RAG) — built on a QLoRA-fine-tuned Qwen2.5-7B and deployed end to end on free-tier infrastructure.
**Bullets:**
- Measured what domain fine-tuning actually buys a strong instruction-tuned 7B — **+16.5 pp** out-of-domain on PubMedQA (**48.0% → 64.5%**) but a within-noise **+2.5 pp** in-domain on MedMCQA (**47.5% → 50.0%**, noise ±3.5 pp) on matched **n=200** EleutherAI lm-evaluation-harness runs — by QLoRA-fine-tuning Qwen2.5-7B-Instruct (4-bit NF4, r=16, **0.92%** of parameters trainable) on a **5K-question** MedMCQA subset on a single free 16 GB Colab T4; published the adapter to the Hugging Face Hub with a model card
- Rejected an appealing but unsupported hypothesis ("PEFT helps fact-recall subjects most") by building a per-subject error analysis across **17** MedMCQA subjects (**5** improved, **10** neutral, **2** worsened) — reasoning-heavy Medicine and Surgery improved while fact-recall Biochemistry worsened — and reporting that subject counts of **1–57** are too small for subject-level claims
- Indexed **733 PubMed abstracts into 3,410 retrievable chunks** in Neon PostgreSQL + pgvector (384-dim, HNSW cosine index) by building a reproducible ingest → chunk → embed → store pipeline: NCBI E-utilities ingestion, sentence-aware chunking (512 chars, 64 overlap), `bge-small-en-v1.5` embeddings, source/year metadata filters, and optional cross-encoder reranking
- Eliminated false "unsupported" flags on correctly cited answers — a live sepsis answer rejected by word-overlap matching verified at **0.74–0.86** cosine similarity against a **0.6** threshold — by replacing Jaccard matching with embedding-based per-claim verification as the final agent of a LangGraph **Planner → Retrieval → Answer → Verify** workflow, keeping the lexical check as a fallback
- Fit the production serving path onto a **512 MB** free Render instance by making it torch-free — local ONNX query embeddings (fastembed), a vector-store abstraction (NumPy for dev/CI, pgvector in prod), and the LLM called through Hugging Face Inference — deployed as Gradio Space → FastAPI → Neon → HF Inference; the API reports the exact configuration it served (Base + RAG), so switching to Fine-tuned + RAG is a configuration change with no UI or API edits
- Built a 4-way evaluation harness (Base / Fine-tuned / Base + RAG / Fine-tuned + RAG) that scores retrieval (Recall@k, MRR), generation (citation coverage, groundedness, ROUGE-L, BERTScore), and systems cost (p50/p95 latency, tokens, estimated cost), validated end to end offline on a sample corpus ahead of a full GPU run
- Kept every push verified without a GPU or model download by gating GitHub Actions on an **8-stage** structural smoke test of the training pipeline plus **13** deterministic CPU tests (fixing a flaky test caused by Python's per-process hash randomization), and hardened the API with request-ID tracing, a **1,000-character** input cap, and upstream model failures returned as descriptive **502s** instead of opaque 500s

---

### CoreSightIQ - Decision Intelligence Engine
**Live:** [coresightiq.vercel.app](https://coresightiq.vercel.app)
**Code:** [github.com/Udit013/decision-intelligence-platform](https://github.com/Udit013/decision-intelligence-platform)
**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Apache ECharts · Drizzle ORM · Neon PostgreSQL (serverless) · PapaParse · SheetJS (xlsx) · jsPDF · Ollama · Vitest · GitHub Actions
**Description:** Unified decision intelligence platform that merges three separate full-stack products — product analytics, retail operations, and market expansion — onto one reusable analytics engine, proving a single pipeline (ingest → score → recommend → report → advise) generalizes across three very different domains, behind a bespoke, handcrafted design system.
**Bullets:**
- Eliminated triplicated business logic across three previously separate full-stack apps, as measured by collapsing two divergent statistical implementations of the same normal-CDF function, three near-identical AI client integrations, and three hand-rolled rank-and-classify systems down to one canonical version of each, by extracting the shared ingest→score→recommend→report→advise pipeline into a single reusable **`/core` engine** consumed by three thin, pluggable domain modules
- Proved the core engine's abstractions genuinely generalize, as measured by **105 passing unit tests** and one weighted multi-criteria scoring primitive (`scoreAndClassify`) reused verbatim to power two unrelated systems — Market's *Expand/Investigate/Monitor/Avoid* classifier and Product's *RICE/ICE/WSJF → Now/Next/Later/Backlog* ranking — by building a domain-agnostic core spanning time-series forecasting, a recommendation synthesizer, RFM segmentation, cohort retention, a two-proportion A/B testing engine, PDF reporting, and a local-AI advisor
- Made every forecast-accuracy claim auditable instead of assumed, as measured by a reproducible failure-mode script that verifies the harness correctly reports a **negative out-of-sample R² (−0.235)** on adversarial white-noise input and a **0.77 Expected Calibration Error** on a deliberately overconfident classifier, by engineering a from-scratch walk-forward backtesting and confidence-calibration harness (absent from all three source apps) on top of a forecasting engine that selects its own model type via a leakage-free nested-holdout split
- Retired an unverified "0.90 R² / 86% accuracy" claim inherited from a legacy predecessor app, as measured by reproducing the real number instead — a walk-forward, out-of-sample **R² of 0.072 (MAPE 30.3% across 44 folds)** — by grounding the Operations module in a real, ETL'd dataset of **~1.07M UK e-commerce transactions** (UCI Online Retail II) and surfacing the honest, less-flattering result directly in the product UI
- Replaced generic dashboard and UI-kit visual patterns with a fully custom, hand-built design system, as measured by every interactive surface — masthead module navigation, a divided KPI ledger, a ranked-decision docket with animated confidence meters, and a transcript-style AI console — shipping without a pre-built component library, by iterating through multiple complete visual-language passes to deliberately avoid a recognizable AI-generated look
- Shipped a self-service data pipeline supporting **6 file formats** (CSV, XLSX, JSON, TXT, PDF, DOCX) with real per-file upload progress and format-specific handling, as measured by CSV/XLSX/JSON files being fully parsed, previewed, and ingested directly into live analytics with zero manual schema mapping, by building a heuristic column-alias matcher plus a double-ingest guard that blocks a repeat load from silently doubling downstream metrics
- Cut the data-heavy Operations Decision Center's response time from a **~5.4 s cold database query to ~15 ms on warm requests (a ~99.7% reduction)**, as measured by direct before/after timing, by parallelizing independent SQL queries with `Promise.all` and layering Next.js request-scoped caching (`unstable_cache`) with tag-based invalidation triggered on new data ingestion
- Hardened the platform for production reliability, as measured by a **4-stage CI pipeline** (lint, typecheck, 105 tests, build) gating every push, route-level error/loading boundaries replacing default crash screens, and baseline HTTP security headers (HSTS, X-Frame-Options, nosniff) applied platform-wide, while keeping the AI advisor **local-first via Ollama with a deterministic rule-based fallback** so every answer stays available, reproducible, and free of paid AI API cost even when no model is reachable

---
<!-- Do not use the portfolio webiste project in resumes. -->
### Personal Portfolio Website - Interactive Web Experience
**Live:** https://uditagarwal.vercel.app
**Code:** github.com/Udit013/uditagarwal-portfolio-website
**Stack:** React 18 · TypeScript (strict) · Vite · GSAP (ScrollTrigger) · Lenis · SplitType · WebGL (hand-written, no Three.js) · ESLint · Vercel
**Description:** Interactive, animated portfolio with a liquid-glass UI in light and dark themes and a cursor-reactive WebGL particle backdrop. Features an intro curtain painted from static HTML, a cursor-driven real ⇆ anime portrait split, a tabbed skills toolkit, an infinite project belt with case-study drawers and screenshots, GSAP + Lenis scroll motion, and a built-in interactive terminal. Fully responsive, honors reduced motion, and deploys on push via Vercel.
**Bullets:**
- Replaced a Three.js / React Three Fiber scene with a hand-written, dependency-free WebGL particle field (~230 lines), removing **~218 KB** of gzipped JavaScript while keeping the same visual
- Cut idle repaints by **62%** (**199 → 76** per second) and idle per-frame rendering cost by **42%** (**1.51 → 0.88 ms**), as measured with Chrome performance traces, by removing a full-screen animation that moved zero pixels yet repainted every frame and moving the rotating badge, status pulses, and film grain onto compositor-only transforms
- Fixed a scroll trap that froze the page at the projects section (stuck at **6,131 of 7,741 px**) by engaging the project belt's wheel capture only on real pointer movement, and removed a **1,371 px** mid-scroll layout jump caused by an inaccurate `content-visibility` estimate and a width-changing counter
- Painted the intro curtain from static HTML on the first frame and lifted it on font readiness with a failsafe timer, holding LCP to **688 ms** on throttled Fast 4G with a 4× CPU slowdown
- Reached **0** axe-core violations across dark, light, mobile, and open-terminal states by moving accent buttons to a theme-aware text token (**2.64:1 → 7.34:1** contrast), making off-screen menus inert with focus restoration, and implementing the WAI-ARIA tabs and carousel patterns
- Kept design tokens single-sourced — CSS custom properties read by the WebGL layer at runtime, plus a lint-time check that fails if the pre-paint loader palette drifts — alongside ESLint, strict TypeScript, a top-level error boundary, and CSP/HSTS security headers on Vercel

---

## CERTIFICATIONS

- **Oracle Agentic AI Foundations Associate (1Z0-1157-26)** — Oracle University, Sep 2026
- **Neural Networks and Deep Learning** — DeepLearning.AI, Sep 2023 (credential ZKQGVGVJGDX7)
- **Improving Deep Neural Networks: Hyperparameter Tuning** — DeepLearning.AI, Sep 2023 (credential ZLN2LZ2YZNLE)
- **AWS Academy Graduate: Cloud Semester 1** — Amazon Web Services, Jul 2023

---

## TECHNICAL SKILLS (full master list)

**Programming Languages:** Python, TypeScript, JavaScript, Java, C/C++, SQL
**Frontend:** React, Next.js, React Native, Expo, Vite, HTML5, CSS3, Tailwind CSS, React Query, Zustand, React Hook Form, GSAP, WebGL, Monaco Editor, Recharts, Apache ECharts, Web Accessibility (WCAG AA), Web Performance Optimization
**Browser APIs:** MediaRecorder, Canvas, Web Speech API, Web Crypto API, Web Workers, WebAssembly (Pyodide), IndexedDB
**Backend & APIs:** Node.js, Express.js, Fastify, FastAPI, REST APIs, Next.js Server Actions, WebSockets, Server-Sent Events, Swagger/OpenAPI, Zod, Pydantic, APScheduler
**Auth & Security:** OAuth 2.0, JWT, bcrypt, better-auth, Role-Based Access Control, Rate Limiting
**Databases & Storage:** PostgreSQL, Neon, pgvector, Oracle AI Vector Search, DynamoDB, MySQL, MongoDB, Redis, Firebase (Auth, Firestore), Neo4j, SQLite, Drizzle ORM, Prisma, SQLAlchemy
**Cloud & DevOps:** AWS (EC2, S3, Lambda, RDS, CloudFront), Oracle Cloud Infrastructure (OCI Enterprise AI Platform, OCI Enterprise AI Agents), Vercel, Render, Cloudinary, Expo EAS, Docker, CI/CD (GitHub Actions), Git, pnpm Workspaces, Turborepo, ServiceNow
**AI/ML:** PyTorch, TensorFlow/Keras, Scikit-learn, Transformers, CNNs (VGG16, InceptionV3, EfficientNetB3), Transfer Learning, Computer Vision (OpenCV), BERT, ONNX Runtime, Grad-CAM, Prompt Engineering
**LLMs & Fine-Tuning:** Qwen2.5, LLM Fine-Tuning, QLoRA, PEFT/LoRA, 4-bit Quantization (bitsandbytes), lm-evaluation-harness, Gemini API, Ollama, RAG, LangChain, LangGraph, Multi-Agent Workflows, Model Context Protocol (MCP), OpenAI Agents SDK, OpenAI Responses API, Tool Use & Function Calling, Agent Handoffs, Agent Guardrails & Safety, Embeddings & Vector Search (sentence-transformers, pgvector/HNSW), Citation Grounding & Hallucination Checks, LLM Evaluation (Recall@k, MRR, ROUGE-L, BERTScore), Structured Generation
**Data Engineering & Analytics:** Pandas, NumPy, Matplotlib, Tableau, Apache Airflow, ETL Pipelines, Data Modeling, Forecasting, Statistical Modeling, Backtesting, A/B Testing
**Security & DevSecOps:** Secrets Detection (SAST), Shannon Entropy Analysis, Git History Auditing, SARIF / GitHub Code Scanning, Application Security Auditing (IDOR, Broken Access Control, Path Traversal)
**Testing & Quality:** Vitest, pytest, Unit & Integration Testing, TypeScript strict mode, ESLint
**Systems & Architecture:** System Design, API Design, Multi-Tenant Architecture, Real-Time Systems, Caching, Fault Tolerance, Serverless Architecture, Monorepo Architecture
**MLOps & Experimentation:** Model Evaluation & Benchmarking, Inference Optimization, Experiment Tracking, Hyperparameter Tuning, Cross-Validation, Error Analysis, Data Leakage Auditing, Confidence Calibration, Uncertainty Estimation (Test-Time Augmentation), Robustness Testing, OOD Testing, Data Drift Detection, Model Cards, Hugging Face (Hub, Spaces, Inference), Gradio

---
