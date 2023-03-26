import { FC } from "react";
import { useNavigate } from "react-router";
import Button from "./button";

export const QuizTaker: FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button className="min-w-0" onClick={() => navigate('/quiz')}>💯</Button>
    </>
  );
}
