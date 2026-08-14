"use client";

import { Player } from "@remotion/player";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

const bubbles = [
  { left: 58, top: 45, size: 42, delay: 0, drift: -18 },
  { left: 66, top: 50, size: 28, delay: 18, drift: -22 },
  { left: 74, top: 39, size: 58, delay: 36, drift: -16 },
  { left: 83, top: 51, size: 34, delay: 54, drift: -24 },
  { left: 62, top: 62, size: 22, delay: 72, drift: -14 },
  { left: 71, top: 66, size: 46, delay: 90, drift: -20 },
  { left: 80, top: 64, size: 26, delay: 108, drift: -18 },
  { left: 88, top: 42, size: 38, delay: 126, drift: -26 },
  { left: 55, top: 56, size: 24, delay: 144, drift: -18 },
  { left: 92, top: 58, size: 20, delay: 162, drift: -16 },
];

const foamPatches = [
  { left: 54, top: 58, width: 22, delay: 0, rotate: -6 },
  { left: 66, top: 54, width: 26, delay: 42, rotate: 8 },
  { left: 76, top: 60, width: 20, delay: 84, rotate: -12 },
];

function CinematicComposition() {
  const frame = useCurrentFrame();
  const heroScale = interpolate(frame % 260, [0, 130, 260], [1.05, 1.12, 1.05]);
  const priceOne = interpolate(frame, [8, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const priceTwo = interpolate(frame, [34, 52], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const priceFree = interpolate(frame, [60, 82], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const flash = interpolate(frame % 150, [0, 75, 150], [0, 1, 0]);

  return (
    <AbsoluteFill style={{ background: "#050008", overflow: "hidden", fontFamily: "Arial, sans-serif" }}>
      <Img
        src={staticFile("event-assets/Checkusout.png")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale: heroScale,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 42%, rgba(0,0,0,0.1) 100%), radial-gradient(circle at 20% 20%, rgba(236,72,153,0.4), transparent 32%), radial-gradient(circle at 78% 70%, rgba(6,182,212,0.32), transparent 30%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: flash * 0.22,
          background: "linear-gradient(105deg, transparent 25%, #ffffff 48%, transparent 68%)",
        }}
      />
      {foamPatches.map((patch) => {
        const localFrame = (frame + patch.delay) % 160;

        return (
          <Img
            key={`${patch.left}-${patch.top}`}
            src={staticFile("event-assets/soapandsuds.png")}
            style={{
              position: "absolute",
              left: `${patch.left}%`,
              top: `${patch.top}%`,
              width: `${patch.width}%`,
              opacity: interpolate(localFrame, [0, 42, 120, 160], [0.12, 0.76, 0.58, 0.12]),
              scale: interpolate(localFrame, [0, 80, 160], [0.88, 1.08, 0.94]),
              translate: `${interpolate(localFrame, [0, 160], [0, -18])}px ${interpolate(localFrame, [0, 80, 160], [8, -8, 8])}px`,
              rotate: `${patch.rotate}deg`,
              filter: "drop-shadow(0 0 28px rgba(6,182,212,0.4))",
            }}
          />
        );
      })}
      {bubbles.map((bubble) => {
        const localFrame = (frame + bubble.delay) % 180;

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
              opacity: interpolate(localFrame, [0, 24, 132, 180], [0, 0.86, 0.7, 0]),
              scale: interpolate(localFrame, [0, 90, 180], [0.68, 1.18, 0.82]),
              translate: `${interpolate(localFrame, [0, 180], [0, bubble.drift])}px ${interpolate(localFrame, [0, 180], [12, -42])}px`,
              background:
                "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.96), rgba(255,255,255,0.2) 28%, rgba(34,211,238,0.26) 54%, rgba(236,72,153,0.18) 76%, transparent 100%)",
              border: "1px solid rgba(255,255,255,0.42)",
              boxShadow: "0 0 18px rgba(34,211,238,0.48), inset 0 0 12px rgba(255,255,255,0.38)",
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          left: "6%",
          top: "12%",
          width: "46%",
        }}
      >
        <div style={{ color: "#22d3ee", fontSize: 20, fontWeight: 900, letterSpacing: 5, textTransform: "uppercase" }}>
          Tennessee Community Tour
        </div>
        <div style={{ marginTop: 16, color: "#ec4899", fontSize: 88, fontWeight: 900, lineHeight: 0.9, textTransform: "uppercase" }}>
          Free Bikini
        </div>
        <div style={{ color: "#ffffff", fontSize: 82, fontWeight: 900, lineHeight: 0.9, textTransform: "uppercase" }}>
          Car Wash
        </div>
        <div style={{ marginTop: 22, display: "flex", gap: 12, flexWrap: "wrap" }}>
          {["Food Trucks", "Music", "Brands", "Good Vibes"].map((item) => (
            <span
              key={item}
              style={{
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.72)",
                padding: "10px 14px",
                fontSize: 16,
                fontWeight: 900,
                textTransform: "uppercase",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <Img
        src={staticFile("event-assets/onvibe_20_crossed_out.png")}
        style={{
          position: "absolute",
          left: "7%",
          bottom: "7%",
          width: "19%",
          opacity: priceOne,
          scale: priceOne,
        }}
      />
      <Img
        src={staticFile("event-assets/onvibe_10_crossed_out.png")}
        style={{
          position: "absolute",
          left: "28%",
          bottom: "7%",
          width: "19%",
          opacity: priceTwo,
          scale: priceTwo,
        }}
      />
      <Img
        src={staticFile("event-assets/onvibe_0_free.png")}
        style={{
          position: "absolute",
          left: "49%",
          bottom: "4%",
          width: "25%",
          opacity: priceFree,
          scale: priceFree,
          filter: "drop-shadow(0 0 42px rgba(236,72,153,0.72))",
        }}
      />
    </AbsoluteFill>
  );
}

export function EventCinematic() {
  return (
    <div className="event-cinematic-full">
      <Player
        component={CinematicComposition}
        durationInFrames={260}
        compositionWidth={1536}
        compositionHeight={864}
        fps={30}
        autoPlay
        loop
        acknowledgeRemotionLicense
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
