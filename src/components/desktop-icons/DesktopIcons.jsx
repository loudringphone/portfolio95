import React, { useState } from 'react'
import './desktopicons.css'
import Icon from './Icon';
import { redirectGitHub } from '../../functions/customFunctions';
const DesktopIcons = ({ displayingTask, indexingWindows, tasksVisibility, setTasksVisibility, setActiveTask, issuingWarning, activiatingDockMenu, setSelectedIcon, selectedIcon, icons, recyclingIcon, activeTask, warnings, positioningIcon, setBinLastPos, isTouchDevice  }) => {
  const [lastTouchTime, setLastTouchTime] = useState(0);
  const [iconIndices, setIconIndices] = useState({
    'resume': 0, 'portfolio': 1, 'music': 2, 'recycle bin': 3, 'git': 4
  })
  const maxIconIndex = Object.keys(iconIndices).length - 1
  
  const pickingIcon = (icon) => {
    if (iconIndices[icon] == maxIconIndex) {
      const updatedIconIndices = {
        ...iconIndices,
        [icon]: 99
      };
      return setIconIndices(updatedIconIndices)
    } else {
      setIconIndices(prevState => {
        const sortedKeys = Object.keys(prevState).sort((a, b) => prevState[a] - prevState[b]);
        const iconIndex = sortedKeys.indexOf(icon);
        for (let i = iconIndex + 1; i < sortedKeys.length; i++) {
          prevState[sortedKeys[i]] -= 1;
        }
        prevState[icon] = 99;
        return { ...prevState };
      });
    }
  }
  const movingIconToTop = (icon) => {
    const updatedIconIndices = {
      ...iconIndices,
      [icon]: maxIconIndex
    };
    setIconIndices(updatedIconIndices)
  }
  const handleIcon = (event, task) => {
    event.stopPropagation();
    if (task == 'git') {
      return redirectGitHub()
    }
    const updatedTasksVisibility = {
      ...tasksVisibility,
      [task]: 'visible'
    };
    setTasksVisibility(updatedTasksVisibility);
    setActiveTask(task);
    displayingTask(true, task);
    indexingWindows(task);
    movingIconToTop(task);
  }
  const handleIconMobile = (event, task) => {
    event.stopPropagation();
    if (isTouchDevice) {
      setActiveTask(null)
      pickingIcon(task)
      const currentTime = new Date().getTime();
      setLastTouchTime(currentTime);

      if (currentTime - lastTouchTime <= 300) {
        if (task == 'git') {
          return redirectGitHub()
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
        movingIconToTop(task)
      }
    }
  }
  const handleLeavingIcon = (task) => {
    movingIconToTop(task)
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
          iconIndices={iconIndices}
          handleIcon={handleIcon}
          handleIconMobile={handleIconMobile}
          pickingIcon={pickingIcon}
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