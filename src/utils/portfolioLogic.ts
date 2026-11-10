export type CaseStudyKey =
  | 'openai'
  | 'notion'
  | 'comet'
  | 'lending'
  | 'flowlens'
  | 'costoptimizer'
  | 'evalharness'
  | 'rag'
  | 'vlm'
  | 'karam'
  | 'treacle';

export type SimulatorOptionKey = 'A' | 'B';

export interface CaseStudyMetric {
  label: string;
  value: string;
  description: string;
  colorScheme: 'gold' | 'navy' | 'emerald' | 'amber';
}

export interface CaseStudyRecord {
  key: CaseStudyKey;
  tag: string;
  meta: string;
  badgeText: string;
  badgeIcon?: string;
  badgeTone: 'gold' | 'navy' | 'emerald' | 'amber';
  dateRange: string;
  domainSubtitle: string;
  headline: string;
  roleDescription: string;
  category: 'teardown' | 'project';
  standaloneUrl: string;
  pdfUrl?: string;
  githubUrl?: string;
  prototypeUrl?: string;
  metrics: CaseStudyMetric[];
}

export const STUDY_KEYS: CaseStudyKey[] = [
  'openai',
  'notion',
  'comet',
  'lending',
  'flowlens',
  'costoptimizer',
  'evalharness',
  'rag',
  'vlm',
  'karam',
  'treacle',
];

export const CASE_STUDIES: Record<CaseStudyKey, CaseStudyRecord> = {
  openai: {
    key: 'openai',
    tag: '01 / AI PRODUCT MANAGEMENT CASE STUDY',
    meta: '13-Page Deep Dive • Jan 2026',
    badgeText: 'OPENAI IN-HOUSE DATA AGENT',
    badgeTone: 'navy',
    dateRange: '2026',
    domainSubtitle: 'Enterprise Autonomous Data Agents',
    headline: 'Inside OpenAI’s In-House Data Agent: Context-First Architecture Across 70,000 Datasets',
    roleDescription:
      'Architectural teardown of how layered context pipelines (codebase Git crawler, Slack/Docs institutional memory, pass-through RBAC) turn vague natural-language questions into verifiable SQL insights for 3,500+ employees across 600 PB.',
    category: 'teardown',
    standaloneUrl: '/teardowns/openai-data-agent.html',
    pdfUrl: '/teardowns/openai-data-agent-case-study.pdf',
    metrics: [
      {
        label: 'DATASET REACH',
        value: '70,000+',
        description: 'Tables queried with zero manual schema mapping',
        colorScheme: 'gold',
      },
      {
        label: 'QUERY ACCELERATION',
        value: '17×',
        description: 'Faster execution via memory-cached corrections',
        colorScheme: 'emerald',
      },
      {
        label: 'PLATFORM SCALE',
        value: '600 PB',
        description: 'Internal data lake analyzed with strict pass-through RBAC',
        colorScheme: 'navy',
      },
    ],
  },
  notion: {
    key: 'notion',
    tag: '02 / AI PRICING & ROUTING TEARDOWN',
    meta: '17-Page Deep Dive • Nov 2026',
    badgeText: 'NOTION AGENTS',
    badgeTone: 'gold',
    dateRange: '2026',
    domainSubtitle: 'AI Economics & Multi-Model Routing',
    headline: 'Notion Agents: Doing More for Less — Pricing, Routing & Cost Control',
    roleDescription:
      'Analysis of Notion’s dynamic model routing (Claude 3.5 Sonnet to Haiku/GPT-4o mini) and 3-tier compute credit rate card (5/10/20 credits). Diagnosed the critical vulnerability of runaway spend on unattended 24-hour agent runs and designed run-level budget envelopes.',
    category: 'teardown',
    standaloneUrl: '/teardowns/notion-agents.html',
    pdfUrl: '/teardowns/notion-agents-teardown.pdf',
    metrics: [
      {
        label: 'CREDIT CURRENCY',
        value: '$10 / 1k',
        description: 'Standardized unit compute token rate',
        colorScheme: 'navy',
      },
      {
        label: 'ROUTING TIERS',
        value: '5 / 10 / 20',
        description: 'Discrete task costs across frontier models',
        colorScheme: 'gold',
      },
      {
        label: 'DIAGNOSED FLAW',
        value: 'Open Flank',
        description: 'Lack of run-level budget ceilings on 24hr agents',
        colorScheme: 'amber',
      },
    ],
  },
  comet: {
    key: 'comet',
    tag: '03 / E-COMMERCE AI TEARDOWN',
    meta: 'Discovery Teardown & Friction Analysis • 2026',
    badgeText: 'COMET AI SEARCH',
    badgeTone: 'emerald',
    dateRange: '2026',
    domainSubtitle: 'Conversational Commerce & PDP Conversion',
    headline: 'Comet (E-commerce AI Search) — Teardown & Friction Analysis',
    roleDescription:
      'Reverse-engineered Comet’s conversational AI "Finder" discovery flow to diagnose drop-off friction between recommendation generation and PDP conversion. Proposed a context-aware conversational memory solution carrying size/fit parameters across sessions to reduce cart abandonment.',
    category: 'teardown',
    standaloneUrl: '/teardowns/comet.html',
    prototypeUrl: 'https://relay-define-38337038.figma.site/',
    metrics: [
      {
        label: 'TARGET LIFT',
        value: '+22%',
        description: 'Finder-assisted add-to-cart conversion rate',
        colorScheme: 'emerald',
      },
      {
        label: 'DIAGNOSED DROP-OFF',
        value: '42%',
        description: 'Friction between AI chat and PDP variant selection',
        colorScheme: 'amber',
      },
      {
        label: 'USER EFFORT',
        value: '-65%',
        description: 'Eliminated redundant repetitive filter queries',
        colorScheme: 'gold',
      },
    ],
  },
  lending: {
    key: 'lending',
    tag: '04 / FINTECH COMPARATIVE TEARDOWN',
    meta: 'Fintech Diagnostics & Funnel Breakdown • 2026',
    badgeText: 'KREDITBEE × PHONEPE',
    badgeTone: 'amber',
    dateRange: '2026',
    domainSubtitle: 'Digital Lending & KYC Funnels',
    headline: 'KreditBee & PhonePe Lending: Same Category, Two Failure Modes',
    roleDescription:
      'Comparative analysis of structurally distinct conversion bottlenecks across two live digital lending funnels: client-side document OCR failures on KreditBee vs. marketplace trust-continuity breaks during external NBFC partner handoffs on PhonePe.',
    category: 'teardown',
    standaloneUrl: '/teardowns/lending-funnels.html',
    prototypeUrl: 'https://option-delete-93793571.figma.site/',
    metrics: [
      {
        label: 'KYC COMPLETION',
        value: '+24%',
        description: 'Targeted lift in first-session document approval',
        colorScheme: 'emerald',
      },
      {
        label: 'PARTNER HANDOFF',
        value: '-35%',
        description: 'Drop-off reduction via co-branded in-app bridge',
        colorScheme: 'gold',
      },
      {
        label: 'VERIFICATION TIME',
        value: '<15s',
        description: 'Instant client-side feedback on blur and glare',
        colorScheme: 'navy',
      },
    ],
  },
  flowlens: {
    key: 'flowlens',
    tag: '05 / AI WORKFLOW ENGINE CASE STUDY',
    meta: 'Preflight Validator & AST Engine • Nov 2026',
    badgeText: 'SHOPIFY FLOWLENS',
    badgeTone: 'emerald',
    dateRange: '2026',
    domainSubtitle: 'E-Commerce Automation Safety',
    headline: 'FlowLens: Preflight Workflow Validator & Simulation Engine for Shopify Flow',
    roleDescription:
      'Read-only preflight analyzer inspecting .flow schemas to flag ISO-2 country code mismatches, pre-Wait data loss hazards, and self-triggering update loops before automations touch live customer orders.',
    category: 'project',
    standaloneUrl: '/projects/shopify-flow-lens.html',
    githubUrl: 'https://github.com/krishnamurthi-ramesh/Shopify-Flow-Lens',
    prototypeUrl: 'https://shopify-flowlens.vercel.app',
    metrics: [
      {
        label: 'AST RULE COVERAGE',
        value: '100%',
        description: '5 core deterministic linting rules',
        colorScheme: 'emerald',
      },
      {
        label: 'ACTIVATION GAP',
        value: '-35%',
        description: 'Shopify Qwen-32B baseline failure diagnosed',
        colorScheme: 'amber',
      },
      {
        label: 'PARSE LATENCY',
        value: '<100ms',
        description: 'Client-side offline AST DAG analysis',
        colorScheme: 'navy',
      },
    ],
  },
  costoptimizer: {
    key: 'costoptimizer',
    tag: '06 / AI INFERENCE UNIT ECONOMICS',
    meta: 'PRD & Financial Architecture Memo • Nov 2026',
    badgeText: 'AI COST OPTIMIZER',
    badgeTone: 'navy',
    dateRange: '2026',
    domainSubtitle: 'Dynamic Model Routing & Margin Protection',
    headline: 'AI Cost Optimizer: Semantic Cascading Router & Unit Economics',
    roleDescription:
      'Intelligent model tiering proxy (<80ms classifier) routing 78% of queries to SLMs and reserving frontier models for high-entropy multi-step reasoning, protecting SaaS margins from token COGS bleed.',
    category: 'project',
    standaloneUrl: '/projects/ai-cost-optimizer.html',
    githubUrl: 'https://github.com/krishnamurthi-ramesh/AI-Cost-Optimizer',
    prototypeUrl: 'https://ai-cost-optimizer-iota.vercel.app',
    metrics: [
      {
        label: 'MONTHLY SAVINGS',
        value: '$91,564',
        description: '66.8% reduction vs. pure Frontier at 100k DAU',
        colorScheme: 'emerald',
      },
      {
        label: 'GROSS MARGIN',
        value: '84.8%',
        description: '+30.5% margin recovery vs. 54.3% pure Frontier',
        colorScheme: 'gold',
      },
      {
        label: 'LATENCY P95',
        value: '1.20s',
        description: '57.1% faster response time vs. Frontier',
        colorScheme: 'navy',
      },
    ],
  },
  evalharness: {
    key: 'evalharness',
    tag: '07 / AI QUALITY BENCHMARK',
    meta: '151-Case Quality Audit & Regression Gate • Nov 2026',
    badgeText: 'PERPLEXITY EVAL HARNESS',
    badgeTone: 'gold',
    dateRange: '2026',
    domainSubtitle: 'Automated Evaluation & Grounding Guardrails',
    headline: 'Perplexity AI Quality Eval Harness & Trust Guardrails',
    roleDescription:
      'Systematic quality evaluation framework measuring 7 quality dimensions across 151 production queries, diagnosing a 26.2% citation hallucination flaw and implementing deterministic CI/CD regression gates.',
    category: 'project',
    standaloneUrl: '/projects/eval-harness.html',
    githubUrl: 'https://github.com/krishnamurthi-ramesh/AgentEval-Studio',
    prototypeUrl:
      'https://public.tableau.com/views/PerplexityAIQualityEvaluationHarness/PerplexityAIQualityEvaluationHarness?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
    metrics: [
      {
        label: 'BENCHMARK SUITE',
        value: '151 Cases',
        description: '10 diverse query categories evaluated',
        colorScheme: 'gold',
      },
      {
        label: 'CITATION FLAW',
        value: '26.2%',
        description: 'Broken links & hallucinated sources isolated',
        colorScheme: 'amber',
      },
      {
        label: 'CI/CD GATING',
        value: 'P0 Gate',
        description: 'Blocks deploys on >2% citation drop',
        colorScheme: 'emerald',
      },
    ],
  },
  rag: {
    key: 'rag',
    tag: '08 / ENTERPRISE AI ARCHITECTURE',
    meta: 'Local Inference & Statistical Evals • 2026',
    badgeText: 'ENTERPRISE RAG SYSTEM',
    badgeTone: 'navy',
    dateRange: '2026',
    domainSubtitle: 'Private Knowledge Retrieval & Quality Bounds',
    headline: 'Enterprise RAG System with Quantitative Evaluation Harness',
    roleDescription:
      'Production-grade local RAG pipeline with statistical evaluation harness (Ragas, Recall@K, Context Precision) and sub-second P99 latency within containerized Docker clusters, guaranteeing zero sensitive customer data leaves network boundaries.',
    category: 'project',
    standaloneUrl: '/projects/enterprise-rag.html',
    githubUrl: 'https://github.com/krishnamurthi-ramesh/enterprise-rag-system',
    metrics: [
      {
        label: 'P99 LATENCY',
        value: '380ms',
        description: 'Local Docker containerized inference',
        colorScheme: 'emerald',
      },
      {
        label: 'FAITHFULNESS',
        value: '0.91',
        description: 'Ragas statistical ground-truth adherence',
        colorScheme: 'gold',
      },
      {
        label: 'RECALL@K',
        value: '0.88',
        description: 'Top-5 retrieval hit rate across enterprise docs',
        colorScheme: 'navy',
      },
    ],
  },
  vlm: {
    key: 'vlm',
    tag: '09 / AI RESEARCH & STATISTICAL SAFETY',
    meta: 'IEEE Paper in Review • IIITDM Kurnool • 2026',
    badgeText: 'ACTIVE CONFORMAL CONTROL',
    badgeTone: 'gold',
    dateRange: '2026',
    domainSubtitle: 'Quantized Multimodal Systems & Safety Bounds',
    headline: 'Hardware-Aware Safety & Conformal Control for Edge Vision-Language Models',
    roleDescription:
      'Designing non-parametric density-drift estimators (ppDRE) and a two-tier GPU-student / CPU-teacher inference cascade with formal conformal prediction thresholds, balancing latency, accuracy, and unit cost on edge hardware.',
    category: 'project',
    standaloneUrl: '/projects/active-conformal-control.html',
    githubUrl:
      'https://github.com/krishnamurthi-ramesh/Active-Conformal-Control-Navigating-Density-Chasms-in-Quantized-Vision-Language-Systems',
    metrics: [
      {
        label: 'DEFECT PRECISION',
        value: '94.2%',
        description: 'Structural defect detection accuracy',
        colorScheme: 'emerald',
      },
      {
        label: 'EDGE LATENCY',
        value: '480ms',
        description: 'P99 latency cycle on edge hardware',
        colorScheme: 'navy',
      },
      {
        label: 'TOKEN SAVINGS',
        value: '~60%',
        description: 'Reduction in cloud API compute spend',
        colorScheme: 'gold',
      },
    ],
  },
  karam: {
    key: 'karam',
    tag: '10 / B2B SAAS PRODUCT SPEC',
    meta: 'Meraqui Ventures (karam.ai) • Pune, India • 2025',
    badgeText: 'AI CANDIDATE MATCHING & ERP',
    badgeTone: 'emerald',
    dateRange: '2025',
    domainSubtitle: 'Enterprise Recruitment & Deterministic Integrations',
    headline: 'AI Candidate Matching Engine & Deterministic ERP Sync Contracts',
    roleDescription:
      'Owned the requirements-to-shipping loop for candidate matching feature (+15% precision lift). Shadowed recruiters to replace conversational bot with deterministic REST API contracts for ERP sync, saving 15 recruiter hours weekly.',
    category: 'project',
    standaloneUrl: '/projects/meraqui-karam.html',
    prototypeUrl: '/artifact-meraqui.html',
    metrics: [
      {
        label: 'MATCH PRECISION',
        value: '+15%',
        description: 'Precision@10 lift via hybrid retrieval',
        colorScheme: 'emerald',
      },
      {
        label: 'TIME SAVINGS',
        value: '15h / wk',
        description: 'Saved per recruiter in manual profile entry',
        colorScheme: 'gold',
      },
      {
        label: 'DATA DRIFT',
        value: '-12% to -15%',
        description: 'Reduction in downstream ERP sync errors',
        colorScheme: 'navy',
      },
    ],
  },
  treacle: {
    key: 'treacle',
    tag: '11 / DISTRIBUTED TELEMETRY & SYSTEMS',
    meta: 'Treacle Technologies • IIT Kanpur Incubation • 2024',
    badgeText: 'INCIDENT MONITORING & PIPELINES',
    badgeTone: 'navy',
    dateRange: '2024',
    domainSubtitle: 'High-Throughput Observability & Incident Detection',
    headline: 'Distributed Incident Monitoring & Real-Time Log Pipeline',
    roleDescription:
      'Specified and built monitoring dashboards (Grafana, Elasticsearch) that cut incident detection time by 40%. Scaled real-time data pipelines processing 100k+ logs/day with custom evaluation metrics and automated Docker workflows.',
    category: 'project',
    standaloneUrl: '/projects/treacle-technologies.html',
    metrics: [
      {
        label: 'DETECTION TIME',
        value: '-40%',
        description: 'Reduction in incident triage latency',
        colorScheme: 'emerald',
      },
      {
        label: 'DAILY THROUGHPUT',
        value: '100k+',
        description: 'Logs processed daily across clusters',
        colorScheme: 'navy',
      },
      {
        label: 'UPTIME SLA',
        value: '99.9%',
        description: 'Reliability across distributed nodes',
        colorScheme: 'gold',
      },
    ],
  },
};

export function getNextCaseStudyKey(
  currentKey: CaseStudyKey,
  direction: 1 | -1
): CaseStudyKey {
  const currentIndex = STUDY_KEYS.indexOf(currentKey);
  if (currentIndex === -1) return STUDY_KEYS[0];
  const nextIndex =
    (currentIndex + direction + STUDY_KEYS.length) % STUDY_KEYS.length;
  return STUDY_KEYS[nextIndex];
}
