import { useGetRecoilValueInfo_UNSTABLE, useRecoilState, useRecoilValue_TRANSITION_SUPPORT_UNSTABLE, useSetRecoilState } from "recoil";
import { answeredQuestionsState, currentQuestionState, durationState } from "../state/questions";
import logo1Line from "../static/logo-1-line.png";
import Question from "../components/quiz/questions";
import { useEffect, useTransition } from "react";
import Countup from "../components/countup";
import { useConfetti } from "../utils/confetti";
import ErrorBoundary from "../components/error-boundary";

function Header() {
  const setDuration = useSetRecoilState(durationState);
  return <div className="absolute left-0 px-8 py-4 font-bold">
    <img className="w-28" src={logo1Line} alt="GMAT Practice Questions" />
    <div className="flex space-x-2 my-2">
      <span className="h-5">⌛</span>
      <Countup onCount={setDuration} render={([, , minute, second]) => <span>{minute}:{second}</span>} />
    </div>
  </div>;
}

function Finished() {
  const [stop] = useConfetti();
  useEffect(() => stop, []);
  return <h1 className="flex justify-center items-center h-full font-bold text-lg">Congratulations!</h1>;
}

function StudyRoom() {
  const currentQuestion = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(currentQuestionState);
  const setAnsweredQuestions = useSetRecoilState(answeredQuestionsState);
  const getInfo = useGetRecoilValueInfo_UNSTABLE();
  const [loading, startTransition] = useTransition();

  return <div className="w-full h-full">
    <Header />
    <ErrorBoundary fallback={<span>Có vẻ như bạn đã học xong hết tất cả các câu hỏi mà chúng tôi đang có 🥶 Chúng tôi sẽ cập nhật thêm câu hỏi, bạn nhớ quay lại nhé 🎉</span>}>
      <Question key={currentQuestion.id} question={currentQuestion} onAnswer={async answer => {
        console.log(answer);
        const info = getInfo(durationState).loadable
        const timeElapsed = info?.state === 'hasValue' ? info.contents : 0;
        startTransition(() => {
          setAnsweredQuestions(aq => ({
            ...aq,
            [currentQuestion.id]: timeElapsed
          }))
        })
        await new Promise(() => {
          // A promise that never resolve
        });
      }} />
    </ErrorBoundary>
  </div>;
}

export default StudyRoom;