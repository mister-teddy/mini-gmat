import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValueLoadable, useResetRecoilState, useSetRecoilState } from 'recoil';
import { AddToCalendar } from '../components/add-to-calendar';
import Button from '../components/button';
import { SupportUs } from '../components/support-us';
import ZaloMiniApp from '../components/zalo-mini-app';
import { QuestionType } from '../models/database';
import { currentQuestionState, currentQuestionTypeState, manualQuestionIdState } from '../state/questions';
import sdk from '../utils/sdk';

export const questionTypesLabel = {
  DS: <><span className="text-xl absolute -translate-x-2">💯</span><span className="ml-8"> Data Sufficiency</span></>,
  PS: <><span className="text-xl absolute -translate-x-2">💡</span><span className="ml-8"> Problem Solving</span></>,
  CR: <><span className="text-xl absolute -translate-x-2">🤔</span><span className="ml-8"> Critical Reasoning</span></>,
  SC: <><span className="text-xl absolute -translate-x-2">✍️</span><span className="ml-8"> Sentence Correction</span></>,
  RC: '⌛️ Reading Comprehension',
}

const commingSoon = ['RC']

function AreYouReady() {
  const navigate = useNavigate();
  const clearManualId = useResetRecoilState(manualQuestionIdState);
  const chooseType = useSetRecoilState(currentQuestionTypeState);
  const [ready, setReady] = useState(false);
  const currentQuestion = useRecoilValueLoadable(currentQuestionState);
  useEffect(() => {
    if (currentQuestion.state === 'hasValue' && ready) {
      navigate('/study');
    }
  }, [ready, currentQuestion])

  return <>
    <div className='flex-1 relative font-bold text-center leading-[1] text-[12vw] pr-8 -ml-4'>
      <span>GMAT<br />practice</span>
      <span className='text-secondary text-[48vw] absolute -top-12 rotate-12'>?</span>
    </div>
    {Object.keys(questionTypesLabel).map(questionType => <Button key={questionType} disabled={commingSoon.includes(questionType)} onClick={async () => {
      chooseType(questionType as QuestionType);
      clearManualId();
      setReady(true)
      await new Promise(() => { })
    }} className={`w-full font-bold whitespace-nowrap !justify-start ${commingSoon.includes(questionType) ? 'flex-col opacity-75 active:bg-transparent' : 'text-lg'}`}>
      {questionTypesLabel[questionType]}
      {commingSoon.includes(questionType) && <small className="font-normal">Comming Soon</small>}
    </Button>)}
    <div className="flex space-x-4 pb-8">
      <AddToCalendar />
      <Button onClick={() => navigate('/saved')}>✅</Button>
      <SupportUs />
    </div>
  </>;
}

const HomePage = () => {
  useEffect(() => {
    sdk.closeLoading({});
  }, [])

  return <div className='flex flex-col justify-center items-center w-full h-full px-[15%] pt-[25%] space-y-4'>
    <AreYouReady />
    <small className="whitespace-nowrap space-x-2 opacity-75">A product of <ZaloMiniApp className="inline" width={96} /> team</small>
  </div>
}
export default HomePage
