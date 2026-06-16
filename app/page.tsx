import { CompetitionCards } from "@/components/CompetitionCards";
import { CompetitionOptional } from "@/components/CompetitionOptional";
import { ComplianceNotice } from "@/components/ComplianceNotice";
import { CountdownTimer } from "@/components/CountdownTimer";
import { DJLineupTeaser } from "@/components/DJLineupTeaser";
import { EcosystemLinks } from "@/components/EcosystemLinks";
import { FAQ } from "@/components/FAQ";
import { FestivalAtmosphere } from "@/components/FestivalAtmosphere";
import { FinalCTA } from "@/components/FinalCTA";
import { FoodGearCulture } from "@/components/FoodGearCulture";
import { Footer } from "@/components/Footer";
import { HaveYouVibed } from "@/components/HaveYouVibed";
import { Hero } from "@/components/Hero";
import { HotelPartnerships } from "@/components/HotelPartnerships";
import { HotelPartnersTeaser } from "@/components/HotelPartnersTeaser";
import { MomentumBadges } from "@/components/MomentumBadges";
import { OnVibeExperienceFlow } from "@/components/OnVibeExperienceFlow";
import { PlatformLaunch } from "@/components/PlatformLaunch";
import { SignupForms } from "@/components/SignupForms";
import { WhatToExpect } from "@/components/WhatToExpect";
import { WhatIsGetOnVibe } from "@/components/WhatIsGetOnVibe";

export default function Home() {
  return (
    <main className="site-shell">
      <Hero />
      <CountdownTimer />
      <MomentumBadges />
      <CompetitionOptional />
      <WhatIsGetOnVibe />
      <EcosystemLinks />
      <FoodGearCulture />
      <OnVibeExperienceFlow />
      <WhatToExpect />
      <PlatformLaunch />
      <CompetitionCards />
      <DJLineupTeaser />
      <FestivalAtmosphere />
      <HotelPartnersTeaser />
      <HotelPartnerships />
      <ComplianceNotice />
      <SignupForms />
      <FAQ />
      <HaveYouVibed />
      <FinalCTA />
      <Footer />
    </main>
  );
}
