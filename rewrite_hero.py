# -*- coding: utf-8 -*-
import os

html_file = 'src/main/resources/templates/index.html'
with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

start_marker = '<div class="hero-eyebrow reveal-up">'
end_marker = '<div class="hero-scroll-hint"'

start_idx = html.find(start_marker)
end_idx = html.find(end_marker)

if start_idx != -1 and end_idx != -1:
    content_to_wrap = html[start_idx:end_idx]
    
    new_hero_content = f'''
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 40px; width: 100%;">
        <div class="hero-left" style="flex: 1; max-width: 600px; text-align: left;">
          {content_to_wrap}
        </div>
        <div class="hero-right" style="flex: 1; max-width: 500px; height: 500px; display: flex; align-items: center; justify-content: center; position: relative;">
          <script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.3/build/spline-viewer.js"></script>
          <spline-viewer url="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"></spline-viewer>
        </div>
      </div>
      '''
    
    html = html[:start_idx] + new_hero_content + html[end_idx:]

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)

print("Hero layout rewritten.")
