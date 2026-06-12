import { NeonButton } from "@/components/NeonButton";
import { Section } from "@/components/Section";

export function HaveYouVibed() {
  return (
    <Section className="py-14">
      <div className="glass-panel glow-border rounded-lg p-8 text-center sm:p-12">
        <h2 className="neon-text text-5xl font-black leading-none text-white sm:text-7xl">
          HAVE YOU VIBED?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg font-bold leading-8 text-slate-200">
          Join thousands preparing for ONVIBE Festival and the launch of GetOnVibe.
        </p>
        <div className="my-7 flex flex-col justify-center gap-2 text-2xl font-black text-cyan-100 sm:flex-row sm:gap-5">
          <span>Food.</span>
          <span>Gear.</span>
          <span>Culture.</span>
        </div>
        <p className="mb-8 text-3xl font-black text-white">Find Your Vibe.</p>
        <NeonButton href="#signup">Join The Waitlist</NeonButton>
      </div>
    </Section>
  );
}
