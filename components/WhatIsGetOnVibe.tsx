import { CalendarSearch, Compass, Flame, PackageSearch, Store, UsersRound } from "lucide-react";
import { NeonButton } from "@/components/NeonButton";
import { Section } from "@/components/Section";

const discoveryItems = [
  { title: "Food", icon: Store },
  { title: "Gear", icon: PackageSearch },
  { title: "Culture", icon: Flame },
  { title: "Events", icon: CalendarSearch },
  { title: "Creators", icon: UsersRound },
  { title: "Community", icon: Compass },
];

export function WhatIsGetOnVibe() {
  return (
    <Section
      id="what-is-getonvibe"
      eyebrow="Platform discovery"
      title="What Is GetOnVibe?"
      copy="GetOnVibe is where people discover food, gear, culture, events, creators, and community."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-panel glow-border rounded-lg p-6 sm:p-8">
          <p className="text-lg font-bold leading-8 text-white">
            Follow what is trending. Find local events. Connect with creators. Discover stores and products.
          </p>
          <p className="neon-text mt-5 text-3xl font-black text-white">Find Your Vibe.</p>
          <div className="gradient-line my-8" />
          <NeonButton href="#signup">Join The Waitlist</NeonButton>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {discoveryItems.map((item) => (
            <article key={item.title} className="glass-panel rounded-lg p-5">
              <item.icon className="mb-4 h-6 w-6 text-cyan-300" aria-hidden="true" />
              <h3 className="text-lg font-black text-white">{item.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
