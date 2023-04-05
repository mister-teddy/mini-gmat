import { RecoilRoot, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { HashRouter, Routes, Route } from "react-router-dom";
import cover from "../static/cover.png";
import HomePage from "../pages/index";
import { darkState, fontState } from "../state/settings";
import Loading from "./loading";
import { Suspense } from "react";
import StudyRoom from "../pages/studyroom";
import ErrorBoundary from "./error-boundary";
import { MathJaxContext } from "better-react-mathjax";
import SavedQuestionsPage from "../pages/saved-questions";
import LeaderBoardPage from "../pages/podium";
import TestRoomPage from "../pages/testroom";

const Root = () => {
  const dark = useRecoilValue(darkState);
  const font = useRecoilValue(fontState);
  document.documentElement.classList.toggle("dark", dark);

  return (
    <div
      className={`fixed left-0 right-0 top-0 bottom-0 pt-6 overflow-y-auto bg-cover bg-no-repeat bg-center text-text bg-background`}
      style={{ backgroundImage: `url(${cover})`, fontFamily: font }}
    >
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="h-full w-full flex justify-center items-center">
              <Loading visible />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/study" element={<StudyRoom />} />
            <Route path="/saved" element={<SavedQuestionsPage />} />
            <Route path="/quiz" element={<LeaderBoardPage />} />
            <Route path="/test" element={<TestRoomPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

const App = () => {
  return (
    <RecoilRoot>
      <MathJaxContext>
        <HashRouter>
          <Root />
        </HashRouter>
      </MathJaxContext>
    </RecoilRoot>
  );
};

export default App;
