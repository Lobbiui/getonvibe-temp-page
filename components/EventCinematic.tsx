"use client";

import { Player } from "@remotion/player";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

function CinematicComposition() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pulse = Math.sin(frame / 9);
  const flyerOne = interpolate(frame, [0, 70, 140, 210], [1, 1.05, 0.98, 1.04]);
  const flyerTwo = interpolate(frame, [0, 90, 160, 240], [1.06, 0.98, 1.04, 1]);
  const titleIn = spring({ frame, fps, config: { damping: 18, stiffness: 90 } });
  const sweep = interpolate(frame % 180, [0, 180], [-35, 135]);

  return (
    <AbsoluteFill style={{ background: "#050008", overflow: "hidden", fontFamily: "Arial, sans-serif" }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(236,72,153,0.45), transparent 30%), radial-gradient(circle at 80% 15%, rgba(6,182,212,0.35), transparent 28%), linear-gradient(135deg, #050008 0%, #111827 52%, #050008 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          opacity: 0.45,
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

      <Img
        src="/events/flyer1.jpeg"
        style={{
          position: "absolute",
          right: "8%",
          top: "8%",
          width: "33%",
          borderRadius: 20,
          transform: `rotate(5deg) scale(${flyerOne})`,
          boxShadow: "0 0 70px rgba(236,72,153,0.42)",
        }}
      />
      <Img
        src="/events/flyer2.jpeg"
        style={{
          position: "absolute",
          left: "8%",
          bottom: "8%",
          width: "31%",
          borderRadius: 20,
          transform: `rotate(-6deg) scale(${flyerTwo})`,
          boxShadow: "0 0 70px rgba(6,182,212,0.34)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: "0 12%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          transform: `translateY(${(1 - titleIn) * 45}px)`,
          opacity: titleIn,
        }}
      >
        <div
          style={{
            color: "#facc15",
            fontSize: 34,
            fontWeight: 900,
            letterSpacing: 7,
            textTransform: "uppercase",
            textShadow: "0 0 28px rgba(250,204,21,0.42)",
          }}
        >
          ONVIBE Events Presents
        </div>
        <div
          style={{
            marginTop: 12,
            color: "#ec4899",
            fontSize: 102,
            lineHeight: 0.9,
            fontWeight: 900,
            textTransform: "uppercase",
            textShadow: `0 0 ${32 + pulse * 10}px rgba(236,72,153,0.85)`,
          }}
        >
          Bikini
        </div>
        <div
          style={{
            color: "#ffffff",
            fontSize: 92,
            lineHeight: 0.9,
            fontWeight: 900,
            textTransform: "uppercase",
            textShadow: "0 0 30px rgba(6,182,212,0.65)",
          }}
        >
          Carwash
        </div>
        <div
          style={{
            marginTop: 24,
            display: "flex",
            gap: 14,
            color: "#020617",
            fontSize: 24,
            fontWeight: 900,
            textTransform: "uppercase",
          }}
        >
          {["Food Trucks", "Music", "Free Carwash", "12PM to 4PM"].map((item) => (
            <span
              key={item}
              style={{
                background: item === "Free Carwash" ? "#ec4899" : "#06b6d4",
                borderRadius: 999,
                padding: "12px 18px",
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

export function EventCinematic() {
  return (
    <div className="overflow-hidden rounded-lg border border-pink-400/30 bg-black shadow-[0_0_60px_rgba(236,72,153,0.18)]">
      <Player
        component={CinematicComposition}
        durationInFrames={240}
        compositionWidth={1280}
        compositionHeight={720}
        fps={30}
        autoPlay
        loop
        acknowledgeRemotionLicense
        style={{ width: "100%", aspectRatio: "16 / 9" }}
      />
    </div>
  );
}
