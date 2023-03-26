import { FunctionComponent, useEffect, useRef, useState } from "react";
import { QuestionProps } from ".";
import Button from "../../button";
import { Explanations } from "../../explanations";
import Content from "../content";
import { getABCD } from "../hooks";

export interface CommonQuestionProps extends Omit<QuestionProps, "onAnswer"> {
  onAnswer: (answer: number) => void;
}

const CommonQuestion: FunctionComponent<CommonQuestionProps> = ({
  question,
  onAnswer,
  noExplanation,
}) => {
  const [selected, setSelected] = useState(-1);
  const [footerHeight, setFooterHeight] = useState(0);

  return (
    <>
      <div className="w-full flex-none basis-12"></div>
      <div className="w-full overflow-y-auto">
        <h1 className="my-8 flex">
          <Content content={question.question} />
        </h1>
        <div
          className={`flex-none w-full grid ${
            question.type === "DS" ? "grid-cols-5" : "grid-cols-1"
          } gap-3`}
        >
          {question.answers!.map((answer, i, items) => (
            <Button
              key={i}
              className={`px-3 py-3 min-w-0`}
              loading={selected === i}
              onClick={() => setSelected(i)}
            >
              {question.type === "DS" ? (
                getABCD(i)
              ) : (
                <Content content={answer} />
              )}
            </Button>
          ))}
        </div>
        <div
          className="w-full flex-none"
          style={{ height: footerHeight }}
        ></div>
      </div>
      {noExplanation ? (
        selected !== -1 && (
          <div
            ref={(el) => setFooterHeight(el ? el.clientHeight : 0)}
            className="absolute bottom-0 left-0 right-0 z-50 backdrop-blur flex justify-center space-x-4 p-4"
          >
            <Button onClick={async () => onAnswer(selected)}>OK</Button>
          </div>
        )
      ) : (
        <Explanations
          visible={selected > -1}
          onDismiss={() => setSelected(-1)}
          onConfirm={async () => onAnswer(selected)}
          yourAnswer={`${getABCD(selected)}. ${question.answers![selected]}`}
          explanations={question.explanations}
        />
      )}
    </>
  );
};

export default CommonQuestion;
