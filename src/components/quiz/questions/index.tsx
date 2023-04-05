import { FunctionComponent, useMemo } from "react";
import { Question } from "../../../models/database";
import CommonQuestion from "./common";
import ReadingComprehensionQuestion from "./reading";

export interface QuestionProps {
  question: Question;
  onAnswer: (answer: any) => Promise<void>;
  noExplanation?: boolean;
}

const QuestionComponent: FunctionComponent<QuestionProps> = ({
  question,
  onAnswer,
  noExplanation,
}) => {
  const content = useMemo(() => {
    switch (question.type) {
      case "CR":
      case "DS":
      case "PS":
      case "SC":
        return (
          <CommonQuestion
            question={question}
            onAnswer={onAnswer}
            noExplanation={noExplanation}
          />
        );
      case "RC":
        return (
          <ReadingComprehensionQuestion
            question={question}
            onAnswer={onAnswer}
            noExplanation={noExplanation}
          />
        );
      default:
        return <div>Unknown question type!</div>;
    }
  }, [question]);

  return (
    <div className="h-full flex flex-col justify-center items-center overflow-hidden">
      {content}
    </div>
  );
};

export default QuestionComponent;
