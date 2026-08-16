import { FaExternalLinkAlt } from "react-icons/fa";
import { paperLinks, publications } from "../data/publications";

const paper = publications[0];

export default function ResearchCallout() {
  return (
    <section className="border-y border-white/[0.08] bg-[var(--surface-band)]">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="card-glass card-glass-hover p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-mint mb-2">research · differentiator</p>
            <h3 className="font-display font-bold text-lg sm:text-xl text-paper leading-snug">
              {paper.arxivTitle}
            </h3>
            <p className="text-fog text-sm leading-7 mt-2 max-w-2xl">
              Sci-FM @ COLM 2026 accepted poster — calibration study across 8 frontier models and 5,200+ algorithm runs.
              Key finding: <span className="text-paper">15.9% calibrated coverage</span> (algorithmic blindness in LLM self-assessment).
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <a
              href={paperLinks.arxiv}
              target="_blank"
              rel="noreferrer"
              data-track="research_callout_arxiv"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-mint/35 text-mint text-xs font-mono hover:bg-mint/[0.08] transition-colors"
            >
              Paper <FaExternalLinkAlt size={9} />
            </a>
            <a
              href={paperLinks.code}
              target="_blank"
              rel="noreferrer"
              data-track="research_callout_code"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/[0.13] text-fog text-xs font-mono hover:text-paper transition-colors"
            >
              Code <FaExternalLinkAlt size={9} />
            </a>
            <a
              href="#research"
              data-track="research_callout_section"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/[0.13] text-fog text-xs font-mono hover:text-paper transition-colors"
            >
              Full spotlight →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
