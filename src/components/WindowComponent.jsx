import React from 'react'
import { Window } from 'react95';

const WindowComponent = ({ task, handleTouchStart, setActiveTask, indexingTasks, icons, setSelectedBinIcon, children }) => {
  const handleClickInsideWindow = (event) => {
    event.stopPropagation();
    setActiveTask(task);
    indexingTasks(task);

    if (task == 'recycle bin') {
      const elementClass = event.target.className
      if (elementClass.includes('window-content') || elementClass == 'bin-icons') {
        setSelectedBinIcon(null)
      }
    }
  };
  const handleMouseDown = () => {
    setActiveTask(task);
    indexingTasks(task);
  }

  if (handleTouchStart) {
    return (
      <Window className={`${task.replaceAll(' ', '-')}-window`} onClick={handleClickInsideWindow} onMouseDown={handleMouseDown} onTouchStartCapture={handleTouchStart}>
      {children}
    </Window>
    )
  }

  return (
    <Window className={`${task.replaceAll(' ', '-')}-window`} onClick={handleClickInsideWindow} onMouseDown={handleMouseDown}>
      {children}
    </Window>
  )
}

export default WindowComponent