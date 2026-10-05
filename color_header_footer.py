# -*- coding: utf-8 -*-
import os
import glob
import re

css_file = 'src/main/resources/static/css/style.css'
with open(css_file, 'r', encoding='utf-8') as f:
    css = f.read()

# Update site-nav in CSS
css = re.sub(r'\.site-nav\s*\{.*?\}', '.site-nav {\n  position: fixed; top: 0; left: 0; right: 0; z-index: 100;\n  background: rgba(45, 27, 84, 0.95);\n  backdrop-filter: blur(18px);\n  -webkit-backdrop-filter: blur(18px);\n  border-bottom: 1px solid rgba(255,255,255,0.1);\n  transition: border-color 0.3s, background 0.3s;\n}', css, flags=re.DOTALL)

css = re.sub(r'\.site-nav\.scrolled\s*\{.*?\}', '.site-nav.scrolled { border-bottom-color: rgba(255,255,255,0.15); background: rgba(45, 27, 84, 0.98); }', css, flags=re.DOTALL)

# Add color overrides for nav links
if '.site-nav .brand' not in css:
    css += '''\n.site-nav .brand { color: #ffffff !important; }\n.site-nav .nav-links a { color: rgba(255,255,255,0.85) !important; }\n.site-nav .nav-links a:hover { color: #ffffff !important; }\n'''

with open(css_file, 'w', encoding='utf-8') as f:
    f.write(css)

html_files = glob.glob('src/main/resources/templates/*.html') + glob.glob('src/main/resources/static/*.html')

footer_html = '''  <footer id="contact" style="border-top: 1px solid rgba(255,255,255,0.1); margin-top: 80px; padding: 60px 0 40px; background: #2d1b54; color: #ffffff;">
    <div class="wrap">
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 24px;">
        <h2 style="font-size: 2rem; font-weight: 700; color: #ffffff;">Let's Connect</h2>
        <p style="color: rgba(255,255,255,0.8); max-width: 500px; font-size: 1.05rem;">
          Currently seeking APM and Technical PM opportunities. Feel free to reach out to discuss product, AI, or potential roles.
        </p>
        <div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; margin-top: 8px;">
          <a href="mailto:kiccha1703@gmail.com" class="btn btn-primary" style="background: #ffffff; color: #2d1b54;">kiccha1703@gmail.com</a>
          <a href="https://www.linkedin.com/in/krishna9003762619murthi/" target="_blank" rel="noopener" class="btn btn-ghost" style="color: #ffffff; border-color: rgba(255,255,255,0.3);">LinkedIn &nearr;</a>
          <a href="https://github.com/krishnamurthi-ramesh" target="_blank" rel="noopener" class="btn btn-ghost" style="color: #ffffff; border-color: rgba(255,255,255,0.3);">GitHub &nearr;</a>
        </div>
      </div>
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 60px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); flex-wrap: wrap; gap: 16px; color: rgba(255,255,255,0.6); font-size: 0.85rem; line-height: 1.5;">
        <div style="max-width: 600px;">
          <span style="font-weight: 600; color: #ffffff;">Research</span> <br> IEEE paper in review &mdash; Reliability Framework for Quantized Vision-Language Models <br> (Advised: Dr. K.E. Srinivasa Desikan)
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
    
    # Replace footer
    content = re.sub(r'<footer.*?</footer>', footer_html, content, flags=re.DOTALL)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Colored header and footer.")
