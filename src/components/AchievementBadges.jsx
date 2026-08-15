import { useEffect, useState } from "react";
import { achievements } from "../data/achievements";

const STORAGE_KEY = "portfolio_achievements";

function loadUnlocks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveUnlock(id) {
  const prev = loadUnlocks();
  if (prev[id]) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, [id]: Date.now() }));
}

export function unlockAchievement(id) {
  saveUnlock(id);
  window.dispatchEvent(new CustomEvent("achievement-updated"));
}

export function useAchievements(contributionTotal = 0) {
  const [unlocks, setUnlocks] = useState(loadUnlocks);

  useEffect(() => {
    const refresh = () => setUnlocks(loadUnlocks());
    window.addEventListener("achievement-updated", refresh);
    window.addEventListener("achievement-unlock", (e) => {
      if (e.detail) saveUnlock(e.detail);
      refresh();
    });
    window.addEventListener("start-speedrun", () => saveUnlock("speedrun"));
    return () => {
      window.removeEventListener("achievement-updated", refresh);
    };
  }, []);

  const isUnlocked = (a) => {
    if (a.unlock === "always") return true;
    if (a.unlock === "contributions") return contributionTotal >= (a.threshold || 1000);
    if (a.unlock === "konami") {
      return (
        document.documentElement.classList.contains("legendary-mode") ||
        document.body.dataset.legendary === "true"
      );
    }
    return Boolean(unlocks[a.unlock]);
  };

  return achievements.map((a) => ({ ...a, unlocked: isUnlocked(a) }));
}

export default function AchievementBadges({ contributionTotal = 0 }) {
  const badges = useAchievements(contributionTotal);
  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="card-glass p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-ember">achievements</p>
        <span className="font-mono text-[10px] text-fog">{unlockedCount}/{badges.length}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {badges.map((b) => (
          <span
            key={b.id}
            title={b.hint}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border font-mono text-[10px] transition-all ${
              b.unlocked
                ? "border-mint/35 bg-mint/[0.06] text-paper"
                : "border-white/[0.08] text-fog/40 grayscale opacity-50"
            }`}
          >
            <span>{b.icon}</span>
            {b.label}
          </span>
        ))}
      </div>
    </div>
  );
}
