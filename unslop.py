import os
import glob
import re

# 1. Update CSS
css_file = 'src/main/resources/static/css/style.css'
with open(css_file, 'r', encoding='utf-8') as f:
    css = f.read()

new_tokens = ''':root {
  --bg:           #ffffff;
  --bg-surface:   #f8f9fa;
  --bg-surface2:  #f1f3f5;
  --bg-card:      #ffffff;
  --bg-hover:     #f8f9fa;
  --border:       #dee2e6;
  --border-soft:  #e9ecef;
  --border-glow:  rgba(111, 66, 193, 0.15);

  --text:         #212529;
  --text-muted:   #6c757d;
  --text-dim:     #adb5bd;

  --accent:       #6f42c1;
  --accent-dim:   rgba(111, 66, 193, 0.08);
  --accent-glow:  rgba(111, 66, 193, 0.18);
  --accent-warm:  #fd7e14;
  --accent-blue:  #0d6efd;
  --accent-ieee:  #ffc107;

  --radius:       8px;
  --radius-lg:    14px;
  --radius-xl:    20px;
  --maxw:         1040px;

  --ease-out:     cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);
}'''

css = re.sub(r':root\s*\{.*?\n\}', new_tokens, css, flags=re.DOTALL)

# Add some tweaks for light mode: selection should have white text
css = css.replace('::selection { background: var(--accent); color: #000; }', '::selection { background: var(--accent); color: #fff; }')
css = css.replace('background: rgba(10,10,15,0.82);', 'background: rgba(255,255,255,0.82);')
css = css.replace('background: rgba(10,10,15,0.95);', 'background: rgba(255,255,255,0.95);')

with open(css_file, 'w', encoding='utf-8') as f:
    f.write(css)

# 2. Update sub-pages
files = glob.glob('src/main/resources/static/*.html')

header_replacement = '''    <header class="site-nav scrolled" id="top" style="border-bottom: 1px solid var(--border-soft);">
    <div class="nav-inner" style="justify-content: flex-start;">
      <a href="/" class="brand" style="text-decoration:none; font-size: 0.95rem; font-weight: 500; color: var(--text-muted);">&larr; Back to Portfolio</a>
    </div>
  </header>'''

footer_replacement = '''  <footer style="padding: 40px 0; text-align: center; border-top: 1px solid var(--border-soft); margin-top: 60px;">
    <div class="wrap">
      <a href="/" class="btn btn-ghost" style="margin-bottom: 16px;">&larr; Back to Portfolio</a>
      <div style="color: var(--text-dim); font-size: 0.85rem;">&copy; 2026 Krishnamurthi Ramesh</div>
    </div>
  </footer>'''

for f in files:
    if 'index.html' in f: continue
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # replace header
    content = re.sub(r'<header class="site-nav scrolled" id="top">.*?</header>', header_replacement, content, flags=re.DOTALL)
    
    # replace footer
    content = re.sub(r'<footer id="contact">.*?</footer>', footer_replacement, content, flags=re.DOTALL)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Updated theme and simplified sub-page templates.")
