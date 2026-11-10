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
  category: 'teardowns' | 'systems';
  title: string;
  subtitle: string;
  problem: string;
  judgmentCalls: string;
  outcome: string;
  techTags: string[];
  standaloneUrl: string;
  pdfUrl?: string;
  workspaceUrl?: string;
  githubUrl?: string;
  prototypeUrl?: string;
}

const PROJECTS_WORK: ProjectWorkItem[] = [
  {
    id: 'openai',
    tag: 'AI PRODUCT MANAGEMENT CASE STUDY',
    badge: 'OPENAI IN-HOUSE DATA AGENT',
    category: 'teardowns',
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
    workspaceUrl: '/teardown-comet.html',
  },
  {
    id: 'lending',
    tag: 'FINTECH COMPARATIVE TEARDOWN',
    badge: 'KREDITBEE × PHONEPE',
    category: 'teardowns',
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
    workspaceUrl: '/teardown-kreditbee.html',
  },
  {
    id: 'flowlens',
    tag: 'AI WORKFLOW ENGINE CASE STUDY',
    badge: 'SHOPIFY FLOWLENS',
    category: 'systems',
    title: 'FlowLens: Preflight Workflow Validator & Simulation Engine for Shopify Flow',
    subtitle: 'Read-only preflight analyzer inspecting .flow schemas to flag ISO-2 country code mismatches, pre-Wait data discards, and cycle hazards before workflows mutate orders.',
    problem:
      'Shopify disclosed fine-tuned Sidekick workflow generation had a 35% lower production activation rate due to condition schema mismatches (16%) and missing parameters (25%), causing silent automation failures.',
    judgmentCalls:
      'Pivoted from unreachable live execution trace API (Path A) to an offline read-only .flow JSON analyzer (Path B). Established 5 deterministic AST linting rules (L-01 to L-05) grounded in official Shopify docs.',
    outcome:
      '100% AST rule coverage on test benchmarks with <100ms client-side parse time; zero unauthorized store mutation with reviewable JSON remediation diffs.',
    techTags: ['Shopify Flow', 'AST Static Analysis', 'GraphQL Schema', 'DAG Simulation', 'Deterministic Linter', 'Liquid Syntax'],
    standaloneUrl: '/projects/shopify-flow-lens.html',
    githubUrl: 'https://github.com/krishnamurthi-ramesh/Shopify-Flow-Lens',
    prototypeUrl: 'https://shopify-flowlens.vercel.app',
  },
  {
    id: 'costoptimizer',
    tag: 'AI INFERENCE UNIT ECONOMICS & PRD MEMO',
    badge: 'AI COST OPTIMIZER',
    category: 'systems',
    title: 'AI Cost Optimizer: Semantic Cascading Router & Dynamic Model Tiering',
    subtitle: 'Intelligent inference proxy with confidence-gated fallback architecture protecting SaaS gross margins from the variable token COGS trap.',
    problem:
      'Monolithic frontier model routing (Claude 3.5 Sonnet / GPT-4o) degrades SaaS gross margins from 85% to 54.3% at 100k DAU ($137k/mo) despite 78% of queries being low-entropy tasks.',
    judgmentCalls:
      'Architected a drop-in OpenAI/Anthropic API proxy with <80ms semantic complexity classifier. Routed 78% of queries to SLMs ($0.00078/q) with token entropy fallback and 35% prompt prefix cache reuse.',
    outcome:
      'Validated across 32 Monte Carlo permutations: saves $91,564/month (-66.8% COGS), cuts P95 latency by 57.1% (1.20s), and expands gross margins from 54.3% to 84.8% at 99.2% quality parity.',
    techTags: ['Unit Economics', 'Cascading Router', 'Gemini 2.5 Flash', 'Claude 3.5 Sonnet', 'Prompt Caching', 'Monte Carlo Sim'],
    standaloneUrl: '/projects/ai-cost-optimizer.html',
    githubUrl: 'https://github.com/krishnamurthi-ramesh/AI-Cost-Optimizer',
    prototypeUrl: 'https://ai-cost-optimizer-iota.vercel.app',
  },
  {
    id: 'evalharness',
    tag: 'AI QUALITY BENCHMARK & EVAL HARNESS',
    badge: 'PERPLEXITY EVAL HARNESS',
    category: 'systems',
    title: 'Perplexity AI Quality Eval Harness & Trust Guardrails',
    subtitle: 'Systematic quality evaluation framework measuring 7 quality dimensions across 151 production queries, diagnosing citation hallucinations and establishing CI/CD regression gates.',
    problem:
      'Generative search retention suffers from authoritative hallucination: 26.2% of citations across complex queries return dead 404s, link to generic homepages, or contradict claimed metrics.',
    judgmentCalls:
      'Curated 151 golden test cases across 10 categories. Built a 7-dimension scoring rubric with hard veto on safety and source fabrication. Decoupled judge to prevent circular vendor evaluation bias.',
    outcome:
      'Deployed interactive public benchmark on Tableau Public; defined P0 pre-render citation verification to cut error rates to <8% and automated weekly PR regression gates.',
    techTags: ['LLM Evaluation', 'Tableau Public', 'Citation Grounding', 'Golden Dataset', 'LLM-as-Judge', 'Regression Testing'],
    standaloneUrl: '/projects/eval-harness.html',
    githubUrl: 'https://github.com/krishnamurthi-ramesh/AgentEval-Studio',
    prototypeUrl: 'https://public.tableau.com/views/PerplexityAIQualityEvaluationHarness/PerplexityAIQualityEvaluationHarness?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
  },
  {
    id: 'rag',
    tag: 'ENTERPRISE AI ARCHITECTURE',
    badge: 'ENTERPRISE RAG SYSTEM',
    category: 'systems',
    title: 'Enterprise RAG System with Quantitative Evaluation Harness',
    subtitle: 'Production-grade local RAG pipeline with statistical evaluation harness (Ragas, Recall@K, Context Precision) and sub-second P99 latency within containerized Docker clusters.',
    problem:
      'Enterprise customer support and internal IP require strict data privacy guarantees that third-party cloud LLM APIs cannot provide due to sovereign data retention policies and unpredictable latency.',
    judgmentCalls:
      'Chose zero-leak local inference (Ollama + FAISS) in private Docker clusters over cloud APIs. Designed statistical eval suites (Context Precision, Recall@K, Ragas Faithfulness) and enforced source citation markers before generation.',
    outcome:
      'Validated 380ms P99 retrieval latency, 0.91 Ragas faithfulness, and 0.88 Recall@K across enterprise doc corpuses with zero sensitive customer data leaving network boundaries.',
    techTags: ['Local LLMs', 'Docker', 'FAISS', 'Ollama', 'Ragas Framework', 'Enterprise Privacy'],
    standaloneUrl: '/projects/enterprise-rag.html',
    githubUrl: 'https://github.com/krishnamurthi-ramesh/enterprise-rag-system',
  },
  {
    id: 'vlm',
    tag: 'AI RESEARCH & STATISTICAL SAFETY',
    badge: 'ACTIVE CONFORMAL CONTROL',
    category: 'systems',
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
  {
    id: 'karam',
    tag: 'B2B SAAS PRODUCT SPEC',
    badge: 'MERAQUI (KARAM.AI)',
    category: 'systems',
    title: 'AI Candidate Matching Engine & Deterministic ERP Sync Contracts',
    subtitle: 'Owned the requirements-to-shipping loop for candidate matching feature (+15% precision lift) and replaced conversational bot with deterministic REST API contracts for ERP sync.',
    problem:
      'Recruiters spent 15+ hours weekly dealing with asynchronous conversational bot drop-offs and manual candidate entry, causing high error rates and CRM sync inconsistencies.',
    judgmentCalls:
      'Shadowed 10+ enterprise recruiters to identify failure points. Replaced ambiguous conversational bot with deterministic REST API contracts with schema validation and hybrid vector-keyword candidate scoring.',
    outcome:
      'Delivered +15% precision lift in candidate matching, saved 15 recruiter hours weekly, and reduced downstream ERP data inconsistencies by 12–15%.',
    techTags: ['B2B SaaS', 'API Contracts', 'Candidate Matching', 'ERP Sync', 'Recruiter Shadowing', 'Hybrid Search'],
    standaloneUrl: '/projects/meraqui-karam.html',
    prototypeUrl: '/artifact-meraqui.html',
  },
  {
    id: 'treacle',
    tag: 'DISTRIBUTED TELEMETRY & PIPELINES',
    badge: 'TREACLE TECHNOLOGIES',
    category: 'systems',
    title: 'Distributed Incident Monitoring & Real-Time Log Pipeline',
    subtitle: 'Specified and built monitoring dashboards (Grafana, Elasticsearch) that cut incident detection time by 40% and scaled data pipelines processing 100k+ logs/day.',
    problem:
      'Operations teams struggled with delayed incident detection and fragmented observability across microservices, averaging 45+ minutes to diagnose critical service disruptions.',
    judgmentCalls:
      'Consolidated log ingestion into automated Dockerized pipelines feeding an Elasticsearch cluster. Engineered Grafana dashboards with dynamic alerting thresholds based on moving average baselines.',
    outcome:
      'Cut incident detection time by 40%, supported 100k+ daily logs with zero pipeline backpressure, and achieved 99.9% telemetry uptime.',
    techTags: ['Grafana', 'Elasticsearch', 'Docker', 'Log Pipelines', 'Incident Detection', 'Distributed Telemetry'],
    standaloneUrl: '/projects/treacle-technologies.html',
  },
];

const EXPERIENCES = [
  {
    period: '2025–2027',
    role: 'MBA Candidate',
    institution: 'Indian Institute of Management Visakhapatnam',
    description:
      'Specializing in Product Strategy, Technology Commercialization, Operations Analytics, and Quantitative Decision Sciences. Conducting case research on AI product telemetry and SaaS unit economics.',
  },
  {
    period: 'Jan 2026–Jul 2026',
    role: 'Research Intern — Classical Epistemology & Logic',
    institution: 'IIITDM Kurnool • Kurnool, India',
    description:
      '“Nyaya Shastra for Computer Science Engineers”: Applied classical Indian Nyaya dialectical reasoning and epistemology to modern computer science algorithms and formal system verification.',
    certificateUrl: '/nyaya-internship-certificate.pdf',
    certificateLabel: 'Verified Certificate',
  },
  {
    period: 'Apr 2025–Jul 2025',
    role: 'Data Science & Technical Product Intern',
    institution: 'Meraqui Ventures Pvt. Ltd. (karam.ai) • Pune, India',
    description:
      'Owned the requirements-to-shipping loop for candidate matching feature (+15% precision lift). Shadowed recruiters to replace conversational bot with deterministic REST API contracts for ERP sync, saving 15 recruiter hours weekly and cutting data inconsistencies by 12–15%.',
  },
  {
    period: 'Jun 2024–Aug 2024',
    role: 'Development Engineering Intern',
    institution: 'Treacle Technologies (Incubated at IIT Kanpur) • Kanpur, India',
    description:
      'Specified and built monitoring dashboards (Grafana, Elasticsearch) that cut incident detection time by 40%. Scaled real-time data pipelines processing 100k+ logs/day with custom evaluation metrics and automated Docker workflows.',
  },
  {
    period: '2022–2026',
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
  const [activeFilter, setActiveFilter] = useState<'all' | 'teardowns' | 'systems'>('all');
  const [showCopyToast, setShowCopyToast] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [heroWordIndex, setHeroWordIndex] = useState(0);

  // Hash listener for direct teardown links (#openai, #notion, #comet, #lending, #flowlens, #costoptimizer, #evalharness)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'openai' || hash === 'teardown-openai') setActiveCaseStudy('openai');
      else if (hash === 'notion' || hash === 'teardown-notion') setActiveCaseStudy('notion');
      else if (hash === 'comet' || hash === 'teardown-comet') setActiveCaseStudy('comet');
      else if (hash === 'lending' || hash === 'teardown-lending') setActiveCaseStudy('lending');
      else if (hash === 'flowlens' || hash === 'shopify-flow-lens') setActiveCaseStudy('flowlens');
      else if (hash === 'costoptimizer' || hash === 'ai-cost-optimizer') setActiveCaseStudy('costoptimizer');
      else if (hash === 'evalharness' || hash === 'eval-harness') setActiveCaseStudy('evalharness');
      else if (hash === 'rag' || hash === 'enterprise-rag') setActiveCaseStudy('rag');
      else if (hash === 'vlm' || hash === 'active-conformal-control') setActiveCaseStudy('vlm');
      else if (hash === 'karam' || hash === 'meraqui-karam') setActiveCaseStudy('karam');
      else if (hash === 'treacle' || hash === 'treacle-technologies') setActiveCaseStudy('treacle');
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

    document.body.classList.add('has-custom-cursor');

    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.35;
    let currentX = targetX;
    let currentY = targetY;
    let cursorRafId = 0;
    let isMoving = false;

    if (cursorLensRef.current) {
      cursorLensRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-5px, -4px)`;
    }

    const tickCursor = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      currentX += dx * 0.45;
      currentY += dy * 0.45;

      if (cursorLensRef.current) {
        cursorLensRef.current.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0) translate(-5px, -4px)`;
      }

      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        cursorRafId = window.requestAnimationFrame(tickCursor);
      } else {
        isMoving = false;
      }
    };

    const isInteractiveTarget = (target: EventTarget | null): boolean => {
      if (!(target instanceof HTMLElement)) return false;
      return Boolean(
        target.closest(
          'a, button, [role="button"], [data-cursor], .project-card-interactive, .pm-artifact-card'
        )
      );
    };

    const onPointerMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (cursorLensRef.current) {
        cursorLensRef.current.style.opacity = '1';
      }

      if (isInteractiveTarget(e.target)) {
        cursorLensRef.current?.classList.add('is-active');
      } else {
        cursorLensRef.current?.classList.remove('is-active');
      }

      if (!isMoving) {
        isMoving = true;
        cursorRafId = window.requestAnimationFrame(tickCursor);
      }
    };

    const onPointerDown = () => {
      cursorLensRef.current?.classList.add('is-pressed');
    };

    const onPointerUp = () => {
      cursorLensRef.current?.classList.remove('is-pressed');
    };

    const onPointerLeave = () => {
      if (cursorLensRef.current) cursorLensRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mousedown', onPointerDown, { passive: true });
    window.addEventListener('mouseup', onPointerUp, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave, { passive: true });

    return () => {
      document.body.classList.remove('has-custom-cursor');
      if (cursorRafId) window.cancelAnimationFrame(cursorRafId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
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
            <span className="hidden min-[420px]:block font-bold tracking-tight text-[#0e1828] text-sm leading-none font-serif">
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

            {/* Direct Resume Action in Navbar */}
            <button
              type="button"
              data-cursor="View Resume"
              onClick={() => setShowResumeModal(true)}
              className="nav-link-animated text-[#554d42] hover:text-[#0e1828] transition-colors py-1 px-2 sm:px-2.5 rounded-full cursor-pointer font-medium"
            >
              Résumé
            </button>
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
              {/* Identity & Pedigree Pill */}
              <div
                style={{ '--entrance-delay': '0.04s' } as React.CSSProperties}
                className="hero-entrance-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#faf7f2]/10 backdrop-blur-md border border-[#b88a3b]/40 text-[#f0c46c] text-[11px] font-mono tracking-wider font-semibold uppercase mb-3.5 shadow-[0_4px_16px_rgba(4,8,16,0.5)]"
              >
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
                <span>APM × AI Systems</span>
                <span className="text-[#b88a3b]/60">•</span>
                <span className="text-[#faf7f2]/90">IIMV (MBA) × IIITDMK (CSE)</span>
              </div>

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
                  <span>Product Teardowns &amp; AI Systems</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e1828] tracking-tight font-[family-name:var(--font-editorial)]">
                  Teardowns &amp; Flagship Projects
                </h2>
                <p className="text-sm sm:text-base text-[#554d42] max-w-xl">
                  Deep reverse engineering, funnel friction diagnostics, and AI unit economics — structured by core problem framing, PM judgment calls, and measurable outcomes.
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
                  data-cursor="Filter AI Systems"
                  onClick={() => setActiveFilter('systems')}
                  className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                    activeFilter === 'systems'
                      ? 'bg-[#0e1828] text-[#faf7f2] shadow-xs'
                      : 'text-[#554d42] hover:text-[#0e1828]'
                  }`}
                >
                  AI Product Systems &amp; Projects ({PROJECTS_WORK.filter((p) => p.category === 'systems').length})
                </button>
              </div>
            </div>

            {/* Project Showcases with Scale & Glow Reveal */}
            <div className="space-y-10">
              {filteredProjects.map((item, idx) => (
                <article
                  key={item.id}
                  data-cursor="View Project"
                  onClick={() => setActiveCaseStudy(item.id)}
                  className="reveal-scale reveal-glow project-card-interactive rounded-3xl bg-[#ffffff] border border-[#dfd6c6] shadow-[0_6px_28px_rgba(14,24,40,0.05)] overflow-hidden group"
                >
                  <div
                    className="p-7 sm:p-9 space-y-6"
                  >
                    {/* Card Header (Plane 1) */}
                    <div
                      className="flex flex-wrap items-center justify-between gap-3 border-b border-[#dfd6c6]/60 pb-4"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-[#b88a3b]">
                          0{idx + 1}.
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[#0e1828] text-[#faf7f2] font-mono text-[11px] font-bold tracking-wider uppercase group-hover:bg-[#b88a3b] group-hover:text-[#0e1828] transition-colors">
                          {item.badge}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#806b47]">
                          {item.tag}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCaseStudy(item.id);
                          }}
                          className="card-expand-badge flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#dfd6c6] text-xs font-semibold text-[#554d42] hover:bg-[#0e1828] hover:text-[#faf7f2] transition-all cursor-pointer"
                        >
                          <span>Interactive Teardown</span>
                          <span className="material-symbols-outlined text-[14px] group-hover:translate-x-0.5 transition-transform">
                            visibility
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="space-y-2">
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#0e1828] tracking-tight font-[family-name:var(--font-editorial)] group-hover:text-[#b88a3b] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#554d42] leading-relaxed">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* 3-Part Column Grid (Problem from left, Outcome from right) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                      {/* Problem */}
                      <div
                        className="reveal-slide-left p-5 rounded-2xl bg-[#faf7f2] border border-[#dfd6c6] space-y-2 group-hover:border-[#dfd6c6]/80 transition-colors"
                      >
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#806b47]">
                          Problem Framing
                        </h4>
                        <p className="text-xs sm:text-sm text-[#4a4235] leading-relaxed">
                          {item.problem}
                        </p>
                      </div>

                      {/* Judgment calls */}
                      <div
                        className="reveal-on-scroll p-5 rounded-2xl bg-[#faf7f2] border border-[#dfd6c6] space-y-2 group-hover:border-[#dfd6c6]/80 transition-colors"
                      >
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0e1828]">
                          PM Judgment Calls
                        </h4>
                        <p className="text-xs sm:text-sm text-[#4a4235] leading-relaxed">
                          {item.judgmentCalls}
                        </p>
                      </div>

                      {/* Outcome */}
                      <div
                        className="reveal-slide-right p-5 rounded-2xl bg-[#f0e8dc] border border-[#dfd6c6] space-y-2 group-hover:border-[#b88a3b]/40 transition-colors"
                      >
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0e1828]">
                          Quantitative Outcome
                        </h4>
                        <p className="text-xs sm:text-sm text-[#4a4235] leading-relaxed font-medium">
                          {item.outcome}
                        </p>
                      </div>
                    </div>

                    {/* Tech stack tags & Action Row */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#dfd6c6]/50">
                      <div className="flex flex-wrap items-center gap-2">
                        {item.techTags.map((tag) => (
                          <span
                            key={tag}
                            className="card-tech-tag px-3 py-1 rounded-full bg-[#f0e8dc] text-[11px] font-semibold text-[#554d42] transition-colors duration-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCaseStudy(item.id);
                          }}
                          className="px-4 py-2 rounded-full bg-[#0e1828] hover:bg-[#1a2942] text-[#faf7f2] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                        >
                          <span>Interactive Breakdown</span>
                          <span className="material-symbols-outlined text-[14px]">visibility</span>
                        </button>
                        <a
                          href={item.standaloneUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-3.5 py-2 rounded-full bg-[#f0e8dc] hover:bg-[#e6dcce] text-[#0e1828] border border-[#dfd6c6] text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                        >
                          <span>Full Page</span>
                          <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                        </a>
                        {item.prototypeUrl && (
                          <a
                            href={item.prototypeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-3.5 py-2 rounded-full bg-[#faf7f2] hover:bg-[#f0e8dc] text-[#0e1828] border border-[#dfd6c6] text-xs font-semibold inline-flex items-center gap-1 transition-colors shadow-2xs"
                          >
                            <span>Live Tool</span>
                            <span className="material-symbols-outlined text-[13px]">rocket_launch</span>
                          </a>
                        )}
                        {item.githubUrl && (
                          <a
                            href={item.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-3.5 py-2 rounded-full bg-white hover:bg-[#0e1828] text-[#0e1828] hover:text-[#faf7f2] border border-[#dfd6c6] text-xs font-semibold inline-flex items-center gap-1 transition-colors shadow-2xs"
                          >
                            <span>GitHub</span>
                            <span className="material-symbols-outlined text-[13px]">code</span>
                          </a>
                        )}
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
                        {item.workspaceUrl && (
                          <a
                            href={item.workspaceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-3.5 py-2 rounded-full bg-white hover:bg-[#f0e8dc] text-[#806b47] border border-[#dfd6c6] text-xs font-semibold inline-flex items-center gap-1 transition-colors shadow-2xs"
                          >
                            <span>Interactive Workspace</span>
                            <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
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
                  <div className="md:w-52 shrink-0">
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
                    {exp.certificateUrl && (
                      <div className="pt-2">
                        <a
                          href={exp.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="Certificate"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f0e8dc] hover:bg-[#0e1828] text-[#806b47] hover:text-[#faf7f2] transition-colors text-xs font-semibold border border-[#dfd6c6] shadow-2xs"
                        >
                          <span className="material-symbols-outlined text-[14px] text-[#b88a3b]">verified</span>
                          <span>{exp.certificateLabel || 'View Certificate'}</span>
                          <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
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
