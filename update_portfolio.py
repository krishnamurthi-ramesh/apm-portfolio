# -*- coding: utf-8 -*-
import re
import os

with open('stitch_interactive_ai_pm_portfolio/code.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Clean up line 297 devtools dump
bad_h2_regex = re.compile(r'<h2 class="font-headline-lg text-headline-lg text-slate-900 leading-tight tracking-tight"></h2><h2 class="font-headline-md sm:text-\[32px\] text-slate-900 font-bold leading-tight tracking-tight" style="[^"]*">I don\'t just take requirements\. I <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-violet font-extrabold underline decoration-indigo-300 underline-offset-4" style="[^"]*">interrogate</span> them\.</h2>')

clean_h2 = '<h2 class="font-headline-md sm:text-[32px] text-slate-900 font-bold leading-tight tracking-tight mt-2">I don\'t just take requirements. I <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-violet font-extrabold underline decoration-indigo-300 underline-offset-4">interrogate</span> them.</h2>'

html = bad_h2_regex.sub(clean_h2, html)

# Strip any accidental --tw- leftovers
html = re.sub(r'\s*style="[^"]*--tw-[^"]*"', '', html)

# 2. Add fonts Space Grotesk and JetBrains Mono alongside Plus Jakarta Sans
old_font = 'family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1'
new_font = 'family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;family=Space+Grotesk:wght@500;600;700&amp;family=JetBrains+Mono:wght@400;500;600&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1'
html = html.replace(old_font, new_font)

# 3. Insert transparent cutout portrait in hero
old_hero_right = '''<!-- Right: Transparent Cutout Portrait of Krishnamurthi -->
<div class="lg:col-span-5 relative flex justify-center lg:justify-end items-end h-[420px] sm:h-[480px] lg:h-[540px]">
<!-- Subtle ambient backlight glow -->
<div class="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-secondary/30 blur-3xl -z-10 pointer-events-none"></div>

<!-- Floating Context Tag over portrait base -->

</div>'''

new_hero_right = '''<!-- Right: Transparent Cutout Portrait of Krishnamurthi -->
<div class="lg:col-span-5 relative flex justify-center lg:justify-end items-end h-[420px] sm:h-[480px] lg:h-[540px]">
  <!-- Subtle ambient backlight glow -->
  <div class="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-secondary/30 blur-3xl -z-10 pointer-events-none"></div>

  <!-- Transparent Cutout Portrait -->
  <img src="/images/krishnamurthi-cutout.png" alt="Krishnamurthi" class="h-full max-h-[520px] object-contain object-bottom drop-shadow-[0_20px_40px_rgba(79,70,229,0.35)] z-10 relative pointer-events-none transition-transform duration-500 hover:scale-[1.02]">

  <!-- Floating Context Tag over portrait base -->
  <div class="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-indigo-500/40 shadow-xl flex items-center gap-2">
    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
    <span class="font-label-mono-tag text-label-mono-tag text-white uppercase tracking-wider">AI PM &middot; Systems &amp; Telemetry</span>
  </div>
</div>'''

html = html.replace(old_hero_right, new_hero_right)

# 4. Nav: Add Resume link to Center Navigation Links
old_nav_links = '''<a class="px-3 py-1.5 font-label-lg text-label-lg text-slate-600 hover:text-primary hover:bg-indigo-50/70 rounded-full transition-colors" href="#teardowns">Teardowns</a>
</nav>'''

new_nav_links = '''<a class="px-3 py-1.5 font-label-lg text-label-lg text-slate-600 hover:text-primary hover:bg-indigo-50/70 rounded-full transition-colors" href="#teardowns">Teardowns</a>
<a class="px-3 py-1.5 font-label-lg text-label-lg text-slate-600 hover:text-primary hover:bg-indigo-50/70 rounded-full transition-colors" href="/resume.pdf?v=3" target="_blank" rel="noopener noreferrer">R&eacute;sum&eacute; &darr;</a>
</nav>'''

html = html.replace(old_nav_links, new_nav_links)

# 5. Section 01 About: Update About Image with local fallback
old_about_img = '<img alt="Krishnamurthi Portrait" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcXSMOj34mLYS7pZ7wIDfGL1Ib8t4fYY1PnoukaIB3cLsobN8qGiDKVcf-MYubek1SerPuCWMiImT3PbHJZtMem446iRmujq162eh1P9uYACWbLsXpnVPf5aBlrVWb7iCb3pAGnfbCbxXX3sYNMKcMlqjAoNcxFW1d1TYV2NUBrGvWhU019ncwZrpxm4zfq69unWm0c8OADJbWhaeJfTB1hc3r-Ej9PdQm4O-SjZQgagV0wFP3OdVivmNfvpTldYPk">'
new_about_img = '<img alt="Krishnamurthi Portrait" class="w-full h-full object-cover" src="/images/about-me.png" onerror="this.src=\'https://lh3.googleusercontent.com/aida-public/AB6AXuCcXSMOj34mLYS7pZ7wIDfGL1Ib8t4fYY1PnoukaIB3cLsobN8qGiDKVcf-MYubek1SerPuCWMiImT3PbHJZtMem446iRmujq162eh1P9uYACWbLsXpnVPf5aBlrVWb7iCb3pAGnfbCbxXX3sYNMKcMlqjAoNcxFW1d1TYV2NUBrGvWhU019ncwZrpxm4zfq69unWm0c8OADJbWhaeJfTB1hc3r-Ej9PdQm4O-SjZQgagV0wFP3OdVivmNfvpTldYPk\'">'
html = html.replace(old_about_img, new_about_img)

# 6. Section 01 About: Add Resume link to quick contact row
old_contact_row = '''<a class="font-label-lg text-label-lg text-slate-700 hover:text-primary transition-colors inline-flex items-center gap-1 underline underline-offset-4" href="tel:+919003762619">
<span class="">+91 90037-62619</span>
<span class="material-symbols-outlined text-[14px]">call</span>
</a>'''

new_contact_row = '''<a class="font-label-lg text-label-lg text-slate-700 hover:text-primary transition-colors inline-flex items-center gap-1 underline underline-offset-4" href="tel:+919003762619">
<span class="">+91 90037-62619</span>
<span class="material-symbols-outlined text-[14px]">call</span>
</a>
<a class="font-label-lg text-label-lg text-slate-700 hover:text-primary transition-colors inline-flex items-center gap-1 underline underline-offset-4" href="/resume.pdf?v=3" target="_blank" rel="noopener noreferrer">
<span class="">R&eacute;sum&eacute; (PDF)</span>
<span class="material-symbols-outlined text-[14px]">description</span>
</a>'''

html = html.replace(old_contact_row, new_contact_row)

# 7. Section 02 Meraqui: Link to artifact-meraqui.html
old_meraqui_btn = '''<a class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-indigo-50/70 text-primary font-label-mono-tag text-label-mono-tag border border-indigo-100 hover:bg-indigo-100 hover:text-accent-violet transition-colors" href="#teardowns">
<span class="">View Product Spec</span>
<span class="material-symbols-outlined text-[14px]">arrow_forward</span>
</a>'''

new_meraqui_btn = '''<a class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-indigo-50/70 text-primary font-label-mono-tag text-label-mono-tag border border-indigo-100 hover:bg-indigo-100 hover:text-accent-violet transition-colors" href="/artifact-meraqui.html">
<span class="">View Product Spec &nearr;</span>
<span class="material-symbols-outlined text-[14px]">arrow_forward</span>
</a>'''

html = html.replace(old_meraqui_btn, new_meraqui_btn)

# 8. Section 03 Certifications: Link to Google Drive Proofs
old_oracle = '''<div class="p-space-md rounded-xl bg-white border border-indigo-100 flex items-center justify-between shadow-sm">
<div>
<span class="font-headline-sm text-headline-sm text-slate-900 block">Oracle Cloud AI Certified</span>
<span class="font-body-sm text-body-sm text-slate-500">OCI 2024 Generative AI Professional</span>
</div>
<span class="px-3 py-1 rounded-full bg-indigo-50 text-primary font-label-mono-tag text-label-mono-tag font-bold border border-indigo-100">92.5%</span>
</div>'''

new_oracle = '''<a href="https://drive.google.com/file/d/1g6X2YPjZxRs4j8CIz_G60PFAHmy4-Fz5/view?usp=sharing" target="_blank" rel="noopener noreferrer" class="p-space-md rounded-xl bg-white border border-indigo-100 flex items-center justify-between shadow-sm hover:shadow-md hover:border-indigo-300 transition-all group">
<div>
<span class="font-headline-sm text-headline-sm text-slate-900 group-hover:text-primary transition-colors block">Oracle Cloud AI Certified &nearr;</span>
<span class="font-body-sm text-body-sm text-slate-500">OCI 2024 Generative AI Professional</span>
</div>
<span class="px-3 py-1 rounded-full bg-indigo-50 text-primary font-label-mono-tag text-label-mono-tag font-bold border border-indigo-100">92.5%</span>
</a>'''

old_gdg = '''<div class="p-space-md rounded-xl bg-white border border-indigo-100 flex items-center justify-between shadow-sm">
<div>
<span class="font-headline-sm text-headline-sm text-slate-900 block">2nd Place — GDG Hackathon</span>
<span class="font-body-sm text-body-sm text-slate-500">Google Developer Groups AI/ML Track</span>
</div>
<span class="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-label-mono-tag text-label-mono-tag font-bold">Runner-Up</span>
</div>'''

new_gdg = '''<a href="https://drive.google.com/file/d/1dJh3mcSI-d8jB0FwPh_Xr4CJaXOgTMVW/view?usp=sharing" target="_blank" rel="noopener noreferrer" class="p-space-md rounded-xl bg-white border border-indigo-100 flex items-center justify-between shadow-sm hover:shadow-md hover:border-indigo-300 transition-all group">
<div>
<span class="font-headline-sm text-headline-sm text-slate-900 group-hover:text-primary transition-colors block">2nd Place — GDG Hackathon &nearr;</span>
<span class="font-body-sm text-body-sm text-slate-500">Google Developer Groups AI/ML Track</span>
</div>
<span class="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-label-mono-tag text-label-mono-tag font-bold">Runner-Up</span>
</a>'''

old_dataworks = '''<div class="p-space-md rounded-xl bg-white border border-indigo-100 flex items-center justify-between shadow-sm">
<div>
<span class="font-headline-sm text-headline-sm text-slate-900 block">2nd Place — DataWorks Hackathon</span>
<span class="font-body-sm text-body-sm text-slate-500">Autonomous LLM Agent Architecture</span>
</div>
<span class="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-label-mono-tag text-label-mono-tag font-bold">Runner-Up</span>
</div>'''

new_dataworks = '''<a href="https://drive.google.com/file/d/1Bh382QXGjgfG-9YE-FEQsPGda4oe3m92/view?usp=sharing" target="_blank" rel="noopener noreferrer" class="p-space-md rounded-xl bg-white border border-indigo-100 flex items-center justify-between shadow-sm hover:shadow-md hover:border-indigo-300 transition-all group">
<div>
<span class="font-headline-sm text-headline-sm text-slate-900 group-hover:text-primary transition-colors block">2nd Place — DataWorks Hackathon &nearr;</span>
<span class="font-body-sm text-body-sm text-slate-500">Autonomous LLM Agent Architecture</span>
</div>
<span class="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-label-mono-tag text-label-mono-tag font-bold">Runner-Up</span>
</a>'''

html = html.replace(old_oracle, new_oracle)
html = html.replace(old_gdg, new_gdg)
html = html.replace(old_dataworks, new_dataworks)

# 9. Section 05 Teardowns: Add links to teardown pages
# Comet
comet_target = '''<span class="font-label-mono-tag text-label-mono-tag text-slate-500">Guardrail: Return Rate</span>
</div>
</div>'''
comet_replacement = '''<span class="font-label-mono-tag text-label-mono-tag text-slate-500">Guardrail: Return Rate</span>
</div>
<div class="mt-3 pt-3 border-t border-slate-100">
  <a href="/teardown-comet.html" class="inline-flex items-center gap-1 font-label-mono-tag text-label-mono-tag text-primary hover:text-accent-violet transition-colors font-semibold">
    Read full teardown <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
  </a>
</div>
</div>'''
html = html.replace(comet_target, comet_replacement, 1)

# KreditBee
kreditbee_target = '''<span class="font-label-mono-tag text-label-mono-tag text-slate-500">Secondary: -25% Re-upload</span>
</div>
</div>'''
kreditbee_replacement = '''<span class="font-label-mono-tag text-label-mono-tag text-slate-500">Secondary: -25% Re-upload</span>
</div>
<div class="mt-3 pt-3 border-t border-slate-100">
  <a href="/teardown-kreditbee.html" class="inline-flex items-center gap-1 font-label-mono-tag text-label-mono-tag text-primary hover:text-accent-violet transition-colors font-semibold">
    Read full teardown <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
  </a>
</div>
</div>'''
html = html.replace(kreditbee_target, kreditbee_replacement, 1)

# PhonePe
phonepe_target = '''<span class="font-label-mono-tag text-label-mono-tag text-slate-500">Guardrail: NBFC Drop</span>
</div>
</div>'''
phonepe_replacement = '''<span class="font-label-mono-tag text-label-mono-tag text-slate-500">Guardrail: NBFC Drop</span>
</div>
<div class="mt-3 pt-3 border-t border-slate-100">
  <a href="/teardown-phonepe.html" class="inline-flex items-center gap-1 font-label-mono-tag text-label-mono-tag text-primary hover:text-accent-violet transition-colors font-semibold">
    Read full teardown <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
  </a>
</div>
</div>'''
html = html.replace(phonepe_target, phonepe_replacement, 1)

# 10. Footer: Update Product Resume link to /resume.pdf?v=3
old_resume_footer = '<li class=""><a class="text-slate-600 hover:text-primary transition-colors" href="mailto:kiccha1703@gmail.com">Product Resume (PDF)</a></li>'
new_resume_footer = '<li class=""><a class="text-slate-600 hover:text-primary transition-colors inline-flex items-center gap-1" href="/resume.pdf?v=3" target="_blank" rel="noopener noreferrer">Product Resume (PDF) <span class="material-symbols-outlined text-[14px]">open_in_new</span></a></li>'
html = html.replace(old_resume_footer, new_resume_footer)

# 11. Add mobile menu drawer support
mobile_drawer_css = '''
    /* Mobile Drawer */
    #mobile-menu {
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    #mobile-menu.hidden {
      display: none;
      opacity: 0;
      transform: translateY(-8px);
    }
'''
html = html.replace('/* Scroll Reveal & Motion System */', mobile_drawer_css + '\n    /* Scroll Reveal & Motion System */')

# Add hamburger button on mobile header
old_pill_header = '''<!-- Right Slate CTA Pill -->
<div class="flex items-center gap-2">
<a class="inline-flex items-center justify-center px-4 md:px-5 py-2 rounded-full bg-gradient-to-r from-secondary to-primary text-white font-label-lg text-label-lg hover:from-primary hover:to-accent-violet transition-all duration-300 shadow-[0_4px_14px_rgba(79,70,229,0.35)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.5)] whitespace-nowrap" href="#contact">
        Let’s Connect
      </a>
</div>
</div>
</header>'''

new_pill_header = '''<!-- Right Slate CTA Pill -->
<div class="flex items-center gap-2">
<a class="inline-flex items-center justify-center px-4 md:px-5 py-2 rounded-full bg-gradient-to-r from-secondary to-primary text-white font-label-lg text-label-lg hover:from-primary hover:to-accent-violet transition-all duration-300 shadow-[0_4px_14px_rgba(79,70,229,0.35)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.5)] whitespace-nowrap" href="#contact">
        Let’s Connect
      </a>
<button id="mobile-toggle" aria-label="Toggle navigation" class="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
  <span class="material-symbols-outlined text-[18px]">menu</span>
</button>
</div>
</div>
<!-- Mobile Dropdown Menu -->
<div id="mobile-menu" class="hidden pointer-events-auto mt-2 w-full max-w-[860px] bg-white/95 backdrop-blur-xl border border-indigo-100 rounded-2xl shadow-xl p-4 flex flex-col gap-2">
  <a class="px-3 py-2 text-slate-700 font-label-lg hover:text-primary hover:bg-indigo-50/70 rounded-xl transition-colors" href="#about" onclick="closeMobileMenu()">About</a>
  <a class="px-3 py-2 text-slate-700 font-label-lg hover:text-primary hover:bg-indigo-50/70 rounded-xl transition-colors" href="#experience" onclick="closeMobileMenu()">Work &amp; Exp</a>
  <a class="px-3 py-2 text-slate-700 font-label-lg hover:text-primary hover:bg-indigo-50/70 rounded-xl transition-colors" href="#stack" onclick="closeMobileMenu()">Tools &amp; Stack</a>
  <a class="px-3 py-2 text-slate-700 font-label-lg hover:text-primary hover:bg-indigo-50/70 rounded-xl transition-colors" href="#how-i-think" onclick="closeMobileMenu()">How I Think</a>
  <a class="px-3 py-2 text-slate-700 font-label-lg hover:text-primary hover:bg-indigo-50/70 rounded-xl transition-colors" href="#teardowns" onclick="closeMobileMenu()">Teardowns &amp; Simulator</a>
  <a class="px-3 py-2 text-slate-700 font-label-lg hover:text-primary hover:bg-indigo-50/70 rounded-xl transition-colors" href="/resume.pdf?v=3" target="_blank" rel="noopener noreferrer">R&eacute;sum&eacute; (PDF) &nearr;</a>
</div>
</header>'''

html = html.replace(old_pill_header, new_pill_header)

# Add mobile menu JS
mobile_js = '''
    // 4. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }
    function closeMobileMenu() {
      if (mobileMenu) mobileMenu.classList.add('hidden');
    }
'''
html = html.replace('</script>\n\n\n\n\n</body>', mobile_js + '\n  </script>\n</body>')

# Write to dist/index.html and src/main/resources/templates/index.html
with open('dist/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

with open('src/main/resources/templates/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Successfully written to dist/index.html and src/main/resources/templates/index.html")
