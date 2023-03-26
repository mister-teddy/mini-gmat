import { selector } from "recoil";
import config from "../config";
import { Database } from "../models/database";

export const databaseState = selector<Database>({
  key: "database",
  get: async () => {
    const db = await fetch(`${config.DATABASE_URL}/index.json`);
    return await db.json();
  },
});
