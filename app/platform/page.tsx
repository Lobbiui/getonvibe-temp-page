import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PublicSiteHeader } from "@/components/PublicSiteHeader";

const surfaces = [
  { glyph: "01", title: "Pulse", copy: "Original creator activity and content in a continuous stream." },
  { glyph: "02", title: "Swipe", copy: "A faster, card-based way to discover creators, work, collaborations, and events." },
  { glyph: "03", title: "Momentum", copy: "What's moving right now, based on real GetOnVibe activity." },
  { glyph: "04", title: "Events", copy: "Pop-ups, festivals, community gatherings, launches, and creator appearances." },
  { glyph: "05", title: "Profiles", copy: "A home for original work, official links, events, and the wider presence creators already have online." },
  { glyph: "06", title: "Connections", copy: "Introductions between creators, audiences, brands, organizers, and collaborators." },
];

export default function PlatformPage() {
  return (
    <main className="gateway-page gateway-information-page">
      <PublicSiteHeader />
      <section className="gateway-info-hero">
        <p className="gateway-kicker">The GetOnVibe Platform</p>
        <h1>Find Your Vibe.</h1>
        <p>GetOnVibe is being built as the discovery and amplification layer for creators and everything they already make across the web.</p>
        <div className="gateway-actions">
          <a className="gateway-primary-button" href="https://creators.getonvibe.com">I&apos;m a creator <ArrowRight size={18} /></a>
          <a className="gateway-secondary-button" href="https://business.getonvibe.com">I represent a business</a>
        </div>
      </section>
      <section className="gateway-info-grid">
        {surfaces.map(({ glyph, title, copy }) => (
          <article key={title}>
            <span className="gateway-info-glyph" aria-hidden="true">{glyph}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </section>
      <section className="gateway-info-callout">
        <p>Built in phases</p>
        <h2>Clear promises. Real readiness gates.</h2>
        <span>Early access begins with interest lists and a small founding preview. Pulse, Swipe, profiles, Around The Web, follows, and events lead the core beta. Momentum and connected Commerce arrive only after their release gates pass.</span>
        <Link href="/events">Experience GetOnVibe through pop-up events <ArrowRight size={18} /></Link>
      </section>
    </main>
  );
}
