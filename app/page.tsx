import Image from "next/image";
import { EventCinematic } from "@/components/EventCinematic";
import { NeonButton } from "@/components/NeonButton";
import { SignupForms } from "@/components/SignupForms";

const tourStops = [
  ["Next Stop", "Hendersonville, TN", "Smokeville", "699 W Main St, Hendersonville, TN", "September 12, 2026", "12PM to 4PM"],
  ["Tour Expanding", "More Tennessee Stops", "Coming Soon", "Tennessee", "TBA", "Get updates first"],
];

const experienceTiles = [
  ["Free Car Wash", "Yes, really free.", "/event-assets/carwishintrofree.png", "#signup"],
  ["Pull Up", "Get washed. Have a good time.", "/event-assets/pullupgetwashed.png", "#signup"],
  ["Food And Good Vibes", "Come hungry.", "/event-assets/onvibefood.png", "#food-vendors"],
  ["Music And Community", "The lot becomes the party.", "/event-assets/onvibeevents.png", "#signup"],
  ["Check Us Out", "Follow the tour.", "/event-assets/Checkusout.png", "#tour-dates"],
  ["Official Flyer", "September 12 at Smokeville.", "/event-assets/flyer1.jpeg", "#tour-dates"],
];

const signupCards = [
  ["Attend", "Find the next stop", "#signup"],
  ["Bikini Team", "Apply to join", "#models"],
  ["Food Vendors", "Feed the tour", "#food-vendors"],
  ["Brands", "Activate onsite", "#brands"],
  ["Tennessee Stores", "Host a stop", "#stores"],
  ["Creators", "Co-promote", "#creators"],
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

      <section id="tour-dates" className="tour-section tour-dates tour-open-section">
        <div className="tour-section-heading">
          <p>Tennessee Community Tour</p>
          <h1>Tour Dates</h1>
        </div>
        <div className="tour-date-stage">
          <Image src="/event-assets/flyer1.jpeg" alt="Official ONVIBE Bikini Carwash flyer for the next Hendersonville event" width={1080} height={1350} />
          <div className="tour-stop-list">
            {tourStops.map(([status, city, venue, address, date, time]) => (
              <article key={city} className="tour-stop-card">
                <span>{status}</span>
                <h2>{city}</h2>
                <p>{venue}</p>
                <small>{address}</small>
                <p>{date}</p>
                <p>{time}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="tour-section tour-open-section">
        <div className="tour-section-heading compact">
          <p>Come Enjoy The Vibe</p>
          <h2>Free car wash. Food. Music. Brands. Community.</h2>
        </div>
        <div className="tour-experience-grid">
          {experienceTiles.map(([title, copy, image, href]) => (
            <a href={href} key={title} className="tour-experience-card">
              <Image src={image} alt={title} width={1536} height={1024} />
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="tour-wide-art">
        <Image src="/event-assets/pullupgetwashed.png" alt="Pull up get washed have a good time" width={1536} height={1024} />
      </section>

      <section className="tour-section tour-store-invite">
        <div>
          <p>For stores across Tennessee</p>
          <h2>Host the next stop.</h2>
          <span>Bring ONVIBE to your parking lot: free car wash, food, music, brands, and community traffic.</span>
          <NeonButton href="#stores">Host A Tour Stop</NeonButton>
        </div>
        <Image src="/event-assets/Checkusout.png" alt="Check us out ONVIBE tour car artwork" width={1536} height={1024} />
      </section>

      <section className="tour-brand-break">
        <Image src="/event-assets/onvibeeventstour.png" alt="ONVIBE Events Tour" width={1800} height={900} />
      </section>

      <section className="tour-section tour-creator-callout">
        <Image src="/event-assets/creators.png" alt="Creators" width={1800} height={760} />
        <div>
          <p>Content Creators</p>
          <h2>Want to attend?</h2>
          <span>We do co-promotion. Reach out with a contact form and tell us where you create.</span>
          <NeonButton href="#creators">Contact Us</NeonButton>
        </div>
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

      <section className="tour-wide-art final-art">
        <Image src="/event-assets/onvibeevents.png" alt="ONVIBE Events music and carwash artwork" width={1536} height={1024} />
        <div>
          <p>The car wash is free.</p>
          <h2>Come enjoy the vibe.</h2>
          <NeonButton href="#signup">Get Event Updates</NeonButton>
        </div>
      </section>

      <footer className="tour-footer">
        <div>
          <strong>ONVIBE Events</strong>
          <span>Powered by GetOnVibe</span>
        </div>
        <p>Copyright {new Date().getFullYear()} GetOnVibe. All rights reserved.</p>
      </footer>
    </main>
  );
}
