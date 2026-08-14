import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getonvibe.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ONVIBE Events | GetOnVibe Entertainment Hub",
  description:
    "Follow ONVIBE Events for food trucks, music, model activations, brand pop-ups, vendor opportunities, and real-world GetOnVibe launch experiences.",
  openGraph: {
    title: "ONVIBE Events | GetOnVibe Entertainment Hub",
    description:
      "Food trucks, music, model activations, brand pop-ups, vendor opportunities, and real-world GetOnVibe launch experiences.",
    url: siteUrl,
    siteName: "ONVIBE Events",
    images: [
      {
        url: "/events/flyer1.jpeg",
        width: 1200,
        height: 630,
        alt: "ONVIBE Events Bikini Carwash flyer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ONVIBE Events | GetOnVibe Entertainment Hub",
    description:
      "Food trucks, music, model activations, brand pop-ups, vendor opportunities, and real-world GetOnVibe launch experiences.",
    images: ["/events/flyer1.jpeg"],
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
  name: "ONVIBE Events Bikini Carwash",
  description:
    "ONVIBE Events presents a Bikini Carwash activation with food trucks, music, and a free carwash at Smokeville in Hendersonville, Tennessee.",
  startDate: "2026-09-12T12:00:00-05:00",
  endDate: "2026-09-12T16:00:00-05:00",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "Smokeville",
    address: {
      "@type": "PostalAddress",
      streetAddress: "699 W Main St",
      addressLocality: "Hendersonville",
      addressRegion: "TN",
      postalCode: "37075",
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
