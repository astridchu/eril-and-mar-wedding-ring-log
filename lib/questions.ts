import type { Question, SessionName } from "./types";

export const QUESTIONS: Question[] = [
  // ── Personal info (new first question) ─────────────────────────────────
  {
    id: "q0",
    type: "personal_info",
    number: "01",
    text: "Let's start with you.",
  },

  // ── Multiple choice ─────────────────────────────────────────────────────
  {
    id: "q1",
    type: "multiple_choice",
    number: "02",
    text: "What overall aesthetic speaks to you?",
    options: [
      "Minimalist & clean",
      "Vintage & romantic",
      "Nature-inspired",
      "Bold & sculptural",
      "Delicate & ornate",
    ],
  },
  {
    id: "q2",
    type: "multiple_choice",
    number: "03",
    text: "Which metal family do you prefer?",
    options: [
      "Yellow gold — warm, classic",
      "White gold / platinum — cool, refined",
      "Rose gold — warm, romantic",
      "Mixed metals — eclectic",
      "Surprise me",
    ],
  },
  {
    id: "q3",
    type: "multiple_choice",
    number: "04",
    text: "What finish do you like best?",
    options: [
      "High polish — bright & shiny",
      "Matte / brushed — quiet & tactile",
      "Hammered / textured — organic",
      "Combination — polished inside, brushed out",
    ],
  },
  {
    id: "q4",
    type: "multiple_choice",
    number: "05",
    text: "Would you like a stone or gemstone?",
    options: [
      "Yes — a centre diamond",
      "Yes — a coloured gemstone",
      "Small accent stones only",
      "No stone — just the band",
      "Open to anything",
    ],
  },
  {
    id: "q5",
    type: "multiple_choice",
    number: "06",
    text: "How do you feel about band width?",
    options: [
      "Barely there (1–1.5 mm)",
      "Slim (2 mm)",
      "Medium (3–4 mm)",
      "Statement (5 mm+)",
    ],
  },

  // ── Free answer ─────────────────────────────────────────────────────────
  {
    id: "q7",
    type: "free_answer",
    number: "07",
    text: "Any stones, gems, textures, or materials that draw you in?",
    photoSection: "stones",
    photoPrompt: "[ attach a photo of a stone or texture you love ]",
  },
  {
    id: "q8",
    type: "free_answer",
    number: "08",
    text: "Share some jewellery references that inspire you.",
    photoSection: "style-refs",
    photoPrompt: "[ attach style reference photos ]",
  },
  {
    id: "q9",
    type: "free_answer",
    number: "09",
    text: "Any other inspiration — symbols, meaning, artwork — or anything else that matter for you?",
    photoSection: "inspiration",
    photoPrompt: "[ attach inspiration photos ]",
  },
  {
    id: "q10",
    type: "free_answer",
    number: "10",
    text: "What's your special idea for this ring?",
  },
  {
    id: "q6",
    type: "free_answer",
    number: "11",
    text: "Tell me your favorite memory, place, or feeling that represents you and {partner}.",
    photoSection: "memory",
    photoPrompt: "[ attach a photo of that memory ]",
  },
  {
    // {partner} is resolved at render time based on session
    id: "q11",
    type: "free_answer",
    number: "12",
    text: "What message would you want to tell {partner}, or yourself, with this ring?",
  },
];

export const TOTAL_QUESTIONS = QUESTIONS.length;

/** Replace {partner} placeholder with the other person's name. */
export function resolveQuestion(q: Question, session: SessionName): Question {
  const partner = session === "eril" ? "Mar" : "Eril";
  return { ...q, text: q.text.replace("{partner}", partner) };
}
