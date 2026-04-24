"use client";

import { useRef, useState } from "react";
import type { SessionName, Question, Answer, UploadedPhoto, PhotoSection } from "@/lib/types";
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

const MAX_PHOTOS = 5;
const ACCEPTED = "image/jpeg,image/png,image/webp";

function photoFilename(name: string, section: PhotoSection, index: number): string {
  return `${name}-${section}-${String(index + 1).padStart(2, "0")}.jpg`;
}

export function QuestionFreeAnswer({
  session,
  question,
  questionIndex,
  answer,
  onAnswer,
  onPrev,
  onNext,
  isFirst,
  isLast,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState<string>((answer?.value as string) ?? "");
  const [photos, setPhotos] = useState<UploadedPhoto[]>(answer?.photos ?? []);

  function push(newText: string, newPhotos: UploadedPhoto[]) {
    onAnswer({ questionId: question.id, value: newText, photos: newPhotos });
  }

  function handleText(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const v = e.target.value;
    setText(v);
    push(v, photos);
  }

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).slice(0, MAX_PHOTOS - photos.length);
    const section = question.photoSection as PhotoSection;
    const base = photos.length;
    Promise.all(
      files.map((file, i) =>
        new Promise<UploadedPhoto>((resolve) => {
          const reader = new FileReader();
          reader.onload = () =>
            resolve({
              id: `${Date.now()}-${i}`,
              section,
              dataUrl: reader.result as string,
              filename: photoFilename(session, section, base + i),
              timestamp: new Date().toISOString(),
            });
          reader.readAsDataURL(file);
        })
      )
    ).then((added) => {
      const merged = [...photos, ...added].slice(0, MAX_PHOTOS);
      setPhotos(merged);
      push(text, merged);
    });
    e.target.value = "";
  }

  function removePhoto(id: string) {
    const section = question.photoSection as PhotoSection;
    const filtered = photos
      .filter((p) => p.id !== id)
      .map((p, i) => ({ ...p, filename: photoFilename(session, section, i) }));
    setPhotos(filtered);
    push(text, filtered);
  }

  return (
    <div className="page-frame">
      <ScreenLayers
        variant="question"
        bg="/assets/free-bg.jpg"
        mid="/assets/free-mid.jpg"
        fg="/assets/free-fg.png"
      />

      <QuestionHeader session={session} questionIndex={questionIndex} />

      {/* Content area — top 289px, left 56px, width 404px */}
      <div
        style={{
          position: "absolute",
          top: 289,
          left: 56,
          width: 404,
          bottom: 108,
          display: "flex",
          flexDirection: "column",
          gap: 17,
          fontFamily: "var(--font-aquifer)",
          fontSize: 16,
          lineHeight: "20px",
          overflowY: "auto",
        }}
      >
        {/* Question number */}
        <p style={{ color: "#ccc654", flexShrink: 0 }}>Question {question.number}</p>

        {/* Question text — #EAE9DA */}
        <p style={{ color: "#eae9da", flexShrink: 0 }}>{question.text}</p>

        {/* Answer textarea */}
        <textarea
          className="input-bare"
          placeholder="Answer here..."
          value={text}
          onChange={handleText}
          rows={4}
          style={{ flexShrink: 0, paddingBottom: 6, marginTop: 8 }}
        />

        {/* Photo upload */}
        {question.photoSection && (
          <div style={{ flexShrink: 0 }}>
            {photos.length < MAX_PHOTOS && (
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "var(--font-typewriter)",
                  fontSize: 12,
                  letterSpacing: "3.6px",
                  color: "#838275",
                  cursor: "pointer",
                  padding: 0,
                  display: "block",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                {question.photoPrompt ?? "[ attach photo ]"}
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED}
              multiple
              onChange={handleFiles}
              style={{ display: "none" }}
            />
            {photos.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
                {photos.map((photo) => (
                  <div key={photo.id} style={{ position: "relative" }}>
                    <img
                      src={photo.dataUrl}
                      alt={photo.filename}
                      style={{ width: 64, height: 64, objectFit: "cover", display: "block" }}
                    />
                    <button
                      onClick={() => removePhoto(photo.id)}
                      style={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        background: "none",
                        border: "none",
                        color: "#eae9da",
                        fontFamily: "var(--font-typewriter)",
                        fontSize: 14,
                        cursor: "pointer",
                        lineHeight: 1,
                        padding: 0,
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Nav — top 788px */}
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
        {isLast ? "fin" : "next"}
      </button>
    </div>
  );
}
