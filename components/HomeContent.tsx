"use client";

import Image from "next/image";
import { EventCinematic } from "@/components/EventCinematic";
import { LanguageSelector, useLanguage } from "@/components/LanguageProvider";
import { NeonButton } from "@/components/NeonButton";
import { SignupForms } from "@/components/SignupForms";

const tourStops = [
  {
    statusKey: "stop.next",
    cityKey: "current.city",
    venueKey: "current.venue",
    addressKey: "current.address",
    dateKey: "current.date",
    timeKey: "current.time",
  },
  {
    statusKey: "stop.expanding",
    cityKey: "stop.moreTennessee",
    venueKey: "stop.comingSoon",
    addressKey: "stop.tennessee",
    dateKey: "stop.tba",
    timeKey: "stop.getUpdates",
  },
];

const featureLinks = [
  ["feature.attend", "feature.attendCopy", "#signup"],
  ["feature.models", "feature.modelsCopy", "#models"],
  ["feature.food", "feature.foodCopy", "#food-vendors"],
  ["feature.brands", "feature.brandsCopy", "#brands"],
  ["feature.stores", "feature.storesCopy", "#stores"],
  ["feature.creators", "feature.creatorsCopy", "#creators"],
  ["feature.dashboard", "feature.dashboardCopy", "/login"],
];

const gallery = [
  ["/event-assets/carwishintrofree.png", "gallery.free.title", "gallery.free.copy"],
  ["/event-assets/pullupgetwashed.png", "gallery.pull.title", "gallery.pull.copy"],
  ["/event-assets/onvibefood.png", "gallery.food.title", "gallery.food.copy"],
  ["/event-assets/onvibeevents.png", "gallery.music.title", "gallery.music.copy"],
  ["/event-assets/Checkusout.png", "gallery.check.title", "gallery.check.copy"],
  ["/event-assets/tourdates.png", "gallery.tour.title", "gallery.tour.copy"],
];

const tickerItems = [
  "ticker.freeCarWash",
  "ticker.foodTrucks",
  "ticker.music",
  "ticker.brands",
  "ticker.goodVibes",
  "ticker.communityTour",
];

export function HomeContent() {
  const { t, language } = useLanguage();

  return (
    <main className="event-portal" id="top" lang={language} dir={language === "ar" ? "rtl" : "ltr"}>
      <header className="portal-header">
        <a href="#top" className="portal-logo">ONVIBE Events</a>
        <nav aria-label="Main navigation">
          <a href="#tour-dates">{t("nav.tourDates")}</a>
          <a href="#experience">{t("nav.experience")}</a>
          <a href="#signup">{t("nav.signup")}</a>
          <a href="/login">{t("nav.login")}</a>
        </nav>
        <LanguageSelector />
      </header>

      <section className="portal-hero">
        <EventCinematic />
      </section>

      <section className="portal-now-playing" aria-label="Current event details">
        <Image src="/event-assets/flyer1.jpeg" alt={t("current.alt")} width={1080} height={1350} />
        <div>
          <span>{t("current.nextStop")}</span>
          <h2>{t("current.city")}</h2>
          <p>{t("current.venue")}</p>
          <p>{t("current.address")}</p>
        </div>
        <div>
          <strong>{t("current.date")}</strong>
          <span>{t("current.time")}</span>
          <NeonButton href="#signup">{t("current.cta")}</NeonButton>
        </div>
      </section>

      <section className="portal-ticker" aria-label="Tour highlights">
        {tickerItems.map((item) => (
          <span key={item}>{t(item)}</span>
        ))}
      </section>

      <section id="tour-dates" className="portal-section portal-main-grid">
        <div className="portal-main-column">
          <div className="portal-section-title">
            <p>{t("tour.eyebrow")}</p>
            <h2>{t("tour.title")}</h2>
          </div>

          <article className="portal-feature-event">
            <Image src="/event-assets/flyer1.jpeg" alt="Official next event flyer" width={1080} height={1350} />
            <div>
              <span>{t("tour.featured")}</span>
              <h3>{t("tour.featureTitle")}</h3>
              <p>{t("tour.featureCopy")}</p>
              <p>{t("tour.featureAddress")}</p>
              <NeonButton href="#signup">{t("tour.featureCta")}</NeonButton>
            </div>
          </article>

          <div className="portal-stop-list">
            {tourStops.map((stop) => (
              <article key={stop.cityKey}>
                <span>{t(stop.statusKey)}</span>
                <h3>{t(stop.cityKey)}</h3>
                <p>{t(stop.venueKey)}</p>
                <small>{t(stop.addressKey)}</small>
                <p>{t(stop.dateKey)}</p>
                <p>{t(stop.timeKey)}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="portal-sidebar" aria-label="Event quick actions">
          <div className="portal-countdown-card">
            <p>{t("tour.sidebarTitle")}</p>
            <strong>{t("tour.sidebarDate")}</strong>
            <span>{t("tour.sidebarCity")}</span>
            <NeonButton href="#tour-dates">{t("tour.sidebarCta")}</NeonButton>
          </div>

          <div className="portal-mini-art">
            <Image src="/event-assets/onvibeeventstour.png" alt="ONVIBE Events Tour" width={1800} height={900} />
          </div>

          <div className="portal-action-list">
            {featureLinks.map(([title, copy, href]) => (
              <a href={href} key={title}>
                <strong>{t(title)}</strong>
                <span>{t(copy)}</span>
              </a>
            ))}
          </div>
        </aside>
      </section>

      <section id="experience" className="portal-section">
        <div className="portal-section-title centered">
          <p>{t("experience.eyebrow")}</p>
          <h2>{t("experience.title")}</h2>
        </div>
        <div className="portal-gallery">
          {gallery.map(([image, title, copy]) => (
            <article key={title}>
              <Image src={image} alt={t(title)} width={1536} height={1024} />
              <div>
                <h3>{t(title)}</h3>
                <p>{t(copy)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portal-section portal-split-promo">
        <Image src="/event-assets/pullupgetwashed.png" alt="Pull up get washed have a good time" width={1536} height={1024} />
        <div>
          <p>{t("stores.eyebrow")}</p>
          <h2>{t("stores.title")}</h2>
          <span>{t("stores.copy")}</span>
          <NeonButton href="#stores">{t("stores.cta")}</NeonButton>
        </div>
      </section>

      <section className="portal-section portal-creator-callout">
        <Image src="/event-assets/creators.png" alt="Creators" width={1800} height={760} />
        <div>
          <p>{t("creators.eyebrow")}</p>
          <h2>{t("creators.title")}</h2>
          <span>{t("creators.copy")}</span>
          <NeonButton href="#creators">{t("creators.cta")}</NeonButton>
        </div>
      </section>

      <SignupForms />

      <section className="portal-final">
        <Image src="/event-assets/onvibeevents.png" alt="ONVIBE Events music and carwash artwork" width={1536} height={1024} />
        <div>
          <p>{t("final.eyebrow")}</p>
          <h2>{t("final.title")}</h2>
          <NeonButton href="#signup">{t("final.cta")}</NeonButton>
        </div>
      </section>

      <footer className="portal-footer">
        <strong>ONVIBE Events</strong>
        <span>{t("footer.powered")}</span>
        <p>Copyright {new Date().getFullYear()} GetOnVibe. {t("footer.copy")}</p>
      </footer>
    </main>
  );
}
