import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#eae9da",
        muted: "#838275",
        gold: "#ccc654",
        dark: "#040707",
      },
      fontFamily: {
        typewriter: ["var(--font-typewriter)", "Courier New", "Courier", "monospace"],
        aquifer: ["var(--font-aquifer)", "Courier New", "Courier", "monospace"],
      },
      letterSpacing: {
        typewriter: "4.8px",
        "typewriter-sm": "3.6px",
      },
      animation: {
        blink: "blink 1.5s ease-in-out infinite",
        "fade-in": "fadeIn 0.6s ease-in-out forwards",
        "fade-out": "fadeOut 0.6s ease-in-out forwards",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
