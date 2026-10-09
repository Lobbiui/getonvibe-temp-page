import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

const links = [
  { href: "/platform", label: "Platform" },
  { href: "/creators", label: "Creators" },
  { href: "/businesses", label: "Businesses" },
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
        {links.map((link) => <Link key={link.label} href={link.href}>{link.label}</Link>)}
      </nav>
      <Link className="gateway-nav-cta" href="/#early-access">Join Early Access</Link>
    </header>
  );
}
