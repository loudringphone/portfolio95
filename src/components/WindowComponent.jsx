import React from 'react'
import { Window } from 'react95';

const WindowComponent = ({ task, activatingTask, indexingWindows, icons, selectingBinIcon, children }) => {
  const handleClickInsideWindow = (event) => {
    event.stopPropagation();
    activatingTask(task);
    indexingWindows(task);

    if (task == 'recycle bin') {
      const binRefs = Object.values(icons).map(task => task.binRef);
      if (binRefs.some(ref => ref?.current?.contains(event.target))) {
        return;
      }
      selectingBinIcon(null)
    }
  };
  
  const handleMouseDown = () => {
    activatingTask(task);
    indexingWindows(task);
  }

  return (
    <Window className={`${task.replaceAll(' ', '-')}-window`} onClick={handleClickInsideWindow} onMouseDown={handleMouseDown}>
      {children}
    </Window>
  )
}

export default WindowComponent