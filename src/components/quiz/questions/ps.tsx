import { FunctionComponent, useMemo, useState } from "react";
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
    console.log(question);
    const lines = question.question.split('<br>');
    const regex = /^([A-Z]\.|\(?[A-Z]\))\s+/i;
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

  return <>
    <div className="w-full flex-none basis-16"></div>
    <h1 className="my-8 overflow-auto">
      <Content content={content} />
    </h1>
    <div className="flex-none w-full grid grid-cols-2 gap-4">
      {answers.map((answer, i) => <Button key={i} className="px-4" onClick={() => setSelected(i)}>
        <Content content={answer} />
      </Button>)}
    </div>
    <BottomSheet open={selected > -1} onDismiss={() => onAnswer(selected)} title="Explanations">
      <h1 className="text-center font-bold">Explanations</h1>
      {question.explainations.map((ex, i) => <div className="m-4 p-4 rounded-lg bg-gray-100 border border-gray-200">
        <Content key={i} content={ex} />
      </div>)}
      <div className="fixed bottom-0 py-2 px-4 w-full bg-white shadow text-center space-y-2">
        <p>Your answer: <b>{answers[selected]}</b></p>
        <Button onClick={() => onAnswer(selected)} className="w-full bg-primary border-none text-white">Next question</Button>
      </div>
    </BottomSheet>
  </>;
}

export default ProblemSolving;