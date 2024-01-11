import React from 'react'
import { Window } from 'react95';

const WindowComponent = ({ task, activatingTask, indexingWindows, children }) => {
  const handleClickInsideWindow = (event) => {
    event.stopPropagation();
    activatingTask(task);
    indexingWindows(task)
  };

  return (
    <Window className={`${task}-window`} onClick={handleClickInsideWindow}>
      {children}
    </Window>
  )
}

export default WindowComponent