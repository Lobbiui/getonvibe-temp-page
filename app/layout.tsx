import type { Metadata, Viewport } from "next";
import { eventDetails } from "@/lib/event";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getonvibe.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ONVIBE Festival Nashville | GetOnVibe Launch",
  description:
    "Sign up for ONVIBE Festival in the Nashville area, target date October 17, 2026, and get updates on the official GetOnVibe platform launch. Venue announcement coming soon. 21 plus event.",
  openGraph: {
    title: "ONVIBE Festival Nashville | GetOnVibe Launch",
    description:
      "Sign up for ONVIBE Festival in the Nashville area, target date October 17, 2026, and get updates on the official GetOnVibe platform launch. Venue announcement coming soon. 21 plus event.",
    url: siteUrl,
    siteName: "ONVIBE Festival",
    images: [
      {
        url: "/logos/OnVibeFestival.png",
        width: 1200,
        height: 630,
        alt: "ONVIBE Festival",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ONVIBE Festival Nashville | GetOnVibe Launch",
    description:
      "Sign up for ONVIBE Festival in the Nashville area, target date October 17, 2026, and get updates on the official GetOnVibe platform launch. Venue announcement coming soon. 21 plus event.",
    images: ["/logos/OnVibeFestival.png"],
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
  name: "ONVIBE Festival",
  description:
    "ONVIBE Festival in the Nashville area, target date October 17, 2026, co-launching with the official GetOnVibe platform rollout. Venue announcement coming soon. 21 plus event.",
  startDate: eventDetails.targetDateIso,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "Venue TBA",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nashville",
      addressRegion: "TN",
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
