# Udit Agarwal — Knowledge Document
*Last updated: Sep 13 2026*

---

## PERSONAL PROFILE

- **Name:** Udit Agarwal
- **Email:** agarwaludit13@gmail.com
- **Phone:** +1 (930) 904-4901
- **Date of Birth:** May 13, 2002
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
**Attribution:** Client confidentiality — the product is not to be named on resumes at present. The underlying skills and the experience itself remain claimable.
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
**Stack:** Next.js 15 · TypeScript · Firebase Auth & Firestore · Gemini 3.5 Flash-Lite (Vercel AI SDK) · Web Speech API · Monaco Editor · Pyodide/WASM · Zod · unpdf · Vitest · GitHub Actions
**Description:** AI interview platform that runs adaptive voice interviews with a conversational interviewer that follows up on what the candidate actually said and reacts to hesitation and confidence, plus live coding rounds with in-browser code execution, company-specific interview styles, résumé-aware questions, replay, shareable reports, and progress tracking — entirely on browser-native and free-tier infrastructure.
**Bullets:**
- Cut per-interview speech costs to **$0** across **5 interview formats** by replacing paid STT/TTS services with browser-native speech recognition and synthesis, trading some accuracy and Chrome/Edge-only support for zero marginal cost per session
- Made the interviewer react to *how* candidates answer — in live Gemini runs a hesitant, filler-heavy answer dropped its confidence estimate from **50 → 20** and triggered a fundamentals probe, while a composed answer raised it to **80** and escalated difficulty — by measuring hesitation, pace, and filler density in the browser and folding grading, state updates, and next-question selection into **1 schema-validated LLM call per turn**
- Raised free AI capacity from **20 to 1,000 requests/day** and cut latency — question generation from **~8–10 s to ~2.5 s**, interview turns from **~4–7 s to ~2–2.5 s** — by moving to Gemini Flash-Lite behind a model chain that fails over to a second model with its own quota only on quota exhaustion or a retired model, with every model swappable through environment variables
- Made interviews feel like a live conversation instead of a questionnaire by pairing prompt design with deterministic guards the model can't override: a **3-turn** cap per topic, a forward-only question index, a one-question-per-turn limit, automatic stripping of scripted openers ("That's a solid plan…"), and one regeneration when a question repeats an earlier one
- Eliminated reworded duplicate questions — not just identical ones — with content-word similarity scoring, and rebuilt question generation to give every question a distinct focus and format (scenario, trade-off, debugging, past experience, design) ordered from warm-up to stretch
- Guaranteed every interview ends by enforcing a hard cap of **min(questions + 4, 12) turns** in code, overriding the model's own stopping decision rather than trusting an unbounded agent loop
- Replaced a multi-second model round trip with **~1.6 µs** of local computation when a candidate can't answer, using a deterministic "I don't know" detector validated by **58 tests** — including **14** hedged answers that must never be skipped, such as "I don't know the exact number, but I'd estimate ~50ms"
- Stopped long spoken answers from being cut off at the first pause by rebuilding capture as continuous recognition that accumulates segments across pauses and recovers from Chrome's periodic recognizer shutdowns; made failed submissions retryable (answer restored, **50 s** client timeout) and capped every model call at **45 s** so a stalled request fails cleanly
- Shipped live coding rounds with real in-browser execution for JavaScript and Python, killing infinite loops at a **5 s** (JS) / **15 s** (Python) timeout without freezing the tab, by running code in a terminable Web Worker with a lazily loaded Pyodide (WASM) runtime — trading server-grade isolation for a zero-infrastructure sandbox
- Supported **9 company interview styles** (Google, Amazon, Meta, McKinsey, BCG, and more) from a single config registry with no duplicated prompt logic; grounded questions in candidates' real projects by extracting résumé PDFs with `unpdf` and structuring them with Gemini
- Scored each interview on **5 competencies** plus STAR completeness through Zod-validated structured output, with full interview replay and revocable **128-bit** share links
- Closed a class of IDOR vulnerabilities by cutting the public Server Action surface from **19 to 9** endpoints — removing **7** that accepted caller-supplied user IDs — and cleared all **5** critical dependency advisories with a Next.js 15.5 upgrade; added sign-up ID-token verification, security headers, bounded payloads, and per-user daily rate limits on every model-backed endpoint
- Kept the progress dashboard to **173 B** of route-level JavaScript and halved its Firestore reads (**2 → 1** per load) with server-rendered SVG charts; fixed a hydration error on every dashboard load and raised secondary-text contrast from **3.6:1 to 5.7:1** to meet WCAG AA, all covered by a **172-test** Vitest suite in GitHub Actions CI

---

### SnapCast - Screen Recorder & One-Take Video Editor
**Live:** [snapcast-video-sharing.vercel.app](https://snapcast-video-sharing.vercel.app)
**Code:** [Udit013/screen_recording_sharing_app](https://github.com/Udit013/screen_recording_sharing_app)
**Stack:** Next.js 15 · React 19 · TypeScript · Neon PostgreSQL · Drizzle ORM · better-auth (Google OAuth) · Cloudinary · Gemini Flash · Whisper (transformers.js / WASM) · WebCodecs · mediabunny · Web Audio API · MediaRecorder / Canvas / Web Speech APIs · IndexedDB · Web Workers · Vitest · GitHub Actions
**Description:** Screen recorder with a one-take editor for developer demos and walkthroughs: record without rehearsing, tighten pauses and delete flubbed sentences from the transcript, then share the edit or export an MP4. Transcription, audio analysis and rendering run in the browser, alongside AI chapters, privacy-controlled sharing and analytics, all on free-tier infrastructure.
**Bullets:**
- Built a transcript-based video editor at **$0 per minute processed** by running Whisper, pause detection and MP4 rendering in the browser (Web Workers + WASM), with the server only storing a validated cut list; the editor opens in **~1.6 s** on a 10-minute recording
- Detected pauses with an adaptive loudness threshold that matched `ffmpeg silencedetect` on **8 of 8** pauses within **~60 ms**, set from each recording's own noise floor and speech level (**10th / 90th percentiles** of 20 ms frames) and refusing to cut below **10 dB** of separation
- Fixed Whisper word timestamps running **0.2–0.5 s late** and absorbing pauses ("flow." reported as **3.16–5.96 s** while the audio went silent at **3.01 s**), which left deleted sentences partly audible, by snapping word edges to measured pauses, locked in by a regression test on real model output
- Rendered edits to MP4 on the user's hardware with WebCodecs after measuring Cloudinary splicing as unusable (**26.4 s instead of 15 s**), keeping audio and video within **31 ms** at **5–7× real time**
- Kept edits non-destructive and live on share links by skipping cuts during playback, added shareable clip links and clip exports, and fixed edits being silently lost on in-app navigation by saving on unmount
- Built extension-free **1080p / 30 fps** recording with a webcam overlay, a Web Worker timer so recordings don't freeze in background tabs, and IndexedDB crash recovery that loses at most **~1 s** of footage
- Uploaded videos up to **500 MB** directly to Cloudinary via signed uploads, and generated summaries, tags and up to **8** chapters with **2** concurrent Gemini calls, and fixed AI silently failing for every video after Google retired the model in use by adding a benchmarked fallback chain, error logging and retry-on-failure
- Closed **10** cross-user access flaws from a security audit, including deletion of other users' videos and leaked email addresses, by centralizing access rules in one unit-tested module
- Shipped a custom player (keyboard seeking, chapters, picture-in-picture, deep links), timestamp comments, revocable share links (**1–30 days**) and SQL-aggregated analytics over a **10-table** schema, gated by **118** tests and CI

---

### CipherWatch - Credential Exposure Ledger
**Live:** [cipherwatch-web.vercel.app/](https://cipherwatch-web.vercel.app/)
**Code:** [Udit013/automated-secrets-scanner](https://github.com/Udit013/automated-secrets-scanner)
**Stack:** Python 3.11+ · FastAPI · SQLAlchemy 2.0 (async: aiosqlite / asyncpg) · Pydantic v2 · SQLite / PostgreSQL · GitPython · APScheduler · aiosmtplib · WebSockets · React 18 · TypeScript · React Router 7 · TanStack Query · Tailwind CSS · Vite 6 · pytest · ESLint · Docker / Docker Compose · GitHub Actions (composite action + SARIF)
**Description:** Credential exposure ledger for GitHub repositories. It detects leaked credentials in current code and git history (26 patterns + Shannon-entropy gating), collapses every copy of a credential into one record via a keyed HMAC fingerprint that never contains the secret, and tracks each one to a decision: rotated, false positive, or accepted risk with a mandatory expiry. A CLI and composite GitHub Action fail CI only on credentials not in a committed baseline and emit SARIF; the console adds per-project ledgers with triage, history-only exposure, trends, rotation links, and alerts limited to new, untriaged critical credentials. Optional private mode (access token), per-IP rate limits, and $0 hosting (Render/Vercel free tiers, SQLite or Neon Postgres).
**Status (Oct 2026):** v3.0 shipped to `main` and live (Render API `3.0.0`, Vercel console); GitHub Actions CI green on all 4 jobs, including the composite action gating the repo and uploading SARIF to code scanning. Still unverified: Render proxy hops (`TRUSTED_PROXY_HOPS=1`), SMTP delivery, private-repo scanning, and private mode / Neon on a hosted deployment.
**Bullets:**
- Detected **26 credential types** (**8 CRITICAL, 17 HIGH, 1 MEDIUM**) across **40 file extensions plus 11 extensionless credential files** (`id_rsa`, `.npmrc`, `.pypirc`, `.netrc`, …), pairing **23** format-specific regexes with Shannon-entropy gating (default **3.5 bits**) for the **3** generic patterns and **14** placeholder rules; measured **~96K lines/sec** single-threaded on v2.1 of the engine
- Turned line-level findings into a **credential ledger** by fingerprinting each value with a keyed **HMAC-SHA256** (value-scoped for format-specific keys, location-scoped for generic values and key-header markers), so one key copied across files and commits is one record whose triage decision (**4** states) persists across rescans and file moves; accepted risks require a review date within **366 days** and reopen automatically when it passes
- Built a CI gate that fails only on **new** credentials: a CLI (exit codes **0 / 1 / 2**, text / JSON / SARIF 2.1.0) and a composite GitHub Action that scans once per run, keeps its Python isolated from the caller's job, and passes inputs only through env vars (no script injection); baselines store fingerprints, never secrets, and are bound to the fingerprint key; the repo gates itself against a **45-entry** fixture baseline (local run: clean tree exit 0, injected token exit 1 with 1 SARIF result)
- Added optional private mode covering all **22** HTTP endpoints plus the WebSocket, with the token carried in `Sec-WebSocket-Protocol` so it never reaches URLs or access logs; bounded the public demo with a per-IP sliding window (**10 scans / 10 min**, `429` + `Retry-After`), **3** concurrent scans, **25** schedules, **512 KB** pastes, **100 MB / 500 MB / 50,000-member** archive limits, and a **5 MB** per-file cap, reading `X-Forwarded-For` only as far as trusted proxies allow so the limit can't be spoofed
- Found and fixed real defects by testing against PostgreSQL and real repositories: timezone-aware scheduler timestamps that Postgres rejected (schedule creation would have failed on Neon); a btree index that crashed startup on legacy rows over **~2.7 KB** (reproduced `ProgramLimitExceededError`, now skipped safely); fingerprints that changed every scan because of temp-dir and zipball paths; key files (`.pem`, `id_rsa`, `.npmrc`) never scanned while `.venv` was (**2,392 → 89** files on this repo); a demo seeder that would mix sample data into workspaces with **1–7** scans
- Kept every change verified with **130 backend tests + 19 legacy tests**, passing on SQLite, **PostgreSQL 18**, and Python **3.11** (CI's version, run in Docker), plus zero-warning ESLint, `tsc`, and production builds in a **4-job** GitHub Actions pipeline; `pip-audit` and runtime `npm audit` report **0** known vulnerabilities
- Shipped a redesigned console: landing page, overview of deduplicated open exposure, projects sorted by urgency, a per-project ledger with triage, filters, trend, and **19** provider rotation links across **12** providers; loading / empty / error states throughout, keyboard access, colour-independent severity, and layouts checked at **375 px**; production JS is **~385 KB (~121 KB gzipped)** across **3** chunks, after an earlier rewrite replaced chart and icon libraries with hand-built SVG (v2: **733 → 321 KB**)
- Delivered at **$0** ongoing cost: SQLite or a free Neon Postgres, Render and Vercel free tiers, GitHub Actions, and an optional SMTP account; a non-root Docker image and a Compose stack (Postgres 16 + API + nginx with WebSocket proxying) verified end to end
**Remaining limitations:** single-tenant (one shared token, no user accounts); in-process rate limits, scheduler, and WebSocket registry (one instance); additive startup migrations rather than Alembic; case-sensitive project names; history clones depth-limited (default 100 commits) and don't use `GITHUB_TOKEN`, so private-repo history is unsupported; 7 build-time `npm audit` advisories pending a Tailwind 4 migration.
---

### NeuroClass - Brain Tumor MRI Classifier (IEEE 2024)
**Live:** https://huggingface.co/spaces/Udit013/brain-tumor-mri-classifier
**Model:** https://huggingface.co/Udit013/brain-tumor-efficientnetb3
**Code:** https://github.com/Udit013/Brain_Tumor_Classificatioin
**Publication:** [Identifying Various Types of Brain Tumors using Deep Neural Network based Image Features](https://doi.org/10.1109/ICC-ROBINS60238.2024.10533941), ICC-ROBINS 2024, IEEE (co-author)
**Stack:** Python · TensorFlow/Keras · EfficientNetB3 · ONNX Runtime · OpenCV · scikit-learn · Gradio · FastAPI · Docker · Hugging Face Hub & Spaces · pytest · GitHub Actions
**Description:** Production extension of an IEEE-published brain-tumor MRI classifier. Beyond reproducing the original four-architecture benchmark, it adds the evaluation and deployment work that turns a high-accuracy notebook into a served, trustworthy system: leakage auditing, out-of-distribution testing, calibration, uncertainty, robustness, explainability, and a live web app.
**Bullets:**
- Co-authored an IEEE ICC-ROBINS 2024 paper benchmarking **4** CNN architectures (custom CNN, VGG16, InceptionV3, EfficientNetB3) for 4-class brain-tumor MRI classification on a **7,023-image** dataset, where EfficientNetB3 posted the top reported accuracy (**99.844%**) with **11.7M** parameters — **38%** fewer than the next-smallest model (VGG16, 18.9M)
- Exposed train/test leakage inflating the published benchmark, as measured by **95.9%** accuracy on test images with a near-duplicate in training vs **85.7%** on novel ones (**44.6%** near-duplicates and **114** exact pixel duplicates across a **1,600**-image test set), by building a perceptual- and content-hash audit over all **8.96M** train/test image pairs — reported as a lower bound, since the multi-source dataset carries no patient IDs
- Retrained and redeployed the live classifier, raising test accuracy from **90.25% to 93.44%**, novel-image accuracy from **85.7% to 89.4%**, glioma recall from **64.3% to 79.5%**, and accuracy under 30 image corruptions from **67.3% to 90.7%** (paired McNemar p = 1.4e-6), by building a leakage-safe validation split (union-find over near-duplicate clusters, zero pairs straddling it) and a two-stage EfficientNet fine-tune with noise augmentation that trains in **21.5 minutes** on a laptop CPU, then promoting it through a checksum-verified candidate branch and smoke tests with a tagged one-step rollback
- Replaced a single headline number with a defensible evaluation, as measured by the deployed model's **93.44%** accuracy and **0.993** macro ROC-AUC in-distribution (**89.4%** on scans with no near-duplicate in training) plus an honest **72.7%** on a separate **253**-image external MRI dataset, by re-implementing the published notebook as a tested Python package with exact recipe parity, per-class precision/recall/F1, confusion matrices, ROC/PR curves, and a tumor-vs-no-tumor evaluation for the external set — all measured on the exact preprocessing and CPU computation users are served
- Found and fixed three silent correctness bugs that each changed reported accuracy, by isolating one variable at a time: a **tensorflow-metal graph-mode defect** (93.81% on Metal vs 90.25% on CPU for identical weights; eager mode matched; fixed by disabling grappler's meta-optimizer), a **train/serve resize skew** (nearest-neighbour vs bicubic, 1 point of accuracy), and a **Keras EfficientNet quirk** that silently dropped an input-scaling layer at serving time (95.0% → 86.7%), folded into the normalization layer as an exact identity
- Made confidence scores trustworthy enough to act on, as measured by expected calibration error cut from **0.188 to 0.022** with the retrained model (and to **0.068** for the original via temperature scaling) and predictive entropy **7×** higher on wrong predictions than correct ones (**0.78** vs **0.11**, n=200), by fitting temperatures on held-out data and adding **6**-view test-time augmentation that flags unstable predictions in plain language
- Pinpointed the original model's critical failure modes, as measured by accuracy across **30** corruption conditions (6 types × 5 severities; **90.25%** clean → **67.3%** mean, near-chance under Gaussian noise) and a glioma recall of **64.2%** (**33** of 400 gliomas called "no tumor"), by building robustness and per-class error benchmarks that directly shaped the retraining recipe
- Deployed a live web app delivering **2.3×** lower CPU latency than the Keras model (**78 → 34.5 ms**), by exporting to ONNX Runtime and serving predictions with calibrated confidence, a stability indicator, and Grad-CAM heatmaps through Gradio on Hugging Face Spaces, with the model versioned on the Hugging Face Hub and any revision servable by configuration
- Shipped the model as a containerized FastAPI service (non-root, Docker healthcheck, **715 MB** compressed image) that answered **12** concurrent predictions in **1.4 s** while health checks stayed under **45 ms**, and returns 503 with the cause instead of crash-looping when weights are missing, verified end to end against the model's offline predictions
- Kept every result reproducible and the serving layer reliable, as measured by a **10**-stage one-command reproduction pipeline, README results tables generated only from measured run outputs, and **65** pytest tests plus linting gating GitHub Actions CI, by also fixing a FastAPI bug that failed every `/predict` request, returning 503 instead of crashing when the model can't load, and capping uploads at **10 MB**

**Resume (2 bullets):**
- Co-authored an IEEE ICC-ROBINS 2024 paper on brain tumor MRI classification, then audited it by comparing 8.96M train/test image pairs with perceptual hashing, exposing leakage (95.9% vs 85.7% accuracy on near-duplicate vs novel scans) and three silent bugs, including a TensorFlow-Metal graph-mode defect that inflated accuracy by 3.6 points
- Retrained and redeployed the model on Hugging Face Spaces (ONNX Runtime) and a Docker/FastAPI service, raising accuracy from 90.3% to 93.4% (89.4% on novel scans), glioma recall from 64% to 80%, and accuracy under image corruption from 67% to 91% (McNemar p < 1e-5), using a leakage-safe validation split, a 22-minute CPU fine-tune, and 65 pytest tests in CI

---

### RxFlow - Multi-Tenant Pharmacy ERP
**Live:** https://rx-flow-web.vercel.app
**Code:** https://github.com/Udit013/RxFlow
**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · Fastify 5 · Prisma 7 · PostgreSQL (Neon) · pnpm + Turborepo · Server-Sent Events · React Query · Zustand · Zod · React Hook Form · Recharts · JWT + httpOnly cookie sessions · bcrypt · Web Crypto · Intl API · jsPDF · SheetJS · openFDA · Health Canada DPD · NLM RxNorm · Vitest · GitHub Actions · Dependabot
**Description:** India-first, globally configurable multi-tenant pharmacy ERP — inventory, tax-compliant billing, procurement, accounting, and payroll in one platform, with real-time sync, role-based access, and transactionally consistent operations, deployed entirely on free-tier infrastructure. Built to replace legacy tools like Marg and Tally; country-specific tax, formats, and regulation come from configurable regional profiles rather than code.
**Bullets:**
- Delivered a full-stack multi-tenant pharmacy ERP covering inventory, billing, procurement, accounting, HR, and payroll, spanning 135 API routes across 22 modules and 38 Prisma models, by architecting a pnpm/Turborepo monorepo (Fastify API, Next.js 16 web app, shared Prisma, types, and regional packages) where every signup provisions an isolated tenant and every query is tenant-scoped from the JWT
- Made the platform adaptable to any country without code changes — 6 regional profiles (India, US, Canada, UK, UAE, international) and 4 pluggable tax engines (India GST, VAT, US sales tax, none) — by moving currency, locale, timezone, fiscal year, tax-ID/postal validation, drug-classification labels, controlled-drug registers, and payment methods into a shared dependency-free package, while keeping India's behaviour and GSTR filing data unchanged
- Automated Indian GST compliance end to end, generating GSTR-1 (B2B/B2C, credit/debit notes, HSN summary) and GSTR-3B plus sales/purchase and Schedule H1 registers with Excel/CSV export, by building a line-item tax engine that routes CGST+SGST vs IGST by state, carries bill-level special discounts and transport charges into the invoice, makes invoicing idempotent per order, and rejects overpayments
- Closed a critical cross-tenant data-exposure path and enforced least-privilege access across 126 authenticated routes, by signing refresh tokens with a separate key and rejecting any replayed as access tokens (an undefined tenant ID silently dropped Prisma's tenant filter), validating every client-supplied store/customer/supplier/batch ID against the caller's tenant, and enforcing one shared role matrix (8 roles) in the API and the navigation
- Moved sessions out of `localStorage` by issuing rotating refresh tokens as httpOnly, SameSite=Strict cookies through a same-origin auth proxy, with per-device sessions and SHA-256 token hashes — after finding that bcrypt's 72-byte input limit made every refresh token of a user interchangeable, so rotation and logout had never revoked old tokens
- Kept stock and ledgers consistent under concurrent billing by wrapping inventory, ledger, and financial writes in single Prisma transactions, re-asserting the stock floor inside the decrement to stop overselling, and replacing count-based document numbering (which failed permanently after a deleted parked sale) with max-sequence numbering plus unique-constraint retry
- Kept every open counter in sync without polling via tenant-scoped Server-Sent Events pub/sub (25s heartbeat) wired into the audit layer, so each mutation writes an audit log and invalidates the exact React Query caches on every connected client — after fixing a raw-header bug that had silently blocked the cross-origin stream in production
- Built a multi-country medicine database of 2,257 products from official open data (U.S. FDA NDC Directory via openFDA, Health Canada Drug Product Database), with every ingredient verified against NLM RxNorm and 93.7% classified by ATC therapeutic group, by writing a reproducible import pipeline that normalises regional drug names to WHO INNs, separates salts, canonicalises strengths, and fails the build on any route/form contradiction (catching a nebuliser solution labelled as a syrup) — powering search by brand, ingredient, strength, form, or therapeutic use, and an alternatives view that groups same-composition products, variants, combinations, and similar-use drugs with every difference spelled out and none presented as interchangeable
- Replaced line-by-line manual entry of distributor invoices with a file upload, verified on real invoices from 5 distributors, by designing a plugin CSV-import pipeline — per-distributor column-map configs scored by a shared auto-detector (≥0.6 confidence, HSN-plausibility tiebreak), then fuzzy-matched to a per-market catalog via a barcode → exact → alias → fuzzy-name → generic cascade
- Cut API cold-start boot time 3.3× (1.75s → 0.52s measured locally) and per-query latency from ~0.6–1.0s to ~0.2s by launching tsx directly instead of through pnpm, precomputing a boot-time bcrypt hash, loading the medicine matcher in the background, and moving the API into the same AWS region as the database; and cut export-heavy pages' first-load JS by ~29% (318 → 226 kB) by lazy-loading SheetJS and jsPDF
- Protected tenant data exports with client-side encrypted backup/restore using AES-256-GCM and PBKDF2-SHA256 key derivation (200K iterations) via the Web Crypto API, so backup files are unreadable without the user's passphrase
- Built operations and HR modules — accounts payable/receivable, expense and income tracking, P&L, cash-flow, attendance, and payroll — where loss-of-pay is prorated from attendance status and paid payslips post automatically as expenses into the P&L; dashboards and reports compute "today" and months in each pharmacy's own timezone
- Shipped a responsive, accessible UI — mobile drawer navigation, horizontally scrollable tables, skip link and ARIA labelling, a server-rendered splash screen, and an app shell in English, Hindi, and Spanish — and deployed on $0 free-tier infrastructure (Vercel, Render, Neon) with a scripted, fatal-on-error idempotent migration step, a runtime database-connection gate that keeps the previous release live on failure, and a keep-warm schedule — after discovering the deploy's schema sync had been planning to drop all 36 tables on every release and making it refuse destructive changes
- Grew automated coverage from 32 to 131 Vitest tests (tax engines, timezone and daylight-saving boundaries, role matrix, copy-on-write catalog, drug-composition matching, session signing and hashing, CSV parsers) gated by GitHub Actions CI with a dependency-audit step, and validated releases with an 80-check end-to-end API suite against a throwaway Postgres plus browser walkthroughs — which caught an API crash on boot and a hooks-order crash on the invoice page that type-checking and unit tests had missed

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

## CERTIFICATIONS

### Featured Certifications

| Credential | Issuer | Date | Verification |
|---|---|---|---|
| **Oracle Certified Foundations Associate - Agentic AI** | Oracle University | Sep 20, 2026 | [Verify](https://catalog-education.oracle.com/pls/certview/sharebadge?id=2DF428C813E7A33DA925DB9E030385DA4FB6699D7109218C35E27AA01AEBF489) |
| **Neural Networks and Deep Learning** | DeepLearning.AI / Coursera | Sep 10, 2023 | [Verify](https://coursera.org/verify/ZKQGVGVJGDX7) |
| **Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization** | DeepLearning.AI / Coursera | Sep 13, 2023 | [Verify](https://coursera.org/verify/ZLN2LZ2YZNLE) |
| **AWS Academy Graduate - AWS Academy Introduction to Cloud, Semester 1** | AWS Academy | Jul 8, 2023 | [Verify](https://credly.com/go/y7D2u8ge) |

### Additional Certifications & Courses

| Credential | Issuer | Date |
|---|---|---|
| Introduction to SQL | DataCamp | Aug 31, 2025 |
| Joining Data in SQL | DataCamp | Sep 8, 2025 |
| Introduction to Snowflake | DataCamp | Sep 25, 2025 |
| NoSQL Concepts | DataCamp | Oct 6, 2025 |
| Introduction to Neo4j | LinkedIn Learning | Oct 27, 2025 |
| Introduction to Cassandra | LinkedIn Learning | Nov 10, 2025 |
| React (Basic) | HackerRank | Jun 11, 2023 |
| Problem Solving (Intermediate) | HackerRank | Sep 10, 2022 |
| Problem Solving (Basic) | HackerRank | Sep 10, 2022 |

---

## WORK AUTHORIZATION

- **Current status:** F-1 OPT. EAD valid through **7 June 2027**.
- **Extension:** eligible for the 24-month STEM OPT extension, which he intends to apply
  for. Approved, that adds two years on top of the current EAD.
- **Net effect:** authorized to work in the US now, and for approximately three years
  total across OPT plus STEM OPT, without requiring H-1B or any other employer
  sponsorship during that period.
- **After that window:** continued employment would require sponsorship.
- **Outside the US:** no independent right to work in any other country except India. Any non-US role would require sponsorship.

