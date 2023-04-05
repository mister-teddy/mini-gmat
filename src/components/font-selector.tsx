import { FC } from "react";
import Button from "./button";
import { useSetRecoilState } from "recoil";
import { fontIndexState } from "../state/settings";

export const FontSelector: FC = () => {
  const setFontIndex = useSetRecoilState(fontIndexState);
  return (
    <Button
      className="min-w-0 flex-1 text-lg"
      onClick={(e) => {
        setFontIndex(i => i + 1);
      }}
    >
      Aa
    </Button>
  );
};
