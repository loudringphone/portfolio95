import React from 'react'
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

  return (
    <Window className={`${task.replaceAll(' ', '-')}-window`} onClick={handleClickInsideWindow} onMouseDown={handleMouseDown}>
      {children}
    </Window>
  )
}

export default WindowComponent