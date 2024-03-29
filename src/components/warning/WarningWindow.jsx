import React, { useEffect } from 'react';
import Draggable from 'react-draggable';
import CloseLineIcon from 'remixicon-react/CloseLineIcon';
import WindowComponent from '../WindowComponent';
import warning from '../../assets/images/warning.ico'

import {
  Button,
  WindowContent,
  WindowHeader,
} from 'react95';
import styled from 'styled-components';
import './warningwindow.scss'
const Wrapper = styled.div`
  position: absolute;
  background: transparent;
`;

const WarningWindow = ({displayTasks, displayingTask, setActiveTask, activeTask, indexingTasks, taskIndices, warnings, errorAudio}) => {
  const task = 'warning'
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const initialPosition = { x: centerX - 180, y: centerY - 165 }

  const stopPropagation = (event) => {
    event.stopPropagation();
  }

  const handleClick = () => {
    displayingTask(false, task);
  }

  useEffect(() => {
    if (warnings > 0) {
      errorAudio.play()
      setTimeout(() => {
        setActiveTask('warning')
      }, 0);
    }
  }, [warnings])
  
  return (
    <Draggable defaultPosition={initialPosition} bounds="body" handle="strong" onMouseDown={stopPropagation} onTouchStart={stopPropagation}>
      <Wrapper className="drag-warning" style={{zIndex: taskIndices.warning, display: displayTasks.has(task) ? 'block' : 'none'}}>
        <WindowComponent task={task} setActiveTask={setActiveTask} indexingTasks={indexingTasks}>
          <strong className="cursor"><WindowHeader  active={activeTask == task} className='window-title'>
            <span>Warning</span>
            <div className="buttons">
              <Button disabled={true} active={false}>
                <CloseLineIcon />
              </Button>
            </div>
          </WindowHeader></strong>
          <WindowContent className='window-content'>
            <div className='warning'>
              <img
                src={warning}
                alt="warning"
                style={{ height: "40px"}}
              />
              {
                warnings >= 3 ?
                <p>Winston can help fix the bugs for you!</p>
                :
                warnings >= 2 ?
                <p>Hiring Winston would be a good decision!</p>
                :
                <p>Confirm discarding Winston's resume?</p>
              }
            </div>
            <Button onClick={handleClick} onTouchStart={handleClick}> {warnings >= 2 ? 'Yes' :'No'}
            </Button>
          </WindowContent>
        </WindowComponent>
      </Wrapper>
    </Draggable>
  )
}

export default WarningWindow