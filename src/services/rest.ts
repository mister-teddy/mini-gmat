import config from "../config";
import { pool } from "../state/auth";

const base = config.BASE_URL;

export const request = async (
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  data?: any,
  customBaseUrl?: string
) => {
  const headers = new Headers();
  while (!pool.accessToken) {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  headers.set("Authorization", `Bearer ${pool.accessToken}`);
  const url = new URL(`${customBaseUrl ?? base}${path}`);

  const options: RequestInit = {
    method: method,
    headers,
  };
  if (method !== "GET") {
    options.body = new URLSearchParams(data);
  } else {
    url.search = new URLSearchParams(data).toString();
  }

  return fetch(url.toString(), options);
};

export interface Result<T = {}> {
  msg: string;
  err: number;
  data: T;
}
