import { FunctionComponent } from "react";
import { animated, SpringValue } from "react-spring";

interface OverlayProps {
  blur: SpringValue<number>;
}

const Overlay: FunctionComponent<OverlayProps> = ({ blur }) => {
  return (
    <animated.div
      style={(() => {
        const v = blur.to((v) => `blur(${v}px)`);
        return {
          backdropFilter: v,
          WebkitBackdropFilter: v,
        };
      })()}
      className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none"
    ></animated.div>
  );
};

export default Overlay;
