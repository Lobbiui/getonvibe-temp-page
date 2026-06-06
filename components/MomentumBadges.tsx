import { Building2, Hotel, MailCheck, Store, Utensils } from "lucide-react";

const badges = [
  { label: "Attendee List Open", icon: MailCheck },
  { label: "Brand Vendor Applications Open", icon: Store },
  { label: "Food Vendor Applications Open", icon: Utensils },
  { label: "Hotel Partner Inquiries Open", icon: Hotel },
  { label: "Nashville Launch Momentum Building", icon: Building2 },
];

export function MomentumBadges() {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8" aria-label="Launch status">
      <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {badges.map((badge) => (
          <div key={badge.label} className="glass-panel flex min-h-20 items-center gap-3 rounded-lg p-4">
            <badge.icon className="h-5 w-5 shrink-0 text-fuchsia-300" aria-hidden="true" />
            <p className="text-sm font-black uppercase tracking-[0.12em] text-white">{badge.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
