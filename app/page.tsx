import Image from "next/image";
import { EventCinematic } from "@/components/EventCinematic";
import { NeonButton } from "@/components/NeonButton";
import { SignupForms } from "@/components/SignupForms";

const tourStops = [
  {
    status: "Next Stop",
    city: "Hendersonville, TN",
    venue: "Smokeville",
    address: "699 W Main St, Hendersonville, TN",
    date: "September 12, 2026",
    time: "12PM to 4PM",
  },
  {
    status: "Tour Expanding",
    city: "More Tennessee Stops",
    venue: "Coming Soon",
    address: "Tennessee",
    date: "TBA",
    time: "Get updates first",
  },
];

const featureLinks = [
  ["Attend", "Find the next stop", "#signup"],
  ["Bikini Team", "Apply to join", "#models"],
  ["Food Vendors", "Feed the tour", "#food-vendors"],
  ["Brands", "Activate onsite", "#brands"],
  ["Stores", "Host a stop", "#stores"],
  ["Creators", "Co-promote", "#creators"],
];

const gallery = [
  ["/event-assets/carwishintrofree.png", "Free Bikini Car Wash", "Yes, really free."],
  ["/event-assets/pullupgetwashed.png", "Pull Up", "Get washed. Have a good time."],
  ["/event-assets/onvibefood.png", "Food And Good Vibes", "Come hungry."],
  ["/event-assets/onvibeevents.png", "Music And Community", "The lot becomes the party."],
  ["/event-assets/Checkusout.png", "Check Us Out", "Follow the tour."],
  ["/event-assets/tourdates.png", "Tennessee Tour", "More stops are coming."],
];

export default function Home() {
  return (
    <main className="event-portal" id="top">
      <header className="portal-header">
        <a href="#top" className="portal-logo">ONVIBE Events</a>
        <nav aria-label="Main navigation">
          <a href="#tour-dates">Tour Dates</a>
          <a href="#experience">Experience</a>
          <a href="#signup">Sign Up</a>
        </nav>
      </header>

      <section className="portal-hero">
        <EventCinematic />
      </section>

      <section className="portal-now-playing" aria-label="Current event details">
        <Image src="/event-assets/flyer1.jpeg" alt="Official ONVIBE Bikini Carwash flyer for Hendersonville" width={1080} height={1350} />
        <div>
          <span>Next Stop</span>
          <h2>Hendersonville, TN</h2>
          <p>Smokeville</p>
          <p>699 W Main St, Hendersonville, TN</p>
        </div>
        <div>
          <strong>September 12, 2026</strong>
          <span>12PM to 4PM</span>
          <NeonButton href="#signup">Get Updates</NeonButton>
        </div>
      </section>

      <section className="portal-ticker" aria-label="Tour highlights">
        <span>Free Car Wash</span>
        <span>Food Trucks</span>
        <span>Music</span>
        <span>Brands</span>
        <span>Good Vibes</span>
        <span>Community Tour</span>
      </section>

      <section id="tour-dates" className="portal-section portal-main-grid">
        <div className="portal-main-column">
          <div className="portal-section-title">
            <p>Tennessee Community Tour</p>
            <h2>Upcoming Stops</h2>
          </div>

          <article className="portal-feature-event">
            <Image src="/event-assets/flyer1.jpeg" alt="Official next event flyer" width={1080} height={1350} />
            <div>
              <span>Featured Event</span>
              <h3>Bikini Carwash at Smokeville</h3>
              <p>Saturday, September 12. Free car wash from 1PM to 4PM, event runs 12PM to 4PM.</p>
              <p>699 W Main St, Hendersonville, TN</p>
              <NeonButton href="#signup">Get Event Updates</NeonButton>
            </div>
          </article>

          <div className="portal-stop-list">
            {tourStops.map((stop) => (
              <article key={stop.city}>
                <span>{stop.status}</span>
                <h3>{stop.city}</h3>
                <p>{stop.venue}</p>
                <small>{stop.address}</small>
                <p>{stop.date}</p>
                <p>{stop.time}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="portal-sidebar" aria-label="Event quick actions">
          <div className="portal-countdown-card">
            <p>Next Event</p>
            <strong>Sep 12</strong>
            <span>Hendersonville</span>
            <NeonButton href="#tour-dates">View Details</NeonButton>
          </div>

          <div className="portal-mini-art">
            <Image src="/event-assets/onvibeeventstour.png" alt="ONVIBE Events Tour" width={1800} height={900} />
          </div>

          <div className="portal-action-list">
            {featureLinks.map(([title, copy, href]) => (
              <a href={href} key={title}>
                <strong>{title}</strong>
                <span>{copy}</span>
              </a>
            ))}
          </div>
        </aside>
      </section>

      <section id="experience" className="portal-section">
        <div className="portal-section-title centered">
          <p>Event Energy</p>
          <h2>Come for the car wash. Stay for the scene.</h2>
        </div>
        <div className="portal-gallery">
          {gallery.map(([image, title, copy]) => (
            <article key={title}>
              <Image src={image} alt={title} width={1536} height={1024} />
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portal-section portal-split-promo">
        <Image src="/event-assets/pullupgetwashed.png" alt="Pull up get washed have a good time" width={1536} height={1024} />
        <div>
          <p>For Stores Across Tennessee</p>
          <h2>We turn parking lots into experiences.</h2>
          <span>Bring ONVIBE to your location with a free car wash, food vendors, brands, music, and community traffic.</span>
          <NeonButton href="#stores">Host A Tour Stop</NeonButton>
        </div>
      </section>

      <section className="portal-section portal-creator-callout">
        <Image src="/event-assets/creators.png" alt="Creators" width={1800} height={760} />
        <div>
          <p>Content Creators</p>
          <h2>Want to attend?</h2>
          <span>We do co-promotion. Reach out with a contact form and tell us where you create.</span>
          <NeonButton href="#creators">Contact Us</NeonButton>
        </div>
      </section>

      <SignupForms />

      <section className="portal-final">
        <Image src="/event-assets/onvibeevents.png" alt="ONVIBE Events music and carwash artwork" width={1536} height={1024} />
        <div>
          <p>The car wash is free.</p>
          <h2>Pull up. Get washed. Have a good time.</h2>
          <NeonButton href="#signup">Get Event Updates</NeonButton>
        </div>
      </section>

      <footer className="portal-footer">
        <strong>ONVIBE Events</strong>
        <span>Powered by GetOnVibe</span>
        <p>Copyright {new Date().getFullYear()} GetOnVibe. All rights reserved.</p>
      </footer>
    </main>
  );
}
