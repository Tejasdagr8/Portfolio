import { useEffect, useRef } from "react";

export default function GradientField({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let W, H, particles = [];
    const mouse = { x: -9999, y: -9999, active: false };
    const COUNT = () => Math.min(220, Math.floor((W * H) / 9000));
    let t = 0;
    let rafId = null;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function seed() {
      particles = [];
      const n = COUNT();
      for (let i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: 0,
          vy: 0,
          hue: Math.random(),
        });
      }
    }

    function angle(x, y, time) {
      return (
        Math.sin(x * 0.0022 + time * 0.00018) * 2.4 +
        Math.cos(y * 0.0026 - time * 0.00012) * 2.4
      );
    }

    function lerpColor(h, a) {
      const r = Math.round(140 + (94 - 140) * h);
      const g = Math.round(123 + (230 - 123) * h);
      const b = Math.round(255 + (208 - 255) * h);
      return `rgba(${r},${g},${b},${a})`;
    }

    function frame() {
      t += 16;
      ctx.fillStyle = "rgba(11,14,22,0.085)";
      ctx.fillRect(0, 0, W, H);

      for (const p of particles) {
        const a = angle(p.x, p.y, t);
        let ax = Math.cos(a) * 0.06;
        let ay = Math.sin(a) * 0.06;

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 240 * 240) {
            const d = Math.sqrt(d2) || 1;
            const pull = (1 - d / 240) * 0.22;
            ax += (dx / d) * pull;
            ay += (dy / d) * pull;
          }
        }

        p.vx = (p.vx + ax) * 0.93;
        p.vy = (p.vy + ay) * 0.93;
        const nx = p.x + p.vx;
        const ny = p.y + p.vy;

        ctx.strokeStyle = lerpColor(p.hue, 0.5);
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        p.x = nx;
        p.y = ny;
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;
      }

      rafId = requestAnimationFrame(frame);
    }

    function staticField() {
      ctx.fillStyle = "#0B0E16";
      ctx.fillRect(0, 0, W, H);
      for (const p of particles) {
        ctx.fillStyle = lerpColor(p.hue, 0.35);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const onResize = () => {
      resize();
      if (reduced) staticField();
    };

    const onPointerMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = e.clientY < r.bottom;
    };

    const onPointerLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);

    resize();
    if (reduced) {
      staticField();
    } else {
      frame();
    }

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
