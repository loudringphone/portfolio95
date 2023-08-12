import React, { useState, useEffect} from 'react'
import Draggable from 'react-draggable';


const Icon = ({ task, icon, iconIndice, visibility, selectingBinIcon, selectedBinIcon, activeTask, binRef, binWindowRef, handlePickingIcon, handleLeavingIcon, unrecyclingIcon, handleDisappearingIcon }) => {
  const [position, setPosition] = useState({x: 0, y: 0});
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
    // activiatingDockMenu(false)
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };
  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };
  const taskName = task.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')


  const handleMouseDown = (task) => {
    handlePickingIcon(task)
    selectingBinIcon(task)
  }
  const handleTouchStart = (event, task) => {
    selectingBinIcon(task)
  }
  const handleUp = (event) => {
    handleDisappearingIcon(task)
    const cursorX = event.clientX;
    const cursorY = event.clientY;
    const rect = binWindowRef.current.getBoundingClientRect();
    if (
      cursorX < rect.x || cursorX > rect.x + rect.width ||
      cursorY < rect.y || cursorY > rect.y + rect.height
    ) {
      unrecyclingIcon(task);
      selectingBinIcon(null)
    }
    setTimeout(() => {
    handleLeavingIcon(task)
    }, 0);
  }

  return (
    <Draggable bounds={false} {...dragHandlers}
      position={position}
    >
    <div className='icon' ref={binRef} style={{ zIndex: iconIndice[task], display: visibility == 'visible' ? 'none' : 'block', }}>
      <div className="elementRef"
        onTouchStart={(event) => handleTouchStart(event, task)}
        onMouseDown={() => handleMouseDown(task)}
        onMouseUp={(event) => handleUp(event)}
        onTouchEnd={(event) => handleUp(event)}
      ></div>
      <div
        className='icon-placeholder'
        onTouchStart={(event) => handleTouchStart(event, task)}
        onMouseDown={() => handleMouseDown(task)}
        onMouseUp={(event) => handleUp(event)}
        onTouchEnd={(event) => handleUp(event)}
      >
        <div className="filter" style={{display: selectedBinIcon == task ? 'block' : 'none'}}></div>
        {icon}
      </div>
      <div
        className='text-placeholder'
        onTouchStart={(event) => handleTouchStart(event, task)}
        onMouseDown={() => handleMouseDown(task)}
        onMouseUp={(event) => handleUp(event)}
        onTouchEnd={(event) => handleUp(event)}
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