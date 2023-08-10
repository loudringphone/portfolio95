import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

const TextScroller = ({ text }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [duration, setDuration] = useState(10000)
  const [key, setKey] = useState(1);

  const scrolling = useSpring({
    from: { transform: "translate(100%,0)" },
    to: { transform: "translate(-250%,0)" },
    config: { duration: duration },
    reset: animationComplete,
    //reverse: key % 2 == 0,
    onRest: () => {
      setKey(key + 1);
    }
  });

  useEffect(() => {
    if (!animationComplete) {
      setTimeout(() => {
        setAnimationComplete(true)
      }, duration);
    } else {
      setTimeout(() => {
        setAnimationComplete(false)
      }, 0);
    }
    
  }, [animationComplete]); 

  return (
    <div key={key} className="music-title">
      <animated.div style={scrolling}>{text}</animated.div>
    </div>
  );
};

export default TextScroller;