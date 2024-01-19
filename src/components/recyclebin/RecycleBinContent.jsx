import React, { useState, useEffect, useRef } from 'react'
import Icon from './Icon';

function RecycleBinContent({binWindowRef, taskIndices, displayTasks, tasksVisibility, setActiveTask, indexingTasks, icons, setSelectedBinIcon, selectedBinIcon, activeTask, unrecyclingIcon, teleportingIcon, isTouchDevice, setIconDragPoint, settingIconsInBin}) {
  const contentRef = useRef(null)

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
      if (binWindow) {
        const referenceRect = binWindow.getBoundingClientRect();
        binContent.style.top = `${referenceRect.top}px`;
        binContent.style.left = `${referenceRect.left}px`;
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

  const [documentPosition, setDocumentPosition] = useState(0);
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
        top: 58,
        left: 26,
      }}
    >
      <div className="bin-icons">
        {
          Object.entries(icons).map(([task, data]) => (
            task !== 'resume' && task !== 'recycle bin' && (
            <Icon
              key={task}
              icon={
                React.createElement(
                  data.Icon,
                  { style: { height: '60px', width: '60px', padding: '4px' } }
                )
              }
              task={task}
              visibility={data.visibility}
              setSelectedBinIcon={setSelectedBinIcon}
              selectedBinIcon={selectedBinIcon}
              activeTask={activeTask}
              binRef={data.binRef}
              binWindowRef={binWindowRef}
              setActiveTask={setActiveTask}
              unrecyclingIcon={unrecyclingIcon}
              teleportingIcon={teleportingIcon}
              isTouchDevice={isTouchDevice}
              indexingTasks={indexingTasks}
              setIconDragPoint={setIconDragPoint}
              settingIconsInBin={settingIconsInBin}
            />
          )))
        }
      </div>
    </div>
  )
}

export default RecycleBinContent