import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Question } from "../../../models/database";
import Button from "../../button";
import { Explanations } from "../../explanations";
import Content from "../content";
import { getABCD } from "../hooks";

export interface CommonQuestionProps {
  question: Question;
  onAnswer: (answer: number) => void;
}

const CommonQuestion: FunctionComponent<CommonQuestionProps> = ({ question, onAnswer }) => {
  const [selected, setSelected] = useState(-1);
  useEffect(() => {
    setTimeout(() => {
      titleRef.current?.scrollIntoView();
    }, 100)
  }, [selected])
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  return <>
    <div className="w-full flex-none basis-12"></div>
    <div className="w-full overflow-y-auto">
      <h1 className="my-8 flex">
        <Content content={question.question} />
      </h1>
      <div className={`flex-none w-full grid ${question.type === 'DS' ? 'grid-cols-5' : question.type === 'SC' ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
        {question.answers!.map((answer, i, items) => <Button key={i} className={`px-4 ${question.type !== 'DS' && question.type !== 'SC' && items.length % 2 === 1 && i === items.length - 1 ? 'col-span-2' : ''}`} onClick={() => setSelected(i)}>
          {question.type === 'DS' ? getABCD(i) : <Content content={answer} />}
        </Button>)}
      </div>
    </div>
    <Explanations
      visible={selected > -1}
      onDismiss={() => setSelected(-1)}
      onConfirm={async () => onAnswer(selected)}
      yourAnswer={`${getABCD(selected)}. ${question.answers![selected]}`}
      explanations={question.explanations}
    />
  </>;
}

export default CommonQuestion;