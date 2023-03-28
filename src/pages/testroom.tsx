import {
  useRecoilValue_TRANSITION_SUPPORT_UNSTABLE,
  useSetRecoilState,
} from "recoil";
import Question from "../components/quiz/questions";
import { useEffect, useTransition } from "react";
import { useConfetti } from "../utils/confetti";
import ErrorBoundary from "../components/error-boundary";
import {
  currentQuestionIdState,
  currentQuestionState,
  leaderboardUniqueKeyState,
  quizAnswersState,
  quizDetailState,
  quizQuestionIdsState,
  quizSubmissionState,
} from "../state/quiz";
import { useNavigate } from "react-router-dom";
import Countdown from "../components/countdown";
import { timeElapsed } from "../utils/quiz";
import FullscreenLoading from "../components/fullscreen-loading";

function Header() {
  const allQuestionsInQuiz =
    useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(quizQuestionIdsState);
  const currentQuestionId = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(
    currentQuestionIdState
  );
  const submission =
    useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(quizSubmissionState);
  const quizDetail =
    useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(quizDetailState);
  const setAnswers = useSetRecoilState(quizAnswersState);
  const setLeaderboardUniqueKey = useSetRecoilState(leaderboardUniqueKeyState);
  const navigate = useNavigate();

  const finish = () => {
    setLeaderboardUniqueKey((k) => k + 1);
    setAnswers({});
    navigate("/quiz");
  };

  useEffect(() => {
    if (submission.submitted_at) {
      finish();
    }
  }, [submission]);

  return (
    <div className="absolute w-full left-0 px-8 py-4 font-bold">
      <div className="flex space-x-6 items-center text-lg uppercase">
        {quizDetail?.data?.name}
      </div>
      <div className="flex my-2 justify-between">
        <div className="space-x-2 ">
          <span>
            Question{" "}
            {allQuestionsInQuiz.indexOf(currentQuestionId!) + 1 ||
              allQuestionsInQuiz.length}
            /{allQuestionsInQuiz.length}
          </span>
          <span className="h-5">⌛</span>
          <Countdown
            timeLeft={timeElapsed(
              new Date(submission.created_at),
              quizDetail?.data?.duration ?? 30
            )}
            onTimeout={finish}
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
  const setAnswers = useSetRecoilState(quizAnswersState);

  const currentQuestion =
    useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(currentQuestionState);
  const [loading, startTransition] = useTransition();

  return (
    <div className="w-full h-full">
      <Header />
      {currentQuestion ? (
        <ErrorBoundary
          fallback={
            <span>
              Câu hỏi này có vấn đề (chứ không phải hệ thống), báo lại với BTC
              để đổi câu hỏi bạn nhé 📝
            </span>
          }
        >
          <Question
            key={currentQuestion.id}
            noExplanation
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
      ) : (
        <FullscreenLoading />
      )}
    </div>
  );
}

export default TestRoomPage;
