import { useEffect, useState } from "react";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const STORAGE_KEY = "portfolio_legendary_mode";

export function useKonami(onUnlock) {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(STORAGE_KEY) === "1");

  useEffect(() => {
    if (unlocked) {
      document.body.dataset.legendary = "true";
    }
  }, [unlocked]);

  useEffect(() => {
    const sync = () => {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        document.body.dataset.legendary = "true";
        setUnlocked(true);
        onUnlock?.();
      }
    };
    window.addEventListener("legendary-unlock", sync);
    return () => window.removeEventListener("legendary-unlock", sync);
  }, [onUnlock]);

  useEffect(() => {
    if (unlocked) {
      document.body.dataset.legendary = "true";
      return;
    }

    let index = 0;

    const onKeyDown = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[index]) {
        index += 1;
        if (index === KONAMI.length) {
          sessionStorage.setItem(STORAGE_KEY, "1");
          document.body.dataset.legendary = "true";
          setUnlocked(true);
          onUnlock?.();
          index = 0;
        }
      } else {
        index = key === KONAMI[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [unlocked, onUnlock]);

  return unlocked;
}

export function resetLegendaryMode() {
  sessionStorage.removeItem(STORAGE_KEY);
  delete document.body.dataset.legendary;
}
