/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { CaseStudyKey } from './utils/portfolioLogic';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ResumeModal } from './components/ResumeModal';

const HERO_BG_URL = '/assets/aistudio/image_9e64342e.png';

const ABOUT_BEACH_LOCAL = '/assets/aistudio/image_b9a0e565.png';
const LINKEDIN_URL = 'https://www.linkedin.com/in/krishna9003762619murthi/';
const GITHUB_URL = 'https://github.com/krishnamurthi-ramesh';

const PM_MARQUEE_ITEMS = [
  'Associate Product Manager (APM)',
  'AI Product Management',
  'Product Strategy & Roadmapping',
  'PRD & Spec Authoring',
  'User Research & JTBD',
  'Funnel & Conversion Optimization',
  'RICE & Kano Prioritization',
  'A/B Testing & Experimentation',
  'North Star Metrics & OKRs',
  'Go-To-Market (GTM) Execution',
  'Cross-Functional Leadership',
  'Product Teardowns & Diagnostics',
];

interface ProjectWorkItem {
  id: CaseStudyKey;
  tag: string;
  badge: string;
  category: 'teardowns' | 'productBuilds' | 'systems';
  thumbnailUrl: string;
  title: string;
  subtitle: string;
  problem: string;
  judgmentCalls: string;
  outcome: string;
  techTags: string[];
  standaloneUrl: string;
  pdfUrl?: string;
  githubUrl?: string;
  prototypeUrl?: string;
}

const PROJECTS_WORK: ProjectWorkItem[] = [
  {
    id: 'openai',
    tag: 'AI PRODUCT MANAGEMENT CASE STUDY',
    badge: 'OPENAI IN-HOUSE DATA AGENT',
    category: 'teardowns',
    thumbnailUrl: '/assets/thumbnails/thumb-openai.jpg',
    title: 'Inside OpenAI’s In-House Data Agent: Context-First Architecture Across 70,000 Datasets',
    subtitle: 'Architectural teardown of how layered context pipelines and golden question eval harnesses turn natural language into trusted SQL insights across 3,500+ employees.',
    problem:
      'Raw LLM schemas fail in enterprise production because real table semantics live in codebase transformation pipelines (dbt/Airflow), Slack discussions, and human tribal knowledge, not static column names.',
    judgmentCalls:
      'Analyzed the 6-layer context pipeline (Git codebase crawling, Slack/Docs institutional memory, pass-through RBAC). Diagnosed their static 200+ golden question evaluation harness and tool consolidation.',
    outcome:
      'Achieved 17× query speedup through conversational memory caching; replaced fragile multi-agent tool fragmentation with unified goal-guided execution across 600 PB.',
    techTags: ['Autonomous Agents', 'Context Engineering', 'Evaluation Harness', 'Golden Questions', 'Pass-Through RBAC', 'SQL Verification'],
    standaloneUrl: '/teardowns/openai-data-agent.html',
    pdfUrl: '/teardowns/openai-data-agent-case-study.pdf',
  },
  {
    id: 'notion',
    tag: 'AI PRICING & ROUTING TEARDOWN',
    badge: 'NOTION AGENTS',
    category: 'teardowns',
    thumbnailUrl: '/assets/thumbnails/thumb-notion.jpg',
    title: 'Notion Agents: Rebuilt to Do More for Less — Pricing, Routing & Cost Control',
    subtitle: 'Deconstructing dynamic model routing, credit currency economics, and runaway cost risks on long-running autonomous AI agents.',
    problem:
      'Autonomous agents with multi-step tool calls create unpredictable compute bills. Fixed-seat SaaS pricing breaks when unattended 24-hour agent runs consume unbounded frontier LLM tokens.',
    judgmentCalls:
      'Evaluated Notion’s 3-tier task rate card (5/10/20 credits) and model degradation strategy (Claude 3.5 Sonnet to Haiku/GPT-4o mini). Diagnosed the critical vulnerability of agent-level pause controls and proposed run-level budget envelopes.',
    outcome:
      'Formulated a robust unit-economics model: pre-flight token estimations, run-level budget envelopes, and transparent routing telemetry to ensure autonomous work is financeable.',
    techTags: ['Agent Unit Economics', 'Dynamic Model Routing', 'Credit Pricing', 'Runaway Cost Control', 'Claude 3.5 Sonnet', 'SaaS Packaging'],
    standaloneUrl: '/teardowns/notion-agents.html',
    pdfUrl: '/teardowns/notion-agents-teardown.pdf',
  },
  {
    id: 'comet',
    tag: 'E-COMMERCE AI DISCOVERY',
    badge: 'COMET AI SEARCH',
    category: 'teardowns',
    thumbnailUrl: '/assets/thumbnails/thumb-comet.jpg',
    title: 'Comet (E-commerce AI Search) — Teardown & Friction Analysis',
    subtitle: 'Reverse-engineering Comet’s conversational AI "Finder" discovery flow to diagnose drop-off friction between recommendation generation and PDP conversion.',
    problem:
      'Comet\'s conversational AI "Finder" suffered from stateless amnesia: refining a size or fit requirement wiped previous preferences, triggering a 42% drop-off before shoppers ever reached the Product Detail Page.',
    judgmentCalls:
      'Proposed a context-aware conversational memory solution to carry size/fit parameters across sessions to reduce cart abandonment, defining "Finder-assisted add-to-cart rate" as the validation metric.',
    outcome:
      'Projected +22% conversion lift and eliminated repetitive filter resets, bridging open-ended natural language directly into high-intent purchase checkout funnels.',
    techTags: ['Product Discovery', 'Friction Analysis', 'Figma', 'Prompt Engineering', 'Conversion Metrics', 'E-Commerce Funnels'],
    standaloneUrl: '/teardowns/comet.html',
    prototypeUrl: 'https://relay-define-38337038.figma.site/',
  },
  {
    id: 'lending',
    tag: 'FINTECH COMPARATIVE TEARDOWN',
    badge: 'KREDITBEE × PHONEPE',
    category: 'teardowns',
    thumbnailUrl: '/assets/thumbnails/thumb-lending.jpg',
    title: 'KreditBee & PhonePe Lending — Same Category, Two Failure Modes',
    subtitle: 'Diagnosing structurally distinct friction points across two live digital lending funnels: document-upload bottleneck vs. marketplace trust-continuity break.',
    problem:
      'Digital lending funnels leak users at different stages: KreditBee suffered from asynchronous document-upload OCR failures, while PhonePe suffered from marketplace trust-continuity breaks during external NBFC handoffs.',
    judgmentCalls:
      'Proposed conversational AI-agent solutions — real-time document quality feedback and cross-partner context carry-over — each paired with primary/secondary validation metrics.',
    outcome:
      'Targeted a 24% lift in first-session KYC completion and a 35% reduction in partner handoff drop-off with unified in-app verification continuity.',
    techTags: ['Funnel Optimization', 'KYC & OCR', 'AARRR Funnel', 'Fintech UX', 'User Friction', 'Disbursal Velocity'],
    standaloneUrl: '/teardowns/lending-funnels.html',
    prototypeUrl: 'https://option-delete-93793571.figma.site/',
  },
  {
    id: 'flowlens',
    tag: 'PM PROTOTYPE • AGENTIC SAAS',
    badge: 'SHOPIFY FLOWLENS',
    category: 'productBuilds',
    thumbnailUrl: '/assets/thumbnails/thumb-flowlens.jpg',
    title: 'Shopify FlowLens — AST Safety Validator & Dry-Run Sandbox',
    subtitle: 'Pre-flight safety gatekeeper catching silent logic regressions, infinite loops, and unauthenticated API calls before AI-generated workflows execute in production.',
    problem:
      'While Shopify Sidekick Qwen-32B generates Flow workflows rapidly, merchant trust anxiety around silent logic breaks created a -35% activation gap before live execution.',
    judgmentCalls:
      'Built a zero-mutation client-side AST linting engine (<100ms parse across 5 strict safety rules), interactive dry-run payload sandbox, and Human-in-the-Loop approval gate.',
    outcome:
      '100% deterministic AST rule coverage across 5 critical safety checks with <100ms validation latency, zero live store mutations, and downloadable Markdown audit reports.',
    techTags: ['AI Safety & HITL', 'React 18', 'TypeScript', 'AST Static Analysis', 'Dry-Run Sandbox', 'PRD & Metrics'],
    standaloneUrl: '/projects/shopify-flow-lens.html',
    prototypeUrl: 'https://shopify-flowlens.vercel.app',
    githubUrl: 'https://github.com/krishnamurthi-ramesh/Shopify-Flow-Lens',
  },
  {
    id: 'costoptimizer',
    tag: 'AI UNIT ECONOMICS • FINOPS',
    badge: 'AI COST OPTIMIZER',
    category: 'productBuilds',
    thumbnailUrl: '/assets/thumbnails/thumb-cost-optimizer.jpg',
    title: 'AI Cost Optimizer — Semantic Cache & Cascading SLM Router',
    subtitle: 'Unit-economics simulator and cascading model router built to protect B2B SaaS gross margins against unthrottled frontier LLM spend.',
    problem:
      'Routing 100% of queries directly to frontier LLMs creates an unsustainable $137,116/mo COGS burden at 100k DAU, compressing SaaS gross margins to 54.3%.',
    judgmentCalls:
      'Designed a semantic similarity cache paired with a 60/40 SLM-vs-frontier complexity router and live margin-simulation levers to enforce cost-SLA guardrails.',
    outcome:
      'Projected -$91,564/mo savings (-66.8% COGS from $137,116 to $45,553/mo), +30.5% gross margin expansion (84.8%), 1.20s P95 latency (57.1% faster), and 99.2% quality retention.',
    techTags: ['LLM Unit Economics', 'Semantic Caching', 'Cascading Routing', 'COGS Modeling', 'React + TypeScript', 'SLA Guardrails'],
    standaloneUrl: '/projects/ai-cost-optimizer.html',
    prototypeUrl: 'https://ai-cost-optimizer-iota.vercel.app',
    githubUrl: 'https://github.com/krishnamurthi-ramesh/AI-Cost-Optimizer',
  },
  {
    id: 'studytube',
    tag: '0→1 CONSUMER EXTENSION • EDTECH',
    badge: 'STUDYTUBE CHROME MV3',
    category: 'productBuilds',
    thumbnailUrl: '/assets/thumbnails/thumb-studytube.jpg',
    title: 'StudyTube — Intent-Driven Bandwidth & Quality Governor',
    subtitle: 'Zero-dependency Chrome MV3 extension rescuing mobile-hotspot learners from silent 1080p bitrate drain via 4 subject-aware quality modes.',
    problem:
      '350M+ students learning on 1.5–2.0 GB/day mobile hotspots burn data in under 45 minutes when default players silently stream 1080p audio-heavy lectures.',
    judgmentCalls:
      'Shipped a 26.13 KB MV3 extension with 4 subject modes (Talk 480p, Board 720p, Code HD, Audio 144p), a Triple-Layer Player Quality Engine (<80ms fallback), and zero-PII W3C telemetry.',
    outcome:
      'Verified in dogfooding: 4,548.7 MB (4.55 GB) saved vs. 2,649.1 MB streamed (63.2% avg savings, 91.0% peak across a 3.5h AI PM course) at <0.2% CPU overhead.',
    techTags: ['0→1 Product Build', 'Chrome MV3', 'W3C PerformanceObserver', 'SDLC Strategy', 'EdTech Access', 'JavaScript'],
    standaloneUrl: '/projects/study-tube.html',
    githubUrl: 'https://github.com/krishnamurthi-ramesh/Study-Tube',
  },
  {
    id: 'vlm',
    tag: 'RESEARCH PROJECT',
    badge: 'IEEE RESEARCH PAPER',
    category: 'systems',
    thumbnailUrl: '/assets/thumbnails/thumb-vlm.jpg',
    title: 'Hardware-Aware Safety & Conformal Control for Edge Vision-Language Models',
    subtitle: 'Non-parametric density-drift estimators (ppDRE) and two-tier student/teacher inference cascade with formal conformal prediction thresholds on edge hardware.',
    problem:
      'Quantized multimodal models deployed on resource-constrained robotics and edge cameras suffer from catastrophic distribution shift and out-of-distribution hallucinations under varying environmental conditions.',
    judgmentCalls:
      'Formulated an active density-ratio estimation metric (ppDRE) to flag low-confidence frames pre-inference. Designed a two-tier GPU-student / CPU-teacher inference cascade with statistical conformal prediction guarantees.',
    outcome:
      'Achieved 94.2% structural defect precision on edge hardware, cutting cloud token compute spend by ~60% while maintaining formal statistical coverage bounds.',
    techTags: ['Conformal Prediction', 'Vision-Language Models', 'Density Ratio Estimation', 'Edge AI', 'Statistical Safety', 'IEEE Review'],
    standaloneUrl: '/projects/active-conformal-control.html',
    githubUrl: 'https://github.com/krishnamurthi-ramesh/Active-Conformal-Control-Navigating-Density-Chasms-in-Quantized-Vision-Language-Systems',
  },
];

const EXPERIENCES = [
  {
    period: '2025–2027',
    logoUrl: '/assets/logos/iimv.png',
    role: 'PGPMCI Candidate & CPAC Student Representative',
    institution: 'Indian Institute of Management Visakhapatnam',
    description:
      'Pursuing the Post-Graduate Program in Management (PGPMCI). Elected Student Representative on CPAC for the 60-student cohort while shipping AI product teardowns, live validation prototypes, and unit-economics models.',
  },
  {
    period: 'Jan 2026–Jul 2026',
    logoUrl: '/assets/logos/iiitdmk.png',
    role: 'Research Intern — Classical Epistemology',
    institution: 'IIITDM Kurnool • Kurnool, India',
    description:
      '“Nyaya Shastra for Computer Science Engineers”: Applied classical Indian Nyaya dialectical reasoning and epistemology to modern computer science algorithms and formal system verification.',
  },
  {
    period: 'Apr 2025–Jul 2025',
    logoUrl: '/assets/logos/meraqui.png',
    role: 'Data Science Intern',
    institution: 'Meraqui Ventures Pvt. Ltd. (karam.ai) • Pune, India',
    description:
      'Owned the requirements-to-shipping loop for candidate matching feature (+15% precision lift). Shadowed recruiters to replace conversational bot with deterministic REST API contracts for ERP sync, saving 15 recruiter hours weekly and cutting data inconsistencies by 12–15%.',
  },
  {
    period: 'Jun 2024–Aug 2024',
    logoUrl: '/assets/logos/treacle.png',
    role: 'Development Engineering Intern',
    institution: 'Treacle Technologies (Incubated at IIT Kanpur) • Kanpur, India',
    description:
      'Specified and built monitoring dashboards (Grafana, Elasticsearch) that cut incident detection time by 40%. Scaled real-time data pipelines processing 100k+ logs/day with custom evaluation metrics and automated Docker workflows.',
  },
  {
    period: '2022–2026',
    logoUrl: '/assets/logos/iiitdmk.png',
    role: 'B.Tech, Computer Science & Engineering',
    institution: 'IIITDM Kurnool • Kurnool, India',
    description:
      'Rigorous engineering foundation spanning Distributed Systems, Deep Learning, Computer Vision, Algorithms, and formal verification. Active contributor to open-source systems.',
  },
];

const PRODUCT_EXECUTION_LOOP = [
  {
    step: 'STAGE 01',
    phase: 'Diagnose & Shadow',
    subtitle: 'Problem Discovery',
    desc: 'Observe real operator and consumer workflows to isolate the exact moment where intent drops off—before proposing a single feature.',
    deliverables: ['User Shadowing', 'Funnel Diagnostics', 'Root-Cause Mapping'],
    rule: 'Separate UX friction and trust deficits from technical bugs.',
  },
  {
    step: 'STAGE 02',
    phase: 'Frame & Scope',
    subtitle: 'Strategy & PRDs',
    desc: 'Write crisp 1-page specs with explicit non-goals, strict SLA boundaries, and unit-economic guardrails so teams build only what moves the needle.',
    deliverables: ['1-Page PRDs', 'Impact × Effort Bets', 'Success Guardrails'],
    rule: 'Every feature must justify its complexity against one North Star.',
  },
  {
    step: 'STAGE 03',
    phase: 'Prototype & Validate',
    subtitle: 'AI-Native Execution',
    desc: 'Spin up working prototypes and statistical evaluation harnesses early—stress-testing accuracy, latency, and failure modes on real data.',
    deliverables: ['Interactive Flows', 'LLM Eval Suites', 'Schema Contracts'],
    rule: 'Test probabilistic AI behavior with deterministic metrics pre-launch.',
  },
  {
    step: 'STAGE 04',
    phase: 'Instrument & Compound',
    subtitle: 'Growth & Telemetry',
    desc: 'Track cohort conversion, P99 latency, and cost-per-task post-launch, turning production telemetry directly into the next roadmap bet.',
    deliverables: ['Cohort Readouts', 'A/B Experiments', 'Telemetry Alerts'],
    rule: 'Shipping is the starting line; sustained adoption is the verdict.',
  },
];

const CAPABILITY_DOMAINS = [
  {
    category: 'Product Discovery & Strategy',
    icon: 'explore',
    items: [
      'User Interviews & Shadowing',
      '1-Page PRDs & Specs',
      'Funnel Teardowns',
      'Roadmap Prioritization',
      'Opportunity Mapping',
      'Figma Prototyping',
    ],
  },
  {
    category: 'Growth, Data & Experimentation',
    icon: 'monitoring',
    items: [
      'SQL & Cohort Analysis',
      'Mixpanel',
      'Tableau',
      'A/B Testing & Readouts',
      'North Star OKRs',
      'SaaS Unit Economics',
    ],
  },
  {
    category: 'AI Product & Eval Harnesses',
    icon: 'psychology',
    items: [
      'RAG System Design',
      'Ragas Eval Harness',
      'Gemini & Claude APIs',
      'FAISS & Ollama',
      'Conformal Safety Bounds',
      'Prompt & Context Architecture',
    ],
  },
  {
    category: 'Systems & Technical Fluency',
    icon: 'terminal',
    items: [
      'Python & TypeScript',
      'FastAPI & REST Contracts',
      'Pydantic Validation',
      'PostgreSQL',
      'Kafka & Grafana',
      'Docker Workflows',
    ],
  },
];

const PM_OPERATING_PRINCIPLES = [
  {
    tag: 'PRINCIPLE I',
    title: 'Fix the trust break before adding features',
    body: 'Most funnel drop-offs happen when users feel uncertain—during KYC uploads, opaque AI answers, or partner handoffs—not because a product lacks another button.',
  },
  {
    tag: 'PRINCIPLE II',
    title: 'Deterministic contracts around probabilistic AI',
    body: 'Use LLMs where synthesis and natural language unlock 10× leverage, but wrap them in strict schemas, citation checks, and fallback thresholds for production reliability.',
  },
  {
    tag: 'PRINCIPLE III',
    title: 'Evaluation harnesses are the new PRD',
    body: 'In AI products, a written spec is incomplete without a quantitative eval dataset measuring faithfulness, P99 latency, and token cost per completed user job.',
  },
];

const HERO_ROTATING_WORDS = [
  'roadmaps.',
  'experiments.',
  'shipped product.',
  'clear decisions.',
] as const;

export default function App() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudyKey | null>(
    null
  );
  const [activeFilter, setActiveFilter] = useState<'all' | 'teardowns' | 'productBuilds' | 'systems'>('all');
  const [showCopyToast, setShowCopyToast] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [heroWordIndex, setHeroWordIndex] = useState(0);

  // Hash listener for direct teardown & project links (#openai, #notion, #comet, #lending, #flowlens, #costoptimizer, #studytube, #vlm)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'openai' || hash === 'teardown-openai') setActiveCaseStudy('openai');
      else if (hash === 'notion' || hash === 'teardown-notion') setActiveCaseStudy('notion');
      else if (hash === 'comet' || hash === 'teardown-comet') setActiveCaseStudy('comet');
      else if (hash === 'lending' || hash === 'teardown-lending') setActiveCaseStudy('lending');
      else if (hash === 'flowlens' || hash === 'shopify-flow-lens') setActiveCaseStudy('flowlens');
      else if (hash === 'costoptimizer' || hash === 'ai-cost-optimizer') setActiveCaseStudy('costoptimizer');
      else if (hash === 'studytube' || hash === 'study-tube') setActiveCaseStudy('studytube');
      else if (hash === 'evalharness' || hash === 'eval-harness') setActiveCaseStudy('evalharness');
      else if (hash === 'vlm' || hash === 'active-conformal-control') setActiveCaseStudy('vlm');
      else if (hash === 'karam' || hash === 'meraqui-karam') setActiveCaseStudy('karam');
      else if (hash === 'treacle' || hash === 'treacle-technologies') setActiveCaseStudy('treacle');
      else if (hash) {
        requestAnimationFrame(() => {
          const targetEl = document.getElementById(hash);
          if (targetEl) {
            targetEl.classList.add('is-revealed');
            targetEl.querySelectorAll('.reveal-scale, .reveal-glow, .reveal-on-scroll').forEach((child) => {
              child.classList.add('is-revealed');
            });
            targetEl.scrollIntoView({ behavior: 'auto' });
          }
        });
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Active section tracking for fixed navbar
  const [activeSection, setActiveSection] = useState<string>('home');
  const activeSectionRef = useRef<string>('home');

  // Zero-re-render GPU Refs for Reading Progress, 4-Layer Hero Parallax & Custom See-Through Cursor
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const parallaxBgRef = useRef<HTMLDivElement | null>(null);
  const parallaxMidRef = useRef<HTMLDivElement | null>(null);
  const parallaxTextRef = useRef<HTMLDivElement | null>(null);
  const parallaxRightColRef = useRef<HTMLDivElement | null>(null);
  const mouseOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const cursorLensRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setHeroWordIndex((prev) => (prev + 1) % HERO_ROTATING_WORDS.length);
    }, 2300);
    return () => window.clearInterval(intervalId);
  }, []);

  // Custom Rounded Dart Pointer Cursor (Portfolio Burnished Gold & Oxford Midnight Navy Palette)
  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (!isFinePointer || prefersReducedMotion) return;

    document.documentElement.classList.add('has-custom-cursor');

    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.35;
    let currentX = targetX;
    let currentY = targetY;
    let cursorRafId = 0;
    let isMoving = false;
    let hasMoved = false;

    const INTERACTIVE_SELECTOR =
      'a, button, [role="button"], summary, input, select, textarea, label, [data-cursor], .project-card-interactive, .pm-artifact-card, .cursor-pointer';

    const updateInteractiveState = (target: EventTarget | null) => {
      const el =
        target instanceof Element
          ? target
          : document.elementFromPoint(targetX, targetY);
      if (el && el.closest(INTERACTIVE_SELECTOR)) {
        cursorLensRef.current?.classList.add('is-active');
      } else {
        cursorLensRef.current?.classList.remove('is-active');
      }
    };

    const tickCursor = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      if (Math.abs(dx) < 0.4 && Math.abs(dy) < 0.4) {
        currentX = targetX;
        currentY = targetY;
        if (cursorLensRef.current) {
          cursorLensRef.current.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0) translate(-4.7px, -4.7px)`;
        }
        isMoving = false;
        return;
      }

      currentX += dx * 0.72;
      currentY += dy * 0.72;

      if (cursorLensRef.current) {
        cursorLensRef.current.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0) translate(-4.7px, -4.7px)`;
      }

      cursorRafId = window.requestAnimationFrame(tickCursor);
    };

    const onPointerMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!hasMoved) {
        currentX = targetX;
        currentY = targetY;
        hasMoved = true;
      }

      if (e.target instanceof HTMLIFrameElement) {
        if (cursorLensRef.current) cursorLensRef.current.style.opacity = '0';
        return;
      }

      if (cursorLensRef.current) {
        cursorLensRef.current.style.opacity = '1';
      }

      updateInteractiveState(e.target);

      if (!isMoving) {
        isMoving = true;
        cursorRafId = window.requestAnimationFrame(tickCursor);
      }
    };

    const onWindowScroll = () => {
      if (hasMoved) updateInteractiveState(null);
    };

    const onPointerDown = () => {
      cursorLensRef.current?.classList.add('is-pressed');
    };

    const onPointerUp = () => {
      cursorLensRef.current?.classList.remove('is-pressed');
    };

    const onWindowBlur = () => {
      cursorLensRef.current?.classList.remove('is-pressed');
      if (cursorLensRef.current) cursorLensRef.current.style.opacity = '0';
    };

    const onPointerLeave = () => {
      if (cursorLensRef.current) cursorLensRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onWindowScroll, { passive: true });
    window.addEventListener('mousedown', onPointerDown, { passive: true });
    window.addEventListener('mouseup', onPointerUp, { passive: true });
    window.addEventListener('blur', onWindowBlur);
    document.addEventListener('mouseleave', onPointerLeave, { passive: true });

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      if (cursorRafId) window.cancelAnimationFrame(cursorRafId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('scroll', onWindowScroll);
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('blur', onWindowBlur);
      document.removeEventListener('mouseleave', onPointerLeave);
    };
  }, []);

  useEffect(() => {
    let rafId = 0;
    let isTicking = false;
    let vh = window.innerHeight;
    let totalScroll = Math.max(1, document.documentElement.scrollHeight - vh);

    const measureLayout = () => {
      vh = window.innerHeight;
      totalScroll = Math.max(1, document.documentElement.scrollHeight - vh);
    };

    const runParallaxFrame = () => {
      isTicking = false;
      const scrollY = window.pageYOffset;

      // 1. Reading Progress Bar via GPU scaleX
      if (progressBarRef.current && totalScroll > 0) {
        const progress = Math.min(1, Math.max(0, scrollY / totalScroll));
        progressBarRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      }

      // 2. Subtle 4-Plane Hero Atmosphere Parallax (active only in hero zone)
      if (scrollY <= vh * 1.25) {
        const { x, y } = mouseOffsetRef.current;
        if (parallaxBgRef.current) {
          parallaxBgRef.current.style.transform = `translate3d(${(x * -16).toFixed(1)}px, ${(scrollY * 0.32 + y * -10).toFixed(1)}px, 0) scale(1.08)`;
        }
        if (parallaxMidRef.current) {
          parallaxMidRef.current.style.transform = `translate3d(${(x * -8).toFixed(1)}px, ${(scrollY * 0.16 + y * -5).toFixed(1)}px, 0)`;
        }
        if (parallaxTextRef.current) {
          parallaxTextRef.current.style.transform = `translate3d(${(x * 6).toFixed(1)}px, ${(scrollY * -0.1 + y * 4).toFixed(1)}px, 0)`;
        }
        if (parallaxRightColRef.current) {
          parallaxRightColRef.current.style.transform = `translate3d(${(x * 8).toFixed(1)}px, ${(scrollY * 0.08 + y * 6).toFixed(1)}px, 0)`;
        }
      }

      // 3. Smooth Watermark Floating Parallax (decoupled decorative layer)
      const watermarks = document.querySelectorAll<HTMLElement>('.parallax-watermark');
      watermarks.forEach((wm) => {
        const parent = wm.parentElement;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        if (rect.bottom > -80 && rect.top < vh + 80) {
          const offset = -rect.top * 0.1;
          wm.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
        }
      });

      // 4. Zero-re-render Active Section Spy for Navbar
      const sectionIds = ['home', 'about', 'work', 'experience', 'tools', 'connect'];
      const triggerLine = vh * 0.38;
      let matched = 'home';
      for (let i = 0; i < sectionIds.length; i++) {
        const sec = document.getElementById(sectionIds[i]);
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= triggerLine) {
            matched = sectionIds[i];
          }
        }
      }
      if (matched !== activeSectionRef.current) {
        activeSectionRef.current = matched;
        setActiveSection(matched);
      }
    };

    const scheduleFrame = () => {
      if (!isTicking) {
        isTicking = true;
        rafId = window.requestAnimationFrame(runParallaxFrame);
      }
    };

    const handleResize = () => {
      measureLayout();
      scheduleFrame();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (window.pageYOffset > vh * 1.2) return;
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / vh - 0.5) * 2;
      mouseOffsetRef.current = { x: normX, y: normY };
      scheduleFrame();
    };

    measureLayout();

    window.addEventListener('scroll', scheduleFrame, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth entrance reveal: once revealed, element stays solid and stable across upward/downward scrolling
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add('is-revealed');
            obs.unobserve(el);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px 48px 0px',
      }
    );

    const revealElements = document.querySelectorAll<HTMLElement>(
      '.reveal-on-scroll, .reveal-showcase, .reveal-slide-left, .reveal-slide-right, .reveal-scale, .reveal-line, .reveal-glow, .reveal-stagger'
    );
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh + 50) {
        el.classList.add('is-revealed');
      } else {
        observer.observe(el);
      }
    });

    // Initial synchronous frame
    runParallaxFrame();

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scheduleFrame);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, [activeFilter]);

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('kiccha1703@gmail.com').catch(() => {});
    }
    setShowCopyToast(true);
    setTimeout(() => setShowCopyToast(false), 3200);
  };

  const filteredProjects =
    activeFilter === 'all'
      ? PROJECTS_WORK
      : PROJECTS_WORK.filter((p) => p.category === activeFilter);

  return (
    <div className="relative min-h-screen bg-[#faf7f2] text-[#121820] font-sans overflow-x-hidden selection:bg-[#b88a3b] selection:text-[#faf7f2]">
      {/* Custom Rounded Dart Pointer Cursor (Portfolio Burnished Gold & Oxford Navy Palette) */}
      <div
        ref={cursorLensRef}
        aria-hidden="true"
        className="custom-cursor-dart"
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="custom-cursor-dart-svg"
        >
          <defs>
            <linearGradient
              id="portfolio-cursor-gold"
              x1="4"
              y1="4"
              x2="26"
              y2="29"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#f0c46c" />
              <stop offset="52%" stopColor="#c99b4a" />
              <stop offset="100%" stopColor="#9e7127" />
            </linearGradient>
            <linearGradient
              id="portfolio-cursor-navy"
              x1="4"
              y1="4"
              x2="26"
              y2="29"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#1e3150" />
              <stop offset="100%" stopColor="#0e1828" />
            </linearGradient>
          </defs>
          <path
            d="M 5.0 6.8 Q 4.2 3.5 7.2 5.1 L 26.8 15.3 Q 29.8 16.9 26.4 17.4 L 16.5 18.5 L 10.8 27.6 Q 8.9 30.6 8.4 27.1 Z"
            className="cursor-dart-path"
          />
        </svg>
      </div>

      {/* Toast Notification */}
      {showCopyToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#0e1828] text-[#faf7f2] text-xs font-semibold shadow-2xl border border-[#b88a3b]/40 animate-bounce"
        >
          <span className="w-2 h-2 rounded-full bg-[#b88a3b] animate-ping" />
          <span>Email copied: kiccha1703@gmail.com</span>
        </div>
      )}

      {/* Zero-Lag GPU Reading Progress Indicator */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#b88a3b] via-[#c99b4a] to-[#0e1828] z-50 origin-left will-change-transform"
        style={{ transform: 'scaleX(0)' }}
      />

      {/* Floating Header Navigation (Old Money tailored executive style) */}
      <header className="fixed top-3 sm:top-5 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
        <nav
          aria-label="Primary navigation"
          className="pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#faf7f2]/95 backdrop-blur-md border border-[#dfd6c6] shadow-[0_10px_32px_rgba(14,24,40,0.18)] text-xs sm:text-sm font-medium text-[#121820] transition-all"
        >
          {/* Monogram Crest Brand */}
          <a
            href="#home"
            data-cursor="Home"
            className="flex items-center gap-2.5 hover:opacity-85 transition-opacity pr-2 sm:pr-4 border-r border-[#dfd6c6] group"
          >
            <span className="w-7 h-7 rounded-full bg-[#0e1828] text-[#b88a3b] font-serif font-bold text-xs flex items-center justify-center border border-[#b88a3b]/40 shadow-xs group-hover:rotate-12 transition-transform duration-300">
              K
            </span>
            <span className="hidden min-[420px]:block font-[family-name:var(--font-brand)] font-bold text-[21px] sm:text-[23px] leading-[1.15] tracking-[0.01em] bg-gradient-to-r from-[#0e1828] via-[#1a2942] to-[#8a6421] bg-clip-text text-transparent py-0.5 pr-0.5">
              Krishnamurthi
            </span>
          </a>

          {/* Navigation links with dynamic active indicator */}
          <div className="flex items-center gap-1.5 sm:gap-4 text-xs sm:text-sm font-medium">
            {[
              { href: '#about', id: 'about', label: 'About' },
              { href: '#work', id: 'work', label: 'Work' },
              { href: '#experience', id: 'experience', label: 'Experience' },
              { href: '#tools', id: 'tools', label: 'Toolbox' },
            ].map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  data-cursor={link.label}
                  className={`transition-all py-1 px-2.5 sm:px-3 rounded-full ${
                    isActive
                      ? 'bg-[#0e1828] text-[#faf7f2] font-semibold shadow-2xs'
                      : 'nav-link-animated text-[#554d42] hover:text-[#0e1828]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Let's Connect CTA Button */}
          <a
            href="#connect"
            data-cursor="Let's Connect"
            className="btn-shimmer ml-1 sm:ml-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#0e1828] hover:bg-[#1a2942] text-[#faf7f2] font-semibold text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 border border-[#b88a3b]/30"
          >
            <span>Let&apos;s Connect</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#b88a3b]"></span>
          </a>
        </nav>
      </header>

      {/* Main Content Sections */}
      <main className="w-full">
        {/* 1. HERO SECTION (3-Layer Depth Architecture: Layer 3 Classical Gallery BG -> Layer 2 Asymmetric Scrim -> Layer 1 Split Left Text + Right Aligned PM Artifacts) */}
        <section
          id="home"
          className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden pt-20 sm:pt-22 pb-4 sm:pb-5 px-5 sm:px-8 lg:px-12 border-b border-[#b88a3b]/40 bg-[#0b111b]"
        >
          {/* LAYER 3 (Deepest Plane - 3rd Layer Behind Text): Classical Grand Gallery Wallpaper with 3D Scroll + Cursor Parallax */}
          <div
            ref={parallaxBgRef}
            aria-hidden="true"
            className="parallax-item absolute inset-0 pointer-events-none z-0 scale-107"
          >
            <img
              alt="Classical European grand architectural gallery with golden sunlight rays"
              className="w-full h-full object-cover object-center brightness-[0.92] contrast-[1.06] saturate-[1.08]"
              src={HERO_BG_URL}
            />
          </div>

          {/* LAYER 2 (Middle Plane): Translucent Vignette & Warm Sunlight Scrim so Gallery Architecture Shines Through */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-r from-[#070d17]/78 via-[#0b1322]/42 to-[#0b1322]/24"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-[#070d17]/72 via-transparent to-[#070d17]/30"
          />
          <div
            ref={parallaxMidRef}
            aria-hidden="true"
            className="parallax-item absolute inset-0 pointer-events-none z-10 overflow-hidden"
          >
            {/* Soft Ambient Gold Sunbeam Glow */}
            <div className="absolute -top-24 right-[6%] w-[440px] h-[120%] bg-gradient-to-b from-[#e5b869]/22 via-[#c99b4a]/8 to-transparent rotate-[18deg] blur-2xl" />
          </div>

          {/* Top vertical balance spacer below fixed navbar */}
          <div aria-hidden="true" className="h-1 relative z-20" />

          {/* LAYER 1 (Foreground Plane): Two-Column Split — Monumental Left Kinetic Statement & Right 4-Pillar PM Command Deck */}
          <div className="w-full max-w-[1340px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center my-auto py-2 relative z-20">
            {/* LEFT COLUMN (5 Cols): Monumental Full-Scale Kinetic Typography Filling the Left Side */}
            <div
              ref={parallaxTextRef}
              className="parallax-item lg:col-span-5 flex flex-col justify-center items-start text-left lg:-mt-4"
            >
              <h1
                aria-label={`I turn fuzzy problems into ${HERO_ROTATING_WORDS[heroWordIndex]}`}
                className="w-full text-5xl sm:text-6xl lg:text-[76px] xl:text-[86px] font-extrabold text-[#faf7f2] tracking-[-0.025em] leading-[1.16] font-[family-name:var(--font-editorial)] drop-shadow-[0_8px_32px_rgba(4,8,16,0.92)]"
              >
                <span
                  style={{ '--entrance-delay': '0.08s' } as React.CSSProperties}
                  className="hero-entrance-item block text-[#faf7f2] sm:whitespace-nowrap"
                >
                  I turn fuzzy
                </span>
                <span
                  style={{ '--entrance-delay': '0.18s' } as React.CSSProperties}
                  className="hero-entrance-item block text-[#faf7f2] sm:whitespace-nowrap mt-2 sm:mt-3.5"
                >
                  problems into
                </span>

                {/* Animated Vertical Slot-Reel for Cycling PM Outcomes */}
                <span
                  style={{ '--entrance-delay': '0.28s' } as React.CSSProperties}
                  className="hero-entrance-item relative block h-[1.3em] w-[125%] overflow-hidden mt-2 sm:mt-3.5"
                >
                  {HERO_ROTATING_WORDS.map((word, idx) => {
                    const isCurrent = idx === heroWordIndex;
                    const isPrevious =
                      idx ===
                      (heroWordIndex - 1 + HERO_ROTATING_WORDS.length) %
                        HERO_ROTATING_WORDS.length;

                    let stateClass =
                      'translate-y-[145%] opacity-0 scale-[0.98] transition-none pointer-events-none';
                    if (isCurrent) {
                      stateClass =
                        'translate-y-0 opacity-100 scale-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]';
                    } else if (isPrevious) {
                      stateClass =
                        '-translate-y-[145%] opacity-0 scale-[0.98] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none';
                    }

                    return (
                      <span
                        key={word}
                        aria-hidden={!isCurrent}
                        className={`absolute inset-x-0 top-0 block text-[1.05em] font-[family-name:var(--font-signature)] italic font-normal text-[#f0c46c] whitespace-nowrap will-change-transform drop-shadow-[0_4px_24px_rgba(4,8,16,0.95)] ${stateClass}`}
                      >
                        {word}
                      </span>
                    );
                  })}
                </span>
              </h1>

              {/* Sub-headline / Thesis Statement */}
              <p
                style={{ '--entrance-delay': '0.34s' } as React.CSSProperties}
                className="hero-entrance-item mt-4 sm:mt-5 text-sm sm:text-base text-[#d4c8b6] leading-relaxed max-w-md drop-shadow-[0_2px_12px_rgba(4,8,16,0.85)]"
              >
                Bridging user friction, engineering feasibility, and unit economics to build products that ship and scale.
              </p>
            </div>

            {/* RIGHT COLUMN (7 Cols): Original 4-Pillar PM Role Command Deck (2x2 Equal-Height Bento, Zero Touching) */}
            <div
              ref={parallaxRightColRef}
              aria-label="Interactive Product Management Role Artifacts"
              className="parallax-item lg:col-span-7 w-full max-w-[650px] lg:ml-auto grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-stretch"
            >
              {/* CARD 1 (Top-Left, Dark Navy): USER DISCOVERY & JTBD SYNTHESIS */}
              <div
                style={
                  {
                    '--entrance-delay': '0.38s',
                    '--float-duration': '6s',
                    '--float-delay': '0s',
                  } as React.CSSProperties
                }
                className="pm-float-wrapper relative z-20 flex"
              >
                <button
                  type="button"
                  data-cursor="View Discovery"
                  onClick={() => setActiveCaseStudy('comet')}
                  className="pm-artifact-card w-full h-full flex flex-col justify-between text-left rounded-2xl bg-[#0e1624]/95 backdrop-blur-md border border-[#b88a3b]/45 p-4 shadow-[0_14px_32px_rgba(4,8,16,0.6)] cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-[8px] font-mono uppercase tracking-[0.13em] text-[#f0c46c] font-bold pb-2 border-b border-white/10">
                    <span>01 • USER DISCOVERY &amp; JTBD</span>
                    <span className="text-[#9ba8bc] group-hover:text-[#faf7f2] transition-colors">
                      Field Insights ↗
                    </span>
                  </div>

                  <div className="my-2.5 space-y-2">
                    <div className="p-2 rounded-lg bg-white/[0.04] border border-white/10">
                      <div className="flex items-center justify-between text-[8px] font-mono text-[#e5b869]">
                        <span>OBSERVED PAIN POINT</span>
                        <span>15+ SESSIONS</span>
                      </div>
                      <p className="text-[10px] font-semibold text-[#faf7f2] mt-0.5 leading-snug">
                        Users abandon high-intent flows when AI or KYC steps hide confidence &amp; next actions.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[8.5px]">
                      <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
                        <span className="block font-mono text-[7.5px] uppercase text-[#9ba8bc]">
                          ROOT CAUSE
                        </span>
                        <span className="font-bold text-[#faf7f2] block mt-0.5">
                          Trust &amp; verification anxiety
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#c99b4a]/15 border border-[#c99b4a]/40">
                        <span className="block font-mono text-[7.5px] uppercase text-[#f0c46c]">
                          PM HYPOTHESIS
                        </span>
                        <span className="font-bold text-[#faf7f2] block mt-0.5">
                          Inline proof + pre-checks
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[8px] font-mono text-[#9ba8bc]">
                    <span>JTBD Synthesis → Spec</span>
                    <span className="text-[#f0c46c] font-semibold">
                      3 Core Leaks Isolated
                    </span>
                  </div>
                </button>
              </div>

              {/* CARD 2 (Top-Right, Warm Parchment): PRD SPEC & GUARDRAIL METRICS */}
              <div
                style={
                  {
                    '--entrance-delay': '0.50s',
                    '--float-duration': '6.3s',
                    '--float-delay': '0.5s',
                  } as React.CSSProperties
                }
                className="pm-float-wrapper relative z-20 flex"
              >
                <button
                  type="button"
                  data-cursor="View Context Pipeline"
                  onClick={() => setActiveCaseStudy('openai')}
                  className="pm-artifact-card w-full h-full flex flex-col justify-between text-left rounded-2xl bg-[#f4ede2] border border-[#d6c7b2] p-4 text-[#121820] shadow-[0_14px_32px_rgba(4,8,16,0.55)] cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-[8px] font-mono uppercase tracking-[0.13em] text-[#8a6829] font-bold pb-2 border-b border-[#dfd4c2]">
                    <span>02 • OPENAI DATA AGENT</span>
                    <span className="text-[#6e6456] group-hover:text-[#0e1828] transition-colors">
                      Case Study ↗
                    </span>
                  </div>

                  <div className="my-2.5 space-y-1.5 text-[9px] leading-tight">
                    <div className="grid grid-cols-12 gap-1.5 items-baseline">
                      <span className="col-span-4 font-mono uppercase text-[7.5px] tracking-wider text-[#8a6829] font-bold">
                        MOAT ARCH
                      </span>
                      <span className="col-span-8 text-[#0e1828] font-bold">
                        Context is the moat, not model
                      </span>
                    </div>

                    <div className="grid grid-cols-12 gap-1.5 items-baseline pt-1.5 border-t border-[#e5dccb]">
                      <span className="col-span-4 font-mono uppercase text-[7.5px] tracking-wider text-[#8a6829] font-bold">
                        SCALE
                      </span>
                      <span className="col-span-8 text-[#1e2631] font-medium">
                        70k datasets • 3.5k users • 600 PB
                      </span>
                    </div>

                    <div className="grid grid-cols-12 gap-1.5 items-baseline pt-1.5 border-t border-[#e5dccb]">
                      <span className="col-span-4 font-mono uppercase text-[7.5px] tracking-wider text-[#8a6829] font-bold">
                        SPEEDUP
                      </span>
                      <span className="col-span-8 text-[#1e2631] font-medium">
                        17× faster via memory feedback
                      </span>
                    </div>

                    <div className="grid grid-cols-12 gap-1.5 items-baseline pt-1.5 border-t border-[#e5dccb]">
                      <span className="col-span-4 font-mono uppercase text-[7.5px] tracking-wider text-[#8a6829] font-bold">
                        NON-GOAL
                      </span>
                      <span className="col-span-8 text-[#5a5246]">
                        Unverified open-web generation
                      </span>
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-[#dfd4c2] flex items-center justify-between text-[8px] font-mono text-[#6e6456]">
                    <span>Eng Sign-Off Ready</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#0e1828] text-[#f0c46c] font-bold">
                      SLA ≥ 90% Cov
                    </span>
                  </div>
                </button>
              </div>

              {/* CARD 3 (Bottom-Left, Warm Parchment): A/B EXPERIMENTATION & COHORT READOUT */}
              <div
                style={
                  {
                    '--entrance-delay': '0.62s',
                    '--float-duration': '6.5s',
                    '--float-delay': '1.0s',
                  } as React.CSSProperties
                }
                className="pm-float-wrapper relative z-20 flex"
              >
                <button
                  type="button"
                  data-cursor="View Experiments"
                  onClick={() => setActiveCaseStudy('lending')}
                  className="pm-artifact-card w-full h-full flex flex-col justify-between text-left rounded-2xl bg-[#f4ede2] border border-[#d6c7b2] p-4 text-[#121820] shadow-[0_14px_32px_rgba(4,8,16,0.55)] cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-[8px] font-mono uppercase tracking-[0.13em] text-[#8a6829] font-bold pb-2 border-b border-[#dfd4c2]">
                    <span>03 • A/B COHORT EXPERIMENTS</span>
                    <span className="text-[#0e1828] font-bold">p &lt; 0.01 ✓</span>
                  </div>

                  <div className="my-2.5 space-y-2 text-[9px]">
                    {[
                      {
                        name: 'Instant KYC Pre-Check',
                        base: '52%',
                        variant: '76%',
                        lift: '+24% KYC',
                        width: '78%',
                      },
                      {
                        name: 'Persistent AI Memory',
                        base: '19%',
                        variant: '41%',
                        lift: '+22% Cart',
                        width: '68%',
                      },
                      {
                        name: 'Recruiter Match Ranking',
                        base: '68%',
                        variant: '83%',
                        lift: '+15% Match',
                        width: '86%',
                      },
                    ].map((exp) => (
                      <div key={exp.name} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#0e1828] truncate">
                            {exp.name}
                          </span>
                          <span className="font-mono text-[8px] font-bold text-[#8a6829] bg-[#e8decb] px-1.5 py-0.5 rounded">
                            {exp.lift}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-[#dfd4c2] overflow-hidden">
                            <div
                              style={{ width: exp.width }}
                              className="h-full rounded-full bg-gradient-to-r from-[#0e1828] to-[#b88a3b]"
                            />
                          </div>
                          <span className="font-mono text-[7.5px] text-[#5a5246] shrink-0">
                            {exp.base} → {exp.variant}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-1.5 border-t border-[#dfd4c2] flex items-center justify-between text-[8px] font-mono text-[#6e6456]">
                    <span>Control vs. Variant B</span>
                    <span className="text-[#0e1828] font-bold">
                      15 hrs/wk Ops Saved
                    </span>
                  </div>
                </button>
              </div>

              {/* CARD 4 (Bottom-Right, Dark Navy): RICE PRIORITIZATION & ROADMAP HORIZONS */}
              <div
                style={
                  {
                    '--entrance-delay': '0.74s',
                    '--float-duration': '5.9s',
                    '--float-delay': '1.4s',
                  } as React.CSSProperties
                }
                className="pm-float-wrapper relative z-20 flex"
              >
                <button
                  type="button"
                  data-cursor="View Pricing Teardown"
                  onClick={() => setActiveCaseStudy('notion')}
                  className="pm-artifact-card w-full h-full flex flex-col justify-between text-left rounded-2xl bg-[#0e1624]/95 backdrop-blur-md border border-[#b88a3b]/45 p-4 shadow-[0_14px_32px_rgba(4,8,16,0.6)] cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-[8px] font-mono uppercase tracking-[0.13em] text-[#f0c46c] font-bold pb-2 border-b border-white/10">
                    <span>04 • NOTION AGENTS TEARDOWN</span>
                    <span className="text-[#9ba8bc] group-hover:text-[#faf7f2] transition-colors">
                      Unit Economics ↗
                    </span>
                  </div>

                  <div className="my-2.5 space-y-2">
                    <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white/[0.04] border border-[#c99b4a]/35">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 rounded bg-[#c99b4a] text-[#0e1828] font-mono font-bold text-[7px] uppercase">
                            DYNAMIC ROUTER
                          </span>
                          <span className="text-[10px] font-bold text-[#faf7f2] truncate">
                            5 / 10 / 20 Rate Card
                          </span>
                        </div>
                        <p className="text-[8.5px] text-[#9ba8bc] mt-0.5 truncate">
                          Sonnet vs. Haiku margin optimization
                        </p>
                      </div>
                      <span className="font-mono text-[8.5px] font-bold text-[#f0c46c] shrink-0">
                        $10 / 1k
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/10">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 rounded border border-[#c99b4a]/60 text-[#f0c46c] font-mono font-bold text-[7px] uppercase">
                            PROPOSAL
                          </span>
                          <span className="text-[10px] font-bold text-[#faf7f2] truncate">
                            Run-Level Budget Envelopes
                          </span>
                        </div>
                        <p className="text-[8.5px] text-[#9ba8bc] mt-0.5 truncate">
                          Ceilings to prevent 24hr runaway loops
                        </p>
                      </div>
                      <span className="font-mono text-[8.5px] font-bold text-[#b88a3b] shrink-0">
                        P0 FIX
                      </span>
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[8px] font-mono text-[#9ba8bc]">
                    <span>17-Page Full Teardown</span>
                    <span className="text-[#f0c46c] font-semibold">
                      Akshay Kothari Post
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Scroll Indicator */}
          <div
            style={{ '--entrance-delay': '0.84s' } as React.CSSProperties}
            className="hero-entrance-item w-full max-w-[1280px] mx-auto flex items-center justify-between pt-2.5 border-t border-[#b88a3b]/30 text-[11px] sm:text-xs font-semibold text-[#f1eae0] relative z-20"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e0b25c]" />
              <span>Scroll to explore sections</span>
            </div>
            <a
              href="#about"
              data-cursor="Scroll to About"
              className="flex items-center gap-1 hover:text-[#e0b25c] transition-colors group"
            >
              <span>01 / About</span>
              <span className="material-symbols-outlined text-[14px] group-hover:translate-y-0.5 transition-transform animate-bounce">
                arrow_downward
              </span>
            </a>
          </div>
        </section>

        {/* Marquee Ticker — Exclusively Product Management Roles & Core PM Skills */}
        <div className="w-full bg-[#0e1828] text-[#faf7f2] py-4 overflow-hidden border-y border-[#b88a3b]/30">
          <div className="animate-marquee whitespace-nowrap flex items-center text-xs font-mono uppercase tracking-widest font-bold">
            {[0, 1].map((trackIdx) => (
              <div key={trackIdx} className="flex items-center gap-8 shrink-0 px-4">
                {PM_MARQUEE_ITEMS.map((skill) => (
                  <React.Fragment key={`${trackIdx}-${skill}`}>
                    <span>{skill}</span>
                    <span className="text-[#b88a3b]">✦</span>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 2. ABOUT SECTION */}
        <section
          id="about"
          className="reveal-on-scroll scroll-mt-16 relative w-full max-w-[1240px] mx-auto px-6 lg:px-12 py-12 lg:py-16 min-h-[calc(100dvh-4rem)] flex items-center border-b border-[#dfd6c6] overflow-hidden"
        >
          {/* Deep Background Parallax Watermark */}
          <div
            aria-hidden="true"
            className="parallax-watermark pointer-events-none select-none absolute -top-6 right-4 lg:right-10 text-[120px] sm:text-[170px] font-extrabold font-[family-name:var(--font-editorial)] text-[#0e1828]/[0.035] leading-none z-0"
          >
            01
          </div>

          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Portrait Photo Showcase (Enters smoothly from Left) */}
            <div className="lg:col-span-5 reveal-slide-left">
              <div
                className="relative rounded-3xl overflow-hidden shadow-lg border border-[#dfd6c6] h-[360px] sm:h-[400px] lg:h-[420px] w-full bg-[#f0e8dc]"
              >
                <img
                  alt="Portrait of Krishnamurthi"
                  className="w-full h-full object-cover object-top scale-105"
                  src={ABOUT_BEACH_LOCAL}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1828]/65 via-transparent to-transparent pointer-events-none" />
                <div
                  className="absolute bottom-3.5 left-3.5 right-3.5 p-3.5 rounded-2xl bg-[#faf7f2]/95 backdrop-blur-md border border-[#dfd6c6] shadow-md"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-[#0e1828]">
                    <span>Krishnamurthi</span>
                    <span className="text-[#806b47]">IIMV × IIITDMK</span>
                  </div>
                  <p className="text-[11px] text-[#554d42] mt-0.5">
                    Bridging technical feasibility with user adoption &amp; business metrics.
                  </p>
                </div>
              </div>
            </div>

            {/* Short, Crisp APM About Copy (Enters smoothly from Right) */}
            <div className="lg:col-span-7 reveal-slide-right">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#806b47] font-mono">
                    <span>01</span>
                    <span>/</span>
                    <span>About</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0e1828] tracking-tight leading-[1.12] font-[family-name:var(--font-editorial)]">
                    Obsessed with user friction.
                    <br />
                    <span className="font-[family-name:var(--font-signature)] italic font-normal text-[#8a6421]">
                      Grounded in execution.
                    </span>
                  </h2>
                </div>

                <div className="reveal-line h-[1.5px] w-full bg-gradient-to-r from-[#b88a3b] via-[#c99b4a] to-transparent my-2" />

                <div className="space-y-3.5 text-sm sm:text-[15.5px] text-[#4a4235] leading-relaxed max-w-[620px]">
                  <p>
                    Hi, I’m <strong className="text-[#0e1828] font-bold">Krishnamurthi</strong>. Pairing a Computer Science background with an MBA in progress, I operate where user behavior, technical feasibility, and unit economics meet—turning messy, high-ambiguity problems into products people genuinely adopt.
                  </p>
                  <p>
                    My approach to product starts with observing real users and pinpointing exactly where funnels leak, then turning those insights into testable hypotheses, clear specs, and AI-powered workflows. I’m exploring <strong className="text-[#0e1828] font-bold">APM &amp; Product Manager</strong> roles driven by first-principles discovery, fast experimentation, and measurable customer impact.
                  </p>
                </div>

                {/* Neatly Presented Location & Current Academic Status */}
                <div className="border-y border-[#dfd6c6] py-3.5 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-7 text-xs sm:text-sm text-[#0e1828]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#b88a3b] shrink-0" />
                    <span className="text-[#6e6456] font-medium">Based in</span>
                    <span className="font-bold text-[#0e1828]">Chennai, Tamil Nadu</span>
                  </div>

                  <span className="hidden sm:inline-block h-4 w-[1px] bg-[#dfd6c6]" aria-hidden="true" />

                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0e1828] shrink-0" />
                    <span className="text-[#6e6456] font-medium">Currently pursuing</span>
                    <span className="font-bold text-[#0e1828]">MBA, IIM Visakhapatnam</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-1 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-semibold">
                  <button
                    type="button"
                    data-cursor="View Resume"
                    onClick={() => setShowResumeModal(true)}
                    className="px-5 py-2.5 rounded-full bg-[#0e1828] hover:bg-[#1a2942] text-[#faf7f2] transition-colors cursor-pointer border border-[#b88a3b]/40 shadow-sm inline-flex items-center gap-1.5"
                  >
                    <span>View Full Resume</span>
                    <span className="material-symbols-outlined text-[14px]">visibility</span>
                  </button>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="Open LinkedIn"
                    className="text-[#554d42] hover:text-[#0e1828] transition-colors font-medium flex items-center gap-1"
                  >
                    <span>LinkedIn</span>
                    <span className="material-symbols-outlined text-[14px]">north_east</span>
                  </a>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="Open GitHub"
                    className="text-[#554d42] hover:text-[#0e1828] transition-colors font-medium flex items-center gap-1"
                  >
                    <span>GitHub</span>
                    <span className="material-symbols-outlined text-[14px]">north_east</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. WORK SECTION (Per-Showcase Parallax & Reversible Scroll Reveal) */}
        <section
          id="work"
          className="reveal-on-scroll scroll-mt-16 relative w-full max-w-[1240px] mx-auto px-6 lg:px-12 py-24 border-b border-[#dfd6c6] overflow-hidden"
        >
          {/* Deep Background Parallax Watermark */}
          <div
            aria-hidden="true"
            className="parallax-watermark pointer-events-none select-none absolute top-6 right-4 lg:right-10 text-[130px] sm:text-[190px] font-extrabold font-[family-name:var(--font-editorial)] text-[#0e1828]/[0.035] leading-none z-0"
          >
            02
          </div>

          <div className="relative z-10 space-y-10">
            {/* Header and Filter Tabs */}
            <div
              className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#806b47] font-mono">
                  <span>02</span>
                  <span>/</span>
                  <span>Product Teardowns, Builds &amp; Research</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1828] tracking-tight font-[family-name:var(--font-editorial)]">
                  Product Work &amp; Research
                </h2>
                <p className="text-sm sm:text-base text-[#554d42] max-w-xl">
                  Product teardowns, shipped AI &amp; consumer builds, unit-economics engines, and statistical safety research — structured by problem framing, judgment calls, and measurable outcomes.
                </p>
              </div>

              {/* Filter tabs */}
              <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-[#f0e8dc] border border-[#dfd6c6] text-xs font-semibold">
                <button
                  type="button"
                  data-cursor="Show All Work"
                  onClick={() => setActiveFilter('all')}
                  className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                    activeFilter === 'all'
                      ? 'bg-[#0e1828] text-[#faf7f2] shadow-xs'
                      : 'text-[#554d42] hover:text-[#0e1828]'
                  }`}
                >
                  All Work ({PROJECTS_WORK.length})
                </button>
                <button
                  type="button"
                  data-cursor="Filter Teardowns"
                  onClick={() => setActiveFilter('teardowns')}
                  className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                    activeFilter === 'teardowns'
                      ? 'bg-[#0e1828] text-[#faf7f2] shadow-xs'
                      : 'text-[#554d42] hover:text-[#0e1828]'
                  }`}
                >
                  Product Teardowns ({PROJECTS_WORK.filter((p) => p.category === 'teardowns').length})
                </button>
                <button
                  type="button"
                  data-cursor="Filter Product Builds"
                  onClick={() => setActiveFilter('productBuilds')}
                  className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                    activeFilter === 'productBuilds'
                      ? 'bg-[#0e1828] text-[#faf7f2] shadow-xs'
                      : 'text-[#554d42] hover:text-[#0e1828]'
                  }`}
                >
                  Product Builds ({PROJECTS_WORK.filter((p) => p.category === 'productBuilds').length})
                </button>
                <button
                  type="button"
                  data-cursor="Filter Research Projects"
                  onClick={() => setActiveFilter('systems')}
                  className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                    activeFilter === 'systems'
                      ? 'bg-[#0e1828] text-[#faf7f2] shadow-xs'
                      : 'text-[#554d42] hover:text-[#0e1828]'
                  }`}
                >
                  Research Projects ({PROJECTS_WORK.filter((p) => p.category === 'systems').length})
                </button>
              </div>
            </div>

            {/* Product Teardowns Showcase (2-Column Visual Card Style Matching Image 2) */}
            {(activeFilter === 'all' || activeFilter === 'teardowns') && (
              <div className="space-y-8">
                {activeFilter === 'all' && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#806b47] font-mono">
                      <span>02.1</span>
                      <span>/</span>
                      <span>Product Management Teardowns</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0e1828] font-[family-name:var(--font-editorial)]">
                      Reverse Engineering &amp; Funnel Diagnostics
                    </h3>
                    <p className="text-sm text-[#554d42] max-w-xl">
                      Deep-dive teardowns deconstructing autonomous context pipelines, agent rate card economics, and conversational discovery funnels.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8 items-stretch">
                  {filteredProjects
                    .filter((p) => p.category === 'teardowns')
                    .map((item) => (
                      <article
                        key={item.id}
                        data-cursor="View Teardown"
                        onClick={() => setActiveCaseStudy(item.id)}
                        className="reveal-scale reveal-glow rounded-3xl bg-[#ffffff] border border-[#dfd6c6] shadow-[0_6px_28px_rgba(14,24,40,0.05)] overflow-hidden flex flex-col justify-between group hover:border-[#b88a3b]/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
                      >
                        {/* Visual Thumbnail Banner */}
                        <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#0c1424] border-b border-[#dfd6c6]/60">
                          <img
                            src={item.thumbnailUrl}
                            alt={item.title}
                            loading="lazy"
                            className="w-full h-full object-cover object-center group-hover:scale-[1.025] transition-transform duration-500 ease-out"
                          />
                          <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none" />
                        </div>

                        {/* Card Content (Typography & Spec Breakdown) */}
                        <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                          <div className="space-y-4">
                            <div className="space-y-1.5">
                              <h3 className="text-2xl sm:text-[26px] font-bold text-[#0e1828] font-[family-name:var(--font-editorial)] tracking-tight group-hover:text-[#b88a3b] transition-colors leading-snug">
                                {item.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-[#554d42] leading-relaxed">
                                {item.subtitle}
                              </p>
                            </div>

                            {/* PROBLEM */}
                            <div className="space-y-1 pt-1">
                              <h4 className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#806b47]">
                                Problem
                              </h4>
                              <p className="text-xs sm:text-[13px] text-[#4a4235] leading-relaxed">
                                {item.problem}
                              </p>
                            </div>

                            {/* PM JUDGMENT CALLS */}
                            <div className="space-y-1">
                              <h4 className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#0e1828]">
                                PM Judgment Calls
                              </h4>
                              <p className="text-xs sm:text-[13px] text-[#4a4235] leading-relaxed">
                                {item.judgmentCalls}
                              </p>
                            </div>

                            {/* QUANTITATIVE OUTCOME */}
                            <div className="p-4 rounded-2xl bg-[#f0e8dc] border border-[#dfd6c6] space-y-1">
                              <h4 className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#0e1828]">
                                Quantitative Outcome
                              </h4>
                              <p className="text-xs sm:text-[13px] font-medium text-[#4a4235] leading-relaxed">
                                {item.outcome}
                              </p>
                            </div>
                          </div>

                          {/* Tech stack tags & Action Row */}
                          <div className="space-y-4 pt-3 border-t border-[#dfd6c6]/50">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {item.techTags.map((tag) => (
                                <span
                                  key={tag}
                                  className="card-tech-tag px-2.5 py-0.5 rounded-full bg-[#f0e8dc] text-[10.5px] font-semibold text-[#554d42]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-2.5">
                              <a
                                href={item.standaloneUrl}
                                onClick={(e) => e.stopPropagation()}
                                className="px-4 py-2 rounded-full bg-[#0e1828] hover:bg-[#1a2942] text-[#faf7f2] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs"
                              >
                                <span>Read Full Teardown</span>
                                <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                              </a>
                              {item.pdfUrl && (
                                <a
                                  href={item.pdfUrl}
                                  download
                                  onClick={(e) => e.stopPropagation()}
                                  className="px-3.5 py-2 rounded-full bg-white hover:bg-[#f0e8dc] text-[#806b47] border border-[#dfd6c6] text-xs font-semibold inline-flex items-center gap-1 transition-colors shadow-2xs"
                                >
                                  <span>Report PDF</span>
                                  <span className="material-symbols-outlined text-[13px]">download</span>
                                </a>
                              )}
                              {item.prototypeUrl && (
                                <a
                                  href={item.prototypeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="px-3.5 py-2 rounded-full bg-[#faf7f2] hover:bg-[#f0e8dc] text-[#0e1828] border border-[#dfd6c6] text-xs font-semibold inline-flex items-center gap-1 transition-colors shadow-2xs"
                                >
                                  <span>Interactive Prototype</span>
                                  <span className="material-symbols-outlined text-[13px]">rocket_launch</span>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                </div>
              </div>
            )}

            {/* AI Product & Consumer Builds Showcase (02.2 - Ranked ahead of Research) */}
            {(activeFilter === 'all' || activeFilter === 'productBuilds') && (
              <div className="space-y-8 pt-6">
                {activeFilter === 'all' && (
                  <div className="pt-8 border-t border-[#dfd6c6] space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#806b47] font-mono">
                      <span>02.2</span>
                      <span>/</span>
                      <span>AI Product &amp; Consumer Builds</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0e1828] font-[family-name:var(--font-editorial)]">
                      0→1 Product Prototypes &amp; Unit Economics Engines
                    </h3>
                    <p className="text-sm text-[#554d42] max-w-xl">
                      Shipped end-to-end PM tools, AST validation sandboxes, cascading LLM margin simulators, and browser extensions solving concrete user &amp; COGS bottlenecks.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-8 items-stretch">
                  {filteredProjects
                    .filter((p) => p.category === 'productBuilds')
                    .map((item) => (
                      <article
                        key={item.id}
                        data-cursor="View Case Study"
                        onClick={() => setActiveCaseStudy(item.id)}
                        className="reveal-scale reveal-glow rounded-3xl bg-[#ffffff] border border-[#dfd6c6] shadow-[0_6px_28px_rgba(14,24,40,0.05)] overflow-hidden flex flex-col justify-between group hover:border-[#b88a3b]/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
                      >
                        {/* Visual Thumbnail Banner */}
                        <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#0c1424] border-b border-[#dfd6c6]/60">
                          <img
                            src={item.thumbnailUrl}
                            alt={item.title}
                            loading="lazy"
                            className="w-full h-full object-cover object-center group-hover:scale-[1.025] transition-transform duration-500 ease-out"
                          />
                          <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none" />
                        </div>

                        {/* Card Content */}
                        <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                          <div className="space-y-4">
                            <div className="space-y-1.5">
                              <h3 className="text-2xl sm:text-[26px] font-bold text-[#0e1828] font-[family-name:var(--font-editorial)] tracking-tight group-hover:text-[#b88a3b] transition-colors leading-snug">
                                {item.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-[#554d42] leading-relaxed">
                                {item.subtitle}
                              </p>
                            </div>

                            {/* PROBLEM */}
                            <div className="space-y-1 pt-1">
                              <h4 className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#806b47]">
                                Problem
                              </h4>
                              <p className="text-xs sm:text-[13px] text-[#4a4235] leading-relaxed">
                                {item.problem}
                              </p>
                            </div>

                            {/* PM JUDGMENT & EXECUTION */}
                            <div className="space-y-1">
                              <h4 className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#0e1828]">
                                PM Judgment &amp; Execution
                              </h4>
                              <p className="text-xs sm:text-[13px] text-[#4a4235] leading-relaxed">
                                {item.judgmentCalls}
                              </p>
                            </div>

                            {/* QUANTITATIVE OUTCOME */}
                            <div className="p-4 rounded-2xl bg-[#f0e8dc] border border-[#dfd6c6] space-y-1">
                              <h4 className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#0e1828]">
                                Quantitative Outcome
                              </h4>
                              <p className="text-xs sm:text-[13px] font-medium text-[#4a4235] leading-relaxed">
                                {item.outcome}
                              </p>
                            </div>
                          </div>

                          {/* Tech stack tags & Strictly 2-Button Action Row */}
                          <div className="space-y-4 pt-3 border-t border-[#dfd6c6]/50">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {item.techTags.map((tag) => (
                                <span
                                  key={tag}
                                  className="card-tech-tag px-2.5 py-0.5 rounded-full bg-[#f0e8dc] text-[10.5px] font-semibold text-[#554d42]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-2.5">
                              <a
                                href={item.standaloneUrl}
                                onClick={(e) => e.stopPropagation()}
                                className="px-4 py-2 rounded-full bg-[#0e1828] hover:bg-[#1a2942] text-[#faf7f2] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs"
                              >
                                <span>Read Full Case Study</span>
                                <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                              </a>
                              {item.prototypeUrl ? (
                                <a
                                  href={item.prototypeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="px-3.5 py-2 rounded-full bg-[#faf7f2] hover:bg-[#f0e8dc] text-[#0e1828] border border-[#dfd6c6] text-xs font-semibold inline-flex items-center gap-1 transition-colors shadow-2xs"
                                >
                                  <span>Interactive Prototype</span>
                                  <span className="material-symbols-outlined text-[13px]">rocket_launch</span>
                                </a>
                              ) : (
                                item.githubUrl && (
                                  <a
                                    href={item.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="px-3.5 py-2 rounded-full bg-white hover:bg-[#0e1828] text-[#0e1828] hover:text-[#faf7f2] border border-[#dfd6c6] text-xs font-semibold inline-flex items-center gap-1 transition-colors shadow-2xs"
                                  >
                                    <span>GitHub Repo</span>
                                    <span className="material-symbols-outlined text-[13px]">code</span>
                                  </a>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                </div>
              </div>
            )}

            {/* Research Projects Showcase */}
            {(activeFilter === 'all' || activeFilter === 'systems') && (
              <div className="space-y-8 pt-6">
                {activeFilter === 'all' && (
                  <div className="pt-8 border-t border-[#dfd6c6] space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#806b47] font-mono">
                      <span>02.3</span>
                      <span>/</span>
                      <span>Research Projects</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0e1828] font-[family-name:var(--font-editorial)]">
                      Research Projects
                    </h3>
                    <p className="text-sm text-[#554d42] max-w-xl">
                      Formal statistical conformal prediction and density-drift detection for hardware-aware edge vision-language models.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 max-w-2xl gap-7 sm:gap-8 items-stretch">
                  {filteredProjects
                    .filter((p) => p.category === 'systems')
                    .map((item) => (
                      <article
                        key={item.id}
                        data-cursor="View Project"
                        onClick={() => setActiveCaseStudy(item.id)}
                        className="reveal-scale reveal-glow rounded-3xl bg-[#ffffff] border border-[#dfd6c6] shadow-[0_6px_28px_rgba(14,24,40,0.05)] overflow-hidden flex flex-col justify-between group hover:border-[#b88a3b]/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
                      >
                        {/* Visual Thumbnail Banner */}
                        <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#0c1424] border-b border-[#dfd6c6]/60">
                          <img
                            src={item.thumbnailUrl}
                            alt={item.title}
                            loading="lazy"
                            className="w-full h-full object-cover object-center group-hover:scale-[1.025] transition-transform duration-500 ease-out"
                          />
                          <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none" />
                        </div>

                        {/* Card Content (Typography & Spec Breakdown) */}
                        <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                          <div className="space-y-4">
                            <div className="space-y-1.5">
                              <h3 className="text-2xl sm:text-[26px] font-bold text-[#0e1828] font-[family-name:var(--font-editorial)] tracking-tight group-hover:text-[#b88a3b] transition-colors leading-snug">
                                {item.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-[#554d42] leading-relaxed">
                                {item.subtitle}
                              </p>
                            </div>

                            {/* PROBLEM */}
                            <div className="space-y-1 pt-1">
                              <h4 className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#806b47]">
                                Problem
                              </h4>
                              <p className="text-xs sm:text-[13px] text-[#4a4235] leading-relaxed">
                                {item.problem}
                              </p>
                            </div>

                            {/* PM JUDGMENT CALLS & ARCHITECTURE */}
                            <div className="space-y-1">
                              <h4 className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#0e1828]">
                                PM Judgment &amp; Architecture
                              </h4>
                              <p className="text-xs sm:text-[13px] text-[#4a4235] leading-relaxed">
                                {item.judgmentCalls}
                              </p>
                            </div>

                            {/* QUANTITATIVE OUTCOME */}
                            <div className="p-4 rounded-2xl bg-[#f0e8dc] border border-[#dfd6c6] space-y-1">
                              <h4 className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#0e1828]">
                                Quantitative Outcome
                              </h4>
                              <p className="text-xs sm:text-[13px] font-medium text-[#4a4235] leading-relaxed">
                                {item.outcome}
                              </p>
                            </div>
                          </div>

                          {/* Tech stack tags & Action Row */}
                          <div className="space-y-4 pt-3 border-t border-[#dfd6c6]/50">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {item.techTags.map((tag) => (
                                <span
                                  key={tag}
                                  className="card-tech-tag px-2.5 py-0.5 rounded-full bg-[#f0e8dc] text-[10.5px] font-semibold text-[#554d42]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="flex flex-wrap items-center gap-2.5">
                              <a
                                href={item.standaloneUrl}
                                onClick={(e) => e.stopPropagation()}
                                className="px-4 py-2 rounded-full bg-[#0e1828] hover:bg-[#1a2942] text-[#faf7f2] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs"
                              >
                                <span>Read Full Case Study</span>
                                <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                              </a>
                              {item.githubUrl && (
                                <a
                                  href={item.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="px-3.5 py-2 rounded-full bg-white hover:bg-[#0e1828] text-[#0e1828] hover:text-[#faf7f2] border border-[#dfd6c6] text-xs font-semibold inline-flex items-center gap-1 transition-colors shadow-2xs"
                                >
                                  <span>GitHub Repo</span>
                                  <span className="material-symbols-outlined text-[13px]">code</span>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 4. EXPERIENCE SECTION (Per-Showcase Parallax & Reversible Scroll Reveal) */}
        <section
          id="experience"
          className="reveal-on-scroll scroll-mt-16 relative w-full max-w-[1240px] mx-auto px-6 lg:px-12 py-24 border-b border-[#dfd6c6] overflow-hidden"
        >
          {/* Deep Background Parallax Watermark */}
          <div
            aria-hidden="true"
            className="parallax-watermark pointer-events-none select-none absolute top-6 right-4 lg:right-10 text-[130px] sm:text-[190px] font-extrabold font-[family-name:var(--font-editorial)] text-[#0e1828]/[0.035] leading-none z-0"
          >
            03
          </div>

          <div className="relative z-10 space-y-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#806b47] font-mono">
                <span>03</span>
                <span>/</span>
                <span>Career Track Record</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1828] tracking-tight font-[family-name:var(--font-editorial)]">
                Experience &amp; Education
              </h2>
            </div>

            <div className="space-y-6">
              {EXPERIENCES.map((exp, idx) => (
                <div
                  key={idx}
                  className={`reveal-scale reveal-glow p-7 sm:p-8 rounded-3xl bg-[#ffffff] border border-[#dfd6c6] shadow-2xs hover:shadow-md hover:border-[#b88a3b]/50 transition-all duration-300 flex flex-col md:flex-row gap-6 md:gap-12 group ${
                    idx % 2 === 0 ? 'reveal-slide-left' : 'reveal-slide-right'
                  }`}
                >
                  <div className="md:w-52 shrink-0 flex flex-col items-start gap-3">
                    {exp.logoUrl && (
                      <div className="w-28 h-20 rounded-2xl bg-white border border-[#dfd6c6]/80 p-2 flex items-center justify-center shadow-2xs overflow-hidden">
                        <img
                          src={exp.logoUrl}
                          alt={exp.institution}
                          loading="lazy"
                          className="max-w-full max-h-full w-auto h-auto object-contain"
                        />
                      </div>
                    )}
                    <span className="text-xs font-mono font-bold text-[#806b47] uppercase bg-[#f0e8dc] px-3.5 py-1.5 rounded-full inline-block group-hover:bg-[#0e1828] group-hover:text-[#faf7f2] transition-colors">
                      {exp.period}
                    </span>
                  </div>
                  <div className="space-y-2 flex-1">
                    <div>
                      <h3 className="text-xl font-bold text-[#0e1828] font-[family-name:var(--font-editorial)] group-hover:text-[#b88a3b] transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-semibold text-[#806b47]">
                        {exp.institution}
                      </p>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4a4235] leading-relaxed pt-1">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Positions of Responsibility on Portfolio */}
            <div className="pt-8 border-t border-[#dfd6c6] space-y-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#806b47] font-mono">
                  <span>03.1</span>
                  <span>/</span>
                  <span>Positions of Responsibility</span>
                </div>
                <h3 className="text-2xl font-extrabold text-[#0e1828] font-[family-name:var(--font-editorial)]">
                  Leadership &amp; Community Ownership
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="reveal-scale p-6 rounded-3xl bg-white border border-[#dfd6c6] shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#806b47]">
                    <span>IIM Visakhapatnam</span>
                    <span>Sep 2026–Present</span>
                  </div>
                  <h4 className="text-base font-bold text-[#0e1828] font-[family-name:var(--font-editorial)]">
                    Student Representative — CPAC
                  </h4>
                  <p className="text-xs text-[#4a4235] leading-relaxed">
                    Represented the 60-student PGPMCI batch, partnering with IIMV faculty leadership and placement bodies to surface cohort feedback, unblock placement logistics, and streamline interview readiness.
                  </p>
                </div>

                <div className="reveal-scale p-6 rounded-3xl bg-white border border-[#dfd6c6] shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#806b47]">
                    <span>IIITDM Kurnool</span>
                    <span>2024–2025</span>
                  </div>
                  <h4 className="text-base font-bold text-[#0e1828] font-[family-name:var(--font-editorial)]">
                    Co-Speaker &amp; ML Mentor — GDC
                  </h4>
                  <p className="text-xs text-[#4a4235] leading-relaxed">
                    Delivered structured cohorts taking 50+ junior students from Intro to Intermediate ML, mentoring teams to ship live ML projects to GitHub with starter CI/CD pipelines.
                  </p>
                </div>

                <div className="reveal-scale p-6 rounded-3xl bg-white border border-[#dfd6c6] shadow-2xs space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#806b47]">
                    <span>IIITDM Kurnool</span>
                    <span>2025</span>
                  </div>
                  <h4 className="text-base font-bold text-[#0e1828] font-[family-name:var(--font-editorial)]">
                    Event Management Lead — Solasta 2025
                  </h4>
                  <p className="text-xs text-[#4a4235] leading-relaxed">
                    Directed end-to-end event operations, stage schedules, and sponsor deliverable execution for 150+ student participants across IIITDMK&apos;s annual techno-cultural fest, aligning organizing committees and partner sponsors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. PRODUCT OPERATING SYSTEM & CAPABILITY STACK */}
        <section
          id="tools"
          className="reveal-on-scroll scroll-mt-16 relative w-full max-w-[1240px] mx-auto px-6 lg:px-12 py-24 border-b border-[#dfd6c6] overflow-hidden"
        >
          {/* Deep Background Parallax Watermark */}
          <div
            aria-hidden="true"
            className="parallax-watermark pointer-events-none select-none absolute top-6 right-4 lg:right-10 text-[130px] sm:text-[190px] font-extrabold font-[family-name:var(--font-editorial)] text-[#0e1828]/[0.035] leading-none z-0"
          >
            04
          </div>

          <div className="relative z-10 space-y-14">
            {/* Section Header */}
            <div
              className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#806b47] font-mono">
                  <span>04</span>
                  <span>/</span>
                  <span>Product Playbook &amp; Stack</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1828] tracking-tight font-[family-name:var(--font-editorial)]">
                  The Product Operating System.
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#554d42] max-w-md leading-relaxed">
                My four-stage execution loop from raw user friction to shipped product, paired with the domain stack I use every day.
              </p>
            </div>

            {/* PART 1: 4-Stage End-to-End Product Execution Loop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 reveal-stagger">
              {PRODUCT_EXECUTION_LOOP.map((item, idx) => {
                return (
                  <div
                    key={item.step}
                    className="reveal-scale think-card relative flex flex-col justify-between rounded-3xl bg-[#ffffff] border border-[#dfd6c6] p-6 shadow-2xs"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-[#efe7da] pb-3">
                        <span className="px-2.5 py-1 rounded-full bg-[#0e1828] text-[#e5b869] font-mono text-[10px] font-bold tracking-wider">
                          {item.step}
                        </span>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#806b47] font-semibold">
                          {item.subtitle}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-[#0e1828] font-[family-name:var(--font-editorial)]">
                          {item.phase}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-[#4a4235] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      {/* Key Artifacts */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.deliverables.map((deliv) => (
                          <span
                            key={deliv}
                            className="px-2.5 py-1 rounded-lg bg-[#f6f1e7] border border-[#e3d9c8] text-[11px] font-semibold text-[#2c3545]"
                          >
                            {deliv}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stage Decision Rule */}
                    <div className="mt-5 pt-3.5 border-t border-dashed border-[#dfd6c6] flex items-start gap-2">
                      <span className="text-[#b88a3b] text-xs font-bold mt-0.5">✦</span>
                      <p className="text-[11.5px] italic text-[#5c5243] leading-snug">
                        {item.rule}
                      </p>
                    </div>

                    {/* Subtle step connector badge on desktop */}
                    {idx < PRODUCT_EXECUTION_LOOP.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-[#faf7f2] border border-[#dfd6c6] text-[#806b47] items-center justify-center text-xs font-bold shadow-2xs"
                      >
                        →
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* PART 2: Signature PM Operating Principles (3-Column Executive Strip) */}
            <div
              data-parallax-speed="0.045"
              className="reveal-showcase rounded-3xl bg-[#0e1828] text-[#faf7f2] p-6 sm:p-8 border border-[#b88a3b]/40 shadow-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 mb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#e5b869]" />
                  <span className="text-xs font-mono uppercase tracking-[0.14em] text-[#e5b869] font-bold">
                    Core Product Tenets
                  </span>
                </div>
                <span className="text-xs text-[#9ba8bc] font-mono">
                  Decision rules when roadmap trade-offs get hard
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PM_OPERATING_PRINCIPLES.map((prin) => (
                  <div
                    key={prin.tag}
                    className="space-y-2 md:border-r md:last:border-r-0 border-white/10 md:pr-5 md:last:pr-0"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#d8ab5b] font-bold block">
                      {prin.tag}
                    </span>
                    <h4 className="text-base font-bold text-[#faf7f2] leading-snug">
                      {prin.title}
                    </h4>
                    <p className="text-xs text-[#cbd5e1] leading-relaxed">
                      {prin.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* PART 3: 4-Domain Capability & Technical Stack */}
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-[#0e1828] font-[family-name:var(--font-editorial)]">
                  Capabilities &amp; Technical Stack
                </h3>
                <span className="text-xs font-mono uppercase tracking-wider text-[#806b47] hidden sm:inline">
                  Organized by Product Domain
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {CAPABILITY_DOMAINS.map((domain, idx) => {
                  const capSpeeds = ['-0.05', '-0.015', '0.025', '0.06'];
                  return (
                    <div
                      key={domain.category}
                      data-parallax-speed={capSpeeds[idx] || '0.02'}
                      className="reveal-showcase rounded-2xl bg-[#f5efe4] border border-[#dfd6c6] p-5 space-y-3.5"
                    >
                      <div className="flex items-center gap-2.5 border-b border-[#e2d8c7] pb-2.5">
                        <span className="material-symbols-outlined text-[18px] text-[#806b47]">
                          {domain.icon}
                        </span>
                        <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#0e1828]">
                          {domain.category}
                        </h4>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {domain.items.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-lg bg-[#ffffff] hover:bg-[#0e1828] hover:text-[#faf7f2] transition-colors text-xs font-medium text-[#121820] border border-[#dfd6c6] cursor-default"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 6. CONTACT FOOTER */}
        <footer
          id="connect"
          className="reveal-on-scroll scroll-mt-16 relative w-full rounded-t-[3rem] md:rounded-t-[4.5rem] bg-[#0e1828] text-[#faf7f2] border-t border-[#b88a3b]/30 pt-24 pb-12 overflow-hidden shadow-2xl"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[#b88a3b]/10 to-transparent pointer-events-none" />

          <div className="max-w-[1000px] mx-auto px-6 lg:px-12 text-center space-y-7 relative z-10">
            {/* Reach out anytime */}
            <div className="flex items-center justify-center gap-3">
              <span className="w-10 h-[1px] bg-[#b88a3b]/50"></span>
              <span className="font-[family-name:var(--font-signature)] italic text-[#c99b4a] text-xl sm:text-2xl">
                Reach out anytime
              </span>
              <span className="w-10 h-[1px] bg-[#b88a3b]/50"></span>
            </div>

            {/* Let's Build Something Exceptional */}
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#faf7f2] font-[family-name:var(--font-editorial)]">
              Let&apos;s Build{' '}
              <span className="font-[family-name:var(--font-signature)] italic font-normal text-[#c99b4a]">
                Exceptional Things.
              </span>
            </h2>

            {/* Subhead */}
            <p className="text-sm sm:text-base text-[#d4c8b6] max-w-md mx-auto leading-relaxed">
              Have an APM / Product role, a zero-to-one problem, or a debate on AI unit economics? My inbox is always open.
            </p>

            {/* Action buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
              <button
                type="button"
                data-cursor="Copy Email"
                onClick={handleCopyEmail}
                className="btn-shimmer px-7 py-3.5 rounded-full bg-[#faf7f2] hover:bg-white text-[#0e1828] shadow-md transition-all cursor-pointer font-medium hover:scale-105 active:scale-95 border border-[#dfd6c6]"
              >
                kiccha1703@gmail.com
              </button>

              <button
                type="button"
                data-cursor="View Resume"
                onClick={() => setShowResumeModal(true)}
                className="btn-shimmer px-7 py-3.5 rounded-full bg-[#b88a3b] hover:bg-[#c99b4a] text-[#0e1828] border border-[#b88a3b] shadow-md transition-all cursor-pointer font-bold hover:scale-105 active:scale-95 inline-flex items-center gap-1.5"
              >
                <span>View Resume</span>
                <span className="material-symbols-outlined text-[15px]">
                  north_east
                </span>
              </button>
            </div>

            {/* Secondary links */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-[#c4b7a2]">
              <a
                className="hover:text-[#faf7f2] transition-colors inline-flex items-center gap-1"
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Open LinkedIn"
              >
                <span>LinkedIn</span>
                <span className="material-symbols-outlined text-[13px]">
                  north_east
                </span>
              </a>
              <a
                className="hover:text-[#faf7f2] transition-colors inline-flex items-center gap-1"
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Open GitHub"
              >
                <span>GitHub</span>
                <span className="material-symbols-outlined text-[13px]">
                  north_east
                </span>
              </a>
              <a
                className="hover:text-[#faf7f2] transition-colors inline-flex items-center gap-1"
                href="tel:+919003762619"
                data-cursor="Call Phone"
              >
                <span>+91 90037 62619</span>
              </a>
            </div>

            {/* Divider line & Copyright */}
            <div className="pt-16 border-t border-[#b88a3b]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a39580]">
              <p>
                © 2026 Krishnamurthi. Dual Pedigree: IIM Visakhapatnam (MBA) × IIITDM Kurnool (B.Tech CSE).
              </p>
              <button
                type="button"
                data-cursor="Back to Top"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-1 text-[#c4b7a2] hover:text-[#faf7f2] transition-colors cursor-pointer"
              >
                <span>Back to top</span>
                <span className="material-symbols-outlined text-[14px]">
                  arrow_upward
                </span>
              </button>
            </div>
          </div>
        </footer>
      </main>

      {/* Case Study Deep-Dive Modal */}
      <CaseStudyModal
        activeKey={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
        onSelectKey={(key) => setActiveCaseStudy(key)}
      />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={showResumeModal}
        onClose={() => setShowResumeModal(false)}
      />
    </div>
  );
}
