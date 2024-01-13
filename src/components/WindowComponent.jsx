import React, { useState, useEffect } from 'react'
import { Window } from 'react95';

const WindowComponent = ({ task, setActiveTask, indexingWindows, icons, setSelectedBinIcon, children }) => {
  const handleClickInsideWindow = (event) => {
    event.stopPropagation();
    setActiveTask(task);
    indexingWindows(task);

    if (task == 'recycle bin') {
      const binRefs = Object.values(icons).map(task => task.binRef);
      if (binRefs.some(ref => ref?.current?.contains(event.target))) {
        return;
      }
      setSelectedBinIcon(null)
    }
  };
  const handleMouseDown = () => {
    setActiveTask(task);
    indexingWindows(task);
  }

  const [documentPosition, setDocumentPosition] = useState(0);
  const [touchStartY, setTouchStartY] = useState(null);
  const handleTouchStart = (event) => {
    setTouchStartY(event.touches[0].clientY);
    setDocumentPosition(document.documentElement.scrollTop);
  };
  const handleTouchMove = (event) => {
    const touchEndY = event.touches[0].clientY;
    if (setDocumentPosition === 0 && touchEndY > touchStartY) {
      event.preventDefault();
    }
  };
  useEffect(() => {
    const logValues = () => {
      console.log('Document position:', document.documentElement.scrollTop);
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      logValues(); // Log values before cleanup

      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove)
    };
  }, [touchStartY, documentPosition]);

  return (
    <Window className={`${task.replaceAll(' ', '-')}-window`} onClick={handleClickInsideWindow} onMouseDown={handleMouseDown} onTouchStartCapture={handleTouchStart} onTouchMove={handleTouchMove}>
      {children}
    </Window>
  )
}

export default WindowComponent