import { useState } from "react";
import { architectureFlows } from "../data/architectureFlows";

export default function InteractiveArchitecture({ flowKey, title }) {
  const flow = architectureFlows[flowKey];
  const [active, setActive] = useState(flow?.nodes[0]?.id);

  if (!flow) return null;

  const node = flow.nodes.find((n) => n.id === active);

  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-ember mb-3">{title || flow.title}</p>
      <div className="card-glass p-4 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {flow.edges.map((id, i) => {
            const n = flow.nodes.find((x) => x.id === id);
            return (
              <div key={id} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActive(id)}
                  className={`px-3 py-2 rounded-lg border font-mono text-[11px] whitespace-nowrap transition-colors ${
                    active === id
                      ? "border-mint/50 bg-mint/[0.08] text-paper"
                      : "border-white/[0.12] bg-[var(--muted-surface)] text-fog hover:text-paper"
                  }`}
                >
                  {n?.label}
                </button>
                {i < flow.edges.length - 1 && <span className="text-mint font-mono text-sm">→</span>}
              </div>
            );
          })}
        </div>
        {node && (
          <p className="text-sm text-fog leading-relaxed border-t border-white/[0.08] pt-3">
            <span className="text-mint font-mono text-xs">{node.label} — </span>
            {node.detail}
          </p>
        )}
      </div>
    </div>
  );
}
