import React, {useState} from 'react'
import { Mailnews20, Shell32167, MediaCd } from '@react95/icons'
import Draggable from 'react-draggable';
import './desktopicons.css'
const DesktopIcons = ({windowIndice, displayingTask, indexingWindows, tasksVisibility, minimisingTasks, activatingTask}) => {
  const [picking, setPicking] = useState(false)
  const [iconIndice, setIconIndice] = useState({resume: 0, portfolio: 0, music: 0})
  const [state, setState] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  });
  const onStart = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };
  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };

  const indexingIcons = (key) => {
    const newIconIndice = new Object(iconIndice)
    delete newIconIndice[key];
    const sortedKeys = Object.keys(iconIndice).sort((a, b) => iconIndice[a] - iconIndice[b]);
    let i = 0
    sortedKeys.forEach((k) => {
      newIconIndice[k] = 0 + i;
      i++
    });
    newIconIndice[key] = 0 + i
    setIconIndice(newIconIndice)
  }
  const handleIcon = (event, task) => {
    event.stopPropagation();
    const newTasksVisibility = new Object(tasksVisibility)
    newTasksVisibility.resume = 'visible'
    minimisingTasks(newTasksVisibility)
    activatingTask(task)
    displayingTask(true, task)
    indexingWindows(task)
    indexingIcons(task)

  }
  const handlePickingIcon = (task) => {
    const newIconIndice = new Object(iconIndice)
    newIconIndice[task] = 99
    setIconIndice(newIconIndice)
    setPicking(true)
  }

  const handleLeavingIcon = (task) => {
    indexingIcons(task)
    setPicking(false)
  }


  return (
    <div className="desktop-icons">
      <Draggable bounds="body" {...dragHandlers}>
      <div className='icon' style={{zIndex: iconIndice['resume']}}>
        <Mailnews20 style={{height:'60px', width:'60px'}} onDoubleClick={(event) => handleIcon(event, 'resume')} onTouchStart={(event) => handleIcon(event, 'resume')} onMouseDown={() => handlePickingIcon('resume')} onTouchEnd={() => handleLeavingIcon('resume')} onMouseUp={() => handleLeavingIcon('resume')} onClick={() => handleLeavingIcon('resume')} />
        <p onDoubleClick={(event) => handleIcon(event, 'resume')} onTouchStart={(event) => handleIcon(event, 'resume')} onMouseDown={() => handlePickingIcon('resume')} onTouchEnd={() => handleLeavingIcon('resume')} onMouseUp={() => handleLeavingIcon('resume')} onClick={() => handleLeavingIcon('resume')}>Resume</p>
      </div>
      </Draggable>
      <Draggable bounds="body" {...dragHandlers}>
      <div className='icon' style={{zIndex: iconIndice['portfolio']}}>
        <Shell32167 style={{height:'60px', width:'60px'}} onDoubleClick={(event) => handleIcon(event, 'portfolio')} onTouchStart={(event) => handleIcon(event, 'portfolio')} onMouseDown={() => handlePickingIcon('portfolio')} onTouchEnd={() => handleLeavingIcon('portfolio')} onMouseUp={() => handleLeavingIcon('portfolio')} onClick={() => handleLeavingIcon('portfolio')} />
        <p onDoubleClick={(event) => handleIcon(event, 'portfolio')} onTouchStart={(event) => handleIcon(event, 'portfolio')} onMouseDown={() => handlePickingIcon('portfolio')} onTouchEnd={() => handleLeavingIcon('portfolio')} onMouseUp={() => handleLeavingIcon('portfolio')} onClick={() => handleLeavingIcon('portfolio')}>Portfolio</p>
      </div>
      </Draggable>
      <Draggable bounds="body" {...dragHandlers}>
      <div className='icon' style={{zIndex: iconIndice['music']}}>
        <MediaCd style={{height:'60px', width:'60px'}} onDoubleClick={(event) => handleIcon(event, 'music')} onTouchStart={(event) => handleIcon(event, 'music')} onMouseDown={() => handlePickingIcon('music')} onTouchEnd={() => handleLeavingIcon('music')} onMouseUp={() => handleLeavingIcon('music')} onClick={() => handleLeavingIcon('music')} />
        <p onDoubleClick={(event) => handleIcon(event, 'music')} onTouchStart={(event) => handleIcon(event, 'music')} onMouseDown={() => handlePickingIcon('music')} onTouchEnd={() => handleLeavingIcon('music')} onMouseUp={() => handleLeavingIcon('music')} onClick={() => handleLeavingIcon('music')}>Music</p>
      </div>
      </Draggable>

    </div>
  )
}

export default DesktopIcons