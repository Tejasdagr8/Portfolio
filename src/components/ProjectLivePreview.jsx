import { useState } from "react";
import { FaExpand, FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectLivePreview({ livePreview, projectTitle, liveUrl }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (!livePreview?.embedUrl && !livePreview?.screenshot) return null;
  if (livePreview.embedUrl && failed) return null;

  const isScreenshot = Boolean(livePreview.screenshot);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-mint">
          {isScreenshot ? "product preview" : "live preview"}
        </p>
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

      <div className="relative rounded-xl border border-white/[0.12] bg-ink-0 overflow-hidden shadow-inner group">
        {!loaded && !isScreenshot && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink-0/90 z-[1]">
            <p className="font-mono text-[11px] text-fog animate-pulse">Loading demo…</p>
          </div>
        )}

        {isScreenshot ? (
          liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              data-track={`spotlight_screenshot:${projectTitle}`}
              className="block relative"
            >
              <img
                src={livePreview.screenshot}
                alt={`${projectTitle} preview`}
                className="w-full h-auto max-h-[min(52vh,420px)] sm:max-h-[420px] object-cover object-top"
                loading="lazy"
                onLoad={() => setLoaded(true)}
              />
              <div className="absolute inset-0 bg-[#0a0d14]/0 group-hover:bg-[#0a0d14]/40 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-iris to-mint text-ink-contrast text-xs font-medium">
                  <FaExternalLinkAlt size={10} /> Visit live site
                </span>
              </div>
            </a>
          ) : (
            <img
              src={livePreview.screenshot}
              alt={`${projectTitle} preview`}
              className="w-full h-auto max-h-[min(52vh,420px)] sm:max-h-[420px] object-cover object-top"
              loading="lazy"
              onLoad={() => setLoaded(true)}
            />
          )
        ) : (
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
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0a0d14] to-transparent" />
      </div>

      {livePreview.note && (
        <p className="font-mono text-[9px] text-fog/50">{livePreview.note}</p>
      )}
    </div>
  );
}
