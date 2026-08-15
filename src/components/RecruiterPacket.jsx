import { motion, AnimatePresence } from "framer-motion";
import { FaCopy, FaDownload, FaEnvelope, FaExternalLinkAlt, FaFileAlt, FaLinkedin, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { INTRO_BLURB, RECRUITER_LINKS } from "../lib/recruiterPacket";
import { paperLinks } from "../data/publications";

export default function RecruiterPacket({ open, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    if (open) {
      window.dispatchEvent(new CustomEvent("achievement-unlock", { detail: "packet" }));
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const copyBlurb = async () => {
    try {
      await navigator.clipboard.writeText(INTRO_BLURB);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = INTRO_BLURB;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const links = [
    { label: "Download resume", href: RECRUITER_LINKS.resume, download: true, icon: FaDownload },
    { label: "Paper (arXiv)", href: RECRUITER_LINKS.paper, icon: FaFileAlt },
    { label: "Paper code", href: RECRUITER_LINKS.paperCode, icon: FaExternalLinkAlt },
    { label: "Quick hire page", href: RECRUITER_LINKS.hire, icon: FaExternalLinkAlt },
    { label: "LinkedIn", href: RECRUITER_LINKS.linkedin, icon: FaLinkedin },
    { label: "Email", href: `mailto:${RECRUITER_LINKS.email}`, icon: FaEnvelope },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[160] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-[#05070c]/85 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="w-full sm:max-w-lg max-h-[90dvh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-white/[0.12] bg-[#0a0d14] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-white/[0.08]">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-mint">recruiter packet</p>
                <h2 className="font-display font-bold text-xl text-paper mt-1">Everything in one place</h2>
              </div>
              <button type="button" onClick={onClose} className="p-2 text-fog hover:text-paper" aria-label="Close">
                <FaTimes />
              </button>
            </div>

            <div className="p-5 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {links.map(({ label, href, download, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    {...(download ? { download: true } : { target: "_blank", rel: "noreferrer" })}
                    data-track={`packet_${label}`}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/[0.1] text-sm text-fog hover:text-paper hover:border-mint/35 transition-colors"
                  >
                    <Icon size={12} className="text-mint shrink-0" /> {label}
                  </a>
                ))}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-ember">intro blurb</p>
                  <button
                    type="button"
                    onClick={copyBlurb}
                    className="font-mono text-[10px] text-mint hover:text-paper inline-flex items-center gap-1"
                  >
                    <FaCopy size={10} /> {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="text-xs text-fog leading-relaxed whitespace-pre-wrap font-mono p-4 rounded-xl border border-white/[0.08] bg-ink-0/50 max-h-48 overflow-y-auto">
                  {INTRO_BLURB}
                </pre>
              </div>

              <p className="font-mono text-[9px] text-fog/50">
                Paper: {paperLinks.arxiv.replace("https://", "")}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
