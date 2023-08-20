import React, {useState, useEffect} from 'react'
import Icon from './Icon';

function RecycleBinContent({binWindowRef, cursorPosition, windowIndice, displayTasks, tasksVisibility, activatingTask, indexingWindows, icons, selectingBinIcon, selectedBinIcon, activeTask, unrecyclingIcon, teleportingIcon, isTouchDevice}) {

    const [followerPosition, setFollowerPosition] = useState({ top: 0, left: 0 });

    const handleClickInsideWindow = (event) => {
        event.stopPropagation();
        activatingTask('recycle bin');
        indexingWindows('recycle bin')
        const binRefs = Object.values(icons).map(task => task.binRef);
        if (binRefs.some(ref => ref?.current?.contains(event.target))) {
          return;
        }
        selectingBinIcon(null)
    
      };
    
  useEffect(() => {
    const updateFollowerPosition = () => {
      if (binWindowRef.current) {
        const referenceRect = binWindowRef.current.getBoundingClientRect();
        setFollowerPosition({
          top: referenceRect.top + 75,
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
      style={{height: binWindowRef.current?.clientHeight * 0.75,
      width: binWindowRef.current?.clientWidth,
      top: `${followerPosition.top}px`,
      left: `${followerPosition.left}px`,
      zIndex: windowIndice['recycle bin'],
      display: displayTasks.has('recycle bin') ? 'block' : 'none',
      visibility: tasksVisibility['recycle bin']
      }}>


<div className="bin-icons">
      {Object.entries(icons).map(([task, data]) => (
        task !== 'resume' && task !== 'recycle bin' && (
        <Icon
          key={task}
          icon={<data.Icon style={{ height: '60px', width: '60px', padding: '0.25rem' }} />}
          task={task}
          visibility={data.visibility}
          selectingBinIcon={selectingBinIcon}
          selectedBinIcon={selectedBinIcon}
          activeTask={activeTask}
          binRef={data.binRef}
          binWindowRef={binWindowRef}
          activatingTask={activatingTask}
          unrecyclingIcon={unrecyclingIcon}
          teleportingIcon={teleportingIcon}
          isTouchDevice={isTouchDevice}
          indexingWindows={indexingWindows}
        />
      )))
      
      }
    </div>









    </div>
  )
}

export default RecycleBinContent