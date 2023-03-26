import { FC, useRef, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import Button from "./button";
import Content from "./quiz/content";

export const Explanations: FC<{ visible: boolean, onDismiss: () => void, onConfirm: () => Promise<void>, yourAnswer: string, explanations: string[] }> = ({ visible, onDismiss, onConfirm, yourAnswer, explanations }) => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  return (
    <BottomSheet expandOnContentDrag open={visible} onDismiss={onDismiss} title="Explanations">
      <h1 ref={titleRef} className="text-center font-bold">Explanations</h1>
      {explanations.map((ex, i) => <div key={i} className={`${i === 0 ? 'bg-yellow-100' : ''} m-4 p-4 rounded-lg bg-gray-100 border border-gray-200`}>
        {i === 0 && <b>🌟 Suggested answer </b>}
        <Content key={i} content={ex} />
      </div>)}
      <div className="w-full" style={{ height: footerHeight }}></div>
      <div ref={el => setFooterHeight(el ? el.clientHeight : 0)} className="fixed bottom-0 py-2 px-4 w-full bg-white shadow text-center space-y-2">
        <Content content={`Your answer: <b>${yourAnswer}</b>`} />
        <Button onClick={onConfirm} className="w-full bg-primary text-primary-text border-none text-text">Next question</Button>
      </div>
    </BottomSheet>
  );
}
