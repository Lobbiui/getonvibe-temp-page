import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Camera,
  Car,
  MapPin,
  Megaphone,
  Music2,
  Sparkles,
  Store,
  Ticket,
  Utensils,
  UsersRound,
} from "lucide-react";
import { EventCinematic } from "@/components/EventCinematic";
import { NeonButton } from "@/components/NeonButton";
import { Section } from "@/components/Section";
import { SignupForms } from "@/components/SignupForms";

const eventDetails = [
  { label: "September 12", detail: "Saturday", icon: CalendarDays },
  { label: "12PM to 4PM", detail: "Free carwash 1PM to 4PM", icon: Ticket },
  { label: "Smokeville", detail: "699 W Main St, Hendersonville, TN 37075", icon: MapPin },
];

const attractions = [
  {
    title: "Food Trucks",
    copy: "Local food, quick bites, and vendors that make the stop feel alive.",
    icon: Utensils,
  },
  {
    title: "Music",
    copy: "A daytime soundtrack built for pull-ups, creators, photos, and crowd energy.",
    icon: Music2,
  },
  {
    title: "Bikini Carwash",
    copy: "A free featured activation from 1PM to 4PM with photo-ready event energy.",
    icon: Car,
  },
  {
    title: "Brands And Vendors",
    copy: "A local activation lane for brands that want to meet the crowd in person.",
    icon: Store,
  },
];

const audienceLanes = [
  {
    title: "Attend",
    copy: "Pull up for food, music, carwash energy, vendors, photos, and the next ONVIBE moment.",
    href: "#signup",
    icon: Ticket,
  },
  {
    title: "Models",
    copy: "Apply for carwash teams, promotional activations, content moments, and future event stops.",
    href: "#models",
    icon: Camera,
  },
  {
    title: "Food Vendors",
    copy: "Bring the food that turns a local stop into a destination people remember.",
    href: "#food-vendors",
    icon: Utensils,
  },
  {
    title: "Brands",
    copy: "Activate with real people through vendor spots, sponsorships, giveaways, and onsite promotion.",
    href: "#brands",
    icon: Megaphone,
  },
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
      <header className="event-hero relative overflow-hidden px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="glass-panel sticky top-3 z-40 mb-8 flex flex-wrap items-center justify-between gap-3 rounded-lg px-4 py-3">
            <a href="#top" className="text-sm font-black uppercase tracking-[0.24em] text-white">
              ONVIBE Events
            </a>
            <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-cyan-100">
              <a className="event-nav-link" href="#featured-event">Event</a>
              <a className="event-nav-link" href="#signup">Attend</a>
              <a className="event-nav-link" href="#models">Models</a>
              <a className="event-nav-link" href="#food-vendors">Food Vendors</a>
              <a className="event-nav-link" href="#brands">Brands</a>
              <a className="event-nav-link" href="https://creators.getonvibe.com">Creators</a>
              <a className="event-nav-link" href="https://business.getonvibe.com">Businesses</a>
            </div>
          </nav>

          <section id="top" className="grid min-h-[86vh] items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
            <div>
              <p className="event-eyebrow">The GetOnVibe launch starts in real life</p>
              <h1 className="mt-5 max-w-5xl text-5xl font-black leading-[0.92] text-white sm:text-7xl lg:text-8xl">
                ONVIBE Events Are Pulling Up
              </h1>
              <p className="mt-6 max-w-2xl text-xl font-black leading-8 text-cyan-100 sm:text-2xl">
                Food trucks, music, models, brands, creators, and real-world experiences powered by GetOnVibe.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <NeonButton href="#signup">Get Event Updates</NeonButton>
                <NeonButton href="#models" variant="secondary">Apply To Model</NeonButton>
                <NeonButton href="#brands" variant="secondary">Vendor And Brand Inquiry</NeonButton>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {eventDetails.map((item) => (
                  <div key={item.label} className="glass-panel rounded-md p-4">
                    <item.icon className="mb-3 h-5 w-5 text-pink-300" aria-hidden="true" />
                    <p className="text-lg font-black text-white">{item.label}</p>
                    <p className="mt-1 text-sm font-bold leading-5 text-slate-300">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="event-poster-stack">
                <Image
                  src="/events/flyer1.jpeg"
                  alt="ONVIBE Events Bikini Carwash flyer"
                  width={900}
                  height={1160}
                  priority
                  className="event-poster event-poster-one"
                />
                <Image
                  src="/events/flyer2.jpeg"
                  alt="ONVIBE Events Bikini Carwash alternate flyer"
                  width={900}
                  height={1160}
                  priority
                  className="event-poster event-poster-two"
                />
              </div>
            </div>
          </section>
        </div>
      </header>

      <Section
        id="featured-event"
        eyebrow="Featured event"
        title="Bikini Carwash at Smokeville"
        copy="A daytime ONVIBE Events activation built around food trucks, music, a free bikini carwash, local traffic, photo-ready energy, and community pull-up culture."
        className="pt-10"
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_0.92fr] lg:items-center">
          <EventCinematic />
          <div className="glass-panel glow-border rounded-lg p-6 sm:p-8">
            <p className="event-eyebrow">September 12, Saturday</p>
            <h2 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">
              Food. Music. Models. Culture.
            </h2>
            <p className="mt-5 text-lg font-bold leading-8 text-slate-300">
              This is the temporary front door for ONVIBE Events: the place people come to see where we are pulling up, what is happening next, and how to get involved.
            </p>
            <div className="gradient-line my-7" />
            <div className="grid gap-3 sm:grid-cols-2">
              {["Free carwash", "Food trucks", "Music", "Model activations"].map((item) => (
                <div className="rounded-md border border-white/15 bg-white/5 p-4 text-sm font-black uppercase tracking-[0.14em] text-white" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Why pull up"
        title="It should feel like something is happening before you even arrive."
        copy="ONVIBE Events are built to turn local traffic into culture: food, sound, people, brands, content, and community in the same place."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {attractions.map((item) => (
            <article key={item.title} className="glass-panel rounded-lg p-6">
              <item.icon className="mb-5 h-8 w-8 text-pink-300" aria-hidden="true" />
              <h3 className="text-2xl font-black text-white">{item.title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{item.copy}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Choose your lane"
        title="Customers, models, food vendors, and brands all have a reason to be here."
        copy="The event hub keeps the page simple: learn what is happening, see where ONVIBE is going, and jump into the lane that fits you."
      >
        <div className="grid gap-5 lg:grid-cols-4">
          {audienceLanes.map((lane) => (
            <a key={lane.title} href={lane.href} className="glass-panel group rounded-lg p-6 transition hover:-translate-y-1 hover:border-pink-300/60">
              <lane.icon className="mb-5 h-8 w-8 text-cyan-300" aria-hidden="true" />
              <h3 className="text-2xl font-black text-white">{lane.title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{lane.copy}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-pink-200">
                Start here <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Event-led launch strategy"
        title="The platform grows from the places people already want to be."
      >
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-panel glow-border rounded-lg p-6 sm:p-8">
            <Sparkles className="mb-5 h-9 w-9 text-pink-300" aria-hidden="true" />
            <p className="text-3xl font-black leading-tight text-white">
              GetOnVibe is not launching as only another website. It is launching through real-world movement.
            </p>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Events create the traffic, the content, the relationships, and the local proof. The app becomes the digital layer that helps people keep finding the next vibe.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["People discover events", "Creators capture moments", "Food vendors meet customers", "Brands activate with the crowd"].map((item) => (
              <div key={item} className="glass-panel rounded-lg p-5">
                <UsersRound className="mb-4 h-6 w-6 text-cyan-300" aria-hidden="true" />
                <p className="text-xl font-black text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Where we go next"
        title="Follow the next ONVIBE stop."
        copy="The carwash is one activation. The bigger play is a calendar of moments that people want to attend, vendors want to work, and brands want to be seen at."
      >
        <div className="glass-panel rounded-lg p-5 sm:p-7">
          <div className="event-marquee" aria-hidden="true">
            <div>
              {[...nextStops, ...nextStops].map((stop, index) => (
                <span key={`${stop}-${index}`}>{stop}</span>
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {nextStops.map((stop) => (
              <div className="rounded-md border border-white/15 bg-black/35 p-4 text-lg font-black text-white" key={stop}>
                {stop}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Flyer wall"
        title="The event should look real because it is real."
        copy="Visitors should feel the event energy immediately. The flyers stay visible as proof that ONVIBE is already moving offline."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Image src="/events/flyer1.jpeg" alt="Bikini Carwash event flyer" width={900} height={1160} className="rounded-lg border border-pink-400/30 shadow-[0_0_60px_rgba(236,72,153,0.2)]" />
          <Image src="/events/flyer2.jpeg" alt="ONVIBE Events Bikini Carwash flyer" width={900} height={1160} className="rounded-lg border border-cyan-300/30 shadow-[0_0_60px_rgba(6,182,212,0.18)]" />
        </div>
      </Section>

      <SignupForms />

      <Section className="pb-10" eyebrow="Stay connected" title="The next ONVIBE event is already moving.">
        <div className="glass-panel glow-border rounded-lg p-8 text-center sm:p-12">
          <p className="mx-auto max-w-3xl text-xl font-bold leading-8 text-slate-300">
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
