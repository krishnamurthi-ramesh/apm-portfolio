export type CaseStudyKey = 'openai' | 'notion' | 'comet' | 'lending';
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
  category: 'teardown';
  standaloneUrl: string;
  pdfUrl?: string;
  metrics: CaseStudyMetric[];
}

export const STUDY_KEYS: CaseStudyKey[] = ['openai', 'notion', 'comet', 'lending'];

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
