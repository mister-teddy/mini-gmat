import { selector } from "recoil";
import config from "../config";
import { Database } from "../models/database";

export const databaseState = selector<Database>({
  key: 'database',
  get: async ({ get }) => {
    await new Promise(resolve => {
      const script = document.createElement('script');
      script.src = config.DATABASE_URL;
      script.onload = resolve;
      document.body.appendChild(script);
    })
    return (window as any).gmatDatabase;
  }
})