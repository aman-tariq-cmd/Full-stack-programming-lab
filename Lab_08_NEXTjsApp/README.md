# Luminary Studio — Next.js 14 Lab Assignment

A professional multi-page Next.js 14 application using the App Router, TypeScript, and Tailwind CSS.

---

## 📁 Folder Structure

```
nextjs-lab-app/
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx          # About page
│   │   ├── contact/
│   │   │   └── page.tsx          # Contact page (client component with form)
│   │   ├── globals.css           # Global styles + Google Fonts import
│   │   ├── layout.tsx            # Root layout (Header + Footer applied globally)
│   │   └── page.tsx              # Home page
│   └── components/
│       ├── Header.tsx            # Responsive nav with hamburger + active links
│       └── Footer.tsx            # Footer with copyright + social links
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
└── package.json
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm start
```

---

## ✅ Features Checklist

- [x] **3 Pages**: Home (`/`), About (`/about`), Contact (`/contact`)
- [x] **Header Component**: Navigation links, active link highlighting, hamburger menu for mobile
- [x] **Footer Component**: Copyright info, social links (GitHub, Twitter, LinkedIn, Instagram)
- [x] **layout.tsx**: Header + Footer applied globally via root layout
- [x] **Tailwind CSS**: Responsive, modern, clean design with custom color palette
- [x] **TypeScript**: Strict TypeScript throughout all files
- [x] **Responsive Navigation**: Hamburger menu collapses on mobile, full nav on desktop
- [x] **Active Link Highlighting**: Current page link visually highlighted in header
- [x] **Unique Hero Sections**: Each page has a distinct hero with relevant content
- [x] **Contact Form**: Fully functional form with loading state, validation, and success state

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary Font | Playfair Display (serif) |
| Body Font | DM Sans |
| Mono Font | DM Mono |
| Primary Color | `#0f0e0d` (Ink) |
| Accent Color | `#e8a020` (Amber) |
| Background | `#faf8f5` (Cream) |

---

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `next@14.2.3` | Framework with App Router |
| `react@18` | UI library |
| `tailwindcss@3.4` | Utility-first CSS |
| `lucide-react` | Icon library |
| `typescript@5` | Type safety |
