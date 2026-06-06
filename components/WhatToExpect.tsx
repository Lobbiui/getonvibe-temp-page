import {
  BadgeCheck,
  Camera,
  Crown,
  Disc3,
  Hotel,
  Music2,
  RadioTower,
  Salad,
  ScanLine,
  Store,
  UsersRound,
} from "lucide-react";
import { Section } from "@/components/Section";

const expectations = [
  { title: "Live DJs and music", icon: Disc3 },
  { title: "DJ lineup announcements coming soon", icon: RadioTower },
  { title: "Brand Village", icon: Store },
  { title: "Food Vendor Row", icon: Salad },
  { title: "$1,000 Costume Competition", icon: Crown },
  { title: "$1,000 Dance Competition", icon: Music2 },
  { title: "$500 GetOnVibe Selfie Competition", icon: Camera },
  { title: "GetOnVibe Registration Hub", icon: ScanLine },
  { title: "Creator and community activations", icon: UsersRound },
  { title: "Official hotel partner updates", icon: Hotel },
  { title: "21+ festival environment", icon: BadgeCheck },
];

export function WhatToExpect() {
  return (
    <Section
      id="what-to-expect"
      eyebrow="Festival launch experience"
      title="What To Expect"
      copy="ONVIBE Festival is being built as a 21+ music, culture, brand, food, creator, and GetOnVibe platform launch experience."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {expectations.map((item) => (
          <article key={item.title} className="glass-panel rounded-lg p-5">
            <item.icon className="mb-4 h-6 w-6 text-cyan-300" aria-hidden="true" />
            <h3 className="text-lg font-black text-white">{item.title}</h3>
          </article>
        ))}
      </div>
    </Section>
  );
}
