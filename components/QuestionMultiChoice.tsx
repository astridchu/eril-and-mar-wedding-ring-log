"use client";

import type { SessionName, Question, Answer } from "@/lib/types";
import { ScreenLayers } from "./ScreenLayers";
import { QuestionHeader } from "./QuestionHeader";

interface Props {
  session: SessionName;
  question: Question;
  questionIndex: number;
  answer: Answer | undefined;
  onAnswer: (answer: Answer) => void;
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function QuestionMultiChoice({
  session,
  question,
  questionIndex,
  answer,
  onAnswer,
  onPrev,
  onNext,
  isFirst,
}: Props) {
  const selected = answer?.value as string | undefined;

  return (
    <div className="page-frame">
      <ScreenLayers
        variant="question"
        bg="/assets/mc-bg.jpg"
        mid="/assets/mc-mid.jpg"
        fg="/assets/mc-fg.png"
      />

      <QuestionHeader session={session} questionIndex={questionIndex} />

      {/* Content area — Figma: top 289px, left 56px, width 404px */}
      <div
        style={{
          position: "absolute",
          top: 289,
          left: 56,
          width: 404,
          display: "flex",
          flexDirection: "column",
          gap: 70,
          fontFamily: "var(--font-aquifer)",
          fontSize: 16,
          lineHeight: "20px",
        }}
      >
        {/* Question label + text block — gap 17px */}
        <div style={{ display: "flex", flexDirection: "column", gap: 17 }}>
          <p style={{ color: "#ccc654" }}>Question {question.number}</p>
          <p style={{ color: "#eae9da" }}>{question.text}</p>
        </div>

        {/* Options list — gap 30px */}
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          {question.options?.map((option) => {
            const active = selected === option;
            return (
              <button
                key={option}
                onClick={() => onAnswer({ questionId: question.id, value: option })}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  textAlign: "left",
                  fontFamily: "var(--font-aquifer)",
                  fontSize: 16,
                  lineHeight: "20px",
                  color: active ? "#ccc654" : "#eae9da",
                  cursor: "pointer",
                  transition: "color 0.15s",
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* Nav — Figma: top 788px */}
      {/* prev — left 27.5px */}
      {!isFirst && (
        <button
          onClick={onPrev}
          style={{
            position: "absolute",
            top: 788,
            left: 27.5,
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
          prev
        </button>
      )}

      {/* next — right-aligned in 54px container at left ~541px */}
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
