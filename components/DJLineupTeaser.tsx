import { RadioTower } from "lucide-react";
import { NeonButton } from "@/components/NeonButton";
import { Section } from "@/components/Section";

export function DJLineupTeaser() {
  return (
    <Section className="py-12">
      <div className="glass-panel glow-border rounded-lg p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-4">
            <RadioTower className="mt-1 h-8 w-8 shrink-0 text-fuchsia-300" aria-hidden="true" />
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-300">
                Music updates
              </p>
              <h2 className="mt-2 text-3xl font-black text-white">DJ Lineup Announcements Coming Soon</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                The music lineup, special guests, and live performance updates will be released first to registered subscribers.
              </p>
            </div>
          </div>
          <NeonButton href="#signup" className="shrink-0">
            Get Lineup Updates
          </NeonButton>
        </div>
      </div>
    </Section>
  );
}
