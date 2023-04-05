import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { closeLoading } from "zmp-sdk";
import { AddToCalendar } from "../components/add-to-calendar";
import Button from "../components/button";
import { FontSelector } from "../components/font-selector";
import { QuizTaker } from "../components/quiz-taker";
import ZaloMiniApp from "../components/zalo-mini-app";
import { QuestionType } from "../models/database";
import {
  currentQuestionState,
  currentQuestionTypeState,
  manualQuestionIdState,
  pickupQuestionIdState,
} from "../state/questions";
import { selectedQuizIdState } from "../state/quiz";

export const questionTypesLabel = {
  DS: (
    <>
      <span className="text-xl absolute -translate-x-2">🌓</span>
      <span className="ml-8"> Data Sufficiency</span>
    </>
  ),
  PS: (
    <>
      <span className="text-xl absolute -translate-x-2">🧮</span>
      <span className="ml-8"> Problem Solving</span>
    </>
  ),
  CR: (
    <>
      <span className="text-xl absolute -translate-x-2">💡</span>
      <span className="ml-8"> Critical Reasoning</span>
    </>
  ),
  SC: (
    <>
      <span className="text-xl absolute -translate-x-2">✍️</span>
      <span className="ml-8"> Sentence Correction</span>
    </>
  ),
  RC: (
    <>
      <span className="text-xl absolute -translate-x-2">📖</span>
      <span className="ml-8"> Reading Comprehension</span>
    </>
  ),
};

function AreYouReady() {
  const navigate = useNavigate();
  const clearManualId = useResetRecoilState(manualQuestionIdState);
  const setManualId = useSetRecoilState(manualQuestionIdState);
  const [currentType, chooseType] = useRecoilState(currentQuestionTypeState);
  const [ready, setReady] = useState(false);
  const currentQuestion = useRecoilValueLoadable(currentQuestionState);
  const pickupQuestionId = useRecoilValue(pickupQuestionIdState);
  const setSeletectedQuizId = useSetRecoilState(selectedQuizIdState);
  useEffect(() => {
    if (currentQuestion.state === "hasValue" && ready) {
      if (currentType !== currentQuestion.contents.type) {
        chooseType(currentQuestion.contents.type);
      }
      navigate("/study");
    }
  }, [ready, currentQuestion]);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const questionId = params.get("question");
    if (questionId) {
      setManualId(questionId);
      setReady(true);
      window.history.pushState({}, document.title, window.location.pathname);
    }
    const quizId = params.get("quiz");
    if (quizId) {
      setSeletectedQuizId(Number(quizId));
      window.history.pushState({}, document.title, window.location.pathname);
      navigate("/quiz");
    }
  }, []);

  return (
    <div className="w-full flex-1 space-y-4 flex flex-col justify-center">
      {!!pickupQuestionId && (
        <Button
          onClick={async () => {
            setManualId(pickupQuestionId);
            setReady(true);
            await new Promise(() => { });
          }}
          className={`w-full font-bold whitespace-nowrap !justify-start text-lg`}
        >
          <span className="text-xl absolute -translate-x-2">🛫</span>
          <span className="ml-8"> Pickup last question</span>
        </Button>
      )}
      {Object.keys(questionTypesLabel).map((questionType) => (
        <Button
          key={questionType}
          onClick={async () => {
            chooseType(questionType as QuestionType);
            clearManualId();
            setReady(true);
            await new Promise(() => { });
          }}
          className={`w-full font-bold whitespace-nowrap !justify-start text-lg`}
        >
          {questionTypesLabel[questionType]}
        </Button>
      ))}
      <div className="flex justify-between space-x-4 w-full">
        <QuizTaker />
        <Button className="min-w-0 flex-1" onClick={() => navigate("/saved")}>
          ✅
        </Button>
        <AddToCalendar />
        <FontSelector />
      </div>
    </div>
  );
}

const HomePage = () => {
  useEffect(() => {
    closeLoading({});
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-full p-8 space-y-4">
      <AreYouReady />
      <small className="absolute bottom-8 whitespace-nowrap space-x-2 opacity-75">
        A product of the <ZaloMiniApp className="inline" width={96} /> team
      </small>
    </div>
  );
};
export default HomePage;
