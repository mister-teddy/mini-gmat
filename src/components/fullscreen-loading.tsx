import Loading from "./loading";

function FullscreenLoading() {
  return (
    <div className="h-full w-full flex justify-center items-center space-x-4">
      <Loading visible />
    </div>
  );
}

export default FullscreenLoading;
