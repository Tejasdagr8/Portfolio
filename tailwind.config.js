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
          0: "#0B0E16",
          2: "#141929",
        },
        iris: "#8C7BFF",
        mint: "#5EE6D0",
        fog: "#9AA3BD",
        paper: "#EAEDF6",
        ember: "#FFB36B",
      },
    },
  },
  plugins: [],
};
