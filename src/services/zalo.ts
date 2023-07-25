import { getAccessToken } from "zmp-sdk";

export const findAccessToken = async () => {
  let token = await getAccessToken({});
  return token;
};
