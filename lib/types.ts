export type SessionName = "eril" | "mar";

export type QuestionType = "multiple_choice" | "free_answer" | "personal_info";

export type PhotoSection = "memory" | "stones" | "style-refs" | "inspiration";

export interface UploadedPhoto {
  id: string;
  section: PhotoSection;
  dataUrl: string;
  filename: string;
  caption?: string;
  timestamp: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  number: string;         // e.g. "01"
  text: string;           // may contain {partner} placeholder
  options?: string[];     // multiple_choice only
  photoSection?: PhotoSection;
  photoPrompt?: string;
}

export interface Answer {
  questionId: string;
  value: string | string[];
  extras?: Record<string, string>; // structured fields (e.g. place, birthdate)
  photos?: UploadedPhoto[];
}

export interface SessionData {
  name: SessionName;
  answers: Answer[];
  completedAt?: string;
}
