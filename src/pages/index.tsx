import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AddToCalendar } from '../components/add-to-calendar';
import Button from '../components/button';
import { SupportUs } from '../components/support-us';
import { QuestionType } from '../models/database';
import { databaseState } from '../state/database';
import { currentQuestionTypeState } from '../state/questions';
import sdk from '../utils/sdk';

const labels = {
  RC: 'Reading Comprehension',
  SC: 'Sentence Correction',
  CR: 'Critical Reasoning',
  PS: 'Problem Solving',
  DS: 'Data Sufficiency'
}

function AreYouReady() {
  const navigate = useNavigate();
  const db = useRecoilValue(databaseState);
  const chooseType = useSetRecoilState(currentQuestionTypeState);

  return <>
    <div className='flex-1 relative font-bold text-center leading-[1] text-[12vw] pr-8 -ml-4'>
      <span>GMAT<br />practice</span>
      <span className='text-secondary text-[48vw] absolute -top-12 rotate-12'>?</span>
    </div>
    {Object.keys(db).map(questionType => <Button key={questionType} onClick={() => {
      chooseType(questionType as QuestionType);
      navigate('/study');
    }} className='w-full font-bold'>{labels[questionType]}</Button>)}
    <div className="flex space-x-4">
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

  return <div className='flex flex-col justify-center items-center w-full h-full p-[15%] pt-[25%] space-y-4'>
    <AreYouReady />
  </div>
}
export default HomePage
