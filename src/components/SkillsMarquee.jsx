const marqueeItems = [
  "Python", "Go", "LangGraph", "FastAPI", "React", "Vue.js", "LLMs", "RAG",
  "PyTorch", "Docker", "Kafka", "Redis", "PostgreSQL", "Jenkins", "ArgoCD",
];

export default function SkillsMarquee() {
  const track = [...marqueeItems, ...marqueeItems];

  return (
    <div className="relative border-y border-white/[0.10] overflow-hidden py-4 sm:py-5 bg-[#0B0E16]/70" aria-hidden="true">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 z-10 bg-gradient-to-r from-[#0B0E16] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 z-10 bg-gradient-to-l from-[#0B0E16] to-transparent" />

      <div className="flex items-center gap-4 sm:gap-6">
        <p className="hidden sm:block shrink-0 pl-4 sm:pl-6 lg:pl-8 font-mono text-[10px] tracking-[0.2em] uppercase text-fog/60">
          stack
        </p>
        <div className="marquee-track flex w-max min-w-0 flex-1">
          {track.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="marquee-item font-mono text-[11px] sm:text-xs tracking-[0.18em] uppercase text-fog/75 hover:text-paper transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
