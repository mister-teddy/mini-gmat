import { RecoilRoot, useRecoilValue, useRecoilValueLoadable } from 'recoil'
import { HashRouter, Routes, Route } from "react-router-dom";

import HomePage from '../pages/index';
import { darkState } from '../state/settings';
import { loggedInState } from '../state/auth';
import Loading from './loading';
import { Suspense } from 'react';
import StudyRoom from '../pages/studyroom';
import ErrorBoundary from './error-boundary';
import { MathJaxContext } from 'better-react-mathjax';
import SavedQuestionsPage from '../pages/saved-questions';
import QuizRoomPage from '../pages/quizroom';

const Root = () => {
  useRecoilValueLoadable(loggedInState);

  const dark = useRecoilValue(darkState);
  document.documentElement.classList.toggle('dark', dark);

  return <div className={`fixed left-0 right-0 top-0 bottom-0 overflow-y-auto bg-cover bg-no-repeat bg-center text-text bg-background`}>
    <ErrorBoundary>
      <Suspense fallback={<div className='h-full w-full flex justify-center items-center'><Loading visible /></div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/study" element={<StudyRoom />} />
          <Route path="/saved" element={<SavedQuestionsPage />} />
          <Route path="/quiz" element={<QuizRoomPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  </div >
}

const App = () => {
  return <RecoilRoot>
    <MathJaxContext>
      <HashRouter>
        <Root />
      </HashRouter>
    </MathJaxContext>
  </RecoilRoot>
}

export default App
