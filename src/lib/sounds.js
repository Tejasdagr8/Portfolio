const STORAGE_KEY = "portfolio_sounds_enabled";

let audioCtx = null;

function getContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

export function isSoundEnabled() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) === "1";
}

export function setSoundEnabled(enabled) {
  localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
  window.dispatchEvent(new CustomEvent("sounds-change", { detail: { enabled } }));
  if (enabled) playSound("enable");
}

export function readSoundEnabled() {
  return isSoundEnabled();
}

function shouldPlay() {
  if (!isSoundEnabled()) return false;
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  return true;
}

function tone(ctx, { freq = 440, duration = 0.06, type = "sine", gain = 0.04, delay = 0, slideTo = null }) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
  if (slideTo) {
    osc.frequency.exponentialRampToValueAtTime(slideTo, ctx.currentTime + delay + duration);
  }
  g.gain.setValueAtTime(0.0001, ctx.currentTime + delay);
  g.gain.exponentialRampToValueAtTime(gain, ctx.currentTime + delay + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + duration + 0.02);
}

export function playSound(name) {
  if (!shouldPlay()) return;

  const ctx = getContext();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }

  switch (name) {
    case "click":
      tone(ctx, { freq: 620, duration: 0.04, gain: 0.025 });
      break;
    case "terminal":
      tone(ctx, { freq: 380, duration: 0.035, type: "square", gain: 0.018 });
      break;
    case "terminalOpen":
      tone(ctx, { freq: 520, duration: 0.05, gain: 0.03 });
      tone(ctx, { freq: 780, duration: 0.07, gain: 0.028, delay: 0.05 });
      break;
    case "unlock":
      tone(ctx, { freq: 523, duration: 0.08, gain: 0.035 });
      tone(ctx, { freq: 659, duration: 0.08, gain: 0.032, delay: 0.07 });
      tone(ctx, { freq: 784, duration: 0.12, gain: 0.03, delay: 0.14 });
      break;
    case "success":
      tone(ctx, { freq: 880, duration: 0.1, gain: 0.03 });
      tone(ctx, { freq: 1175, duration: 0.14, gain: 0.025, delay: 0.08 });
      break;
    case "whoosh":
      tone(ctx, { freq: 240, duration: 0.1, gain: 0.022, slideTo: 90 });
      break;
    case "open":
      tone(ctx, { freq: 440, duration: 0.06, gain: 0.028 });
      tone(ctx, { freq: 550, duration: 0.08, gain: 0.022, delay: 0.04 });
      break;
    case "enable":
      tone(ctx, { freq: 660, duration: 0.05, gain: 0.02 });
      tone(ctx, { freq: 880, duration: 0.06, gain: 0.018, delay: 0.045 });
      break;
    case "error":
      tone(ctx, { freq: 220, duration: 0.1, gain: 0.025, slideTo: 160 });
      break;
    default:
      tone(ctx, { freq: 500, duration: 0.04, gain: 0.02 });
  }
}
