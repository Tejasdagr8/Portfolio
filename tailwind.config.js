/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["Sora", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      colors: {
        ink: {
          0: "var(--ink-0)",
          2: "var(--ink-2)",
          contrast: "var(--ink-contrast)",
        },
        iris: "var(--iris)",
        mint: "var(--mint)",
        fog: "var(--fog)",
        "fog-muted": "var(--fog-muted)",
        paper: "var(--paper)",
        ember: "var(--ember)",
      },
    },
  },
  plugins: [],
};
