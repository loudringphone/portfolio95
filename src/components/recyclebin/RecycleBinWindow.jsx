import React, {useState} from 'react';
import Draggable from 'react-draggable';
import MinimisingButton from '../buttons/MinimisingButton';
import Icon from './Icon';
import {
  Button,
  Window,
  WindowContent,
  WindowHeader,
  Toolbar,
  Frame,
} from 'react95';
import styled from 'styled-components';
import './recyclebinwindow.scss'
const Wrapper = styled.div`
  position: absolute;
  background: transparent;
  .close-icon {
    &:before,
    &:after {
      content: '';
      position: absolute;
      background: ${({ theme }) => theme.materialText};
    }
  }
`;


const RecycleBinWindow = ({displayTasks, displayingTask, activatingTask, activeTask, indexingWindows, windowIndice, tasksVisibility, minimisingTasks, icons, selectingBinIcon, selectedBinIcon, unrecyclingIcon, binWindowRef, settingCursorPosition, isTouchDevice, issuingBinWarning}) => {
    const [iconIndice, setIconIndice] = useState({
        'music': 0, 'portfolio': 0
      })
  const [state, setState] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  });
  
  const [initialPosition, setInitialPosition] = useState({ x: 20, y: 15 })

  const onStart = () => {
    activatingTask('recycle bin');
    indexingWindows('recycle bin')
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };

  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };
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

  const stopPropagation = (event) => {
    event.stopPropagation();
  }
  
  const handlePickingIcon = (task) => {
    const updatedIconIndice = {
      ...iconIndice,
      [task]: 99
    };
    setIconIndice(updatedIconIndice)
  }

  const handleLeavingIcon = (task) => {
    const updatedIconIndice = {
        ...iconIndice,
        [task]: 0
      };
      setIconIndice(updatedIconIndice)
  }
  const handleDisappearingIcon = (task) => {
    const updatedIconIndice = {
        ...iconIndice,
        [task]: -1
      };
      setIconIndice(updatedIconIndice)
  }

  const handleDrag = (event) => {
    settingCursorPosition({clientX: event.clientX, clientY: event.clientY})
  }

  return (
    <Draggable defaultPosition={initialPosition} bounds="body" handle="strong" {...dragHandlers} onMouseDown={stopPropagation} onTouchStart={stopPropagation} onDrag={handleDrag}>
    <Wrapper className="drag-recycle-bin" style={{zIndex: windowIndice['recycle bin'], display: displayTasks.has('recycle bin') ? 'block' : 'none', visibility: tasksVisibility['recycle bin']}} ref={binWindowRef}>
    <Window className='recycle-bin-window'onClick={handleClickInsideWindow}>
    <strong className="cursor"><WindowHeader  active={activeTask == 'recycle bin'} className='window-title'>
        <span>Recycle Bin</span>
        <div className="buttons">
        <MinimisingButton tasksVisibility={tasksVisibility} task='recycle bin' minimisingTasks={minimisingTasks} activatingTask={activatingTask}/>
        <Button onClick={()=>{displayingTask(false, 'recycle bin')}} onTouchEnd={()=>{displayingTask(false, 'recycle bin')}}>
          <span className='close-icon' />
        </Button>
        </div>
      </WindowHeader></strong>
      <Toolbar className='toolbar'>
        <Button variant='menu' size='sm'>
          <span className='underscore'>F</span>ile
        </Button>
        <Button variant='menu' size='sm'>
          <span className='underscore'>E</span>dit
        </Button>
        <Button variant='menu' size='sm'>
          <span className='underscore'>V</span>iew
        </Button>
        <Button variant='menu' size='sm'>
          <span className='underscore'>H</span>elp
        </Button>
      </Toolbar>
      <WindowContent className='window-content'>
        {
          !isTouchDevice ?
            <div className="bin-icons">
            {Object.entries(icons).map(([task, data]) => (
              task !== 'resume' && task !== 'recycle bin' && (
                <Icon
                  key={task}
                  icon={<data.Icon style={{ height: '60px', width: '60px', padding: '0.25rem' }} />}
                  task={task}
                  iconIndice={iconIndice}
                  visibility={data.visibility}
                  selectingBinIcon={selectingBinIcon}
                  selectedBinIcon={selectedBinIcon}
                  activeTask={activeTask}
                  binRef={data.binRef}
                  binWindowRef={binWindowRef}
                  activatingTask={activatingTask}
                  handlePickingIcon={handlePickingIcon}
                  handleLeavingIcon={handleLeavingIcon}
                  handleDisappearingIcon={handleDisappearingIcon}
                  unrecyclingIcon={unrecyclingIcon}
                  isTouchDevice={isTouchDevice}
                  indexingWindows={indexingWindows}
                />
              )))
            }
            </div>
          :
            <></>
        }
      </WindowContent>
      <Frame variant='well' className='footer'>
          {selectedBinIcon ? <p>{selectedBinIcon.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')}</p> : <p>&nbsp;</p>}
        </Frame>
    </Window>
  </Wrapper>

  </Draggable>

  )
}

export default RecycleBinWindow