import React, { useState } from 'react'
import './desktopicons.css'
import Icon from './Icon';
import { redirectGitHub } from '../../functions/customFunctions';
const DesktopIcons = ({ displayingTask, indexingWindows, tasksVisibility, setTasksVisibility, setActiveTask, issuingWarning, activiatingDockMenu, setSelectedIcon, selectedIcon, icons, recyclingIcon, activeTask, warnings, positioningIcon, setBinLastPos, teleportingIcon }) => {
  const [lastTouchTime, setLastTouchTime] = useState(0);
  const [iconIndice, setIconIndice] = useState({
    'resume': 0, 'portfolio': 0, 'music': 0, 'recycle bin': 0
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
    if (task == 'git') {
      redirectGitHub()
      return teleportingIcon(event)
    }
    const updatedTasksVisibility = {
      ...tasksVisibility,
      [task]: 'visible'
    };
    setTasksVisibility(updatedTasksVisibility);
    setActiveTask(task);
    displayingTask(true, task);
    indexingWindows(task);
    indexingIcons(task);
  }
  const handleIconMobile = (event, task) => {
    event.stopPropagation();

    setActiveTask(null)
    const updatedIconIndice = {
      ...iconIndice,
      [task]: 99
    };
    setIconIndice(updatedIconIndice)
    const currentTime = new Date().getTime();
    setLastTouchTime(currentTime);

    if (currentTime - lastTouchTime <= 300) {
      if (task == 'git') {
        redirectGitHub()
        return teleportingIcon(event)
      }
      const updatedTasksVisibility = {
        ...tasksVisibility,
        [task]: 'visible'
      };
      if (task == 'recycle bin') {
        setBinLastPos(null)
      }
      setTasksVisibility(updatedTasksVisibility);
      setActiveTask(task)
      displayingTask(true, task)
      indexingWindows(task)
      indexingIcons(task)
    }
  }
  const handlePickingIcon = (task) => {
    const updatedIconIndice = {
      ...iconIndice,
      [task]: 99
    };
    setIconIndice(updatedIconIndice)
  }

  const handleLeavingIcon = (task) => {
    indexingIcons(task)
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
    const currentIconRef = icons[task].iconRef;
    const binRef = icons["recycle bin"].iconRef
    const isOverlapping = areRectsOverlapping(
      currentIconRef.current.getBoundingClientRect(),
      binRef.current.getBoundingClientRect()
    );

    if (isOverlapping) {
      if (task == 'resume') {
        setActiveTask('warning')
        displayingTask(true, 'warning')
        indexingWindows('warning')
        return issuingWarning()
      }
      recyclingIcon(task)
    }
  };
  return (
    <div className="desktop-icons">
      {Object.entries(icons).map(([task, data]) => (
        <Icon
          key={task}
          icon={<data.Icon style={{ height: '60px', width: '60px', padding: '4px' }} />}
          task={task}
          desktopRef={data.desktopRef}
          iconRef={data.iconRef}
          iconPosition={data.position}
          visibility={data.visibility}
          iconIndice={iconIndice}
          handleIcon={handleIcon}
          handleIconMobile={handleIconMobile}
          handlePickingIcon={handlePickingIcon}
          handleLeavingIcon={handleLeavingIcon}
          activiatingDockMenu={activiatingDockMenu}
          setSelectedIcon={setSelectedIcon}
          selectedIcon={selectedIcon}
          activeTask={activeTask}
          warnings={warnings}
          positioningIcon={positioningIcon}
          setBinLastPos={setBinLastPos}
        />
      ))}
    </div>
  )
}

export default DesktopIcons