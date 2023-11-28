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
      <div className="w-full overflow-y-auto">
        <h1 className="my-8 flex">
          <Content content={question.question} />
        </h1>
        <div className={`flex-none w-full grid grid-cols-1 space-y-3 pb-8`}>
          {question.answers!.map((answer, i, items) => (
            <Button
              key={i}
              className={`px-3 py-3 min-w-0 ${selected === i ? "bg-primary text-primary-text" : ""
                }`}
              onClick={() => setSelected(i)}
            >
              <Content content={answer} />
            </Button>
          ))}
        </div>
        <div
          className="w-full flex-none"
          style={{ height: footerHeight }}
        ></div>
      </div>
      {noExplanation ? (
        <div
          ref={(el) => setFooterHeight(el ? el.clientHeight : 0)}
          className={`absolute bottom-0 left-0 right-0 z-50 ${selected === -1 ? "" : "backdrop-blur-xl"
            } flex justify-center space-x-4 p-4 pt-2`}
          style={{
            paddingBottom: `max(env(safe-area-inset-bottom, 8px), 8px)`,
          }}
        >
          <Button
            className={`bg-primary text-primary-text ${selected === -1 ? "invisible" : ""
              }`}
            onClick={async () => onAnswer(selected)}
          >
            OK
          </Button>
        </div>
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
