import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getonvibe.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ONVIBE Festival Nashville | GetOnVibe Launch",
  description:
    "Sign up for ONVIBE Festival in Nashville on October 10 and get updates on the official GetOnVibe platform launch. Venue and time TBA. 21 plus event.",
  openGraph: {
    title: "ONVIBE Festival Nashville | GetOnVibe Launch",
    description:
      "Sign up for ONVIBE Festival in Nashville on October 10 and get updates on the official GetOnVibe platform launch. Venue and time TBA. 21 plus event.",
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
      "Sign up for ONVIBE Festival in Nashville on October 10 and get updates on the official GetOnVibe platform launch. Venue and time TBA. 21 plus event.",
    images: ["/logos/OnVibeFestival.png"],
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
    "ONVIBE Festival in Nashville on October 10, co-launching with the official GetOnVibe platform rollout. Venue and time TBA. 21 plus event.",
  startDate: "2026-10-10",
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
