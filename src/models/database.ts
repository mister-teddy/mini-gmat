export type QuestionType = 'RC' | 'SC' | 'CR' | 'PS' | 'DS';

export interface Question {
  id: string;
  type: QuestionType;
  src: string;
  question: string;
  explainations: string[];
}

export type Database = {
  [type in QuestionType]: string[];
};
