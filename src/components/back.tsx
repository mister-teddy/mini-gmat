import { FC } from "react";
import { useNavigate } from "react-router";

const Back: FC = () => {
  const navigate = useNavigate();

  return <>
    <a className="space-x-2" onClick={() => navigate(-1)}><span className="h-5">⬅️</span><span>Home</span></a><span></span>
  </>;
}

export default Back;