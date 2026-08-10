/* ═══════════════════════════════════════════════════════════
   KRISHNAMURTHI PORTFOLIO v2 — MAIN JS
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

// ── PM SIMULATOR ──────────────────────────────────────────
(function initSimulator() {
  const options = document.querySelectorAll('.sim-option');
  const resultEl = document.getElementById('simResult');
  const resultInner = document.getElementById('simResultInner');
  const resetBtn = document.getElementById('simReset');
  const optionsContainer = document.getElementById('simOptions');
  if (!options.length || !resultEl) return;

  const responses = {
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
          Shipping an onboarding redesign before isolating the root cause is guessing with extra steps.
          Running acquisition to compensate for a broken funnel is burning budget on a leaking bucket.
        </p>
        <p style="color:var(--text-dim);font-size:0.9rem;">
          <span style="font-family:'JetBrains Mono',monospace;color:var(--accent);">Next steps:</span>
          Segment the funnel by platform → identify which step the drop occurs on → check for 
          OS version or device regressions → reproduce before escalating to engineering.
        </p>
      `
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
        </p>
        <p style="margin-bottom:12px;">
          The Android-specific signal tells you this isn't a general UX problem — it's probably 
          a platform regression. A redesign wouldn't fix a platform bug. You'd ship a new onboarding,
          the metric stays the same, and now you've wasted 3 weeks and confused your hypothesis.
        </p>
        <p style="color:var(--text-dim);font-size:0.9rem;">
          <span style="font-family:'JetBrains Mono',monospace;color:var(--accent);">Rule:</span>
          Isolate before you ship. The Android funnel is your first investigation, not a redesign approval.
        </p>
      `
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
        <p style="margin-bottom:12px;">
          Worse — an acquisition bump would mask the underlying problem in your top-line numbers,
          making it even harder to spot and fix.
        </p>
        <p style="color:var(--text-dim);font-size:0.9rem;">
          <span style="font-family:'JetBrains Mono',monospace;color:var(--accent);">Rule:</span>
          Fix the leak before you fill the bucket. Investigate the Android funnel first — 
          then revisit acquisition once activation is healthy.
        </p>
      `
    }
  };

  function lockOptions(chosen) {
    options.forEach((opt) => {
      const choice = opt.dataset.choice;
      if (choice === chosen) {
        opt.classList.add(responses[chosen].type === 'best' ? 'chosen' : 'partial');
      } else {
        opt.classList.add('wrong');
      }
      opt.disabled = true;
    });
  }

  options.forEach((opt) => {
    opt.addEventListener('click', () => {
      const choice = opt.dataset.choice;
      lockOptions(choice);
      resultInner.innerHTML = responses[choice].html;
      resultEl.classList.remove('hidden');

      // Smooth scroll into result
      setTimeout(() => {
        resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    });
  });

  resetBtn.addEventListener('click', () => {
    options.forEach((opt) => {
      opt.classList.remove('chosen', 'wrong', 'partial');
      opt.disabled = false;
    });
    resultEl.classList.add('hidden');
    resultInner.innerHTML = '';
  });
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
