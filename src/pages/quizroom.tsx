import { useRecoilValue } from "recoil";
import LazyLoadImage from "../components/lazyload-image";
import { useConfettiFor } from "../utils/confetti";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";
import { Rank } from "../hooks/top";
import { Suspense } from "react";
import Loading from "../components/loading";
import config from "../config";
import { leaderboardState } from "../state/quiz";

function Podium() {
  const leaderboard = useRecoilValue(leaderboardState);

  return (
    <>
      <div className="top-3 grid grid-cols-3 justify-evenly mt-16 shadow shadow-primary">
        {[leaderboard[1], leaderboard[0], leaderboard[2]].map(
          (player: Rank | undefined, index) => (
            <Button
              loading={player ? player.isMe : false}
              key={index}
              className={`${[
                `scale-110 from-gray-100 to-gray-300 ${(player ? player.isMe : false) ? "" : "text-black"
                } origin-bottom-right !rounded-bl`,
                "scale-125 from-yellow-200 to-yellow-500",
                "from-amber-600 to-amber-800 !rounded-br",
              ][index]
                } mx-1 origin-bottom flex flex-col justify-center items-center rounded-bl-none rounded-br-none border-none bg-gradient-to-br !p-4 shadow-2xl shadow-primary`}
            >
              <div className="relative w-full aspect-square">
                <LazyLoadImage
                  src={player ? player.avatar : ""}
                  className={`object-cover rounded-full border-4 w-full h-full ${["border-gray-500", "border-yellow-400", "border-red-800"][
                    index
                  ]
                    }`}
                />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-3/4 text-xl">
                  {["🥈", "🥇", "🥉"][index]}
                </div>
              </div>
              <h1 className="mt-8 mb-2 font-bold">
                {player ? player.userName : "?"}
              </h1>
            </Button>
          )
        )}
      </div>
      <div className="flex-1 w-full space-y-2 overflow-y-auto pb-4">
        {leaderboard.slice(3).map((player, index) => (
          <Button
            key={player.id}
            loading={player.isMe}
            className={`py-2 px-4 w-full border-none first:mt-4 last:mb-4`}
          >
            <div className="flex justify-start flex-1 w-full items-center space-x-2">
              <div className="rounded-full shadow-lg shadow-primary flex-none border-2 border-white">
                <LazyLoadImage
                  src={player.avatar}
                  className={`flex-none w-12 h-12 rounded-full shadow object-cover`}
                />
              </div>
              <h1 className="whitespace-nowrap overflow-hidden text-ellipsis px-2 text-left">
                {player.userName}
                <br />
                <span className="text-sm">Top {index + 4}</span>
              </h1>
            </div>
          </Button>
        ))}
      </div>
    </>
  );
}

function LeaderboardPage() {
  useConfettiFor(2000);
  const navigate = useNavigate();

  return (
    <div className="w-full h-full px-[10%] flex flex-col">
      <div className="flex-none">
        <div className="flex justify-between items-center w-full mt-8">
          <div className="flex flex-col items-center">
            <h1>🏆</h1>
            <h2 className="font-bold text-xl text-center">Top {config.TOP}</h2>
            <select
              className="rounded text-black text-sm py-1 px-2 text-center mt-2"
            >
              {config.EVENT_SEASONS.map((week, i) => (
                <option key={week} value={week}>
                  Tuần {config.EVENT_SEASONS[i]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <Suspense
        fallback={
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
            <Loading visible />
          </div>
        }
      >
        <Podium />
      </Suspense>
    </div>
  );
}

export default LeaderboardPage;
