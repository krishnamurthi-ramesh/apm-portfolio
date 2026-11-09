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
                <span>Page 1: 1-Page Executive Resume • Page 2: Verified Nyaya Shastra Research Certificate</span>
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
              <div className="flex-1 min-h-[68vh] rounded-2xl overflow-hidden border border-[#dfd6c6] bg-white shadow-inner">
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0`}
                  title="Krishnamurthi Resume PDF"
                  className="w-full h-full min-h-[68vh] border-0"
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

              {/* Core Teardowns Grid */}
              <div className="space-y-3">
                <h5 className="text-xs uppercase font-bold text-[#7d7363] tracking-wider">
                  Featured Product Teardowns &amp; Case Studies
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-white border border-[#dfd6c6] space-y-1">
                    <span className="font-bold text-[#0e1828] block">
                      Inside OpenAI’s In-House Data Agent
                    </span>
                    <p className="text-[#554d42]">
                      Context-first design across 70,000 datasets and 600 PB; 6-layer context pipeline and golden question eval harness.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#dfd6c6] space-y-1">
                    <span className="font-bold text-[#0e1828] block">
                      Notion Agents: Doing More for Less
                    </span>
                    <p className="text-[#554d42]">
                      Pricing, dynamic model routing (Sonnet/Haiku), and run-level budget envelopes for autonomous agent spend.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#dfd6c6] space-y-1">
                    <span className="font-bold text-[#0e1828] block">
                      Comet AI Search Teardown
                    </span>
                    <p className="text-[#554d42]">
                      Reverse-engineered AI "Finder" discovery flow to diagnose conversational recommendation drop-offs before PDP cart checkout.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#dfd6c6] space-y-1">
                    <span className="font-bold text-[#0e1828] block">
                      KreditBee &amp; PhonePe Lending Funnels
                    </span>
                    <p className="text-[#554d42]">
                      Diagnosed document-upload OCR failure bottlenecks vs. marketplace trust breaks across live digital lending funnels.
                    </p>
                  </div>
                </div>
              </div>

              {/* Education & Achievements */}
              <div className="space-y-3">
                <h5 className="text-xs uppercase font-bold text-[#7d7363] tracking-wider">
                  Education &amp; Distinctions
                </h5>
                <div className="p-4 rounded-xl bg-white border border-[#dfd6c6] text-xs space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[#0e1828]">
                      IIM Visakhapatnam — Master of Business Administration (MBA)
                    </span>
                    <span className="text-[#7d7363] font-mono">2025 – 2027</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[#0e1828]">
                      IIITDM Kurnool — B.Tech in Computer Science &amp; Engineering
                    </span>
                    <span className="text-[#7d7363] font-mono">2022 – 2026</span>
                  </div>
                  <div className="pt-2 border-t border-[#dfd6c6]/60 text-[#554d42] flex flex-wrap gap-x-4 gap-y-1.5">
                    <a
                      href="/nyaya-internship-certificate.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#0e1828] hover:underline transition-colors inline-flex items-center gap-1 font-medium text-[#806b47]"
                    >
                      <span>✦ Nyaya Shastra Research Certificate (IIITDM Kurnool)</span>
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
                      <span>✦ 2nd Place – GDG Hackathon</span>
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
