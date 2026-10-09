import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pop-Up Events | GetOnVibe",
  description: "Follow GetOnVibe and ONVIBE pop-up events, community activations, and future event announcements.",
};

export default function EventsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
