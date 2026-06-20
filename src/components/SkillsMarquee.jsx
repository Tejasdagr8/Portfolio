const marqueeItems = [
  "Python", "Go", "LangGraph", "FastAPI", "React", "Vue.js", "LLMs", "RAG",
  "PyTorch", "Docker", "Kafka", "Redis", "PostgreSQL", "Jenkins", "ArgoCD",
];

export default function SkillsMarquee() {
  const track = [...marqueeItems, ...marqueeItems];

  return (
    <div className="border-y border-white/[0.13] overflow-hidden py-5 bg-[#0B0E16]/50" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {track.map((item, i) => (
          <span key={`${item}-${i}`} className="marquee-item font-mono text-xs sm:text-sm tracking-widest uppercase text-[#9AA3BD]">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
