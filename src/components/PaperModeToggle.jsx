import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const KEY = "portfolio_paper_mode";

/** Dark by default — paper mode only when toggled this session. */
export function initPaperMode() {
  try {
    localStorage.removeItem(KEY);
    const enabled = sessionStorage.getItem(KEY) === "1";
    document.documentElement.classList.toggle("paper-mode", enabled);
  } catch {
    document.documentElement.classList.remove("paper-mode");
  }
}

export default function PaperModeToggle({ className = "" }) {
  const [on, setOn] = useState(() => {
    try {
      return sessionStorage.getItem(KEY) === "1";
    } catch {
      return false;
    }
  });

  const toggle = () => {
    const next = !on;
    setOn(next);
    try {
      sessionStorage.setItem(KEY, next ? "1" : "0");
    } catch {
      /* ignore */
    }
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
