import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { DiscoveryStage } from "@/components/DiscoveryStage";
import { PublicSiteHeader } from "@/components/PublicSiteHeader";
import { SeamlessHeroMedia } from "@/components/SeamlessHeroMedia";

const pathways = [
  {
    href: "/platform",
    eyebrow: "The Platform",
    title: "See how it comes together.",
    copy: "Learn how GetOnVibe connects creators, businesses, events, and the places their work already lives.",
    action: "Explore the platform",
    glyph: "01",
  },
  {
    href: "https://creators.getonvibe.com",
    eyebrow: "For Creators",
    title: "Put your whole presence in one place.",
    copy: "Give people one profile for your work, links, events, collaborations, and everything you want them to find next.",
    action: "Join the creator list",
    glyph: "02",
  },
  {
    href: "https://business.getonvibe.com",
    eyebrow: "For Businesses",
    title: "Be easier to find and follow.",
    copy: "Show people who you are, what is happening, where to visit, and where to shop through the links you control.",
    action: "Join the business list",
    glyph: "03",
  },
  {
    href: "/events",
    eyebrow: "Pop-Up Events",
    title: "Show up in real life.",
    copy: "Find GetOnVibe and ONVIBE pop-ups, local activations, creator opportunities, and future event dates.",
    action: "View pop-up events",
    glyph: "04",
  },
];

const signalRows = [
  ["New episode", "Live tonight", "Food pop-up", "Creator feature", "Now streaming", "Community win"],
  ["New drop", "Festival update", "Fresh review", "Local opening", "New article", "Event announced"],
  ["Music release", "Behind the scenes", "Vendor wanted", "New menu", "Photo story", "Going live"],
];

export function PublicGateway() {
  return (
    <main className="gateway-page">
      <div className="gateway-color-current" aria-hidden="true">
        <span /><span /><span />
      </div>
      <PublicSiteHeader />

      <section className="gateway-hero">
        <Image
          src="/brand/getonvibe-cinematic-hero.png"
          alt="GetOnVibe neon tropical horizon"
          fill
          priority
          sizes="100vw"
          className="gateway-hero-art"
        />
        <SeamlessHeroMedia />
        <div className="gateway-hero-shade" />
        <div className="gateway-hero-copy">
          <p className="gateway-kicker">The creator discovery network</p>
          <h1><span>Find Your</span><strong>People.</strong></h1>
          <p className="gateway-pillars" aria-label="Discover, follow, amplify">
            <span>Discover.</span><span>Follow.</span><span>Amplify.</span>
          </p>
          <p className="gateway-lede">One place to discover original creators, follow everything they make across the web, and catch what they do next.</p>
          <div className="gateway-actions">
            <a className="gateway-primary-button" href="#pathways">Join the early-access list <ArrowRight size={19} /></a>
            <Link className="gateway-secondary-button" href="/platform">See how it works</Link>
          </div>
          <p className="gateway-status">GetOnVibe is opening in phases. Join the early-access list to help shape a better home for creator discovery.</p>
        </div>
      </section>

      <section className="gateway-signal-story" aria-labelledby="signal-story-title">
        <div className="gateway-signal-copy">
          <p>One place to catch up</p>
          <h2 id="signal-story-title">Creators live everywhere. Discovery should not be this hard.</h2>
          <span>A stream on Twitch. A release on Spotify. A story on Instagram. A video on YouTube. A new site, event, or collaboration somewhere else. GetOnVibe turns that scattered presence into one living trail.</span>
          <strong>Follow the creator. See the whole world. Go to the source.</strong>
          <Link href="/platform">See how discovery works <ArrowRight size={18} /></Link>
        </div>
        <div className="gateway-signal-stage" aria-label="Examples of activity GetOnVibe can help people discover">
          <div className="gateway-signal-mark">
            <BrandMark size={112} />
            <span>Discover what&apos;s next</span>
          </div>
          <div className="gateway-signal-tracks" aria-hidden="true">
            {signalRows.map((row, rowIndex) => (
              <div className={`gateway-signal-track gateway-signal-track-${rowIndex + 1}`} key={row.join("-")}>
                {[...row, ...row].map((signal, index) => <span key={`${signal}-${index}`}>{signal}</span>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gateway-product-preview" aria-labelledby="product-preview-title">
        <div className="gateway-product-heading">
          <p>Why creators need it</p>
          <h2 id="product-preview-title">Not another<br />link page.</h2>
          <span>A social aggregator should do more than hold buttons. GetOnVibe helps people discover the creator behind the links, understand the full body of work, and know where to go next.</span>
        </div>
        <DiscoveryStage />
      </section>

      <section id="pathways" className="gateway-pathways" aria-labelledby="pathways-title">
        <div className="gateway-section-heading">
          <p>Choose your path</p>
          <h2 id="pathways-title">Start with what<br />you came to find.</h2>
          <span>Learn about the platform, join as a creator or business, or see where the community is showing up next.</span>
        </div>
        <div className="gateway-path-grid">
          {pathways.map(({ href, eyebrow, title, copy, action, glyph }, index) => (
            <a className="gateway-path-card" href={href} key={title}>
              <span className="gateway-path-number">0{index + 1}</span>
              <div className="gateway-path-identity"><i aria-hidden="true"><span>{glyph}</span></i><p>{eyebrow}</p></div>
              <div className="gateway-path-copy"><h3>{title}</h3><span>{copy}</span></div>
              <strong>{action} <ArrowRight size={17} /></strong>
            </a>
          ))}
        </div>
      </section>

      <section className="gateway-promise">
        <p>Why GetOnVibe</p>
        <h2><span>Create there.</span><strong>Get discovered here.</strong><span>Keep your home.</span><em>Amplify your reach.</em></h2>
        <div><p>We are not trying to replace where creators stream, post, sell, write, or perform. We are building the discovery layer that helps more people find that work and the partnership layer that helps it go farther.</p><Link href="/platform">See the platform <ArrowRight size={17} /></Link></div>
      </section>

      <section className="gateway-originality" aria-labelledby="originality-title">
        <div>
          <p>What We Stand For</p>
          <h2 id="originality-title">Made by people.<br />Built for discovery.<br /><strong>Kept in your hands.</strong></h2>
        </div>
        <div>
          <p>GetOnVibe is being built around real creators, businesses, places, and communities. The work stays yours. The audience relationship stays yours. We simply make the trail easier to follow.</p>
          <p>Our visual world can move, glow, and experiment. What it will not do is manufacture a community that is not there. People, places, reviews, events, and creative work should come from real sources with permission.</p>
          <a href="https://creators.getonvibe.com">Founding creators: show us what you make <ArrowRight size={18} /></a>
        </div>
      </section>

      <section className="gateway-contact-strip">
        <BrandMark className="gateway-contact-signal" size={42} />
        <div>
          <p>Partnerships, press, sponsorships, or event hosting</p>
          <h2>Have something real to bring to the community?</h2>
        </div>
        <Link href="/contact">Contact GetOnVibe <ArrowRight size={18} /></Link>
      </section>

      <footer className="gateway-footer">
        <span>GetOnVibe</span>
        <p>Find Your Vibe.</p>
        <small>Copyright {new Date().getFullYear()} GetOnVibe.</small>
      </footer>
    </main>
  );
}
