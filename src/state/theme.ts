import { atom } from "recoil"
import api from 'zmp-sdk';

export const darkState = atom({
    key: 'darkMode',
    default: api.getSystemInfo().zaloTheme === 'dark' ? true : ((window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? true : false),
});