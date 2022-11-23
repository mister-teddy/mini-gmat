import { atom, selector } from "recoil"
import api from 'zmp-sdk';
import sdk from "../utils/sdk";
import { app } from '../../app-config.json';

export const appInfoState = selector({
  key: 'appInfoMode',
  get: () => sdk.getAppInfo(),
});


const prefersColorScheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

export const darkState = atom({
  key: 'darkMode',
  default: api.getSystemInfo().zaloTheme === 'dark' ? true : prefersColorScheme.matches,
  effects: [
    ({ setSelf }) => {
      const handler = (event: MediaQueryListEvent) => {
        const dark = event.matches;
        setSelf(dark);
        api.setNavigationBarColor({
          color: app.headerColor,
          statusBarColor: dark ? app.statusBarColor.dark : app.statusBarColor.light,
          textColor: (dark ? app.textColor.dark : app.textColor.light) as 'white' | 'black'
        })
      }
      try {
        prefersColorScheme.addEventListener('change', handler);
      } catch (error) {
        try {
          prefersColorScheme.addListener(handler);
        } catch (error) {
          console.error(error);
        }
      }
    }
  ]
});