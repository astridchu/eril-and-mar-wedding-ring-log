"use client";

export function CreditScreen() {
  return (
    <div className="page-frame" style={{ overflow: "hidden" }}>

      {/* 1 — Background (full cover) — Figma: 595×842 */}
      <div style={{ position: "absolute", height: 842, left: 0, top: 0, width: 595 }}>
        <img
          alt=""
          src="/assets/credit-bg.jpg"
          style={{
            position: "absolute",
            inset: 0,
            objectFit: "cover",
            width: "100%",
            height: "100%",
            maxWidth: "none",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* 2 — Flower photo — Figma: h 932px, left -60px, top -87px, w 716px */}
      <div
        style={{
          position: "absolute",
          height: 932,
          width: 716,
          left: -60,
          top: -87,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <img
          alt=""
          src="/assets/credit-flower.jpg"
          style={{
            position: "absolute",
            height: "115.2%",
            width: "100%",
            left: 0,
            top: "-15.19%",
            maxWidth: "none",
          }}
        />
      </div>

      {/* 3 — Foreground overlay — Figma: 595×842, object-cover */}
      <div style={{ position: "absolute", height: 842, left: 0, top: 0, width: 595 }}>
        <img
          alt=""
          src="/assets/credit-fg.png"
          style={{
            position: "absolute",
            inset: 0,
            objectFit: "cover",
            width: "100%",
            height: "100%",
            maxWidth: "none",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* 4a — Logo wordmark — Figma: h 29px, left 43px, top 738px, w 152px */}
      <div
        style={{
          position: "absolute",
          height: 29,
          width: 152,
          left: 43,
          top: 738,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <img
          alt="Sang Jiwa Productions"
          src="/assets/sangjiwa-logo.png"
          style={{
            position: "absolute",
            height: "133.33%",
            width: "100.6%",
            left: "-0.3%",
            top: 0,
            maxWidth: "none",
          }}
        />
      </div>

      {/* 4b — "PRODUCTIONS" portion — Figma: h 12px, left 185px, top 750px, w 189px */}
      <div
        style={{
          position: "absolute",
          height: 12,
          width: 189,
          left: 185,
          top: 750,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <img
          alt=""
          src="/assets/sangjiwa-logo.png"
          style={{
            position: "absolute",
            height: "400%",
            width: "100.6%",
            left: "-0.3%",
            top: "-300%",
            maxWidth: "none",
          }}
        />
      </div>

      {/* "2026" — Figma: left calc(50%-254.5px) = 43px, top 773px */}
      <p
        style={{
          position: "absolute",
          top: 773,
          left: 43,
          fontFamily: "var(--font-typewriter)",
          fontSize: 12,
          letterSpacing: "3.6px",
          lineHeight: "25px",
          color: "#040707",
        }}
      >
        2026
      </p>
    </div>
  );
}
