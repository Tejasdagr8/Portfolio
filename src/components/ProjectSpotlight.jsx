import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import ArchitectureDiagram from "./ArchitectureDiagram";

export default function ProjectSpotlight({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  const spotlight = project?.spotlight;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="spotlight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-[#05070c]/80 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} spotlight`}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="w-full sm:max-w-2xl max-h-[90dvh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-white/[0.12] bg-[#0a0d14] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-white/[0.08] bg-[#0a0d14]/95 backdrop-blur-md">
              <div className="min-w-0">
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-mint mb-2">
                  project spotlight · {spotlight?.year || "—"}
                </p>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-paper leading-tight">
                  {project.title}
                </h3>
                {spotlight?.role && (
                  <p className="font-mono text-xs text-fog mt-2">{spotlight.role}</p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 p-2 rounded-lg text-fog hover:text-paper hover:bg-white/[0.06] transition-colors"
                aria-label="Close spotlight"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-6">
              <p className="text-fog text-sm sm:text-base leading-7">{project.description}</p>

              {spotlight?.highlights && (
                <div>
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-ember mb-3">highlights</p>
                  <ul className="space-y-2">
                    {spotlight.highlights.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-fog leading-relaxed">
                        <span className="text-mint shrink-0 mt-0.5">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {spotlight?.architecture && (
                <ArchitectureDiagram steps={spotlight.architecture} />
              )}

              <div className="flex flex-wrap gap-2">
                {(spotlight?.stack || project.tags).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] px-3 py-1 rounded-full border border-white/[0.13] text-fog"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  data-track={`spotlight:${project.title}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-iris to-mint text-ink-0 text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <FaExternalLinkAlt size={11} /> View live
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
