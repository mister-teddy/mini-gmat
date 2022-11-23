import { FC, FunctionComponent, useEffect, useMemo, useRef, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import { Question } from "../../../models/database";
import Button from "../../button";
import { Explainations } from "../../explainations";
import Content from "../content";
import { getABCD, useQnA } from "../hooks";

export interface ReadingComprehensionQuestionProps {
  question: Question;
  onAnswer: (answer: number[]) => void;
}

const SubQuestion: FC<{ question: string, onAnswer: (index: number) => any }> = ({ question, onAnswer }) => {
  const { content, answers } = useQnA(question);
  const [selected, setSelected] = useState(-1);
  useEffect(() => {
    onAnswer(selected);
  }, [selected])
  return (
    <div className="w-full overflow-y-auto">
      <h1 className="my-8 flex">
        <Content content={content} />
      </h1>
      <div className={`flex-none w-full grid grid-cols-1 gap-4`}>
        {answers.map((answer, i, items) => <Button key={i} className={`px-4`} loading={selected === i} onClick={() => setSelected(i)}>
          <Content content={answer} />
        </Button>)}
      </div>
    </div>
  );
}

const ReadingComprehensionQuestion: FunctionComponent<ReadingComprehensionQuestionProps> = ({ question, onAnswer }) => {
  const [reading, setReading] = useState(false);
  const [haveRead, setHaveRead] = useState(false);
  const [viewExplaination, setViewExplaination] = useState(false);
  const { readingContent, questions } = useMemo(() => {
    const div = document.createElement('div');
    div.innerHTML = question.question;
    const [readingContent, questionContent] = Array.from(div.querySelectorAll('.bbcodeBoxIn')).map(d => d.innerHTML);
    const questionDiv = document.createElement('div');
    questionDiv.innerHTML = questionContent;
    const questions: string[] = [];
    Array.from(questionDiv.childNodes).forEach(el => {
      if (el instanceof Element) {
        if (el.tagName.toUpperCase() !== 'BR') {
          if (el.classList.contains('placeholderTimerRC')) {
            questions.push('');
          } else {
            questions[questions.length - 1] += el.outerHTML;
          }
        }
      } else {
        questions[questions.length - 1] += '<br>' + el.textContent;
      }
    })
    return { readingContent, questions }
  }, [question])

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [footerHeight, setFooterHeight] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  useEffect(() => {
    console.log(questions.length, selected.length)
    if (questions.length > 0 && selected.filter(i => i !== -1).length === questions.length) {
      setViewExplaination(true);
    }
  }, [selected])
  const [navHeight, setNavHeight] = useState(0);

  return <>
    <div className="w-full flex-none basis-12"></div>
    <div className="w-full overflow-y-auto">
      {questions.map((question, i) => <SubQuestion question={question} onAnswer={(answerIndex) => setSelected(ss => {
        ss[i] = answerIndex;
        return [...ss];
      })} />)}
      <div className="w-full flex-none" style={{ height: navHeight }}></div>
    </div>
    <div ref={el => setNavHeight(el ? el.clientHeight : 0)} className="absolute bottom-0 left-0 right-0 z-50 backdrop-blur flex justify-center space-x-4 p-4">
      <Button onClick={() => { setReading(true); setHaveRead(true) }} loading={!haveRead} disabled={false}>📖</Button>
      <Button onClick={() => setViewExplaination(true)}>🔑</Button>
    </div>
    <BottomSheet open={reading} onDismiss={() => setReading(false)}>
      <h1 ref={titleRef} className="text-center font-bold">Reading Passage</h1>
      <p className="m-4 p-4">
        <Content content={readingContent} />
      </p>
      <div className="w-full" style={{ height: footerHeight }}></div>
      <div ref={el => setFooterHeight(el ? el.clientHeight : 0)} className="fixed bottom-0 py-2 px-4 w-full bg-white shadow text-center space-y-2">
        <Button onClick={() => setReading(false)} className="w-full bg-secondary text-secondary-text border-none">Close</Button>
      </div>
    </BottomSheet>
    <Explainations
      visible={viewExplaination}
      onDismiss={() => setViewExplaination(false)}
      onConfirm={async () => onAnswer(selected)}
      yourAnswer={`${selected.map(getABCD).join(', ')}`}
      explainations={question.explainations}
    />
  </>;
}

export default ReadingComprehensionQuestion;