export default function ArchitectureDiagram({ title, steps }) {
  if (!steps?.length) return null;

  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-ember mb-3">{title || "architecture"}</p>
      <div className="card-glass p-4 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className="px-3 py-2 rounded-lg border border-white/[0.12] bg-ink-0/50 font-mono text-[11px] text-paper whitespace-nowrap">
                {step}
              </div>
              {i < steps.length - 1 && (
                <span className="text-mint font-mono text-sm shrink-0">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
