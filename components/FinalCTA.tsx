import { NeonButton } from "@/components/NeonButton";
import { Section } from "@/components/Section";

export function FinalCTA() {
  return (
    <Section className="pb-10">
      <div className="glass-panel glow-border rounded-lg p-8 text-center sm:p-12">
        <p className="text-sm font-black uppercase tracking-[0.26em] text-cyan-300">
          Nashville gets the launch first.
        </p>
        <h2 className="neon-text mx-auto mt-4 max-w-4xl text-4xl font-black leading-tight text-white sm:text-6xl">
          October 17 is coming.
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          Venue, time, judges, and exclusive updates go to the list first.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <NeonButton href="#signup">Join the Event and App Launch List</NeonButton>
          <NeonButton href="#vendor-forms" variant="secondary">
            Apply as a Vendor
          </NeonButton>
        </div>
      </div>
    </Section>
  );
}
