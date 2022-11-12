import { RecoilRoot, useRecoilValue, useRecoilValueLoadable } from 'recoil'
import { HashRouter, Routes, Route } from "react-router-dom";

import HomePage from '../pages/index';
import { darkState } from '../state/theme';
import { loggedInState } from '../state/auth';
import bg from '../static/bg.png';
import Loading from './loading';
import { Suspense } from 'react';
import StudyRoom from '../pages/studyroom';
import ErrorBoundary from './error-boundary';

const Root = () => {
  useRecoilValueLoadable(loggedInState);

  const dark = useRecoilValue(darkState);
  document.documentElement.classList.toggle('dark', dark);

  return <div className={`fixed left-0 right-0 top-0 bottom-0 dark:bg-dark overflow-y-auto bg-cover bg-no-repeat bg-center text-white`} style={{ backgroundImage: `url(${bg})` }}>
    <ErrorBoundary>
      <Suspense fallback={<div className='h-full w-full flex justify-center items-center'><Loading visible /></div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/study" element={<StudyRoom />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  </div >
}

const App = () => {
  return <RecoilRoot>
    <HashRouter>
      <Root />
    </HashRouter>
  </RecoilRoot>
}

export default App
