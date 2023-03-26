import { selector } from "recoil";

export const leaderboardState = selector<[]>({
  key: "leaderboard",
  get: async ({ get }) => {
    return [];
  }
})
