import { Section } from "@/components/Section";

const faqs = [
  {
    question: "When and where is ONVIBE Festival?",
    answer:
      "ONVIBE Festival is planned for the Nashville Area with a target date of October 10, 2026. The official venue announcement and event details will be released to registered subscribers first.",
  },
  {
    question: "Is this a 21+ event?",
    answer:
      "Yes. All attendees must be 21 years of age or older and present a valid government-issued photo ID for entry.",
  },
  {
    question: "What is GetOnVibe?",
    answer:
      "GetOnVibe is a discovery platform built around Food, Gear, and Culture. It helps people discover local stores, creators, events, products, food vendors, and experiences while connecting with the communities that move culture. Find Your Vibe.",
  },
  {
    question: "What is ONVIBE Festival?",
    answer:
      "ONVIBE Festival is the real-world expression of the GetOnVibe ecosystem. It brings together music, creators, vendors, food, competitions, community, and culture into one immersive 21+ experience. Food. Gear. Culture. Live.",
  },
  {
    question: "Is this a music festival?",
    answer:
      "Yes. ONVIBE Festival is being built as a music-driven 21+ festival experience featuring DJs, stage energy, competitions, creators, vendors, food, and community. Performance announcements will be released as they are finalized.",
  },
  {
    question: "Can vendors apply?",
    answer:
      "Yes. ONVIBE Festival welcomes applications from alternative product brands, food vendors, apparel brands, lifestyle companies, artists, creators, and community-focused businesses. Vendor opportunities are limited and subject to approval.",
  },
  {
    question: "Can food vendors apply?",
    answer:
      "Yes. Limited food vendor opportunities are available. We are actively seeking unique food experiences, food trucks, local favorites, and festival-ready concepts.",
  },
  {
    question: "What competitions will be featured?",
    answer:
      "Current announced competitions include the $1,000 Costume Competition, $1,000 Light Up Dance Battle, and $1,000 Cloud Competition. Additional activities, experiences, and special guest announcements will be released closer to the event. The Cloud Competition is subject to venue approval, applicable law, final event rules, and 21+ verification requirements.",
  },
  {
    question: "Why is ONVIBE Festival different?",
    answer:
      "ONVIBE Festival combines Food, Gear, and Culture into one experience: music, creators, vendors, competitions, community, and the launch of GetOnVibe all in one place.",
  },
  {
    question: "Do I need a GetOnVibe account to attend?",
    answer:
      "No. However, registered subscribers and future GetOnVibe members will receive venue announcements, event updates, competition information, hotel partner updates, and exclusive announcements before the general public.",
  },
  {
    question: "Will discounted attendee lodging be available?",
    answer:
      "We are actively working with hotel partners to provide attendees with convenient lodging options, preferred rates, and room block opportunities. Registered subscribers will receive updates as hotel partnerships are finalized.",
  },
];

export function FAQ() {
  return (
    <Section id="faq" eyebrow="FAQ" title="Everything You Need To Know">
      <div className="grid gap-4 lg:grid-cols-2">
        {faqs.map((faq) => (
          <details key={faq.question} className="glass-panel group rounded-lg p-5">
            <summary className="cursor-pointer list-none text-lg font-black text-white focus:outline-none focus:ring-2 focus:ring-cyan-300">
              {faq.question}
            </summary>
            <p className="mt-4 leading-7 text-slate-300">{faq.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
