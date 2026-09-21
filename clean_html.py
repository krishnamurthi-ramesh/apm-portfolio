import os
import re

base_src = "e:/Krishna_portfolio/src/main/resources/static"

# Update Comet
comet_html = os.path.join(base_src, "teardown-comet.html")
with open(comet_html, "r", encoding="utf-8") as f:
    comet = f.read()

comet = re.sub(r'<div class="ux-gallery"[^>]*>', '<div class="ux-gallery grid">', comet)
comet = re.sub(r'<img src="(/images/ux/comet-\d\.png)"[^>]*alt="([^"]*)">', r'<img src="\1" alt="\2">', comet)

with open(comet_html, "w", encoding="utf-8") as f:
    f.write(comet)

# Update KB
kb_html = os.path.join(base_src, "teardown-kreditbee.html")
with open(kb_html, "r", encoding="utf-8") as f:
    kb = f.read()

kb = re.sub(r'<div class="ux-gallery"[^>]*>', '<div class="ux-gallery center">', kb)
kb = re.sub(r'<img src="(/images/ux/kreditbee-ux\.png)"[^>]*alt="([^"]*)">', r'<img src="\1" alt="\2">', kb)

with open(kb_html, "w", encoding="utf-8") as f:
    f.write(kb)

# Update PP
pp_html = os.path.join(base_src, "teardown-phonepe.html")
with open(pp_html, "r", encoding="utf-8") as f:
    pp = f.read()

pp = re.sub(r'<div class="ux-gallery"[^>]*>', '<div class="ux-gallery center">', pp)
pp = re.sub(r'<img src="(/images/ux/phonepe-ux\.png)"[^>]*alt="([^"]*)">', r'<img src="\1" alt="\2">', pp)

with open(pp_html, "w", encoding="utf-8") as f:
    f.write(pp)

print("HTML cleaned")