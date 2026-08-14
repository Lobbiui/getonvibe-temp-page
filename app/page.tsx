import Image from "next/image";
import { EventCinematic } from "@/components/EventCinematic";
import { NeonButton } from "@/components/NeonButton";
import { Section } from "@/components/Section";
import { SignupForms } from "@/components/SignupForms";

const eventDetails = [
  ["Date", "September 12"],
  ["Time", "12PM to 4PM"],
  ["Carwash", "1PM to 4PM"],
  ["Place", "Smokeville, Hendersonville"],
];

const highlights = ["Food Trucks", "Music", "Free Bikini Carwash", "Models", "Vendors", "Photos"];

const signupLanes = [
  ["Attend", "Get event updates.", "#signup"],
  ["Models", "Apply for activations.", "#models"],
  ["Food Vendors", "Bring the food.", "#food-vendors"],
  ["Brands", "Activate with the crowd.", "#brands"],
];

export default function Home() {
  return (
    <main className="site-shell event-hub">
      <header className="event-hero relative overflow-hidden px-4 pb-14 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="event-topbar sticky top-3 z-40 mb-8">
            <a href="#top" className="event-wordmark">
              ONVIBE Events
            </a>
            <div className="event-nav">
              <a href="#featured-event">Event</a>
              <a href="#signup">Sign Up</a>
              <a href="https://creators.getonvibe.com">Creators</a>
              <a href="https://business.getonvibe.com">Businesses</a>
            </div>
          </nav>

          <section id="top" className="event-landing">
            <div className="event-landing-copy">
              <p className="event-eyebrow">ONVIBE Events Presents</p>
              <h1>Bikini Carwash</h1>
              <p className="event-lede">
                Food trucks, music, models, vendors, and a free carwash at Smokeville.
              </p>
              <div className="event-ticket-strip" aria-label="Featured event details">
                {eventDetails.map(([label, detail]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <strong>{detail}</strong>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <NeonButton href="#signup">Get Event Updates</NeonButton>
                <NeonButton href="#models" variant="secondary">Apply To Model</NeonButton>
                <NeonButton href="#brands" variant="secondary">Vendor Inquiry</NeonButton>
              </div>
            </div>

            <div className="event-feature-frame" aria-label="ONVIBE Bikini Carwash featured flyers">
              <Image
                src="/events/flyer1.jpeg"
                alt="ONVIBE Events Bikini Carwash flyer"
                width={900}
                height={1160}
                priority
                className="event-feature-poster"
              />
              <Image
                src="/events/flyer2.jpeg"
                alt="ONVIBE Events Bikini Carwash alternate flyer"
                width={900}
                height={1160}
                priority
                className="event-feature-poster event-feature-poster-back"
              />
            </div>
          </section>
        </div>
      </header>

      <section id="featured-event" className="event-showcase px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="event-section-heading">
            <p>Featured Event</p>
            <h2>September 12 at Smokeville</h2>
          </div>
          <div className="event-showcase-grid">
            <EventCinematic />
            <div className="event-show-copy">
              <p className="event-eyebrow">Saturday, 12PM to 4PM</p>
              <h3>Pull Up. Eat. Meet. Vibe.</h3>
              <p>
                A daytime ONVIBE event with food trucks, music, vendors, photos, models, and a free
                bikini carwash from 1PM to 4PM.
              </p>
              <div className="event-stamp-row">
                {highlights.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Get Involved"
        title="Pick your lane."
        copy="Come through as a guest, apply to model, bring food, or set up as a brand."
      >
        <div className="event-lane-list">
          {signupLanes.map(([title, copy, href], index) => (
            <a key={title} href={href} className="event-lane-row">
              <span className="event-lane-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="event-lane-title">{title}</span>
              <span className="event-lane-copy">{copy}</span>
              <span className="event-lane-action">Sign up</span>
            </a>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Flyers"
        title="Save the date."
        copy="September 12. Smokeville. Hendersonville, TN."
      >
        <div className="event-flyer-wall">
          <Image src="/events/flyer1.jpeg" alt="Bikini Carwash event flyer" width={900} height={1160} />
          <Image src="/events/flyer2.jpeg" alt="ONVIBE Events Bikini Carwash flyer" width={900} height={1160} />
        </div>
      </Section>

      <SignupForms />

      <Section className="pb-10" eyebrow="Stay Connected" title="Want the next ONVIBE drop?">
        <div className="event-final-callout">
          <p>Join the list for event updates, vendor openings, model calls, and upcoming ONVIBE events.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
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
