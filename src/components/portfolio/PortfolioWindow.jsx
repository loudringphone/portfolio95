import React, {useState} from 'react';
import Draggable from 'react-draggable';
import MinimisingButton from '../buttons/MinimisingButton';
import {
  Button,
  Window,
  WindowContent,
  WindowHeader,
  ScrollView,
  TextInput,
} from 'react95';
import styled from 'styled-components';
import ProjectTree from './ProjectTree';
import { projects } from './projects';
import './portfoliowindow.scss'

const Wrapper = styled.div`
  position: absolute;
  .close-icon {
    &:before,
    &:after {
      background: ${({ theme }) => theme.materialText};
    }
  }
`;

const PortfolioWindow = ({displayingTask, settingProjectUrl, displayTasks, activatingTask, activeTask, indexingWindows, windowIndice, tasksVisibility, minimisingTasks}) => {
  const [projectSelected, setProjectSelected] = useState(null)
  const [state, setState] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  });
  const [initialPosition, setInitialPosition] = useState(window.innerWidth <= 500 ? {x: window.innerWidth*0.04, y: 15} : { x: (window.innerWidth - 600)/2, y: 70 })

  const handleGo = (event) => {
  event.stopPropagation();
  settingProjectUrl(projects[projectSelected].site);
  const newTasksVisibility = new Object(tasksVisibility)
  newTasksVisibility.browser = 'visible'
  minimisingTasks(newTasksVisibility)
  activatingTask('browser')
  indexingWindows('browser')
  displayingTask(true, 'browser')
  }
  const selectingProject = (id) => {
    setProjectSelected(id)
  }
  const onStart = (event) => {
    event.stopPropagation();
    activatingTask('portfolio')
    indexingWindows('portfolio', windowIndice)
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };

  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };

  const handleClickInsideWindow = (event) => {
    event.stopPropagation();
    activatingTask('portfolio');
    indexingWindows('portfolio')
  };
  const stopPropagation = (event) => {
    event.stopPropagation();
  }
  return (
    <Draggable defaultPosition={initialPosition} bounds="body" handle="strong" {...dragHandlers} onMouseDown={stopPropagation} onTouchStart={stopPropagation}>
    <Wrapper className="drag-portfolio" style={{zIndex: windowIndice['portfolio'], display: displayTasks.has('portfolio') ? 'block' : 'none', visibility: tasksVisibility.portfolio}}>
    <Window className='portfolio-window' onClick={handleClickInsideWindow}>
    <strong className="cursor"><WindowHeader active={activeTask == 'portfolio'} className='window-title'>
        <span>portfolio.exe</span>
        <div className="buttons">
        <MinimisingButton tasksVisibility={tasksVisibility} task='portfolio' minimisingTasks={minimisingTasks} activatingTask={activatingTask}/>
        <Button onClick={()=>{displayingTask(false, 'portfolio')}} onTouchEnd={()=>{displayingTask(false, 'portfolio')}}>
          <span className='close-icon' />
        </Button>
        </div>
        
      </WindowHeader></strong>
      <WindowContent className='window-content'>
    <ProjectTree selectingProject={selectingProject} />
    { projectSelected && projectSelected != "projects" ?
    <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
      <div style={{ display: 'flex', marginBottom: '1rem' }}>
      <TextInput
        value={projects[projectSelected].site}
        placeholder='Project URL'
        readOnly={true}
        fullWidth
       />
       <Button onClick={handleGo} style={{ marginLeft: 4 }}>
         Go
       </Button>
    </div>

    <ScrollView key={projectSelected} style={{ maxWidth: "350px", height: "260px", overflowWrap: 'anywhere' }} className='project-article'>
              <p>{projects[projectSelected].article}</p>
        </ScrollView>
        </div>
         :
         <></>
     }
        
      </WindowContent>
     
    </Window>
  </Wrapper>
  </Draggable>
  )
}

export default PortfolioWindow