"use client";

import type { SessionName } from "@/lib/types";
import { TOTAL_QUESTIONS } from "@/lib/questions";

interface QuestionHeaderProps {
  session: SessionName;
  questionIndex: number;
}

export function QuestionHeader({ session, questionIndex }: QuestionHeaderProps) {
  const name    = session === "eril" ? "Eril" : "Mar";
  const current = String(questionIndex + 1).padStart(2, "0");
  const total   = String(TOTAL_QUESTIONS).padStart(2, "0");

  return (
    <>
      {/* Header — "[Name] • wedding ring log" left, "2026" right */}
      <div
        style={{
          position: "absolute",
          top: 18,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 34,
          fontFamily: "var(--font-typewriter)",
          fontSize: 12,
          letterSpacing: "3.6px",
          lineHeight: "36px",
          color: "#eae9da",
          whiteSpace: "nowrap",
        }}
      >
        <p style={{ width: 452, flexShrink: 0 }}>
          {name}{" • wedding ring log"}
        </p>
        <p style={{ width: 54, flexShrink: 0, textAlign: "right" }}>
          2026
        </p>
      </div>

      {/* Page counter — centered at nav row */}
      <p
        style={{
          position: "absolute",
          top: 788,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-typewriter)",
          fontSize: 12,
          letterSpacing: "3.6px",
          lineHeight: "36px",
          color: "#838275",
          whiteSpace: "nowrap",
        }}
      >
        {current} / {total}
      </p>
    </>
  );
}
