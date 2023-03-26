import { createClient } from "@supabase/supabase-js";
import config from "../config";
import { Database } from "../models/supabase";
import { findAccessToken } from "./zalo";

export const supabase = createClient<Database>(
  config.SUPABASE_URL,
  config.SUPABASE_PUBLIC_ANON_KEY
);

type FunctionName = "submit-quiz";

export const invokeEdgeFunction = async <T>(
  functionName: FunctionName,
  body: Record<string, any>,
  defaultValue: T
): Promise<T> => {
  const accessToken = await findAccessToken();

  const { data, error } = await supabase.functions.invoke(functionName, {
    headers: {
      "x-access-token": accessToken,
    },
    body,
  });

  if (error) {
    console.error(error);
    return defaultValue;
  }
  return data as T;
};
