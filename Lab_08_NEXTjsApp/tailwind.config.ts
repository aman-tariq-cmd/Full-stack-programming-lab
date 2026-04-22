import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'DM Sans'", "system-ui", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      colors: {
        ink: {
          DEFAULT: "#0f0e0d",
          50: "#f7f6f5",
          100: "#edecea",
          200: "#d4d2ce",
          300: "#b0ada7",
          400: "#857f77",
          500: "#5c5650",
          600: "#3d3830",
          700: "#28231d",
          800: "#1a1612",
          900: "#0f0e0d",
        },
        amber: {
          DEFAULT: "#e8a020",
          50: "#fef9ec",
          100: "#fdf0c9",
          200: "#fbe098",
          300: "#f8c84d",
          400: "#f5b025",
          500: "#e8a020",
          600: "#c47d0e",
          700: "#a3610f",
          800: "#854c13",
          900: "#6e3f14",
        },
        cream: "#faf8f5",
        stone: "#e8e4df",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        shimmer: "shimmer 2s infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
