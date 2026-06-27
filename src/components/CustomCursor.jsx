import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ring, setRing] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!fine.matches || reduced.matches || window.innerWidth < 768) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    let rafId;
    let targetX = 0;
    let targetY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setVisible(true);
      setPos({ x: targetX, y: targetY });
    };

    const onLeave = () => setVisible(false);

    const onOver = (e) => {
      const interactive = e.target.closest("a, button, [role='button'], input, textarea, select, label");
      setHovering(Boolean(interactive));
    };

    const animate = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      setRing({ x: ringX, y: ringY });
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("mouseover", onOver);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        className="custom-cursor-dot fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          opacity: visible ? 1 : 0,
        }}
        aria-hidden="true"
      />
      <div
        className={`custom-cursor-ring fixed top-0 left-0 z-[9998] pointer-events-none ${hovering ? "is-hover" : ""}`}
        style={{
          transform: `translate(${ring.x}px, ${ring.y}px)`,
          opacity: visible ? 1 : 0,
        }}
        aria-hidden="true"
      />
    </>
  );
}
