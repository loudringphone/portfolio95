import React, {useState, useEffect} from 'react';
import MinimisingButton from '../buttons/MinimisingButton';
import TextScroller from './TextScroller';
import PlayMiniFillIcon from 'remixicon-react/PlayMiniFillIcon';
import PauseMiniFillIcon from 'remixicon-react/PauseMiniFillIcon';
import SkipForwardMiniFillIcon from 'remixicon-react/SkipForwardMiniFillIcon';
import SkipBackMiniFillIcon from 'remixicon-react/SkipBackMiniFillIcon';
import StopMiniFillIcon from 'remixicon-react/StopMiniFillIcon';
import DraggableComponent from '../DraggableComponent';
import WindowComponent from '../WindowComponent';
import { formatTime } from '../../functions/formatTime';
import { music } from './music'

import {
  Button,
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

const MusicWindow = ({displayTasks, displayingTask, setActiveTask, activeTask, indexingWindows, windowIndice, tasksVisibility, setTasksVisibility ,signed, signOff, isTouchDevice}) => {
  const task = 'music'

  const initialPosition = window.innerWidth <= 600 ? {x: window.innerWidth*0.04, y: 15} : { x: (window.innerWidth - 600)/2, y: 60 }
  const [musicIndex, setMusicIndex] = useState(0)
  const [audio, setAudio] = useState(new Audio(music[0].source));
  const [countdownTime, setCountdownTime] = useState(music[0].duration);
  const [playing, setPlaying] = useState(false)
  const [isSkipped, setIsSkipped] = useState(false)

  const handleClose = () => {
    displayingTask(false, task)
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false)
      setCountdownTime(Math.floor(audio.duration))
    }
  }
  const handlePlay = () => {
      audio.play();
      setPlaying(true)
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
  const handleBack = () => {
    let newMusicIndex
    if (audio) {
      audio.pause();
      setPlaying(false);
      if (audio.currentTime <= 3) {
        if (musicIndex === 0) {
          newMusicIndex = music.length - 1;
        } else {
          newMusicIndex = musicIndex - 1;
        }
      }
    }
    if (newMusicIndex === undefined) {
      newMusicIndex = musicIndex;
    }
    setMusicIndex(newMusicIndex)
    const newAudio = new Audio(music[newMusicIndex].source);
    newAudio.addEventListener('loadedmetadata', () => {
      setCountdownTime(Math.floor(newAudio.duration));
      setAudio(newAudio);
      setIsSkipped(true);
      newAudio.play();
      setPlaying(true)
    });
  }

  const handleForward = () => {
    if (audio) {
      audio.pause();
      setPlaying(false)
    }
    let newMusicIndex
    if (musicIndex == music.length - 1) {
      newMusicIndex = 0
    } else {
      newMusicIndex = musicIndex + 1
    }
    setMusicIndex(newMusicIndex)
    const newAudio = new Audio(music[newMusicIndex].source);
    newAudio.addEventListener('loadedmetadata', () => {
      setCountdownTime(Math.floor(newAudio.duration));
      setAudio(newAudio);
      setIsSkipped(true);
      newAudio.play();
      setPlaying(true)
    });
    
  }
  const resettingText = () => {
    setIsSkipped(false);
  }
  useEffect(() => {
    if (audio) {
      if (!signed || signOff) {
        audio.pause();
        return setPlaying(false)
      }
    }
  }, [signed, signOff])

  useEffect(() => {
    if (audio) {
      if (!displayTasks.has(task)) {
        audio.pause();
        return setPlaying(false)
      }
    }
  }, [displayTasks])

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
          handleForward()
        }, 1000);
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
    <DraggableComponent task={task} initialPosition={initialPosition} setActiveTask={setActiveTask} indexingWindows={indexingWindows}>
    <Wrapper className="drag-music" style={{zIndex: windowIndice[task], display: displayTasks.has(task) ? 'block' : 'none', visibility: tasksVisibility.music}}>
    <WindowComponent task={task} setActiveTask={setActiveTask} indexingWindows={indexingWindows}>
      <strong className="cursor"><WindowHeader  active={activeTask == task} className='window-title'>
        <span>music.exe</span>

        <div className="buttons">
          <MinimisingButton tasksVisibility={tasksVisibility} task={task} setTasksVisibility={setTasksVisibility} setActiveTask={setActiveTask}/>
          <Button onClick={handleClose} onTouchEnd={handleClose}>
            <span className='close-icon' />
          </Button>
        </div>
      </WindowHeader></strong>
      <WindowContent className='window-content'>
        <div className="music-title-container">
          {/* { isTouchDevice && activeTask != task && displayTasks.has('portfolio') ?
            <p className='music-title'>{music[musicIndex].title}</p>
          : */}
            <TextScroller text={music[musicIndex].title} isSkipped={isSkipped} resettingText={resettingText} />
          {/* } */}
          <div className='count-down'>{formatTime(countdownTime)}</div>
        </div>
        <div className="buttons">
          <Button onClick={handleBack}><SkipBackMiniFillIcon /></Button>
          <Button onClick={handlePlay} disabled={playing}><PlayMiniFillIcon /></Button>
          <Button onClick={handlePause} disabled={!playing}><PauseMiniFillIcon /></Button>
          <Button onClick={handleStop}><StopMiniFillIcon /></Button>
          <Button onClick={handleForward}><SkipForwardMiniFillIcon /></Button>
        </div>
      </WindowContent>
    </WindowComponent>
  </Wrapper>

  </DraggableComponent>

  )
}

export default MusicWindow