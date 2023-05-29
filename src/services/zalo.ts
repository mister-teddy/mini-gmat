import { getAccessToken } from "zmp-sdk";

export const findAccessToken = async () => {
  let token = await getAccessToken({});
  return token;
};

export const openExternal = (url: string) => {
  const { ZJSBridge } = window as any;
  ZJSBridge.callCustomAction("action.open.outapp", { url }, () =>
    console.log("Open outapp", url)
  );
};
