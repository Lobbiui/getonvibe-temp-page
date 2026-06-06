import { Hotel } from "lucide-react";
import { NeonButton } from "@/components/NeonButton";
import { Section } from "@/components/Section";

export function HotelPartnersTeaser() {
  return (
    <Section className="py-12">
      <div className="glass-panel rounded-lg border border-cyan-300/30 p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-4">
            <Hotel className="mt-1 h-8 w-8 shrink-0 text-cyan-300" aria-hidden="true" />
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-fuchsia-200">
                Lodging updates
              </p>
              <h2 className="mt-2 text-3xl font-black text-white">Official Hotel Partners Coming Soon</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                Preferred lodging options, discounted attendee rates, room block opportunities, and hotel partner announcements will be shared with registered subscribers first.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <NeonButton href="#signup">Get Hotel Updates</NeonButton>
            <NeonButton href="#hotel-partnerships" variant="secondary">
              Hotel Partnership Info
            </NeonButton>
          </div>
        </div>
      </div>
    </Section>
  );
}
