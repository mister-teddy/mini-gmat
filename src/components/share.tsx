import { FC, useMemo } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../state/auth";
import { currentQuestionState, currentQuestionTypeState } from "../state/questions";
import sdk from "../utils/sdk";

export const ShareButton: FC = () => {
  const currentQuestion = useRecoilValue(currentQuestionState);
  const type = useRecoilValue(currentQuestionTypeState);
  const shareDescription = useMemo(() => {
    const div = document.createElement('div');
    div.innerHTML = currentQuestion.question;
    return `${div.innerText.substr(0, 200)}...`;
  }, [currentQuestion]);
  const user = useRecoilValue(userState);
  const share = () => {
    sdk.openShareSheet({
      type: 'zmp',
      data: {
        title: `${user.userInfo.name} want to practice this ${type} question with you`,
        thumbnail: user.userInfo.avatar,
        path: `?questionId=${currentQuestion.id}`,
        description: shareDescription
      }
    })
  }
  return <>
    <a className="space-x-2" onClick={share}><span className="h-5">📤</span><span>Share</span></a><span></span>
  </>
}
