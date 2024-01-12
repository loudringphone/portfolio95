import React, { useEffect } from 'react';
import DraggableComponent from '../DraggableComponent';
import WindowComponent from '../WindowComponent';
import warning from '../../assets/images/warning.ico'
import CloseFillIcon from 'remixicon-react/CloseFillIcon';

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
  .close-icon {
    &:before,
    &:after {
      content: '';
      position: absolute;
      background: ${({ theme }) => theme.materialText};
    }
  }
`;

const WarningWindow = ({displayTasks, displayingTask, setActiveTask, activeTask, indexingWindows, windowIndice, warnings, errorAudio}) => {
  const task = 'warning'
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const initialPosition = { x: centerX - 180, y: centerY - 165 }

  const handleClick = () => {
    displayingTask(false, task);
  }

  useEffect(() => {
    if (warnings > 0) {
      errorAudio.play()
    }
  }, [warnings])
  

  return (
    <DraggableComponent task={task} initialPosition={initialPosition} setActiveTask={setActiveTask} indexingWindows={indexingWindows}>
    <Wrapper className="drag-warning" style={{zIndex: windowIndice.warning, display: displayTasks.has(task) ? 'block' : 'none'}}>
    <WindowComponent task={task} setActiveTask={setActiveTask} indexingWindows={indexingWindows}>
    <strong className="cursor"><WindowHeader  active={activeTask == task} className='window-title'>
        <span>Warning</span>
        <div className="buttons">
        <Button disabled={true} active={false}>
          <CloseFillIcon />
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
  </DraggableComponent>
  )
}

export default WarningWindow