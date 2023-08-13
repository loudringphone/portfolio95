import React, { useState, useEffect } from 'react'
import Draggable from 'react-draggable';


const Icon = ({ task, icon, iconIndice, visibility, selectingBinIcon, selectedBinIcon, activeTask, binRef, binWindowRef, handlePickingIcon, handleLeavingIcon, unrecyclingIcon, handleDisappearingIcon, activatingTask, teleportingIcon, isTouchDevice }) => {
  const [position, setPosition] = useState({x: 0, y: 0});
  const [iconDisplay, setIconDisplay] = useState('none')
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
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };
  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };
  const taskName = task.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')


  const handleDown = (task) => {
    handlePickingIcon(task)
    activatingTask('recycle bin')
    selectingBinIcon(task)
  }

  const handleUp = (event, task) => {
    activatingTask('recycle bin')
    handlePickingIcon(task)
    selectingBinIcon(task)
    handleDisappearingIcon(task)
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
      selectingBinIcon(null)
    }
    setTimeout(() => {
      
    handleLeavingIcon(task)
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
  
  return (

 
    <Draggable bounds={false} {...dragHandlers}
     onMouseDown={stopPropagation} onTouchStart={stopPropagation}
      position={position}
    >
    <div className='icon' ref={binRef} style={{ zIndex: iconIndice[task], display: iconDisplay, }}>
      <div className="elementRef"
        onTouchStart={() => handleDown(task)}
        onMouseDown={() => handleDown(task)}
        onMouseUp={(event) => handleUp(event, task)}
        onTouchEnd={(event) => handleUp(event, task)}
      ></div>
      <div
        className='icon-placeholder'
        onTouchStart={() => handleDown(task)}
        onMouseDown={() => handleDown(task)}
        onMouseUp={(event) => handleUp(event, task)}
        onTouchEnd={(event) => handleUp(event, task)}
      >
        <div className="filter" style={{display: selectedBinIcon == task ? 'block' : 'none'}}></div>
        {icon}
      </div>
      <div
        className='text-placeholder'
        onTouchStart={() => handleDown(task)}
        onMouseDown={() => handleDown(task)}
        onMouseUp={(event) => handleUp(event, task)}
        onTouchEnd={(event) => handleUp(event, task)}
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