import {
  useRecoilState,
  useRecoilValue,
  useRecoilValue_TRANSITION_SUPPORT_UNSTABLE,
  useSetRecoilState,
} from "recoil";
import Question from "../components/quiz/questions";
import { useEffect, useTransition } from "react";
import Countup from "../components/countup";
import { useConfetti } from "../utils/confetti";
import ErrorBoundary from "../components/error-boundary";
import Back from "../components/back";
import {
  currentQuestionState,
  durationState,
  quizAnswersState,
  quizDetailState,
} from "../state/quiz";
import { invokeEdgeFunction, supabase } from "../services/supabase";

function Header() {
  const setDuration = useSetRecoilState(durationState);
  const quizDetail = useRecoilValue(quizDetailState);

  return (
    <div className="absolute w-full left-0 px-8 py-4 font-bold">
      <div className="flex space-x-6 items-center text-lg uppercase">
        {quizDetail?.data?.name}
      </div>
      <div className="flex my-2 justify-between">
        <div className="space-x-2 ">
          <Back />
          <span className="h-5">⌛</span>
          <Countup
            onCount={setDuration}
            render={([, , minute, second]) => (
              <span>
                {minute}:{second}
              </span>
            )}
          />
        </div>
      </div>
    </div>
  );
}

function Finished() {
  const [stop] = useConfetti();
  useEffect(() => stop, []);
  return (
    <h1 className="flex justify-center items-center h-full font-bold text-lg">
      Congratulations!
    </h1>
  );
}

function TestRoomPage() {
  const quizDetail = useRecoilValue(quizDetailState);
  const [answers, setAnswers] = useRecoilState(quizAnswersState);

  useEffect(() => {
    if (quizDetail && quizDetail.data) {
      invokeEdgeFunction(
        "submit-quiz",
        { quizId: quizDetail.data.id, answers },
        { answers: "{}", score: 0 }
      ).then((submission) => {
        if (Object.keys(answers).length === 0) {
          setAnswers(JSON.parse(submission.answers));
        }
        if (submission.score) {
        }
      });
    }
  }, [quizDetail, answers]);

  const currentQuestion =
    useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(currentQuestionState);
  const [loading, startTransition] = useTransition();

  return (
    <div className="w-full h-full">
      <Header key={currentQuestion.id} />
      <ErrorBoundary
        fallback={
          <span>
            Câu hỏi này có vấn đề (chứ không phải hệ thống), báo lại với BTC để
            đổi câu hỏi bạn nhé 📝
          </span>
        }
      >
        <Question
          key={currentQuestion.id}
          question={currentQuestion}
          onAnswer={async (answer) => {
            startTransition(() => {
              setAnswers((answers) => ({
                ...answers,
                [currentQuestion.id]: answer,
              }));
            });
            await new Promise(() => {
              // A promise that never resolve
            });
          }}
        />
      </ErrorBoundary>
    </div>
  );
}

export default TestRoomPage;
