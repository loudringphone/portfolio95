import React, { useState, useEffect} from 'react'
import Draggable from 'react-draggable';


const Icon = ({ task, icon, iconRef, visibility, handleIcon, handleIconMobile, handlePickingIcon, handleLeavingIcon, iconIndice, activiatingDockMenu, selectingIcon, selectedIcon, desktopRef, iconPosition, activeTask, warnings, positioningIcon }) => {
  const [resumeLastPos, setResumeLastPos] = useState(null)
  const [position, setPosition] = useState(iconPosition);
  useEffect(() => {
    setPosition(iconPosition)
  }, [iconPosition])
  
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
    if (task == 'resume') {
      console.log(desktopRef.current?.getBoundingClientRect())
      const x = desktopRef.current?.getBoundingClientRect().x
      const y = desktopRef.current?.getBoundingClientRect().y
      setResumeLastPos({x: x, y: y})
    }
    selectingIcon(task)
    handlePickingIcon(task)
  }

  const handleTouchStart = (event, task) => {
    if (task == 'resume') {
      console.log(desktopRef.current?.getBoundingClientRect())
      const x = desktopRef.current?.getBoundingClientRect().x
      const y = desktopRef.current?.getBoundingClientRect().y
      setResumeLastPos({x: x, y: y})
    }
    selectingIcon(task)
    handleIconMobile(event, task)
  }
  const handleDrag = (e, ui) => {
    setPosition({ x: position.x + ui.deltaX, y: position.y + ui.deltaY });
  };

  useEffect(() => {
    if (resumeLastPos){
      positioningIcon('resume', resumeLastPos.x - 35, resumeLastPos.y - 23.99)
    }
  }, [warnings])
  
  return (
    <Draggable bounds="body" {...dragHandlers}
      onDrag={handleDrag}
      position={position}
    >
    <div className='icon' ref={desktopRef} style={{ zIndex: iconIndice[task], visibility: visibility, }}>
      <div className="desktopRef"
        onDoubleClick={(event) => handleIcon(event, task)}
        onTouchStart={(event) => handleTouchStart(event, task)}
        onMouseDown={() => handleMouseDown(task)}
        onTouchEnd={() => handleLeavingIcon(task)}
        onMouseUp={() => handleLeavingIcon(task)}
      ></div>
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
        <div className="filter-text" style={{display: selectedIcon == task && activeTask == null? 'block' : 'none'}}></div>
        <div className="filter" style={{display: selectedIcon == task && activeTask ? 'block' : 'none'}}></div>
      <p>
        {taskName}
      </p>
      </div>
    </div>
  </Draggable>
  )
}

export default Icon