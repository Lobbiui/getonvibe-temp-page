import { BadgeDollarSign, BedDouble, Bus, Handshake, MapPinned, PackageCheck, Star } from "lucide-react";
import { NeonButton } from "@/components/NeonButton";
import { Section } from "@/components/Section";

const hotelOpportunities = [
  { title: "Room block opportunities", icon: BedDouble },
  { title: "Discounted attendee rates", icon: BadgeDollarSign },
  { title: "Preferred hotel visibility", icon: Star },
  { title: "Shuttle or transportation coordination", icon: Bus },
  { title: "Hospitality packages", icon: PackageCheck },
  { title: "Sponsorship opportunities", icon: Handshake },
  { title: "Nashville event traffic exposure", icon: MapPinned },
];

export function HotelPartnerships() {
  return (
    <Section
      id="hotel-partnerships"
      eyebrow="Lodging and hospitality"
      title="Hotel Partnerships"
      copy="ONVIBE Festival is connecting with Nashville-area hotels interested in supporting attendee lodging for the target October 17, 2026 launch event. Hotels can inquire about room blocks, discounted attendee rates, preferred lodging visibility, shuttle coordination, hospitality packages, and official partnership opportunities."
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel glow-border rounded-lg p-6 sm:p-8">
          <p className="text-lg font-bold leading-8 text-white">
            Attendees will be looking for trusted places to stay, gather, and move through Nashville with less friction.
          </p>
          <p className="mt-4 leading-7 text-slate-300">
            The hotel partnership inquiry path is built for properties that want to explore lodging visibility, attendee travel support, hospitality alignment, and launch-night partnership opportunities.
          </p>
          <div className="gradient-line my-8" />
          <NeonButton href="#hotel-partner-form">Partner With ONVIBE Festival</NeonButton>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {hotelOpportunities.map((item) => (
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
