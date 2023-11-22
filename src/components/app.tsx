import { RecoilRoot, useRecoilValue } from "recoil";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "../pages/index";
import { darkState, fontSizeState, fontState } from "../state/settings";
import Loading from "./loading";
import { Suspense, useEffect } from "react";
import StudyRoom from "../pages/studyroom";
import ErrorBoundary from "./error-boundary";
import { MathJaxContext } from "better-react-mathjax";
import SavedQuestionsPage from "../pages/saved-questions";
import LeaderBoardPage from "../pages/podium";
import TestRoomPage from "../pages/testroom";
import config from "../config";

const Root = () => {
  const dark = useRecoilValue(darkState);
  const font = useRecoilValue(fontState);
  const fontSize = useRecoilValue(fontSizeState);
  const location = useLocation();

  document.documentElement.classList.toggle("dark", dark);
  useEffect(() => {
    document.body.style.fontFamily = font ?? "";
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [font, fontSize]);

  return (
    <div
      className={`fixed left-0 right-0 top-0 bottom-0 pt-6 overflow-y-auto bg-no-repeat text-text bg-background bg-bottom bg-contain`}
      style={{
        backgroundImage:
          dark || location.pathname !== "/"
            ? undefined
            : `url(${config.COVER_URL})`,
      }}
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
