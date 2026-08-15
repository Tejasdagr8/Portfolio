import { useState } from "react";
import { FaExternalLinkAlt, FaExpand } from "react-icons/fa";

export default function ProjectLivePreview({ livePreview, projectTitle, liveUrl }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (!livePreview?.embedUrl || failed) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-mint">live preview</p>
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            data-track={`spotlight_preview:${projectTitle}`}
            className="font-mono text-[10px] text-fog hover:text-mint inline-flex items-center gap-1.5 transition-colors"
          >
            <FaExpand size={9} /> Open full site
          </a>
        )}
      </div>

      <div className="relative rounded-xl border border-white/[0.12] bg-ink-0 overflow-hidden shadow-inner">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink-0/90 z-[1]">
            <p className="font-mono text-[11px] text-fog animate-pulse">Loading demo…</p>
          </div>
        )}

        <iframe
          src={livePreview.embedUrl}
          title={`${projectTitle} live preview`}
          className="w-full h-[min(52vh,420px)] sm:h-[420px] bg-white"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0a0d14] to-transparent" />
      </div>

      {livePreview.note && (
        <p className="font-mono text-[9px] text-fog/50">{livePreview.note}</p>
      )}
    </div>
  );
}
