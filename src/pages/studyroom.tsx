import { useRecoilValue } from "recoil";
import { questionsState } from "../state/questions";
import logo1Line from "../static/logo-1-line.png";
import correct from "../static/correct.png";
import Question from "../components/quiz/questions";
import { useEffect, useState } from "react";
import Countdown from "../components/countdown";
import { useConfetti } from "../utils/confetti";

function Header({ current, total }: { current: number, total: number }) {
  return <div className="absolute left-0 px-8 py-4 font-bold">
    <img className="w-28" src={logo1Line} alt="GMAT Practice Questions" />
    <div className="flex space-x-2 my-2">
      <img className="w-5 h-6 object-contain" src={correct} alt="✅" />
      <span>{current}/{total}</span>
      <span className="h-5">⌛</span>
      <Countdown timeLeft={30 * 60 * 1000} render={([, , minute, second]) => <span>{minute}:{second}</span>} />
    </div>
  </div>;
}

function Finished() {
  const [stop] = useConfetti();
  useEffect(() => stop, []);
  return <h1 className="flex justify-center items-center h-full font-bold text-lg">Congratulations!</h1>;
}

function StudyRoom() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questions = useRecoilValue(questionsState);

  return <div className="w-full h-full">
    <Header current={currentQuestion} total={questions.length} />
    {questions[currentQuestion] ? <Question key={currentQuestion} question={questions[currentQuestion]} onAnswer={async answer => {
      console.log(answer);
      await new Promise(resolve => setTimeout(resolve, 500));
      setCurrentQuestion(currentQuestion + 1);
    }} /> : <Finished />}
  </div>;
}

export default StudyRoom;