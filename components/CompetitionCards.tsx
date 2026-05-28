"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Crown, Camera, Music2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
    copy: "Creative builds, character culture, visual art, custom looks, and high-impact stage presence take over the room.",
  },
  {
    title: "Dance Competition",
    prize: 1000,
    icon: Music2,
    copy: "A high-energy live dance battle built around crowd energy, movement, performance, and launch-night momentum.",
  },
  {
    title: "GetOnVibe Selfie Competition",
    prize: 500,
    icon: Camera,
    copy: "An interactive GetOnVibe-powered activation built for event selfies, social discovery, and launch engagement.",
  },
];

export function CompetitionCards() {
  return (
    <Section
      id="competitions"
      eyebrow="Prize competitions"
      title="The room will not just watch. The room will compete."
      copy="Three headline competitions bring creators, performers, and launch-night energy onto the same stage."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {competitions.map((competition, index) => (
          <motion.article
            key={competition.title}
            className="glass-panel glow-border rounded-lg p-6"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
          >
            <competition.icon className="mb-8 h-9 w-9 text-fuchsia-300" aria-hidden="true" />
            <p className="text-5xl font-black text-white">
              <AnimatedPrize value={competition.prize} />
            </p>
            <h3 className="mt-4 text-2xl font-black text-cyan-100">{competition.title}</h3>
            <p className="mt-4 leading-7 text-slate-300">{competition.copy}</p>
          </motion.article>
        ))}
      </div>
      <div className="glass-panel mt-6 rounded-lg border-fuchsia-300/40 p-5 text-center text-xl font-black text-white">
        Special guest judges will be announced.
      </div>
    </Section>
  );
}
