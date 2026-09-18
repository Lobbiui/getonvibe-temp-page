import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getonvibe.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ONVIBE Events | GetOnVibe Entertainment Hub",
  description:
    "Join GetOnVibe for a free car wash, food, brands, music, and community in Old Hickory, Tennessee on October 3, 2026 from 12PM to 3PM.",
  openGraph: {
    title: "ONVIBE Events | GetOnVibe Entertainment Hub",
    description:
      "Free car wash, food, brands, music, and community in Old Hickory, Tennessee on October 3, 2026 from 12PM to 3PM.",
    url: siteUrl,
    siteName: "ONVIBE Events",
    images: [
      {
        url: "/event-assets/getonvibe-october-3-2026.png",
        width: 1135,
        height: 1450,
        alt: "GetOnVibe October 3 free car wash event flyer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ONVIBE Events | GetOnVibe Entertainment Hub",
    description:
      "Free car wash, food, brands, music, and community in Old Hickory, Tennessee on October 3, 2026 from 12PM to 3PM.",
    images: ["/event-assets/getonvibe-october-3-2026.png"],
  },
  verification: {
    google: "2QWJErsLQLc7DhsanubPgBPKqx2LDwtlF7MRzxD3rB4",
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "GetOnVibe Free Car Wash Community Event",
  description:
    "A free GetOnVibe community car wash event with food vendors, onsite brands, music, and community in Old Hickory, Tennessee.",
  startDate: "2026-10-03T12:00:00-05:00",
  endDate: "2026-10-03T15:00:00-05:00",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "GetOnVibe Community Event",
    address: {
      "@type": "PostalAddress",
      streetAddress: "14665-D Lebanon Rd",
      addressLocality: "Old Hickory",
      addressRegion: "TN",
      postalCode: "37138",
      addressCountry: "US",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "GetOnVibe",
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
