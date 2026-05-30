"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Crown, Camera, Music2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NeonButton } from "@/components/NeonButton";
import { Section } from "@/components/Section";

function AnimatedPrize({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1800, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => setDisplay(Math.round(latest)));
    return unsubscribe;
  }, [spring]);

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, motionValue, value]);

  return <span ref={ref}>${display.toLocaleString("en-US")}</span>;
}

const competitions = [
  {
    title: "Costume Competition",
    prize: 1000,
    icon: Crown,
    copy: "Bring the look. Own the room. The ONVIBE Costume Competition is built for custom fits, characters, visual art, bold concepts, and stage presence.",
  },
  {
    title: "Dance Competition",
    prize: 1000,
    icon: Music2,
    copy: "A high-energy live dance battle powered by crowd energy, performance, movement, and special guest judges.",
  },
  {
    title: "GetOnVibe Selfie Competition",
    prize: 500,
    icon: Camera,
    copy: "Capture the best ONVIBE moment of the night. This activation connects the festival experience with the official GetOnVibe platform launch.",
  },
];

export function CompetitionCards() {
  return (
    <Section
      id="competitions"
      eyebrow="Prize competitions"
      title="Compete for Cash, Clout, and Launch-Night Bragging Rights"
      copy="ONVIBE Festival is not just a night out. It is a live, interactive launch event built for creators, performers, trendsetters, and the crowd that brings the energy."
    >
      <div className="glass-panel glow-border mb-6 rounded-lg p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-300">
              Over $2,500 in live prizes
            </p>
            <p className="mt-2 text-lg font-bold leading-8 text-white">
              Competition details, judging rules, and sign-up instructions will be sent first to registered attendees.
            </p>
          </div>
          <NeonButton href="#signup" className="shrink-0">
            Get Competition Updates
          </NeonButton>
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {competitions.map((competition, index) => (
          <motion.article
            key={competition.title}
            className="glass-panel glow-border rounded-lg p-6 sm:p-7"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
          >
            <div className="mb-8 flex items-center justify-between gap-4">
              <competition.icon className="h-10 w-10 text-fuchsia-300" aria-hidden="true" />
              <div className="equalizer h-8 scale-75" aria-hidden="true">
                {Array.from({ length: 7 }).map((_, barIndex) => (
                  <span key={barIndex} />
                ))}
              </div>
            </div>
            <p className="neon-text text-5xl font-black text-white sm:text-6xl">
              <AnimatedPrize value={competition.prize} />
            </p>
            <h3 className="mt-4 text-2xl font-black text-cyan-100">
              {competition.prize === 500 ? "$500 " : "$1,000 "}
              {competition.title}
            </h3>
            <p className="mt-4 leading-7 text-slate-300">{competition.copy}</p>
          </motion.article>
        ))}
      </div>
      <div className="glass-panel glow-border mt-6 rounded-lg border-fuchsia-300/40 p-6 text-center">
        <p className="text-2xl font-black text-white">Special guest judges will be announced.</p>
        <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-300">
          Registered attendees get the first drop on rules, entry windows, judging details, and competition sign-up instructions.
        </p>
      </div>
    </Section>
  );
}
