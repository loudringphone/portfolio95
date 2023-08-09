import React, {useState, useEffect} from 'react';
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

const BrowserWindow = ({settingProjectUrl, projectUrl, displayTasks, displayingTask, indexingWindows, windowIndice, tasksVisibility, minimisingTasks, activatingTask, activeTask}) => {
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
    activatingTask('browser');
    indexingWindows('browser')
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };

  const [initialPosition, setInitialPosition] = useState({ x: 80, y: 80 })
  const [initialPositionMobile, setInitialPositionMobile] = useState({ x: 15, y: 10 })

  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };
  const handleClickInsideWindow = (event) => {
    event.stopPropagation();
    activatingTask('browser');
    indexingWindows('browser')
  };

  const handleClose = () => {
    displayingTask(false, 'browser')
    settingProjectUrl(null)
  }
  return (
    <Draggable defaultPosition={window.innerWidth <= 500 ? initialPositionMobile : initialPosition} bounds="body" handle="strong" {...dragHandlers}>
    <Wrapper className="drag-browser" style={{zIndex: windowIndice.browser, display: displayTasks.has('browser') ? 'block' : 'none', visibility: tasksVisibility.browser}}>
    <Window className='browser-window' onClick={handleClickInsideWindow}>
    <strong className="cursor"><WindowHeader  active={activeTask == 'browser'} className='window-title'>
        <span>browser.exe</span>
        <div className="buttons">
        <MinimisingButton tasksVisibility={tasksVisibility} task='browser' minimisingTasks={minimisingTasks} activatingTask={activatingTask}/>
        <Button onClick={handleClose} onTouchStart={handleClose}>
          <span className='close-icon' />
        </Button>
        </div>
        
      </WindowHeader></strong>
      <WindowContent className='window-content'>
      <div className='browser-screen' style={{display: activeTask == 'browser' ? "none" : "block"}}></div>
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