import React, { useEffect } from 'react';
import {
  CaseStudyKey,
  CASE_STUDIES,
  STUDY_KEYS,
  getNextCaseStudyKey,
} from '../utils/portfolioLogic';

interface CaseStudyModalProps {
  activeKey: CaseStudyKey | null;
  onClose: () => void;
  onSelectKey: (key: CaseStudyKey) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  activeKey,
  onClose,
  onSelectKey,
}) => {
  useEffect(() => {
    if (!activeKey) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onSelectKey(getNextCaseStudyKey(activeKey, 1));
      } else if (e.key === 'ArrowLeft') {
        onSelectKey(getNextCaseStudyKey(activeKey, -1));
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    // Ensure modal body scrolls to top when opening or switching case studies
    const modalBody = document.getElementById('modal-dynamic-body');
    if (modalBody) {
      modalBody.scrollTop = 0;
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeKey, onClose, onSelectKey]);

  if (!activeKey) return null;

  const study = CASE_STUDIES[activeKey];
  if (!study) return null;

  return (
    <div
      id="project-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-[#090e17]/85 backdrop-blur-md animate-fadeIn"
    >
      <div
        id="modal-card-container"
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#faf7f2] rounded-3xl shadow-[0_24px_70px_rgba(14,24,40,0.35)] border border-[#dfd6c6] flex flex-col overflow-hidden text-[#121820]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#f5eee3] via-[#faf7f2] to-[#f0e7db] border-b border-[#dfd6c6] z-20 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#b88a3b] shadow-[0_0_8px_rgba(184,138,59,0.7)]"></span>
            <span
              id="modal-header-tag"
              className="text-xs uppercase text-[#0e1828] font-bold tracking-widest font-mono"
            >
              {study.tag}
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#d4c8b6]"></span>
            <span
              id="modal-header-meta"
              className="hidden sm:inline text-xs text-[#706657]"
            >
              {study.meta}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={study.standaloneUrl}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-[#0e1828] text-[#0e1828] hover:text-[#faf7f2] border border-[#dfd6c6] text-xs font-semibold transition-colors shadow-2xs"
            >
              <span>{study.category === 'teardown' ? 'Read Full Teardown' : 'Read Full Case Study'}</span>
              <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
            </a>
            <button
              type="button"
              aria-label="Close modal"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#eae1d2] hover:bg-[#0e1828] hover:text-[#faf7f2] text-[#554d42] flex items-center justify-center transition-colors cursor-pointer focus:outline-none"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal Dynamic Content Body */}
        <div
          id="modal-dynamic-body"
          className="custom-modal-scroll overflow-y-auto p-6 md:p-8 space-y-7 text-[#2c3545]"
        >
          {/* Header section with title and metrics */}
          <div className="border-b border-[#dfd6c6] pb-6 space-y-4">
            {study.thumbnailUrl && (
              <div className="w-full aspect-[16/9] sm:aspect-[2.1/1] rounded-2xl overflow-hidden shadow-sm border border-[#dfd6c6] bg-[#0c1424]">
                <img
                  src={study.thumbnailUrl}
                  alt={study.headline}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#0e1828] text-[#faf7f2] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b88a3b] animate-pulse"></span>
                {study.badgeText}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#eae1d2] text-[#0e1828] text-xs font-semibold">
                {study.domainSubtitle}
              </span>
            </div>

            <h2
              id="modal-headline"
              className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-editorial)] text-[#0e1828] tracking-tight leading-snug"
            >
              {study.headline}
            </h2>

            <p className="text-sm sm:text-base text-[#554d42] leading-relaxed">
              {study.roleDescription}
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {study.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-[#dfd6c6] shadow-sm space-y-1"
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#706657]">
                    {m.label}
                  </span>
                  <div className="text-2xl font-extrabold text-[#0e1828] tracking-tight">
                    {m.value}
                  </div>
                  <p className="text-xs text-[#554d42] leading-relaxed">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* OPENAI DATA AGENT DEEP DIVE */}
          {activeKey === 'openai' && (
            <div className="space-y-6 text-sm">
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  01 / The Core Moat: Context Over Model
                </h3>
                <div className="p-5 rounded-2xl bg-white border border-[#dfd6c6] space-y-3">
                  <h4 className="font-bold text-[#0e1828] text-base">
                    How OpenAI Replaces Brute-Force Prompts with a 6-Layer Context Pipeline
                  </h4>
                  <p className="text-[#554d42] leading-relaxed">
                    Querying 70,000 datasets and 600 petabytes across 3,500 employees cannot succeed through raw schema dumps. The agent derives ground truth by combining Git codebase crawls (dbt models, Airflow DAGs) with institutional Slack/Docs memory and pass-through RBAC.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
                    <div className="p-3 rounded-xl bg-[#faf7f2] border border-[#dfd6c6]">
                      <span className="font-bold text-[#0e1828] block mb-1">Codex Code Crawling</span>
                      Inspects the transformation logic that generated the table to infer true business definitions.
                    </div>
                    <div className="p-3 rounded-xl bg-[#faf7f2] border border-[#dfd6c6]">
                      <span className="font-bold text-[#0e1828] block mb-1">Memory &amp; Corrections</span>
                      Caches user feedback directly into agent memory, driving a 17× query speedup on repeat tasks.
                    </div>
                    <div className="p-3 rounded-xl bg-[#faf7f2] border border-[#dfd6c6]">
                      <span className="font-bold text-[#0e1828] block mb-1">Pass-Through RBAC</span>
                      Agent inherits user credentials, guaranteeing zero enterprise permission widening.
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  02 / Product Governance &amp; Evaluation
                </h3>
                <div className="p-5 rounded-2xl bg-[#f0e8dc] border border-[#dfd6c6] space-y-3">
                  <p className="text-[#4a4235] leading-relaxed text-xs">
                    OpenAI operates a static benchmark of 200+ &ldquo;golden questions&rdquo; that runs across every model release, tool consolidation, and prompt tweak to measure exact SQL precision before rolling out updates to internal teams.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <a
                      href="/teardowns/openai-data-agent.html"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0e1828] text-[#faf7f2] hover:bg-[#1a2942] text-xs font-semibold transition-colors"
                    >
                      <span>Read Full Teardown</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </a>
                    <a
                      href="/teardowns/openai-data-agent-case-study.pdf"
                      download="OpenAI_Data_Agent_Case_Study.pdf"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#0e1828] hover:bg-[#faf7f2] border border-[#dfd6c6] text-xs font-semibold transition-colors"
                    >
                      <span>Download 13-Page Case Study (PDF)</span>
                      <span className="material-symbols-outlined text-[13px]">download</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NOTION AGENTS DEEP DIVE */}
          {activeKey === 'notion' && (
            <div className="space-y-6 text-sm">
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  01 / Pricing &amp; Multi-Model Routing
                </h3>
                <div className="p-5 rounded-2xl bg-white border border-[#dfd6c6] space-y-3">
                  <h4 className="font-bold text-[#0e1828] text-base">
                    Making Autonomous Work Financeable: The 3-Tier Rate Card
                  </h4>
                  <p className="text-[#554d42] leading-relaxed">
                    Notion unbundles compute into a credit currency ($10 per 1,000 credits) with a 3-tier task rate card (5 credits for single-turn, 10 for extraction, 20 for reasoning). Dynamically routing across Claude 3.5 Sonnet and cost-effective models (Haiku / GPT-4o mini) captures vendor margin while protecting users from runaway billing shocks.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3.5 rounded-xl bg-red-50/70 border border-red-200">
                      <span className="font-bold text-red-900 block mb-1">Open Vulnerability Identified</span>
                      Current pause semantics are agent-level, not run-level. Unattended 24hr agents can burn monthly allowances in loops with zero outcome signal.
                    </div>
                    <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                      <span className="font-bold text-emerald-900 block mb-1">Kris’s Proposed Safeguard</span>
                      Run-level budget envelopes, pre-flight token estimates, and checkpoint pauses requiring human confirmation when 2× compute is exceeded.
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  02 / Complete Analysis Report
                </h3>
                <div className="p-5 rounded-2xl bg-[#f0e8dc] border border-[#dfd6c6] space-y-3">
                  <p className="text-[#4a4235] leading-relaxed text-xs">
                    The 17-page teardown covers credit pool boundaries, cross-vendor routing layers, customer outcome metrics, and unit cost elasticity models.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <a
                      href="/teardowns/notion-agents.html"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0e1828] text-[#faf7f2] hover:bg-[#1a2942] text-xs font-semibold transition-colors"
                    >
                      <span>Read Full Teardown</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </a>
                    <a
                      href="/teardowns/notion-agents-teardown.pdf"
                      download="Notion_Agents_Teardown.pdf"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#0e1828] hover:bg-[#faf7f2] border border-[#dfd6c6] text-xs font-semibold transition-colors"
                    >
                      <span>Download 17-Page Teardown (PDF)</span>
                      <span className="material-symbols-outlined text-[13px]">download</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* COMET DEEP DIVE */}
          {activeKey === 'comet' && (
            <div className="space-y-6 text-sm">
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  01 / The Discovery Breakdown
                </h3>
                <div className="p-5 rounded-2xl bg-white border border-[#dfd6c6] space-y-3">
                  <h4 className="font-bold text-[#0e1828] text-base">
                    Reverse-Engineering Comet’s AI &ldquo;Finder&rdquo; Drop-Off
                  </h4>
                  <p className="text-[#554d42] leading-relaxed">
                    Comet rolled out a conversational AI discovery tool designed to help shoppers articulate vague fashion and lifestyle intents (&ldquo;minimalist white sneaker for walking 10 miles in rain&rdquo;). However, analytics revealed a steep drop-off between AI recommendation generation and actual Product Detail Page (PDP) add-to-cart clicks.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3 rounded-xl bg-[#faf7f2] border border-[#dfd6c6]">
                      <span className="font-bold text-[#0e1828] block mb-1">
                        Symptom: Stateless Amnesia
                      </span>
                      Shoppers refined sizes or fit queries, but subsequent queries wiped earlier size and budget constraints, forcing repeat filtering.
                    </div>
                    <div className="p-3 rounded-xl bg-[#faf7f2] border border-[#dfd6c6]">
                      <span className="font-bold text-[#0e1828] block mb-1">
                        PM Solution: Context-Aware Memory
                      </span>
                      Structured JSON state persistence for physical attributes (size, arch, weather tolerance) with immediate direct-add-to-cart cart triggers.
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  02 / Product Judgment &amp; Metrics
                </h3>
                <div className="p-5 rounded-2xl bg-white border border-[#dfd6c6] space-y-3">
                  <p className="text-[#554d42] leading-relaxed">
                    Instead of vanity metrics like &ldquo;average messages per conversational session&rdquo; (which actually indicated user frustration), defined <strong>Finder-assisted add-to-cart rate</strong> and <strong>zero-repeat-filter session percentage</strong> as the core validation KPIs.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <a
                      href="/teardowns/comet.html"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0e1828] text-[#faf7f2] hover:bg-[#1a2942] text-xs font-semibold transition-colors"
                    >
                      <span>Read Full Teardown</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </a>
                    <a
                      href="https://relay-define-38337038.figma.site/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#f0e8dc] hover:bg-[#e6dcce] text-[#0e1828] border border-[#dfd6c6] text-xs font-semibold transition-colors shadow-2xs"
                    >
                      <span>Interactive Prototype</span>
                      <span className="material-symbols-outlined text-[13px]">rocket_launch</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LENDING FUNNELS DEEP DIVE */}
          {activeKey === 'lending' && (
            <div className="space-y-6 text-sm">
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  01 / Comparative Funnel Diagnosis
                </h3>
                <div className="p-5 rounded-2xl bg-white border border-[#dfd6c6] space-y-3">
                  <h4 className="font-bold text-[#0e1828] text-base">
                    KreditBee vs. PhonePe: Same Category, Two Different Choke Points
                  </h4>
                  <p className="text-[#554d42] leading-relaxed">
                    Comparing two leading Indian digital credit experiences exposed that funnel abandonment stems from completely different architectural roots:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#dfd6c6] space-y-1">
                      <span className="font-bold text-[#0e1828] block">
                        KreditBee: Document-Upload Bottleneck
                      </span>
                      <p className="text-[#554d42]">
                        Users failed asynchronous PAN/salary slip OCR due to minor glare or edge crop, receiving rejections hours later when intent had vanished.
                      </p>
                      <span className="text-[#b88a3b] font-semibold block pt-1">
                        Fix: Client-side AI document pre-check in &lt;15s.
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#dfd6c6] space-y-1">
                      <span className="font-bold text-[#0e1828] block">
                        PhonePe: Marketplace Trust Continuity Break
                      </span>
                      <p className="text-[#554d42]">
                        Users abandoned upon sudden redirect to third-party lending partners (NBFCs) with foreign UI, unpopulated forms, and unexpected verification calls.
                      </p>
                      <span className="text-[#b88a3b] font-semibold block pt-1">
                        Fix: Co-branded in-app bridge with zero-re-entry form pre-fill.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  02 / Detailed Interactive Views
                </h3>
                <div className="p-5 rounded-2xl bg-[#f0e8dc] border border-[#dfd6c6] space-y-3">
                  <p className="text-[#4a4235] leading-relaxed text-xs">
                    Targeted a 24% lift in first-session KYC completion and a 35% reduction in partner handoff drop-off with unified trust continuity.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <a
                      href="/teardowns/lending-funnels.html"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0e1828] text-[#faf7f2] hover:bg-[#1a2942] text-xs font-semibold transition-colors"
                    >
                      <span>Read Full Teardown</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </a>
                    <a
                      href="https://option-delete-93793571.figma.site/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#f0e8dc] hover:bg-[#e6dcce] text-[#0e1828] border border-[#dfd6c6] text-xs font-semibold transition-colors shadow-2xs"
                    >
                      <span>Interactive Prototype</span>
                      <span className="material-symbols-outlined text-[13px]">rocket_launch</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SHOPIFY FLOWLENS DEEP DIVE */}
          {activeKey === 'flowlens' && (
            <div className="space-y-6 text-sm">
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  01 / System Architecture &amp; The Strategic Pivot
                </h3>
                <div className="p-5 rounded-2xl bg-white border border-[#dfd6c6] space-y-3">
                  <h4 className="font-bold text-[#0e1828] text-base">
                    Read-Only Preflight Analysis for Shopify .flow Definitions
                  </h4>
                  <p className="text-[#554d42] leading-relaxed">
                    When Shopify disclosed that fine-tuned Qwen-32B workflow generation in Sidekick suffered a <strong>35% lower production activation rate</strong>, I diagnosed the root cause: merchants hesitate to activate automations due to silent data formatting mismatches and pre-Wait data loss hazards.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#dfd6c6] space-y-1">
                      <span className="font-bold text-[#0e1828] block">5 Deterministic Linting Rules</span>
                      <p className="text-[#554d42]">
                        L-01 (ISO-2 country codes), L-02 (pre-Wait data discard warnings), L-03 (no-op audit), L-04 (Liquid syntax check), and L-05 (cycle prevention).
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#dfd6c6] space-y-1">
                      <span className="font-bold text-[#0e1828] block">API Boundary Pivot</span>
                      <p className="text-[#554d42]">
                        Live diagnostic monitoring is blocked by Shopify Admin API boundaries. Pivoted to offline preflight analysis of exported <code>.flow</code> JSON files with zero store mutations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  02 / Interactive Artifacts &amp; Live Demos
                </h3>
                <div className="p-5 rounded-2xl bg-[#f0e8dc] border border-[#dfd6c6] space-y-3">
                  <p className="text-[#4a4235] leading-relaxed text-xs">
                    Explore the complete post-audit case study, launch the interactive prototype to upload <code>.flow</code> files and inspect synthetic order simulations, or view source code on GitHub.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <a
                      href="/projects/shopify-flow-lens.html"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0e1828] text-[#faf7f2] hover:bg-[#1a2942] text-xs font-semibold transition-colors"
                    >
                      <span>Read Full Case Study</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </a>
                    <a
                      href="https://shopify-flowlens.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-[#0e1828] hover:bg-[#faf7f2] border border-[#dfd6c6] text-xs font-semibold transition-colors"
                    >
                      <span>Live Prototype</span>
                      <span className="material-symbols-outlined text-[13px]">north_east</span>
                    </a>
                    <a
                      href="https://github.com/krishnamurthi-ramesh/Shopify-Flow-Lens"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-[#0e1828] hover:bg-[#faf7f2] border border-[#dfd6c6] text-xs font-semibold transition-colors"
                    >
                      <span>GitHub Repository</span>
                      <span className="material-symbols-outlined text-[13px]">code</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI COST OPTIMIZER DEEP DIVE */}
          {activeKey === 'costoptimizer' && (
            <div className="space-y-6 text-sm">
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  01 / The SaaS Gross Margin Trap
                </h3>
                <div className="p-5 rounded-2xl bg-white border border-[#dfd6c6] space-y-3">
                  <h4 className="font-bold text-[#0e1828] text-base">
                    Monolithic Frontier Routing vs. Cascading Architecture
                  </h4>
                  <p className="text-[#554d42] leading-relaxed">
                    Software companies routing 100% of user queries to Claude 3.5 Sonnet or GPT-4o face severe unit-economic deterioration: at 100k DAU, token fees reach <strong>$137k/mo</strong>, collapsing gross margins from 85% to 54.3%.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#dfd6c6] space-y-1">
                      <span className="font-bold text-[#0e1828] block">Asymmetric Entropy Distribution</span>
                      <p className="text-[#554d42]">
                        78% of incoming prompts are low-complexity queries routed to SLMs (Gemini 2.5 Flash / Llama 3.3 70B at $0.00078/q), reserving frontier models for reasoning.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#dfd6c6] space-y-1">
                      <span className="font-bold text-[#0e1828] block">Validated Monte Carlo Simulation</span>
                      <p className="text-[#554d42]">
                        Tested across 32 parameter permutations: saves <strong>$91,564/mo (-66.8%)</strong>, halves P95 latency to 1.20s, and preserves 99.2% benchmark quality.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  02 / Interactive Simulator &amp; Codebase
                </h3>
                <div className="p-5 rounded-2xl bg-[#f0e8dc] border border-[#dfd6c6] space-y-3">
                  <p className="text-[#4a4235] leading-relaxed text-xs">
                    Interact directly with the live ROI tool to simulate user scale, escalation rates, and cache hit margins, or inspect the routing proxy implementation on GitHub.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <a
                      href="/projects/ai-cost-optimizer.html"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0e1828] text-[#faf7f2] hover:bg-[#1a2942] text-xs font-semibold transition-colors"
                    >
                      <span>Read Full Case Study</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </a>
                    <a
                      href="https://ai-cost-optimizer-iota.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-[#0e1828] hover:bg-[#faf7f2] border border-[#dfd6c6] text-xs font-semibold transition-colors"
                    >
                      <span>Launch Interactive ROI Tool</span>
                      <span className="material-symbols-outlined text-[13px]">north_east</span>
                    </a>
                    <a
                      href="https://github.com/krishnamurthi-ramesh/AI-Cost-Optimizer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-[#0e1828] hover:bg-[#faf7f2] border border-[#dfd6c6] text-xs font-semibold transition-colors"
                    >
                      <span>GitHub Repository</span>
                      <span className="material-symbols-outlined text-[13px]">code</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STUDYTUBE DEEP DIVE */}
          {activeKey === 'studytube' && (
            <div className="space-y-6 text-sm">
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  01 / Problem Framing &amp; Stream Governor Architecture
                </h3>
                <div className="p-5 rounded-2xl bg-white border border-[#dfd6c6] space-y-4">
                  <p className="text-[#4a4235] leading-relaxed">
                    Over 350M learners studying on daily capped cellular hotspots (1.5–2.0 GB/day) exhaust their quota in under an hour because auto-bitrate treats static whiteboard or slide lectures like 1080p60 cinema (~25–35 MB/min) while sidebar hover previews waste ~150–250 MB/hr.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#dfd6c6]">
                      <span className="font-bold text-[#0e1828] block mb-1">
                        4 Subject-Matched Bitrate Modes
                      </span>
                      <p className="text-[#554d42]">
                        Talk Mode (480p SD, ~65% saved), Board Mode (720p HD for handwriting/math, ~45% saved), Code Mode (720p/1080p for 12pt syntax, ~35% saved), and Audio-First (144p + mask, ~85% saved).
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#dfd6c6]">
                      <span className="font-bold text-[#0e1828] block mb-1">
                        Triple-Layer Quality &amp; W3C Telemetry
                      </span>
                      <p className="text-[#554d42]">
                        Combines HTML5 state seeding, window Player API bridging, and &lt;80ms DOM gear fallback; verifies exact googlevideo.com transferSize via W3C PerformanceObserver (&lt;0.2% CPU overhead, zero PII).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  02 / SDLC Artifacts &amp; GitHub Release
                </h3>
                <div className="p-5 rounded-2xl bg-[#f0e8dc] border border-[#dfd6c6] space-y-3">
                  <p className="text-[#4a4235] leading-relaxed text-xs">
                    Includes full PRD, MRD, STRIDE ToS security audit, 15 QA test cases, student comprehension benchmarks, and automated Chrome Web Store MV3 packaging (26.13 KB zip with SHA-256 checksum).
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <a
                      href="/projects/study-tube.html"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0e1828] text-[#faf7f2] hover:bg-[#1a2942] text-xs font-semibold transition-colors"
                    >
                      <span>Read Full Case Study</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </a>
                    <a
                      href="https://github.com/krishnamurthi-ramesh/Study-Tube"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-[#0e1828] hover:bg-[#faf7f2] border border-[#dfd6c6] text-xs font-semibold transition-colors"
                    >
                      <span>GitHub Repository</span>
                      <span className="material-symbols-outlined text-[13px]">code</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PERPLEXITY EVAL HARNESS DEEP DIVE */}
          {activeKey === 'evalharness' && (
            <div className="space-y-6 text-sm">
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  01 / Problem Statement &amp; Diagnostic Findings
                </h3>
                <div className="p-5 rounded-2xl bg-white border border-[#dfd6c6] space-y-3">
                  <h4 className="font-bold text-[#0e1828] text-base">
                    The Citation Grounding Flaw in Generative Search
                  </h4>
                  <p className="text-[#554d42] leading-relaxed">
                    Evaluated 151 production queries across 10 diverse domains (Finance, Healthcare, Code, Legal, News, Science). Isolated a critical trust defect: 26.2% of citations across complex queries exhibited grounding failures—broken 404 links, redirects to generic domain roots, or cited pages contradicting claimed statistical numbers.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#dfd6c6] space-y-1">
                      <span className="font-mono text-[#b88a3b] font-bold">151 Golden Cases</span>
                      <p className="text-[#554d42]">Spanning 10 distinct knowledge domains and query complexity tiers.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#dfd6c6] space-y-1">
                      <span className="font-mono text-[#b88a3b] font-bold">7-Dimension Rubric</span>
                      <p className="text-[#554d42]">Scored on Factual Accuracy, Citation Grounding, Coherence, Safety &amp; Completeness.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#dfd6c6] space-y-1">
                      <span className="font-mono text-[#b88a3b] font-bold">Decoupled LLM Judge</span>
                      <p className="text-[#554d42]">Independent multi-model evaluator eliminating circular vendor bias.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  02 / Product Intervention &amp; CI/CD Regression Gates
                </h3>
                <div className="p-5 rounded-2xl bg-white border border-[#dfd6c6] space-y-4">
                  <h4 className="font-bold text-[#0e1828] text-base">
                    Automated Pre-Render Grounding &amp; PR Gating
                  </h4>
                  <p className="text-[#554d42] leading-relaxed">
                    Designed a pre-render citation verification filter that parses outgoing markdown citations, runs lightweight headless GET checks for HTTP 200/404, and verifies snippet semantic similarity before streaming to user clients.
                  </p>
                  <div className="p-3.5 rounded-xl bg-[#f0e8dc] border border-[#dfd6c6] text-xs space-y-1">
                    <span className="font-bold text-[#0e1828]">CI/CD Deployment Threshold:</span>
                    <p className="text-[#554d42]">
                      Automated weekly test suite gating all PRs. Any model update that drops Citation Grounding by &gt;2% or produces any hallucinated medical/financial citation triggers an immediate build block.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-wrap gap-2.5">
                    <a
                      href="/projects/eval-harness.html"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0e1828] text-[#faf7f2] hover:bg-[#1a2942] text-xs font-semibold transition-colors"
                    >
                      <span>Read Full Case Study</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </a>
                    <a
                      href="https://public.tableau.com/views/PerplexityAIQualityEvaluationHarness/PerplexityAIQualityEvaluationHarness?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-[#0e1828] hover:bg-[#faf7f2] border border-[#dfd6c6] text-xs font-semibold transition-colors"
                    >
                      <span>Explore Live Tableau Dashboard</span>
                      <span className="material-symbols-outlined text-[13px]">north_east</span>
                    </a>
                    <a
                      href="https://github.com/krishnamurthi-ramesh/AgentEval-Studio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-[#0e1828] hover:bg-[#faf7f2] border border-[#dfd6c6] text-xs font-semibold transition-colors"
                    >
                      <span>GitHub Repository</span>
                      <span className="material-symbols-outlined text-[13px]">code</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ACTIVE CONFORMAL CONTROL DEEP DIVE */}
          {activeKey === 'vlm' && (
            <div className="space-y-6 text-sm">
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  01 / Research Methodology &amp; Mathematical Guarantees
                </h3>
                <div className="p-5 rounded-2xl bg-white border border-[#dfd6c6] space-y-3">
                  <h4 className="font-bold text-[#0e1828] text-base">
                    Conformal Safety Bounds for Quantized Vision-Language Models
                  </h4>
                  <p className="text-[#554d42] leading-relaxed">
                    Edge manufacturing deployment of quantized VLMs suffers from silent hallucination drift when visual conditions change. Built a two-tier inference cascade balancing edge latency, accuracy, and unit economics.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#dfd6c6] space-y-1">
                      <span className="font-bold text-[#0e1828] block">Non-Parametric ppDRE Detector</span>
                      <p className="text-[#554d42]">
                        Real-time tracking of input density shifts between edge camera frames and baseline calibration sets.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#dfd6c6] space-y-1">
                      <span className="font-bold text-[#0e1828] block">Student-Teacher Cascade</span>
                      <p className="text-[#554d42]">
                        4-bit student model handles routine checks (480ms P99); routes to CPU/GPU teacher when uncertainty exceeds conformal threshold (1 - &alpha;).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  02 / IEEE Review &amp; Codebase
                </h3>
                <div className="p-5 rounded-2xl bg-[#f0e8dc] border border-[#dfd6c6] space-y-3">
                  <p className="text-[#4a4235] leading-relaxed text-xs">
                    Paper revised through external peer review ahead of IEEE publication. Explore the PyTorch implementation and conformal calibration harness on GitHub.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <a
                      href="/projects/active-conformal-control.html"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0e1828] text-[#faf7f2] hover:bg-[#1a2942] text-xs font-semibold transition-colors"
                    >
                      <span>Read Full Case Study</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </a>
                    <a
                      href="https://github.com/krishnamurthi-ramesh/Active-Conformal-Control-Navigating-Density-Chasms-in-Quantized-Vision-Language-Systems"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-[#0e1828] hover:bg-[#faf7f2] border border-[#dfd6c6] text-xs font-semibold transition-colors"
                    >
                      <span>GitHub Repository</span>
                      <span className="material-symbols-outlined text-[13px]">code</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MERAQUI (KARAM.AI) DEEP DIVE */}
          {activeKey === 'karam' && (
            <div className="space-y-6 text-sm">
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  01 / Requirements-to-Shipping Loop
                </h3>
                <div className="p-5 rounded-2xl bg-white border border-[#dfd6c6] space-y-3">
                  <h4 className="font-bold text-[#0e1828] text-base">
                    Candidate-Matching Engine &amp; Deterministic ERP Integration
                  </h4>
                  <p className="text-[#554d42] leading-relaxed">
                    Shadowed technical recruiters to identify why legacy keyword search failed: high recall but dismal precision forced recruiters to read every resume. Replaced conversational bot prototypes with deterministic REST API contracts.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#dfd6c6] space-y-1">
                      <span className="font-bold text-[#0e1828] block">Hybrid Retrieval + Skill Taxonomy</span>
                      <p className="text-[#554d42]">
                        Combined dense embeddings with strict taxonomy validation, boosting Precision@10 by 15% and surfacing 2-sentence rationale pills.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#dfd6c6] space-y-1">
                      <span className="font-bold text-[#0e1828] block">ERP Sync Contracts</span>
                      <p className="text-[#554d42]">
                        Eliminated 15 recruiter hours weekly in manual data entry and cut downstream schema inconsistencies by 12&ndash;15%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  02 / Product Spec &amp; Production Metrics
                </h3>
                <div className="p-5 rounded-2xl bg-[#f0e8dc] border border-[#dfd6c6] space-y-3">
                  <p className="text-[#4a4235] leading-relaxed text-xs">
                    View the complete production specification covering problem statements, success guardrails, model tradeoffs, and risk mitigations.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <a
                      href="/projects/meraqui-karam.html"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0e1828] text-[#faf7f2] hover:bg-[#1a2942] text-xs font-semibold transition-colors"
                    >
                      <span>Read Full Case Study</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </a>
                    <a
                      href="/artifact-meraqui.html"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white text-[#0e1828] hover:bg-[#faf7f2] border border-[#dfd6c6] text-xs font-semibold transition-colors"
                    >
                      <span>Product Spec Document</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TREACLE TECHNOLOGIES DEEP DIVE */}
          {activeKey === 'treacle' && (
            <div className="space-y-6 text-sm">
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  01 / High-Throughput Telemetry &amp; Log Pipelines
                </h3>
                <div className="p-5 rounded-2xl bg-white border border-[#dfd6c6] space-y-3">
                  <h4 className="font-bold text-[#0e1828] text-base">
                    Distributed Incident Monitoring Across 100k+ Events/Day
                  </h4>
                  <p className="text-[#554d42] leading-relaxed">
                    Microservice logs scattered across distributed servers caused prolonged outage investigations. Built centralized monitoring and automated alerting to collapse incident triage time.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#dfd6c6] space-y-1">
                      <span className="font-bold text-[#0e1828] block">Unified Grafana Telemetry</span>
                      <p className="text-[#554d42]">
                        Role-specific dashboards providing P99 latency alerts, thread bottlenecks, and server cluster health.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#dfd6c6] space-y-1">
                      <span className="font-bold text-[#0e1828] block">Elasticsearch &amp; Docker Scale</span>
                      <p className="text-[#554d42]">
                        Indexed 100k+ logs/day with sub-200ms query performance and containerized auto-recovery daemons, reducing triage time by 40%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  02 / Production Architecture
                </h3>
                <div className="p-5 rounded-2xl bg-[#f0e8dc] border border-[#dfd6c6] space-y-3">
                  <p className="text-[#4a4235] leading-relaxed text-xs">
                    Read the complete incident telemetry case study covering data pipelines, log sharding policies, and Docker workflows.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <a
                      href="/projects/treacle-technologies.html"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0e1828] text-[#faf7f2] hover:bg-[#1a2942] text-xs font-semibold transition-colors"
                    >
                      <span>Read Full Case Study</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Navigation */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#f5eee3] border-t border-[#dfd6c6] z-20 shrink-0">
          <button
            type="button"
            onClick={() => onSelectKey(getNextCaseStudyKey(activeKey, -1))}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#554d42] hover:text-[#0e1828] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Previous {study.category === 'project' ? 'Project' : 'Teardown'}</span>
          </button>

          <span className="text-xs text-[#7d7363] font-mono hidden sm:inline">
            {STUDY_KEYS.indexOf(activeKey) + 1} of {STUDY_KEYS.length}
          </span>

          <button
            type="button"
            onClick={() => onSelectKey(getNextCaseStudyKey(activeKey, 1))}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#554d42] hover:text-[#0e1828] transition-colors cursor-pointer"
          >
            <span>Next {study.category === 'project' ? 'Project' : 'Teardown'}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
