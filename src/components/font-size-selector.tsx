import { FC } from "react";
import Button from "./button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { fontSizeIndexState, fontSizeState } from "../state/settings";

export const FontSizeSelector: FC = () => {
  const setFontSize = useSetRecoilState(fontSizeIndexState);
  const fontSize = useRecoilValue(fontSizeState);
  return (
    <Button
      className="min-w-0 flex-1 text-lg"
      onClick={(e) => {
        setFontSize((i) => i + 1);
      }}
    >
      {fontSize}pt
    </Button>
  );
};
