import { atom, selector } from "recoil";
import { showToast } from "zmp-sdk";
import config from "../config";
import { Question } from "../models/database";
import { invokeEdgeFunction, supabase } from "../services/supabase";

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

export const leaderboardUniqueKeyState = atom({
  key: "leaderboardUniqueKey",
  default: 0,
});

export const leaderboardState = selector({
  key: "quizLeaderboard",
  get: async ({ get }) => {
    get(leaderboardUniqueKeyState);
    const quiz_id = get(selectedQuizIdState);
    return supabase
      .from("gmat_submissions")
      .select()
      .eq("quiz_id", quiz_id)
      .order("score", { ascending: false })
      .limit(50);
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

export const quizSubmissionState = selector({
  key: "quizSubmission",
  get: async ({ get }) => {
    const quiz_id = get(selectedQuizIdState);
    const answers = get(quizAnswersState);
    const submission = await invokeEdgeFunction(
      "submit-quiz",
      {
        answers,
        quiz_id,
      },
      { answers: "{}", created_at: new Date(), submitted_at: null }
    );
    if (Object.keys(answers).length === 0 && submission.submitted_at) {
      showToast({
        message:
          "You have a pending quiz submission, please wait a minute before taking another one!",
      });
    }
    const savedAnswers = JSON.parse(submission.answers);
    if (Object.keys(savedAnswers).length > Object.keys(answers).length) {
      showToast({
        message: "Continuing your last attempt.",
      });
    }
    return {
      ...submission,
      answers: savedAnswers as Record<string, number | number[]>,
    };
  },
});

export const currentQuestionIdState = selector({
  key: "currentQuizQuestionId",
  get: ({ get }) => {
    const submission = get(quizSubmissionState);
    const quids = get(quizQuestionIdsState);
    return quids.find((id) => submission.answers[id] === undefined);
  },
});

export const currentQuestionState = selector<Question>({
  key: "currentQuizQuestion",
  get: async ({ get }) => {
    const id = get(currentQuestionIdState);
    if (id) {
      const res = await fetch(`${config.DATABASE_URL}/${id}.json`);
      const question = await res.json();
      return question;
    }
    return undefined;
  },
});

export const durationState = atom<number>({
  key: "quizDuration",
  default: 0,
});
