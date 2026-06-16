import { Headphones, Store, UsersRound } from "lucide-react";
import { NeonButton } from "@/components/NeonButton";
import { Section } from "@/components/Section";

const attendeeReasons = ["Music", "Food", "Vendors", "Creators", "Community", "Culture"];

export function CompetitionOptional() {
  return (
    <Section id="everyone" eyebrow="Open to every attendee" className="pt-0">
      <div className="glass-panel glow-border overflow-hidden rounded-lg p-6 sm:p-9 lg:p-12">
        <div className="grid gap-9 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-fuchsia-200">
              ONVIBE is for the whole crowd
            </p>
            <h2 className="neon-text mt-4 max-w-3xl text-4xl font-black leading-tight text-white sm:text-6xl">
              You Don&apos;t Need To Compete To Attend.
            </h2>
            <p className="mt-5 text-2xl font-black text-cyan-100 sm:text-3xl">
              ONVIBE Festival is built for everyone.
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Whether you&apos;re competing, supporting a friend, discovering new brands, meeting
              creators, enjoying great food, or simply looking for an unforgettable experience,
              ONVIBE Festival is designed for you.
            </p>
            <p className="mt-5 text-lg font-bold leading-8 text-white">
              The competitions are just one part of the experience.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-cyan-300/10 blur-3xl" aria-hidden="true" />
            <div className="relative grid gap-4 sm:grid-cols-2">
              {attendeeReasons.map((reason) => (
                <div
                  key={reason}
                  className="glass-panel flex min-h-20 items-center justify-center rounded-md border-cyan-300/20 p-4 text-center text-xl font-black text-white"
                >
                  {reason}
                </div>
              ))}
            </div>
            <div className="glass-panel glow-border relative mt-5 rounded-lg p-6">
              <div className="mb-5 flex items-center gap-3 text-cyan-200">
                <Headphones className="h-6 w-6" aria-hidden="true" />
                <Store className="h-6 w-6" aria-hidden="true" />
                <UsersRound className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="text-4xl font-black leading-none text-white sm:text-5xl">Food.</p>
              <p className="text-4xl font-black leading-none text-cyan-100 sm:text-5xl">Gear.</p>
              <p className="text-4xl font-black leading-none text-fuchsia-100 sm:text-5xl">Culture.</p>
              <p className="mt-4 text-3xl font-black text-white">Live.</p>
            </div>
          </div>
        </div>

        <div className="gradient-line my-8" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-base font-bold leading-7 text-slate-300">
            Come for the music, the food, the vendors, the people, the launch, or the atmosphere.
          </p>
          <NeonButton href="#signup" className="shrink-0">
            Pre-Register Today
          </NeonButton>
        </div>
      </div>
    </Section>
  );
}
