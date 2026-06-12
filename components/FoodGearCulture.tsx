import { Shirt, Sparkles, Utensils } from "lucide-react";
import { NeonButton } from "@/components/NeonButton";
import { Section } from "@/components/Section";

const pillars = [
  {
    title: "Food",
    icon: Utensils,
    items: ["Restaurants", "Food Trucks", "Festival Vendors"],
  },
  {
    title: "Gear",
    icon: Shirt,
    items: ["Alternative Products", "Apparel", "Accessories", "Festival Essentials"],
  },
  {
    title: "Culture",
    icon: Sparkles,
    items: ["Creators", "Music", "Events", "Community"],
  },
];

export function FoodGearCulture() {
  return (
    <Section
      id="food-gear-culture"
      eyebrow="Lifestyle ecosystem"
      title="Food. Gear. Culture."
      copy="GetOnVibe expands beyond a single category into a broader lifestyle ecosystem for discovery, local visibility, creators, and real-world event energy."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="glass-panel glow-border rounded-lg p-6">
            <pillar.icon className="mb-5 h-8 w-8 text-fuchsia-300" aria-hidden="true" />
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
