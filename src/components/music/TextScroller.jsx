import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

const TextScroller = ({ text }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [key, setKey] = useState(1);

  const scrolling = useSpring({
    from: { transform: "translate(100%,0)" },
    to: { transform: "translate(-200%,0)" },
    config: { duration: 20000 },
    reset: animationComplete,
    //reverse: key % 2 == 0,
    onRest: () => {
      setKey(key + 1);
      setAnimationComplete(true);
    }
  });

  return (
    <div key={key} className="music-title">
      <animated.div style={scrolling}>{text}</animated.div>
    </div>
  );
};

export default TextScroller;