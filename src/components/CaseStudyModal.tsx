import React, { useEffect } from 'react';
import {
  CaseStudyKey,
  CASE_STUDIES,
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
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeKey, onClose, onSelectKey]);

  if (!activeKey) return null;

  const study = CASE_STUDIES[activeKey];

  return (
    <div
      id="project-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-[#090e17]/80 backdrop-blur-md transition-opacity duration-250"
    >
      <div
        id="modal-card-container"
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#faf7f2] rounded-3xl shadow-[0_24px_70px_rgba(14,24,40,0.35)] border border-[#dfd6c6] flex flex-col overflow-hidden text-[#121820]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#f5eee3] via-[#faf7f2] to-[#f0e7db] border-b border-[#dfd6c6] z-20">
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
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#eae1d2] hover:bg-[#0e1828] hover:text-[#faf7f2] text-[#554d42] flex items-center justify-center transition-colors cursor-pointer focus:outline-none"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Dynamic Content Body */}
        <div
          id="modal-dynamic-body"
          className="custom-modal-scroll overflow-y-auto p-6 md:p-8 space-y-7 text-[#2c3545]"
        >
          {/* Header section with title and metrics */}
          <div className="border-b border-[#dfd6c6] pb-6 space-y-4">
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

          {/* Deep-dive details per study */}
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
                  <div className="pt-2">
                    <a
                      href="/teardown-comet.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0e1828] text-[#faf7f2] hover:bg-[#1a2942] text-xs font-semibold transition-colors"
                    >
                      <span>Read Full Comet Teardown</span>
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                        Users browsing credit on PhonePe felt high trust, but getting redirected to third-party NBFC webviews with unfamiliar UI triggered suspicion and 35% exit rates.
                      </p>
                      <span className="text-[#b88a3b] font-semibold block pt-1">
                        Fix: In-app unified loan state bridge and co-branded verification.
                      </span>
                    </div>
                  </div>
                  <div className="pt-3 flex flex-wrap gap-2.5">
                    <a
                      href="/teardown-kreditbee.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0e1828] text-[#faf7f2] hover:bg-[#1a2942] text-xs font-semibold transition-colors"
                    >
                      <span>KreditBee Teardown Doc</span>
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </a>
                    <a
                      href="/teardown-phonepe.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0e1828] text-[#faf7f2] hover:bg-[#1a2942] text-xs font-semibold transition-colors"
                    >
                      <span>PhonePe Teardown Doc</span>
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeKey === 'rag' && (
            <div className="space-y-6 text-sm">
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  01 / Problem &amp; Architecture
                </h3>
                <div className="p-5 rounded-2xl bg-white border border-[#dfd6c6] space-y-3">
                  <h4 className="font-bold text-[#0e1828] text-base">
                    Zero-Leak Local Inference with Strict Statistical Evaluation
                  </h4>
                  <p className="text-[#554d42] leading-relaxed">
                    Enterprise legal and contract documents cannot touch commercial public cloud APIs. Built a fully containerized on-premise pipeline leveraging <strong>FAISS</strong> for dense vector search, <strong>Ollama</strong> for local LLM inference, and an automated <strong>Ragas</strong> evaluation suite.
                  </p>
                  <div className="p-3 rounded-xl bg-[#faf7f2] border border-[#dfd6c6] text-xs space-y-1">
                    <span className="font-bold text-[#0e1828] block">
                      Quantitative Benchmark Results:
                    </span>
                    <p className="text-[#554d42]">
                      ✦ P99 Inference Latency: 380ms &bull; ✦ Faithfulness: 0.91 &bull; ✦ Context Recall@K: 0.88 &bull; ✦ Zero egress byte leakage outside Docker virtual network.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeKey === 'vlm' && (
            <div className="space-y-6 text-sm">
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  01 / Research &amp; Formal Verification
                </h3>
                <div className="p-5 rounded-2xl bg-white border border-[#dfd6c6] space-y-3">
                  <h4 className="font-bold text-[#0e1828] text-base">
                    Active Conformal Control for Edge Vision-Language Models
                  </h4>
                  <p className="text-[#554d42] leading-relaxed">
                    Quantized models running on edge devices suffer from latent distribution drift and hallucinated defect scoring. Designed a non-parametric density-drift detector and a two-tier GPU-student / CPU-teacher inference cascade with conformal prediction guarantees.
                  </p>
                  <p className="text-xs text-[#706657] italic">
                    Paper currently under external peer review for IEEE publication. Advised by Dr. K. E. Srinivasa Desikan at IIITDM Kurnool.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeKey === 'meraqui' && (
            <div className="space-y-6 text-sm">
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  01 / Requirements-to-Shipping Loop
                </h3>
                <div className="p-5 rounded-2xl bg-white border border-[#dfd6c6] space-y-3">
                  <h4 className="font-bold text-[#0e1828] text-base">
                    Replacing Chatbot Hype with Deterministic ERP Schema Contracts
                  </h4>
                  <p className="text-[#554d42] leading-relaxed">
                    At Meraqui Ventures (karam.ai), initial proposals pushed for an open-ended conversational bot. By shadowing 6 senior recruiters across 18 hiring cycles, traced recruiter fatigue to manual re-keying into outdated ERP databases. Scoped deterministic REST API adapters with Pydantic validation, saving 15 hours weekly per recruiter.
                  </p>
                  <div className="pt-2">
                    <a
                      href="/artifact-meraqui.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0e1828] text-[#faf7f2] hover:bg-[#1a2942] text-xs font-semibold transition-colors"
                    >
                      <span>View Full Meraqui Product Spec</span>
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeKey === 'treacle' && (
            <div className="space-y-6 text-sm">
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#b88a3b]">
                  01 / Distributed Telemetry &amp; Reliability
                </h3>
                <div className="p-5 rounded-2xl bg-white border border-[#dfd6c6] space-y-3">
                  <h4 className="font-bold text-[#0e1828] text-base">
                    Kafka Log Streaming &amp; Incident Detection Dashboards
                  </h4>
                  <p className="text-[#554d42] leading-relaxed">
                    Engineered real-time data pipelines at Treacle Technologies (incubated at IIT Kanpur) processing 100k+ logs/day. Built Grafana and Elasticsearch observability suites that cut mean time to detect (MTTD) by 40% and automated 80% of preprocessing toil.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer / Navigation */}
        <div className="px-6 py-4 bg-[#f5eee3] border-t border-[#dfd6c6] flex flex-wrap items-center justify-between gap-3 text-xs text-[#706657]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelectKey(getNextCaseStudyKey(activeKey, -1))}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-[#0e1828] hover:text-[#faf7f2] border border-[#dfd6c6] transition-colors cursor-pointer font-semibold flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">arrow_back</span>
              <span>Previous</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectKey(getNextCaseStudyKey(activeKey, 1))}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-[#0e1828] hover:text-[#faf7f2] border border-[#dfd6c6] transition-colors cursor-pointer font-semibold flex items-center gap-1"
            >
              <span>Next</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>

          <span className="hidden sm:inline font-mono text-[11px]">
            Use Arrow keys ← → to cycle case studies
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-[#0e1828] text-[#faf7f2] hover:bg-[#1a2942] transition-colors font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
