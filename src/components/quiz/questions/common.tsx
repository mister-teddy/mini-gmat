import { FunctionComponent, useEffect, useMemo, useRef, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import { Question } from "../../../models/database";
import Button from "../../button";
import { Explainations } from "../../explainations";
import Content from "../content";
import { getABCD, useQnA } from "../hooks";

export interface CommonQuestionProps {
  question: Question;
  onAnswer: (answer: number) => void;
}

const CommonQuestion: FunctionComponent<CommonQuestionProps> = ({ question, onAnswer }) => {
  const { content, answers } = useQnA(question.question);
  const extendedAnswers = question.type === 'DS' ? [
    'Statement <span style="color: red">(1) ALONE</span> is sufficient but statement (2) ALONE is not sufficient.',
    'Statement <span style="color: red">(2) ALONE</span> is sufficient but statement (1) ALONE is not sufficient.',
    '<span style="color: red">BOTH</span> statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient.',
    '<span style="color: red">EACH</span> statement ALONE is sufficient.',
    'Statements (1) and (2) <span style="color: red">TOGETHER</span> are <span style="color: red">not</span> sufficient. ',
  ] : answers;

  const [selected, setSelected] = useState(-1);
  useEffect(() => {
    setTimeout(() => {
      titleRef.current?.scrollIntoView();
    }, 100)
  }, [selected])
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  return <>
    <div className="w-full flex-none basis-12"></div>
    <div className="w-full overflow-y-auto">
      <h1 className="my-8 flex">
        <Content content={content} />
      </h1>
      <div className={`flex-none w-full grid ${question.type === 'DS' ? 'grid-cols-5' : question.type === 'SC' ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
        {extendedAnswers.map((answer, i, items) => <Button key={i} className={`px-4 ${question.type !== 'DS' && question.type !== 'SC' && items.length % 2 === 1 && i === items.length - 1 ? 'col-span-2' : ''}`} onClick={() => setSelected(i)}>
          {question.type === 'DS' ? getABCD(i) : <Content content={answer} />}
        </Button>)}
      </div>
    </div>
    <Explainations
      visible={selected > -1}
      onDismiss={() => setSelected(-1)}
      onConfirm={async () => onAnswer(selected)}
      yourAnswer={`${getABCD(selected)}. ${extendedAnswers[selected]}`}
      explainations={question.explainations}
    />
  </>;
}

export default CommonQuestion;