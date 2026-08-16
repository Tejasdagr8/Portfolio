import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import ProfileAvatar from "../components/ProfileAvatar";
import SeoHead from "../components/SeoHead";
import useAnalytics from "../hooks/useAnalytics";
import { PAGE_SEO } from "../data/seo";
import { paperLinks } from "../data/publications";

const HIGHLIGHTS = [
  {
    text: "Accepted poster — Sci-FM 2026 @ COLM · LLM calibration & performance prediction research",
    href: paperLinks.arxiv,
    track: "hire_paper",
  },
  { text: "AI/ML engineer & full-stack developer · B.Tech CS (AI), CGPA 8.38" },
  { text: "SDE Intern @ SuperAGI — Go, Rails, Vue, 15+ PRs in production" },
];

const PAPER_LINKS = [
  { label: "Paper", href: paperLinks.arxiv, track: "hire_paper_arxiv" },
  { label: "Code", href: paperLinks.code, track: "hire_paper_code" },
  { label: "Workshop", href: paperLinks.workshop, track: "hire_paper_workshop" },
];

export default function Hire() {
  useAnalytics();

  return (
    <div className="min-h-[100dvh] bg-ink-0 text-paper font-body flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <SeoHead title={PAGE_SEO.hire.title} description={PAGE_SEO.hire.description} path={PAGE_SEO.hire.path} />
      <div className="absolute inset-0 bg-gradient-to-b from-iris/[0.06] via-transparent to-mint/[0.04] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md text-center">
        <ProfileAvatar size="sm" className="mx-auto mb-6" />

        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-mint mb-2">open to opportunities</p>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-paper">Tejas Melkote</h1>
        <p className="text-fog text-sm mt-2">AI/ML · Full Stack · Bengaluru, IN</p>

        <ul className="mt-8 space-y-3 text-left">
          {HIGHLIGHTS.map((item) => (
            <li key={item.text} className="flex gap-3 text-sm text-fog leading-relaxed card-glass px-4 py-3">
              <span className="text-mint shrink-0">→</span>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  data-track={item.track}
                  className="hover:text-mint transition-colors inline-flex items-center gap-1.5"
                >
                  {item.text}
                  <FaExternalLinkAlt size={10} className="opacity-70" />
                </a>
              ) : (
                <span>{item.text}</span>
              )}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {PAPER_LINKS.map(({ label, href, track }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              data-track={track}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-mint hover:text-paper px-3 py-1.5 rounded-full border border-mint/30 hover:border-mint/60 transition-colors"
            >
              <FaExternalLinkAlt size={9} /> {label}
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <a
            href="/resume.pdf"
            download
            data-track="hire_resume"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-gradient-to-r from-iris to-mint text-ink-contrast text-sm font-medium hover:opacity-90 transition-opacity"
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

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8 text-fog">
          <a href="https://github.com/Tejasdagr8" target="_blank" rel="noreferrer" data-track="hire_github" className="hover:text-mint transition-colors text-sm font-mono" aria-label="GitHub personal">
            <FaGithub size={18} className="inline mr-1.5" />Tejasdagr8
          </a>
          <a href="https://github.com/tejasm-tatvaops" target="_blank" rel="noreferrer" data-track="hire_github_work" className="hover:text-mint transition-colors text-sm font-mono" aria-label="GitHub work">
            <FaGithub size={18} className="inline mr-1.5" />tejasm-tatvaops
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
