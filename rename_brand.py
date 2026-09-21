import os
import re

files_to_process = [
    'src/main/resources/templates/index.html',
    'src/main/resources/static/teardown-comet.html',
    'src/main/resources/static/teardown-kreditbee.html',
    'src/main/resources/static/teardown-phonepe.html',
    'src/main/resources/static/artifact-meraqui.html'
]

replacement = '<a href="/" class="brand" style="text-decoration:none;">Krishnamurthi<span class="brand-accent">.</span></a>'

for filepath in files_to_process:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    content = re.sub(r'<div class="brand">.*?</div>', replacement, content)
    content = re.sub(r'<a href="/" class="brand".*?>.*?</a>', replacement, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
