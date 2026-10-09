import { PublicSiteHeader } from "@/components/PublicSiteHeader";
import { CinematicPageHero } from "@/components/CinematicPageHero";

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
      <CinematicPageHero
        accent="Let's make the connection."
        description="For partnerships, press, sponsorships, event hosting, creator opportunities, or a real idea worth bringing to the community, reach the GetOnVibe team directly."
        eyebrow="Contact GetOnVibe"
        image="/brand/page-heroes/contact.png"
        imageAlt="Backstage production table with contact sheets, passes, cables, and creative notes"
        note="Real people. Clear conversations. No mystery inbox."
        title="Bring something real."
        variant="contact"
      >
        <a className="gateway-primary-button" href="mailto:hello@getonvibe.com">hello@getonvibe.com</a>
      </CinematicPageHero>
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
