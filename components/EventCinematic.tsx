"use client";

import { Player } from "@remotion/player";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

function CinematicComposition() {
  const frame = useCurrentFrame();
  const heroScale = interpolate(frame % 260, [0, 130, 260], [1.05, 1.12, 1.05]);
  const soapX = interpolate(frame % 210, [0, 210], [-58, 112]);
  const soapY = interpolate(frame % 210, [0, 105, 210], [62, 46, 62]);
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
      <Img
        src={staticFile("event-assets/soapandsuds.png")}
        style={{
          position: "absolute",
          left: `${soapX}%`,
          top: `${soapY}%`,
          width: "68%",
          opacity: 0.92,
          rotate: "-8deg",
          filter: "drop-shadow(0 0 34px rgba(6,182,212,0.55))",
        }}
      />
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
