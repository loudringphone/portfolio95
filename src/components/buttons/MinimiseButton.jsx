import React from 'react'
import { Button } from 'react95';
import { handleButtonTouchEnd } from '../../functions/customFunctions';
import './buttons.css'
const MinimiseButton = ({ task, setTasksVisibility, setActiveTask, setTaskSwitiching, setIsDraggable }) => {
  const handleMinimising = (event) => {
      event.stopPropagation();
      setTaskSwitiching(true)
      setTasksVisibility((prevState) => {
        prevState[task] = 'collapse'
        return prevState
      })
      setActiveTask(null);
  }
  const handleTouchEnd = (event) => {
    handleButtonTouchEnd(event, handleMinimising)
  }
  const disablingDraggable = (event) => {
    event.stopPropagation();
    setActiveTask(task)
    setIsDraggable(false)
    setIsDraggable(true)
  }
  return (
    <Button onClick={handleMinimising} onTouchEnd={handleTouchEnd} onMouseDown={disablingDraggable} onTouchStartCapture={disablingDraggable}>
      <span className='minimise-icon'>&nbsp;</span>
    </Button>
  )
}

export default MinimiseButton