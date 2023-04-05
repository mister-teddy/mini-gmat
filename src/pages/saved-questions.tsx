import { useNavigate } from "react-router-dom";
import { Suspense, useMemo, useState } from "react";
import Loading from "../components/loading";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  answeredQuestionsState,
  currentQuestionIdState,
  currentQuestionTypeState,
  manualQuestionIdState,
} from "../state/questions";
import Button from "../components/button";
import { questionTypesLabel } from ".";
import { QuestionType } from "../models/database";
import { databaseState } from "../state/database";
import Back from "../components/back";

function Podium({ type }: { type: QuestionType }) {
  const navigate = useNavigate();
  const answeredQuestions = useRecoilValue(answeredQuestionsState);
  const db = useRecoilValue(databaseState);
  const setCurrentType = useSetRecoilState(currentQuestionTypeState);
  const setCurrentId = useSetRecoilState(manualQuestionIdState);

  const questionOfTypes = useMemo(
    () => Object.keys(answeredQuestions).filter((id) => db[type].includes(id)),
    [answeredQuestionsState, db, type]
  );

  return (
    <>
      <div className="flex-1 w-full space-y-2 overflow-y-auto pb-4">
        {questionOfTypes.length ? (
          questionOfTypes.map((questionId) => (
            <Button
              onClick={() => {
                setCurrentType(type);
                setCurrentId(questionId);
                navigate("/study");
              }}
              key={questionId}
              className={`py-2 px-4 w-full border-none first:mt-4 last:mb-4`}
            >
              <div className="flex justify-between flex-1 w-full items-center space-x-2">
                <h1 className="font-bold underline">#{questionId}</h1>
                <span className="text-sm">
                  ⌛️ <b>{answeredQuestions[questionId]}</b>s
                </span>
              </div>
            </Button>
          ))
        ) : (
          <p className="p-4">
            You haven't complete any question of this type yet!
          </p>
        )}
      </div>
    </>
  );
}

function SavedQuestionsPage() {
  const currentQuestionType = useRecoilValue(currentQuestionTypeState);
  const [type, setType] = useState<QuestionType>(currentQuestionType ?? "DS");

  return (
    <div className="w-full h-full p-8 flex flex-col">
      <div className="flex-none">
        <Back />
        <div className="flex justify-between items-center w-full mt-8">
          <div className="flex flex-col items-center">
            <h2 className="font-bold text-lg w-full">Completed questions</h2>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as QuestionType)}
              className="rounded text-black text-sm py-1 px-2 mt-2"
            >
              {Object.keys(questionTypesLabel).map((type) => (
                <option key={type} value={type}>
                  {questionTypesLabel[type]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <Suspense
        fallback={
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
            <Loading visible />
          </div>
        }
      >
        <Podium type={type} />
      </Suspense>
    </div>
  );
}

export default SavedQuestionsPage;
