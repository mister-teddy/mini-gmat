import { atom, selector } from "recoil"
import api from 'zmp-sdk';
import sdk from "../utils/sdk";

export const darkState = atom({
  key: 'darkMode',
  default: api.getSystemInfo().zaloTheme === 'dark' ? true : ((window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? true : false),
});

export const appInfoState = selector({
  key: 'appInfoMode',
  get: () => sdk.getAppInfo(),
});