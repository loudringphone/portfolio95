import React from 'react'
import './taskbar.css'
import { Button } from "react95";


function Task({task, activeTask, setActiveTask, windowIndice, indexingWindows, tasksVisibility, minimisingTasks}) {
  const handleClick = (event) => {
    event.stopPropagation();
    if (activeTask == task) {
      const newTasksVisibility = new Object(tasksVisibility)
      newTasksVisibility[task] = 'collapse'
      minimisingTasks(newTasksVisibility)
      setActiveTask(null)
    } else {
      const newTasksVisibility = new Object(tasksVisibility)
      newTasksVisibility[task] = 'visible'
      minimisingTasks(newTasksVisibility)
      setActiveTask(task)
      indexingWindows(task)
    }
  }
  return (
    <Button
            className="task"
            active={activeTask == task}
            style={{ fontWeight: "bold" }}
            onClick={handleClick}
        >
            {window.innerWidth <= 500? task : `${task}.exe`}
    </Button>
  )
}

export default Task