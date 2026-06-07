/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#a5c8ff',
        'primary-container': '#4d9eff',
        secondary: '#49e095',
        tertiary: '#eec13c',
        surface: '#131315',
        background: '#0D0D0F',
        'bg-surface': '#141417',
        'bg-elevated': '#1C1C21',
        'bg-overlay': '#242429',
        'border-subtle': '#2A2A31',
        'border-strong': '#3D3D47',
        'text-primary': '#F0F0F5',
        'text-secondary': '#9090A0',
        'text-muted': '#55555F',
        'accent-blue-dim': '#1A3D6B',
        'accent-green-dim': '#0F3D26',
        'accent-yellow-dim': '#3D3010',
        'accent-red': '#FF5C5C',
        'accent-red-dim': '#3D1010',
        outline: '#8b919e',
        error: '#ffb4ab',
      },
      fontFamily: {
        sans: ['var(--font-ibm-plex-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'monospace'],
      },
      borderRadius: {
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
      },
      spacing: {
        sidebar: '240px',
      },
      width: {
        sidebar: '240px',
      },
    },
  },
  plugins: [],
};
