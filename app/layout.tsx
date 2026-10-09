import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://getonvibe.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "GetOnVibe | Find Your Vibe.",
  description:
    "Discover original creators and everything they make across the web. GetOnVibe brings scattered creative worlds into one living discovery network.",
  openGraph: {
    title: "GetOnVibe | Find Your Vibe.",
    description:
      "One place to discover original creators, follow everything they make across the web, and catch what they do next.",
    url: siteUrl,
    siteName: "GetOnVibe",
    images: [
      {
        url: "/brand/getonvibe-cinematic-hero.png",
        width: 2243,
        height: 701,
        alt: "GetOnVibe neon tropical horizon",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GetOnVibe | Find Your Vibe.",
    description:
      "One place to discover original creators, follow everything they make across the web, and catch what they do next.",
    images: ["/brand/getonvibe-cinematic-hero.png"],
  },
  verification: {
    google: "2QWJErsLQLc7DhsanubPgBPKqx2LDwtlF7MRzxD3rB4",
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
