import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

const TextScroller = ({ text, isSkipped, resettingText }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const duration = 20000
  const [key, setKey] = useState(1);

  const [styles, api] = useSpring(() => ({
    from: { transform: "translate(100%,0)" },
    to: { transform: "translate(-250%,0)" },
    config: { duration: duration },
    reset: animationComplete,
    //reverse: key % 2 == 0,
    onRest: () => {
      setKey(key + 1);
    }
  }));

  const handlePause = () => {
    api.pause()
  };
  const handleResume = () => {
    api.resume()
  };

  useEffect(() => {
    window.addEventListener("touchmove", handlePause);
    window.addEventListener("touchend", handleResume);
    return () => {
      window.removeEventListener("touchmove", handlePause);
      window.removeEventListener("touchend", handleResume);
    };
  }, []);

  useEffect(() => {
    let timeoutId = null;
    if (isSkipped) {
      resettingText();
      setAnimationComplete(true);
      setKey(1);
    } else if (!animationComplete) {
      timeoutId = setTimeout(() => {
        setAnimationComplete(true);
      }, duration);
    } else {
      setAnimationComplete(false);
    }
    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [animationComplete, isSkipped]); 

  return (
    <div key={key} className="music-title">
      <animated.div style={styles}>{text}</animated.div>
    </div>
  );
};

export default TextScroller;