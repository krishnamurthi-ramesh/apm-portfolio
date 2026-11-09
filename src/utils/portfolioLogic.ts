export type CaseStudyKey = 'comet' | 'lending' | 'rag' | 'vlm' | 'meraqui' | 'treacle';
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
  category: 'teardown' | 'ai-systems' | 'research' | 'experience';
  metrics: CaseStudyMetric[];
}

export interface SimulatorAnalysis {
  option: SimulatorOptionKey;
  statusTag: string;
  title: string;
  text: string;
  accuracyPercent: number;
  latencyMs: number;
  meetsSla: boolean;
}

export const STUDY_KEYS: CaseStudyKey[] = ['comet', 'lending', 'rag', 'vlm', 'meraqui', 'treacle'];

export const CASE_STUDIES: Record<CaseStudyKey, CaseStudyRecord> = {
  comet: {
    key: 'comet',
    tag: '01 / E-Commerce AI Teardown',
    meta: 'Discovery Teardown & Friction Analysis • 2026',
    badgeText: 'Product Teardown',
    badgeIcon: 'search_insights',
    badgeTone: 'gold',
    dateRange: '2026',
    domainSubtitle: 'AI Conversational Search • Funnel Optimization',
    headline: 'Comet (E-Commerce AI Search) — Teardown & Friction Analysis',
    roleDescription:
      'Reverse-engineering Comet\'s AI "Finder" discovery flow to diagnose user drop-off between recommendation generation and PDP conversion.',
    category: 'teardown',
    metrics: [
      {
        label: 'Finder-assisted Add-to-Cart',
        value: '+22%',
        description: 'Projected conversion lift by bridging conversational search directly into checkout intent.',
        colorScheme: 'gold',
      },
      {
        label: 'Context Memory Carry-over',
        value: '100%',
        description: 'Retained size, fit, and aesthetic constraints across browsing sessions without re-prompting.',
        colorScheme: 'navy',
      },
      {
        label: 'PDP Drop-off Mitigation',
        value: '-18%',
        description: 'Reduced search friction and cart abandonment caused by stateless recommendation resets.',
        colorScheme: 'emerald',
      },
    ],
  },
  lending: {
    key: 'lending',
    tag: '02 / Fintech Funnel Diagnostics',
    meta: 'Comparative Funnel Teardown • 2026',
    badgeText: 'Fintech Teardown',
    badgeIcon: 'account_balance',
    badgeTone: 'navy',
    dateRange: '2026',
    domainSubtitle: 'KreditBee vs. PhonePe Lending • Two Failure Modes',
    headline: 'Same Category, Two Failure Modes: Lending Funnel Diagnostics',
    roleDescription:
      'Diagnosing distinct operational friction points in two live lending funnels: document upload bottlenecks (KreditBee) vs. marketplace trust continuity breaks (PhonePe).',
    category: 'teardown',
    metrics: [
      {
        label: 'First-Session KYC Completion',
        value: '+24%',
        description: 'Targeted lift using real-time AI computer vision document feedback for glare, crop, and OCR errors.',
        colorScheme: 'gold',
      },
      {
        label: 'Partner Handoff Churn',
        value: '-35%',
        description: 'Cut mid-funnel drop-off by maintaining unified loan state during third-party NBFC redirects.',
        colorScheme: 'navy',
      },
      {
        label: 'Instant Document Feedback',
        value: '< 15s',
        description: 'Pre-flight client-side inspection before submission preventing asynchronous loan application rejection.',
        colorScheme: 'emerald',
      },
    ],
  },
  rag: {
    key: 'rag',
    tag: '03 / Production AI Architecture',
    meta: 'Independent Systems Project • Feb 2025',
    badgeText: 'Autonomous RAG',
    badgeIcon: 'bolt',
    badgeTone: 'gold',
    dateRange: 'Feb 2025',
    domainSubtitle: 'FAISS • Ollama • Ragas • Docker',
    headline: 'Enterprise RAG System with Quantitative Evaluation Harness',
    roleDescription:
      'Production-grade Retrieval-Augmented Generation pipeline with a statistical evaluation harness, eliminating cloud data leakage and quantifying retrieval accuracy.',
    category: 'ai-systems',
    metrics: [
      {
        label: 'P99 Inference Latency',
        value: '380ms',
        description: 'Sub-second response guaranteed via local FAISS indexing and optimized embeddings in private Docker.',
        colorScheme: 'navy',
      },
      {
        label: 'Ragas Faithfulness',
        value: '0.91',
        description: 'Strict factual citation grounding with hallucination mitigation prompts and verbatim span checks.',
        colorScheme: 'emerald',
      },
      {
        label: 'Context Recall@K',
        value: '0.88',
        description: 'High-fidelity top-k chunk retrieval with hybrid keyword + dense semantic re-ranking.',
        colorScheme: 'gold',
      },
    ],
  },
  vlm: {
    key: 'vlm',
    tag: '04 / Independent AI Research',
    meta: 'IIITDM Kurnool • Advised by Dr. K. E. Srinivasa Desikan • Under IEEE Review',
    badgeText: 'IEEE In-Review',
    badgeIcon: 'verified',
    badgeTone: 'navy',
    dateRange: '2026',
    domainSubtitle: 'Vision-Language Models • Conformal Inference',
    headline: 'Reliability Framework for Quantized Vision-Language Models',
    roleDescription:
      'Active Conformal Control framework scoping hallucination mitigation on cost-optimized edge hardware via density-chasm detection and two-tier inference cascades.',
    category: 'research',
    metrics: [
      {
        label: 'Structural Defect Precision',
        value: '94.2%',
        description: 'Validated on edge assembly inspection benchmarks with rigorous non-parametric density bounds.',
        colorScheme: 'gold',
      },
      {
        label: 'Two-Tier Cascade Latency',
        value: '480ms P99',
        description: 'Fast local GPU student handles 85% of queries; escalates only ambiguous edge anomalies to CPU teacher.',
        colorScheme: 'emerald',
      },
      {
        label: 'Cloud Token Spend Reduction',
        value: '~60%',
        description: 'Optimal unit economics balancing accuracy, cost, and sub-second operational constraints.',
        colorScheme: 'navy',
      },
    ],
  },
  meraqui: {
    key: 'meraqui',
    tag: '05 / Production AI Platform',
    meta: 'Meraqui Ventures (karam.ai) • Pune, India',
    badgeText: 'Production Shipped',
    badgeIcon: 'rocket_launch',
    badgeTone: 'emerald',
    dateRange: 'Apr 2025 – Jul 2025',
    domainSubtitle: 'High-Volume Staffing Platform',
    headline: 'AI Candidate Matching Engine & ERP Automation Loop',
    roleDescription:
      'Data Science & Technical Product Intern at Meraqui Ventures Pvt. Ltd. (karam.ai). Owned requirements-to-shipping loop for candidate matching and ERP synchronization.',
    category: 'experience',
    metrics: [
      {
        label: 'Matching Precision',
        value: '+15%',
        description: 'Lift across high-volume staffing pools via structured embedding fine-tuning.',
        colorScheme: 'emerald',
      },
      {
        label: 'Manual Data Entry',
        value: '-15%',
        description: 'Hours eradicated weekly per recruiter through REST API ERP contracts.',
        colorScheme: 'navy',
      },
      {
        label: 'Schema Integrity',
        value: '12–15%',
        description: 'Drop in downstream ETL discrepancy rates with Pydantic contracts.',
        colorScheme: 'gold',
      },
    ],
  },
  treacle: {
    key: 'treacle',
    tag: '06 / Observability & Telemetry',
    meta: 'Treacle Technologies • Incubated at IIT Kanpur',
    badgeText: 'IIT Kanpur Incubation',
    badgeIcon: 'domain',
    badgeTone: 'navy',
    dateRange: 'Jun 2024 – Aug 2024',
    domainSubtitle: 'Distributed Telemetry & Kafka Streaming',
    headline: 'Real-Time Log Telemetry Engine & Incident Detection Dashboards',
    roleDescription:
      'Development Engineering Intern at Treacle Technologies. Scaling distributed telemetry across production cloud infrastructure processing 100k+ logs/day.',
    category: 'experience',
    metrics: [
      {
        label: 'Incident Detection Time',
        value: '-40%',
        description: 'Reduced mean time to detect (MTTD) for critical distributed systems incidents.',
        colorScheme: 'emerald',
      },
      {
        label: 'Stream Ingestion',
        value: '100k+',
        description: 'Processed logs/day with sub-second Elasticsearch indexing and low lag.',
        colorScheme: 'navy',
      },
      {
        label: 'Manual Triage Elimination',
        value: '80%',
        description: 'Automated log preprocessing pipelines cutting manual operator triage.',
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

export function evaluateSimulatorOption(
  option: SimulatorOptionKey
): SimulatorAnalysis {
  if (option === 'A') {
    return {
      option: 'A',
      statusTag: 'SLA Breached (2,400ms > 800ms)',
      title: 'PM Verdict on Option A: Costly Overkill',
      text: 'While a multi-agent critique agent pushes accuracy to 99.2%, tripling the inference chain pushes P99 latency to 2.4 seconds and triples unit token cost. In real user studies, high-churn enterprise users abandon documents that take more than 1 second to parse.',
      accuracyPercent: 99.2,
      latencyMs: 2400,
      meetsSla: false,
    };
  }

  return {
    option: 'B',
    statusTag: 'Optimal Unit Economics (Recommended)',
    title: 'PM Verdict on Option B: The Pragmatic Win',
    text: 'Option B balances the PM triangle: fast local classification handles 85% of queries in under 300ms. Only borderline confidence chunks route to high-parameter LLMs, staying well within our 800ms P99 constraint while curbing token spend by ~60%.',
    accuracyPercent: 98.7,
    latencyMs: 480,
    meetsSla: true,
  };
}

export function toggleMentalModelList(
  expandedIds: number[],
  targetId: number
): number[] {
  if (expandedIds.includes(targetId)) {
    return expandedIds.filter((id) => id !== targetId);
  }
  return [...expandedIds, targetId];
}
