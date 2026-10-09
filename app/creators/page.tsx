import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PlatformPreregistrationForm } from "@/components/PlatformPreregistrationForm";
import { PublicSiteHeader } from "@/components/PublicSiteHeader";
import { CinematicPageHero } from "@/components/CinematicPageHero";

export const metadata: Metadata = {
  title: "For Creators | GetOnVibe",
  description: "Bring your creative presence together, grow your audience, and hear about future GetOnVibe opportunities.",
};

const steps = [
  "Join the creator interest list.",
  "Receive an invitation when onboarding opens.",
  "Create your GetOnVibe profile and connect your official destinations.",
  "Express interest in opportunities that fit your work.",
  "If selected, review the brief, compensation, deadlines, deliverables, and usage terms.",
  "Agree to the terms, complete the assignment, and receive payment under the agreed assignment terms.",
];

export default function CreatorsPage() {
  return (
    <main className="gateway-page gateway-information-page gateway-audience-page">
      <PublicSiteHeader />
      <CinematicPageHero
        accent="Let people find all of it."
        description="Build an audience, connect with brands, and explore future creative opportunities without replacing the places where you already stream, publish, perform, or sell."
        eyebrow="For Original Creators"
        image="/brand/page-heroes/creators.png"
        imageAlt="Hands working across music, photography, and printmaking tools in a creator studio"
        note="Your work stays yours. GetOnVibe makes the trail easier to follow."
        title="Your work lives everywhere."
        variant="creators"
      >
          <a className="gateway-primary-button" href="#early-access">Join the Creator Early-Access List <ArrowRight size={18} /></a>
          <Link className="gateway-secondary-button" href="/platform">Explore the platform</Link>
      </CinematicPageHero>

      <section className="gateway-opportunity-detail" aria-labelledby="creator-opportunities-title">
        <div className="gateway-section-heading">
          <p>Planned opportunities / Launching in phases</p>
          <h2 id="creator-opportunities-title">Your creativity.<br />More possibilities.</h2>
          <span>Joining the list expresses interest. It does not create an account, guarantee selection, or promise paid work.</span>
        </div>
        <div className="gateway-opportunity-detail-grid">
          <article><span>01</span><h3>GetOnVibe promotional assignments</h3><p>We plan to commission selected creators to make original content promoting GetOnVibe, our launch, and selected events. Each assignment will have a clear brief, agreed compensation, deliverables, and usage rights.</p><strong>This is paid creative work when an assignment is commissioned. Preregistration expresses interest; selection happens separately.</strong></article>
          <article><span>02</span><h3>Brand campaigns coordinated by GetOnVibe</h3><p>We plan to help connect creators with paid brand campaigns and coordinate the process—from campaign briefs and creator selection to deliverables and agreed usage rights. Opportunities will depend on campaign availability and fit.</p><strong>Each brief must identify the commissioning party, payment responsibility, compensation, deadlines, and intended content use.</strong></article>
          <article><span>03</span><h3>Independent brand relationships</h3><p>GetOnVibe is being built to make your work easier for businesses and brands to discover, creating a path to direct conversations and independently agreed collaborations.</p><strong>These relationships are separate from assignments commissioned or managed by GetOnVibe.</strong></article>
          <article><span>04</span><h3>Events and activations</h3><p>Selected events and activations may create opportunities for paid content creation, appearances, co-promotion, and participation. Available opportunities and compensation will be stated in each brief.</p></article>
        </div>
      </section>

      <section className="gateway-creator-destinations">
        <div><p>Keep what already works</p><h2>Your destinations stay yours.</h2></div>
        <div><p>Your GetOnVibe profile is intended to bring together the places your audience can support you - including your official store, memberships, streams, releases, and other approved links.</p><p>Future creator memberships and exclusive paid content are planned through our separate, connected Commerce Platform. The intended starting model is a shared storefront template with controlled customization.</p><strong>Checkout, paid-content access, creator earnings, and payouts are a later phase within the separate Commerce plan.</strong></div>
      </section>

      <section className="gateway-process" aria-labelledby="creator-process-title">
        <div className="gateway-section-heading"><p>How participation is intended to work</p><h2 id="creator-process-title">Interest first.<br />Clear terms before work.</h2></div>
        <ol>{steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol>
      </section>

      <PlatformPreregistrationForm defaultInterest="CREATOR" source="creator-page" heading="Tell us how you want to create, connect, and grow." />
    </main>
  );
}
