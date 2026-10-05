# -*- coding: utf-8 -*-
import os
import re

html_file = 'src/main/resources/templates/index.html'
with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the interior of the hero section
hero_match = re.search(r'<section class="hero"[^>]*>.*?</section>', html, flags=re.DOTALL)
if hero_match:
    hero_content = hero_match.group(0)
    
    # Wrap the content inside <div class="wrap"> with <div class="hero-split">
    # We will extract everything inside <div class="wrap"> up to the end of the wrap
    
    wrap_match = re.search(r'(<div class="wrap">)(.*?)(<div class="hero-scroll-hint">)', hero_content, flags=re.DOTALL)
    
    if wrap_match:
        old_wrap_content = wrap_match.group(2)
        
        # Modify the stats styling slightly for a left-aligned layout
        new_wrap_content = f'''<div class="hero-split" style="display: flex; align-items: center; gap: 40px; width: 100%;">
          <div class="hero-left" style="flex: 1; max-width: 650px;">
            {old_wrap_content}
          </div>
          <div class="hero-right" style="flex: 1; height: 500px; display: flex; justify-content: center; align-items: center;">
            <script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.3/build/spline-viewer.js"></script>
            <spline-viewer url="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"></spline-viewer>
          </div>
        </div>'''
        
        new_hero = hero_content.replace(old_wrap_content, new_wrap_content)
        html = html.replace(hero_content, new_hero)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)
print("Updated hero section layout.")
