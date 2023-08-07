import React, {useState} from 'react';
import Draggable from 'react-draggable';
import MinimisingButton from '../buttons/MinimisingButton';
import {
  Button,
  Window,
  WindowContent,
  WindowHeader,
} from 'react95';
import styled from 'styled-components';
import './browserwindow.scss'
const Wrapper = styled.div`
  position: absolute;
  background: transparent;
  .close-icon {
    &:before,
    &:after {
      content: '';
      position: absolute;
      background: ${({ theme }) => theme.materialText};
    }
  }
`;
let initialPosition = { x: 80, y: 80 };
if (window.innerWidth <= 500) {
  initialPosition = { x: 40, y: 40 };
}
const BrowserWindow = ({settingProjectUrl, projectUrl, browserDisplay, openingBrowser, activatingBrowser, browserActive, indexingWindows, windowIndice, bounds, tasksVisibility, minimisingTasks}) => {
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
    activatingBrowser(true)
    activatingBrowser(true);
    if (windowIndice.portfolio > windowIndice.resume) {
      indexingWindows({browser: 7, portfolio: 6, resume: 5})
    } else {
      indexingWindows({browser: 7, portfolio: 5, resume: 6})
    }
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };

  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };
  const handleClickInsideWindow = (event) => {
    event.stopPropagation();
    activatingBrowser(true);
    if (windowIndice.portfolio > windowIndice.resume) {
      indexingWindows({browser: 3, portfolio: 2, resume: 1})
    } else {
      indexingWindows({browser: 3, portfolio: 1, resume: 2})
    }
  };

  const handleClose = () => {
    openingBrowser('none')
    settingProjectUrl(null)
  }
  return (
    <Draggable defaultPosition={initialPosition} bounds={bounds} handle="strong" {...dragHandlers}>
    <Wrapper className="drag-browser" style={{zIndex: windowIndice.browser, display: browserDisplay, visibility: tasksVisibility.browser}}>
    <Window className='browser-window' onClick={handleClickInsideWindow}>
    <strong className="cursor"><WindowHeader  active={browserActive} className='window-title'>
        <span>browser.exe</span>
        <div className="buttons">
        <MinimisingButton tasksVisibility={tasksVisibility} task='browser' minimisingTasks={minimisingTasks} activatingTask={activatingBrowser}/>
        <Button onClick={handleClose} onTouchStart={handleClose}>
          <span className='close-icon' />
        </Button>
        </div>
        
      </WindowHeader></strong>
      <WindowContent className='window-content'style={{ height: "500px" }}>
    {/* <StyledScrollView style={{ width: "100%", height: "500px", overflowWrap: 'anywhere' }} className='browser-view' > */}
      <div className='browser-screen' style={{display: browserActive?"none":"block"}}></div>
      <iframe
        src={projectUrl}
        width="100%"
        height="100%"
        frameborder="0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen
        scrolling="yes"
      />
      
        {/* </StyledScrollView> */}
     
        
      </WindowContent>
     
    </Window>
  </Wrapper>
  </Draggable>
  )
}

export default BrowserWindow