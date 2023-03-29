import { useRecoilState, useRecoilValue } from "recoil";
import LazyLoadImage from "../components/lazyload-image";
import { useConfettiFor } from "../utils/confetti";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";
import {
  leaderboardState,
  quizzesState,
  selectedQuizIdState,
  quizDetailState,
} from "../state/quiz";
import { userState } from "../state/auth";
import { displayScore } from "../utils/quiz";
import { Suspense } from "react";
import FullscreenLoading from "../components/fullscreen-loading";
import { openShareSheet } from "zmp-sdk";

function Podium() {
  const leaderboard = useRecoilValue(leaderboardState);
  const user = useRecoilValue(userState);
  const quizDetail = useRecoilValue(quizDetailState);
  if (!leaderboard.data) {
    return <></>;
  }

  return (
    <>
      <div className="top-3 grid grid-cols-3 justify-evenly mt-20">
        {[leaderboard.data[1], leaderboard.data[0], leaderboard.data[2]].map(
          (player, index) => (
            <Button
              loading={player ? player.taker === user.userInfo.id : false}
              key={index}
              className={`${
                [
                  `scale-110 from-gray-100 to-gray-300 ${
                    (player ? player.taker === user.userInfo.id : false)
                      ? ""
                      : "text-black"
                  } origin-bottom-right !rounded-bl`,
                  "scale-125 from-yellow-200 to-yellow-500",
                  "from-amber-600 to-amber-800 !rounded-br",
                ][index]
              } mx-1 origin-bottom flex flex-col justify-center items-center rounded-bl-none rounded-br-none border-none bg-gradient-to-br !p-4 shadow-2xl shadow-primary`}
            >
              <div className="relative w-full aspect-square">
                <LazyLoadImage
                  src={
                    player?.avatar ??
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOklEQVQYlWNgwA7+MtwzgBfJhHgXAszE3AwMDA+QIBaG0wAAAABJRU5ErkJggg=="
                  }
                  className={`object-cover rounded-full border-4 w-full h-full ${
                    [
                      "border-gray-500 bg-gray-600",
                      "border-yellow-400 bg-yellow-500",
                      "border-red-800 bg-red-900",
                    ][index]
                  }`}
                />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-3/4 text-xl">
                  {["🥈", "🥇", "🥉"][index]}
                </div>
              </div>
              <h1 className="mt-8 mb-2 font-bold">
                {player ? player.display_name : "?"}
              </h1>
              {!!player && (
                <div className="mb-2 text-sm">
                  {displayScore(player, quizDetail?.data?.duration ?? 30)}
                </div>
              )}
            </Button>
          )
        )}
      </div>
      <div className="flex-1 w-full space-y-2 overflow-y-auto pb-4">
        {(leaderboard.data ?? []).slice(3).map((player, index) => (
          <Button
            key={player.id}
            loading={player.taker === user.userInfo.id}
            className={`py-2 px-4 w-full border-none first:mt-4 last:mb-4`}
          >
            <div className="flex justify-start flex-1 w-full items-center space-x-2">
              <div className="rounded-full shadow-lg shadow-primary flex-none border-2 border-white">
                <LazyLoadImage
                  src={player.avatar!}
                  className={`flex-none w-12 h-12 rounded-full shadow object-cover`}
                />
              </div>
              <h1 className="whitespace-nowrap overflow-hidden text-ellipsis px-2 text-left">
                {player.display_name}
                <br />
                <span className="text-sm">
                  {displayScore(player, quizDetail?.data?.duration ?? 30)}
                </span>
              </h1>
            </div>
          </Button>
        ))}
      </div>
    </>
  );
}

function LeaderBoardPage() {
  useConfettiFor(500);
  const user = useRecoilValue(userState);
  const quizzes = useRecoilValue(quizzesState);
  const [selectedQuizId, setSelectedQuizId] =
    useRecoilState(selectedQuizIdState);
  const quizDetail = useRecoilValue(quizDetailState);
  const navigate = useNavigate();
  const share = () => {
    if (quizDetail && quizDetail.data) {
      openShareSheet({
        type: "zmp",
        data: {
          title: `${user.userInfo.name} invite you to take the "${quizDetail.data.name}"`,
          thumbnail: user.userInfo.avatar,
          path: `?quiz=${quizDetail.data.id}`,
          description: `Quiz "${quizDetail.data.name}" | ${
            JSON.parse(quizDetail.data.question_ids).length
          } questions | ${quizDetail.data.duration} minutes`,
        },
      });
    }
  };

  return (
    <div className="w-full h-full px-[10%] flex flex-col">
      <div className="flex-none">
        <div className="flex justify-between items-center w-full mt-8">
          <div className="flex flex-col items-center w-full">
            <h1 className="text-[32px]">🏆</h1>
            <div className="flex items-center space-x-4">
              {quizDetail && quizDetail.data && (
                <h2 className="font-bold text-xl text-center">
                  {quizDetail.data.name}
                </h2>
              )}
              <a onClick={share}>
                <span>🏹</span>
              </a>
            </div>
            <select
              className="rounded text-black py-1 px-2 text-center mt-2 text-sm"
              value={selectedQuizId}
              onChange={(e) => setSelectedQuizId(Number(e.target.value))}
            >
              {(quizzes.data ?? []).map((quiz) => (
                <option
                  key={quiz.id}
                  value={quiz.id}
                  disabled={selectedQuizId === quiz.id}
                >
                  {selectedQuizId === quiz.id ? "Change quiz" : quiz.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <Podium />
      {quizDetail && quizDetail.data && (
        <div className="py-2">
          <Button large className="w-full" onClick={() => navigate("/test")}>
            <span className="flex flex-col">
              <span>📝 Enter</span>
              <span className="text-sm font-normal">
                {JSON.parse(quizDetail.data.question_ids).length} questions |{" "}
                {quizDetail.data.duration} minutes
              </span>
            </span>
          </Button>
        </div>
      )}
    </div>
  );
}

function PodiumPage() {
  return (
    <Suspense fallback={<FullscreenLoading />}>
      <LeaderBoardPage />
    </Suspense>
  );
}

export default PodiumPage;
