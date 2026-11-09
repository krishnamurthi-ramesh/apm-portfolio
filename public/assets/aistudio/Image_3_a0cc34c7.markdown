---
name: Kinetic Obsidian & Violet
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464555'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#712ae2'
  on-secondary: '#ffffff'
  secondary-container: '#8a4cfc'
  on-secondary-container: '#fffbff'
  tertiary: '#004d70'
  on-tertiary: '#ffffff'
  tertiary-container: '#006693'
  on-tertiary-container: '#b8e0ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#eaddff'
  secondary-fixed-dim: '#d2bbff'
  on-secondary-fixed: '#25005a'
  on-secondary-fixed-variant: '#5a00c6'
  tertiary-fixed: '#c9e6ff'
  tertiary-fixed-dim: '#89ceff'
  on-tertiary-fixed: '#001e2f'
  on-tertiary-fixed-variant: '#004c6e'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies an energetic, forward-looking tech-builder ethos. It pairs the high-velocity precision of modern engineering tools with an inspiring, crystalline aesthetic. Designed for technical founders, developers, and product pioneers, the visual posture avoids sterile corporate flatness in favor of optical luminosity, atmospheric depth, and crisp kinetic interaction.

The style synthesizes **Precision Modernism** and **Tactile Glassmorphism**:
- Ultra-clean geometric structure anchored by sharp architectural lines and balanced white space.
- Translucent surface layering (frosted glass, specular highlights, hairline borders) that creates depth without visual weight.
- Radiant atmospheric gradients in indigo, electric violet, and vivid cyan that signify intelligence, momentum, and premium craftsmanship.
- Absolute rejection of muddy, desaturated earth tones or warm yellowish creams; every neutral remains chilled, slate-tinted, and razor-sharp.

## Colors

The palette relies on high-purity optical contrasts. The default mode is luminous light, engineered with cold, blue-shifted slates rather than warm neutrals.

### Surface Hierarchy & Backgrounds
- **Canvas Base:** `#f8fafc` fading into crisp `#ffffff`.
- **Surface Layer 1 (Cards & Panels):** `rgba(255, 255, 255, 0.85)` with backdrop filter blur.
- **Surface Layer 2 (Elevated Floating Elements):** `#ffffff` solid.
- **Borders & Dividers:** Crisp structural hairlines in `#e2e8f0` and `#f1f5f9`.

### Chroma Accents
- **Primary Energy (Indigo):** `#4f46e5` base with interactive hover `#4338ca` and active `#3730a3`. Used for primary CTAs, active status outlines, and core brand elements.
- **Secondary Charge (Electric Violet):** `#7c3aed` through `#6366f1`. Utilized in kinetic gradient strokes, subtle ambient glows, and expressive micro-interactions.
- **Tertiary Accent (Cyan / Sky Highlight):** `#0ea5e9` and `#06b6d4`. Reserved for high-priority status indicators, telemetry metrics, and progressive visual highlights.
- **Deep Obsidian (Typography):** `#0f172a` for primary headlines and high-priority data points; `#475569` for secondary copy; `#94a3b8` for tertiary placeholders.

## Typography

The typographic hierarchy delivers an assertive, highly engineered aesthetic. 

- **Display & Headlines (Space Grotesk):** Provides structured geometric attitude, tight horizontal tracking, and subtle technical eccentricities that set the product apart from generic enterprise software.
- **Body & Continuous Reading (Geist):** Delivers immaculate rendering at all screen resolutions, razor-sharp geometric neutrality, and optimal legibility for dense technical interfaces.
- **Labels, Badges & Telemetry (JetBrains Mono):** Injects a builder-first character into UI micro-labels, metrics, timestamps, and status chips, underscoring systemic accuracy.

## Layout & Spacing

The layout is built upon an 8-point geometric scale set within a responsive fluid grid.

### Grid Architecture
- **Desktop (1280px+):** 12-column layout with `2rem` section margins and `1.5rem` gutters. Content containers constrain to a maximum width of `1360px` for high-density structural control.
- **Tablet (768px - 1279px):** 8-column layout with `1.5rem` margins and `1rem` gutters. Fluid expansion across sidebars and split-view tooling.
- **Mobile (<768px):** 4-column layout with `1.25rem` outer canvas padding and `0.75rem` gutters. Multi-column metric groups reflow cleanly to 2-column or single-stack layouts.

### Vertical Rhythm
Section-to-section flow relies on generous, breathable spacing (`2.5rem` to `4rem`) to offset the dense information architecture of technical components, ensuring that dashboard elements and marketing features retain dynamic momentum without feeling cluttered.

## Elevation & Depth

Visual hierarchy is achieved through crisp translucent layering and violet-tinted ambient illumination rather than heavy opaque dropshadows.

### Layering Rules
- **Layer 0 (Canvas):** Pure `#f8fafc` overlaid with an optional low-opacity sub-pixel geometric grid or radial mesh gradient (`rgba(99, 102, 241, 0.05)`).
- **Layer 1 (Subtle Glass Cards):** Background `rgba(255, 255, 255, 0.75)`, `backdrop-filter: blur(16px)`, enclosed with a crisp 1px solid border of `#e2e8f0`. Shadow: `0 4px 20px -2px rgba(15, 23, 42, 0.04)`.
- **Layer 2 (Interactive Hover & Modals):** Background `rgba(255, 255, 255, 0.95)`, `backdrop-filter: blur(24px)`, 1px border of `rgba(99, 102, 241, 0.25)`. Shadow: `0 12px 32px -4px rgba(79, 70, 229, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.03)`.
- **Layer 3 (Floating Overlays & Popovers):** Solid `#ffffff` with a crisp `#e2e8f0` border and a dual-tier shadow: `0 20px 40px -8px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.04)`.

## Shapes

The design uses balanced, modern curvature (`roundedness: 2` — `0.5rem` base, scaling to `1rem` on cards and `1.5rem` on larger modals).

- Interactive elements (inputs, tags, standard buttons) leverage `0.5rem` (`8px`) radii to maintain precise alignment with grid gutters.
- Structural cards and floating modules use `1rem` (`16px`) radii, providing a modern, refined enclosure that softens technical density.
- Feature highlight banners and contextual flyouts leverage `1.5rem` (`24px`) radii, complemented by hairline borders to maintain crisp perimeter definition.

## Components

### Buttons
- **Primary:** Solid `#4f46e5` fill with a top inner highlight (`inset 0 1px 0 rgba(255, 255, 255, 0.2)`), crisp white text (`#ffffff`), and subtle glow on hover (`box-shadow: 0 4px 14px rgba(79, 70, 229, 0.35)`). Active state scales slightly to `0.98`.
- **Secondary / Glass:** Background `rgba(255, 255, 255, 0.8)`, border `1px solid #e2e8f0`, text `#0f172a`. On hover, border shifts to `#c7d2fe` with an indigo-tinted text lift.
- **Ghost:** Borderless, text `#475569`, transitions to text `#0f172a` and background `rgba(241, 245, 249, 0.7)` on hover.

### Cards
- Base construction uses frosted glass panels: `background: rgba(255, 255, 255, 0.8)`, `backdrop-filter: blur(12px)`, bordered by `1px solid #e2e8f0`.
- Interactive cards feature a gradient border hover effect that subtly transitions the outline into a linear sweep from `#6366f1` to `#0ea5e9`.

### Chips & Badges
- Built with `JetBrains Mono` label typography.
- Filled with light tint `rgba(99, 102, 241, 0.08)`, border `1px solid rgba(99, 102, 241, 0.2)`, text `#4f46e5`.
- Status indicators feature an active pulsing dot in electric cyan (`#06b6d4`).

### Input Fields
- Height `40px`, background `#ffffff`, border `1px solid #cbd5e1`, typography `Geist` at `14px`.
- Focus state: Border transitions instantly to `#4f46e5`, accompanied by a `3px` focus ring in `rgba(79, 70, 229, 0.15)`. No muddy default browser rings.

### Checkboxes & Radios
- Size `18px`, border `1.5px solid #cbd5e1`, background `#ffffff`.
- Checked state: Background `#4f46e5`, border `#4f46e5`, displaying a crisp white micro checkmark or centered radio point.

### Code & Metric Snippets
- Display containers featuring a slate-toned backdrop (`#0f172a`), neon cyan telemetry text (`#38bdf8`), and electric violet accents for function names and tokens, producing high-impact contrast against the light UI.