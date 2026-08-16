import { useEffect, useState } from "react";

const PHRASES = [
  "SuperAGI production stack",
  "15+ PRs shipped",
  "Go / Rails / Vue",
  "LLM agents",
  "RAG pipelines",
  "production CI/CD",
  "full-stack ML",
];

export default function TypingHero({ className = "" }) {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = PHRASES[phraseIdx];
    const delay = deleting ? 40 : 70;

    if (!deleting && text === full) {
      const pause = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(pause);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % PHRASES.length);
      return undefined;
    }

    const tick = setTimeout(() => {
      setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
    }, delay);

    return () => clearTimeout(tick);
  }, [text, deleting, phraseIdx]);

  return (
    <span className={`font-mono text-mint ${className}`}>
      {text}
      <span className="animate-pulse text-mint/80">▌</span>
    </span>
  );
}
