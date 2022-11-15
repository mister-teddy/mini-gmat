import { FunctionComponent, useEffect, useMemo, useRef, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import { Question } from "../../../models/database";
import Button from "../../button";
import Content from "../content";

interface ProblemSolvingProps {
  question: Question;
  onAnswer: (answer: number) => void;
}

const ProblemSolving: FunctionComponent<ProblemSolvingProps> = ({ question, onAnswer }) => {
  const { content, answers } = useMemo(() => {
    const lines = question.question.split('<br>').map(line => line.trim());
    const regex = /^([A-Z]\.|[A-Z]:|\(?[A-Z]\))\s*/i;
    const answers = [] as string[], nonAnswers = [] as string[];
    lines.forEach(line => {
      if (line.match(regex)) {
        answers.push(line);
      } else {
        nonAnswers.push(line);
      }
    })
    return {
      answers: answers.map(line => line.replace(regex, '')),
      content: nonAnswers.join('<br>')
    }
  }, [question])
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
      <div className="flex-none w-full grid grid-cols-2 gap-4">
        {answers.map((answer, i, items) => <Button key={i} className={`px-4 ${items.length % 2 === 1 && i === items.length - 1 ? 'col-span-2' : ''}`} onClick={() => setSelected(i)}>
          <Content content={answer} />
        </Button>)}
      </div>
    </div>
    <BottomSheet open={selected > -1} onDismiss={() => setSelected(-1)} title="Explanations">
      <h1 ref={titleRef} className="text-center font-bold">Explanations</h1>
      {question.explainations.map((ex, i) => <div className={`${i === 0 ? 'bg-yellow-100' : ''} m-4 p-4 rounded-lg bg-gray-100 border border-gray-200`}>
        {i === 0 && <b>🌟 Suggested answer </b>}
        <Content key={i} content={ex} />
      </div>)}
      <div className="w-full" style={{ height: footerHeight }}></div>
      <div ref={el => setFooterHeight(el ? el.clientHeight : 0)} className="fixed bottom-0 py-2 px-4 w-full bg-white shadow text-center space-y-2">
        <p>Your answer: <b>{String.fromCharCode(65 + selected)}. {answers[selected]}</b></p>
        <Button onClick={() => onAnswer(selected)} className="w-full bg-primary border-none text-white">Next question</Button>
      </div>
    </BottomSheet>
  </>;
}

export default ProblemSolving;