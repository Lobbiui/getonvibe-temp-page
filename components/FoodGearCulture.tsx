import { NeonButton } from "@/components/NeonButton";
import { Section } from "@/components/Section";

const pillars = [
  {
    number: "01",
    title: "Creators",
    items: ["Music", "Video", "Live Streams", "Original Work"],
  },
  {
    number: "02",
    title: "Discovery",
    items: ["Profiles", "Events", "Collaborations", "Around The Web"],
  },
  {
    number: "03",
    title: "Community",
    items: ["Audiences", "Brands", "Venues", "Local Scenes"],
  },
];

export function FoodGearCulture() {
  return (
    <Section
      id="creator-discovery-network"
      eyebrow="The creator discovery network"
      title="Online presence. Real-world connection."
      copy="GetOnVibe connects original creators, the places their work lives, the audiences looking for them, and the opportunities that help them grow."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="glass-panel glow-border rounded-lg p-6">
            <span className="mb-5 block text-sm font-black tracking-[0.18em] text-cyan-300" aria-hidden="true">{pillar.number}</span>
            <h3 className="text-3xl font-black text-white">{pillar.title}</h3>
            <ul className="mt-5 space-y-3">
              {pillar.items.map((item) => (
                <li key={item} className="text-lg font-bold text-slate-300">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="mt-7">
        <NeonButton href="#vendor-forms">Become A Vendor</NeonButton>
      </div>
    </Section>
  );
}
