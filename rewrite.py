import os
import re

files_to_process = [
    'src/main/resources/static/teardown-comet.html',
    'src/main/resources/static/teardown-kreditbee.html',
    'src/main/resources/static/teardown-phonepe.html',
    'src/main/resources/static/artifact-meraqui.html'
]

standard_head = '''<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Teardown - Krishnamurthi</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css">
</head>'''

standard_nav = '''  <header class="site-nav scrolled" id="top">
    <div class="nav-inner">
      <a href="/" class="brand" style="text-decoration:none;">K<span class="brand-accent">.</span></a>
      <nav class="nav-links" aria-label="Site navigation">
        <a href="/#think">Thinking</a>
        <a href="/#work">Work</a>
        <a href="/#simulator">PM Sim</a>
        <a href="/#skills">Skills</a>
        <a href="/#contact">Contact</a>
      </nav>
    </div>
  </header>'''

standard_footer = '''  <footer id="contact">
    <div class="wrap">
      <div class="footer-main">
        <div class="footer-headline reveal-up">Got a messy product problem?</div>
        <p class="footer-sub reveal-up delay-1">Let's figure out what's actually broken.</p>
        <p class="footer-tag reveal-up delay-2">Currently seeking <strong>APM / Technical PM</strong> opportunities in AI, SaaS &amp; technology products.</p>
        <div class="footer-links reveal-up delay-3">
          <a href="mailto:kiccha1703@gmail.com" class="btn btn-primary">kiccha1703@gmail.com</a>
          <a href="/" class="btn btn-ghost">&larr; Back to portfolio</a>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copy"><span>&copy; 2026 Krishnamurthi Ramesh</span></div>
      </div>
    </div>
  </footer>'''

for filepath in files_to_process:
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    content = re.sub(r'<head>.*?</head>', standard_head, content, flags=re.DOTALL)
    content = re.sub(r'<header class="site".*?>.*?</header>', standard_nav, content, flags=re.DOTALL)
    content = re.sub(r'<header class="site-nav.*?>.*?</header>', standard_nav, content, flags=re.DOTALL)
    content = re.sub(r'<footer>.*?</footer>', standard_footer, content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("HTML rewrite complete.")