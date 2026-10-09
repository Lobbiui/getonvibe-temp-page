"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

export function AmbientMotionControl() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPaused(reducedMotion.matches);
    const initialSync = window.setTimeout(updatePreference, 0);
    reducedMotion.addEventListener("change", updatePreference);

    return () => {
      window.clearTimeout(initialSync);
      reducedMotion.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.gatewayMotion = paused ? "paused" : "playing";
    window.dispatchEvent(new CustomEvent("gateway-motion-toggle", { detail: { paused } }));
  }, [paused]);

  return (
    <button
      aria-label={paused ? "Resume ambient motion" : "Pause ambient motion"}
      aria-pressed={paused}
      className="gateway-motion-control"
      onClick={() => setPaused((current) => !current)}
      type="button"
    >
      {paused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}
      <span>{paused ? "Resume motion" : "Pause motion"}</span>
    </button>
  );
}
