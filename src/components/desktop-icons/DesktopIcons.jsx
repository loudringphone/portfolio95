import React, {useState} from 'react'
import { Mailnews20, Shell325 } from '@react95/icons'
import Draggable from 'react-draggable';
import './desktopicons.css'
const DesktopIcons = ({openingPortfolio, activatingPortfolio, openingResume, activatingResume, indexingWindows}) => {
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
    activatingPortfolio(true);
    openingPortfolio('block')
    indexingWindows({resume: 1, portfolio: 2})
    setPortfolioIndex(10)
    setResumeIndex(0)
  }
  const handleResume = (event) => {
    event.stopPropagation();
    activatingResume(true);
    openingResume('block')
    indexingWindows({resume: 2, portfolio: 1})
    setResumeIndex(10)
    setPortfolioIndex(0)

  }
  const handlePickingResume = () => {
    setResumeIndex(10)
    setPortfolioIndex(0)
  }
  const handlePickingPortfolio = () => {
    setPortfolioIndex(10)
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
        <Mailnews20 style={{height:'60px', width:'60px'}} onDoubleClick={handleResume} onTouchStart={handleResume} onMouseDown={handlePickingResume} onTouchEnd={handleLeavingResume} onMuseUp={handleLeavingResume} onClick={handleLeavingResume} />
        <p onDoubleClick={handleResume} onTouchStart={handleResume} onMouseDown={handlePickingResume} onTouchEnd={handleLeavingResume} onMuseUp={handleLeavingResume} onClick={handleLeavingResume}>My Resume</p>
      </div>
      </Draggable>
      <Draggable bounds="body" {...dragHandlers}>
      
      <div className='icon icon-portfolio' style={{zIndex: portfolioIndex}}>
        <Shell325 style={{height:'60px', width:'60px'}} onDoubleClick={handlePortfolio} onTouchStart={handlePortfolio} onMouseDown={handlePickingPortfolio} onTouchEnd={handleLeavingPortfolio} onMuseUp={handleLeavingPortfolio} onClick={handleLeavingPortfolio}/>
        <p onDoubleClick={handlePortfolio} onTouchStart={handlePortfolio} onMouseDown={handlePickingPortfolio} onTouchEnd={handleLeavingPortfolio} onMuseUp={handleLeavingPortfolio} onClick={handleLeavingPortfolio}>Portfolio</p>
      </div>
      </Draggable>

    </div>
  )
}

export default DesktopIcons