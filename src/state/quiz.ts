import { atom, selector } from "recoil";
import config from "../config";
import { Question } from "../models/database";
import { supabase } from "../services/supabase";

export const quizzesState = selector({
  key: "quizzes",
  get: async () => {
    return supabase.from("gmat_quizzes").select("id,name");
  },
});

export const selectedQuizIdState = atom<number>({
  key: "selectedQuizId",
  default: 0,
  effects: [
    ({ getPromise, setSelf }) => {
      getPromise(quizzesState).then((quizzes) => {
        setSelf((x) => {
          if (x === 0 && quizzes.data && quizzes.data.length > 0) {
            return quizzes.data[0].id;
          }
          return x;
        });
      });
    },
  ],
});

export const quizDetailState = selector({
  key: "quizDetai",
  get: async ({ get }) => {
    const id = get(selectedQuizIdState);
    if (id) {
      return supabase.from("gmat_quizzes").select().eq("id", id).single();
    }
    return undefined;
  },
});

export const leaderboardState = selector({
  key: "quizLeaderboard",
  get: async () => {
    return supabase
      .from("gmat_submissions")
      .select()
      .order("score", { ascending: false });
  },
});

export const quizQuestionIdsState = selector({
  key: "quizQuestionIds",
  get: ({ get }) => {
    const quiz = get(quizDetailState);
    if (quiz && quiz.data) {
      return JSON.parse(quiz.data.question_ids) as string[];
    }
    return [];
  },
});

export const quizAnswersState = atom<Record<string, number | number[]>>({
  key: "quizAnswers",
  default: {},
});

export const currentQuestionIdState = selector({
  key: "currentQuizQuestionId",
  get: ({ get }) => {
    const answers = get(quizAnswersState);
    const quids = get(quizQuestionIdsState);
    return quids.find((id) => !answers[id]);
  },
});

export const currentQuestionState = selector<Question>({
  key: "currentQuizQuestion",
  get: async ({ get }) => {
    const id = get(currentQuestionIdState);
    const res = await fetch(`${config.DATABASE_URL}/${id}.json`);
    const question = await res.json();
    return question;
  },
});

export const durationState = atom<number>({
  key: "quizDuration",
  default: 0,
});
