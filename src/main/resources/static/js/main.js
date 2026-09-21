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
            <p style="margin-bottom:12px;">
              The Android-specific signal is the most important piece of information in this scenario.
              If activation dropped <strong>only on Android</strong> with no code change, you have a 
              platform-specific regression — not a general onboarding problem and not a top-of-funnel problem.
            </p>
            <p style="margin-bottom:12px;">
              <span style="font-family:'JetBrains Mono',monospace;color:var(--accent);">Next steps:</span>
              Segment the funnel by platform → identify which step the drop occurs on → check for 
              OS version or device regressions → reproduce before escalating to engineering.
            </p>`
        },
        onboarding: {
          type: 'wrong',
          html: `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
              <span style="font-size:1.1rem;">✗</span>
              <span style="font-weight:600;color:var(--accent-warm);font-size:1rem;">That's a trap.</span>
            </div>
            <p style="margin-bottom:12px;">
              Approving a redesign without understanding <em>why</em> the metric dropped is 
              exactly the kind of decision that creates expensive, wrong solutions.
              The Android-specific signal tells you this isn't a general UX problem — it's probably 
              a platform regression. A redesign wouldn't fix a platform bug.
            </p>
            <p style="color:var(--text-dim);font-size:0.9rem;">
              <span style="font-family:'JetBrains Mono',monospace;color:var(--accent);">Rule:</span>
              Isolate before you ship. The Android funnel is your first investigation, not a redesign approval.
            </p>`
        },
        acquisition: {
          type: 'wrong',
          html: `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
              <span style="font-size:1.1rem;">✗</span>
              <span style="font-weight:600;color:var(--accent-warm);font-size:1rem;">You're filling a leaking bucket.</span>
            </div>
            <p style="margin-bottom:12px;">
              Increasing acquisition when activation is broken is one of the most expensive mistakes 
              in product. You'd be paying to bring more users into a funnel that's already losing them.
            </p>
            <p style="color:var(--text-dim);font-size:0.9rem;">
              <span style="font-family:'JetBrains Mono',monospace;color:var(--accent);">Rule:</span>
              Fix the leak before you fill the bucket. Investigate the Android funnel first.
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
            <p style="margin-bottom:12px;">
              This is the <strong>cost / latency / accuracy triangle</strong> in action. You don't pick one — you define acceptable boundaries for each.
              Set a latency budget (e.g., p95 < 600ms). If the model can't meet it, fall back to the faster, slightly less accurate model.
            </p>
            <p style="color:var(--text-dim);font-size:0.9rem;">
              <span style="font-family:'JetBrains Mono',monospace;color:var(--accent);">Key insight:</span>
              "Beta users didn't complain" with a small sample is not evidence. At scale, 1.2s p95 will destroy retention.
              Ship with guardrails, measure both accuracy AND latency in production, then optimize.
            </p>`
        },
        'ship-now': {
          type: 'wrong',
          html: `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
              <span style="font-size:1.1rem;">✗</span>
              <span style="font-weight:600;color:var(--accent-warm);font-size:1rem;">Small beta ≠ evidence.</span>
            </div>
            <p style="margin-bottom:12px;">
              "Beta users didn't complain" from a small sample is not the same as "latency is acceptable at scale."
              A 6× latency increase (200ms → 1.2s) at p95 will compound under real production load and traffic patterns.
            </p>
            <p style="color:var(--text-dim);font-size:0.9rem;">
              <span style="font-family:'JetBrains Mono',monospace;color:var(--accent);">Better:</span>
              Set a latency budget. Ship with a fallback to the faster model above the threshold. Measure real-world impact.
            </p>`
        },
        delay: {
          type: 'wrong',
          html: `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
              <span style="font-size:1.1rem;">✗</span>
              <span style="font-weight:600;color:var(--accent-warm);font-size:1rem;">Perfection kills momentum.</span>
            </div>
            <p style="margin-bottom:12px;">
              A 6-week delay doubles your time-to-launch. In product, you learn more from 3 weeks of real usage data
              than 6 weeks of optimization in a vacuum. The key is to ship safely — not perfectly.
            </p>
            <p style="color:var(--text-dim);font-size:0.9rem;">
              <span style="font-family:'JetBrains Mono',monospace;color:var(--accent);">Better:</span>
              Define a latency budget. Use a two-tier approach: fast model as default, accurate model when latency allows. Ship on time. Optimize with real data.
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
            <p style="margin-bottom:12px;">
              "Build me an export" is a feature request, not a problem statement. Why do they need the export?
              If they're exporting to run analysis in Excel, the real problem might be that your dashboard lacks the right views.
              If they're sharing reports with their leadership, the real solution might be a scheduled email report — not a CSV button.
            </p>
            <p style="color:var(--text-dim);font-size:0.9rem;">
              <span style="font-family:'JetBrains Mono',monospace;color:var(--accent);">Key insight:</span>
              3% dashboard usage combined with a "dealbreaker" export request means the client has a workflow your product doesn't serve.
              Understand the workflow. Then decide what to build.
            </p>`
        },
        build: {
          type: 'wrong',
          html: `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
              <span style="font-size:1.1rem;">✗</span>
              <span style="font-weight:600;color:var(--accent-warm);font-size:1rem;">Revenue pressure ≠ product strategy.</span>
            </div>
            <p style="margin-bottom:12px;">
              Building a feature because one client threatens churn sets a dangerous precedent.
              If only 3% of users open the dashboard, the export feature will serve even fewer.
              You'd be spending 3 weeks solving a symptom — not the underlying problem.
            </p>
            <p style="color:var(--text-dim);font-size:0.9rem;">
              <span style="font-family:'JetBrains Mono',monospace;color:var(--accent);">Better:</span>
              Ask: "What do you do with the data after you export it?" That conversation reveals the real need.
            </p>`
        },
        decline: {
          type: 'wrong',
          html: `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
              <span style="font-size:1.1rem;">✗</span>
              <span style="font-weight:600;color:var(--accent-warm);font-size:1rem;">Don't dismiss — investigate.</span>
            </div>
            <p style="margin-bottom:12px;">
              Low dashboard usage doesn't automatically mean the export request is wrong.
              It might mean the dashboard itself doesn't serve enterprise workflows — which is a <em>bigger</em> problem worth understanding.
              Dismissing a $400k client's request without investigation is how you lose trust and revenue simultaneously.
            </p>
            <p style="color:var(--text-dim);font-size:0.9rem;">
              <span style="font-family:'JetBrains Mono',monospace;color:var(--accent);">Better:</span>
              Talk to the client. Understand their workflow. Then propose a solution that serves both their need and your product direction.
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
