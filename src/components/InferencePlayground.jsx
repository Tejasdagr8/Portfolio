import { useMemo, useState } from "react";

const CORPUS = [
  { id: 1, text: "SuperAGI marketing campaign validation rules for WhatsApp test-send", score: 0.94, source: "internal/docs/campaigns.md" },
  { id: 2, text: "Sidekiq job retries and Redis queue configuration for async email dispatch", score: 0.87, source: "internal/docs/infra.md" },
  { id: 3, text: "LangGraph agent orchestrating weather, Tavily, and Google Places APIs", score: 0.81, source: "projects/trip-planner/README" },
  { id: 4, text: "RAG chunking strategy for PDF medical report summarization", score: 0.76, source: "medimage/rag_pipeline.py" },
  { id: 5, text: "TatvaOps Vantage CMS SEO metadata for construction cost guides", score: 0.71, source: "vantage/cms/seo.ts" },
];

function tokenize(q) {
  return q.toLowerCase().split(/\W+/).filter((w) => w.length > 2);
}

export default function InferencePlayground() {
  const [query, setQuery] = useState("");
  const [ran, setRan] = useState(false);
  const [latency, setLatency] = useState(null);

  const results = useMemo(() => {
    if (!ran || !query.trim()) return [];
    const tokens = tokenize(query);
    if (tokens.length === 0) {
      return [...CORPUS].sort((a, b) => b.score - a.score).slice(0, 3);
    }
    return CORPUS.map((doc) => {
      const hay = doc.text.toLowerCase();
      const hits = tokens.filter((t) => hay.includes(t)).length;
      const score = hits ? Math.min(0.99, doc.score * (0.5 + hits / tokens.length)) : doc.score * 0.3;
      return { ...doc, score: Math.round(score * 100) / 100 };
    })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [query, ran]);

  const route = useMemo(() => {
    if (!ran) return null;
    const q = query.toLowerCase();
    if (/campaign|whatsapp|email|sidekiq|kafka/.test(q)) return { model: "production-router", path: "SuperAGI stack", ms: 42 };
    if (/rag|pdf|medical|image|llm/.test(q)) return { model: "multimodal-rag", path: "MedImage pipeline", ms: 118 };
    if (/seo|cms|construction|vantage|tatva/.test(q)) return { model: "content-router", path: "TatvaOps CMS", ms: 67 };
    return { model: "general-llm", path: "Groq · llama-3.3-70b", ms: 89 };
  }, [query, ran]);

  const run = () => {
    const ms = 80 + Math.floor(Math.random() * 120);
    setLatency(ms);
    setRan(true);
  };

  return (
    <section id="playground" className="py-16 md:py-24 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-mint flex items-center gap-3 mb-4">
        playground
        <span className="flex-1 h-px bg-white/[0.13]" />
      </p>
      <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-3">
        Mock <span className="gradient-text">RAG router</span>
      </h2>
      <p className="text-fog text-sm max-w-2xl mb-8">
        Paste a query — see simulated retrieval scores and which pipeline would handle it. Demo only; numbers are illustrative.
      </p>

      <div className="card-glass p-5 sm:p-6 space-y-4">
        <textarea
          value={query}
          onChange={(e) => { setQuery(e.target.value); setRan(false); }}
          placeholder="e.g. How do we validate WhatsApp campaigns before send?"
          rows={3}
          className="w-full rounded-xl border border-white/[0.08] bg-ink-0/50 px-4 py-3 text-sm text-paper placeholder:text-fog/50 outline-none focus:border-mint/40 font-mono resize-none"
        />
        <button
          type="button"
          onClick={run}
          disabled={!query.trim()}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-iris to-mint text-ink-0 text-sm font-medium disabled:opacity-40"
        >
          Run inference
        </button>

        {ran && route && (
          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="rounded-xl border border-white/[0.08] p-4 font-mono text-xs space-y-2">
              <p className="text-ember uppercase tracking-wider text-[10px]">router decision</p>
              <p className="text-paper">{route.model}</p>
              <p className="text-fog">→ {route.path}</p>
              <p className="text-mint">latency ~{latency ?? route.ms}ms</p>
            </div>
            <div className="rounded-xl border border-white/[0.08] p-4">
              <p className="font-mono text-[10px] text-ember uppercase tracking-wider mb-3">top chunks retrieved</p>
              <ul className="space-y-2">
                {results.map((r) => (
                  <li key={r.id} className="text-xs text-fog border-b border-white/[0.06] pb-2 last:border-0">
                    <span className="text-mint tabular-nums">{r.score}</span> · {r.text.slice(0, 72)}…
                    <span className="block text-[10px] text-fog/50 mt-0.5">{r.source}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
