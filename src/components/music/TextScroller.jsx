import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";

const TextScroller = ({ text, isSkipped, resettingText, isOpen }) => {
  const [restartAnimation, setRestartAnimation] = useState(false);
  const duration = 10000
  const scrolling = useSpring({
    from: { transform: "translate(100%,0)" },
    to: { transform: "translate(-225%,0)" },
    config: { duration: duration },
    reset: restartAnimation,
    onRest: () => {
      setRestartAnimation(true);
    }
  });

  const scrollRef = useRef(null)
  const handlePause = () => {
    scrolling.transform.pause()
  };
  const handleResume = () => {
    scrolling.transform.resume()
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
    if (isOpen) {
      scrolling.transform.resume()
    } else {
      scrolling.transform.pause()
    }
  }, [isOpen])

  useEffect(() => {
    if (isSkipped) {
      resettingText();
      setRestartAnimation(true);
    }
    if (restartAnimation) {
      setRestartAnimation(false);
    }
  }, [restartAnimation, isSkipped]); 

  return (
    <div className="music-title">
      <animated.div ref={scrollRef} style={scrolling}>{text}</animated.div>
    </div>
  );
};

export default TextScroller;