import React from 'react'
import { Button } from 'react95';
import './buttons.css'
const MinimisingButton = ({ task, setTasksVisibility, setActiveTask, setTaskSwitiching }) => {
    const handleMinimising = (event) => {
        event.stopPropagation();
        setTaskSwitiching(true)
        setTasksVisibility((prevState) => {
          prevState[task] = 'collapse'
          return prevState
        })
        setActiveTask(null);
    }
  return (
    <Button onClick={handleMinimising} onTouchEnd={handleMinimising}>
      <span className='minimise-icon'>&nbsp;</span>
    </Button>
  )
}

export default MinimisingButton