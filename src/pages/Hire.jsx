import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import profile from "../assets/profile.jpeg";
import useAnalytics from "../hooks/useAnalytics";

const HIGHLIGHTS = [
  "AI/ML engineer & full-stack developer · B.Tech CS (AI), CGPA 8.46",
  "SDE Intern @ SuperAGI — Go, Rails, Vue, 15+ PRs in production",
  "Built LLM agents, RAG pipelines, and shipped products end-to-end",
];

export default function Hire() {
  useAnalytics();

  return (
    <div className="min-h-[100dvh] bg-ink-0 text-paper font-body flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-iris/[0.06] via-transparent to-mint/[0.04] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md text-center">
        <img
          src={profile}
          alt="Tejas Melkote"
          className="w-24 h-24 rounded-full object-cover border border-white/10 mx-auto mb-6"
        />

        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-mint mb-2">open to opportunities</p>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-paper">Tejas Melkote</h1>
        <p className="text-fog text-sm mt-2">AI/ML · Full Stack · Bengaluru, IN</p>

        <ul className="mt-8 space-y-3 text-left">
          {HIGHLIGHTS.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-fog leading-relaxed card-glass px-4 py-3">
              <span className="text-mint shrink-0">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3">
          <a
            href="/resume.pdf"
            download
            data-track="hire_resume"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-gradient-to-r from-iris to-mint text-ink-0 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <FaDownload size={12} /> Download resume
          </a>
          <a
            href="mailto:coooltejasdagr@gmail.com"
            data-track="hire_email"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full border border-white/[0.15] text-fog text-sm hover:text-paper hover:border-mint/40 transition-all"
          >
            <FaEnvelope size={12} /> coooltejasdagr@gmail.com
          </a>
        </div>

        <div className="flex justify-center gap-6 mt-8 text-fog">
          <a href="https://github.com/Tejasdagr8" target="_blank" rel="noreferrer" data-track="hire_github" className="hover:text-mint transition-colors" aria-label="GitHub">
            <FaGithub size={18} />
          </a>
          <a href="https://www.linkedin.com/in/tejas-melkote-390545309/" target="_blank" rel="noreferrer" data-track="hire_linkedin" className="hover:text-mint transition-colors" aria-label="LinkedIn">
            <FaLinkedin size={18} />
          </a>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 mt-10 font-mono text-[11px] tracking-wider uppercase text-fog hover:text-mint transition-colors"
        >
          <FaExternalLinkAlt size={10} /> Full portfolio
        </Link>
      </div>
    </div>
  );
}
