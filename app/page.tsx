import Image from "next/image";
import { EventCinematic } from "@/components/EventCinematic";
import { NeonButton } from "@/components/NeonButton";
import { Section } from "@/components/Section";
import { SignupForms } from "@/components/SignupForms";

const eventDetails = [
  ["Date", "September 12, Saturday"],
  ["Time", "12PM to 4PM"],
  ["Feature", "Free Bikini Carwash 1PM to 4PM"],
  ["Location", "Smokeville, 699 W Main St, Hendersonville, TN 37075"],
];

const program = [
  {
    time: "12:00 PM",
    title: "Pull-Up Opens",
    detail: "Food trucks, music, local vendors, and the ONVIBE crowd start moving.",
  },
  {
    time: "1:00 PM",
    title: "Free Bikini Carwash Begins",
    detail: "A featured daytime activation built for traffic, photos, and event energy.",
  },
  {
    time: "All Day",
    title: "Music, Brands, Creators",
    detail: "A live entertainment stop where customers, models, vendors, and brands meet in person.",
  },
  {
    time: "Next",
    title: "More ONVIBE Stops",
    detail: "Future events, vendor calls, model activations, and GetOnVibe launch moments drop to the list first.",
  },
];

const lanes = [
  ["Attend", "Get event drops, details, location updates, and first access to what ONVIBE is doing next.", "#signup"],
  ["Models", "Apply for carwash teams, promotional activations, content moments, and future ONVIBE stops.", "#models"],
  ["Food Vendors", "Bring food that turns a local pull-up into a destination people stay for.", "#food-vendors"],
  ["Brands", "Show up through vendor spots, sponsorships, giveaways, and onsite activation opportunities.", "#brands"],
];

const nextStops = [
  "Carwash activations",
  "Food truck meetups",
  "Brand pop-ups",
  "Creator nights",
  "Music-driven vendor events",
  "ONVIBE Festival",
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
              <a href="#signup">Attend</a>
              <a href="#models">Models</a>
              <a href="#food-vendors">Food</a>
              <a href="#brands">Brands</a>
              <a href="https://creators.getonvibe.com">Creators</a>
              <a href="https://business.getonvibe.com">Businesses</a>
            </div>
          </nav>

          <section id="top" className="event-landing">
            <div className="event-landing-copy">
              <p className="event-eyebrow">GetOnVibe launches through real-world events</p>
              <h1>ONVIBE Events Are Pulling Up</h1>
              <p className="event-lede">
                Food trucks, music, models, brands, creators, and local culture in one live entertainment hub.
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
                <NeonButton href="#brands" variant="secondary">Vendor And Brand Inquiry</NeonButton>
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

      <section id="featured-event" className="event-showcase px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="event-section-heading">
            <p>Featured Event</p>
            <h2>Bikini Carwash at Smokeville</h2>
          </div>
          <div className="event-showcase-grid">
            <EventCinematic />
            <div className="event-show-copy">
              <p className="event-eyebrow">September 12, Saturday</p>
              <h3>Food. Music. Models. Culture.</h3>
              <p>
                This is the temporary front door for ONVIBE Events: the place people come to see where we
                are pulling up, what is happening next, and how to get involved.
              </p>
              <div className="event-stamp-row">
                {["Free carwash", "Food trucks", "Music", "Model activations"].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Today's pull-up"
        title="The page should feel like the event is already moving."
        copy="ONVIBE Events are built to turn local traffic into culture: food, sound, people, brands, content, and community in the same place."
      >
        <div className="event-program-list">
          {program.map((item) => (
            <article key={item.title} className="event-program-row">
              <div className="event-program-time">{item.time}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <section className="event-flyer-break px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="event-flyer-break-inner">
            <Image src="/events/flyer2.jpeg" alt="ONVIBE Events flyer detail" width={900} height={1160} />
            <div>
              <p className="event-eyebrow">Not a static landing page</p>
              <h2>Built like an event board, not a tech brochure.</h2>
              <p>
                Visitors should instantly understand that ONVIBE is out in the city, creating moments
                people can attend, work, sponsor, post, and talk about.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Choose your lane"
        title="Customers, models, food vendors, and brands all have a way in."
        copy="The event hub keeps the page simple: see what is happening, see where ONVIBE is going, and jump into the lane that fits you."
      >
        <div className="event-lane-list">
          {lanes.map(([title, copy, href], index) => (
            <a key={title} href={href} className="event-lane-row">
              <span className="event-lane-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="event-lane-title">{title}</span>
              <span className="event-lane-copy">{copy}</span>
              <span className="event-lane-action">Start here</span>
            </a>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Event-led launch strategy"
        title="The platform grows from the places people already want to be."
      >
        <div className="event-strategy">
          <div>
            <p>
              GetOnVibe is not launching as only another website. It is launching through real-world
              movement.
            </p>
            <p>
              Events create the traffic, the content, the relationships, and the local proof. The app
              becomes the digital layer that helps people keep finding the next vibe.
            </p>
          </div>
          <div className="event-strategy-points">
            {["People discover events", "Creators capture moments", "Food vendors meet customers", "Brands activate with the crowd"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Where we go next"
        title="Follow the next ONVIBE stop."
        copy="The carwash is one activation. The bigger play is a calendar of moments that people want to attend, vendors want to work, and brands want to be seen at."
      >
        <div className="event-marquee" aria-hidden="true">
          <div>
            {[...nextStops, ...nextStops].map((stop, index) => (
              <span key={`${stop}-${index}`}>{stop}</span>
            ))}
          </div>
        </div>
        <div className="event-stop-grid">
          {nextStops.map((stop) => (
            <div key={stop}>{stop}</div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Flyer wall"
        title="The event should look real because it is real."
        copy="The flyers stay visible as proof that ONVIBE is already moving offline."
      >
        <div className="event-flyer-wall">
          <Image src="/events/flyer1.jpeg" alt="Bikini Carwash event flyer" width={900} height={1160} />
          <Image src="/events/flyer2.jpeg" alt="ONVIBE Events Bikini Carwash flyer" width={900} height={1160} />
        </div>
      </Section>

      <SignupForms />

      <Section className="pb-10" eyebrow="Stay connected" title="The next ONVIBE event is already moving.">
        <div className="event-final-callout">
          <p>
            Get on the list before the next location, activation, vendor opportunity, and event drop goes live.
          </p>
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
