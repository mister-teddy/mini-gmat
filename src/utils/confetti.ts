import confetti from "canvas-confetti";
import { useEffect, useRef, useState } from "react";

var colors = ["#bb0000", "#ffffff"];

export const fire = (x: number, y: number) => {
  confetti({
    origin: {
      startVelocity: 0,
      gravity: 5,
      x: x / window.innerWidth,
      y: y / window.innerHeight,
    },
  });
};

export const sideConfetti = (callback?: () => void) => {
  confetti({
    angle: 60,
    spread: 55,
    origin: { x: 0 },
  });
  confetti({
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors,
  });

  if (callback) {
    callback();
  }
};

export const useConfetti = () => {
  const firing = useRef(true);

  const start = () => {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    if (firing.current) {
      requestAnimationFrame(start);
    }
  };

  useEffect(() => {
    start();
  }, []);

  const stop = () => {
    firing.current = false;
  };

  const restart = () => {
    firing.current = true;
    start();
  };

  return [stop, restart];
};

export const useConfettiFor = (duration: number) => {
  const [stop, restart] = useConfetti();
  useEffect(() => {
    setTimeout(stop, duration);
    window.addEventListener("touchstart", restart);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("touchstart", restart);
      window.removeEventListener("touchend", stop);
      stop();
    };
  }, []);
};
