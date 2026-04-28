"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SessionName, SessionData, Answer } from "@/lib/types";
import { QUESTIONS, resolveQuestion } from "@/lib/questions";
import { loadSession, saveSession, upsertAnswer } from "@/lib/storage";
import { exportSession, downloadPreferencesJson } from "@/lib/export";

import { SessionSelector } from "@/components/SessionSelector";
import { CoverScreen } from "@/components/CoverScreen";
import { QuestionMultiChoice } from "@/components/QuestionMultiChoice";
import { QuestionFreeAnswer } from "@/components/QuestionFreeAnswer";
import { QuestionPersonalInfo } from "@/components/QuestionPersonalInfo";
import { EndScreen } from "@/components/EndScreen";
import { CreditScreen } from "@/components/CreditScreen";

type Screen = "session-selector" | "cover" | "question" | "end" | "credit";

const FADE_MS = 600;

export default function Home() {
  const [screen, setScreen]             = useState<Screen>("session-selector");
  const [session, setSession]           = useState<SessionName | null>(null);
  const [sessionData, setSessionData]   = useState<SessionData | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [visible, setVisible]           = useState(true);
  const [submitting, setSubmitting]     = useState(false);
  const lock = useRef(false);

  useEffect(() => {
    if (session) setSessionData(loadSession(session));
  }, [session]);

  useEffect(() => {
    if (sessionData) saveSession(sessionData);
  }, [sessionData]);

  function fade(next: () => void) {
    if (lock.current) return;
    lock.current = true;
    setVisible(false);
    setTimeout(() => {
      next();
      setVisible(true);
      lock.current = false;
    }, FADE_MS);
  }

  function handleSelectSession(name: SessionName) {
    fade(() => { setSession(name); setScreen("cover"); });
  }

  function handleStart() {
    fade(() => { setQuestionIndex(0); setScreen("question"); });
  }

  function handleAnswer(answer: Answer) {
    setSessionData((prev) => prev ? upsertAnswer(prev, answer) : prev);
  }

  function handlePrev() {
    if (questionIndex === 0) {
      fade(() => setScreen("cover"));
    } else {
      fade(() => setQuestionIndex((i) => i - 1));
    }
  }

  function handleNext() {
    if (questionIndex < QUESTIONS.length - 1) {
      fade(() => setQuestionIndex((i) => i + 1));
    } else {
      fade(() => setScreen("end"));
    }
  }

  const handleSubmit = useCallback(async () => {
    if (submitting || !sessionData) return;
    setSubmitting(true);
    try {
      const completed = { ...sessionData, completedAt: new Date().toISOString() };
      setSessionData(completed);
      saveSession(completed);

      // ── Build a readable summary for the email ──────────────────────────
      const partner = completed.session === "eril" ? "Mar" : "Eril";
      const lines: Record<string, string> = {
        _subject: `Ring Log — ${completed.session === "eril" ? "Eril" : "Mar"} submitted`,
        name: completed.session === "eril" ? "Eril" : "Mar",
        submitted_at: new Date().toLocaleString("en-GB", { timeZone: "Asia/Jakarta" }),
      };
      QUESTIONS.forEach((q) => {
        const resolved = resolveQuestion(q, completed.session as SessionName);
        const ans = completed.answers.find((a) => a.questionId === q.id);
        if (!ans) return;
        const label = `Q${resolved.number} — ${resolved.text.replace("{partner}", partner)}`;
        const value = Array.isArray(ans.value)
          ? ans.value.join(", ")
          : ans.value || "(no answer)";
        const extras = ans.extras
          ? Object.entries(ans.extras).map(([k, v]) => `  ${k}: ${v}`).join("\n")
          : null;
        lines[label] = extras ? `${value}\n${extras}` : value;
      });

      // ── Send to Formspree ───────────────────────────────────────────────
      await fetch("https://formspree.io/f/mlgaqlyn", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(lines),
      });

      // ── Download files to device ────────────────────────────────────────
      await downloadPreferencesJson(completed);
      const hasPhotos = completed.answers.some((a) => (a.photos?.length ?? 0) > 0);
      if (hasPhotos) await exportSession(completed);
    } catch (err) {
      console.error("Export error (navigation continues):", err);
    } finally {
      setSubmitting(false);
      fade(() => setScreen("credit"));
    }
  }, [submitting, sessionData]);

  const rawQuestion = QUESTIONS[questionIndex];
  const currentQuestion = session && rawQuestion
    ? resolveQuestion(rawQuestion, session)
    : rawQuestion;

  const containerStyle: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transition: `opacity ${FADE_MS}ms ease-in-out`,
  };

  return (
    <div style={containerStyle}>
      {screen === "session-selector" && (
        <SessionSelector onSelect={handleSelectSession} />
      )}

      {screen === "cover" && session && (
        <CoverScreen session={session} onStart={handleStart} />
      )}

      {screen === "question" && session && sessionData && currentQuestion && (() => {
        const existingAnswer = sessionData.answers.find(
          (a) => a.questionId === currentQuestion.id
        );
        const isFirst = questionIndex === 0;
        const isLast  = questionIndex === QUESTIONS.length - 1;

        if (currentQuestion.type === "personal_info") {
          return (
            <QuestionPersonalInfo
              key={currentQuestion.id}
              session={session}
              questionIndex={questionIndex}
              answer={existingAnswer}
              onAnswer={handleAnswer}
              onNext={handleNext}
            />
          );
        }

        if (currentQuestion.type === "multiple_choice") {
          return (
            <QuestionMultiChoice
              key={currentQuestion.id}
              session={session}
              question={currentQuestion}
              questionIndex={questionIndex}
              answer={existingAnswer}
              onAnswer={handleAnswer}
              onPrev={handlePrev}
              onNext={handleNext}
              isFirst={isFirst}
              isLast={isLast}
            />
          );
        }

        return (
          <QuestionFreeAnswer
            key={currentQuestion.id}
            session={session}
            question={currentQuestion}
            questionIndex={questionIndex}
            answer={existingAnswer}
            onAnswer={handleAnswer}
            onPrev={handlePrev}
            onNext={handleNext}
            isFirst={isFirst}
            isLast={isLast}
          />
        );
      })()}

      {screen === "end" && session && (
        <EndScreen session={session} onSubmit={handleSubmit} />
      )}

      {screen === "credit" && <CreditScreen />}
    </div>
  );
}
