"use client";

import { useState } from "react";

const surfaces = [
  {
    name: "Your World",
    label: "More than a link page",
    headline: "Your whole creative presence, finally in one place.",
    copy: "Bring together your streams, socials, releases, events, website, shop, and original work without asking your audience to hunt for the next link.",
    signals: ["Latest stream", "New release", "Official site"],
  },
  {
    name: "Discovery",
    label: "Built to find you",
    headline: "A profile should open doors, not sit still.",
    copy: "Pulse, Swipe, Momentum, Search, and events give original creators multiple ways to reach people beyond the audience they already have.",
    signals: ["In your Pulse", "Found in Swipe", "Rising now"],
  },
  {
    name: "Original First",
    label: "Human work at the front",
    headline: "Discovery should reward the person who made it.",
    copy: "Clear source labels, creator controls, community signals, and moderation filters are designed to reduce low-effort AI output and elevate original work.",
    signals: ["Original source", "Creator controlled", "Community signal"],
  },
  {
    name: "Amplify",
    label: "A platform beside you",
    headline: "Keep creating where you create. We help it travel farther.",
    copy: "GetOnVibe is built to connect creators with audiences, brands, events, collaborations, and advertising that can amplify the work without replacing its home.",
    signals: ["Brand connection", "Event opportunity", "Amplified reach"],
  },
];

export function DiscoveryStage() {
  const [activeName, setActiveName] = useState(surfaces[0].name);
  const active = surfaces.find((surface) => surface.name === activeName) ?? surfaces[0];

  return (
    <div className="gateway-discovery-stage">
      <div className="gateway-discovery-tabs" aria-label="Explore GetOnVibe discovery modes" role="tablist">
        {surfaces.map((surface, index) => (
          <button
            aria-controls="gateway-discovery-panel"
            aria-selected={surface.name === active.name}
            className={surface.name === active.name ? "is-active" : ""}
            key={surface.name}
            onClick={() => setActiveName(surface.name)}
            role="tab"
            type="button"
          >
            <span>0{index + 1}</span>
            {surface.name}
          </button>
        ))}
      </div>

      <div className="gateway-discovery-panel" id="gateway-discovery-panel" role="tabpanel">
        <div className="gateway-discovery-copy" key={active.name}>
          <p>{active.label}</p>
          <h3>{active.headline}</h3>
          <span>{active.copy}</span>
        </div>
        <div className="gateway-discovery-visual" aria-hidden="true">
          <span className="gateway-discovery-word">{active.name}</span>
          <div className="gateway-discovery-rings"><i /><i /><i /></div>
          <div className="gateway-discovery-signals">
            {active.signals.map((signal, index) => <span key={signal} style={{ "--signal-index": index } as React.CSSProperties}>{signal}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
