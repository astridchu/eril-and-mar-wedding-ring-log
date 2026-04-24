"use client";

import type { SessionName } from "@/lib/types";
import { ScreenLayers } from "./ScreenLayers";

interface CoverScreenProps {
  session: SessionName;
  onStart: () => void;
}

export function CoverScreen({ session, onStart }: CoverScreenProps) {
  const name = session === "eril" ? "Eril" : "Mar";

  return (
    <div className="page-frame" style={{ cursor: "pointer" }} onClick={onStart}>
      {/* Same background variant as question pages */}
      <ScreenLayers
        variant="cover-page"
        bg="/assets/mc-bg.jpg"
        mid="/assets/mc-mid.jpg"
        fg="/assets/mc-fg.png"
      />

      {/* Name — top: 333px */}
      <p
        style={{
          position: "absolute",
          top: 333,
          left: "50%",
          transform: "translateX(-50%)",
          width: 452,
          fontFamily: "var(--font-typewriter)",
          fontSize: 16,
          letterSpacing: "4.8px",
          lineHeight: "36px",
          color: "#eae9da",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        {name}
      </p>

      {/* "wedding ring log" — top: 403px */}
      <p
        style={{
          position: "absolute",
          top: 403,
          left: "50%",
          transform: "translateX(-50%)",
          width: 452,
          fontFamily: "var(--font-typewriter)",
          fontSize: 16,
          letterSpacing: "4.8px",
          lineHeight: "36px",
          color: "#eae9da",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        wedding ring log
      </p>

      {/* "2026" — top: 473px */}
      <p
        style={{
          position: "absolute",
          top: 473,
          left: "50%",
          transform: "translateX(-50%)",
          width: 142,
          fontFamily: "var(--font-typewriter)",
          fontSize: 16,
          letterSpacing: "4.8px",
          lineHeight: "36px",
          color: "#eae9da",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        2026
      </p>

      {/* "tap to start" — top: 659px, blinking */}
      <p
        className="blink"
        style={{
          position: "absolute",
          top: 659,
          left: "50%",
          transform: "translateX(-50%)",
          width: 149,
          fontFamily: "var(--font-aquifer)",
          fontSize: 16,
          lineHeight: "20px",
          color: "#ccc654",
          textAlign: "center",
        }}
      >
        tap to start
      </p>
    </div>
  );
}
