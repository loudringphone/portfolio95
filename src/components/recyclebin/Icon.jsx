import { useState, useEffect } from 'react'
import Draggable from 'react-draggable';
import win95error from '../../assets/sounds/win95error.mp3'
import { getPropertyValue } from '../../functions/customFunctions';

const Icon = ({ task, icon, visibility, setSelectedBinIcon, selectedBinIcon, activeTask, binIconRef, binWindowRef, emptyingBin, setActiveTask, teleportingIcon, isTouchDevice, indexingTasks, setIconDragPoint, binIconsRef, iconsInBin, setIconsInBin }) => {
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

      const binGridStyle = window.getComputedStyle(binIconsRef.current);
      const gridGap = getPropertyValue(binGridStyle, 'grid-gap');
      const gridColumnHeight = getPropertyValue(binGridStyle, 'grid-template-rows');

      const clientX = event.clientX || event.changedTouches[0].clientX;
      const clientY = event.clientY || event.changedTouches[0].clientY;
      if (
        //width: 300, gap: 15, padding: 15, gridWidth: 90, gridHeight: 97
        clientX >= binIconsRect.x && clientX <= binIconsRect.x + binIconsRect.width &&
        clientY >= binIconsRect.y && clientY <= binIconsRect.y + gridColumnHeight + gridGap
      ) {
        const unshifting = (task) => {
          setIconsInBin(prevIcons => {
            prevIcons.delete(task);
            const arr = Array.from(prevIcons);
            arr.unshift(task); 
            return new Set(arr);
          })
        }
        const inserting = (task) => {
          setIconsInBin(prevIcons => {
            prevIcons.delete(task);
            const arr = Array.from(prevIcons);
            arr.splice(1, 0, task);
            return new Set(arr);
          })
        }
        const pushing = (task) => {
          setIconsInBin(prevIcons => {
            prevIcons.delete(task);
            const arr = Array.from(prevIcons);
            arr.push(task); 
            return new Set(arr);
          })
        }
        //15 90 15 90 15 90 15 = 330
        const gridPadding = getPropertyValue(binGridStyle, 'padding');
        const gridColumnWidth = getPropertyValue(binGridStyle, 'grid-template-columns');
        const halfWidth = gridPadding*2 + gridColumnWidth*1.5
        const nineEleventhWidth = gridPadding*3 + gridColumnWidth*2.5
        const twoEleventhWidth = gridPadding + gridColumnWidth*0.5
        const iconsArr = Array.from(iconsInBin)
        if (iconsArr[0] === task) {
          // 15 90 15 45 || 15 90 15 90 15 45
          if (clientX > binIconsRect.x + halfWidth && clientX <= binIconsRect.x + nineEleventhWidth ) {
            inserting(task)
          // 15 90 15 90 15 45
          } else if ( clientX > binIconsRect.x + nineEleventhWidth) {
            pushing(task)
          }
        } else if (iconsArr[2] === task) {
          // 15 45
          if (clientX <= binIconsRect.x + twoEleventhWidth ) {
            unshifting(task)
          // 15 45 ||  15 90 15 45
          } else if (clientX > binIconsRect.x + twoEleventhWidth && clientX <= binIconsRect.x + halfWidth) {
            inserting(task)
          }
        } else {
          // 15 45
          if (clientX <= binIconsRect.x + twoEleventhWidth ) {
            unshifting(task)
          // 15 90 15 90 15 45
          } else if (clientX > binIconsRect.x + nineEleventhWidth) {
            pushing(task)
          } 
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
        const { clientX, clientY } = event;
        const binIconRect = binIconRef.current.getBoundingClientRect();
        const relativeX = clientX - binIconRect.left;
        const relativeY = clientY - binIconRect.top;
        setIconDragPoint({x: relativeX, y: relativeY})
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
    const binIconRect = binIconRef.current.getBoundingClientRect();
    const relativeX = clientX - binIconRect.left;
    const relativeY = clientY - binIconRect.top;
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
      const binIconRect = binIconRef.current.getBoundingClientRect();
      const relativeX = clientX - binIconRect.left;
      const relativeY = clientY - binIconRect.top;
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

  const iconBinRect = binIconRef.current?.getBoundingClientRect();
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
    <div className='icon' ref={binIconRef} style={{ zIndex: iconZindex, display: iconDisplay, }}>
      <div className='icon-placeholder'
        onMouseDown={handleDown}
        onMouseUp={(event) => handleUp(event, task)}
        onTouchEnd={(event) => handleUp(event, task)}
        onTouchStartCapture={(event) => handleOpen(event)}
        onDoubleClick={(event) => handleOpen(event)}
      >
        <div className="bin-filter" style={{display: selectedBinIcon == task ? 'block' : 'none'}}></div>
        {icon}
      </div>
      <div className='text-placeholder'
        onMouseDown={handleDown}
        onMouseUp={(event) => handleUp(event, task)}
        onTouchEnd={(event) => handleUp(event, task)}
        onTouchStartCapture={(event) => handleOpen(event)}
        onDoubleClick={(event) => handleOpen(event)}
      >
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