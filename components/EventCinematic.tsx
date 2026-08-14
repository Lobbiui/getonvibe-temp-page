"use client";

import { Player } from "@remotion/player";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

function CinematicComposition() {
  const frame = useCurrentFrame();
  const drift = interpolate(frame % 240, [0, 120, 240], [-4, 4, -4]);
  const flyerScale = interpolate(frame % 240, [0, 120, 240], [1.02, 1.08, 1.02]);
  const sweep = interpolate(frame % 180, [0, 180], [-40, 140]);

  return (
    <AbsoluteFill style={{ background: "#050008", overflow: "hidden", fontFamily: "Arial, sans-serif" }}>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.46) 42%, rgba(0,0,0,0.25) 100%), radial-gradient(circle at 18% 18%, rgba(236,72,153,0.45), transparent 28%), radial-gradient(circle at 82% 22%, rgba(6,182,212,0.35), transparent 28%), linear-gradient(135deg, #050008 0%, #111827 52%, #050008 100%)",
        }}
      />
      <Img
        src={staticFile("events/flyer1.jpeg")}
        style={{
          position: "absolute",
          right: "-5%",
          top: "-24%",
          width: "47%",
          minWidth: 460,
          scale: flyerScale,
          rotate: "3deg",
          opacity: 0.92,
          boxShadow: "0 0 90px rgba(236,72,153,0.34)",
        }}
      />
      <Img
        src={staticFile("events/flyer2.jpeg")}
        style={{
          position: "absolute",
          right: "28%",
          bottom: "-30%",
          width: "34%",
          minWidth: 330,
          scale: 1.02,
          rotate: "-5deg",
          opacity: 0.38,
          boxShadow: "0 0 80px rgba(6,182,212,0.24)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${sweep}%`,
          top: "-15%",
          width: "24%",
          height: "130%",
          transform: "rotate(16deg)",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
          filter: "blur(10px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "8%",
          top: 0,
          bottom: 0,
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          translate: `${drift}px 0`,
        }}
      >
        <div
          style={{
            color: "#facc15",
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: 5,
            textTransform: "uppercase",
          }}
        >
          ONVIBE Events Presents
        </div>
        <div
          style={{
            marginTop: 12,
            color: "#ec4899",
            fontSize: 74,
            lineHeight: 0.92,
            fontWeight: 900,
            textTransform: "uppercase",
          }}
        >
          Bikini
        </div>
        <div
          style={{
            color: "#ffffff",
            fontSize: 68,
            lineHeight: 0.92,
            fontWeight: 900,
            textTransform: "uppercase",
          }}
        >
          Carwash
        </div>
        <div
          style={{
            marginTop: 20,
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            color: "#ffffff",
            fontSize: 18,
            fontWeight: 900,
            textTransform: "uppercase",
          }}
        >
          {["September 12", "12PM to 4PM", "Smokeville"].map((item) => (
            <span
              key={item}
              style={{
                border: "1px solid rgba(255,255,255,0.72)",
                padding: "10px 14px",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export function EventCinematic({ variant = "wide" }: { variant?: "wide" | "square" }) {
  const isSquare = variant === "square";

  return (
    <div className={isSquare ? "event-cinematic event-cinematic-square" : "event-cinematic event-cinematic-wide"}>
      <Player
        component={CinematicComposition}
        durationInFrames={240}
        compositionWidth={isSquare ? 1080 : 1280}
        compositionHeight={isSquare ? 1080 : 720}
        fps={30}
        autoPlay
        loop
        acknowledgeRemotionLicense
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
