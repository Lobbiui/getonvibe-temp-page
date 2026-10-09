"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CROSSFADE_SECONDS = 1.35;

export function SeamlessHeroMedia() {
  const videos = useRef<Array<HTMLVideoElement | null>>([]);
  const switching = useRef(false);
  const activeRef = useRef(0);
  const pausedRef = useRef(false);
  const [active, setActive] = useState(0);

  const switchLayer = useCallback((fromIndex: number) => {
    if (pausedRef.current || switching.current || fromIndex !== activeRef.current) return;

    const nextIndex = fromIndex === 0 ? 1 : 0;
    const currentVideo = videos.current[fromIndex];
    const nextVideo = videos.current[nextIndex];
    if (!currentVideo || !nextVideo) return;

    switching.current = true;
    nextVideo.currentTime = 0;
    void nextVideo.play().then(() => {
      activeRef.current = nextIndex;
      setActive(nextIndex);

      window.setTimeout(() => {
        currentVideo.pause();
        currentVideo.currentTime = 0;
        switching.current = false;
      }, CROSSFADE_SECONDS * 1000);
    }).catch(() => {
      switching.current = false;
    });
  }, []);

  useEffect(() => {
    const first = videos.current[0];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    pausedRef.current = reducedMotion;
    if (first && !reducedMotion) void first.play().catch(() => undefined);

    function updateMotion(event: Event) {
      const paused = (event as CustomEvent<{ paused: boolean }>).detail.paused;
      pausedRef.current = paused;

      if (paused) {
        videos.current.forEach((video) => video?.pause());
        return;
      }

      const current = videos.current[activeRef.current];
      if (current) void current.play().catch(() => undefined);
    }

    window.addEventListener("gateway-motion-toggle", updateMotion);
    return () => window.removeEventListener("gateway-motion-toggle", updateMotion);
  }, []);

  return (
    <div className="gateway-hero-video-shell" aria-hidden="true">
      {[0, 1].map((index) => (
        <video
          autoPlay={false}
          className={`gateway-hero-video ${active === index ? "is-active" : ""}`}
          key={index}
          muted
          onEnded={() => switchLayer(index)}
          onTimeUpdate={(event) => {
            const video = event.currentTarget;
            if (video.duration - video.currentTime <= CROSSFADE_SECONDS) switchLayer(index);
          }}
          playsInline
          preload="auto"
          ref={(node) => { videos.current[index] = node; }}
        >
          <source src="/brand/getonvibe-cinematic-hero.mp4" type="video/mp4" />
        </video>
      ))}
    </div>
  );
}
