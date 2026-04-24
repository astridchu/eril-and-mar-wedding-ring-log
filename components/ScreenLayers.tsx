"use client";

/**
 * Shared layered background for all screens.
 *
 * Layout variants:
 *   "cover"      – End screen:          mid left -55.73%  top -32.09%
 *   "question"   – Question screens:    mid left -70.69%  top -163.88%
 *   "cover-page" – Cover/tap-to-start:  mid left -20.00%  top -60.00%
 *   "selector"   – Session selector:    mid left -40.00%  top  10.00%
 */

type LayerVariant = "cover" | "question" | "cover-page" | "selector";

const MID: Record<LayerVariant, { left: string; top: string }> = {
  cover:       { left: "-55.73%", top: "-32.09%"  },
  question:    { left: "-70.69%", top: "-163.88%" },
  "cover-page":{ left: "-20.00%", top: "-60.00%"  },
  selector:    { left: "-40.00%", top:  "10.00%"  },
};

interface Props {
  variant: LayerVariant;
  bg: string;
  mid: string;
  fg: string;
  /** 0–1, default 1.0 */
  fgOpacity?: number;
}

export function ScreenLayers({ variant, bg, mid, fg, fgOpacity = 1.0 }: Props) {
  const { left, top } = MID[variant];

  return (
    <>
      {/* 1 — Background */}
      <div style={{ position: "absolute", inset: 0, background: "#1e1e17" }}>
        <img
          alt=""
          src={bg}
          style={{
            position: "absolute",
            inset: 0,
            objectFit: "cover",
            objectPosition: "center bottom",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            maxWidth: "none",
          }}
        />
        {/* Dark fade at bottom so lighter parts of bg image are suppressed */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(to bottom, transparent, #1a1a12cc 60%, #1a1a12)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* 2 — Middle shadow image rotated 180° */}
      <div
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <div style={{ flexShrink: 0, transform: "rotate(180deg)", width: "100%", height: "100%" }}>
          <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
            <img
              alt=""
              src={mid}
              style={{
                position: "absolute",
                height: "327.64%",
                width: "308.61%",
                left,
                top,
                maxWidth: "none",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* 3 — Foreground grain overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          opacity: fgOpacity,
        }}
      >
        <img
          alt=""
          src={fg}
          style={{
            position: "absolute",
            height: "100.08%",
            width: "100%",
            left: 0,
            top: "-0.04%",
            maxWidth: "none",
            pointerEvents: "none",
            filter: "brightness(0.75)",
          }}
        />
      </div>
    </>
  );
}
