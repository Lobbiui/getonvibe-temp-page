import { ArrowUpRight, Building2, UsersRound } from "lucide-react";
import { NeonButton } from "@/components/NeonButton";
import { Section } from "@/components/Section";

const ecosystemLinks = [
  {
    headline: "For Creators",
    subheadline: "Build Your Movement.",
    copy: "Get discovered. Build storefronts. Create subscriptions. Promote exclusive content. Connect directly with businesses.",
    href: "https://creators.getonvibe.com",
    icon: UsersRound,
  },
  {
    headline: "For Businesses",
    subheadline: "Your Business Just Became Discoverable.",
    copy: "Connect with customers. Connect with creators. Promote products. Promote events. Build visibility inside the Food. Gear. Culture. ecosystem.",
    href: "https://business.getonvibe.com",
    icon: Building2,
  },
];

export function EcosystemLinks() {
  return (
    <Section
      id="ecosystem-links"
      eyebrow="GetOnVibe ecosystem"
      title="Learn More About The GetOnVibe Ecosystem"
      copy="Explore how GetOnVibe supports the people and businesses shaping Food. Gear. Culture."
      className="pt-0"
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {ecosystemLinks.map((item) => (
          <article key={item.headline} className="glass-panel glow-border group rounded-lg p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-md border border-cyan-300/30 bg-cyan-300/10 shadow-[0_0_32px_rgba(6,182,212,0.18)]">
                <item.icon className="h-6 w-6 text-cyan-200" aria-hidden="true" />
              </div>
              <ArrowUpRight
                className="h-6 w-6 text-fuchsia-200 transition group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </div>

            <h3 className="text-2xl font-black text-white sm:text-3xl">{item.headline}</h3>
            <p className="neon-text mt-3 text-xl font-black text-white">{item.subheadline}</p>
            <p className="mt-5 leading-7 text-slate-300">{item.copy}</p>
            <div className="gradient-line my-7" />
            <NeonButton href={item.href} target="_blank" rel="noreferrer" variant="secondary">
              Learn More
            </NeonButton>
          </article>
        ))}
      </div>
    </Section>
  );
}
