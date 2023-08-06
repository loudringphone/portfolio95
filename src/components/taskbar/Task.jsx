import React from 'react'
import './taskbar.css'
import { Button } from "react95";


function Task({active, task, activatingTask, windowIndice, indexingWindows}) {
  const handleClick = (event) => {
    event.stopPropagation();
    activatingTask(true)

    if (task == "portfolio") {
      if (windowIndice.resume > windowIndice.browser) {
        indexingWindows({portfolio: 3, resume: 2, browser: 1})
      } else {
        indexingWindows({portfolio: 3, resume: 1, browser: 2})
      }
    } else if (task == "resume") {
      if (windowIndice.portfolio > windowIndice.browser) {
        indexingWindows({resume: 3, portfolio: 2, browser: 1})
      } else {
        indexingWindows({resume: 3, portfolio: 1, browser: 2})
      }
    } else {
      if (windowIndice.portfolio > windowIndice.resume) {
        indexingWindows({browser: 3, portfolio: 2, resume: 1})
      } else {
        indexingWindows({browser: 3, portfolio: 1, resume: 2})
      }
    }
    
  }
  return (
    <Button
            className="task"
            active={active}
            style={{ fontWeight: "bold" }}
            onClick={handleClick}
        >
            {task}.exe
    </Button>
  )
}

export default Task