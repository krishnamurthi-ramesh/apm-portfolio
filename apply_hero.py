# -*- coding: utf-8 -*-
import re

html_file = 'src/main/resources/templates/index.html'
with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

hero_new = '''  <section class="hero" id="hero">
    <div class="hero-bg-grid" aria-hidden="true"></div>
    <div class="hero-glow" aria-hidden="true"></div>
    <div class="wrap" style="display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap;">
      
      <div class="hero-left" style="flex: 1; min-width: 300px; max-width: 600px; text-align: left;">
        <div class="hero-eyebrow reveal-up">
          <span class="dot"></span>
          Associate Product Manager <span class="sep">&times;</span> AI Products
        </div>

        <h1 class="hero-title reveal-up delay-1">
          I don't just take<br>requirements.
          <span class="hero-accent"> I interrogate them.</span>
        </h1>

        <p class="hero-sub reveal-up delay-2">
          Engineering graduate &middot; MBA candidate &middot; AI/ML builder<br>
          <span style="display:inline-block; margin-top: 10px; color: var(--text); font-weight: 500;">I enjoy figuring out what should be built before figuring out how to build it.</span>
        </p>

        <!-- Stat strip -->
        <div class="hero-stats reveal-up delay-3" style="justify-content: flex-start; text-align: left;">
          <div class="stat" style="text-align: left; padding: 0 20px 0 0;">
            <div class="stat-val">+15%</div>
            <div class="stat-label">AI matching precision shipped</div>
          </div>
          <div class="stat-div" aria-hidden="true"></div>
          <div class="stat" style="text-align: left; padding: 0 20px;">
            <div class="stat-val">-40%</div>
            <div class="stat-label">Incident detection time</div>
          </div>
          <div class="stat-div" aria-hidden="true"></div>
          <div class="stat" style="text-align: left; padding: 0 0 0 20px;">
            <div class="stat-val">100k+</div>
            <div class="stat-label">Logs/day in production</div>
          </div>
        </div>

        <div class="hero-cta reveal-up delay-4" style="justify-content: flex-start;">
          <a href="#work" class="btn btn-primary" id="hero-work-btn">See Product Work</a>
          <a href="resume.pdf?v=3" target="_blank" rel="noopener" class="btn btn-ghost" id="hero-resume-btn">R&eacute;sum&eacute; &darr;</a>
          <a href="https://www.linkedin.com/in/krishna9003762619murthi/" target="_blank" rel="noopener" class="btn btn-ghost" id="hero-linkedin-btn">LinkedIn &nearr;</a>
          <a href="https://github.com/krishnamurthi-ramesh" target="_blank" rel="noopener" class="btn btn-ghost" id="hero-github-btn">GitHub &nearr;</a>
        </div>

        <p class="hero-hook reveal-up delay-4">
          <span class="mono-tag">// </span>Seeking APM &middot; Technical PM roles in AI, SaaS &amp; technology products.
        </p>
      </div>

      <div class="hero-right" style="flex: 1; min-width: 300px; height: 500px; display: flex; align-items: center; justify-content: center; position: relative;">
        <script type="module" src="https://cdn.spline.design/@splinetool/viewer@2.0.70/build/spline-viewer.js"></script>
        <spline-viewer style="mix-blend-mode: multiply;" url="https://prod.spline.design/gKDNYJKuHa2zHnLy/scene.splinecode"></spline-viewer>
      </div>

    </div>

    <div class="hero-scroll-hint" aria-hidden="true">
      <span>Scroll</span>
      <div class="scroll-line"></div>
    </div>
  </section>'''

html = re.sub(r'<section class="hero" id="hero">.*?</section>', hero_new, html, flags=re.DOTALL)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)
print("done")
