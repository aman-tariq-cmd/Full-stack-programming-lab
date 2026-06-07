---
name: CRM Pro
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1b1b1d'
  surface-container: '#201f21'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#c1c7d4'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#8b919e'
  outline-variant: '#414752'
  surface-tint: '#a5c8ff'
  primary: '#a5c8ff'
  on-primary: '#00315e'
  primary-container: '#4d9eff'
  on-primary-container: '#003464'
  inverse-primary: '#005fae'
  secondary: '#49e095'
  on-secondary: '#003920'
  secondary-container: '#01bb74'
  on-secondary-container: '#004326'
  tertiary: '#eec13c'
  on-tertiary: '#3d2e00'
  tertiary-container: '#d0a61f'
  on-tertiary-container: '#4f3d00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d4e3ff'
  primary-fixed-dim: '#a5c8ff'
  on-primary-fixed: '#001c3a'
  on-primary-fixed-variant: '#004785'
  secondary-fixed: '#6bfdaf'
  secondary-fixed-dim: '#49e095'
  on-secondary-fixed: '#002110'
  on-secondary-fixed-variant: '#005230'
  tertiary-fixed: '#ffe08f'
  tertiary-fixed-dim: '#eec13c'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#584400'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
  bg-surface: '#141417'
  bg-elevated: '#1C1C21'
  bg-overlay: '#242429'
  border-subtle: '#2A2A31'
  border-strong: '#3D3D47'
  text-primary: '#F0F0F5'
  text-secondary: '#9090A0'
  text-muted: '#55555F'
  accent-blue-dim: '#1A3D6B'
  accent-green-dim: '#0F3D26'
  accent-yellow-dim: '#3D3010'
  accent-red: '#FF5C5C'
  accent-red-dim: '#3D1010'
typography:
  display:
    fontFamily: IBM Plex Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  h1:
    fontFamily: IBM Plex Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  h2:
    fontFamily: IBM Plex Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  h3:
    fontFamily: IBM Plex Sans
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 20px
  body:
    fontFamily: IBM Plex Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  small:
    fontFamily: IBM Plex Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-caps:
    fontFamily: IBM Plex Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono:
    fontFamily: IBM Plex Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  mono-sm:
    fontFamily: IBM Plex Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  sidebar-width: 240px
  modal-sm: 420px
  modal-lg: 640px
---

## Brand & Style

The design system for this product is rooted in a **Modern Corporate** aesthetic with a strong **Technical/Developer-Tool** influence. It prioritizes information density, precision, and clarity, catering to enterprise power users who require a high-performance environment.

The visual narrative is defined by:
- **High-Performance Dark Mode:** A deep, cool-tinted environment that reduces eye strain during long working sessions.
- **Chromatic Elevation:** Depth is communicated through increasing surface lightness rather than heavy shadows, creating a sophisticated, layered UI.
- **Technical Utility:** The use of monospaced fonts for data values signals accuracy and professional-grade tooling.
- **Electric Accents:** High-vibrancy functional colors (Blue, Green, Yellow, Red) cut through the dark neutral base to provide immediate status recognition and clear action paths.

## Colors

The palette is engineered for a "Dark Mode Only" experience. It utilizes a refined grayscale of cool-tinted neutrals to establish hierarchy.

- **Foundational Neutrals:** The base layers move from `#0D0D0F` (Root) to `#242429` (Overlays), creating a natural sense of verticality.
- **Functional Accents:** Blue is reserved for primary actions and focus states. Green, Yellow, and Red are strictly mapped to Success, Warning, and Error/Danger states respectively.
- **Dim Variants:** Each accent color has a corresponding "dim" background color (low-luminance, high-saturation) used for badges and selected states to maintain legibility without overwhelming the interface.
- **Contrast:** Text colors are tiered to ensure high readability, with `--text-primary` reserved for critical information and headers.

## Typography

Typography is used as a functional tool for information architecture. 

- **Primary UI:** `IBM Plex Sans` provides a clean, neutral, and highly legible foundation for all navigation, form labels, and body copy.
- **Data Visualization:** `IBM Plex Mono` is mandated for all technical data, including IDs, timestamps, currency values, and phone numbers. This ensures that tabular data aligns perfectly and is distinguishable from UI labels.
- **Micro-Typography:** Use the `label-caps` style for section headers in sidebars and form group headers to provide clear visual separation in dense layouts.

## Layout & Spacing

This design system uses a **fixed 8px grid** to ensure mathematical precision across all components.

- **Grid Model:** A 12-column fluid grid is used for main dashboard content, while sidebars and modals follow fixed-width constraints to maintain density.
- **Gutter & Margins:** Use `16px` (md) for standard gutters between cards and `24px` (lg) for page margins.
- **Density:** Elements are tightly packed. Standard button heights are fixed at `36px` to maximize vertical space.
- **Breakpoints:**
  - **Mobile (<768px):** Sidebar collapses to a hamburger menu; margins reduce to `16px`.
  - **Tablet (768px - 1024px):** Fixed-width sidebars may transition to icon-only states.
  - **Desktop (>1024px):** Standard 240px sidebar and full-width fluid data tables.

## Elevation & Depth

Depth is established through **Chromatic Layering** rather than traditional drop shadows. In this system, "higher" objects are represented by lighter surface colors.

- **Layer 0 (Base):** `--bg-base` (#0D0D0F) for the canvas.
- **Layer 1 (Surface):** `--bg-surface` (#141417) for primary cards and sidebars.
- **Layer 2 (Elevated):** `--bg-elevated` (#1C1C21) for interactive elements like inputs and hovered table rows.
- **Layer 3 (Overlay):** `--bg-overlay` (#242429) for tooltips, dropdowns, and modals.

**Shadow Exceptions:** While layering handles most depth, a high-diffusion, low-opacity shadow (`rgba(0, 0, 0, 0.6)`) is applied to modals and dropdowns to separate them from the content beneath during backdrop blurs.

## Shapes

The shape language is geometric and professional, using subtle rounding to soften the technical aesthetic without appearing "playful."

- **Container Radii:** Modals and large Stat Cards use `10px` for a modern, framed look.
- **Component Radii:** Buttons, Inputs, and Navigation items use a consistent `6px`.
- **Status Radii:** Badges use a minimal `4px` to maintain a sharp, data-heavy appearance.
- **Circular Elements:** Reserved exclusively for Avatars (`50%`).
- **Accent Details:** Use 3px vertical accent bars on the left edge of Toasts and active Navigation items to reinforce the current state.

## Components

- **Buttons:** Primary buttons use `--accent-blue` with white text. Ghost buttons use `--text-secondary` and transition to `--bg-elevated` on hover. Height is strictly `36px`.
- **Inputs:** Backgrounds use `--bg-elevated`. Borders use `--border-subtle`, switching to `--border-strong` on focus with a subtle blue glow (`rgba(77,158,255,0.15)`).
- **Status Badges:** Use "Dim" background variants (e.g., `--accent-green-dim`) with the full-vibrancy accent color for the text to ensure high legibility and soft signaling.
- **Data Tables:** Use `--bg-base` for headers and `--bg-surface` for rows. On hover, rows transition to `--bg-elevated`. Use `IBM Plex Mono` for all cell values.
- **Cards:** Dashboard cards feature a 2px top border matching the context (e.g., blue for activity, green for revenue).
- **Toasts:** Positioned bottom-right. Include a 3px left-accent bar and use `--bg-overlay` for the surface.
- **Chatbot/Floating Action:** Features a constant subtle pulse animation ring using `--accent-blue` at 20% opacity.