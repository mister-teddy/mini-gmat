export async function getUserFromAccessToken(access_token: string) {
  const response = await fetch(
    `https://graph.zalo.me/v2.0/me?fields=id%2Cname%2Cpicture`,
    {
      headers: {
        access_token,
      },
    }
  );
  const user = await response.json();
  return user as User;
}

export interface User {
  name: string;
  id: string;
  error: number;
  message: string;
  picture: Picture;
}

export interface Picture {
  data: Data;
}

export interface Data {
  url: string;
}
