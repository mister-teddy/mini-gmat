import { FunctionComponent, useMemo } from "react";
import { Question } from "../../../models/database";
import CommonQuestion from "./common";

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
      case "CR":
      case "DS":
      case "PS":
      case "RC":
      case "SC":
        return <CommonQuestion question={question} onAnswer={onAnswer} />;
      default:
        return <div>Unknown question type!</div>;
    }
  }, [question]);

  return (
    <div className="h-full flex flex-col justify-center items-center p-8 overflow-hidden">
      {content}
    </div>
  );
};

export default QuestionComponent;
