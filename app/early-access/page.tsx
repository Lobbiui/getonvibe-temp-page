import type { Metadata } from "next";
import { CinematicPageHero } from "@/components/CinematicPageHero";
import { PlatformPreregistrationForm } from "@/components/PlatformPreregistrationForm";
import { PublicSiteHeader } from "@/components/PublicSiteHeader";

export const metadata: Metadata = {
  title: "Join Early Access | GetOnVibe",
  description: "Join the GetOnVibe early-access interest list as a creator, business, fan, or community member.",
};

export default function EarlyAccessPage() {
  return (
    <main className="gateway-page gateway-information-page gateway-audience-page">
      <PublicSiteHeader />
      <CinematicPageHero
        accent="what comes next."
        description="Join as a creator, business, fan, or any combination. Early access is an interest list while GetOnVibe prepares for phased onboarding."
        eyebrow="GetOnVibe Early Access"
        image="/brand/page-heroes/platform.png"
        imageAlt="Colorful creator workspace illuminated by GetOnVibe light"
        note="This does not create an active platform account."
        title="Find your place in"
        variant="platform"
      >
        <a className="gateway-primary-button" href="#early-access">Join the interest list</a>
      </CinematicPageHero>
      <PlatformPreregistrationForm source="early-access-page" heading="Tell us where you fit into GetOnVibe." />
    </main>
  );
}
