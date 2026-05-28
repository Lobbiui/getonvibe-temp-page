"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
        <Image
          src="/logos/GetOnVibe.png"
          alt="GetOnVibe"
          width={520}
          height={260}
          priority
          className="h-auto w-full max-w-[340px] object-contain drop-shadow-[0_0_28px_rgba(6,182,212,0.36)]"
        />
      </div>
    </motion.div>
  );
}
