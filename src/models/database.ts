export type QuestionType = "RC" | "SC" | "CR" | "PS" | "DS";

export interface SubQuestion {
  question: string;
  answers: string[];
}

export interface Question {
  id: string;
  src: string;
  type: QuestionType;
  question: string;
  answers?: string[];
  subQuestions?: SubQuestion[];
  explanations: string[];
}

export type Database = {
  [type in QuestionType]: string[];
};
