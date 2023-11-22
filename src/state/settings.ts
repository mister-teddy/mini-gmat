import { atom, selector } from "recoil";
import { getAppInfo, getSystemInfo, setNavigationBarColor } from "zmp-sdk";
import { app } from "../../app-config.json";
import { localStorageEffect } from "./effects";

export const appInfoState = selector({
  key: "appInfoMode",
  get: () => getAppInfo(),
});

export const FONT_SIZES = [16, 17, 18, 19, 20, 12, 13, 14, 15];

export const FONTS = [
  undefined,
  "Cambria, Noto Serif, serif",
  "Cochin, Droid Serif, serif",
  "Georgia, Times New Roman, serif",
  "Bradley Hand, cursive",
  "Noteworthy, Comic Sans MS, Chalkboard, cursive",
  "Snell Roundhand, Brush Script MT, Kristen ITC, cursive",
  "Harrington, Jokerman, Mistral, Papyrus, Curlz MT, fantasy",
  "Monaco, Menlo, Courier New, monospace",
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

export const fontSizeIndexState = atom({
  key: "fontSizeIndex",
  default: 0,
  effects: [localStorageEffect("MINI_GMAT_FONT_SIZE")],
});

export const fontSizeState = selector({
  key: "fontSize",
  get: ({ get }) => {
    const index = get(fontSizeIndexState);
    return FONT_SIZES[index % FONT_SIZES.length] ?? 16;
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
