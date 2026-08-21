"use client";

import { Player } from "@remotion/player";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

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
  const pulse = interpolate(frame % 160, [0, 80, 160], [0, 1, 0]);
  const slowDrift = interpolate(frame % 260, [0, 130, 260], [-18, 18, -18]);
  const posterIn = interpolate(frame, [18, 48], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleIn = interpolate(frame, [38, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const priceIn = interpolate(frame, [72, 104], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#070008", overflow: "hidden", fontFamily: "Arial, sans-serif" }}>
      <Img
        src={staticFile("event-assets/Checkusout.png")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale: interpolate(frame % 300, [0, 150, 300], [1.04, 1.12, 1.04]),
          filter: "saturate(1.18) contrast(1.06)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.54) 42%, rgba(0,0,0,0.16) 100%), radial-gradient(circle at 18% 26%, rgba(236,72,153,0.46), transparent 30%), radial-gradient(circle at 82% 12%, rgba(34,211,238,0.34), transparent 28%)",
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
        src={staticFile("event-assets/flyer1.jpeg")}
        style={{
          position: "absolute",
          right: "7%",
          top: "6%",
          width: "24%",
          border: "2px solid rgba(255,255,255,0.72)",
          boxShadow: "0 32px 90px rgba(0,0,0,0.72), 0 0 42px rgba(236,72,153,0.38)",
          opacity: posterIn,
          scale: 0.9 + posterIn * 0.1,
          rotate: `${-3 + posterIn * 1.5}deg`,
        }}
      />

      <Img
        src={staticFile("event-assets/onvibeeventstour.png")}
        style={{
          position: "absolute",
          left: "8%",
          top: "7%",
          width: "28%",
          opacity: 0.85,
          transform: `translateY(${slowDrift * 0.2}px)`,
          filter: "drop-shadow(0 0 28px rgba(34,211,238,0.34))",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "9%",
          top: "26%",
          maxWidth: "56%",
          opacity: titleIn,
          transform: `translateY(${(1 - titleIn) * 28}px)`,
        }}
      >
        <div style={{ color: "#facc15", fontSize: 22, fontWeight: 900, letterSpacing: 6, textTransform: "uppercase" }}>
          Tennessee Community Tour
        </div>
        <div style={{ marginTop: 14, color: "#ec4899", fontSize: 92, fontWeight: 950, lineHeight: 0.86, textTransform: "uppercase" }}>
          Free Bikini
        </div>
        <div style={{ color: "#ffffff", fontSize: 90, fontWeight: 950, lineHeight: 0.9, textTransform: "uppercase" }}>
          Car Wash
        </div>
        <div style={{ marginTop: 20, color: "#22d3ee", fontSize: 30, fontWeight: 900, textTransform: "uppercase" }}>
          Hendersonville. September 12. 12PM to 4PM.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: "9%",
          bottom: "8%",
          display: "flex",
          gap: 16,
          opacity: priceIn,
          transform: `translateY(${(1 - priceIn) * 20}px)`,
        }}
      >
        {[
          ["event-assets/onvibe_20_crossed_out.png", "20"],
          ["event-assets/onvibe_10_crossed_out.png", "10"],
          ["event-assets/onvibe_0_free.png", "0"],
        ].map(([src, key]) => (
          <Img
            key={key}
            src={staticFile(src)}
            style={{
              width: key === "0" ? 210 : 170,
              filter: key === "0" ? "drop-shadow(0 0 34px rgba(236,72,153,0.74))" : "drop-shadow(0 0 18px rgba(0,0,0,0.7))",
            }}
          />
        ))}
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
  return (
    <div className="portal-cinematic">
      <Player
        component={CinematicComposition}
        durationInFrames={260}
        compositionWidth={1920}
        compositionHeight={760}
        fps={30}
        autoPlay
        loop
        acknowledgeRemotionLicense
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
