# Figma / Stitch Design Prompt — Dark Theme
## Project: CRM System — Customer Relationship Management
### Air University | Full Stack Programming Lab | BSSE VI-B | Spring 2026

---

## Design Direction

This is a **dark-theme, enterprise-grade CRM** with a refined, high-contrast aesthetic inspired by modern developer tools and data-heavy dashboards. Think Linear, Vercel, and Planetscale — clean geometry, sharp typographic hierarchy, and deliberate use of light on dark to create depth without noise.

The core visual language: **deep neutral backgrounds, cool-tinted surface layers, electric accent colors, and crisp white text**. Every element earns its place. No decorative clutter. Density is a feature, not a flaw.

---

## Design System

Establish this design system as a dedicated page in the Figma file before designing any screen.

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--bg-base` | `#0D0D0F` | Root page background |
| `--bg-surface` | `#141417` | Cards, sidebar, modals |
| `--bg-elevated` | `#1C1C21` | Hover states, table rows, input backgrounds |
| `--bg-overlay` | `#242429` | Dropdowns, tooltips, popovers |
| `--border-subtle` | `#2A2A31` | Default borders, dividers |
| `--border-strong` | `#3D3D47` | Focused inputs, active states |
| `--text-primary` | `#F0F0F5` | Headings, active labels |
| `--text-secondary` | `#9090A0` | Body text, descriptions, placeholders |
| `--text-muted` | `#55555F` | Timestamps, disabled states |
| `--accent-blue` | `#4D9EFF` | Primary buttons, links, focus rings |
| `--accent-blue-dim` | `#1A3D6B` | Button hover background, selected row highlight |
| `--accent-green` | `#3DD68C` | Active badge, success toasts |
| `--accent-green-dim` | `#0F3D26` | Active badge background |
| `--accent-yellow` | `#F5C842` | Lead badge, warning toasts |
| `--accent-yellow-dim` | `#3D3010` | Lead badge background |
| `--accent-red` | `#FF5C5C` | Danger button, error states, delete |
| `--accent-red-dim` | `#3D1010` | Error input border tint, error toast bg |
| `--white` | `#FFFFFF` | Pure white for critical CTA text |

### Typography

- **Font Family:** `IBM Plex Sans` (UI text), `IBM Plex Mono` (IDs, invoice numbers, code-like values)
- **Scale:**

| Style | Size | Weight | Color | Usage |
|---|---|---|---|---|
| Display | 32px | 600 | `--text-primary` | Page heroes, 404 numeral |
| H1 | 24px | 600 | `--text-primary` | Page titles |
| H2 | 18px | 600 | `--text-primary` | Section headings, card titles |
| H3 | 15px | 500 | `--text-primary` | Sub-section headings |
| Body | 14px | 400 | `--text-secondary` | General content |
| Small | 12px | 400 | `--text-secondary` | Metadata, captions |
| Label | 11px | 500 | `--text-muted` | Uppercase column headers, form labels |
| Mono | 13px | 400 | `--text-secondary` | IDs, invoice numbers, phone numbers |

### Spacing System

8px base grid. Values in use: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64px`.

### Border Radius

| Element | Radius |
|---|---|
| Page cards, modals | `10px` |
| Buttons | `6px` |
| Inputs | `6px` |
| Badges | `4px` (subtle rectangle, not pill) |
| Stat cards | `10px` |
| Avatar circles | `50%` |
| Toast notifications | `8px` |

### Elevation System (Dark Theme)

In dark themes, elevation is expressed through **background lightness**, not drop shadows. Layers closer to the user use a lighter neutral value.

| Layer | Background Token | Perceived Depth |
|---|---|---|
| Base (page) | `--bg-base` | Deepest |
| Surface (cards, sidebar) | `--bg-surface` | Mid |
| Elevated (rows, inputs) | `--bg-elevated` | Raised |
| Overlay (dropdowns, tooltips) | `--bg-overlay` | Topmost |

Shadows are used only for modals and popovers to separate them from lower layers:
- Modal shadow: `0 24px 64px rgba(0, 0, 0, 0.6)`
- Dropdown shadow: `0 8px 24px rgba(0, 0, 0, 0.5)`

### Borders

All borders use `1px solid --border-subtle`. On focus/active states, promote to `1px solid --border-strong`. On error states, use `1px solid --accent-red`.

---

## Component Library

Build every component below before designing screens. Design all states: **default, hover, focus, disabled, loading, error**.

### 1. Primary Button
- Background: `--accent-blue` | Text: `--white` | Radius: `6px` | Height: `36px` | Padding: `0 16px`
- Hover: background lightens by 10%
- Loading state: replace label with a small spinner
- Disabled: opacity 40%, no pointer events

### 2. Secondary Button
- Background: `--bg-elevated` | Border: `1px solid --border-strong` | Text: `--text-primary`
- Hover: background → `--bg-overlay`

### 3. Danger Button
- Background: `--accent-red-dim` | Border: `1px solid --accent-red` | Text: `--accent-red`
- Hover: background opacity increases

### 4. Ghost Button / Icon Button
- Transparent background | Text or icon: `--text-secondary`
- Hover: background → `--bg-elevated`

### 5. Text Input
- Background: `--bg-elevated` | Border: `1px solid --border-subtle` | Text: `--text-primary`
- Placeholder: `--text-muted`
- Focus: border → `--border-strong` + `0 0 0 3px rgba(77,158,255,0.15)` focus ring
- Error: border → `--accent-red` + `0 0 0 3px rgba(255,92,92,0.12)` ring + red helper text below
- Label above input: 11px uppercase, `--text-muted`

### 6. Select Dropdown
- Same styling as text input
- Chevron icon right-aligned, `--text-muted`
- Open dropdown panel: `--bg-overlay` background, `--border-subtle` border, `--modal-shadow`
- Option hover: `--bg-elevated`
- Selected option: `--accent-blue-dim` background, `--accent-blue` text

### 7. Search Bar
- Same as text input with a magnifying glass icon prefix (`--text-muted`)
- Active state shows a subtle `--accent-blue` glow on the border

### 8. Status Badge

| Status | Text Color | Background | Border |
|---|---|---|---|
| Lead | `--accent-yellow` | `--accent-yellow-dim` | `1px solid --accent-yellow` at 30% opacity |
| Active | `--accent-green` | `--accent-green-dim` | `1px solid --accent-green` at 30% opacity |
| Inactive | `--text-muted` | `--bg-overlay` | `1px solid --border-subtle` |

Size: `11px` label text, `4px` radius, `4px 8px` padding.

### 9. Customer Table Row
- Background: transparent (on `--bg-surface`)
- Hover: `--bg-elevated`
- Selected: `--accent-blue-dim`
- Columns: avatar circle (initials, colored), Name + email stacked, Phone (mono font), Company, Status badge, Date (mono), Actions (edit/delete icon buttons)
- Divider: `1px solid --border-subtle` between rows, no outer border on the table

### 10. Stat Card
- Background: `--bg-surface` | Border: `1px solid --border-subtle` | Radius: `10px` | Padding: `20px`
- Icon in a small square container (`--bg-elevated`, `6px` radius) top-left
- Metric value: 28px / 600 / `--text-primary`
- Label: 12px / `--text-secondary`
- Subtle top-border accent line (2px, color matches the stat type)

### 11. Sidebar Navigation Item
- Default: icon + label, `--text-secondary`, transparent background
- Hover: `--bg-elevated`, `--text-primary`
- Active: `--accent-blue-dim` background, `--accent-blue` text and icon, `2px left border` in `--accent-blue`
- Height: `36px`, padding: `0 12px`, radius: `6px`, full width

### 12. Toast Notification
- Dark background: `--bg-overlay` | Border: `1px solid --border-strong`
- Left `3px` colored border strip: green (success), red (error), yellow (warning), blue (info)
- Icon + message text + optional dismiss X
- Subtle entrance animation: slide in from right + fade

### 13. Modal / Dialog
- Overlay: `rgba(0,0,0,0.75)` backdrop blur `4px`
- Panel: `--bg-surface` background, `--border-subtle` border, `10px` radius, `--modal-shadow`
- Header: title H2 + close button (ghost icon button)
- Footer: action buttons right-aligned

### 14. Invoice Card (list item)
- `--bg-surface` card | left accent border in `--accent-blue`
- Invoice number (mono), customer name, date, total amount, download icon button

### 15. Chatbot Message Bubble
- User message: `--accent-blue-dim` background, `--text-primary` text, right-aligned
- Bot message: `--bg-elevated` background, `--text-secondary` text, left-aligned, with bot avatar (small circle with icon)
- Timestamp: `--text-muted`, mono, 11px

### 16. Avatar Circle
- Background: deterministic color per user/customer (map first letter to one of 8 accent hues)
- Initials: `--white`, 13px / 600
- Sizes: `sm` 28px, `md` 36px, `lg` 48px

---

## Screens to Design

### Screen 1: Registration Page
**Route:** `/register`

**Layout:** Full viewport, `--bg-base` background. A single centered card (`--bg-surface`, `1px solid --border-subtle`, `10px` radius, max-width `420px`) floats in the center with generous vertical padding.

**Background detail:** Subtle grid dot pattern at 5% opacity using `--border-subtle` color creates depth without distraction.

**Elements:**
- Top of card: app logo mark (geometric monogram) + wordmark "CRM Pro" in `--text-primary`
- Heading: "Create your account" — H1
- Subheading: "Manage your customers. Start for free." — Body, `--text-secondary`
- Fields: Full Name, Email Address, Password, Confirm Password
  - Each: label (uppercase, 11px, `--text-muted`) above input
  - Password fields: show/hide toggle (eye icon, `--text-muted`)
- Primary CTA: "Create Account" — full width, `36px` height
- Divider line with "or" text
- Footer: "Already have an account?" + "Sign in" link in `--accent-blue`
- Design two variants:
  - **Default state**
  - **Validation error state** — two fields highlighted in red with inline error messages below each

---

### Screen 2: Login Page
**Route:** `/login`

**Layout:** Identical centered card layout as registration.

**Elements:**
- Logo + "CRM Pro"
- Heading: "Welcome back"
- Subheading: "Sign in to your workspace"
- Fields: Email Address, Password
- "Forgot password?" — right-aligned small link, `--accent-blue`
- Primary CTA: "Sign In" — full width
- Footer: "Don't have an account?" + "Register" link
- Design two variants:
  - **Default state**
  - **Error state** — a red error banner inside the card: "Invalid email or password. Please try again." with a red left border strip

---

### Screen 3: Dashboard Home
**Route:** `/dashboard`

**Layout:** Fixed left sidebar (`--bg-surface`, `240px`, `1px right border --border-subtle`) + main content area (`--bg-base`).

**Sidebar:**
- Top: logo mark + "CRM Pro" wordmark
- Navigation section label: "MAIN" — 11px uppercase, `--text-muted`
- Nav items: Dashboard, Customers, Invoices (each with icon)
- Second section label: "TOOLS"
- Nav items: Notifications (with badge), Chatbot
- Bottom section: user avatar (md size) + name + role + Logout ghost button

**Top Header Bar (inside main content):**
- Left: dynamic page title "Dashboard"
- Right: notification bell icon button (with count badge) + user avatar (sm)

**Main Content:**
- Stats row — 4 stat cards in a `2x2` grid on mobile, `4-column` row on desktop
  - Total Customers (blue accent line)
  - Active (green accent line)
  - Leads (yellow accent line)
  - Inactive (gray accent line)
- Section heading: "Recent Customers"
- Table showing 5 most recent customers (full table component)
- Below table: "View all customers →" link, `--accent-blue`
- Right side (desktop): "Quick Actions" card with two buttons stacked — "Add Customer", "Generate Invoice"

---

### Screen 4: Customer List Page
**Route:** `/dashboard/customers`

**Layout:** Sidebar + main content.

**Top bar:**
- Left: page title "Customers" + customer count badge (e.g., "15 total" — `--bg-elevated` pill)
- Right: "Add Customer" primary button

**Filter bar (below top bar):**
- Search input (full-flex-grow) + Status filter select (fixed width 160px) — side by side in a `--bg-surface` bar with `--border-subtle` border and `8px` radius

**Table:**
- Header row: uppercase 11px column labels, `--text-muted`, `--bg-surface` sticky background
- Data rows: customer table row component
- 15 rows with realistic dummy data
- Pagination row at bottom: "Showing 1–15 of 15" + prev/next buttons (disabled when at limits)
- Empty state variant: centered icon + "No customers found" heading + "Try adjusting your search or filters" subtext + "Clear filters" ghost button

---

### Screen 5: Add Customer Page
**Route:** `/dashboard/customers/add`

**Layout:** Sidebar + centered form card (max-width `640px`, `--bg-surface`, `--border-subtle` border).

**Card header:** "Add New Customer" H2 + "Fill in the details below" body text

**Form layout — two-column grid:**
- Row 1: Full Name* | Email*
- Row 2: Phone* | Company
- Row 3: Address (full width)
- Row 4: Status* (select) | Notes (textarea, 3 rows)

Required field asterisk: `--accent-red` colored `*` inline with label.

**Footer bar (sticky bottom of card):**
- Left: "* Required fields" — small, `--text-muted`
- Right: "Cancel" secondary button + "Save Customer" primary button

**Validation error state variant:** show two fields in error state simultaneously.

---

### Screen 6: Edit Customer Page
**Route:** `/dashboard/customers/[id]/edit`

**Layout:** Same as Add Customer, but:
- Card header: "Edit Customer"
- All fields pre-filled with customer data
- Below the form, a subtle metadata bar: "Created Jan 12, 2026 · Last updated 3 days ago" — mono 11px, `--text-muted`
- Footer: "Cancel" + "Update Customer" (primary)

---

### Screen 7: Customer Detail Page
**Route:** `/dashboard/customers/[id]`

**Layout:** Sidebar + two-column main content (left 340px fixed, right flex).

**Left panel (`--bg-surface` card):**
- Customer avatar (lg, 48px) centered
- Name H2, status badge below
- Contact info list: email (with mail icon), phone (with phone icon, mono font), company, address
- Date added: mono, `--text-muted`
- Action buttons row: "Edit Customer" (secondary) + "Delete" (danger) — full width, stacked

**Right panel:**
- Section: "Notes" — notes text or "No notes added" empty state
- Section: "Invoice History" — list of invoice cards for this customer, or empty state
- "Generate Invoice for this Customer" — secondary button at bottom of invoice section

---

### Screen 8: Invoice Generation Page
**Route:** `/dashboard/invoices/generate`

**Layout:** Sidebar + main content. Main content is a two-column layout: left (form, 60%) + right (live preview, 40%).

**Left — Form:**
- Section 1 — "Customer": searchable customer select input
- Section 2 — "Services": dynamic table
  - Table headers: Description | Qty | Unit Price | Total
  - Each row: text input | number input | number input | auto-computed read-only value (mono)
  - "Add Line Item" ghost button below the table (with `+` icon)
  - Trash icon on each row for removal
- Section 3 — "Summary": Subtotal (read-only), Tax % input, **Total** (larger text, `--text-primary`)
- Section 4 — "Details": Invoice Date (date input), Due Date (date input), Notes (textarea)
- Action row: "Save Invoice" primary + "Reset" ghost button

**Right — Live Preview panel (`--bg-surface` card):**
- Updates in real time as form values change
- Shows: Invoice number (mono), Bill To block, services table, total summary
- "Download PDF" secondary button at bottom of preview

---

### Screen 9: Invoice Preview / Detail Page
**Route:** `/dashboard/invoices/[id]`

**Layout:** Sidebar + centered document card (max-width `700px`).

**Document card (`--bg-surface`, strong border, `10px` radius):**
- Header row: logo mark left + "INVOICE" label right (large, `--text-muted`, uppercase)
- Invoice number (mono, `--accent-blue`) + date
- Two-column info row: "From" block (company/app info) + "Bill To" block (customer name, email, address)
- Services table: `--bg-elevated` header row, alternating `--bg-surface` / `--bg-elevated` rows
- Summary block (right-aligned): Subtotal, Tax, separator line, **Total** (H2, `--text-primary`)
- Footer: "Thank you for your business." — italic, `--text-muted`
- Below card: "Download PDF" primary button + "Back to Invoices" ghost button

---

### Screen 10: Notification Panel
**Route:** Slide-in panel from right, triggered by bell icon.

**Panel (`--bg-surface`, left `1px border --border-subtle`, full viewport height, width `360px`):**
- Header: "Notifications" H2 + "Clear All" ghost button
- Filter chips: All | Success | Error | Warning (tab-style, `--bg-elevated` background)
- Notification list:
  - Each item: left colored strip (3px, matches type) + icon + message + timestamp
  - Hover: `--bg-elevated`
  - Dismiss X on hover
- Empty state: centered inbox icon + "All caught up" + "No notifications yet"

---

### Screen 11: Chatbot Panel
**Triggered:** Floating button, bottom-right of all dashboard pages.

**Closed state:** Circular button (48px, `--accent-blue` background, white chat icon) fixed bottom-right with a subtle pulse animation ring.

**Open state:** Chat drawer above the button (width `340px`, height `480px`, `--bg-surface`, `--border-subtle` border, `10px` radius, `--modal-shadow`).

**Panel structure:**
- Header: bot avatar (sm, colored circle with bot icon) + "CRM Assistant" + "Online" dot (green) + minimize X
- Chat window (flex-grow, scrollable): message bubbles
- Quick commands row: 4 chip buttons ("Show Customers", "Add Customer", "Generate Invoice", "Help") — scrollable horizontally on mobile
- Input bar: text input + send icon button (`--accent-blue`)

**Design two chat states:**
- **Empty / Welcome state:** centered bot avatar + "Hi, I'm your CRM Assistant." + "Use the commands below or type a message." subtext
- **Active chat state:** several message exchanges showing user commands and bot responses (including one where bot lists customer names inline)

---

### Screen 12: 404 / Not Found Page
**Route:** `*`

**Layout:** Full viewport, `--bg-base`. No sidebar.

**Center composition:**
- "404" — Display size, 72px, 700 weight, gradient text (`--accent-blue` to `--accent-green` horizontal gradient)
- Heading: "Page not found" — H1, `--text-primary`
- Body: "This page doesn't exist or has been moved." — `--text-secondary`
- "Go to Dashboard" — primary button
- Background: abstract low-opacity grid of dots or faint geometric lines, same tint as registration page

---

## Responsive Behavior

Design both **desktop (1440px)** and **mobile (375px)** frames for every screen.

### Mobile Adaptations
- Sidebar replaced by a bottom navigation bar: 5 icon tabs with labels (Dashboard, Customers, Invoices, Chatbot, Profile)
- Tables become stacked customer cards: avatar + name + status badge + action row
- Two-column form grids collapse to single column
- Stat cards collapse to a `2x2` grid
- Modals become full-screen bottom sheets (slide up from bottom)
- Invoice generator left/right split becomes single-column (preview below form, collapsible)
- Chatbot drawer becomes full-screen on mobile

---

## Prototype / Interaction Flows

Wire up all 6 flows in Figma prototype mode:

1. Register → Login → Dashboard
2. Dashboard → Customer List → Add Customer (form fill + validation error) → Customer List (new row added)
3. Customer List → Click row → Customer Detail → Edit Customer → Customer List
4. Customer List → Delete (confirm modal) → Customer List (row removed)
5. Dashboard → Generate Invoice → Live preview updates → Invoice Detail
6. Dashboard → Open Chatbot → Type "show customers" → Bot lists names → Click "Add Customer" chip → Navigate

---

## Deliverables

- Figma file with all 12 screens (desktop + mobile variants = 24 frames minimum)
- Design system page with all tokens and 16 components
- Prototype with 6 clickable flows
- All icons sourced from Lucide or Phosphor icon set (consistent family throughout)
- Export all icons and avatar assets as SVG
- Annotate every interactive state (hover, focus, error, loading, empty, disabled) on each component in the component library page

---

## Designer Notes

- Maintain strict 8px grid alignment — misaligned elements break the precision feel of the dark theme
- Never use pure black (`#000000`) anywhere; always use `--bg-base` (`#0D0D0F`) as the darkest surface
- Avatar background colors: assign deterministically from this set — `#4D9EFF`, `#3DD68C`, `#F5C842`, `#FF7B5C`, `#B06DFF`, `#5CD6D6`, `#FF5C9D`, `#8BFF5C`
- Invoice numbers always displayed in `IBM Plex Mono`: `INV-2026-XXXX`
- Ensure minimum contrast ratio of **4.5:1** for all body text against its background (WCAG AA compliance)
- Do not add glow effects or neon aesthetics — the palette should feel refined and professional, not gaming-UI
- The chatbot floating button is the only element allowed a subtle animation on the base layout
