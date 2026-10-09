import { PublicSiteHeader } from "@/components/PublicSiteHeader";

const contacts = [
  { glyph: "01", title: "Events & Hosting", copy: "Pop-up hosting, venues, creator opportunities, and community activations." },
  { glyph: "02", title: "Partnerships & Sponsorships", copy: "Brand participation, creator collaborations, and launch partnerships." },
  { glyph: "03", title: "Press & Media", copy: "Interviews, brand information, and media inquiries." },
  { glyph: "04", title: "Local Communities", copy: "Tell us where creators and GetOnVibe should show up next." },
];

export default function ContactPage() {
  return (
    <main className="gateway-page gateway-information-page">
      <PublicSiteHeader />
      <section className="gateway-info-hero">
        <p className="gateway-kicker">Contact GetOnVibe</p>
        <h1>Let&apos;s connect.</h1>
        <p>For partnerships, press, sponsorships, event hosting, or general questions, reach the GetOnVibe team directly.</p>
        <a className="gateway-primary-button" href="mailto:hello@getonvibe.com">hello@getonvibe.com</a>
      </section>
      <section className="gateway-info-grid gateway-contact-grid">
        {contacts.map(({ glyph, title, copy }) => (
          <article key={title}>
            <span className="gateway-info-glyph" aria-hidden="true">{glyph}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
