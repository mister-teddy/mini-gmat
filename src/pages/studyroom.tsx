import { useGetRecoilValueInfo_UNSTABLE, useRecoilValue, useRecoilValue_TRANSITION_SUPPORT_UNSTABLE, useResetRecoilState, useSetRecoilState } from "recoil";
import { answeredQuestionsState, currentQuestionState, currentQuestionTypeState, durationState, manualQuestionIdState, pickupQuestionIdState } from "../state/questions";
import Question from "../components/quiz/questions";
import { Suspense, useEffect, useTransition } from "react";
import Countup from "../components/countup";
import { useConfetti } from "../utils/confetti";
import ErrorBoundary from "../components/error-boundary";
import { questionTypesLabel } from ".";
import Back from "../components/back";
import { ShareButton } from "../components/share";

function Header() {
  const setDuration = useSetRecoilState(durationState);
  const type = useRecoilValue(currentQuestionTypeState);
  return <div className="absolute w-full left-0 px-8 py-4 font-bold">
    <div className="flex space-x-6 items-center text-lg uppercase">{questionTypesLabel[type!]}</div>
    <div className="flex my-2 justify-between">
      <div className="space-x-2 ">
        <Back />
        <span className="h-5">⌛</span>
        <Countup onCount={setDuration} render={([, , minute, second]) => <span>{minute}:{second}</span>} />
      </div>
      <div>
        <Suspense>
          <ShareButton />
        </Suspense>
      </div>
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
  const clearManualId = useResetRecoilState(manualQuestionIdState);
  const getInfo = useGetRecoilValueInfo_UNSTABLE();
  const [loading, startTransition] = useTransition();
  const setPickupQuestionId = useSetRecoilState(pickupQuestionIdState);
  useEffect(() => {
    setPickupQuestionId(currentQuestion.id);
  }, [currentQuestion])

  return <div className="w-full h-full">
    <Header key={currentQuestion.id} />
    <ErrorBoundary fallback={<span>Có vẻ như bạn đã học xong hết tất cả các câu hỏi mà chúng tôi đang có 🥶 Chúng tôi sẽ cập nhật thêm câu hỏi, bạn nhớ quay lại nhé 🎉</span>}>
      <Question key={currentQuestion.id} question={currentQuestion} onAnswer={async answer => {
        console.log(answer);
        const info = getInfo(durationState).loadable
        const timeElapsed = info?.state === 'hasValue' ? info.contents : 0;
        startTransition(() => {
          clearManualId();
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