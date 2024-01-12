import React, { useState } from 'react';
import Draggable from 'react-draggable';
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

const RecycleWarningWindow = ({displayTasks, displayingTask, setActiveTask, activeTask, indexingWindows, windowIndice}) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const [state, setState] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  });

  const [initialPosition, setInitialPosition] = useState({ x: centerX - 180, y: centerY - 135 })

  const onStart = () => {
    setActiveTask('recycle warning');
    indexingWindows('recycle warning')
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };

  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };

  const stopPropagation = (event) => {
    event.stopPropagation();
  }

  const handleClick = () => {
    displayingTask(false, 'recycle warning')
  }

  return (
    <Draggable defaultPosition={initialPosition} bounds="body" handle="strong" {...dragHandlers} onMouseDown={stopPropagation} onTouchStart={stopPropagation}>
    <Wrapper className="drag-warning" style={{zIndex: windowIndice['recycle warning'], display: displayTasks.has('recycle warning') ? 'block' : 'none'}}>
    <WindowComponent task={'recycle warning'} setActiveTask={setActiveTask} indexingWindows={indexingWindows}>
    <strong className="cursor"><WindowHeader  active={activeTask == 'recycle warning'} className='window-title'>
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
           You can't recycle the recycle bin!
        </div>
        <Button onClick={handleClick} onTouchStart={handleClick}> OK
        </Button>
      </WindowContent>
     
    </WindowComponent>
  </Wrapper>

  </Draggable>

  )
}

export default RecycleWarningWindow