import React from 'react'
import './taskbar.css'
import { Button } from "react95";


function Task({active, task, activatingTask, windowIndice, indexingWindows}) {
  const handleClick = (event) => {
    event.stopPropagation();
    activatingTask(true)

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