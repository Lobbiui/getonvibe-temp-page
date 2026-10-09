"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BrandMark } from "@/components/BrandMark";

export function DualLogoHero() {
  return (
    <motion.div
      className="grid items-center gap-5 sm:grid-cols-2"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="glass-panel glow-border flex min-h-36 items-center justify-center rounded-lg p-5">
        <Image
          src="/logos/OnVibeFestival.png"
          alt="ONVIBE Festival"
          width={520}
          height={260}
          priority
          className="h-auto w-full max-w-[340px] object-contain drop-shadow-[0_0_28px_rgba(217,70,239,0.36)]"
        />
      </div>
      <div className="glass-panel glow-border flex min-h-36 items-center justify-center rounded-lg p-5">
        <div className="flex items-center gap-4 text-white">
          <BrandMark size={84} />
          <span className="text-2xl font-black uppercase tracking-[0.12em] sm:text-3xl">GetOnVibe</span>
        </div>
      </div>
    </motion.div>
  );
}
