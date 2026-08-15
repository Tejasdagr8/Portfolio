export default function AchievementBadges({ contributionTotal = 0 }) {
  const points = [
    { label: "production", value: "15+ PRs @ SuperAGI" },
    { label: "research", value: "Sci-FM @ COLM 2026 poster" },
    { label: "shipped", value: "TatvaOps Vantage + 8 projects" },
  ];

  if (contributionTotal >= 1000) {
    points.push({ label: "github", value: `${contributionTotal.toLocaleString()}+ contributions` });
  }

  return (
    <div className="card-glass p-6">
      <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-mint mb-4">proof points</p>
      <ul className="space-y-3">
        {points.map(({ label, value }) => (
          <li key={label} className="flex items-baseline justify-between gap-4 border-b border-white/[0.06] pb-3 last:border-0 last:pb-0">
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-fog shrink-0">{label}</span>
            <span className="font-display font-semibold text-sm text-paper text-right leading-snug">{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Kept for terminal easter egg tracking — no UI surface. */
export function unlockAchievement() {}
