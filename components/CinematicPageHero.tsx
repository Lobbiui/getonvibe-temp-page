import Image from "next/image";
import type { ReactNode } from "react";
import { AmbientMotionControl } from "@/components/AmbientMotionControl";

export function CinematicPageHero({
  image,
  imageAlt,
  eyebrow,
  title,
  accent,
  description,
  children,
  note,
  variant,
}: {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  children?: ReactNode;
  note?: string;
  variant: "platform" | "creators" | "businesses" | "contact";
}) {
  return (
    <section className={`gateway-cinematic-page-hero is-${variant}`} aria-labelledby={`${variant}-hero-title`}>
      <Image
        alt={imageAlt}
        className="gateway-cinematic-page-art"
        fill
        priority
        sizes="100vw"
        src={image}
      />
      <div className="gateway-cinematic-page-shade" aria-hidden="true" />
      <div className="gateway-cinematic-page-current" aria-hidden="true"><i /><i /><i /></div>
      <div className="gateway-cinematic-page-grain" aria-hidden="true" />

      <div className="gateway-cinematic-page-copy">
        <p className="gateway-kicker">{eyebrow}</p>
        <h1 id={`${variant}-hero-title`}><span>{title}</span><strong>{accent}</strong></h1>
        <p className="gateway-cinematic-page-lede">{description}</p>
        {children && <div className="gateway-actions">{children}</div>}
        {note && <p className="gateway-cinematic-page-note">{note}</p>}
      </div>

      <div className="gateway-cinematic-page-index" aria-hidden="true">
        <span>GetOnVibe</span><i /><strong>{variant}</strong>
      </div>
      <AmbientMotionControl />
    </section>
  );
}
