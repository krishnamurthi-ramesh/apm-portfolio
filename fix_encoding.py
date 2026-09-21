import os
import re

files_to_process = [
    'src/main/resources/static/teardown-comet.html',
    'src/main/resources/static/teardown-kreditbee.html',
    'src/main/resources/static/teardown-phonepe.html'
]

figma_embed = '''  <ul class="check-list">
    <li><strong>Q1. What will you use them for?</strong> Everyday, Long walks/travel, Going out, Style-first.</li>
    <li><strong>Q2. How do you like your fit?</strong> Roomy, Balanced, Snug.</li>
    <li><strong>Q3. What's your style?</strong> Minimal, Street, Retro, Runner.</li>
    <li><strong>Q4. What matters most?</strong> Comfort, Weight, Style, Versatility.</li>
  </ul>
  
  <div style="margin-top: 32px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border-soft);">
    <iframe src="https://relay-define-38337038.figma.site/" width="100%" height="650" style="border:none;"></iframe>
  </div>'''

for filepath in files_to_process:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # Fix weird encoding artifacts
    content = content.replace('â†’', '→')
    content = content.replace('â€“', '–')
    content = content.replace('â€”', '—')
    content = content.replace('â€œ', '"')
    content = content.replace('â€', '"')
    content = content.replace('â€™', "'")
    content = content.replace('Â', '')
    
    # Add Figma embed to Comet
    if 'teardown-comet' in filepath:
        content = re.sub(r'<ul class="check-list">.*?</ul>', figma_embed, content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)