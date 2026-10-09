import Link from "next/link";
import { ArrowRight } from "lucide-react";

const opportunityPaths = [
  {
    number: "01",
    title: "GetOnVibe assignments",
    copy: "Selected creators may receive paid briefs for GetOnVibe launches, campaigns, and events.",
  },
  {
    number: "02",
    title: "Coordinated brand campaigns",
    copy: "Campaign briefs will identify who commissions the work, who pays, and how the content may be used.",
  },
  {
    number: "03",
    title: "Direct brand connections",
    copy: "Make your work easier to discover and open conversations you can evaluate and negotiate independently.",
  },
];

export function CreatorOpportunitySection() {
  return (
    <section className="gateway-opportunities" aria-labelledby="creator-opportunities-title">
      <div className="gateway-opportunity-current" aria-hidden="true"><i /><i /><i /></div>
      <div className="gateway-opportunity-heading">
        <p>Planned opportunities <span>Launching in phases</span></p>
        <h2 id="creator-opportunities-title">Your creativity.<br /><strong>More possibilities.</strong></h2>
        <span>We&apos;re building GetOnVibe to help original creators get discovered, connect with brands, and explore paid creative opportunities. These may include selected GetOnVibe campaigns, brand collaborations, event work, and future creator memberships.</span>
        <Link href="/creators#early-access">Join the Creator Early-Access List <ArrowRight size={18} /></Link>
      </div>
      <div className="gateway-opportunity-paths">
        {opportunityPaths.map((path) => (
          <article key={path.number}>
            <span>{path.number}</span>
            <h3>{path.title}</h3>
            <p>{path.copy}</p>
          </article>
        ))}
        <Link href="/creators">See how creator opportunities are planned <ArrowRight size={17} /></Link>
      </div>
    </section>
  );
}
