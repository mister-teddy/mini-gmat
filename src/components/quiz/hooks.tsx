import { NavigateFunction, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";

export const useQnA = (content: string) => {
  return useMemo(() => {
    const lines = content.split("<br>").map((line) => line.trim());
    const regex = /^([A-Z]\.|[A-Z]:|\(?[A-Z]\))\s*/i;
    const answers = [] as string[],
      nonAnswers = [] as string[];
    lines.forEach((line) => {
      if (line.match(regex)) {
        answers.push(line);
      } else {
        nonAnswers.push(line);
      }
    });
    return {
      answers: answers.map((line) => line.replace(regex, "")),
      content: nonAnswers.join("<br>"),
    };
  }, [content]);
};

export const getABCD = (index: number) =>
  index < 0 ? "?" : String.fromCharCode(65 + index);
