import React, { useState, useEffect} from 'react'
import Draggable from 'react-draggable';


const Icon = ({ task, icon, iconRef, visibility, handleIcon, handleIconMobile,pickingingIcon, draggingIcon, handleLeavingIcon, iconIndices, activiatingDockMenu, setSelectedIcon, selectedIcon, desktopRef, iconPosition, activeTask, warnings, positioningIcon, setBinLastPos, taskSwitiching, setTaskSwitiching }) => {
  const [resumeLastPos, setResumeLastPos] = useState(null);
  const [position, setPosition] = useState(iconPosition);
  useEffect(() => {
    setPosition(iconPosition);
  }, [iconPosition]);
  
  const selectingIcon = (icon) => {
    if (icon == 'resume') {
      setResumeLastPos(lastPos);
    } else if (icon == 'recycle bin') {
      setBinLastPos(lastPos);
    }
    setTaskSwitiching(false);
    setSelectedIcon(icon);
  }
  const onStart = () => {
    activiatingDockMenu(false);
    selectingIcon(task)
    pickingingIcon(task)
  };
  const dragHandlers = { onStart };
  const taskName = task.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
  let lastPos = {};
  if (task == 'resume' || task == 'recycle bin') {
    const x = desktopRef.current?.getBoundingClientRect().x;
    const y = desktopRef.current?.getBoundingClientRect().y;
    lastPos = {x: x, y: y};
  }

  const handleMouseDown = (icon) => {
    setTimeout(() => {
      draggingIcon(icon);
    }, 0);
  }
  const handleTouchStart = (event, icon) => {
    handleIconMobile(event, icon);
  }
  
  const handleDrag = (e, ui) => {
    setPosition({ x: position.x + ui.deltaX, y: position.y + ui.deltaY });
  };

  useEffect(() => {
    if (resumeLastPos){
      positioningIcon('resume', resumeLastPos.x, resumeLastPos.y);
      setTimeout(() => {
        selectingIcon('resume')
        setTaskSwitiching(true)
      }, 0);
    }
  }, [warnings]);
  
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