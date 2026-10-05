# -*- coding: utf-8 -*-
import os
import glob
import re

# 1. Update CSS contrast
css_file = 'src/main/resources/static/css/style.css'
with open(css_file, 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('--text-muted:   #6c757d;', '--text-muted:   #495057;')
css = css.replace('--text-dim:     #adb5bd;', '--text-dim:     #6c757d;')

with open(css_file, 'w', encoding='utf-8') as f:
    f.write(css)

# 2. Update all HTML files
html_files = glob.glob('src/main/resources/templates/*.html') + glob.glob('src/main/resources/static/*.html')

header_html = '''  <header class="site-nav" id="top">
    <div class="nav-inner">
      <a href="/" class="brand" style="text-decoration:none;">Krishnamurthi<span class="brand-accent">.</span></a>
      <nav class="nav-links" aria-label="Site navigation">
        <a href="/#work">Work</a>
        <a href="/#simulator">Simulator</a>
        <a href="/#skills">Skills</a>
        <a href="/resume.pdf?v=3" target="_blank">R&eacute;sum&eacute;</a>
      </nav>
      <button class="nav-mobile-toggle" aria-label="Toggle navigation" id="mobileToggle">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>'''

footer_html = '''  <footer id="contact" style="border-top: 1px solid var(--border-soft); margin-top: 80px; padding: 60px 0 40px; background: var(--bg-surface);">
    <div class="wrap">
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 24px;">
        <h2 style="font-size: 2rem; font-weight: 700; color: var(--text);">Let's Connect</h2>
        <p style="color: var(--text-muted); max-width: 500px; font-size: 1.05rem;">
          Currently seeking APM and Technical PM opportunities. Feel free to reach out to discuss product, AI, or potential roles.
        </p>
        <div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; margin-top: 8px;">
          <a href="mailto:kiccha1703@gmail.com" class="btn btn-primary">kiccha1703@gmail.com</a>
          <a href="https://www.linkedin.com/in/krishna9003762619murthi/" target="_blank" rel="noopener" class="btn btn-ghost">LinkedIn &nearr;</a>
          <a href="https://github.com/krishnamurthi-ramesh" target="_blank" rel="noopener" class="btn btn-ghost">GitHub &nearr;</a>
        </div>
      </div>
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 60px; padding-top: 24px; border-top: 1px solid var(--border); flex-wrap: wrap; gap: 16px; color: var(--text-dim); font-size: 0.85rem; line-height: 1.5;">
        <div style="max-width: 600px;">
          <span style="font-weight: 600; color: var(--text-muted);">Research</span> <br> IEEE paper in review &mdash; Reliability Framework for Quantized Vision-Language Models <br> (Advised: Dr. K.E. Srinivasa Desikan)
        </div>
        <div style="text-align: right;">
          &copy; 2026 Krishnamurthi Ramesh <br> Portfolio v3.0
        </div>
      </div>
    </div>
  </footer>'''

for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace header
    content = re.sub(r'<header.*?</header>', header_html, content, flags=re.DOTALL)
    
    # Replace footer
    content = re.sub(r'<footer.*?</footer>', footer_html, content, flags=re.DOTALL)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Unified headers and footers across all pages.")
