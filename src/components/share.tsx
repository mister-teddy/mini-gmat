import { FC, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { getShareableLink, openShareSheet } from "zmp-sdk";
import { userState } from "../state/auth";
import {
  currentQuestionState,
  currentQuestionTypeState,
} from "../state/questions";

export const ShareButton: FC = () => {
  const currentQuestion = useRecoilValue(currentQuestionState);
  const type = useRecoilValue(currentQuestionTypeState);
  const shareDescription = useMemo(() => {
    const div = document.createElement("div");
    div.innerHTML = currentQuestion.question.split("<br>")[0];
    return div.innerText.length > 200
      ? `${div.innerText.substr(0, 200)}...`
      : div.innerText;
  }, [currentQuestion]);
  const user = useRecoilValue(userState);
  const share = async () => {
    const link = await getShareableLink({
      title: `${user.userInfo.name} want to practice this ${type} question with you`,
      thumbnail: user.userInfo.avatar,
      path: `?question=${currentQuestion.id}`,
      description: shareDescription,
    });
    await openShareSheet({
      type: "link",
      data: {
        link,
      },
    });
  };
  return (
    <>
      <a className="space-x-2" onClick={share}>
        <span className="h-5">🔗</span>
        <span>Share</span>
      </a>
      <span></span>
    </>
  );
};
