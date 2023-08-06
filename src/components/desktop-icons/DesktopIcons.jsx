import React, {useState} from 'react'
import { Mailnews20, Shell325 } from '@react95/icons'
import Draggable from 'react-draggable';
import './desktopicons.css'
const DesktopIcons = ({openingPortfolio, activatingPortfolio, openingResume, activatingResume, indexingWindows}) => {
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
  }
  const handleResume = (event) => {
    event.stopPropagation();
    activatingResume(true);
    openingResume('block')
    indexingWindows({resume: 2, portfolio: 1})
  }
  return (
    <div className="desktop-icons">
      <Draggable bounds="body" {...dragHandlers}>
      <div className='icon icon-resume'>
        <Mailnews20 style={{height:'60px', width:'60px'}} onDoubleClick={handleResume} onTouchStart={handleResume}/>
        <p onDoubleClick={handleResume} onTouchStart={handleResume}>My Resume</p>
      </div>
      </Draggable>
      <Draggable bounds="body" {...dragHandlers}>
      
      <div className='icon icon-portfolio'>
        <Shell325 style={{height:'60px', width:'60px'}} onDoubleClick={handlePortfolio} onTouchStart={handlePortfolio}/>
        <p onDoubleClick={handlePortfolio} onTouchStart={handlePortfolio}>Portfolio</p>
      </div>
      </Draggable>

    </div>
  )
}

export default DesktopIcons