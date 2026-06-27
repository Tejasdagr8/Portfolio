import { useCallback, useEffect, useState } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { readSoundEnabled, setSoundEnabled } from "../lib/sounds";
import { track } from "../lib/analytics";

export default function SoundToggle({ className = "" }) {
  const [enabled, setEnabled] = useState(readSoundEnabled);

  useEffect(() => {
    const sync = (e) => setEnabled(Boolean(e.detail?.enabled));
    window.addEventListener("sounds-change", sync);
    return () => window.removeEventListener("sounds-change", sync);
  }, []);

  const toggle = useCallback(() => {
    const next = !enabled;
    setSoundEnabled(next);
    setEnabled(next);
    track("click", { label: next ? "sound_on" : "sound_off" });
  }, [enabled]);

  return (
    <button
      type="button"
      onClick={toggle}
      className={`flex items-center justify-center p-2 rounded-full border transition-colors ${
        enabled
          ? "border-mint/35 text-mint hover:bg-mint/[0.08]"
          : "border-white/[0.10] text-fog hover:text-paper hover:border-white/[0.2]"
      } ${className}`}
      title={enabled ? "Sound on — click to mute" : "Sound off — click for UI sounds"}
      aria-label={enabled ? "Disable sound effects" : "Enable sound effects"}
      aria-pressed={enabled}
    >
      {enabled ? <FaVolumeUp size={12} /> : <FaVolumeMute size={12} />}
    </button>
  );
}
