import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getonvibe.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ONVIBE Events | GetOnVibe Entertainment Hub",
  description:
    "Join the GetOnVibe Costume-Kini Halloween event for a free car wash, food, brands, music, live-stream challenges, and community in Old Hickory on October 3, 2026.",
  openGraph: {
    title: "ONVIBE Events | GetOnVibe Entertainment Hub",
    description:
      "GetOnVibe Costume-Kini Halloween event with a free car wash, food, brands, music, live-stream challenges, and community in Old Hickory on October 3, 2026.",
    url: siteUrl,
    siteName: "ONVIBE Events",
    images: [
      {
        url: "/event-assets/getonvibe-october-3-halloween-flyer.png",
        width: 1103,
        height: 1450,
        alt: "GetOnVibe October 3 Halloween car wash event flyer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ONVIBE Events | GetOnVibe Entertainment Hub",
    description:
      "GetOnVibe Costume-Kini Halloween event with a free car wash, food, brands, music, live-stream challenges, and community in Old Hickory on October 3, 2026.",
    images: ["/event-assets/getonvibe-october-3-halloween-flyer.png"],
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
  name: "GetOnVibe Costume-Kini Halloween Event",
  description:
    "A GetOnVibe Costume-Kini Halloween event with a free car wash, food vendors, onsite brands, music, live-stream challenges, and community in Old Hickory, Tennessee.",
  startDate: "2026-10-03T12:00:00-05:00",
  endDate: "2026-10-03T15:00:00-05:00",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "GetOnVibe Costume-Kini Halloween Event",
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
