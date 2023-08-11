import React, { useState, useRef} from 'react'
import Draggable from 'react-draggable';


const Icon = ({ task, icon, iconRef, visibility, handleIcon, handleIconMobile, handlePickingIcon, handleLeavingIcon, iconIndice }) => {
  const [state, setState] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  });
  const onStart = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };
  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };
  const taskName = task.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')
  return (
    <Draggable bounds="body" {...dragHandlers}>
    <div className='icon' style={{ zIndex: iconIndice[task], visibility: visibility, }}>
      <div
        ref={iconRef}
        onDoubleClick={(event) => handleIcon(event, task)}
        onTouchStart={(event) => handleIconMobile(event, task)}
        onMouseDown={() => handlePickingIcon(task)}
        onTouchEnd={() => handleLeavingIcon(task)}
        onMouseUp={() => handleLeavingIcon(task)}
      >
        {icon}
      </div>
      <p
        onDoubleClick={(event) => handleIcon(event, task)}
        onTouchStart={(event) => handleIcon(event, task)}
        onMouseDown={() => handlePickingIcon(task)}
        onTouchEnd={() => handleLeavingIcon(task)}
        onMouseUp={() => handleLeavingIcon(task)}
        onClick={() => handleLeavingIcon(task)}
      >
        {taskName}
      </p>
    </div>
  </Draggable>
  )
}

export default Icon