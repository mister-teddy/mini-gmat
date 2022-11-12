export type QuestionType = 'PS'

export interface Question {
  type: QuestionType;
  question: string;
  explainations: string[];
}

export interface Database {
  questions: { [type in QuestionType]: { [id: string]: Question } };
}
