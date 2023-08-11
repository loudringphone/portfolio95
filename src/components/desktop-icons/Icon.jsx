import React, { useState, useRef} from 'react'
import Draggable from 'react-draggable';


const Icon = ({ task, icon, iconRef, visibility, handleIcon, handleIconMobile, handlePickingIcon, handleLeavingIcon, iconIndice, activiatingDockMenu, selectingIcon, selectedIcon, elementRef }) => {
  const [selected, setSelected] = useState(false)
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
    activiatingDockMenu(false)
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };
  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };
  const taskName = task.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')

  const handleMouseDown = (task) => {
    selectingIcon(task)
    handlePickingIcon(task)
  }
  const handleTouchStart = (event, task) => {
    selectingIcon(task)
    handleIconMobile(event, task)
  }


  return (
    <Draggable bounds="body" {...dragHandlers}>
    <div className='icon' ref={elementRef} style={{ zIndex: iconIndice[task], visibility: visibility, }}>
      <div
        className='icon-placeholder'
        ref={iconRef}
        onDoubleClick={(event) => handleIcon(event, task)}
        onTouchStart={(event) => handleTouchStart(event, task)}
        onMouseDown={() => handleMouseDown(task)}
        onTouchEnd={() => handleLeavingIcon(task)}
        onMouseUp={() => handleLeavingIcon(task)}
      >
        <div className="filter" style={{display: selectedIcon == task ? 'block' : 'none'}}></div>
        {icon}
      </div>
      <div
        className='text-placeholder'
        onDoubleClick={(event) => handleIcon(event, task)}
        onTouchStart={(event) => handleTouchStart(event, task)}
        onMouseDown={() => handleMouseDown(task)}
        onTouchEnd={() => handleLeavingIcon(task)}
        onMouseUp={() => handleLeavingIcon(task)}
      >
        <div className="filter" style={{display: selectedIcon == task ? 'block' : 'none'}}></div>
      <p>
        {taskName}
      </p>
      </div>
    </div>
  </Draggable>
  )
}

export default Icon