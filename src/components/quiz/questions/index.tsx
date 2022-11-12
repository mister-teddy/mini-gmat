import { FunctionComponent, useMemo } from "react";
import { Question } from "../../../models/database";
import ProblemSolving from "./ps";

interface QuestionProps {
  question: Question;
  onAnswer: (answer: any) => Promise<void>;
}

const QuestionComponent: FunctionComponent<QuestionProps> = ({
  question,
  onAnswer,
}) => {
  const content = useMemo(() => {
    switch (question.type) {
      case "PS":
        return <ProblemSolving question={question} onAnswer={onAnswer} />;
      default:
        return <div>Unknown question type!</div>;
    }
  }, [question]);

  return (
    <div className="h-full flex flex-col justify-center items-center p-4 overflow-hidden">
      {content}
    </div>
  );
};

export default QuestionComponent;
