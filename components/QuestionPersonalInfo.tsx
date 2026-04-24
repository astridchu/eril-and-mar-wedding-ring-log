"use client";

import { useState } from "react";
import type { SessionName, Answer } from "@/lib/types";
import { ScreenLayers } from "./ScreenLayers";
import { QuestionHeader } from "./QuestionHeader";

interface Props {
  session: SessionName;
  questionIndex: number;
  answer: Answer | undefined;
  onAnswer: (answer: Answer) => void;
  onNext: () => void;
}

export function QuestionPersonalInfo({ session, questionIndex, answer, onAnswer, onNext }: Props) {
  const [place, setPlace]         = useState(answer?.extras?.place ?? "");
  const [birthdate, setBirthdate] = useState(answer?.extras?.birthdate ?? "");
  const [babyWord, setBabyWord]   = useState(answer?.extras?.babyWord ?? "");

  const babyName = session === "eril" ? "Eril" : "Mar";

  function push(p: string, b: string, w: string) {
    onAnswer({
      questionId: "q0",
      value: `${p} · ${b} · ${w}`,
      extras: { place: p, birthdate: b, babyWord: w },
    });
  }

  return (
    <div className="page-frame">
      <ScreenLayers
        variant="question"
        bg="/assets/mc-bg.jpg"
        mid="/assets/mc-mid.jpg"
        fg="/assets/mc-fg.png"
      />

      <QuestionHeader session={session} questionIndex={questionIndex} />

      {/* Content — top 289px, left 56px, width 404px */}
      <div
        style={{
          position: "absolute",
          top: 289,
          left: 56,
          width: 404,
          display: "flex",
          flexDirection: "column",
          gap: 17,
          fontFamily: "var(--font-aquifer)",
          fontSize: 16,
          lineHeight: "20px",
        }}
      >
        {/* Question number */}
        <p style={{ color: "#ccc654" }}>Question 01</p>

        {/* Question text */}
        <p style={{ color: "#eae9da", marginBottom: 24 }}>
          Let's start with your birth.
        </p>

        {/* Place of birth */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <label
            style={{
              fontFamily: "var(--font-typewriter)",
              fontSize: 11,
              letterSpacing: "3.6px",
              color: "#838275",
            }}
          >
            place of birth
          </label>
          <input
            className="input-bare"
            type="text"
            placeholder="e.g. Paris, France"
            value={place}
            onChange={(e) => { setPlace(e.target.value); push(e.target.value, birthdate, babyWord); }}
            style={{ paddingBottom: 6 }}
          />
        </div>

        {/* Birthdate */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24 }}>
          <label
            style={{
              fontFamily: "var(--font-typewriter)",
              fontSize: 11,
              letterSpacing: "3.6px",
              color: "#838275",
            }}
          >
            date of birth
          </label>
          <input
            className="input-bare"
            type="text"
            placeholder="e.g. 15 March 1983"
            value={birthdate}
            onChange={(e) => { setBirthdate(e.target.value); push(place, e.target.value, babyWord); }}
            style={{ paddingBottom: 6 }}
          />
        </div>

        {/* One word that describes baby */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24 }}>
          <label
            style={{
              fontFamily: "var(--font-typewriter)",
              fontSize: 11,
              letterSpacing: "3.6px",
              color: "#838275",
            }}
          >
            one word that describes baby {babyName}
          </label>
          <input
            className="input-bare"
            type="text"
            placeholder=""
            value={babyWord}
            onChange={(e) => { setBabyWord(e.target.value); push(place, birthdate, e.target.value); }}
            style={{ paddingBottom: 6 }}
          />
        </div>
      </div>

      {/* Nav — no prev on first question */}
      <button
        onClick={onNext}
        style={{
          position: "absolute",
          top: 788,
          right: 27.5,
          background: "none",
          border: "none",
          fontFamily: "var(--font-typewriter)",
          fontSize: 12,
          letterSpacing: "3.6px",
          lineHeight: "36px",
          color: "#eae9da",
          cursor: "pointer",
          padding: 0,
        }}
      >
        next
      </button>
    </div>
  );
}
