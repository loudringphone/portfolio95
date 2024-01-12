import React, {useState, useEffect} from 'react'
import Icon from './Icon';

function RecycleBinContent({binWindowRef, cursorPosition, windowIndice, displayTasks, tasksVisibility, setActiveTask, indexingWindows, icons, setSelectedBinIcon, selectedBinIcon, activeTask, unrecyclingIcon, teleportingIcon, isTouchDevice, setIconDragPoint}) {

    const [followerPosition, setFollowerPosition] = useState({ top: 0, left: 0 });

    const handleClickInsideWindow = (event) => {
        event.stopPropagation();
        setActiveTask('recycle bin');
        indexingWindows('recycle bin')
        const binRefs = Object.values(icons).map(task => task.binRef);
        if (binRefs.some(ref => ref?.current?.contains(event.target))) {
          return;
        }
        // setSelectedBinIcon(null)
    
      };
    
  useEffect(() => {
    const updateFollowerPosition = () => {
      if (binWindowRef.current) {
        const referenceRect = binWindowRef.current.getBoundingClientRect();
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

  return (
    <div 
      className='recycle-bin-content'
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
        {Object.entries(icons).map(([task, data]) => (
          task !== 'resume' && task !== 'recycle bin' && (
          <Icon
            key={task}
            icon={<data.Icon style={{ height: '60px', width: '60px', padding: '4px' }} />}
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
          />
        )))
        
        }
      </div>
    </div>
  )
}

export default RecycleBinContent