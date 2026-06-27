import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "../lib/analytics";

const STEPS = [
  { id: "about", label: "About", hint: "Model-first engineer" },
  { id: "experience", label: "Experience", hint: "SuperAGI + CirrusLabs" },
  { id: "projects", label: "Projects", hint: "8 shipped builds" },
  { id: "contact", label: "Contact", hint: "Let's talk" },
];

const STEP_MS = 2800;

export default function RecruiterSpeedRun({ onComplete }) {
  const [active, setActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const startRef = useRef(0);
  const stepRef = useRef(0);
  const activeRef = useRef(false);

  const stop = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) cancelAnimationFrame(progressRef.current);
    activeRef.current = false;
    setActive(false);
    setStepIndex(0);
    setProgress(0);
    stepRef.current = 0;
  }, []);

  const goToStep = useCallback(
    (index) => {
      const step = STEPS[index];
      if (!step || !activeRef.current) return;

      document.getElementById(step.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      stepRef.current = index;
      setStepIndex(index);
      setProgress(0);
      startRef.current = performance.now();

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (!activeRef.current) return;
        if (index < STEPS.length - 1) {
          goToStep(index + 1);
        } else {
          track("click", { label: "speedrun_complete" });
          onComplete?.();
          setTimeout(stop, 1200);
        }
      }, STEP_MS);
    },
    [onComplete, stop]
  );

  const start = useCallback(() => {
    if (activeRef.current) return;
    track("click", { label: "speedrun_start" });
    activeRef.current = true;
    setActive(true);
    goToStep(0);
  }, [goToStep]);

  const skipStep = useCallback(() => {
    if (!activeRef.current) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    const next = stepRef.current + 1;
    if (next < STEPS.length) {
      goToStep(next);
    } else {
      stop();
    }
  }, [goToStep, stop]);

  useEffect(() => {
    const onKeyDown = (e) => {
      const tag = e.target?.tagName?.toLowerCase();
      const inField = tag === "input" || tag === "textarea" || e.target?.isContentEditable;
      if (inField || e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key.toLowerCase() === "r" && !activeRef.current) {
        e.preventDefault();
        start();
      }
      if (e.key === "Escape" && activeRef.current) {
        e.preventDefault();
        stop();
      }
      if (e.key === " " && activeRef.current) {
        e.preventDefault();
        skipStep();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [start, stop, skipStep]);

  useEffect(() => {
    if (!active) return;

    const tick = (now) => {
      if (!activeRef.current) return;
      const elapsed = now - startRef.current;
      setProgress(Math.min(100, (elapsed / STEP_MS) * 100));
      progressRef.current = requestAnimationFrame(tick);
    };
    startRef.current = performance.now();
    progressRef.current = requestAnimationFrame(tick);

    return () => {
      if (progressRef.current) cancelAnimationFrame(progressRef.current);
    };
  }, [active, stepIndex]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    const handler = () => start();
    window.addEventListener("start-speedrun", handler);
    return () => window.removeEventListener("start-speedrun", handler);
  }, [start]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="fixed top-[68px] left-1/2 -translate-x-1/2 z-[120] w-[calc(100%-2rem)] max-w-lg"
        >
          <div className="card-glass border-mint/25 px-4 py-3 shadow-xl">
            <div className="flex items-center justify-between gap-3 mb-2">
              <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-mint">
                recruiter speed run
              </p>
              <button
                type="button"
                onClick={stop}
                className="font-mono text-[10px] text-fog hover:text-paper transition-colors"
              >
                esc · skip
              </button>
            </div>

            <div className="flex gap-1 mb-2">
              {STEPS.map((step, i) => (
                <div
                  key={step.id}
                  className={`flex-1 h-1 rounded-full transition-colors ${
                    i < stepIndex ? "bg-mint" : i === stepIndex ? "bg-iris" : "bg-white/[0.08]"
                  }`}
                />
              ))}
            </div>

            <div className="h-0.5 rounded-full bg-white/[0.06] overflow-hidden mb-2">
              <div
                className="h-full bg-gradient-to-r from-iris to-mint transition-none"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="font-display font-bold text-sm text-paper">
              {STEPS[stepIndex]?.label}
              <span className="text-fog font-normal font-mono text-xs ml-2">
                {STEPS[stepIndex]?.hint}
              </span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
