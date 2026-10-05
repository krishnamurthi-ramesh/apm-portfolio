import re

html_file = 'src/main/resources/templates/index.html'
with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

# find the limitations section and remove it
html = re.sub(r'<!--[^>]*WHAT I WOULDN\'T CLAIM[^>]*-->\s*<section class="sec" id="limitations">.*?</section>', '', html, flags=re.DOTALL)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(html)
print("Removed limitations section.")
