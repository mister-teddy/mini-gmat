import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button';
import sdk from '../utils/sdk';

function AreYouReady() {
  const navigate = useNavigate();

  return <>
    <div className='flex-1 relative font-bold text-center leading-[1] text-[12vw] pr-8 mb-8'>
      <span>Are you<br />ready</span>
      <span className='text-secondary text-[48vw] absolute -top-12 rotate-12'>?</span>
    </div>
    <Button onClick={() => navigate('/study')} large className='m-auto'>START</Button>
  </>;
}

const HomePage = () => {
  useEffect(() => {
    sdk.closeLoading({});
  }, [])

  return <div className='flex flex-col justify-center items-center w-full h-full p-[20%]'>
    <AreYouReady />
  </div>
}
export default HomePage
