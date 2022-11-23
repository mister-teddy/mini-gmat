import { atom, selector } from "recoil";
import { getAccessToken, keepScreenOn, login } from "../services/zalo";
import sdk from "../utils/sdk";

export const loggedInState = atom({
  key: "loggedIn",
  default: login(),
  effects: [
    ({ getPromise, node }) => {
      getPromise(node).then(loggedIn => {
        if (loggedIn) {
          getAccessToken().then(accessToken => {
            pool.accessToken = accessToken;
          });
          keepScreenOn();
        }
      })
    }
  ]
})

export const userState = selector({
  key: "user",
  get: async ({ get }) => {
    await get(loggedInState);
    const user = sdk.getUserInfo({
      avatarType: 'large'
    });
    return user;
  }
})

export const pool = {
  accessToken: ''
}
