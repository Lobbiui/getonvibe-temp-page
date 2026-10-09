import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PlatformPreregistrationForm } from "@/components/PlatformPreregistrationForm";
import { PublicSiteHeader } from "@/components/PublicSiteHeader";
import { CinematicPageHero } from "@/components/CinematicPageHero";
import { BusinessCoreValue, InformationFAQ } from "@/components/PlatformClaritySections";

export const metadata: Metadata = {
  title: "For Businesses | GetOnVibe",
  description: "Help people discover your business, find the right creators, and build campaigns that travel across connected audiences.",
};

const reasons = [
  ["Be discovered", "Bring your story, launches, events, collaborations, and official destinations into one presence that is easier to find and follow."],
  ["Meet creators", "Create a clearer path to creator relationships, campaign conversations, and event opportunities."],
  ["Amplify activity", "Connect work from across the web so people can discover the full picture and continue to your official channels."],
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
      <BusinessCoreValue />
      <section className="gateway-info-grid gateway-business-reasons">
        {reasons.map(([title, copy], index) => <article key={title}><span className="gateway-info-glyph">{String(index + 1).padStart(2, "0")}</span><h2>{title}</h2><p>{copy}</p></article>)}
      </section>
      <section className="gateway-opportunity-detail gateway-business-intelligence" aria-labelledby="business-campaigns-title">
        <div className="gateway-section-heading">
          <p>Creator intelligence and campaign support / Launching in phases</p>
          <h2 id="business-campaigns-title">Know the fit.<br />Build the reach.</h2>
          <span>Businesses receive the same connected discovery advantage as creators. GetOnVibe is also being built to help brands move from visibility to informed creator partnerships, with practical support from creator selection through campaign delivery.</span>
        </div>
        <div className="gateway-opportunity-detail-grid">
          <article><span>01</span><h3>Creator reports</h3><p>Planned GetOnVibe creator reports will bring together relevant platform engagement and connected creator information so businesses can understand performance, audience response, and campaign potential.</p><strong>Recommendations will focus on creator fit, not follower count alone.</strong></article>
          <article><span>02</span><h3>Creator fit guidance</h3><p>We plan to help businesses identify creators whose work, audience, values, location, and style align with the brand and the goals of a specific campaign.</p><strong>Businesses make the final partnership decision. GetOnVibe provides context and a clearer path to the conversation.</strong></article>
          <article><span>03</span><h3>Campaign creation and placement</h3><p>GetOnVibe plans to offer hands-on help shaping campaign ideas, creator briefs, original content, and selected advertising placements across the platform.</p><strong>Scope, compensation, deliverables, placement, and content rights will be agreed before commissioned work begins.</strong></article>
          <article><span>04</span><h3>Reach beyond one platform</h3><p>A GetOnVibe creator profile is intended to show a creator&apos;s complete social resume, including their work, official channels, events, and connected destinations.</p><strong>That gives brands a path to discovery inside GetOnVibe and to the broader audiences creators have built elsewhere.</strong></article>
        </div>
      </section>
      <section className="gateway-info-callout"><p>Built for discovery</p><h2>GetOnVibe creates demand. Your connected destinations do the rest.</h2><span>GetOnVibe is not the merchant of record and does not replace your commerce website. Business profiles are intended to make your work visible and send people to the official links you choose.</span><Link href="/contact">Talk with GetOnVibe <ArrowRight size={18} /></Link></section>
      <InformationFAQ audience="business" />
      <PlatformPreregistrationForm defaultInterest="BUSINESS" source="business-page" heading="Tell us where your business wants to be discovered." />
    </main>
  );
}
