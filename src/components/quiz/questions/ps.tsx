import { FunctionComponent, useMemo } from "react";
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

  return <>
    <div className="w-full flex-none basis-16"></div>
    <h1 className="my-8 overflow-auto">
      <Content content={content} />
    </h1>
    <div className="flex-none w-full grid grid-cols-2 gap-4">
      {answers.map((answer, i) => <Button key={i} className="px-4" onClick={() => onAnswer(i)}>
        <Content content={answer} />
      </Button>)}
    </div>
  </>;
}

export default ProblemSolving;