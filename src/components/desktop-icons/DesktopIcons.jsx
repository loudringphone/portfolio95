import React, {useState} from 'react'
import { Mailnews20, Shell325 } from '@react95/icons'
import Draggable from 'react-draggable';
import './desktopicons.css'
const DesktopIcons = ({windowIndice, displayingTask, indexingWindows, tasksVisibility, minimisingTasks, activatingTask}) => {
  const [resumeIndex, setResumeIndex] = useState(0)
  const [portfolioIndex, setPortfolioIndex] = useState(0)
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
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };
  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };

  const handlePortfolio = (event) => {
    event.stopPropagation();
    const newTasksVisibility = new Object(tasksVisibility)
    newTasksVisibility.portfolio = 'visible'
    minimisingTasks(newTasksVisibility)
    activatingTask('portfolio')
    displayingTask(true, 'portfolio')
    if (windowIndice.browser > windowIndice.resume) {
      indexingWindows({browser: 6, portfolio: 7, resume: 5})
    } else {
      indexingWindows({browser: 5, portfolio: 7, resume: 6})
    }
    setPortfolioIndex(1)
    setResumeIndex(0)
  }
  const handleResume = (event) => {
    event.stopPropagation();
    const newTasksVisibility = new Object(tasksVisibility)
    newTasksVisibility.resume = 'visible'
    minimisingTasks(newTasksVisibility)
    activatingTask('resume')
    displayingTask(true, 'resume')
    indexingWindows({resume: 2, portfolio: 1})
    if (windowIndice.browser > windowIndice.portfolio) {
      indexingWindows({browser: 6, portfolio: 5, resume: 7})
    } else {
      indexingWindows({browser: 5, portfolio: 6, resume: 7})
    }
    setResumeIndex(1)
    setPortfolioIndex(0)

  }
  const handlePickingResume = () => {
    setResumeIndex(99)
    setPortfolioIndex(0)
  }
  const handlePickingPortfolio = () => {
    setPortfolioIndex(99)
    setResumeIndex(0)
  }
  const handleLeavingResume = () => {
    setResumeIndex(1)
    setPortfolioIndex(0)
  }
  const handleLeavingPortfolio = () => {
    setPortfolioIndex(1)
    setResumeIndex(0)
  }
  return (
    <div className="desktop-icons">
      <Draggable bounds="body" {...dragHandlers}>
      <div className='icon icon-resume' style={{zIndex: resumeIndex}}>
        <Mailnews20 style={{height:'60px', width:'60px'}} onDoubleClick={handleResume} onTouchStart={handleResume} onMouseDown={handlePickingResume} onTouchEnd={handleLeavingResume} onMouseUp={handleLeavingResume} onClick={handleLeavingResume} />
        <p onDoubleClick={handleResume} onTouchStart={handleResume} onMouseDown={handlePickingResume} onTouchEnd={handleLeavingResume} onMouseUp={handleLeavingResume} onClick={handleLeavingResume}>Resume</p>
      </div>
      </Draggable>
      <Draggable bounds="body" {...dragHandlers}>
      
      <div className='icon icon-portfolio' style={{zIndex: portfolioIndex}}>
        <Shell325 style={{height:'60px', width:'60px'}} onDoubleClick={handlePortfolio} onTouchStart={handlePortfolio} onMouseDown={handlePickingPortfolio} onTouchEnd={handleLeavingPortfolio} onMouseUp={handleLeavingPortfolio} onClick={handleLeavingPortfolio}/>
        <p onDoubleClick={handlePortfolio} onTouchStart={handlePortfolio} onMouseDown={handlePickingPortfolio} onTouchEnd={handleLeavingPortfolio} onMouseUp={handleLeavingPortfolio} onClick={handleLeavingPortfolio}>Portfolio</p>
      </div>
      </Draggable>

    </div>
  )
}

export default DesktopIcons