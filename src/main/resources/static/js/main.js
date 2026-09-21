/* ═══════════════════════════════════════════════════════════
   KRISHNAMURTHI PORTFOLIO v3 — MAIN JS
   ═══════════════════════════════════════════════════════════ */

// ── Scroll Reveal (Intersection Observer) ──────────────────
(function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal-up').forEach((el) => observer.observe(el));
})();

// ── Nav scroll state ──────────────────────────────────────
(function initNav() {
  const nav = document.querySelector('.site-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });
})();

// ── Mobile Nav Toggle ─────────────────────────────────────
(function initMobileNav() {
  const toggle = document.getElementById('mobileToggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.style.display === 'flex';
    links.style.display = isOpen ? 'none' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '60px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.background = 'rgba(10,10,15,0.97)';
    links.style.padding = '20px 28px 24px';
    links.style.borderBottom = '1px solid var(--border)';
    links.style.gap = '18px';
    if (isOpen) links.removeAttribute('style');
  });

  // Close on link click
  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => links.removeAttribute('style'));
  });
})();

// ── HOW I THINK cards ─────────────────────────────────────
(function initThinkCards() {
  const cards = document.querySelectorAll('.think-card');
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => card.classList.add('active'));
    card.addEventListener('mouseleave', () => card.classList.remove('active'));
    card.addEventListener('focus', () => card.classList.add('active'));
    card.addEventListener('blur', () => card.classList.remove('active'));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('active');
      }
    });
  });
})();

// ── PM SIMULATOR — Multi-Scenario ─────────────────────────
(function initSimulator() {
  const simText = document.getElementById('simText');
  const simPrompt = document.getElementById('simPrompt');
  const optionsContainer = document.getElementById('simOptions');
  const resultEl = document.getElementById('simResult');
  const resultInner = document.getElementById('simResultInner');
  const resetBtn = document.getElementById('simReset');
  const nextBtn = document.getElementById('simNext');
  const scenarioNum = document.getElementById('simScenarioNum');
  const scenarioTotal = document.getElementById('simScenarioTotal');

  if (!simText || !optionsContainer || !resultEl) return;

  const scenarios = [
    {
      text: `Activation dropped <strong>12%</strong> this week. No code was shipped.<br>
             Engineering wants to redesign onboarding.<br>
             Marketing wants to increase top-of-funnel acquisition.<br>
             Data shows: the drop only appears on <strong>Android</strong>.`,
      prompt: 'What do you investigate first?',
      options: [
        { id: 'onboarding', label: 'A', text: 'Approve the onboarding redesign — activation is clearly broken and needs a UX fix.' },
        { id: 'acquisition', label: 'B', text: 'Push for a new acquisition campaign — more users at top of funnel will compensate.' },
        { id: 'android', label: 'C', text: 'Deep-dive the Android funnel before shipping anything.' }
      ],
      responses: {
        android: {
          type: 'best',
          html: `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
              <span style="font-size:1.1rem;">✓</span>
              <span style="font-weight:600;color:var(--accent);font-size:1rem;">That's the right call.</span>
            </div>
            <div style="margin-bottom:12px;">
              <strong style="color:var(--text);font-size:0.9rem;display:block;margin-bottom:4px;">What I'd investigate</strong>
              <ul style="margin:0;padding-left:18px;color:var(--text-muted);font-size:0.9rem;line-height:1.5;">
                <li>Conversion impact of the 12% drop on overall revenue</li>
                <li>Specific OS versions affected within Android</li>
                <li>Recent backend or API changes that might selectively break Android</li>
              </ul>
            </div>
            <div style="margin-bottom:12px;">
              <strong style="color:var(--text);font-size:0.9rem;display:block;margin-bottom:4px;">Why this is the trade-off</strong>
              <span style="color:var(--text-muted);font-size:0.9rem;">Speed vs confidence. You are trading the speed of an immediate "fix" (like a redesign) for the confidence of diagnosing the actual root cause.</span>
            </div>
            <p style="color:var(--text-dim);font-size:0.9rem;padding:10px;background:var(--bg-surface2);border-radius:4px;border-left:2px solid var(--accent);">
              <strong style="color:var(--text);">PM principle:</strong> Don't optimize a local metric or approve a solution without understanding the system impact and root cause.
            </p>`
        },
        onboarding: {
          type: 'wrong',
          html: `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
              <span style="font-size:1.1rem;">✗</span>
              <span style="font-weight:600;color:var(--accent-warm);font-size:1rem;">That's a trap.</span>
            </div>
            <div style="margin-bottom:12px;">
              <strong style="color:var(--text);font-size:0.9rem;display:block;margin-bottom:4px;">What I'd investigate instead</strong>
              <span style="color:var(--text-muted);font-size:0.9rem;">The platform-specific nature of the drop (Android only) strongly suggests a technical regression, not a UX failure. A redesign won't fix a broken API endpoint.</span>
            </div>
            <p style="color:var(--text-dim);font-size:0.9rem;padding:10px;background:var(--bg-surface2);border-radius:4px;border-left:2px solid var(--accent-warm);">
              <strong style="color:var(--text);">PM principle:</strong> Never prescribe a UX solution to a technical problem. Isolate the signal first.
            </p>`
        },
        acquisition: {
          type: 'wrong',
          html: `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
              <span style="font-size:1.1rem;">✗</span>
              <span style="font-weight:600;color:var(--accent-warm);font-size:1rem;">You're filling a leaking bucket.</span>
            </div>
            <div style="margin-bottom:12px;">
              <strong style="color:var(--text);font-size:0.9rem;display:block;margin-bottom:4px;">Why this is the trade-off</strong>
              <span style="color:var(--text-muted);font-size:0.9rem;">Short-term metric padding vs long-term retention. Increasing acquisition masks the activation problem temporarily but destroys LTV and burns marketing budget.</span>
            </div>
            <p style="color:var(--text-dim);font-size:0.9rem;padding:10px;background:var(--bg-surface2);border-radius:4px;border-left:2px solid var(--accent-warm);">
              <strong style="color:var(--text);">PM principle:</strong> Fix the leak before you fill the bucket.
            </p>`
        }
      }
    },
    {
      text: `Your AI search feature improved accuracy by <strong>18%</strong>, but p95 latency went from <strong>200ms to 1.2s</strong>.<br>
             Engineering says optimization will take <strong>6 weeks</strong>.<br>
             Product launch is in <strong>3 weeks</strong>.<br>
             Users in beta haven't complained — but the sample size is small.`,
      prompt: 'What do you recommend?',
      options: [
        { id: 'ship-now', label: 'A', text: 'Ship with current latency — accuracy matters more and beta users didn\'t complain.' },
        { id: 'delay', label: 'B', text: 'Delay launch by 6 weeks for full optimization — never ship a slow product.' },
        { id: 'budget', label: 'C', text: 'Set a latency budget — ship with graceful degradation above a threshold.' }
      ],
      responses: {
        budget: {
          type: 'best',
          html: `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
              <span style="font-size:1.1rem;">✓</span>
              <span style="font-weight:600;color:var(--accent);font-size:1rem;">That's the PM move.</span>
            </div>
            <div style="margin-bottom:12px;">
              <strong style="color:var(--text);font-size:0.9rem;display:block;margin-bottom:4px;">What I'd investigate</strong>
              <ul style="margin:0;padding-left:18px;color:var(--text-muted);font-size:0.9rem;line-height:1.5;">
                <li>Maximum acceptable latency before users abandon the search</li>
                <li>Engineering effort required to implement a dynamic fallback</li>
                <li>Impact of falling back on overall search conversion</li>
              </ul>
            </div>
            <div style="margin-bottom:12px;">
              <strong style="color:var(--text);font-size:0.9rem;display:block;margin-bottom:4px;">Why this is the trade-off</strong>
              <span style="color:var(--text-muted);font-size:0.9rem;">User value (accuracy) vs business risk (latency abandonment). You accept a slight drop in accuracy at peak loads to guarantee a responsive user experience.</span>
            </div>
            <p style="color:var(--text-dim);font-size:0.9rem;padding:10px;background:var(--bg-surface2);border-radius:4px;border-left:2px solid var(--accent);">
              <strong style="color:var(--text);">PM principle:</strong> In AI products, cost, latency, and accuracy are a permanent triangle. Pick two deliberately and set guardrails for the third.
            </p>`
        },
        'ship-now': {
          type: 'wrong',
          html: `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
              <span style="font-size:1.1rem;">✗</span>
              <span style="font-weight:600;color:var(--accent-warm);font-size:1rem;">Small beta ≠ evidence.</span>
            </div>
            <div style="margin-bottom:12px;">
              <strong style="color:var(--text);font-size:0.9rem;display:block;margin-bottom:4px;">Why this is the trade-off</strong>
              <span style="color:var(--text-muted);font-size:0.9rem;">You are trading long-term retention for short-term launch targets. A 6x latency increase will compound at scale and destroy retention, regardless of beta feedback.</span>
            </div>
            <p style="color:var(--text-dim);font-size:0.9rem;padding:10px;background:var(--bg-surface2);border-radius:4px;border-left:2px solid var(--accent-warm);">
              <strong style="color:var(--text);">PM principle:</strong> Never use a small, highly-tolerant beta sample to validate a severe performance degradation.
            </p>`
        },
        delay: {
          type: 'wrong',
          html: `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
              <span style="font-size:1.1rem;">✗</span>
              <span style="font-weight:600;color:var(--accent-warm);font-size:1rem;">Perfection kills momentum.</span>
            </div>
            <div style="margin-bottom:12px;">
              <strong style="color:var(--text);font-size:0.9rem;display:block;margin-bottom:4px;">Why this is the trade-off</strong>
              <span style="color:var(--text-muted);font-size:0.9rem;">Speed to market vs optimal performance. A 6-week delay doubles time-to-launch, preventing you from gathering real-world data to guide those optimizations.</span>
            </div>
            <p style="color:var(--text-dim);font-size:0.9rem;padding:10px;background:var(--bg-surface2);border-radius:4px;border-left:2px solid var(--accent-warm);">
              <strong style="color:var(--text);">PM principle:</strong> Ship safely, not perfectly. Implement a fallback guardrail instead of blocking the launch.
            </p>`
        }
      }
    },
    {
      text: `Your top enterprise client requests a <strong>dashboard export</strong> feature.<br>
             They say it's a <strong>dealbreaker for renewal</strong> — $400k ARR at stake.<br>
             But usage data shows only <strong>3% of users</strong> ever open the dashboard.<br>
             Engineering estimates <strong>3 weeks</strong> to build the export.`,
      prompt: 'What do you do?',
      options: [
        { id: 'build', label: 'A', text: 'Build it — losing $400k ARR costs more than 3 weeks of engineering time.' },
        { id: 'decline', label: 'B', text: 'Decline — 3% usage means the dashboard itself is the problem, not the export.' },
        { id: 'dig', label: 'C', text: 'Dig deeper — understand what the client actually needs the export for before deciding.' }
      ],
      responses: {
        dig: {
          type: 'best',
          html: `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
              <span style="font-size:1.1rem;">✓</span>
              <span style="font-weight:600;color:var(--accent);font-size:1rem;">Right. Understand the "why" first.</span>
            </div>
            <div style="margin-bottom:12px;">
              <strong style="color:var(--text);font-size:0.9rem;display:block;margin-bottom:4px;">What I'd investigate</strong>
              <ul style="margin:0;padding-left:18px;color:var(--text-muted);font-size:0.9rem;line-height:1.5;">
                <li>What the client actually does with the exported CSV data</li>
                <li>Whether the dashboard is missing critical views for enterprise workflows</li>
                <li>If the client really needs a scheduled report instead of a manual export</li>
              </ul>
            </div>
            <div style="margin-bottom:12px;">
              <strong style="color:var(--text);font-size:0.9rem;display:block;margin-bottom:4px;">Why this is the trade-off</strong>
              <span style="color:var(--text-muted);font-size:0.9rem;">Short-term appeasement vs long-term product value. Building an export button is fast, but it might distract from the fact that your core dashboard is failing 97% of users.</span>
            </div>
            <p style="color:var(--text-dim);font-size:0.9rem;padding:10px;background:var(--bg-surface2);border-radius:4px;border-left:2px solid var(--accent);">
              <strong style="color:var(--text);">PM principle:</strong> "Build me an export" is a feature request, not a problem statement. Always solve the underlying workflow problem.
            </p>`
        },
        build: {
          type: 'wrong',
          html: `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
              <span style="font-size:1.1rem;">✗</span>
              <span style="font-weight:600;color:var(--accent-warm);font-size:1rem;">Revenue pressure ≠ product strategy.</span>
            </div>
            <div style="margin-bottom:12px;">
              <strong style="color:var(--text);font-size:0.9rem;display:block;margin-bottom:4px;">Why this is the trade-off</strong>
              <span style="color:var(--text-muted);font-size:0.9rem;">You are trading 3 weeks of engineering capacity to solve a symptom for one client, ignoring why 97% of your users abandon the dashboard in the first place.</span>
            </div>
            <p style="color:var(--text-dim);font-size:0.9rem;padding:10px;background:var(--bg-surface2);border-radius:4px;border-left:2px solid var(--accent-warm);">
              <strong style="color:var(--text);">PM principle:</strong> Don't let a single client hold your roadmap hostage without understanding their actual workflow.
            </p>`
        },
        decline: {
          type: 'wrong',
          html: `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
              <span style="font-size:1.1rem;">✗</span>
              <span style="font-weight:600;color:var(--accent-warm);font-size:1rem;">Don't dismiss — investigate.</span>
            </div>
            <div style="margin-bottom:12px;">
              <strong style="color:var(--text);font-size:0.9rem;display:block;margin-bottom:4px;">Why this is the trade-off</strong>
              <span style="color:var(--text-muted);font-size:0.9rem;">Data purity vs customer empathy. Low usage means the feature is failing, but dismissing a $400k client without digging into *why* they need it damages trust and revenue.</span>
            </div>
            <p style="color:var(--text-dim);font-size:0.9rem;padding:10px;background:var(--bg-surface2);border-radius:4px;border-left:2px solid var(--accent-warm);">
              <strong style="color:var(--text);">PM principle:</strong> Data tells you *what* is happening (3% usage). It doesn't tell you *why*. Talk to the client before declining.
            </p>`
        }
      }
    }
  ];

  let currentScenario = 0;
  scenarioTotal.textContent = scenarios.length;

  function renderScenario(index) {
    const s = scenarios[index];
    scenarioNum.textContent = index + 1;
    simText.innerHTML = s.text;
    simPrompt.textContent = s.prompt;

    // Clear options and result
    optionsContainer.innerHTML = '';
    resultEl.classList.add('hidden');
    resultInner.innerHTML = '';
    nextBtn.style.display = 'none';

    // Create option buttons
    s.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'sim-option';
      btn.dataset.choice = opt.id;
      btn.innerHTML = `
        <span class="sim-opt-num">${opt.label}</span>
        <span class="sim-opt-text">${opt.text}</span>
      `;
      btn.addEventListener('click', () => handleChoice(opt.id, s));
      optionsContainer.appendChild(btn);
    });
  }

  function handleChoice(choiceId, scenario) {
    const allBtns = optionsContainer.querySelectorAll('.sim-option');
    const response = scenario.responses[choiceId];

    allBtns.forEach((btn) => {
      const id = btn.dataset.choice;
      if (id === choiceId) {
        btn.classList.add(response.type === 'best' ? 'chosen' : 'partial');
      } else {
        btn.classList.add('wrong');
      }
      btn.disabled = true;
    });

    resultInner.innerHTML = response.html;
    resultEl.classList.remove('hidden');

    // Show next button if not last scenario
    if (currentScenario < scenarios.length - 1) {
      nextBtn.style.display = 'inline-flex';
    }

    setTimeout(() => {
      resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }

  // Reset current scenario
  resetBtn.addEventListener('click', () => {
    renderScenario(currentScenario);
  });

  // Next scenario
  nextBtn.addEventListener('click', () => {
    currentScenario++;
    renderScenario(currentScenario);
    document.getElementById('simulator-widget').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Initialize first scenario
  renderScenario(0);
})();

// ── Active nav highlighting ────────────────────────────────
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.style.color = link.getAttribute('href') === `#${id}`
              ? 'var(--text)'
              : '';
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((sec) => observer.observe(sec));
})();
