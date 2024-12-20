import { useState } from 'react';
import WindowButton from '../buttons/WindowButton';
import {
  WindowContent,
  WindowHeader,
} from 'react95';
import styled from 'styled-components';
import DraggableComponent from '../DraggableComponent';
import WindowComponent from '../WindowComponent';
import { capitalise } from '../../functions/customFunctions';
import './browserwindow.scss'
const Wrapper = styled.div`
  position: absolute;
  background: transparent;
`;

const BrowserWindow = ({ projectUrl, displayTasks, displayingTask, indexingTasks, taskIndices, tasksVisibility, setTasksVisibility, setActiveTask, activeTask, setTaskSwitiching }) => {
  const task = 'browser'
  const [isDraggable, setIsDraggable] = useState(true)
  const initialPosition = window.innerWidth > 500 ? { x: 80, y: 80 } : { x: 15, y: 10 }


  return (
    <DraggableComponent task={task} initialPosition={initialPosition} setActiveTask={setActiveTask} indexingTasks={indexingTasks} isDraggable={isDraggable} setIsDraggable={setIsDraggable}>
    <Wrapper className="drag-browser" style={{zIndex: taskIndices.browser, display: displayTasks.has(task) ? 'block' : 'none', visibility: tasksVisibility.browser}}>
    <WindowComponent task={task} setActiveTask={setActiveTask} indexingTasks={indexingTasks}>
      <strong className="cursor"><WindowHeader  active={activeTask == task} className='window-title'>
        <span>{capitalise(task)}</span>
        <div className="buttons">
          <WindowButton purpose='minimise' tasksVisibility={tasksVisibility} task={task} setTasksVisibility={setTasksVisibility} setActiveTask={setActiveTask} setTaskSwitiching={setTaskSwitiching} setIsDraggable={setIsDraggable} />
          <WindowButton purpose='close' task={task} setActiveTask={setActiveTask} displayingTask={displayingTask} setIsDraggable={setIsDraggable} />
        </div>
      </WindowHeader></strong>
      <WindowContent className='window-content' style={{display: 'block'}}>
        <div className='browser-screen' style={{display: activeTask == task ? "none" : "block"}}></div>
        <div className="iframe-screen">
          <iframe
            src={projectUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            scrolling="yes"
          />
        </div>
        <p className='iframe-text'>
          If the iframe is not loaded, please click <a href={projectUrl} target="_blank" rel="noopener noreferrer">here</a> to view it directly.
        </p>
      </WindowContent>
    </WindowComponent>
  </Wrapper>
  </DraggableComponent>
  )
}

export default BrowserWindow