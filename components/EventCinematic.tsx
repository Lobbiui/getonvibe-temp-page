"use client";

import { Player } from "@remotion/player";
import { useEffect, useRef, useState } from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

const bubbles = Array.from({ length: 18 }, (_, index) => ({
  left: 8 + ((index * 13) % 88),
  top: 18 + ((index * 19) % 66),
  size: 18 + ((index * 11) % 46),
  delay: index * 13,
}));

const lights = [
  { left: -8, top: 8, size: 34, color: "rgba(236,72,153,0.44)" },
  { left: 72, top: -8, size: 42, color: "rgba(34,211,238,0.34)" },
  { left: 76, top: 50, size: 34, color: "rgba(250,204,21,0.22)" },
];

function CinematicComposition() {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const compact = width < 760;
  const pulse = interpolate(frame % 160, [0, 80, 160], [0, 1, 0]);
  const slowDrift = interpolate(frame % 260, [0, 130, 260], [-18, 18, -18]);
  const posterIn = interpolate(frame, [0, 28], [0.72, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const titleIn = interpolate(frame, [0, 34], [0.78, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const detailsIn = interpolate(frame, [0, 42], [0.72, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill style={{ background: "#070008", overflow: "hidden", fontFamily: "Arial, sans-serif" }}>
      <Img
        src={staticFile("event-assets/getonvibe-october-3-2026.png")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: compact ? "52% 45%" : "50% 42%",
          scale: interpolate(frame % 300, [0, 150, 300], [1.08, 1.16, 1.08]),
          filter: "blur(16px) saturate(1.22) contrast(1.08)",
          opacity: 0.66,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            compact
              ? "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.26) 44%, rgba(0,0,0,0.96) 78%), radial-gradient(circle at 22% 24%, rgba(236,72,153,0.34), transparent 34%), radial-gradient(circle at 82% 12%, rgba(34,211,238,0.3), transparent 30%)"
              : "linear-gradient(90deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.72) 46%, rgba(0,0,0,0.3) 100%), radial-gradient(circle at 18% 26%, rgba(236,72,153,0.42), transparent 30%), radial-gradient(circle at 82% 12%, rgba(34,211,238,0.3), transparent 28%)",
        }}
      />

      {lights.map((light) => (
        <div
          key={`${light.left}-${light.top}`}
          style={{
            position: "absolute",
            left: `${light.left}%`,
            top: `${light.top}%`,
            width: `${light.size}%`,
            aspectRatio: "1",
            border: `10px solid ${light.color}`,
            borderRadius: "999px",
            opacity: 0.5 + pulse * 0.22,
            rotate: `${slowDrift * 0.7}deg`,
            filter: "blur(1px)",
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18 + pulse * 0.18,
          background: "linear-gradient(105deg, transparent 26%, rgba(255,255,255,0.9) 48%, transparent 66%)",
          transform: `translateX(${interpolate(frame % 150, [0, 150], [-80, 80])}%)`,
        }}
      />

      <Img
        src={staticFile("event-assets/getonvibe-october-3-2026.png")}
        style={{
          position: "absolute",
          right: compact ? "14%" : "5%",
          top: compact ? "3%" : "4%",
          width: compact ? "72%" : "37%",
          maxHeight: compact ? "54%" : "92%",
          objectFit: "contain",
          border: "2px solid rgba(255,255,255,0.72)",
          boxShadow: "0 32px 90px rgba(0,0,0,0.72), 0 0 42px rgba(236,72,153,0.38)",
          opacity: posterIn,
          scale: interpolate(posterIn, [0.72, 1], [0.96, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            output: "perceptual-scale",
          }),
          rotate: compact ? "0deg" : `${-2 + posterIn}deg`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: compact ? "7%" : "7%",
          top: compact ? "58%" : "18%",
          maxWidth: compact ? "86%" : "51%",
          opacity: titleIn,
          translate: `0 ${(1 - titleIn) * 28}px`,
        }}
      >
        <div style={{ color: "#22d3ee", fontSize: compact ? 14 : 22, fontWeight: 900, letterSpacing: compact ? 3 : 6, textTransform: "uppercase" }}>
          GetOnVibe Community Event
        </div>
        <div style={{ marginTop: compact ? 8 : 14, color: "#ec4899", fontSize: compact ? 46 : 92, fontWeight: 950, lineHeight: 0.86, textTransform: "uppercase" }}>
          Free Car Wash
        </div>
        <div style={{ marginTop: compact ? 12 : 22, color: "#ffffff", fontSize: compact ? 24 : 46, fontWeight: 950, lineHeight: 1, textTransform: "uppercase" }}>
          Saturday, October 3
        </div>
        <div style={{ marginTop: 9, color: "#facc15", fontSize: compact ? 19 : 31, fontWeight: 900, textTransform: "uppercase" }}>
          12PM to 3PM
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: compact ? "7%" : "7%",
          bottom: compact ? "12%" : "10%",
          maxWidth: compact ? "86%" : "50%",
          color: "#ffffff",
          fontSize: compact ? 14 : 24,
          fontWeight: 850,
          lineHeight: 1.35,
          opacity: detailsIn,
          translate: `0 ${(1 - detailsIn) * 20}px`,
        }}
      >
        14665-D Lebanon Rd, Old Hickory, TN 37138
      </div>

      {bubbles.map((bubble) => {
        const localFrame = (frame + bubble.delay) % 190;
        return (
          <div
            key={`${bubble.left}-${bubble.top}-${bubble.size}`}
            style={{
              position: "absolute",
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
              width: bubble.size,
              height: bubble.size,
              borderRadius: "999px",
              opacity: interpolate(localFrame, [0, 30, 140, 190], [0, 0.76, 0.58, 0]),
              scale: interpolate(localFrame, [0, 95, 190], [0.6, 1.25, 0.9]),
              translate: `${interpolate(localFrame, [0, 190], [0, -24])}px ${interpolate(localFrame, [0, 190], [22, -64])}px`,
              background:
                "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.96), rgba(255,255,255,0.18) 32%, rgba(34,211,238,0.3) 56%, rgba(236,72,153,0.2) 78%, transparent 100%)",
              border: "1px solid rgba(255,255,255,0.42)",
              boxShadow: "0 0 20px rgba(34,211,238,0.48), inset 0 0 12px rgba(255,255,255,0.38)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
}

export function EventCinematic() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState({ width: 1920, height: 760 });

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    const updateSize = () => {
      const rect = stage.getBoundingClientRect();

      setStageSize({
        width: Math.max(320, Math.round(rect.width)),
        height: Math.max(520, Math.round(rect.height)),
      });
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(stage);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="portal-cinematic" ref={stageRef}>
      <Player
        component={CinematicComposition}
        durationInFrames={260}
        compositionWidth={stageSize.width}
        compositionHeight={stageSize.height}
        fps={30}
        autoPlay
        loop
        acknowledgeRemotionLicense
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
