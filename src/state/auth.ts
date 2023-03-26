import { selector } from "recoil";
import { getUserInfo } from "zmp-sdk";

export const userState = selector({
  key: "user",
  get: async () => {
    const user = getUserInfo({
      avatarType: "large",
    });
    return user;
  },
});

export const pool = {
  accessToken: "",
};
