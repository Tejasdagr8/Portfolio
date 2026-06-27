export default function ScrollEpochHUD({ progress }) {
  const epoch = Math.max(1, Math.floor((progress / 100) * 99) + 1);
  const loss = Math.max(0.001, 2.718 - (progress / 100) * 2.6).toFixed(4);
  const converged = progress >= 98;

  return (
    <div
      className="fixed left-3 sm:left-5 bottom-20 sm:bottom-6 z-[50] hidden sm:block pointer-events-none select-none"
      aria-hidden="true"
    >
      <div className="font-mono text-[10px] tracking-wider text-fog/80 card-glass px-3 py-2.5 min-w-[120px] border-white/[0.08]">
        <div className="flex justify-between gap-4 mb-1.5">
          <span className="text-mint/70">epoch</span>
          <span className="text-paper tabular-nums">{String(epoch).padStart(3, "0")}</span>
        </div>
        <div className="flex justify-between gap-4 mb-2">
          <span className="text-mint/70">loss</span>
          <span className={`tabular-nums ${converged ? "text-mint" : "text-paper"}`}>{loss}</span>
        </div>
        <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-iris to-mint transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
        {converged && (
          <p className="text-[9px] text-mint mt-1.5 tracking-[0.12em] uppercase">converged ✓</p>
        )}
      </div>
    </div>
  );
}
