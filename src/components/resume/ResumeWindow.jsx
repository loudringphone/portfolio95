import { useState, useEffect } from 'react';
import ResumePdf from './ResumePdf';
import WindowButton from '../buttons/WindowButton';
import DraggableComponent from '../DraggableComponent';
import WindowComponent from '../WindowComponent';
import './scrollview.scss';

import {
  WindowContent,
  WindowHeader,
  ScrollView,
} from 'react95';
import styled from 'styled-components';
import { capitalise } from '../../functions/customFunctions';
import './resumewindow.scss'
const Wrapper = styled.div`
  position: absolute;
  background: transparent;
`;

const ResumeWindow = ({ displayTasks, displayingTask, setActiveTask, activeTask, indexingTasks, taskIndices, tasksVisibility, setTasksVisibility, isTouchDevice, setTaskSwitiching }) => {
  const task = 'resume'
  const [isDraggable, setIsDraggable] = useState(true)
  const initialPosition = window.innerWidth > 500 ? { x: 60, y: 25 } : { x: 5, y: 10 }
  const [resumeHeight, setResumeHeight] = useState('100%')
  useEffect(() => {
    if (isTouchDevice) {
      setResumeHeight('100%')
    } else {
      setResumeHeight('375px')
    }
  }, [isTouchDevice])
  return (
    <DraggableComponent task={task} initialPosition={initialPosition} setActiveTask={setActiveTask} indexingTasks={indexingTasks} isDraggable={isDraggable} setIsDraggable={setIsDraggable}>
      <Wrapper className="drag-resume" style={{zIndex: taskIndices.resume, display: displayTasks.has(task) ? 'block' : 'none', visibility: tasksVisibility.resume}}>
        <WindowComponent task={task} setActiveTask={setActiveTask} indexingTasks={indexingTasks}>
          <strong className="cursor"><WindowHeader  active={activeTask == task} className='window-title'>
            <span>{capitalise(task)}</span>
            <div className="buttons">
              <WindowButton purpose='download' task={task} setActiveTask={setActiveTask} setIsDraggable={setIsDraggable} />
              <WindowButton purpose='minimise' tasksVisibility={tasksVisibility} task={task} setTasksVisibility={setTasksVisibility} setActiveTask={setActiveTask} setTaskSwitiching={setTaskSwitiching} setIsDraggable={setIsDraggable} />
              <WindowButton purpose='close' task={task} setActiveTask={setActiveTask} displayingTask={displayingTask} setIsDraggable={setIsDraggable} />
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