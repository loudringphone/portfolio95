import React, { useState, useEffect } from 'react';
import ResumePdf from './ResumePdf';
import resume from '../../assets/pdfs/Resume.pdf'
import Draggable from 'react-draggable';
import MinimisingButton from '../buttons/MinimisingButton';
import WindowComponent from '../WindowComponent';
import './scrollview.scss';

import {
  Button,
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

const ResumeWindow = ({displayTasks, displayingTask, activatingTask, activeTask, indexingWindows, windowIndice, tasksVisibility, minimisingTasks, isTouchDevice}) => {
  const [state, setState] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  });

  const [initialPosition, setInitialPosition] = useState(window.innerWidth > 500 ? { x: 60, y: 25 } : { x: 5, y: 10 })

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

  const stopPropagation = (event) => {
    event.stopPropagation();
  }

  const downloadResume = () => {
    let a = document.createElement('a');
    a.href = resume;
    a.download = 'Resume - Winston Lau.pdf';
    a.click();
    window.open(resume, '_blank');
  }

  const [resumeHeight, setResumeHeight] = useState('100%')
  useEffect(() => {
    if (isTouchDevice) {
      setResumeHeight('100%')
    } else {
      setResumeHeight('375px')
    }
  }, [isTouchDevice])
  return (
    <Draggable defaultPosition={initialPosition} bounds="body" handle="strong" {...dragHandlers} onMouseDown={stopPropagation} onTouchStart={stopPropagation}>
    <Wrapper className="drag-resume" style={{zIndex: windowIndice.resume, display: displayTasks.has('resume') ? 'block' : 'none', visibility: tasksVisibility.resume}}>
    <WindowComponent task={'resume'} activatingTask={activatingTask} indexingWindows={indexingWindows}>
    <strong className="cursor"><WindowHeader  active={activeTask == 'resume'} className='window-title'>
        <span>resume.exe</span>
        <div className="buttons">
        <Button style={{width: 'auto', padding: '0 10px', marginRight: '5px'}} onClick={downloadResume} onTouchEnd={()=>{downloadResume()}}>
          Download
        </Button>
        <MinimisingButton tasksVisibility={tasksVisibility} task='resume' minimisingTasks={minimisingTasks} activatingTask={activatingTask}/>
        <Button onClick={()=>{displayingTask(false, 'resume')}} onTouchEnd={()=>{displayingTask(false, 'resume')}}>
          <span className='close-icon' />
        </Button>
        </div>
      </WindowHeader></strong>
      <WindowContent className='window-content'>
    <ScrollView style={{ width: '100%', height: resumeHeight, overflowWrap: 'anywhere' }}>
        <ResumePdf />
        </ScrollView>
      </WindowContent>
     
    </WindowComponent>
  </Wrapper>

  </Draggable>

  )
}

export default ResumeWindow