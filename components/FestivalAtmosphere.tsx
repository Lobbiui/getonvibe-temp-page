import { Aperture, BadgeCheck, Camera, Disc3, Handshake, RadioTower, Sparkles, Zap } from "lucide-react";
import { Section } from "@/components/Section";

const atmosphere = [
  { title: "Live DJs", copy: "Curated sets keep the room moving from first arrival to final callout.", icon: Disc3 },
  { title: "Continuous Music", copy: "High-energy transitions keep the night feeling connected and alive.", icon: RadioTower },
  { title: "Neon-Drenched Atmosphere", copy: "Light, motion, and premium nightlife energy built for an unforgettable first impression.", icon: Sparkles },
  { title: "Industry Networking", copy: "A focused room for founders, retailers, creators, operators, and local tastemakers.", icon: Handshake },
  { title: "Creator-Friendly Environment", copy: "Designed for capture, collaboration, and high-quality launch-night content.", icon: Aperture },
  { title: "Brand Activations", copy: "Premium onsite moments for legal, compliant brands ready to show up with impact.", icon: BadgeCheck },
  { title: "Photo-Ready Moments", copy: "Visual touchpoints built for clean content, bold posts, and audience participation.", icon: Camera },
  { title: "Launch-Night Energy", copy: "The festival doubles as a first look at the GetOnVibe ecosystem.", icon: Zap },
];

export function FestivalAtmosphere() {
  return (
    <Section
      id="atmosphere"
      eyebrow="Festival atmosphere"
      title="A launch night built like a signal flare."
      copy="ONVIBE Festival blends nightlife, local commerce, creator culture, and industry connection into one high-contrast Nashville activation."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {atmosphere.map((item) => (
          <article key={item.title} className="glass-panel rounded-lg p-5">
            <item.icon className="mb-4 h-6 w-6 text-cyan-300" aria-hidden="true" />
            <h3 className="text-lg font-black text-white">{item.title}</h3>
            <p className="mt-3 leading-7 text-slate-300">{item.copy}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
