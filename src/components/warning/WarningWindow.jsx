import React, {useState, useEffect} from 'react';
import Draggable from 'react-draggable';
import warning from '../../assets/images/warning.ico'
import CloseFillIcon from 'remixicon-react/CloseFillIcon';
import win95error from '../../assets/sounds/win95error.mp3'

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

const WarningWindow = ({displayTasks, displayingTask, activatingTask, activeTask, indexingWindows, windowIndice, warnings}) => {
  const [audio, setAudio] = useState(new Audio(win95error));
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
    activatingTask('warning');
    indexingWindows('warning')
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };

  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };
  const handleClickInsideWindow = (event) => {
    event.stopPropagation();
    activatingTask('warning');
    indexingWindows('warning')
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  }


  useEffect(() => {
    if (displayTasks.has('warning')) {
      audio.play()
    }
  }, [displayTasks])
  

  return (
    <Draggable defaultPosition={initialPosition} bounds="body" handle="strong" {...dragHandlers} onMouseDown={stopPropagation} onTouchStart={stopPropagation}>
    <Wrapper className="drag-warning" style={{zIndex: windowIndice.warning, display: displayTasks.has('warning') ? 'block' : 'none'}}>
    <Window className='warning-window'onClick={handleClickInsideWindow}>
    <strong className="cursor"><WindowHeader  active={activeTask == 'warning'} className='window-title'>
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
              <p>Are you sure to throw away Winston's resume?</p>
            }
        </div>
        <Button onClick={()=>{displayingTask(false, 'warning')}} onTouchStart={()=>{displayingTask(false, 'warning')}}> {warnings >= 2 ? 'Yes' :'No'}
        </Button>
      </WindowContent>
     
    </Window>
  </Wrapper>

  </Draggable>

  )
}

export default WarningWindow