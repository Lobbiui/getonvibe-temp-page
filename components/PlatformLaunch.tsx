import { Bell, Blocks, Map, Megaphone, Radio, UsersRound } from "lucide-react";
import { NeonButton } from "@/components/NeonButton";
import { Section } from "@/components/Section";

const features = [
  { title: "App and Website Launch Updates", icon: Bell },
  { title: "Industry-Specific Discovery", icon: Map },
  { title: "Local Commerce Visibility", icon: Megaphone },
  { title: "Social Discovery", icon: UsersRound },
  { title: "Brand and Retailer Presence", icon: Blocks },
  { title: "Event-Driven Activation", icon: Radio },
];

export function PlatformLaunch() {
  return (
    <Section
      id="launch"
      eyebrow="Official platform rollout"
      title="GetOnVibe launches with the crowd that needs it most."
      copy="GetOnVibe is launching as a platform built for the alternative products industry, connecting people, brands, retailers, events, creators, and local discovery in one ecosystem."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-panel glow-border rounded-lg p-6 sm:p-8">
          <p className="text-lg leading-8 text-slate-200">
            Mainstream platforms were not built for this space. GetOnVibe is being designed for discovery, visibility, launch-night activation, and the real local networks that move culture and commerce forward.
          </p>
          <div className="gradient-line my-8" />
          <NeonButton href="#signup">Join the GetOnVibe Launch List</NeonButton>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.title} className="glass-panel rounded-lg p-5">
              <feature.icon className="mb-4 h-6 w-6 text-cyan-300" aria-hidden="true" />
              <h3 className="text-lg font-black text-white">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
