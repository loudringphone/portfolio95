import { useState, useEffect } from 'react'
import './desktopicons.css'
import Icon from './Icon';
import { redirectGitHub } from '../../functions/customFunctions';
const DesktopIcons = ({ displayingTask, indexingTasks, tasksVisibility, setTasksVisibility, setActiveTask, issuingWarning, activiatingDockMenu, setSelectedIcon, selectedIcon, icons, recyclingIcon, activeTask, warnings, positioningIcon, setBinLastPos, isTouchDevice, setTaskSwitiching, taskSwitiching, displayTasks  }) => {
  const [lastTouchTime, setLastTouchTime] = useState(0);
  const [iconIndices, setIconIndices] = useState({
    'resume': 0, 'portfolio': 1, 'music': 2, 'recycle bin': 3, 'git': 4
  })
  const [isDragging, setIsDragging] = useState(null)
  const numberOfIcons = Object.keys(iconIndices).length
  const maxIconIndex = numberOfIcons - 1
  
  const pickingingIcon = (icon) => {
    const indexSet = new Set(Object.values(iconIndices))
    if (indexSet.size != numberOfIcons) {
      setIconIndices(prevState => {
        const sortedKeys = Object.keys(prevState).sort((a, b) => prevState[a] - prevState[b]);
        const iconIndex = sortedKeys.indexOf(icon);
        sortedKeys.splice(iconIndex, 1);
        sortedKeys.push(icon); 
        for (let i = 0; i < sortedKeys.length; i++) {
          prevState[sortedKeys[i]] = i;
        }
        prevState[icon] = maxIconIndex;
        return prevState;
      });
      return
    }
    const iconIndex = iconIndices[icon]
    if (iconIndex == maxIconIndex) {
     return
    } else {
      setIconIndices(prevState => {
        const sortedKeys = Object.keys(prevState).sort((a, b) => prevState[a] - prevState[b]);
        for (let i = iconIndex + 1; i < sortedKeys.length; i++) {
          prevState[sortedKeys[i]] -= 1;
        }
        prevState[icon] = maxIconIndex;
        return prevState;
      });
    }
  }
  const draggingIcon = (icon) => {
    setIsDragging(icon)
    setIconIndices(prevState => {
      prevState[icon] = 99
      return prevState;
    })
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
      redirectGitHub();
      return movingIconToTop(task);
    }
    const updatedTasksVisibility = {
      ...tasksVisibility,
      [task]: 'visible'
    };
    setTasksVisibility(updatedTasksVisibility);
    setActiveTask(task)
    indexingTasks(task);
    movingIconToTop(task);
    displayingTask(true, task);
  }
  const handleIconMobile = (event, task) => {
    event.stopPropagation();
    if (isTouchDevice) {
      setActiveTask(null)
      draggingIcon(task)
      const currentTime = new Date().getTime();
      setLastTouchTime(currentTime);

      if (currentTime - lastTouchTime <= 300) {
        if (task == 'git') {
          redirectGitHub()
          return movingIconToTop(task)
        }
        const updatedTasksVisibility = {
          ...tasksVisibility,
          [task]: 'visible'
        };
        if (task == 'recycle bin') {
          setBinLastPos(null)
        }
        setTasksVisibility(updatedTasksVisibility);
        setActiveTask(task);
        displayingTask(true, task);
        indexingTasks(task);
        movingIconToTop(task);
      }
    }
  }
  const handleLeavingIcon = (task) => {
    movingIconToTop(task);
    setIsDragging(null)
    recycling(task);
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
        indexingTasks('warning')
        return issuingWarning()
      }
      recyclingIcon(task)
    }
  };

  const [afterimageIsActive, setAfterimageIsActive] = useState(true)
  useEffect(() => {
    if (activeTask === null && displayTasks.size > 0) {
      setAfterimageIsActive(false)
    }
  }, [activeTask])
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
          pickingingIcon={pickingingIcon}
          draggingIcon={draggingIcon}
          handleLeavingIcon={handleLeavingIcon}
          activiatingDockMenu={activiatingDockMenu}
          setSelectedIcon={setSelectedIcon}
          selectedIcon={selectedIcon}
          activeTask={activeTask}
          warnings={warnings}
          positioningIcon={positioningIcon}
          setBinLastPos={setBinLastPos}
          setTaskSwitiching={setTaskSwitiching}
          taskSwitiching={taskSwitiching}
          setActiveTask={setActiveTask}
          maxIconIndex={maxIconIndex}
          isDragging={isDragging}
          afterimageIsActive={afterimageIsActive}
          setAfterimageIsActive={setAfterimageIsActive}
        />
      ))}
    </div>
  )
}

export default DesktopIcons