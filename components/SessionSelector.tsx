"use client";

import type { SessionName } from "@/lib/types";
import { ScreenLayers } from "./ScreenLayers";

interface SessionSelectorProps {
  onSelect: (name: SessionName) => void;
}

export function SessionSelector({ onSelect }: SessionSelectorProps) {
  return (
    <div className="page-frame">
      <ScreenLayers
        variant="cover-page"
        bg="/assets/mc-bg.jpg"
        mid="/assets/mc-mid.jpg"
        fg="/assets/mc-fg.png"
      />

      {/* "who are you?" */}
      <p
        style={{
          position: "absolute",
          top: 403,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-typewriter)",
          fontSize: 12,
          letterSpacing: "3.6px",
          lineHeight: "36px",
          color: "#eae9da",
          whiteSpace: "nowrap",
        }}
      >
        who are you?
      </p>

      {/* Name buttons */}
      <div
        style={{
          position: "absolute",
          top: 490,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 80,
        }}
      >
        {(["eril", "mar"] as SessionName[]).map((name) => (
          <button
            key={name}
            onClick={() => onSelect(name)}
            style={{
              background: "none",
              border: "none",
              fontFamily: "var(--font-aquifer)",
              fontSize: 32,
              color: "#eae9da",
              letterSpacing: "2px",
              cursor: "pointer",
              padding: "8px 0",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#ccc654")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#eae9da")}
          >
            {name === "eril" ? "Eril" : "Mar"}
          </button>
        ))}
      </div>
    </div>
  );
}
