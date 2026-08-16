function buildStats(projectCount) {
  return [
    { key: "prs", label: "production PRs", value: "15+", live: false },
    { key: "paper", label: "COLM 2026 poster", value: "1", live: false },
    { key: "projects", label: "shipped projects", value: String(projectCount), live: false },
    { key: "contrib", label: "GitHub contributions", value: null, live: true },
  ];
}

function formatContrib(total) {
  if (!total || total <= 0) return "—";
  return `${total.toLocaleString()}+`;
}

export default function HeroStats({ contributionTotal = 0, projectCount = 0 }) {
  const stats = buildStats(projectCount);

  return (
    <div
      className="flex flex-wrap justify-center lg:justify-start gap-x-4 sm:gap-x-6 gap-y-3 mt-6 sm:mt-8"
      aria-label="Portfolio highlights"
    >
      {stats.map(({ key, label, value, live }) => {
        const display = live ? formatContrib(contributionTotal) : value;
        return (
          <div key={key} className="text-center lg:text-left min-w-[4.5rem]">
            <p className="font-display font-bold text-xl sm:text-2xl text-paper tabular-nums">{display}</p>
            <p className="font-mono text-[10px] sm:text-[11px] text-fog-muted tracking-wide mt-0.5 max-w-[7rem] leading-snug">
              {label}
              {live && contributionTotal > 0 && (
                <span className="text-mint/70"> · live</span>
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}
