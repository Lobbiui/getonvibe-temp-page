"use client";

import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, MapPin, ShieldCheck, Sparkles, Store } from "lucide-react";
import { DualLogoHero } from "@/components/DualLogoHero";
import { NeonButton } from "@/components/NeonButton";
import { eventDetails } from "@/lib/event";

const chips = [
  { label: eventDetails.locationLabel, icon: MapPin },
  { label: eventDetails.targetDateLabel, icon: CalendarDays },
  { label: "21 Plus Event", icon: ShieldCheck },
  { label: "Venue Announcement Coming Soon", icon: Sparkles },
  { label: "Limited Vendor Spots", icon: Store },
  { label: "Legal Hemp and COA Required Brand Partners", icon: CheckCircle2 },
];

const competitionBadges = [
  { prize: "$1,000", label: "Costume Competition" },
  { prize: "$1,000", label: "Light Up Dance Battle" },
  { prize: "$1,000", label: "Cloud Competition" },
];

export function Hero() {
  return (
    <header className="hero-stage relative min-h-screen px-4 pb-14 pt-4 sm:px-6 lg:px-8">
      <div className="stage-silhouette" aria-hidden="true" />
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
            <p className="mt-5 text-2xl font-black uppercase tracking-[0.16em] text-fuchsia-200 sm:text-3xl">
              Food. Gear. Culture.
            </p>
            <p className="mt-2 text-3xl font-black text-white sm:text-5xl">
              Find Your Vibe.
            </p>
            <p className="mt-6 max-w-2xl text-xl font-bold leading-8 text-cyan-100 sm:text-2xl">
              {eventDetails.targetDateLabel}. {eventDetails.venueStatus} Sign up now to get first access to event details, launch updates, and exclusive announcements.
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Music. Creators. Vendors. Community. The Official Launch Experience for GetOnVibe.
            </p>

            <motion.div
              className="glass-panel glow-border mt-7 rounded-lg p-4 sm:p-5"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }}
            >
              <p className="text-sm font-black uppercase tracking-[0.22em] text-fuchsia-200">
                Over $2,500 in competition prizes
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {competitionBadges.map((badge) => (
                  <a
                    key={badge.label}
                    href="#competitions"
                    className="rounded-md border border-cyan-300/25 bg-slate-950/60 p-3 transition hover:border-fuchsia-300 hover:bg-fuchsia-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                  >
                    <span className="block text-2xl font-black text-white neon-text">{badge.prize}</span>
                    <span className="mt-1 block text-xs font-bold uppercase tracking-[0.12em] text-cyan-100">
                      {badge.label}
                    </span>
                  </a>
                ))}
              </div>
              <p className="mt-4 text-sm font-bold leading-6 text-slate-300">
                Competition details, rules, and sign-up instructions will be released first to registered attendees.
              </p>
            </motion.div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <NeonButton href="#signup">Get Event and App Launch Updates</NeonButton>
              <NeonButton href="#signup" variant="secondary">
                Get Competition Updates
              </NeonButton>
              <NeonButton href="#competitions" variant="secondary">
                View Competitions
              </NeonButton>
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
