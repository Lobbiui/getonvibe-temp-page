"use client";

import { useMemo, useSyncExternalStore } from "react";
import { eventDetails } from "@/lib/event";

type TimeRemaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getSecondsRemaining() {
  const target = new Date(eventDetails.countdownTargetIso).getTime();
  return Math.max(Math.floor((target - Date.now()) / 1000), 0);
}

function getTimeRemaining(totalSeconds: number): TimeRemaining {
  return {
    days: Math.floor(totalSeconds / (60 * 60 * 24)),
    hours: Math.floor((totalSeconds / (60 * 60)) % 24),
    minutes: Math.floor((totalSeconds / 60) % 60),
    seconds: totalSeconds % 60,
  };
}

function subscribeToCountdown(callback: () => void) {
  const interval = window.setInterval(callback, 1000);

  return () => window.clearInterval(interval);
}

export function CountdownTimer() {
  const secondsRemaining = useSyncExternalStore(subscribeToCountdown, getSecondsRemaining, () => 0);
  const timeRemaining = useMemo(() => getTimeRemaining(secondsRemaining), [secondsRemaining]);

  const units = useMemo(
    () => [
      { label: "Days", value: timeRemaining.days },
      { label: "Hours", value: timeRemaining.hours },
      { label: "Minutes", value: timeRemaining.minutes },
      { label: "Seconds", value: timeRemaining.seconds },
    ],
    [timeRemaining],
  );

  return (
    <section className="relative px-4 py-10 sm:px-6 lg:px-8" aria-label="Festival countdown">
      <div className="mx-auto max-w-7xl">
        <div className="glass-panel glow-border rounded-lg p-5 sm:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-300">
                {eventDetails.targetDateLabel}
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">
                Music. Culture. Community. The official GetOnVibe launch experience.
              </h2>
              <p className="mt-4 leading-7 text-slate-300">
                Venue announcement, ticket details, hotel partners, competition rules, and DJ lineup updates will be released first to registered subscribers.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:min-w-[520px]">
              {units.map((unit) => (
                <div key={unit.label} className="rounded-md border border-white/15 bg-slate-950/70 p-4 text-center">
                  <p className="neon-text text-3xl font-black text-white sm:text-4xl">
                    {unit.value.toString().padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
                    {unit.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
