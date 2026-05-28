"use client";

import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, MapPin, ShieldCheck, Sparkles, Store } from "lucide-react";
import { DualLogoHero } from "@/components/DualLogoHero";
import { NeonButton } from "@/components/NeonButton";

const chips = [
  { label: "Nashville, TN", icon: MapPin },
  { label: "October 17", icon: CalendarDays },
  { label: "21 Plus Event", icon: ShieldCheck },
  { label: "Venue and Time TBA", icon: Sparkles },
  { label: "Limited Vendor Spots", icon: Store },
  { label: "Legal Hemp and COA Required Brand Partners", icon: CheckCircle2 },
];

export function Hero() {
  return (
    <header className="relative min-h-screen px-4 pb-14 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="glass-panel mb-6 rounded-md px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-slate-200 sm:text-sm">
          Must be 21 or older to attend. Valid government-issued ID required at entry. Venue and time will be announced to registered subscribers first.
        </div>

        <div className="grid items-center gap-10 pt-2 lg:grid-cols-[1.02fr_0.98fr] lg:pt-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="equalizer" aria-hidden="true">
                {Array.from({ length: 12 }).map((_, index) => (
                  <span key={index} />
                ))}
              </div>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">
                Nashville Launch Night
              </p>
            </div>

            <h1 className="neon-text max-w-5xl text-5xl font-black leading-[0.94] text-white sm:text-7xl lg:text-8xl">
              ONVIBE Festival Lands in Nashville
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-bold leading-8 text-cyan-100 sm:text-2xl">
              October 17. Venue and time TBA. Sign up now to get first access to event details, launch updates, and exclusive announcements.
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              A neon-drenched industry festival celebrating legal alternative products, live culture, local commerce, music, creators, and the official GetOnVibe platform launch.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <NeonButton href="#signup">Get Event and App Launch Updates</NeonButton>
              <NeonButton href="#vendor-forms" variant="secondary">
                Apply as a Vendor
              </NeonButton>
            </div>
          </motion.div>

          <div>
            <DualLogoHero />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {chips.map((chip) => (
                <div
                  key={chip.label}
                  className="glass-panel flex min-h-14 items-center gap-3 rounded-md px-4 py-3 text-sm font-bold text-slate-100"
                >
                  <chip.icon className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                  <span>{chip.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
