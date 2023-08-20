import React, {useState, useEffect} from 'react';
import Draggable from 'react-draggable';
import warning from '../../assets/images/warning.ico'
import CloseFillIcon from 'remixicon-react/CloseFillIcon';


import {
  Button,
  Window,
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

const BinWarningWindow = ({displayTasks, displayingTask, activatingTask, activeTask, indexingWindows, windowIndice}) => {
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

  const [initialPosition, setInitialPosition] = useState({ x: centerX - 180, y: centerY - 165 })

  const onStart = () => {
    activatingTask('bin warning');
    indexingWindows('bin warning')
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };

  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };
  const handleClickInsideWindow = (event) => {
    event.stopPropagation();
    activatingTask('bin warning');
    indexingWindows('bin warning')
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  }

  return (
    <Draggable defaultPosition={initialPosition} bounds="body" handle="strong" {...dragHandlers} onMouseDown={stopPropagation} onTouchStart={stopPropagation}>
    <Wrapper className="drag-warning" style={{zIndex: windowIndice['bin warning'], display: displayTasks.has('bin warning') ? 'block' : 'none'}}>
    <Window className='warning-window'onClick={handleClickInsideWindow}>
    <strong className="cursor"><WindowHeader  active={activeTask == 'bin warning'} className='window-title'>
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
           To use this item, first drag it out of the Recycle Bin.
        </div>
        <Button onClick={()=>{displayingTask(false, 'bin warning')}} onTouchStart={()=>{displayingTask(false, 'bin warning')}}> OK
        </Button>
      </WindowContent>
     
    </Window>
  </Wrapper>

  </Draggable>

  )
}

export default BinWarningWindow