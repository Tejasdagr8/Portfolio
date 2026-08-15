import { motion, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import { useEffect } from "react";

export default function PaperSpotlight({ publication, onClose }) {
  useEffect(() => {
    if (!publication) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [publication, onClose]);

  const s = publication?.spotlight;

  return (
    <AnimatePresence>
      {publication && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-[#05070c]/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="w-full sm:max-w-2xl max-h-[90dvh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-mint/20 bg-[#0a0d14] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex justify-between gap-4 p-5 border-b border-white/[0.08] bg-[#0a0d14]/95 backdrop-blur-md">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-mint">research spotlight · {publication.year}</p>
                <h3 className="font-display font-bold text-xl text-paper mt-1 leading-snug">{publication.arxivTitle || publication.title}</h3>
                <p className="font-mono text-xs text-fog mt-2">{publication.venue} · {publication.status}</p>
              </div>
              <button type="button" onClick={onClose} className="p-2 text-fog hover:text-paper" aria-label="Close">
                <FaTimes size={16} />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-6">
              <p className="text-fog text-sm leading-7">{s?.abstract || publication.description}</p>

              {s?.keyFindings?.length > 0 && (
                <div>
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-ember mb-3">key findings</p>
                  <ul className="space-y-2">
                    {s.keyFindings.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-fog">
                        <span className="text-mint shrink-0">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="font-mono text-xs text-fog/70">Authors: {publication.authors}</p>

              <div className="flex flex-wrap gap-2">
                {publication.tags?.map((tag) => (
                  <span key={tag} className="font-mono text-[11px] px-3 py-1 rounded-full border border-white/[0.13] text-fog">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {publication.links?.map(({ label, href, track }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    data-track={track}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-mint hover:text-paper px-3 py-1.5 rounded-full border border-mint/30"
                  >
                    <FaExternalLinkAlt size={10} /> {label}
                  </a>
                ))}
              </div>

              <p className="font-mono text-[10px] text-fog/50">{publication.note}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
