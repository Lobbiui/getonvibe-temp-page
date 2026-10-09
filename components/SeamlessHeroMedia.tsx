"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CROSSFADE_SECONDS = 1.35;

export function SeamlessHeroMedia() {
  const videos = useRef<Array<HTMLVideoElement | null>>([]);
  const switching = useRef(false);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  const switchLayer = useCallback((fromIndex: number) => {
    if (switching.current || fromIndex !== activeRef.current) return;

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
    if (first) void first.play().catch(() => undefined);
  }, []);

  return (
    <div className="gateway-hero-video-shell" aria-hidden="true">
      {[0, 1].map((index) => (
        <video
          autoPlay={index === 0}
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
