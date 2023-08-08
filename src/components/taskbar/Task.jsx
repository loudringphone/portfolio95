import React from 'react'
import './taskbar.css'
import { Button } from "react95";


function Task({task, activeTask, activatingTask, windowIndice, indexingWindows, tasksVisibility, minimisingTasks}) {
  const handleClick = (event) => {
    event.stopPropagation();
    if (activeTask == task) {
      const newTasksVisibility = new Object(tasksVisibility)
      newTasksVisibility[task] = 'collapse'
      minimisingTasks(newTasksVisibility)
      activatingTask(null)
    } else {
      const newTasksVisibility = new Object(tasksVisibility)
      newTasksVisibility[task] = 'visible'
      minimisingTasks(newTasksVisibility)
      activatingTask(task)

      if (task == "portfolio") {
        if (windowIndice.resume > windowIndice.browser) {
          indexingWindows({portfolio: 7, resume: 6, browser: 5})
        } else {
          indexingWindows({portfolio: 7, resume: 5, browser: 6})
        }
      } else if (task == "resume") {
        if (windowIndice.portfolio > windowIndice.browser) {
          indexingWindows({resume: 7, portfolio: 6, browser: 5})
        } else {
          indexingWindows({resume: 7, portfolio: 5, browser: 6})
        }
      } else {
        if (windowIndice.portfolio > windowIndice.resume) {
          indexingWindows({browser: 7, portfolio: 6, resume: 5})
        } else {
          indexingWindows({browser: 7, portfolio: 5, resume: 6})
        }
      }
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