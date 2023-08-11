import React, { useState, useRef} from 'react'
import Draggable from 'react-draggable';


const Icon = ({ task, icon, iconRef, visibility, handleIcon, handleIconMobile, handlePickingIcon, handleLeavingIcon, iconIndice, activiatingDockMenu }) => {
  const [state, setState] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  });
  const onStart = (task) => {
    activiatingDockMenu(false)
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };
  const onStop = (task) => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };
  const taskName = task.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')
  return (
    <Draggable bounds="body" {...dragHandlers}>
    <div className='icon' ref={iconRef} style={{ zIndex: iconIndice[task], visibility: visibility, }}>
      <div
        onDoubleClick={(event) => handleIcon(event, task)}
        onTouchStart={(event) => handleIconMobile(event, task)}
        onMouseDown={(event) => handlePickingIcon(event, task)}
        onTouchEnd={() => handleLeavingIcon(task)}
        onMouseUp={() => handleLeavingIcon(task)}
      >
        {icon}
      </div>
      <div
        onDoubleClick={(event) => handleIcon(event, task)}
        onTouchStart={(event) => handleIconMobile(event, task)}
        onMouseDown={(event) => handlePickingIcon(event, task)}
        onTouchEnd={() => handleLeavingIcon(task)}
        onMouseUp={() => handleLeavingIcon(task)}
      >
      <p>
        {taskName}
      </p>
      </div>
    </div>
  </Draggable>
  )
}

export default Icon