import { compareIntro, compareRows } from "../data/compare";
import { Link } from "react-router-dom";

export default function Compare() {
  return (
    <div className="min-h-[100dvh] bg-ink-0 text-paper font-body px-4 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-mint mb-4">compare mode</p>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-3">Tejas vs typical new grad</h1>
        <p className="text-fog text-sm leading-relaxed mb-10">{compareIntro}</p>

        <div className="card-glass overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-px bg-white/[0.08] font-mono text-[10px] sm:text-xs uppercase tracking-wider">
            <div className="bg-ink-2 p-3 text-fog" />
            <div className="bg-ink-2 p-3 text-mint">Tejas</div>
            <div className="bg-ink-2 p-3 text-fog">Typical</div>
          </div>
          {compareRows.map((row) => (
            <div key={row.label} className="grid grid-cols-[1fr_1fr_1fr] gap-px bg-white/[0.06] text-sm">
              <div className="bg-ink-2 p-3 sm:p-4 text-fog font-mono text-[11px] sm:text-xs">{row.label}</div>
              <div className="bg-ink-2 p-3 sm:p-4 text-paper">{row.you}</div>
              <div className="bg-ink-2 p-3 sm:p-4 text-fog/70">{row.typical}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mt-10">
          <Link to="/" className="px-5 py-2.5 rounded-full bg-gradient-to-r from-iris to-mint text-ink-0 text-sm font-medium">
            Full portfolio
          </Link>
          <Link to="/hire" className="px-5 py-2.5 rounded-full border border-white/[0.15] text-fog text-sm hover:text-paper">
            /hire
          </Link>
        </div>
      </div>
    </div>
  );
}
