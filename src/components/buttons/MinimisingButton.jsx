import React from 'react'
import { Button } from 'react95';
import './buttons.css'
const MinimisingButton = ({tasksVisibility, task, setTasksVisibility, setActiveTask}) => {
    const handleClick = (event) => {
        event.stopPropagation();
        const newTasksVisibility = new Object(tasksVisibility);
        newTasksVisibility[task] = 'collapse';
        setTasksVisibility(newTasksVisibility);
        setActiveTask(null);
    }
  return (
    <Button onClick={handleClick} onTouchEnd={handleClick}>
      <span className='minimise-icon'>&nbsp;</span>
    </Button>
  )
}

export default MinimisingButton