import { useState, useEffect } from 'react'
import Draggable from 'react-draggable';
import win95error from '../../assets/sounds/win95error.mp3'

const Icon = ({ task, icon, visibility, setSelectedBinIcon, selectedBinIcon, activeTask, iconBinRef, binWindowRef, emptyingBin, setActiveTask, teleportingIcon, isTouchDevice, indexingTasks, setIconDragPoint, binIconsRef, setIconsInBin }) => {
  const position = {x: 0, y: 0}
  const [lastTouchTime, setLastTouchTime] = useState(0);
  const [iconDisplay, setIconDisplay] = useState('none')
  const [iconZindex, setIconZindex] = useState(0)
  const errorAudio = new Audio(win95error);
  const [dragStartTime, setDragStartTime] = useState(null);

  const onStart = (event) => {
    event.stopPropagation();
    setIconZindex(99);
    indexingTasks('recycle bin');
    setActiveTask('recycle bin');
    setSelectedBinIcon(task);
    setDragStartTime(new Date().getTime());
  };
  const onStop = (event) => {
    setIconZindex(0);
    const DragEndTime = new Date().getTime();
    const dragTime = (DragEndTime - dragStartTime);
    if (dragTime > 250) {
      const binIconsRect = binIconsRef.current.getBoundingClientRect();
      const clientX = event.clientX || event.changedTouches[0].clientX;
      const clientY = event.clientY || event.changedTouches[0].clientY;
      if (
        //width: 300, gap: 15, padding: 15, gridWidth: 90, gridHeight: 97
        clientX >= binIconsRect.x && clientX <= binIconsRect.x + binIconsRect.width &&
        clientY >= binIconsRect.y && clientY <= binIconsRect.y + 112
      ) {
        // 15 + 90/3 * 2
        if (clientX <= binIconsRect.x + 75) {
          setIconsInBin(prevIcons => {
            prevIcons.delete(task);
            const arr = Array.from(prevIcons);
            arr.unshift(task); 
            return new Set(arr);
          })
        // 15 + 90 + 15 + 90 + 15 + 90/3 * 2
        } else if (clientX < binIconsRect.x + 285) {
          setIconsInBin(prevIcons => {
            prevIcons.delete(task);
            const arr = Array.from(prevIcons);
            arr.splice(1, 0, task);
            return new Set(arr);
          })
        } else if (clientX >= binIconsRect.x + 285) {
          setIconsInBin(prevIcons => {
            prevIcons.delete(task);
            const arr = Array.from(prevIcons);
            arr.push(task); 
            return new Set(arr);
          })
        }
      }
    };
  };
  const dragHandlers = { onStart, onStop };
  const taskName = task.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')

  const handleUp = (event, task) => {
    setActiveTask('recycle bin')
    setSelectedBinIcon(task)
    const clientX = event.clientX || event.changedTouches[0].clientX;
    const clientY = event.clientY || event.changedTouches[0].clientY;
    const binRect = binWindowRef.current.getBoundingClientRect();
    if (
      clientX < binRect.x || clientX > binRect.x + binRect.width ||
      clientY < binRect.y || clientY > binRect.y + binRect.height
    ) {
      setIconDisplay('none')
      if (isTouchDevice) {
        teleportingIcon(event)
      }
      setTimeout(() => {
        emptyingBin();
      }, 0);
      setSelectedBinIcon(null)
    }
  }

  const stopPropagation = (event) => {
    event.stopPropagation();
  }

  useEffect(() => {
      if (visibility == 'hidden') {
        setIconDisplay('block')
      }
  }, [visibility])
  
  const handleDown = (event) => {
    const { clientX, clientY } = event;
    const elementRect = event.currentTarget.getBoundingClientRect();
    const relativeX = clientX - elementRect.left;
    const relativeY = clientY - elementRect.top;
    setIconDragPoint({x: relativeX, y: relativeY})
  }

  const handleOpen = (event) => {
    if (event.type == 'dblclick') {
      setTimeout(() => {
        errorAudio.play();
        setActiveTask('bin warning')
      }, 150);
      return
    }
    if (event.touches.length === 1) {
      const { clientX, clientY } = event.touches[0];
      const elementRect = event.currentTarget.getBoundingClientRect();
      const relativeX = clientX - elementRect.left;
      const relativeY = clientY - elementRect.top;
      setIconDragPoint({x: relativeX, y: relativeY})
    }
    const currentTime = new Date().getTime();
    setLastTouchTime(currentTime);
    if (currentTime - lastTouchTime <= 300) {
      setTimeout(() => {
        errorAudio.play();
        setActiveTask('bin warning')
      }, 150);
    };
  }

  const iconBinRect = iconBinRef.current?.getBoundingClientRect();
  const bodyWidth = document.body.clientWidth;
  const bodyHeight = document.body.clientHeight;

  return (
    <Draggable
      bounds={{
        left: iconBinRect ? -iconBinRect.x : 0,
        top: iconBinRect ? -iconBinRect.y : 0,
        right: iconBinRect ? bodyWidth - iconBinRect.x - iconBinRect.width : 0,
        bottom: iconBinRect ? bodyHeight - iconBinRect.y - iconBinRect.height : 0
      }}
      {...dragHandlers}
      onMouseDown={stopPropagation}
      onTouchStart={stopPropagation}
      position={position}
    >
    <div className='icon' ref={iconBinRef} style={{ zIndex: iconZindex, display: iconDisplay, }}>
      <div className='icon-whole'
        onMouseDown={handleDown}
        onMouseUp={(event) => handleUp(event, task)}
        onTouchEnd={(event) => handleUp(event, task)}
        onTouchStartCapture={(event) => handleOpen(event)}
        onDoubleClick={(event) => handleOpen(event)}
      ></div>
      <div className='icon-placeholder'>
        <div className="bin-filter" style={{display: selectedBinIcon == task ? 'block' : 'none'}}></div>
        {icon}
      </div>
      <div className='text-placeholder'>
        <div className="filter-blue" style={{display: selectedBinIcon == task && activeTask == 'recycle bin' ? 'block' : 'none'}}></div>
        <div className="bin-filter-black" style={{display: selectedBinIcon == task && activeTask !== 'recycle bin' ? 'block' : 'none'}}></div>
      <p style={{color: selectedBinIcon == task && activeTask == 'recycle bin' ? 'white' : 'black'}}>
        {taskName}
      </p>
      </div>
    </div>

  </Draggable>
  )
}

export default Icon