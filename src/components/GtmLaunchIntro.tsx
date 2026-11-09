import React, { useState, useEffect, useRef } from 'react';

interface GtmLaunchIntroProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const GtmLaunchIntro: React.FC<GtmLaunchIntroProps> = ({ isOpen, onComplete }) => {
  const [activePillar, setActivePillar] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const hasFinishedRef = useRef(false);

  const PM_PILLARS = [
    {
      id: 'discovery',
      number: '01',
      title: 'User Empathy & JTBD',
      tagline: 'Pinpointing where funnels leak',
      desc: 'Observing real user sessions, isolating anxiety moments, and turning ambiguous pain into crisp problem statements.',
      badge: 'PROBLEM SPACE',
      color: 'from-[#c99b4a] to-[#e5b869]',
    },
    {
      id: 'tech',
      number: '02',
      title: 'AI Systems & Engineering',
      tagline: 'Feasibility meets clean architecture',
      desc: 'Grounding AI in unit economics ($0.0018/token), latency guardrails (<480ms P99), and deterministic API contracts.',
      badge: 'TECHNICAL FEASIBILITY',
      color: 'from-[#60a5fa] to-[#93c5fd]',
    },
    {
      id: 'gtm',
      number: '03',
      title: 'GTM & Business Impact',
      tagline: 'Orchestrating market adoption',
      desc: 'Aligning product rollouts with distribution flywheels, pricing models, and measurable business outcomes.',
      badge: 'GO-TO-MARKET',
      color: 'from-[#34d399] to-[#6ee7b7]',
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
    setActivePillar(0);

    const startTime = performance.now();
    const duration = 3800; // 3.8s warm cinematic pacing

    let animFrame = 0;
    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 33) {
        setActivePillar(0);
      } else if (pct < 68) {
        setActivePillar(1);
      } else {
        setActivePillar(2);
      }

      if (pct < 100) {
        animFrame = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(handleFinish, 300);
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
      aria-label="Welcome to Krishnamurthi's Product Portfolio"
      onClick={handleFinish}
      className={`fixed inset-0 z-[10000] flex flex-col justify-between p-6 sm:p-10 md:p-12 bg-[#080d16] text-[#faf7f2] select-none cursor-pointer transition-all duration-500 overflow-hidden ${
        isExiting
          ? 'opacity-0 scale-105 blur-lg pointer-events-none'
          : 'opacity-100 scale-100 blur-0'
      }`}
    >
      {/* Background Ambient Radial Glows & Elegant Architectural Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft rotating gold and navy ambient blooms */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-[#c99b4a]/16 via-[#1a2942]/10 to-transparent rounded-full blur-3xl animate-orbital-pulse" />
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-gradient-to-tl from-[#b88a3b]/14 via-[#0f172a]/20 to-transparent rounded-full blur-3xl animate-orbital-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-radial from-[#1e2e48]/25 via-transparent to-transparent rounded-full blur-3xl" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />
      </div>

      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e5b869] animate-ping" />
          <span className="text-[#faf7f2] tracking-wider uppercase font-semibold">
            KRISHNAMURTHI // APM × AI SYSTEMS
          </span>
          <span className="hidden sm:inline-block text-[#b88a3b]">✦</span>
          <span className="hidden sm:inline-block text-[#9ba8bc]">IIM Visakhapatnam (MBA) × IIITDM Kurnool (B.Tech)</span>
        </div>

        <div className="flex items-center gap-2 text-[#9ba8bc] text-[11px] bg-white/[0.05] hover:bg-white/[0.1] px-3.5 py-1.5 rounded-full border border-white/10 transition-colors">
          <span>Click anywhere to explore</span>
          <span className="text-[#f0c46c]">➔</span>
        </div>
      </div>

      {/* Main Center Stage: Warm Welcome & Animated PM Sweet Spot Triad */}
      <div className="relative z-10 my-auto max-w-[860px] w-full mx-auto space-y-8 text-center sm:text-left py-4">
        {/* Personal Greeting Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#b88a3b]/15 border border-[#b88a3b]/35 text-[#f0c46c] text-[11px] font-mono tracking-widest font-semibold uppercase">
            <span>Welcome to my Product Workspace</span>
            <span>✦</span>
            <span>Go-To-Market &amp; Strategy</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#faf7f2] tracking-tight font-[family-name:var(--font-editorial)] leading-[1.12]">
            Hello. I&apos;m{' '}
            <span className="font-[family-name:var(--font-signature)] italic font-normal text-[#f0c46c]">
              Krishnamurthi.
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#d4c8b6] max-w-2xl leading-relaxed">
            I don’t just gather requirements — I interrogate them. Operating at the sweet spot where <strong className="text-[#faf7f2]">user friction</strong>, <strong className="text-[#faf7f2]">technical feasibility</strong>, and <strong className="text-[#faf7f2]">GTM distribution</strong> converge.
          </p>
        </div>

        {/* The Animated PM Triad / Sweet Spot Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 pt-2">
          {PM_PILLARS.map((pillar, idx) => {
            const isActive = activePillar === idx;
            return (
              <div
                key={pillar.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePillar(idx);
                }}
                className={`relative p-5 rounded-2xl border transition-all duration-300 text-left flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#0f1826]/95 border-[#b88a3b] shadow-[0_12px_32px_rgba(184,138,59,0.22)] scale-[1.02]'
                    : 'bg-white/[0.03] border-white/10 hover:border-white/20 opacity-70 hover:opacity-90'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                        isActive
                          ? 'bg-[#0e1828] text-[#f0c46c] border border-[#b88a3b]'
                          : 'bg-white/10 text-white/60'
                      }`}
                    >
                      {pillar.number}
                    </span>
                    <span
                      className={`text-[9.5px] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider ${
                        isActive
                          ? 'bg-[#b88a3b]/20 text-[#f0c46c]'
                          : 'bg-white/5 text-white/40'
                      }`}
                    >
                      {pillar.badge}
                    </span>
                  </div>

                  <div>
                    <h2
                      className={`text-base sm:text-lg font-bold font-[family-name:var(--font-editorial)] tracking-tight ${
                        isActive ? 'text-[#faf7f2]' : 'text-[#cfd8e3]'
                      }`}
                    >
                      {pillar.title}
                    </h2>
                    <p className="text-[11px] font-mono text-[#e5b869] font-medium mt-0.5">
                      {pillar.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-[#a6b4c8] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                {/* Active Indicator Bar */}
                <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                  <span className={isActive ? 'text-[#f0c46c] font-semibold' : 'text-white/40'}>
                    {isActive ? '● Core Discipline' : 'Explore Pillar'}
                  </span>
                  <span className="text-[#b88a3b]">→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button & Smooth Automatic Timer */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <button
            type="button"
            onClick={handleFinish}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#b88a3b] via-[#c99b4a] to-[#e5b869] text-[#0e1828] font-bold text-sm tracking-wide shadow-[0_8px_24px_rgba(184,138,59,0.35)] hover:shadow-[0_12px_32px_rgba(184,138,59,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#f0c46c]"
          >
            <span>Explore Portfolio &amp; Case Studies</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>

          <div className="flex items-center gap-3 text-xs font-mono text-[#9ba8bc]">
            <span>Entering automatically in</span>
            <span className="font-bold text-[#f0c46c]">
              {Math.max(1, Math.ceil((100 - progress) / 28))}s
            </span>
            <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                style={{ width: `${progress}%` }}
                className="h-full rounded-full bg-[#f0c46c] transition-all duration-75"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Signature */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-[#9ba8bc] border-t border-white/10 pt-4">
        <div>
          <span>Crafted for high-ambiguity product teams</span>
          <span className="text-[#b88a3b]"> • </span>
          <span>Zero fluff, high conviction</span>
        </div>
        <div className="flex items-center gap-2 text-[#d4c8b6]">
          <span>Press</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[#faf7f2] font-semibold text-[10px]">
            SPACE
          </kbd>
          <span>to skip straight to work</span>
        </div>
      </div>
    </div>
  );
};
