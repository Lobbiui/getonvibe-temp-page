import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PublicSiteHeader } from "@/components/PublicSiteHeader";
import { PlatformPreregistrationForm } from "@/components/PlatformPreregistrationForm";
import { CinematicPageHero } from "@/components/CinematicPageHero";
import { PlatformExperienceShowcase } from "@/components/PlatformExperienceShowcase";

const surfaces = [
  { glyph: "01", title: "Pulse", copy: "Original creator activity and content in a continuous stream." },
  { glyph: "02", title: "Swipe", copy: "A faster, card-based way to discover creators, work, collaborations, and events." },
  { glyph: "03", title: "Momentum", copy: "A later-phase view of what's moving through real GetOnVibe activity." },
  { glyph: "04", title: "Events", copy: "Pop-ups, festivals, community gatherings, launches, and creator appearances." },
  { glyph: "05", title: "Profiles", copy: "A home for original work, official links, events, and the wider presence creators already have online." },
  { glyph: "06", title: "Connections", copy: "Introductions between creators, audiences, brands, organizers, and collaborators." },
];

export default function PlatformPage() {
  return (
    <main className="gateway-page gateway-information-page">
      <PublicSiteHeader />
      <CinematicPageHero
        accent="One living trail."
        description="GetOnVibe brings creators, their work, their events, and their official destinations into one discovery experience without replacing where they already create."
        eyebrow="The GetOnVibe Platform"
        image="/brand/page-heroes/platform.png"
        imageAlt="Creative tools connected across a late-night studio table"
        note="Find Your Vibe. Follow the source. Keep the whole picture in reach."
        title="Everything you follow."
        variant="platform"
      >
          <Link className="gateway-primary-button" href="/creators">I&apos;m a creator <ArrowRight size={18} /></Link>
          <Link className="gateway-secondary-button" href="/businesses">I represent a business</Link>
      </CinematicPageHero>
      <PlatformExperienceShowcase />
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
      <PlatformPreregistrationForm source="platform-page" heading="Choose every way you want to take part." />
    </main>
  );
}
