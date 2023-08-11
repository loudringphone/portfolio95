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

const ResumeWindow = ({displayTasks, displayingTask, activatingTask, activeTask, indexingWindows, windowIndice, tasksVisibility, minimisingTasks}) => {
  const [state, setState] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  });

  const [initialPosition, setInitialPosition] = useState(window.innerWidth > 500 ? { x: 60, y: 60 } : { x: 5, y: 10 })

  const onStart = (event) => {
    event.stopPropagation();
    activatingTask('resume');
    indexingWindows('resume')
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };

  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };
  const handleClickInsideWindow = (event) => {
    event.stopPropagation();
    activatingTask('resume');
    indexingWindows('resume')
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  }

  return (
    <Draggable defaultPosition={initialPosition} bounds="body" handle="strong" {...dragHandlers} onMouseDown={stopPropagation} onTouchStart={stopPropagation}>
    <Wrapper className="drag-resume" style={{zIndex: windowIndice.resume, display: displayTasks.has('resume') ? 'block' : 'none', visibility: tasksVisibility.resume}}>
    <Window className='resume-window'onClick={handleClickInsideWindow}>
    <strong className="cursor"><WindowHeader  active={activeTask == 'resume'} className='window-title'>
        <span>resume.exe</span>

        <div className="buttons">
        <MinimisingButton tasksVisibility={tasksVisibility} task='resume' minimisingTasks={minimisingTasks} activatingTask={activatingTask}/>
        <Button onClick={()=>{displayingTask(false, 'resume')}} onTouchStart={()=>{displayingTask(false, 'resume')}}>
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