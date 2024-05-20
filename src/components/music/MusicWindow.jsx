import {useState, useEffect, useRef} from 'react';
import WindowButton from '../buttons/WindowButton';
import TextScroller from './TextScroller';
import PlayMiniFillIcon from 'remixicon-react/PlayMiniFillIcon';
import PauseMiniFillIcon from 'remixicon-react/PauseMiniFillIcon';
import SkipForwardMiniFillIcon from 'remixicon-react/SkipForwardMiniFillIcon';
import SkipBackMiniFillIcon from 'remixicon-react/SkipBackMiniFillIcon';
import StopMiniFillIcon from 'remixicon-react/StopMiniFillIcon';
import DraggableComponent from '../DraggableComponent';
import WindowComponent from '../WindowComponent';
import { formatTime } from '../../functions/customFunctions';
import { capitalise } from '../../functions/customFunctions';
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
`;

const MusicWindow = ({ displayTasks, displayingTask, setActiveTask, activeTask, indexingTasks, taskIndices, tasksVisibility, setTasksVisibility ,signingOff, setTaskSwitiching, icons }) => {
  const task = 'music'
  const [isDraggable, setIsDraggable] = useState(true)
  const initialPosition = window.innerWidth <= 600 ? {x: window.innerWidth*0.04, y: 15} : { x: (window.innerWidth - 600)/2, y: 60 }
  const [musicIndex, setMusicIndex] = useState(0)
  const [audio, setAudio] = useState(new Audio(music[0].source));
  const [countdownTime, setCountdownTime] = useState(music[0].duration);
  const [playing, setPlaying] = useState(false)
  const [isSkipped, setIsSkipped] = useState(false)

  const scrollerRef = useRef();
  useEffect(() => {
    if (displayTasks.has(task)) {
      scrollerRef.current.resume()
    }
  }, [displayTasks])
  const handlePlay = () => {
      setPlaying(true)
  }
  const handlePause = () => {
    if (audio) {
      setPlaying(false)
    }
  };
  const handleStop = () => {
    if (audio) {
      setPlaying(false)
      audio.currentTime = 0;
      setCountdownTime(Math.floor(audio.duration))
    }
  };
  const handleBack = () => {
    let newMusicIndex
    if (audio) {
      audio.pause()
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
    const newAudio = new Audio(music[newMusicIndex].source);
    setMusicIndex(newMusicIndex);
    setAudio(newAudio);
    newAudio.addEventListener('loadedmetadata', () => {
      setCountdownTime(Math.floor(newAudio.duration));
    }, { once: true });
    setIsSkipped(true);
    setPlaying(true);
  }

  const handleForward = () => {
    if (audio) {
      audio.pause()
      setPlaying(false);
    }
    let newMusicIndex;
    if (musicIndex === music.length - 1) {
        newMusicIndex = 0;
    } else {
        newMusicIndex = musicIndex + 1;
    }
    const newAudio = new Audio(music[newMusicIndex].source);
    setMusicIndex(newMusicIndex);
    setAudio(newAudio);
    setCountdownTime(0)
    newAudio.addEventListener('loadedmetadata', () => {
      setCountdownTime(Math.floor(newAudio.duration));
    }, { once: true });
    setIsSkipped(true);
    setPlaying(true);
  }
  useEffect(() => {
    if (audio && playing) {
      audio.play()
    } else if (audio && !playing) {
      audio.pause()
    }
  }, [audio, playing])

  const handleMusicClose = () => {
    scrollerRef.current.reset()
    scrollerRef.current.pause()
    if (audio) {
      setPlaying(false)
      audio.currentTime = 0;
      setCountdownTime(Math.floor(audio.duration))
    }
  }

  useEffect(() => {
    if (audio && signingOff) {
     setPlaying(false)
    }
  }, [signingOff])

  useEffect(() => {
    if (icons[task].visibility == 'hidden') {
      handleMusicClose()
      setTimeout(() => {
        const newAudio = new Audio(music[0].source);
        setMusicIndex(0);
        setAudio(newAudio);
        setCountdownTime(0)
        newAudio.addEventListener('loadedmetadata', () => {
          setCountdownTime(Math.floor(newAudio.duration));
        }, { once: true });
      }, 0);
      
    }
  }, [icons])

  useEffect(() => {
    let countdownInterval;
    if (audio) {
      if (audio.duration == audio.currentTime) {
        setCountdownTime(Math.floor(audio.duration))
      }
      const handleAudioEnd = () => {
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
        }, { once: true });
      }
      return () => {
        audio.removeEventListener('ended', handleAudioEnd);
        clearInterval(countdownInterval);
      };
    }
   
  }, [audio, playing]);
  
  return (
    <DraggableComponent task={task} initialPosition={initialPosition} setActiveTask={setActiveTask} indexingTasks={indexingTasks} isDraggable={isDraggable} setIsDraggable={setIsDraggable}>
    <Wrapper className="drag-music" style={{zIndex: taskIndices[task], display: displayTasks.has(task) ? 'block' : 'none', visibility: tasksVisibility.music}}>
    <WindowComponent task={task} setActiveTask={setActiveTask} indexingTasks={indexingTasks}>
      <strong className="cursor"><WindowHeader  active={activeTask == task} className='window-title'>
        <span>{capitalise(task)}</span>

        <div className="buttons">
          <WindowButton purpose='minimise' tasksVisibility={tasksVisibility} task={task} setTasksVisibility={setTasksVisibility} setActiveTask={setActiveTask} setTaskSwitiching={setTaskSwitiching} setIsDraggable={setIsDraggable} />
          <WindowButton purpose='close' task={task} displayingTask={displayingTask} setIsDraggable={setIsDraggable} setActiveTask={setActiveTask} handleMusicClose={handleMusicClose} />
        </div>
      </WindowHeader></strong>
      <WindowContent className='window-content'>
        <div className="music-title-container">
          <TextScroller ref={scrollerRef} text={music[musicIndex].title} isSkipped={isSkipped} setIsSkipped={setIsSkipped} displayTasks={displayTasks} />
          <div className='count-down'>{countdownTime ? formatTime(countdownTime) : '--:--'}</div>
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