import { CompetitionCards } from "@/components/CompetitionCards";
import { ComplianceNotice } from "@/components/ComplianceNotice";
import { FAQ } from "@/components/FAQ";
import { FestivalAtmosphere } from "@/components/FestivalAtmosphere";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HotelPartnerships } from "@/components/HotelPartnerships";
import { PlatformLaunch } from "@/components/PlatformLaunch";
import { SignupForms } from "@/components/SignupForms";

export default function Home() {
  return (
    <main className="site-shell">
      <Hero />
      <PlatformLaunch />
      <CompetitionCards />
      <FestivalAtmosphere />
      <HotelPartnerships />
      <ComplianceNotice />
      <SignupForms />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
