import React, {useState, useEffect} from 'react';
import ResumePdf from './ResumePdf';
import Draggable from 'react-draggable';
import MinimisingButton from '../buttons/MinimisingButton';
import './scrollview.scss';

import {
  Button,
  Window,
  WindowContent,
  WindowHeader,
  ScrollView,
} from 'react95';
import styled from 'styled-components';
import './resumewindow.scss'
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

const ResumeWindow = ({resumeDisplay, openingResume, activatingTask, activeTask, indexingWindows, windowIndice, bounds, tasksVisibility, minimisingTasks}) => {
  const [state, setState] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  });

  const [initialPosition, setInitialPosition] = useState({ x: 60, y: 60 })
  useEffect(() => {
    if (window.innerWidth <= 500) {
      setInitialPosition({ x: 10, y: 10 });
    }
  }, [])

  const onStart = () => {
    activatingTask('resume');
    if (windowIndice.portfolio > windowIndice.browser) {
      indexingWindows({resume: 7, portfolio: 6, browser: 5})
    } else {
      indexingWindows({resume: 7, portfolio: 5, browser: 6})
    }
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };

  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };
  const handleClickInsideWindow = (event) => {
    event.stopPropagation();
    activatingTask('resume');
    if (windowIndice.portfolio > windowIndice.browser) {
      indexingWindows({resume: 7, portfolio: 6, browser: 5})
    } else {
      indexingWindows({resume: 7, portfolio: 5, browser: 6})
    }
  };

  return (
    <Draggable defaultPosition={initialPosition} bounds={bounds} handle="strong" {...dragHandlers}>
    <Wrapper className="drag-resume" style={{zIndex: windowIndice.resume, display: resumeDisplay, visibility: tasksVisibility.resume}}>
    <Window className='resume-window'onClick={handleClickInsideWindow}>
    <strong className="cursor"><WindowHeader  active={activeTask == 'resume'} className='window-title'>
        <span>resume.exe</span>

        <div className="buttons">
        <MinimisingButton tasksVisibility={tasksVisibility} task='resume' minimisingTasks={minimisingTasks} activatingTask={activatingTask}/>
        <Button onClick={()=>{openingResume('none')}} onTouchStart={()=>{openingResume('none')}}>
          <span className='close-icon' />
        </Button>
        </div>

        
      </WindowHeader></strong>
      <WindowContent className='window-content'>
    <ScrollView style={{ width: "100%", height: "500px", overflowWrap: 'anywhere' }}>
        <ResumePdf />
        </ScrollView>
      </WindowContent>
     
    </Window>
  </Wrapper>

  </Draggable>

  )
}

export default ResumeWindow