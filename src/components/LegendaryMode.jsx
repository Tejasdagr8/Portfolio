import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConfettiBurst from "./ConfettiBurst";
import { useKonami } from "../hooks/useKonami";
import { track } from "../lib/analytics";
import { playSound } from "../lib/sounds";

export default function LegendaryMode() {
  const [showToast, setShowToast] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const toastTimer = useRef(null);

  const unlocked = useKonami(() => {
    playSound("unlock");
    setConfetti(true);
    setShowToast(true);
    track("click", { label: "konami_unlock" });
    toastTimer.current = setTimeout(() => setShowToast(false), 4500);
  });

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  return (
    <>
      <ConfettiBurst active={confetti} onDone={() => setConfetti(false)} />

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[250] px-5 py-3 rounded-full border border-mint/40 bg-[#0B0E16]/95 backdrop-blur-md shadow-xl font-mono text-xs text-paper tracking-wide"
          >
            <span className="text-mint">✦</span> Legendary mode unlocked — gradients intensified
          </motion.div>
        )}
      </AnimatePresence>

      {unlocked && (
        <div
          className="fixed top-[72px] right-4 z-[40] hidden sm:flex font-mono text-[9px] tracking-[0.2em] uppercase text-mint/60 pointer-events-none"
          aria-hidden="true"
        >
          legendary
        </div>
      )}
    </>
  );
}
