import {useState} from 'react';
import DraggableComponent from '../DraggableComponent';
import WindowComponent from '../WindowComponent';
import WindowButton from '../buttons/WindowButton';
import Icon from './Icon';
import {
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
`;


const RecycleBinWindow = ({ displayTasks, displayingTask, setActiveTask, activeTask, indexingTasks, taskIndices, tasksVisibility, setTasksVisibility, icons, setSelectedBinIcon, selectedBinIcon, unrecyclingIcon, binWindowRef, isTouchDevice, setIconDragPoint, iconsInBin, settingIconsInBin, setTaskSwitiching }) => {
  const task = 'recycle bin'
  const [isDraggable, setIsDraggable] = useState(true)
  const initialPosition = { x: 20, y: 15 }
  const [iconIndices, setIconIndices] = useState({ 'music': 0, 'portfolio': 0, 'git' : 0 })

  const handlePickingIcon = (task) => {
    const updatedIconIndices = {
      ...iconIndices,
      [task]: 99
    };
    setIconIndices(updatedIconIndices)
  }
  const handleLeavingIcon = (task) => {
    const updatedIconIndices = {
        ...iconIndices,
        [task]: 0
      };
      setIconIndices(updatedIconIndices)
  }
  const handleDisappearingIcon = (task) => {
    const updatedIconIndices = {
        ...iconIndices,
        [task]: -1
      };
      setIconIndices(updatedIconIndices)
  }
  console.log(iconsInBin)

  return (
    <DraggableComponent task={task} initialPosition={initialPosition} setActiveTask={setActiveTask} indexingTasks={indexingTasks} isDraggable={isDraggable} setIsDraggable={setIsDraggable}>
      <Wrapper className="drag-recycle-bin" style={{zIndex: taskIndices['recycle bin'], display: displayTasks.has('recycle bin') ? 'block' : 'none', visibility: tasksVisibility['recycle bin']}}>
        <WindowComponent task={'recycle bin'} setActiveTask={setActiveTask} indexingTasks={indexingTasks} icons={icons} setSelectedBinIcon={setSelectedBinIcon}>
          <strong className="cursor"><WindowHeader  active={activeTask == 'recycle bin'} className='window-title'>
            <span>Recycle Bin</span>
            <div className="buttons">
              <WindowButton purpose='minimise' tasksVisibility={tasksVisibility} task='recycle bin' setTasksVisibility={setTasksVisibility} setActiveTask={setActiveTask} setTaskSwitiching={setTaskSwitiching} setIsDraggable={setIsDraggable}/>
              <WindowButton purpose='close' task={task} setActiveTask={setActiveTask} displayingTask={displayingTask} setIsDraggable={setIsDraggable} />
            </div>
          </WindowHeader></strong>
        {/* {
          !isTouchDevice ?
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
          :
          <></>
        } */}
        <WindowContent className='window-content' ref={binWindowRef}>
          {
            !isTouchDevice ?
              <div className="bin-icons">
                {[...iconsInBin].map((icon) => {
                  const data = icons[icon];
                  return (
                    <Icon
                      key={icon}
                      icon={<data.Icon style={{ height: '60px', width: '60px', padding: '4px' }} />}
                      task={icon}
                      iconIndices={iconIndices}
                      visibility={data.visibility}
                      setSelectedBinIcon={setSelectedBinIcon}
                      selectedBinIcon={selectedBinIcon}
                      activeTask={activeTask}
                      iconBinRef={data.iconBinRef}
                      binWindowRef={binWindowRef}
                      setActiveTask={setActiveTask}
                      handlePickingIcon={handlePickingIcon}
                      handleLeavingIcon={handleLeavingIcon}
                      handleDisappearingIcon={handleDisappearingIcon}
                      unrecyclingIcon={unrecyclingIcon}
                      isTouchDevice={isTouchDevice}
                      indexingTasks={indexingTasks}
                      setIconDragPoint={setIconDragPoint}
                      settingIconsInBin={settingIconsInBin}
                    />
                  );
                })}
                </div>
            :
              <></>
          }
        </WindowContent>
        <Frame variant='well' className='footer'>
            {selectedBinIcon ? <p>{selectedBinIcon.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')}</p> : <p>&nbsp;</p>}
        </Frame>
      </WindowComponent>
    </Wrapper>
  </DraggableComponent>
  )
}

export default RecycleBinWindow