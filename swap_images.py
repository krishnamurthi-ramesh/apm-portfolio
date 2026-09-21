import os
import shutil
import re

base_src = "e:/Krishna_portfolio/src/main/resources/static"
ux_dir = os.path.join(base_src, "images", "ux")
os.makedirs(ux_dir, exist_ok=True)

comet_src_dir = "e:/Krishna_portfolio/comet UX Designs"
kreditbee_src_dir = "e:/Krishna_portfolio/KreditBEE UX Designs"
phonepe_src_dir = "e:/Krishna_portfolio/Phonepe UX Designs"

shutil.copy(os.path.join(comet_src_dir, "1 (2).png"), os.path.join(ux_dir, "comet-1.png"))
shutil.copy(os.path.join(comet_src_dir, "2 (2).png"), os.path.join(ux_dir, "comet-2.png"))
shutil.copy(os.path.join(comet_src_dir, "3 (2).png"), os.path.join(ux_dir, "comet-3.png"))
shutil.copy(os.path.join(comet_src_dir, "4.png"), os.path.join(ux_dir, "comet-4.png"))

shutil.copy(os.path.join(kreditbee_src_dir, "Screenshot 2026-09-22 010541.png"), os.path.join(ux_dir, "kreditbee-ux.png"))
shutil.copy(os.path.join(phonepe_src_dir, "Design Loan Marketplace Handoff (Community).png"), os.path.join(ux_dir, "phonepe-ux.png"))

comet_html = os.path.join(base_src, "teardown-comet.html")
with open(comet_html, "r", encoding="utf-8") as f:
    comet = f.read()

comet_embed = '''<div class="ux-gallery" style="margin-top: 32px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
    <img src="/images/ux/comet-1.png" style="width: 100%; border-radius: 8px; border: 1px solid var(--border-soft);" alt="Comet UX 1">
    <img src="/images/ux/comet-2.png" style="width: 100%; border-radius: 8px; border: 1px solid var(--border-soft);" alt="Comet UX 2">
    <img src="/images/ux/comet-3.png" style="width: 100%; border-radius: 8px; border: 1px solid var(--border-soft);" alt="Comet UX 3">
    <img src="/images/ux/comet-4.png" style="width: 100%; border-radius: 8px; border: 1px solid var(--border-soft);" alt="Comet UX 4">
  </div>
  <div style="margin-top: 24px; text-align: center;">
    <a href="https://relay-define-38337038.figma.site/" target="_blank" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px;">
      View Interactive Prototype ↗
    </a>
  </div>'''
comet = re.sub(r'<div style="margin-top: 32px; border-radius: 12px; overflow: hidden; border: 1px solid var\(--border-soft\);">\s*<iframe src="https://relay-define-38337038.figma.site/".*?</iframe>\s*</div>', comet_embed, comet, flags=re.DOTALL)
with open(comet_html, "w", encoding="utf-8") as f:
    f.write(comet)

kb_html = os.path.join(base_src, "teardown-kreditbee.html")
with open(kb_html, "r", encoding="utf-8") as f:
    kb = f.read()

kb_embed = '''<div class="ux-gallery" style="margin-top: 32px; text-align: center;">
    <img src="/images/ux/kreditbee-ux.png" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--border-soft);" alt="KreditBee UX">
  </div>
  <div style="margin-top: 24px; text-align: center;">
    <a href="https://option-delete-93793571.figma.site/" target="_blank" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px;">
      View Interactive Prototype ↗
    </a>
  </div>'''
kb = re.sub(r'<div style="margin-top: 32px; border-radius: 12px; overflow: hidden; border: 1px solid var\(--border-soft\);">\s*<iframe src="https://option-delete-93793571.figma.site/".*?</iframe>\s*</div>', kb_embed, kb, flags=re.DOTALL)
with open(kb_html, "w", encoding="utf-8") as f:
    f.write(kb)

pp_html = os.path.join(base_src, "teardown-phonepe.html")
with open(pp_html, "r", encoding="utf-8") as f:
    pp = f.read()

pp_embed = '''<div class="ux-gallery" style="margin-top: 32px; text-align: center;">
    <img src="/images/ux/phonepe-ux.png" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--border-soft);" alt="PhonePe UX">
  </div>
  <div style="margin-top: 24px; text-align: center;">
    <a href="https://www.figma.com/community/file/1683941915370258862" target="_blank" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px;">
      View Figma File ↗
    </a>
  </div>'''
pp = re.sub(r'<div style="margin-top: 32px; border-radius: 12px; overflow: hidden; border: 1px solid var\(--border-soft\);">\s*<iframe style="border:none;" width="100%" height="650" src="https://www.figma.com/embed.*?</iframe>\s*</div>', pp_embed, pp, flags=re.DOTALL)
with open(pp_html, "w", encoding="utf-8") as f:
    f.write(pp)

print("Done updating HTML.")