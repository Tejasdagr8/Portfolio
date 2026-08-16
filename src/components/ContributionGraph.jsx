import { useMemo } from "react";

const LEVEL_COLORS = [
  "rgba(255,255,255,0.06)",
  "rgba(46, 160, 67, 0.35)",
  "rgba(46, 160, 67, 0.55)",
  "rgba(46, 160, 67, 0.78)",
  "rgba(57, 211, 83, 0.95)",
];

/** Late March → present — when work shipping ramped up */
const HIGHLIGHT_START = "2026-03-25";

function countToLevel(count) {
  if (count <= 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

export function mergeContributions(sources) {
  const byDate = new Map();

  for (const { contributions = [] } of sources) {
    for (const day of contributions) {
      const prev = byDate.get(day.date) || 0;
      byDate.set(day.date, prev + day.count);
    }
  }

  const contributions = [...byDate.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({
      date,
      count,
      level: countToLevel(count),
    }));

  const total = contributions.reduce((sum, d) => sum + d.count, 0);
  const phaseTotal = contributions
    .filter((d) => d.date >= HIGHLIGHT_START)
    .reduce((sum, d) => sum + d.count, 0);

  return { contributions, total, phaseTotal };
}

function buildWeeks(contributions) {
  if (!contributions.length) return [];

  const weeks = [];
  let week = [];
  const first = new Date(`${contributions[0].date}T12:00:00`);
  const pad = first.getDay();

  for (let i = 0; i < pad; i++) week.push(null);

  for (const day of contributions) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  return weeks;
}

function monthLabels(weeks) {
  const labels = [];
  let lastMonth = -1;

  weeks.forEach((week, wi) => {
    const firstDay = week.find(Boolean);
    if (!firstDay) {
      labels.push({ wi, label: null });
      return;
    }
    const month = new Date(`${firstDay.date}T12:00:00`).getMonth();
    if (month !== lastMonth) {
      lastMonth = month;
      labels.push({
        wi,
        label: new Date(`${firstDay.date}T12:00:00`).toLocaleString("en", { month: "short" }),
      });
    }
  });

  return labels;
}

function DayCell({ day }) {
  if (!day) {
    return <span className="w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] rounded-[2px] shrink-0" />;
  }

  return (
    <span
      title={`${day.date}: ${day.count} contribution${day.count === 1 ? "" : "s"}`}
      className="w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] rounded-[2px] shrink-0 transition-transform hover:scale-125 hover:ring-1 hover:ring-mint/40"
      style={{
        backgroundColor: LEVEL_COLORS[day.level] || LEVEL_COLORS[0],
      }}
    />
  );
}

export default function ContributionGraph({ contributions, total, phaseTotal, loading }) {
  const phaseContributions = useMemo(
    () => contributions.filter((d) => d.date >= HIGHLIGHT_START),
    [contributions]
  );

  const weeks = useMemo(() => buildWeeks(phaseContributions), [phaseContributions]);
  const labels = useMemo(() => monthLabels(weeks), [weeks]);

  const displayTotal = phaseTotal || phaseContributions.reduce((sum, d) => sum + d.count, 0);

  if (loading) {
    return (
      <div className="rounded-xl border border-white/[0.08] bg-ink-0/40 px-3.5 py-4">
        <p className="font-mono text-[10px] text-fog/60">loading contribution graph…</p>
      </div>
    );
  }

  if (!phaseContributions.length) return null;

  return (
    <div className="rounded-xl border border-white/[0.08] bg-ink-0/40 px-3.5 py-4 space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] text-paper">
            <span className="text-mint tabular-nums">{displayTotal.toLocaleString()}</span> contributions
            <span className="text-fog/50"> · late Mar 2026 → now</span>
          </p>
          {total > displayTotal && (
            <p className="font-mono text-[10px] text-fog/70 mt-1">
              <span className="text-fog/50 tabular-nums">{total.toLocaleString()}</span> in full GitHub year ·{" "}
              <span className="text-mint">{Math.round((displayTotal / total) * 100)}%</span> in shipping phase
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px] text-fog/60 uppercase tracking-wider">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-white/[0.06]" /> less
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: LEVEL_COLORS[4] }} /> more
          </span>
        </div>
      </div>

      <div className="relative overflow-x-auto pb-1 -mx-1 px-1">
        <div className="inline-block min-w-0">
          <div className="flex gap-[3px] mb-1 h-3">
            {weeks.map((_, wi) => {
              const label = labels.find((l) => l.wi === wi)?.label;
              return (
                <span
                  key={`m-${wi}`}
                  className="w-[10px] sm:w-[11px] shrink-0 font-mono text-[9px] text-fog/45 leading-none"
                >
                  {label || ""}
                </span>
              );
            })}
          </div>

          <div className="relative flex gap-[3px] rounded-md bg-mint/[0.04] ring-1 ring-mint/10 p-[2px]">
            {weeks.map((week, wi) => (
              <div key={`w-${wi}`} className="flex flex-col gap-[3px] shrink-0">
                {week.map((day, di) => (
                  <DayCell key={day?.date || `e-${wi}-${di}`} day={day} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="font-mono text-[9px] text-fog/50">
        Shipping phase only · combined public activity across @Tejasdagr8 + @tejasm-tatvaops
      </p>
    </div>
  );
}
