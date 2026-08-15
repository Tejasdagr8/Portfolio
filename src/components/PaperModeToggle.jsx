import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const KEY = "portfolio_paper_mode";

export function initPaperMode() {
  if (localStorage.getItem(KEY) === "1") {
    document.documentElement.classList.add("paper-mode");
  }
}

export default function PaperModeToggle({ className = "" }) {
  const [on, setOn] = useState(() => localStorage.getItem(KEY) === "1");

  const toggle = () => {
    const next = !on;
    setOn(next);
    localStorage.setItem(KEY, next ? "1" : "0");
    document.documentElement.classList.toggle("paper-mode", next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`p-2 rounded-lg border border-white/[0.10] text-fog hover:text-paper hover:border-white/[0.2] transition-colors ${className}`}
      aria-label={on ? "Switch to dark mode" : "Switch to paper mode"}
      title="Paper mode — clean academic layout"
    >
      {on ? <FaMoon size={14} /> : <FaSun size={14} />}
    </button>
  );
}
