import Loading from "./loading";

function FullscreenLoading() {
  return (
    <div className="h-full w-full flex justify-center items-center space-x-4">
      <span>💯</span>
      <Loading visible />
      <span>🏆</span>
    </div>
  );
}

export default FullscreenLoading;
