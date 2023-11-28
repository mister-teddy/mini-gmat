import React, { useState, useEffect, useMemo } from "react";

const fixedTwo = (x: number) => `${x}`.padStart(2, "0");

function Countup(props: {
  onCount: (seconds: number) => void;
  render?: (times: string[]) => React.ReactElement;
}) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t + 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    props.onCount(timeLeft / 1000);
  }, [timeLeft]);

  const formattedTimeLeft = useMemo(() => {
    const seconds = Math.floor((timeLeft / 1000) % 60);
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const hours = Math.floor((timeLeft / 1000 / 60 / 60) % 24);
    const days = Math.floor(timeLeft / 1000 / 60 / 60 / 24);
    return [days, hours, minutes, seconds].map(fixedTwo);
  }, [timeLeft]);

  return props.render ? (
    props.render(formattedTimeLeft)
  ) : (
    <div className="w-full text-center flex origin-top-left">
      {["Ngày", "Giờ", "Phút", "Giây"].map((label, i) => (
        <div key={i} className="flex-1">
          <div
            key={i}
            className={`border-2 border-primary font-bold text-xl p-2 ${
              i > 0 ? "border-l-0" : ""
            } ${i === 0 ? "rounded-tl rounded-bl" : ""} ${
              i === 3 ? "rounded-tr rounded-br" : ""
            }`}
          >
            {formattedTimeLeft[i]}
          </div>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export default Countup;
