import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core dark surfaces
        ink: {
          DEFAULT: "#06080b", // page background
          900: "#080b10",
          850: "#0a0e14",
          800: "#0e141b", // card surface
          700: "#131b24", // raised surface
          600: "#1a2430", // hover surface
        },
        line: {
          DEFAULT: "rgba(148,163,184,0.12)",
          strong: "rgba(148,163,184,0.22)",
        },
        fog: {
          DEFAULT: "#e8eef4", // primary text
          muted: "#93a1b1", // secondary text
          faint: "#5c6b7c", // tertiary text
        },
        // Minecraft-inspired grass green (primary accent)
        grass: {
          300: "#7ef2a3",
          400: "#4ade80",
          500: "#2fc965",
          600: "#1fa452",
          700: "#15803d",
        },
        // Developer accents
        cyber: {
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
        },
        arcane: {
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
        },
        blurple: {
          DEFAULT: "#5865f2",
          light: "#7983f5",
          dark: "#4752c4",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        "glow-green": "0 0 40px -8px rgba(74,222,128,0.35)",
        "glow-green-sm": "0 0 20px -6px rgba(74,222,128,0.4)",
        "glow-cyan": "0 0 40px -8px rgba(34,211,238,0.3)",
        "glow-blurple": "0 0 40px -8px rgba(88,101,242,0.45)",
        card: "0 18px 50px -20px rgba(0,0,0,0.7)",
        "card-hover": "0 26px 70px -22px rgba(0,0,0,0.8)",
      },
      transitionDuration: {
        400: "400ms",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.82)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "floaty-sm": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-7px)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "dash-flow": {
          to: { strokeDashoffset: "-40" },
        },
        "grid-pan": {
          to: { backgroundPosition: "64px 64px" },
        },
        shimmer: {
          "100%": { transform: "translateX(200%)" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 2.4s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.16,1,0.3,1) infinite",
        floaty: "floaty 7s ease-in-out infinite",
        "floaty-sm": "floaty-sm 5.5s ease-in-out infinite",
        blink: "blink 1.1s step-end infinite",
        "dash-flow": "dash-flow 1.6s linear infinite",
        "grid-pan": "grid-pan 90s linear infinite",
        shimmer: "shimmer 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
