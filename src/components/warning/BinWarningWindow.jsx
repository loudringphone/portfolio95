import React from 'react';
import Draggable from 'react-draggable';
import WindowComponent from '../WindowComponent';
import CloseLineIcon from 'remixicon-react/CloseLineIcon';
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

const BinWarningWindow = ({displayTasks, displayingTask, setActiveTask, activeTask, indexingTasks, taskIndices}) => {
  const task = 'bin warning'
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const initialPosition = { x: centerX - 200, y: centerY - 165 }

  const stopPropagation = (event) => {
    event.stopPropagation();
  }
  const handleClick = () => {
    displayingTask(false, task)
  }

  return (
    <Draggable defaultPosition={initialPosition} bounds="body" handle="strong" onMouseDown={stopPropagation} onTouchStart={stopPropagation}>
      <Wrapper className="drag-warning" style={{zIndex: taskIndices[task], display: displayTasks.has(task) ? 'block' : 'none'}}>
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
              Drag this item out of the Recycle Bin to use it.
            </div>
            <Button onClick={handleClick} onTouchStart={handleClick}> OK
            </Button>
          </WindowContent>
        </WindowComponent>
      </Wrapper>
    </Draggable>
  )
}

export default BinWarningWindow