import React from 'react'
import './taskbar.css'
import { Button } from "react95";
import { capitalise } from '../../functions/customFunctions';

function Task({ task, activeTask, setActiveTask, indexingTasks, tasksVisibility, setTasksVisibility, displayTasks }) {
  const handleClick = (event) => {
    event.stopPropagation();
    if (activeTask == task) {
      const newTasksVisibility = new Object(tasksVisibility)
      newTasksVisibility[task] = 'collapse'
      setTasksVisibility(newTasksVisibility)
      setActiveTask(null)
    } else {
      const newTasksVisibility = new Object(tasksVisibility)
      newTasksVisibility[task] = 'visible'
      setTasksVisibility(newTasksVisibility)
      setActiveTask(task)
      indexingTasks(task)
    }
  }
  return (
    <Button
      className={`task task-${displayTasks.size}`}
      active={activeTask == task}
      style={{ fontWeight: "bold" }}
      onClick={handleClick}
    >
      {capitalise(task)}
    </Button>
  )
}

export default Task