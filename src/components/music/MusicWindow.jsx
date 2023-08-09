import React, {useState, useEffect} from 'react';
import Draggable from 'react-draggable';
import MinimisingButton from '../buttons/MinimisingButton';

import {
  Button,
  Window,
  WindowContent,
  WindowHeader,
  ScrollView,
} from 'react95';
import styled from 'styled-components';
import './musicwindow.scss'
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

const MusicWindow = ({displayTasks, displayingTask, activatingTask, activeTask, indexingWindows, windowIndice, tasksVisibility, minimisingTasks}) => {
  const [state, setState] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  });

  const [initialPosition, setInitialPosition] = useState({ x: 60, y: 60 })
  const [initialPositionMobile, setInitialPositionMobile] = useState({ x: 5, y: 10 })

  const onStart = () => {
    activatingTask('music');
    indexingWindows('music')
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };

  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };
  const handleClickInsideWindow = (event) => {
    event.stopPropagation();
    activatingTask('music');
    indexingWindows('music')
  };

  return (
    <Draggable defaultPosition={window.innerWidth <= 500 ? initialPositionMobile : initialPosition} bounds="body" handle="strong" {...dragHandlers}>
    <Wrapper className="drag-music" style={{zIndex: windowIndice['music'], display: displayTasks.has('music') ? 'block' : 'none', visibility: tasksVisibility.music}}>
    <Window className='music-window'onClick={handleClickInsideWindow}>
    <strong className="cursor"><WindowHeader  active={activeTask == 'music'} className='window-title'>
        <span>music.exe</span>

        <div className="buttons">
        <MinimisingButton tasksVisibility={tasksVisibility} task='music' minimisingTasks={minimisingTasks} activatingTask={activatingTask}/>
        <Button onClick={()=>{displayingTask(false, 'music')}} onTouchStart={()=>{displayingTask(false, 'music')}}>
          <span className='close-icon' />
        </Button>
        </div>

        
      </WindowHeader></strong>
      <WindowContent className='window-content'>
    
      </WindowContent>
     
    </Window>
  </Wrapper>

  </Draggable>

  )
}

export default MusicWindow