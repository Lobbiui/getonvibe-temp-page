import Image from "next/image";
import { EventCinematic } from "@/components/EventCinematic";
import { NeonButton } from "@/components/NeonButton";
import { Section } from "@/components/Section";
import { SignupForms } from "@/components/SignupForms";

const eventFacts = ["September 12", "Saturday", "12PM to 4PM", "Smokeville"];

const upcomingEvents = [
  {
    date: "September 12",
    title: "ONVIBE Bikini Carwash",
    location: "Smokeville, Hendersonville, TN",
    time: "12PM to 4PM",
    detail: "Food trucks, music, vendors, models, and a free bikini carwash from 1PM to 4PM.",
    image: "/events/flyer1.jpeg",
  },
  {
    date: "Coming Soon",
    title: "Next ONVIBE Event Drop",
    location: "Location TBA",
    time: "Details first to the list",
    detail: "New food, brand, model, and entertainment activations are being announced soon.",
    image: "/events/flyer2.jpeg",
  },
];

const signupLanes = [
  ["Attend", "Get updates", "#signup"],
  ["Models", "Apply now", "#models"],
  ["Food Vendors", "Request a spot", "#food-vendors"],
  ["Brands", "Work with us", "#brands"],
];

export default function Home() {
  return (
    <main className="site-shell event-hub">
      <header className="event-page-header px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="event-topbar sticky top-3 z-40 mb-5">
            <a href="#top" className="event-wordmark">
              ONVIBE Events
            </a>
            <div className="event-nav">
              <a href="#shows">Shows</a>
              <a href="#signup">Sign Up</a>
              <a href="https://creators.getonvibe.com">Creators</a>
              <a href="https://business.getonvibe.com">Businesses</a>
            </div>
          </nav>
        </div>
      </header>

      <section id="top" className="event-hero-stage px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="event-hero-media">
            <EventCinematic />
            <div className="event-hero-cta">
              <NeonButton href="#signup">Get Event Updates</NeonButton>
            </div>
          </div>

          <div className="event-fact-bar">
            {eventFacts.map((fact) => (
              <span key={fact}>{fact}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="shows" className="event-shows px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="event-simple-heading">
            <p>Upcoming Shows</p>
            <h2>What is happening next</h2>
          </div>

          <div className="event-show-list">
            {upcomingEvents.map((event) => (
              <article key={event.title} className="event-show-row">
                <div className="event-show-date">{event.date}</div>
                <div className="event-show-main">
                  <h3>{event.title}</h3>
                  <p>{event.location}</p>
                  <p>{event.time}</p>
                  <p className="event-show-detail">{event.detail}</p>
                  <div className="event-show-actions">
                    <a href="#signup">Get Updates</a>
                    <a href="#brands">Vendor Inquiry</a>
                  </div>
                </div>
                <Image src={event.image} alt={`${event.title} flyer`} width={420} height={540} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="event-signup-lanes px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="event-lane-list">
            {signupLanes.map(([title, action, href]) => (
              <a key={title} href={href} className="event-lane-row">
                <span className="event-lane-title">{title}</span>
                <span className="event-lane-action">{action}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Section eyebrow="Flyers" title="Save the date." copy="September 12 at Smokeville in Hendersonville, TN.">
        <div className="event-flyer-wall">
          <Image src="/events/flyer1.jpeg" alt="Bikini Carwash event flyer" width={900} height={1160} />
          <Image src="/events/flyer2.jpeg" alt="ONVIBE Events Bikini Carwash flyer" width={900} height={1160} />
        </div>
      </Section>

      <SignupForms />

      <Section className="pb-10" eyebrow="Stay Connected" title="Get the next ONVIBE drop.">
        <div className="event-final-callout">
          <p>Join the list for event updates, vendor openings, model calls, and upcoming ONVIBE events.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <NeonButton href="#signup">Get Event Updates</NeonButton>
            <NeonButton href="#brands" variant="secondary">Work With ONVIBE</NeonButton>
          </div>
        </div>
      </Section>

      <footer className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 border-t border-white/10 pt-8 text-sm text-slate-300 md:grid-cols-2">
          <div>
            <p className="text-lg font-black text-white">ONVIBE Events</p>
            <p className="mt-2">Powered by GetOnVibe</p>
            <p>Food. Gear. Culture. Live.</p>
          </div>
          <div className="md:text-right">
            <p>Age, entry, and participation requirements may vary by event. Valid ID may be required.</p>
            <p className="mt-2">Brand partners are responsible for all applicable legal and compliance requirements.</p>
            <p className="mt-4">Copyright {new Date().getFullYear()} GetOnVibe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
