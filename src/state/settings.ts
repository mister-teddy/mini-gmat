import { atom, selector } from "recoil";
import { getAppInfo, getSystemInfo, setNavigationBarColor } from "zmp-sdk";
import { app } from "../../app-config.json";
import { localStorageEffect } from "./effects";

export const appInfoState = selector({
  key: "appInfoMode",
  get: () => getAppInfo(),
});

export const FONTS = [
  undefined,
  "Cambria",
  "Cochin",
  "Georgia",
  "Times New Roman",
  "Bradley Hand",
  "Noteworthy",
  "Snell Roundhand",
];

export const fontIndexState = atom({
  key: "fontIndex",
  default: 0,
  effects: [localStorageEffect("MINI_GMAT_FONT")],
});

export const fontState = selector({
  key: "font",
  get: ({ get }) => {
    const index = get(fontIndexState);
    return FONTS[index % FONTS.length];
  },
});

const prefersColorScheme =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");

export const darkState = atom({
  key: "darkMode",
  default:
    getSystemInfo().zaloTheme === "dark" ? true : prefersColorScheme.matches,
  effects: [
    ({ setSelf }) => {
      const handler = (event: MediaQueryListEvent) => {
        const dark = event.matches;
        setSelf(dark);
        setNavigationBarColor({
          color: app.headerColor,
          statusBarColor: dark
            ? app.statusBarColor.dark
            : app.statusBarColor.light,
          textColor: (dark ? app.textColor.dark : app.textColor.light) as
            | "white"
            | "black",
        });
      };
      try {
        prefersColorScheme.addEventListener("change", handler);
      } catch (error) {
        try {
          prefersColorScheme.addListener(handler);
        } catch (error) {
          console.error(error);
        }
      }
    },
  ],
});
