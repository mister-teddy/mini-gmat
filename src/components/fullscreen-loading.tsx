import { useRecoilValue } from "recoil";
import config from "../config";
import { darkState } from "../state/settings";
import Loading from "./loading";

function FullscreenLoading() {
  const dark = useRecoilValue(darkState);

  return (
    <div
      className="h-full w-full flex justify-center items-center space-x-4 bg-contain bg-bottom bg-no-repeat"
      style={{
        backgroundImage: dark ? undefined : `url(${config.COVER_URL})`,
      }}
    >
      <Loading visible />
    </div>
  );
}

export default FullscreenLoading;
