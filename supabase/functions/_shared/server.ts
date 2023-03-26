import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { getUserFromAccessToken, User } from "./zalo.ts";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, x-access-token, apikey, content-type",
};

export const serveWithCors = (
  callback: (req: Request) => Promise<[status: number, data: unknown]>
) =>
  serve(async (req) => {
    // This is needed if you're planning to invoke your function from a browser.
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }
    try {
      const [status, data] = await callback(req);

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status,
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }
  });

export const serveWithUser = (
  callback: (
    user: User,
    req: Request
  ) => Promise<[status: number, data: unknown]>
) =>
  serveWithCors(async (req) => {
    const accessToken = req.headers.get("x-access-token");
    if (accessToken) {
      const user = await getUserFromAccessToken(accessToken);
      return callback(user, req);
    } else {
      return [401, { error: "Please play this mini game inside Zalo!" }];
    }
  });
