import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PlatformPreregistrationForm } from "@/components/PlatformPreregistrationForm";
import { PublicSiteHeader } from "@/components/PublicSiteHeader";
import { CinematicPageHero } from "@/components/CinematicPageHero";

export const metadata: Metadata = {
  title: "For Businesses | GetOnVibe",
  description: "Help people discover your business, your story, your events, and the creators you work with.",
};

const reasons = [
  ["Be discovered", "Give people a living view of your story, launches, events, collaborations, and official destinations."],
  ["Meet creators", "Create a clearer path to creator relationships, campaign conversations, and event opportunities."],
  ["Amplify activity", "Bring announcements and work from across the web into a presence people can follow."],
  ["Keep commerce connected", "Send visitors to the business commerce website you control when they are ready to shop."],
];

export default function BusinessesPage() {
  return (
    <main className="gateway-page gateway-information-page gateway-audience-page">
      <PublicSiteHeader />
      <CinematicPageHero
        accent="People discover next."
        description="Make your business easier to find, follow, and understand while opening stronger paths to creators, events, local communities, and the official destinations you control."
        eyebrow="For Businesses And Brands"
        image="/brand/page-heroes/businesses.png"
        imageAlt="Independent culture storefront glowing at night after rain"
        note="Be visible for the story, not only the transaction."
        title="Be part of what"
        variant="businesses"
      >
        <a className="gateway-primary-button" href="#early-access">Join the Business Early-Access List <ArrowRight size={18} /></a>
        <Link className="gateway-secondary-button" href="/platform">See the platform</Link>
      </CinematicPageHero>
      <section className="gateway-info-grid gateway-business-reasons">
        {reasons.map(([title, copy], index) => <article key={title}><span className="gateway-info-glyph">{String(index + 1).padStart(2, "0")}</span><h2>{title}</h2><p>{copy}</p></article>)}
      </section>
      <section className="gateway-info-callout"><p>Built for discovery</p><h2>GetOnVibe creates demand. Your connected destinations do the rest.</h2><span>GetOnVibe is not the merchant of record and does not replace your commerce website. Business profiles are intended to make your work visible and send people to the official links you choose.</span><Link href="/contact">Talk with GetOnVibe <ArrowRight size={18} /></Link></section>
      <PlatformPreregistrationForm defaultInterest="BUSINESS" source="business-page" heading="Tell us where your business wants to be discovered." />
    </main>
  );
}
