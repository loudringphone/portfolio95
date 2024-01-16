import React, { useState, useEffect} from 'react'
import Draggable from 'react-draggable';


const Icon = ({ task, icon, iconRef, visibility, handleIcon, handleIconMobile, pickingIcon, handleLeavingIcon, iconIndices, activiatingDockMenu, setSelectedIcon, selectedIcon, desktopRef, iconPosition, activeTask, warnings, positioningIcon, setBinLastPos, taskSwitiching, setTaskSwitiching }) => {
  const [resumeLastPos, setResumeLastPos] = useState(null)
  const [position, setPosition] = useState(iconPosition);
  useEffect(() => {
    setPosition(iconPosition)
  }, [iconPosition])
  
  const onStart = () => {
    activiatingDockMenu(false);
  };
  const onStop = () => {};
  const dragHandlers = { onStart, onStop };
  const taskName = task.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')

  const handleMouseDown = (task) => {
    if (task == 'resume') {
      const x = desktopRef.current?.getBoundingClientRect().x
      const y = desktopRef.current?.getBoundingClientRect().y
      setResumeLastPos({x: x, y: y})
    } else if (task == 'recycle bin') {
      const x = desktopRef.current?.getBoundingClientRect().x
      const y = desktopRef.current?.getBoundingClientRect().y
      setBinLastPos({x: x, y: y})
    }
    setTaskSwitiching(false)
    setSelectedIcon(task)
    pickingIcon(task)
  }

  const handleTouchStart = (event, task) => {
    if (task == 'resume') {
      const x = desktopRef.current?.getBoundingClientRect().x
      const y = desktopRef.current?.getBoundingClientRect().y
      setResumeLastPos({x: x, y: y})
    } else if (task == 'recycle bin') {
      const x = desktopRef.current?.getBoundingClientRect().x
      const y = desktopRef.current?.getBoundingClientRect().y
      setBinLastPos({x: x, y: y})
    }
    setTaskSwitiching(false)
    setSelectedIcon(task)
    handleIconMobile(event, task)
  }
  const handleDrag = (e, ui) => {
    setPosition({ x: position.x + ui.deltaX, y: position.y + ui.deltaY });
  };

  useEffect(() => {
    if (resumeLastPos){
      positioningIcon('resume', resumeLastPos.x, resumeLastPos.y)
    }
  }, [warnings])
  
  return (
    <Draggable bounds="body" {...dragHandlers}
      onDrag={handleDrag}
      position={position}
    >
    <div className='icon' ref={desktopRef} style={{ zIndex: iconIndices[task], visibility: visibility, }}>
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
        { taskSwitiching ?
          <>
            <div className="filter-gray" style={{display: selectedIcon == task ? 'block' : 'none'}}></div>
            <p style={{color: selectedIcon == task ? 'black' : '#fefefe'}}>
              {taskName}
            </p>
          </>
        :
          <>
            <div className="filter-blue" style={{display: selectedIcon == task && activeTask == null ? 'block' : 'none'}}></div>
            <p>
              {taskName}
            </p>
          </>
        }
        
      </div>
    </div>
  </Draggable>
  )
}

export default Icon