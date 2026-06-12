import { Section } from "@/components/Section";

const steps = ["Discover", "Connect", "Attend", "Create", "Share"];

export function OnVibeExperienceFlow() {
  return (
    <Section
      id="onvibe-experience"
      eyebrow="Connected ecosystem"
      title="The ONVIBE Experience"
      copy="GetOnVibe and ONVIBE Festival are built as one connected ecosystem designed around discovery, community, creators, culture, and real-world experiences."
    >
      <div className="glass-panel glow-border rounded-lg p-5 sm:p-7">
        <div className="grid gap-3 md:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step} className="relative rounded-md border border-white/15 bg-slate-950/70 p-5 text-center">
              <p className="text-2xl font-black text-white">{step}</p>
              {index < steps.length - 1 && (
                <span
                  className="absolute -bottom-3 left-1/2 h-6 w-px bg-cyan-300/60 md:-right-2 md:bottom-auto md:left-auto md:top-1/2 md:h-px md:w-4"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
