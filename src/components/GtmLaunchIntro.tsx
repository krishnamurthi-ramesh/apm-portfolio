import React, { useState, useEffect, useRef } from 'react';

interface GtmLaunchIntroProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const GtmLaunchIntro: React.FC<GtmLaunchIntroProps> = ({ isOpen, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const hasFinishedRef = useRef(false);

  const PHASES = [
    {
      step: '01',
      title: 'MARKET DISCOVERY & ICP SYNTHESIS',
      detail: 'Analyzing friction points • Sizing TAM/SAM • JTBD user interviews',
      status: 'VERIFIED',
    },
    {
      step: '02',
      title: 'UNIT ECONOMICS & SYSTEM MOAT',
      detail: 'Validating token inference costs ($0.0018/query) • LTV/CAC > 3.8x',
      status: 'OPTIMIZED',
    },
    {
      step: '03',
      title: 'GTM ENGINE & LAUNCH ROLLOUT',
      detail: 'Zero-to-one sequence ready • Dispatching APM portfolio suite',
      status: 'DEPLOYED',
    },
  ];

  const handleFinish = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 450);
  };

  useEffect(() => {
    if (!isOpen) return;
    hasFinishedRef.current = false;
    setIsExiting(false);
    setProgress(0);
    setPhaseIndex(0);

    const startTime = performance.now();
    const duration = 2100; // 2.1s runtime

    let animFrame = 0;
    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 38) {
        setPhaseIndex(0);
      } else if (pct < 76) {
        setPhaseIndex(1);
      } else {
        setPhaseIndex(2);
      }

      if (pct < 100) {
        animFrame = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(handleFinish, 200);
      }
    };

    animFrame = requestAnimationFrame(updateProgress);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Escape' || e.code === 'Enter') {
        e.preventDefault();
        handleFinish();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="GTM Strategy Launch Sequence"
      onClick={handleFinish}
      className={`fixed inset-0 z-[10000] flex flex-col justify-between p-6 sm:p-10 md:p-14 bg-[#070c14] text-[#faf7f2] select-none cursor-pointer transition-all duration-500 ${
        isExiting
          ? 'opacity-0 scale-105 blur-md pointer-events-none'
          : 'opacity-100 scale-100 blur-0'
      }`}
    >
      {/* Background Ambient Radial Glow & Architectural Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#b88a3b]/12 via-[#1a2942]/20 to-transparent rounded-full blur-3xl animate-orbital-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />
      </div>

      {/* Top Header Telemetry Bar */}
      <div className="relative z-10 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
          <span className="text-[#b88a3b] tracking-wider uppercase font-semibold">
            KRISHNAMURTHI // GTM ENGINE v2.6
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[#9ba8bc] text-[11px] bg-white/[0.04] px-3 py-1.5 rounded-full border border-white/10">
          <span>Click anywhere or press</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[#faf7f2] font-semibold text-[10px]">
            SPACE
          </kbd>
          <span>to skip</span>
          <span className="text-[#b88a3b]">➔</span>
        </div>
      </div>

      {/* Center Stage: Monogram Crest + GTM Stage Diagnostics */}
      <div className="relative z-10 my-auto max-w-[680px] w-full mx-auto space-y-8 text-center sm:text-left">
        {/* Monogram Crest with Orbital Radar Rings */}
        <div className="flex items-center justify-center sm:justify-start gap-4">
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Outer radar rotating dashed ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[#b88a3b]/50 animate-radar-sweep" />
            {/* Inner glowing pulse ring */}
            <div className="absolute inset-1.5 rounded-full border border-[#f0c46c]/40 animate-orbital-pulse" />
            <div className="w-11 h-11 rounded-full bg-[#0e1828] border border-[#b88a3b] flex items-center justify-center shadow-[0_0_24px_rgba(184,138,59,0.35)]">
              <span className="font-serif font-extrabold text-[#f0c46c] text-lg">
                K
              </span>
            </div>
          </div>

          <div className="space-y-1 text-left">
            <span className="inline-block px-2.5 py-0.5 rounded bg-[#b88a3b]/15 text-[#f0c46c] border border-[#b88a3b]/30 text-[10px] font-mono tracking-widest font-bold uppercase">
              APM × AI Systems Telemetry
            </span>
            <h1 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-editorial)] text-[#faf7f2] tracking-tight">
              Executing Go-To-Market Protocol
            </h1>
          </div>
        </div>

        {/* 3 Interactive GTM Stage Indicators */}
        <div className="space-y-3">
          {PHASES.map((phase, idx) => {
            const isPassed = phaseIndex > idx;
            const isCurrent = phaseIndex === idx;

            return (
              <div
                key={phase.step}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-300 text-left ${
                  isCurrent
                    ? 'bg-[#0e1828]/90 border-[#b88a3b] shadow-[0_4px_24px_rgba(184,138,59,0.18)] translate-x-1'
                    : isPassed
                    ? 'bg-white/[0.02] border-white/10 opacity-70'
                    : 'bg-white/[0.01] border-white/5 opacity-40'
                }`}
              >
                <div className="flex items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isPassed
                          ? 'bg-[#10b981] text-[#070c14]'
                          : isCurrent
                          ? 'bg-[#b88a3b] text-[#070c14]'
                          : 'bg-white/10 text-white/50'
                      }`}
                    >
                      {isPassed ? '✓' : phase.step}
                    </span>
                    <span
                      className={`font-semibold tracking-wider ${
                        isCurrent ? 'text-[#f0c46c]' : 'text-[#faf7f2]'
                      }`}
                    >
                      {phase.title}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider ${
                      isPassed
                        ? 'text-[#10b981] bg-[#10b981]/10'
                        : isCurrent
                        ? 'text-[#f0c46c] bg-[#b88a3b]/20 animate-pulse'
                        : 'text-white/30 bg-white/5'
                    }`}
                  >
                    {isPassed ? 'VERIFIED' : isCurrent ? 'RUNNING...' : 'PENDING'}
                  </span>
                </div>

                <p className="text-[11px] text-[#9ba8bc] mt-1.5 pl-7 sm:pl-7.5 leading-relaxed">
                  {phase.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* High-Precision Progress Bar with Dynamic Reading */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#9ba8bc]">
            <span className="flex items-center gap-2">
              <span className="text-[#f0c46c]">●</span>
              <span>LAUNCH VELOCITY</span>
            </span>
            <span className="font-bold text-[#faf7f2]">{progress}%</span>
          </div>

          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/10">
            <div
              style={{ width: `${progress}%` }}
              className="h-full rounded-full bg-gradient-to-r from-[#b88a3b] via-[#f0c46c] to-[#ffffff] transition-all duration-75 shadow-[0_0_12px_rgba(240,196,108,0.7)]"
            />
          </div>
        </div>
      </div>

      {/* Footer Branding & Dual Pedigree Signature */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-[#9ba8bc] border-t border-white/10 pt-4">
        <div>
          <span>Dual Pedigree: </span>
          <span className="text-[#faf7f2] font-semibold">
            IIM Visakhapatnam (MBA) × IIITDM Kurnool (B.Tech CSE)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#b88a3b]">0 to 1 Product Delivery</span>
          <span>•</span>
          <span className="text-[#f0c46c]">Click anywhere to enter ➔</span>
        </div>
      </div>
    </div>
  );
};
