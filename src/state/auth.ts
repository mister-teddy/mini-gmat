import { atom, selector } from "recoil";
import { getStatus, Status } from "../services/rest";
import { getAccessToken, keepScreenOn, login } from "../services/zalo";

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

export const pool = {
  accessToken: ''
}
