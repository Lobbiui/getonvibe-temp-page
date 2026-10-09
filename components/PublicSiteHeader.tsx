import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

const links = [
  { href: "/platform", label: "Platform" },
  { href: "https://creators.getonvibe.com", label: "Creators", external: true },
  { href: "https://business.getonvibe.com", label: "Businesses", external: true },
  { href: "/events", label: "Pop-Up Events" },
  { href: "/contact", label: "Contact" },
];

export function PublicSiteHeader() {
  return (
    <header className="gateway-header">
      <Link href="/" className="gateway-brand" aria-label="GetOnVibe home">
        <BrandMark size={56} />
        <span>GetOnVibe</span>
      </Link>
      <nav aria-label="Public website navigation">
        {links.map((link) =>
          link.external ? (
            <a key={link.label} href={link.href}>{link.label}</a>
          ) : (
            <Link key={link.label} href={link.href}>{link.label}</Link>
          ),
        )}
      </nav>
      <a className="gateway-nav-cta" href="/#pathways">Join Early Access</a>
    </header>
  );
}
