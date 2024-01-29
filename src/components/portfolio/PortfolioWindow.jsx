import {useState, useRef, useEffect} from 'react';
import ActiveProjectTree from './ActiveProjectTree';
import InactiveProjectTree from './InactiveProjectTree';
import DraggableComponent from '../DraggableComponent';
import WindowComponent from '../WindowComponent';
import WindowButton from '../buttons/WindowButton';
import {
  Button,
  WindowContent,
  WindowHeader,
  ScrollView,
  TextInput
} from 'react95';
import styled from 'styled-components';
import { projects } from './projects';
import { capitalise } from '../../functions/customFunctions';
import './portfoliowindow.scss'

const Wrapper = styled.div`
  position: absolute;
`;

const PortfolioWindow = ({ displayingTask, setProjectUrl, displayTasks, setActiveTask, activeTask, indexingTasks, taskIndices, tasksVisibility, setTasksVisibility, setPortfolioHeight, setTouchStartY, setDocumentPosition, setTaskSwitiching }) => {
  const task = 'portfolio'
  const [isDraggable, setIsDraggable] = useState(true)
  const initialPosition = window.innerWidth <= 500 ? {x: window.innerWidth*0.04, y: 15} : { x: (window.innerWidth - 600)/3, y: 15 }

  const [projectSelected, setProjectSelected] = useState(null)
  const [selected, setSelected] = useState(null);
  const [expanded, setExpanded] = useState([]);

  const handleGit = (event) => {
    event.stopPropagation();
    const newTab = window.open(projects[projectSelected].git, '_blank');
    newTab.focus();
    }
  const handleGo = (event) => {
  event.stopPropagation();
  setProjectUrl(projects[projectSelected].site);
  const newTasksVisibility = new Object(tasksVisibility)
  newTasksVisibility.browser = 'visible'
  setTasksVisibility(newTasksVisibility)
  setActiveTask('browser')
  indexingTasks('browser')
  displayingTask(true, 'browser')
  }

  const portfolioRef = useRef(null)
  useEffect(() => {
    if (displayTasks.has(task)) {
      setPortfolioHeight(portfolioRef.current.clientHeight);
    } else {
      setPortfolioHeight(0);
    }
  }, [projectSelected, displayTasks]);

  const handleTouchStart = (event) => {
    setTouchStartY(event.touches[0].clientY);
    setDocumentPosition(document.documentElement.scrollTop);
  };

  return (
    <DraggableComponent task={task} initialPosition={initialPosition} setActiveTask={setActiveTask} indexingTasks={indexingTasks} isDraggable={isDraggable} setIsDraggable={setIsDraggable}>
    <Wrapper className="drag-portfolio" ref={portfolioRef} style={{zIndex: taskIndices[task], display: displayTasks.has(task) ? 'block' : 'none', visibility: tasksVisibility.portfolio}}>
    <WindowComponent task={task} setActiveTask={setActiveTask} indexingTasks={indexingTasks} handleTouchStart={handleTouchStart}>
    <strong className="cursor"><WindowHeader active={activeTask == task} className='window-title'>
        <span>{capitalise(task)}</span>
        <div className="buttons">
          <WindowButton purpose='minimise' tasksVisibility={tasksVisibility} task={task} setTasksVisibility={setTasksVisibility} setActiveTask={setActiveTask} setTaskSwitiching={setTaskSwitiching} setIsDraggable={setIsDraggable}/>
          <WindowButton purpose='close' task={task} setActiveTask={setActiveTask} displayingTask={displayingTask} setIsDraggable={setIsDraggable} />
        </div>
        
      </WindowHeader></strong>
      <WindowContent className='window-content'>
    {
      activeTask == task ?
      <ActiveProjectTree setProjectSelected={setProjectSelected} displayTasks={displayTasks} selected={selected} setSelected={setSelected} expanded={expanded} setExpanded={setExpanded}/>
    :
      <InactiveProjectTree setProjectSelected={setProjectSelected} displayTasks={displayTasks} selected={selected} setSelected={setSelected} expanded={expanded} setExpanded={setExpanded}/>
    }
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

        <div style={{ display: 'flex', marginTop: '1rem' }}>
          <TextInput
            value={projects[projectSelected].git}
            placeholder='Project URL'
            readOnly={true}
            fullWidth
          />
          <Button onClick={handleGit} style={{ marginLeft: 4 }}>
            Git
          </Button>
        </div>
    </div>
         :
         <></>
     }
        
      </WindowContent>
    </WindowComponent>
  </Wrapper>
  </DraggableComponent>
  )
}

export default PortfolioWindow