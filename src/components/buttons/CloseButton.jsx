import React from 'react'
import { Button } from 'react95';
import { handleButtonTouchEnd } from '../../functions/customFunctions';
import './buttons.css'
const CloseButton = ({ task, displayingTask, setIsDraggable, setActiveTask, handleMusicClose }) => {
    const disablingDraggable = (event) => {
      event.stopPropagation();
      setActiveTask(task)
      setIsDraggable(false)
      setIsDraggable(true)
    }
    const handleTouchEnd = (event) => {
      handleButtonTouchEnd(event, () => {
        if (handleMusicClose) {
          handleMusicClose()
        }
        displayingTask(false, task)
      });
    }
  return (
    <Button onClick={()=>{displayingTask(false, task)}} onTouchEnd={handleTouchEnd}  onMouseDown={disablingDraggable} onTouchStartCapture={disablingDraggable}>
      <span className='close-icon' />
    </Button>
  )
}

export default CloseButton