import React, { useState, useEffect } from 'react'
import Draggable from 'react-draggable';


const Icon = ({ task, icon, visibility, setSelectedBinIcon, selectedBinIcon, activeTask, binRef, binWindowRef, unrecyclingIcon, setActiveTask, teleportingIcon, isTouchDevice, indexingWindows }) => {
  const [position, setPosition] = useState({x: 0, y: 0});
  const [lastTouchTime, setLastTouchTime] = useState(0);
  const [picking, setPicking] = useState(false)
  const [iconDisplay, setIconDisplay] = useState('none')
  const [iconZindex, setIconZindex] = useState(0)
  const [state, setState] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  });
  const onStart = (event) => {
    event.stopPropagation();
    setPicking(true)
    setIconZindex(99)
    indexingWindows('recycle bin')
    setActiveTask('recycle bin')
    setSelectedBinIcon(task)
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };
  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };
  const taskName = task.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')

  const handleUp = (event, task) => {
    setActiveTask('recycle bin')
    setPicking(true)
    setIconZindex(99)
    setSelectedBinIcon(task)
    setIconZindex(-1)
    const cursorX = event.clientX || event.changedTouches[0].clientX;
    const cursorY = event.clientY || event.changedTouches[0].clientY;
    const rect = binWindowRef.current.getBoundingClientRect();
    if (
      cursorX < rect.x || cursorX > rect.x + rect.width ||
      cursorY < rect.y || cursorY > rect.y + rect.height
    ) {
      setIconDisplay('none')
      if (isTouchDevice) {
        teleportingIcon(event)
      }
      unrecyclingIcon();
      setSelectedBinIcon(null)
    }
    setTimeout(() => {
      setIconZindex(0)
    }, 0);
  }

  const stopPropagation = (event) => {
    event.stopPropagation();
  }

  useEffect(() => {
      if (visibility == 'hidden') {
        setIconDisplay('block')
      }
  }, [visibility])
  
  const handleOpen = (event) => {
    if (event.type == 'dblclick') {
      setTimeout(() => {
        setActiveTask('bin warning')
      }, 200);
      return
    }
    const currentTime = new Date().getTime();
    setLastTouchTime(currentTime);
    if (currentTime - lastTouchTime <= 300) {
      setTimeout(() => {
        setActiveTask('bin warning')
      }, 200);
    };
  }

  return (

 
    <Draggable bounds={false} {...dragHandlers}
     onMouseDown={stopPropagation} onTouchStart={stopPropagation}
      position={position}
    >
    <div className='icon' ref={binRef} style={{ zIndex: iconZindex, display: iconDisplay, }}>
      <div className="desktopRef"
        onMouseUp={(event) => handleUp(event, task)}
        onTouchEnd={(event) => handleUp(event, task)}
        onTouchStartCapture={(event) => handleOpen(event)}
        onDoubleClick={(event) => handleOpen(event)}
      ></div>
      <div
        className='icon-placeholder'
        onMouseUp={(event) => handleUp(event, task)}
        onTouchEnd={(event) => handleUp(event, task)}
        onTouchStartCapture={(event) => handleOpen(event)}
        onDoubleClick={(event) => handleOpen(event)}
      >
        <div className="filter" style={{display: selectedBinIcon == task ? 'block' : 'none'}}></div>
        {icon}
      </div>
      <div
        className='text-placeholder'
        onMouseUp={(event) => handleUp(event, task)}
        onTouchEnd={(event) => handleUp(event, task)}
        onTouchStartCapture={(event) => handleOpen(event)}
        onDoubleClick={(event) => handleOpen(event)}
      >
        <div className="filter-text" style={{display: selectedBinIcon == task && activeTask == 'recycle bin' ? 'block' : 'none'}}></div>
        <div className="filter" style={{display: selectedBinIcon == task && activeTask !== 'recycle bin' ? 'block' : 'none'}}></div>
      <p style={{color: selectedBinIcon == task && activeTask == 'recycle bin' ? 'white' : 'black'}}>
        {taskName}
      </p>
      </div>
    </div>

  </Draggable>
  )
}

export default Icon