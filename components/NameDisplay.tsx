"use client";

import type { SessionName } from "@/lib/types";

interface NameDisplayProps {
  session: SessionName;
  size?: "sm" | "lg";
  className?: string;
}

/**
 * Renders "Eril & Mar" with the active person in cream (#eae9da)
 * and the other in muted (#838275), per the Global Design Rule.
 */
export function NameDisplay({ session, size = "sm", className = "" }: NameDisplayProps) {
  const cream = "#eae9da";
  const muted = "#838275";

  const erilColor = session === "eril" ? cream : muted;
  const marColor  = session === "mar"  ? cream : muted;

  if (size === "lg") {
    return (
      <span className={className}>
        <span style={{ color: erilColor }}>Eril</span>
        <span style={{ color: session === "eril" ? muted : cream }}>{" & "}</span>
        <span style={{ color: marColor }}>Mar</span>
      </span>
    );
  }

  // Header size: "Eril & Mar • wedding ring log"
  return (
    <span className={className}>
      <span style={{ color: erilColor }}>Eril</span>
      <span style={{ color: muted }}>{" & "}</span>
      <span style={{ color: marColor }}>Mar</span>
    </span>
  );
}
