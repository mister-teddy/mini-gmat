import { selector } from "recoil";
import { databaseState } from './database';
import { Question } from "../models/database";

export const questionsState = selector<Question[]>({
  key: "questions",
  get: ({ get }) => {
    const db = get(databaseState);
    return Object.values(db.questions.PS).map(q => ({
      ...q,
      type: 'PS'
    }));
  },
});
