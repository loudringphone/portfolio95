import React, {useState, useEffect} from 'react';
import Draggable from 'react-draggable';
import MinimisingButton from '../buttons/MinimisingButton';
import {
  Button,
  WindowContent,
  WindowHeader,
} from 'react95';
import styled from 'styled-components';
import WindowComponent from '../WindowComponent';
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

const BrowserWindow = ({settingProjectUrl, projectUrl, displayTasks, displayingTask, indexingWindows, windowIndice, tasksVisibility, minimisingTasks, setActiveTask, activeTask}) => {
  const [state, setState] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  });

  const onStart = (event) => {
    event.stopPropagation();
    setActiveTask('browser');
    indexingWindows('browser')
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };

  const [initialPosition, setInitialPosition] = useState(window.innerWidth > 500 ? { x: 80, y: 80 } : { x: 15, y: 10 })

  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };

  const handleClose = () => {
    displayingTask(false, 'browser')
    settingProjectUrl(null)
  }

  const stopPropagation = (event) => {
    event.stopPropagation();
  }

  return (
    <Draggable defaultPosition={initialPosition} bounds="body" handle="strong" {...dragHandlers} onMouseDown={stopPropagation} onTouchStart={stopPropagation}>
    <Wrapper className="drag-browser" style={{zIndex: windowIndice.browser, display: displayTasks.has('browser') ? 'block' : 'none', visibility: tasksVisibility.browser}}>
    <WindowComponent task={'browser'} setActiveTask={setActiveTask} indexingWindows={indexingWindows}>
      <strong className="cursor"><WindowHeader  active={activeTask == 'browser'} className='window-title'>
        <span>browser.exe</span>
        <div className="buttons">
        <MinimisingButton tasksVisibility={tasksVisibility} task='browser' minimisingTasks={minimisingTasks} setActiveTask={setActiveTask}/>
        <Button onClick={handleClose} onTouchEnd={handleClose}>
          <span className='close-icon' />
        </Button>
        </div>
      </WindowHeader></strong>
      <WindowContent className='window-content' style={{display: 'block'}}>
        <div className='browser-screen' style={{display: activeTask == 'browser' ? "none" : "block"}}></div>
        <div className="iframe-screen">
          <iframe
            src={projectUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowfullscreen
            scrolling="yes"
          />
        </div>
        <p className='iframe-text'>
          If the iframe is not loaded, please click <a href={projectUrl} target="_blank" rel="noopener noreferrer">here</a> to view it directly.
        </p>
      </WindowContent>
    </WindowComponent>
  </Wrapper>
  </Draggable>
  )
}

export default BrowserWindow