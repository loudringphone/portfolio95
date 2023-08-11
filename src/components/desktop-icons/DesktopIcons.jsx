import React, {useState, useRef} from 'react'
import { Mailnews20, Shell32167, MediaCd, Shell3232, Shell3233 } from '@react95/icons'
import './desktopicons.css'
import Icon from './Icon';

const DesktopIcons = ({ displayingTask, indexingWindows, tasksVisibility, minimisingTasks, activatingTask, issuingWarning, activiatingDockMenu}) => {
  const [lastTouchTime, setLastTouchTime] = useState(0);
  const [picking, setPicking] = useState(false)
  const [iconIndice, setIconIndice] = useState({
    'resume': 0, 'portfolio': 0, 'music': 0, 'recycle bin': 0
  })
  const [tasks, setTasks] = useState({
    'resume': {
      Icon: Mailnews20,
      iconRef: useRef(null),
      visibility: 'visible',
    },
    'portfolio': {
      Icon: Shell32167,
      iconRef: useRef(null),
      visibility: 'visible',
    },
    'music': {
      Icon: MediaCd,
      iconRef: useRef(null),
      visibility: 'visible',
    },
    'recycle bin': {
      Icon: Shell3232,
      iconRef: useRef(null),
      visibility: 'visible',
    },
  })
  
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
    const updatedTasksVisibility = {
      ...tasksVisibility,
      resume: 'visible'
    };
    minimisingTasks(updatedTasksVisibility);
    activatingTask(task);
    displayingTask(true, task);
    indexingWindows(task);
    indexingIcons(task);
  }
  const handleIconMobile = (event, task) => {
    event.stopPropagation();
    const updatedIconIndice = {
      ...iconIndice,
      [task]: 99
    };
    setPicking(true)
    setIconIndice(updatedIconIndice)
    const currentTime = new Date().getTime();
    setLastTouchTime(currentTime);

    if (currentTime - lastTouchTime <= 300) {
      const updatedTasksVisibility = {
        ...tasksVisibility,
        resume: 'visible'
      };
      minimisingTasks(updatedTasksVisibility);
      activatingTask(task)
      displayingTask(true, task)
      indexingWindows(task)
      indexingIcons(task)
    }
  }
  const handlePickingIcon = (task) => {
    // event.stopPropagation();
    const updatedIconIndice = {
      ...iconIndice,
      [task]: 99
    };
    setIconIndice(updatedIconIndice)
    setPicking(true)
  }

  const handleLeavingIcon = (task) => {
    const currentTime = new Date().getTime();
    if (currentTime - lastTouchTime > 300) {
      activatingTask(null)
    }
    indexingIcons(task)
    setPicking(false)
    recycling(task)
  }


  const areRectsOverlapping = (rect1, rect2) => {
    const center1X = (rect1.left + rect1.right) / 2;
    const center1Y = (rect1.top + rect1.bottom) / 2;

    return (
      center1X >= rect2.left &&
      center1X <= rect2.right &&
      center1Y >= rect2.top &&
      center1Y <= rect2.bottom
    );
  };

  const recycling = (task) => {
    if (task == 'recycle bin') {
      return
    }
    const currentIconRef = tasks[task].iconRef;
    const binRef = tasks["recycle bin"].iconRef
    const isOverlapping = areRectsOverlapping(
      currentIconRef.current.getBoundingClientRect(),
      binRef.current.getBoundingClientRect()
    );
    if (isOverlapping) {
      if (task == 'resume') {
        activatingTask('warning')
        indexingWindows('warning')
        displayingTask(true, 'warning')
        return issuingWarning()
      }
      setTasks(prevTasks => ({
        ...prevTasks,
        [task]: {
          ...prevTasks[task],
          visibility: 'hidden'
        },
        "recycle bin": {
          ...prevTasks["recycle bin"],
          Icon: Shell3233
        }
      }));
    }
  };
  return (
    <div className="desktop-icons">
      {Object.entries(tasks).map(([task, data]) => (
        <Icon
          key={task}
          icon={<data.Icon style={{ height: '60px', width: '60px' }} />}
          task={task}
          iconRef={data.iconRef}
          visibility={data.visibility}
          iconIndice={iconIndice}
          handleIcon={handleIcon}
          handleIconMobile={handleIconMobile}
          handlePickingIcon={handlePickingIcon}
          handleLeavingIcon={handleLeavingIcon}
          activiatingDockMenu={activiatingDockMenu}
        />
      ))}
    </div>
  )
}

export default DesktopIcons