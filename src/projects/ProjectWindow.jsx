

import React, {useState} from 'react';
import Draggable from 'react-draggable';
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
const Wrapper = styled.div`
  padding: 5rem;
  position: absolute;
  background: ${({ theme }) => theme.desktopBackground};
  .window-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .close-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: -1px;
    margin-top: -1px;
    transform: rotateZ(45deg);
    position: relative;
    &:before,
    &:after {
      content: '';
      position: absolute;
      background: ${({ theme }) => theme.materialText};
    }
    &:before {
      height: 100%;
      width: 3px;
      left: 50%;
      transform: translateX(-50%);
    }
    &:after {
      height: 3px;
      width: 100%;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .window {
    max-width: 600px;
    display: flex
    min-height: 200px;
  }
  .window-content {
    display: flex;
    max-height: 360px;
    gap: 15px;
  }
  .footer {
    display: block;
    margin: 0.25rem;
    height: 31px;
    line-height: 31px;
    padding-left: 0.25rem;
  }
`;

const StyledScrollView = styled(ScrollView)`
  /* Customize the scrollbar here */
  scrollbar-width: thick;
  ::-webkit-scrollbar {
    width: 20px;
  }
 
  ::-webkit-scrollbar-thumb {
    box-sizing: border-box;
    display: inline-block;
    background: rgb(198, 198, 198);
    color: rgb(10, 10, 10);
    border-style: solid;
    border-width: 2px;
    border-color: rgb(223, 223, 223) rgb(10, 10, 10) rgb(10, 10, 10) rgb(223, 223, 223);
    box-shadow: rgb(254, 254, 254) 1px 1px 0px 1px inset, rgb(132, 133, 132) -1px -1px 0px 1px inset;
    outline-offset: -2px;
    
  }
  ::-webkit-scrollbar-track {
    background-image: linear-gradient(45deg, rgb(198, 198, 198) 25%, transparent 25%, transparent 75%, rgb(198, 198, 198) 75%), linear-gradient(45deg, rgb(198, 198, 198) 25%, transparent 25%, transparent 75%, rgb(198, 198, 198) 75%);
    background-color: rgb(254, 254, 254);
    background-size: 4px 4px;
    background-position: 0px 0px, 2px 2px;
}
`;

const ProjectWindow = () => {
  const [projectSelected, setProjectSelected] = useState(null)
  const [windowDisplay, setWindowDisplay] = useState('block')
  const [state, setState] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  });

    const handleClose = () => {
      setWindowDisplay('none')
    }
   const handleGo = () => {
    console.log(projects[projectSelected].site);
   }
  const selectingProject = (id) => {
    setProjectSelected(id)
  }
  const onStart = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };

  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
 
  const dragHandlers = { onStart, onStop };

  return (
    <Draggable handle="strong" {...dragHandlers}>
    <Wrapper>
    <Window className='window' style={{display: windowDisplay}}>
    <strong className="cursor"><WindowHeader  active={true} className='window-title'>
        <span>portfolio.exe</span>
        <Button onClick={handleClose}>
          <span className='close-icon' />
        </Button>
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
   
    


    <StyledScrollView style={{ width: "100%", height: "260px", overflowWrap: 'anywhere' }}>
        
          <p>{projects[projectSelected].article}</p>
      
        </StyledScrollView>
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

export default ProjectWindow