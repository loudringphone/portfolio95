import React, { useState, useEffect } from 'react';
import ResumePdf from './ResumePdf';
import resume from '../../assets/pdfs/Resume.pdf'
import MinimisingButton from '../buttons/MinimisingButton';
import DraggableComponent from '../DraggableComponent';
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

const ResumeWindow = ({displayTasks, displayingTask, setActiveTask, activeTask, indexingTasks, taskIndices, tasksVisibility, setTasksVisibility, isTouchDevice}) => {
  const task = 'resume'
  const initialPosition = window.innerWidth > 500 ? { x: 60, y: 25 } : { x: 5, y: 10 }

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
    <DraggableComponent task={task} initialPosition={initialPosition} setActiveTask={setActiveTask} indexingTasks={indexingTasks}>
      <Wrapper className="drag-resume" style={{zIndex: taskIndices.resume, display: displayTasks.has(task) ? 'block' : 'none', visibility: tasksVisibility.resume}}>
        <WindowComponent task={task} setActiveTask={setActiveTask} indexingTasks={indexingTasks}>
          <strong className="cursor"><WindowHeader  active={activeTask == task} className='window-title'>
            <span>resume.exe</span>
            <div className="buttons">
            <Button style={{width: 'auto', padding: '0 10px', marginRight: '5px'}} onClick={downloadResume} onTouchEnd={()=>{downloadResume()}}>
              Download
            </Button>
            <MinimisingButton tasksVisibility={tasksVisibility} task={task} setTasksVisibility={setTasksVisibility} setActiveTask={setActiveTask}/>
            <Button onClick={()=>{displayingTask(false, task)}} onTouchEnd={()=>{displayingTask(false, task)}}>
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
    </DraggableComponent>
  )
}

export default ResumeWindow