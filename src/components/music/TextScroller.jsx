import {forwardRef, useState, useEffect, useImperativeHandle } from "react";
import { useSpring, animated } from "react-spring";

const TextScroller = forwardRef(({ text, isSkipped, setIsSkipped, displayTasks }, ref) => {
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
  const scrollingTransform = scrolling.transform

  useImperativeHandle(ref, () => {
    return {
      resume() { scrollingTransform.resume() },
      pause() { scrollingTransform.pause() },
      reset() { scrollingTransform.reset() },
    }
  }, [])

  useEffect(() => {
    if (displayTasks.has('music')) {
      const handlePause = () => {
        scrollingTransform.pause()
      };
      const handleResume = () => {
        scrollingTransform.resume()
      };
      window.addEventListener("touchmove", handlePause);
      window.addEventListener("touchend", handleResume);
      return () => {
        window.removeEventListener("touchmove", handlePause);
        window.removeEventListener("touchend", handleResume);
      };
    }
  }, [displayTasks]);

  useEffect(() => {
    if (isSkipped) {
      setIsSkipped(false);
      setRestartAnimation(true);
    }
    if (restartAnimation) {
      setRestartAnimation(false);
    }
  }, [restartAnimation, isSkipped]); 

  return (
    <div className="music-title">
      <animated.div style={scrolling}>{text}</animated.div>
    </div>
  );
});

export default TextScroller;