import React from 'react';
import { useSpring, animated } from 'react-spring';

const AnimatedContent = ({ children }) => {
  const { x } = useSpring({
    from: { x: 0 },
    x: 1,
    config: { tension: 180, friction: 12 },
    reset: true,
  });

  return (
    <animated.div
    style={{
      transform: x
        .interpolate({
          range: [0, 0.2, 0.4, 0.6, 0.8, 1],
          output: [0, -10, 10, -10, 10, 0],
        })
        .to((x) => `translate3d(0, ${x}px, 0)`),
    }}>
      {children}
    </animated.div>
  );
};

const ConditionalAnimatedWrapper = ({ animate, children }) => {
  if (animate) {
    return <AnimatedContent>{children}</AnimatedContent>;
  } else {
    return <div>{children}</div>;
  }
};

export default ConditionalAnimatedWrapper;




