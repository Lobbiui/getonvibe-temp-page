import Image from "next/image";
import { EventCinematic } from "@/components/EventCinematic";
import { NeonButton } from "@/components/NeonButton";
import { SignupForms } from "@/components/SignupForms";

const tourStops = [
  {
    city: "Hendersonville, TN",
    venue: "Smokeville",
    address: "699 W Main St, Hendersonville, TN 37075",
    date: "September 12, 2026",
    time: "12PM to 4PM",
    status: "Next Stop",
  },
  {
    city: "More Tennessee Stops",
    venue: "Coming Soon",
    address: "Stores, lots, and community spaces",
    date: "TBA",
    time: "Get updates first",
    status: "Tour Expanding",
  },
];

const experienceTiles = [
  {
    title: "Free Car Wash",
    copy: "Yes, really free.",
    image: "/event-assets/carwashfree.png",
    href: "#signup",
  },
  {
    title: "Food Trucks",
    copy: "Come hungry.",
    image: "/event-assets/onvibefood.png",
    href: "#food-vendors",
  },
  {
    title: "Music And Good Vibes",
    copy: "A parking lot with a pulse.",
    image: "/event-assets/onvibeevents.png",
    href: "#signup",
  },
  {
    title: "Brand Activations",
    copy: "Put your brand in the middle of it.",
    image: "/event-assets/Brandactivation.jpeg",
    href: "#brands",
  },
];

const signupCards = [
  ["Attend", "Find the next stop", "#signup"],
  ["Bikini Team", "Apply to join", "#models"],
  ["Food Vendors", "Feed the tour", "#food-vendors"],
  ["Brands", "Activate onsite", "#brands"],
  ["Tennessee Stores", "Host a stop", "#stores"],
];

export default function Home() {
  return (
    <main className="tour-site">
      <header className="tour-header">
        <nav className="tour-nav" aria-label="Main navigation">
          <a href="#top" className="tour-logo">ONVIBE Events</a>
          <div>
            <a href="#tour-dates">Tour Dates</a>
            <a href="#experience">Experience</a>
            <a href="#signup">Sign Up</a>
            <a href="https://creators.getonvibe.com">Creators</a>
            <a href="https://business.getonvibe.com">Businesses</a>
          </div>
        </nav>
      </header>

      <section id="top" className="tour-hero">
        <EventCinematic />
        <div className="tour-hero-actions">
          <NeonButton href="#tour-dates">Find The Next Stop</NeonButton>
          <NeonButton href="#signup" variant="secondary">Get On The List</NeonButton>
        </div>
      </section>

      <section className="tour-free-strip" aria-label="Free carwash price reveal">
        <Image src="/event-assets/onvibe_20_crossed_out.png" alt="20 dollars crossed out" width={500} height={300} />
        <Image src="/event-assets/onvibe_10_crossed_out.png" alt="10 dollars crossed out" width={500} height={300} />
        <Image src="/event-assets/onvibe_0_free.png" alt="0 dollars free" width={500} height={300} />
      </section>

      <section id="tour-dates" className="tour-section tour-dates">
        <div className="tour-section-heading">
          <p>Tennessee Community Tour</p>
          <h1>Tour Dates</h1>
        </div>
        <div className="tour-date-grid">
          <Image src="/event-assets/tourdates.png" alt="ONVIBE Tennessee Community Tour" width={1536} height={1024} />
          <div className="tour-stop-list">
            {tourStops.map((stop) => (
              <article key={stop.city} className="tour-stop-card">
                <span>{stop.status}</span>
                <h2>{stop.city}</h2>
                <p>{stop.venue}</p>
                <p>{stop.date}</p>
                <p>{stop.time}</p>
                <small>{stop.address}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="tour-section">
        <div className="tour-section-heading compact">
          <p>Come Enjoy The Vibe</p>
          <h2>Free car wash. Food. Music. Brands. Community.</h2>
        </div>
        <div className="tour-experience-grid">
          {experienceTiles.map((tile) => (
            <a href={tile.href} key={tile.title} className="tour-experience-card">
              <Image src={tile.image} alt={tile.title} width={900} height={600} />
              <div>
                <h3>{tile.title}</h3>
                <p>{tile.copy}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="tour-section tour-split">
        <div className="tour-split-copy">
          <p>For stores across Tennessee</p>
          <h2>We turn parking lots into experiences.</h2>
          <span>
            ONVIBE brings the attraction: free car wash, food, brand energy, music, and community traffic.
          </span>
          <NeonButton href="#stores">Host A Tour Stop</NeonButton>
        </div>
        <Image src="/event-assets/Foodtrucks.jpeg" alt="ONVIBE food truck and event crowd" width={1536} height={1024} />
      </section>

      <section className="tour-section">
        <div className="tour-section-heading compact">
          <p>Get Involved</p>
          <h2>Pick your lane.</h2>
        </div>
        <div className="tour-signup-cards">
          {signupCards.map(([title, action, href]) => (
            <a href={href} key={title}>
              <strong>{title}</strong>
              <span>{action}</span>
            </a>
          ))}
        </div>
      </section>

      <SignupForms />

      <section className="tour-section tour-final">
        <Image src="/event-assets/pullupgetwashed.png" alt="Pull up get washed have a good time" width={1536} height={1024} />
        <div>
          <p>The car wash is free.</p>
          <h2>Pull up. Get washed. Have a good time.</h2>
          <NeonButton href="#signup">Get Event Updates</NeonButton>
        </div>
      </section>

      <footer className="tour-footer">
        <div>
          <strong>ONVIBE Events</strong>
          <span>Powered by GetOnVibe</span>
        </div>
        <p>Age, entry, and participation requirements may vary by event. Valid ID may be required.</p>
        <p>Copyright {new Date().getFullYear()} GetOnVibe. All rights reserved.</p>
      </footer>
    </main>
  );
}
