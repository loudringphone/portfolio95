import React, {useState, useEffect} from 'react';
import Draggable from 'react-draggable';
import MinimisingButton from '../buttons/MinimisingButton';
import TextScroller from './TextScroller';
import PlayMiniFillIcon from 'remixicon-react/PlayMiniFillIcon';
import PauseMiniFillIcon from 'remixicon-react/PauseMiniFillIcon';
import StopMiniFillIcon from 'remixicon-react/StopMiniFillIcon';
import { formatTime } from '../../functions/formatTime';
import monOncle from '../../assets/sounds/mon-oncle.mp3'

import {
  Button,
  Window,
  WindowContent,
  WindowHeader,
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
  const [initialPositionMobile, setInitialPositionMobile] = useState({ x: 15, y: 15 })
  const [audio, setAudio] = useState(new Audio(monOncle));
  const [countdownTime, setCountdownTime] = useState(null);
  const [playing, setPlaying] = useState(false)
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

  const handlePlay = () => {
    if (!audio) {
      const newAudio = new Audio(monOncle);
      setAudio(newAudio);
      newAudio.play();
      setPlaying(true)
    } else {
      audio.play();
      setPlaying(true)
    }
  }
  const handlePause = () => {
    if (audio) {
      audio.pause();
      setPlaying(false)
    }
  };
  const handleStop = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false)
      setCountdownTime(Math.floor(audio.duration))
    }
  };

  useEffect(() => {
    let countdownInterval;
    if (audio) {
      if (audio.duration == audio.currentTime) {
        setCountdownTime(Math.floor(audio.duration))
      }
      const handleAudioEnd = () => {
        setCountdownTime(0);
        clearInterval(countdownInterval);
        setTimeout(() => {
          setPlaying(false);
          setCountdownTime(Math.floor(audio.duration));
        }, 500);
      };
      audio.addEventListener('ended', handleAudioEnd);
      if (playing) {
        const remainingTime = audio.duration - audio.currentTime;
        setCountdownTime(Math.floor(remainingTime)); 
        countdownInterval = setInterval(() => {
          setCountdownTime(prevTime => prevTime - 1);
        }, 1000);
        audio.addEventListener('pause', () => {
          clearInterval(countdownInterval);
        });
      }
      return () => {
        audio.removeEventListener('ended', handleAudioEnd);
        clearInterval(countdownInterval);
      };
    }
   
  }, [audio, playing]);

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
      <div className="music-title-container">
      <TextScroller text="Mon Oncle - My favourite movie and soundtrack" />
      <div className='count-down'>{formatTime(countdownTime)}</div>
      </div>
      <div className="buttons">
        <Button onClick={handlePlay} disabled={playing}><PlayMiniFillIcon /></Button>
        <Button onClick={handlePause}><PauseMiniFillIcon /></Button>
        <Button onClick={handleStop}><StopMiniFillIcon /></Button>
      </div>
      </WindowContent>
     
    </Window>
  </Wrapper>

  </Draggable>

  )
}

export default MusicWindow