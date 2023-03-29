import { useEffect } from "react";
import { useConfetti } from "../utils/confetti";
import Loading from "./loading";

function FullscreenLoading() {
  const [stop] = useConfetti();
  useEffect(() => stop);

  return (
    <div className="h-full w-full flex justify-center items-center space-x-4">
      <Loading visible />
    </div>
  );
}

export default FullscreenLoading;
