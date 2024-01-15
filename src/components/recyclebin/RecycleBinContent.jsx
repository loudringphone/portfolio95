import React, { useState, useEffect, useRef } from 'react'
import Icon from './Icon';

function RecycleBinContent({binWindowRef, cursorPosition, windowIndice, displayTasks, tasksVisibility, setActiveTask, indexingWindows, icons, setSelectedBinIcon, selectedBinIcon, activeTask, unrecyclingIcon, teleportingIcon, isTouchDevice, setIconDragPoint, settingIconsInBin}) {
  const [followerPosition, setFollowerPosition] = useState({ top: 0, left: 0 });

  const handleClickInsideWindow = (event) => {
    event.stopPropagation();
    setActiveTask('recycle bin');
    indexingWindows('recycle bin')
    if (event.target.className != 'icon-whole') {
      setSelectedBinIcon(null)
    }
  };
    
  useEffect(() => {
    const updateFollowerPosition = () => {
      const binWindow = binWindowRef.current
      if (binWindow) {
        const referenceRect = binWindow.getBoundingClientRect();
        setFollowerPosition({
          top: referenceRect.top,
          left: referenceRect.left,
        });
      }
    };
    if (displayTasks.has('recycle bin')) {
        updateFollowerPosition()
    }
  }, [cursorPosition, displayTasks]);

  const contentRef = useRef(null)
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
        height: binWindowRef.current?.clientHeight,
        width: binWindowRef.current?.clientWidth,
        top: `${followerPosition.top}px`,
        left: `${followerPosition.left}px`,
        zIndex: windowIndice['recycle bin'],
        display: displayTasks.has('recycle bin') ? 'block' : 'none',
        visibility: tasksVisibility['recycle bin']
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
              indexingWindows={indexingWindows}
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