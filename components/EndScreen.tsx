"use client";

import type { SessionName } from "@/lib/types";
import { ScreenLayers } from "./ScreenLayers";

interface EndScreenProps {
  session: SessionName;
  onSubmit: () => void;
}

export function EndScreen({ session, onSubmit }: EndScreenProps) {
  const displayName = session === "eril" ? "Eril" : "Mar";

  return (
    <div className="page-frame" style={{ cursor: "pointer" }} onClick={onSubmit}>
      <ScreenLayers
        variant="cover"
        bg="/assets/end-bg.jpg"
        mid="/assets/end-mid.jpg"
        fg="/assets/end-fg.png"
      />

      {/* "fin" — Figma: top 331px, center, 452px wide */}
      <p
        style={{
          position: "absolute",
          top: 331,
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
        fin
      </p>

      {/* "Well done." + message — Figma: top 402px, center, 297px wide */}
      <div
        style={{
          position: "absolute",
          top: 402,
          left: "50%",
          transform: "translateX(-50%)",
          width: 297,
          fontFamily: "var(--font-typewriter)",
          fontSize: 12,
          letterSpacing: "3.6px",
          color: "#eae9da",
          textAlign: "center",
          lineHeight: 0,
          pointerEvents: "none",
        }}
      >
        <p style={{ lineHeight: "36px", marginBottom: 0 }}>Well done, {displayName}.</p>
        <p style={{ lineHeight: "36px" }}>Astrid will reach out to you for the next step.</p>
      </div>

      {/* "tap to submit" — Figma: top 659px, center, 149px wide, blinking */}
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
        tap to submit
      </p>
    </div>
  );
}
