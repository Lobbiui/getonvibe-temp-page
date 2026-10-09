import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AmbientMotionControl } from "@/components/AmbientMotionControl";
import { BrandMark } from "@/components/BrandMark";
import { SeamlessHeroMedia } from "@/components/SeamlessHeroMedia";

const destinations = [
  { href: "/platform", label: "The Platform" },
  { href: "/creators", label: "For Creators" },
  { href: "/businesses", label: "For Businesses" },
  { href: "/events", label: "Pop-Up Events" },
  { href: "/early-access", label: "Join Early Access" },
  { href: "/contact", label: "Contact" },
];

export function PublicGateway() {
  return (
    <main className="gateway-page gateway-portal-page">
      <section className="gateway-portal" aria-labelledby="gateway-portal-title">
        <Image
          src="/brand/getonvibe-cinematic-hero.png"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="gateway-portal-art"
        />
        <SeamlessHeroMedia />
        <div className="gateway-portal-shade" aria-hidden="true" />
        <div className="gateway-portal-orbits" aria-hidden="true"><i /><i /><i /></div>
        <AmbientMotionControl />

        <div className="gateway-portal-identity">
          <div className="gateway-portal-mark"><BrandMark size={160} /></div>
          <p className="gateway-portal-wordmark">GetOnVibe</p>
          <p className="gateway-portal-purpose">The creator discovery network</p>
          <h1 id="gateway-portal-title">Discover creators.<br />Follow their whole world.</h1>
          <p className="gateway-portal-launch"><span>Platform launch begins</span><strong>December 1, 2026</strong></p>
        </div>

        <nav className="gateway-portal-navigation" aria-label="Choose your GetOnVibe destination">
          <p><span aria-hidden="true" />Find Your Vibe<span aria-hidden="true" /></p>
          <div>
            {destinations.map((destination) => (
              <Link href={destination.href} key={destination.href}>
                <strong>{destination.label}</strong>
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
            ))}
          </div>
        </nav>
      </section>
    </main>
  );
}
