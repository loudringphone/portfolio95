import React, { useState, useEffect, useRef } from 'react'
import Icon from './Icon';

function RecycleBinContent({ binWindowRef, taskIndices, displayTasks, tasksVisibility, setActiveTask, indexingTasks, icons, setSelectedBinIcon, selectedBinIcon, activeTask, emptyingBin, teleportingIcon, isTouchDevice, setIconDragPoint, documentPosition, setDocumentPosition, iconsInBin, setIconsInBin, binIconsRef, settingIconsInBin={settingIconsInBin} }) {
  const contentRef = useRef()

  const handleClickInsideWindow = (event) => {
    event.stopPropagation();
    setActiveTask('recycle bin');
    indexingTasks('recycle bin')
    if (event.target.className != 'icon-whole') {
      setSelectedBinIcon(null)
    }
  };
 
  useEffect(() => {
    const updateBoundingClientRect = () => {
      const binWindow = binWindowRef.current
      const binContent = contentRef.current
      if (displayTasks.has('recycle bin')) {
        const scrollTop = document.documentElement.scrollTop
        const scrollLeft = document.documentElement.scrollLeft;
        const binWindowRect = binWindow.getBoundingClientRect();
        binContent.style.top = `${scrollTop + binWindowRect.top}px`;
        binContent.style.left = `${scrollLeft + binWindowRect.left}px`;
      }
    };
      if (displayTasks.has('recycle bin')) {
        updateBoundingClientRect()
      }
      window.addEventListener('touchmove', updateBoundingClientRect);
    return () => {
      window.removeEventListener('touchmove', updateBoundingClientRect);
    };
  }, [displayTasks]); 

  const [touchStartY, setTouchStartY] = useState(null);
  const handleTouchStart = (event) => {
    setTouchStartY(event.touches[0].clientY);
    setDocumentPosition(document.documentElement.scrollTop);
  };
  const handleTouchMove = (event) => {
    const touchEndY = event.touches[0].clientY;
    if (documentPosition === 0 && touchEndY > touchStartY) {
      event.preventDefault();
    }
  }
  useEffect(() => {
    const content = contentRef.current
    if (content) {
      content.addEventListener('touchmove', handleTouchMove, { passive: false });
      return () => {
        content.removeEventListener('touchmove', handleTouchMove)
      };
    }
  }, [touchStartY, documentPosition]);

  return (
    <div 
      className='recycle-bin-content'
      ref={contentRef}
      onTouchStartCapture={handleTouchStart}
      onClick={handleClickInsideWindow}
      style={{
        zIndex: taskIndices['recycle bin'],
        display: displayTasks.has('recycle bin') ? 'block' : 'none',
        visibility: tasksVisibility['recycle bin'],
        height: binWindowRef.current?.clientHeight,
        width: binWindowRef.current?.clientWidth,
        top: 58,
        left: 26,
      }}
    >
      <div className="bin-icons" ref={binIconsRef}>
        {
         [...iconsInBin].map((icon) => {
          const data = icons[icon];
          return (
            <Icon
              key={icon}
              icon={
                React.createElement(
                  data.Icon,
                  { style: { height: '60px', width: '60px', padding: '4px' } }
                )
              }
              task={icon}
              visibility={data.visibility}
              setSelectedBinIcon={setSelectedBinIcon}
              selectedBinIcon={selectedBinIcon}
              activeTask={activeTask}
              binIconRef={data.binIconRef}
              binWindowRef={binWindowRef}
              setActiveTask={setActiveTask}
              emptyingBin={emptyingBin}
              teleportingIcon={teleportingIcon}
              isTouchDevice={isTouchDevice}
              indexingTasks={indexingTasks}
              setIconDragPoint={setIconDragPoint}
              binIconsRef={binIconsRef}
              iconsInBin={iconsInBin}
              setIconsInBin={setIconsInBin}
              settingIconsInBin={settingIconsInBin}
            />
          )})
        }
      </div>
    </div>
  )
}

export default RecycleBinContent