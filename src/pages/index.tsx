import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddToCalendar } from '../components/add-to-calendar';
import Button from '../components/button';
import { SupportUs } from '../components/support-us';
import sdk from '../utils/sdk';

function AreYouReady() {
  const navigate = useNavigate();

  return <>
    <div className='flex-1 relative font-bold text-center leading-[1] text-[12vw] pr-8 -ml-4'>
      <span>GMAT<br />practice</span>
      <span className='text-secondary text-[48vw] absolute -top-12 rotate-12'>?</span>
    </div>
    {['Reading Comprehension', 'Sentence Correction', 'Critical Reasoning', 'Problem Solving', 'Data Sufficiency'].map(questionType => <Button key={questionType} onClick={() => navigate('/study')} className='w-full font-bold'>{questionType}</Button>)}
    <div className="flex space-x-4">
      <AddToCalendar />
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
