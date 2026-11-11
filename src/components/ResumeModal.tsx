import React, { useState } from 'react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [activeTab, setActiveTab] = useState<'pdf' | 'brief'>('pdf');
  if (!isOpen) return null;

  const pdfUrl = '/resume.pdf';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#090e17]/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#faf7f2] rounded-3xl shadow-[0_24px_70px_rgba(14,24,40,0.35)] border border-[#dfd6c6] overflow-hidden text-[#121820] my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#dfd6c6] bg-gradient-to-r from-[#f5eee3] via-[#faf7f2] to-[#f0e7db] shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#0e1828] text-[#b88a3b] font-serif font-bold text-xs flex items-center justify-center border border-[#b88a3b]/40 shadow-sm">
              K
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-[family-name:var(--font-editorial)] text-[#0e1828] tracking-tight leading-none">
                Krishnamurthi — Master PM Resume
              </h3>
              <p className="text-[11px] font-semibold text-[#806b47] mt-0.5">
                Associate Product Manager × AI Products • IIMV × IIITDMK
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab switch */}
            <div className="flex items-center p-1 rounded-full bg-[#e8ded0] border border-[#dfd6c6] text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('pdf')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === 'pdf'
                    ? 'bg-[#0e1828] text-[#faf7f2] shadow-2xs'
                    : 'text-[#554d42] hover:text-[#0e1828]'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">description</span>
                <span className="hidden sm:inline">Official PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('brief')}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === 'brief'
                    ? 'bg-[#0e1828] text-[#faf7f2] shadow-2xs'
                    : 'text-[#554d42] hover:text-[#0e1828]'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">view_agenda</span>
                <span className="hidden sm:inline">Interactive Brief</span>
              </button>
            </div>

            <a
              href={pdfUrl}
              download="Krishnamurthi_Resume_PM.pdf"
              className="px-3 py-1.5 rounded-full bg-[#0e1828] text-[#faf7f2] hover:bg-[#1a2942] text-xs font-semibold flex items-center gap-1 transition-colors shadow-2xs"
            >
              <span>Download</span>
              <span className="material-symbols-outlined text-[13px]">download</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#eae1d2] hover:bg-[#0e1828] hover:text-[#faf7f2] text-[#554d42] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close resume modal"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-modal-scroll flex-1">
          {activeTab === 'pdf' ? (
            <div className="space-y-3 h-full flex flex-col">
              <div className="flex items-center justify-between text-xs px-2 text-[#706657]">
                <span>1-Page Executive Resume</span>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#806b47] hover:text-[#0e1828] flex items-center gap-1"
                >
                  <span>Open in separate tab</span>
                  <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                </a>
              </div>
              <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-[#dfd6c6] bg-white shadow-md">
                <img
                  src="/resume-preview.svg"
                  alt="Krishnamurthi 1-Page Executive Resume"
                  draggable={false}
                  className="w-full h-auto block select-none"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Dual Pedigree Banner */}
              <div className="p-5 rounded-2xl bg-[#f0e8dc] border border-[#dfd6c6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#b88a3b]"></span>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#806b47]">
                      Dual Academic Pedigree
                    </p>
                  </div>
                  <h4 className="text-base font-bold text-[#0e1828] mt-1">
                    IIM Visakhapatnam (MBA) × IIITDM Kurnool (B.Tech CSE)
                  </h4>
                  <p className="text-xs text-[#554d42] mt-0.5">
                    Product discovery, AI agent architectures, telemetry observability, and quantitative unit economics.
                  </p>
                </div>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-full bg-[#0e1828] hover:bg-[#1a2942] text-[#faf7f2] text-xs font-semibold transition-all shrink-0 shadow-sm flex items-center gap-1.5"
                >
                  <span>Open PDF</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
              </div>

              {/* Skills Strip */}
              <div className="space-y-2.5">
                <h5 className="text-xs uppercase font-bold text-[#7d7363] tracking-wider">
                  Skills
                </h5>
                <div className="p-4 rounded-xl bg-white border border-[#dfd6c6] text-xs space-y-1.5 text-[#554d42]">
                  <p>
                    <strong className="text-[#0e1828]">Product Management:</strong> Product Discovery, Problem Framing, PRDs, User Research, Funnel Analysis, RICE Prioritization, North Star Metrics, A/B Testing, SaaS Unit Economics, Stakeholder Management
                  </p>
                  <p>
                    <strong className="text-[#0e1828]">AI / ML:</strong> Generative AI, LLM Evaluation (Ragas, Recall@K), RAG, Model Routing, Quantization, NLP, PyTorch, FAISS
                  </p>
                  <p>
                    <strong className="text-[#0e1828]">Engineering &amp; Tools:</strong> Python, SQL, REST APIs, FastAPI, Kafka, Docker, Elasticsearch, Grafana, PostgreSQL, Figma, Git, GitHub
                  </p>
                </div>
              </div>

              {/* Experience */}
              <div className="space-y-3">
                <h5 className="text-xs uppercase font-bold text-[#7d7363] tracking-wider">
                  Experience
                </h5>
                <div className="space-y-2.5 text-xs">
                  <div className="p-3.5 rounded-xl bg-white border border-[#dfd6c6] space-y-1">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="font-bold text-[#0e1828]">
                        Research Intern — Classical Epistemology
                      </span>
                      <span className="text-[#7d7363] font-mono shrink-0">Jan 2026 – Jul 2026</span>
                    </div>
                    <p className="text-[#806b47] font-medium">IIITDM Kurnool • Kurnool, India</p>
                    <p className="text-[#554d42]">
                      Formulated deterministic verification rules from classical Nyaya Shastra dialectical logic and mapped out-of-distribution failure bounds to inform edge AI hallucination guardrails.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#dfd6c6] space-y-1">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="font-bold text-[#0e1828]">
                        Data Science Intern — Meraqui Ventures Pvt. Ltd. (karam.ai)
                      </span>
                      <span className="text-[#7d7363] font-mono shrink-0">Apr 2025 – Jul 2025</span>
                    </div>
                    <p className="text-[#806b47] font-medium">Remote / Pune, India</p>
                    <p className="text-[#554d42]">
                      Lifted candidate-matching precision by 15%, cut manual ERP entry by 15% (15+ hrs/wk saved) and data errors by 12–15% via REST/webhook ERP syncs, and delivered JSON-to-XML ETL pipelines.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#dfd6c6] space-y-1">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="font-bold text-[#0e1828]">
                        Development Intern — Data Systems &amp; Infrastructure, Treacle Technologies
                      </span>
                      <span className="text-[#7d7363] font-mono shrink-0">Jun 2024 – Aug 2024</span>
                    </div>
                    <p className="text-[#806b47] font-medium">Incubated at SIIC, IIT Kanpur • Remote</p>
                    <p className="text-[#554d42]">
                      Slashed incident detection latency by 40% via Wazuh, Elasticsearch &amp; Grafana dashboards; processed 100k+ logs/day across VMs with a Kafka streaming pipeline and automated telemetry scripts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Selected Product & AI Projects (Product First) */}
              <div className="space-y-3">
                <h5 className="text-xs uppercase font-bold text-[#7d7363] tracking-wider">
                  Selected Product &amp; AI Projects (Product First)
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-white border border-[#dfd6c6] space-y-1">
                    <span className="font-bold text-[#0e1828] block">
                      Inside OpenAI’s In-House Data Agent
                    </span>
                    <p className="text-[#554d42]">
                      Audited 6-layer context engineering (Git crawling, Slack/Docs memory, RBAC) and 200+ golden-question evals driving 17× speedup across 70k datasets (600 PB).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#dfd6c6] space-y-1">
                    <span className="font-bold text-[#0e1828] block">
                      Notion Agents: Pricing, Routing &amp; Cost Control
                    </span>
                    <p className="text-[#554d42]">
                      Evaluated 5/10/20 credit economics and Sonnet-to-Haiku routing; scoped P0 run-level budget envelopes ($10/1k) for autonomous runs.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#dfd6c6] space-y-1">
                    <span className="font-bold text-[#0e1828] block">
                      Comet AI Search — Funnel &amp; Friction Teardown
                    </span>
                    <p className="text-[#554d42]">
                      Isolated stateless &ldquo;Finder&rdquo; resets causing 42% pre-PDP drop-off; scoped persistent fit memory targeting +22% lift via Finder-assisted add-to-cart KPI.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#dfd6c6] space-y-1">
                    <span className="font-bold text-[#0e1828] block">
                      KreditBee &amp; PhonePe Lending Funnels
                    </span>
                    <p className="text-[#554d42]">
                      Contrasted KYC OCR upload failures vs. NBFC handoff trust breaks; scoped inline doc pre-checks targeting +24% KYC completion and -35% handoff drop-off.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#dfd6c6] space-y-1">
                    <span className="font-bold text-[#0e1828] block">
                      Active Conformal Control — Edge VLM Safety (Research)
                    </span>
                    <p className="text-[#554d42]">
                      Built density-drift monitor (ppDRE) &amp; student/teacher cascade reaching 94.2% precision and ~60% token cut (IEEE peer review).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#faf7f2] border border-[#dfd6c6] space-y-1">
                    <span className="font-bold text-[#0e1828] block">
                      Hymba-1.5B-Eigen-Hybrid-4bit (AI Systems)
                    </span>
                    <p className="text-[#554d42]">
                      Cut edge VRAM by 65% (2.91 GB → 1.01 GB) with &lt;1% perplexity loss via selective FP16/4-bit CUDA quantization.
                    </p>
                  </div>
                </div>
              </div>

              {/* Education, Positions of Responsibility & Certifications */}
              <div className="space-y-3">
                <h5 className="text-xs uppercase font-bold text-[#7d7363] tracking-wider">
                  Education, Positions of Responsibility &amp; Certifications
                </h5>
                <div className="p-4 rounded-xl bg-white border border-[#dfd6c6] text-xs space-y-2.5">
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="font-bold text-[#0e1828]">
                      IIM Visakhapatnam — Post-Graduate Program in Management (PGPMCI)
                    </span>
                    <span className="text-[#7d7363] font-mono shrink-0">Mar 2025 – Mar 2027</span>
                  </div>
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="font-bold text-[#0e1828]">
                      IIITDM Kurnool — B.Tech in Computer Science &amp; Engineering
                    </span>
                    <span className="text-[#7d7363] font-mono shrink-0">Nov 2022 – Apr 2026</span>
                  </div>
                  <div className="pt-2 border-t border-[#dfd6c6]/60 text-[#554d42] space-y-1">
                    <p>
                      <strong className="text-[#0e1828]">Positions of Responsibility:</strong> Student Representative, CPAC (IIMV) • Co-Speaker &amp; ML Mentor, Google Developer Club (Intro to Intermediate ML) • Event Management Lead, Solasta 2025 (150+ participants &amp; organizers)
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#dfd6c6]/60 text-[#554d42] flex flex-wrap gap-x-4 gap-y-1.5">
                    <a
                      href="https://www.coursera.org/account/accomplishments/verify/YT9Z5U2YJAJX"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#0e1828] hover:underline transition-colors inline-flex items-center gap-1"
                    >
                      <span>✦ Supervised ML (Stanford Online)</span>
                      <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                    </a>
                    <a
                      href="https://www.coursera.org/account/accomplishments/verify/3X1M09A4GTGI"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#0e1828] hover:underline transition-colors inline-flex items-center gap-1"
                    >
                      <span>✦ Unsupervised Learning, Recommenders &amp; RL (Stanford Online)</span>
                      <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                    </a>
                    <a
                      href="https://drive.google.com/file/d/1g6X2YPjZxRs4j8CIz_G60PFAHmy4-Fz5/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#0e1828] hover:underline transition-colors inline-flex items-center gap-1"
                    >
                      <span>✦ Oracle Cloud AI Certified (92.5%)</span>
                      <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                    </a>
                    <a
                      href="https://drive.google.com/file/d/1dJh3mcSI-d8jB0FwPh_Xr4CJaXOgTMVW/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#0e1828] hover:underline transition-colors inline-flex items-center gap-1"
                    >
                      <span>✦ 2nd Place – GDG Hackathon &amp; DataWorks Hackathon</span>
                      <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="p-4 rounded-xl bg-[#f0e8dc] border border-[#dfd6c6] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <span className="font-bold text-[#0e1828]">Direct Contact</span>
                  <p className="text-[#554d42]">kiccha1703@gmail.com • +91 90037 62619</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="mailto:kiccha1703@gmail.com"
                    className="px-3.5 py-1.5 rounded-full bg-[#0e1828] text-[#faf7f2] font-semibold hover:bg-[#1a2942] transition-colors"
                  >
                    Send Email
                  </a>
                  <a
                    href={pdfUrl}
                    download="Krishnamurthi_Resume_PM.pdf"
                    className="px-3.5 py-1.5 rounded-full bg-white text-[#0e1828] border border-[#dfd6c6] font-semibold hover:bg-[#faf7f2] transition-colors"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#dfd6c6] bg-[#f5eee3] flex items-center justify-between text-xs text-[#7d7363] shrink-0">
          <span>Verified profile • Updated for Vercel Deployment</span>
          <button
            type="button"
            onClick={onClose}
            className="font-bold text-[#0e1828] hover:underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
