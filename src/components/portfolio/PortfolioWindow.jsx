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

const PortfolioWindow = ({openingBrowser, settingProjectUrl, portfolioDisplay, openingPortfolio, activatingPortfolio, portfolioActive, activatingBrowser, indexingWindows, windowIndice, bounds}) => {
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

   const handleGo = (event) => {
    event.stopPropagation();
    settingProjectUrl(projects[projectSelected].site);
    activatingBrowser(true)
    indexingWindows({portfolio: 6, resume: 5, browser: 7})
    openingBrowser('block')
   }
  const selectingProject = (id) => {
    setProjectSelected(id)
  }
  const onStart = () => {
    activatingPortfolio(true)
    if (windowIndice.resume > windowIndice.browser) {
      indexingWindows({portfolio: 7, resume: 6, browser: 5})
    } else {
      indexingWindows({portfolio: 7, resume: 5, browser: 6})
    }
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };

  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };
  const handleClickInsideWindow = (event) => {
    event.stopPropagation();
    activatingPortfolio(true);
    if (windowIndice.resume > windowIndice.browser) {
      indexingWindows({portfolio: 7, resume: 6, browser: 5})
    } else {
      indexingWindows({portfolio: 7, resume: 5, browser: 6})
    }
  };

  
  return (
    <Draggable bounds={bounds} handle="strong" {...dragHandlers}>
    <Wrapper className="drag-portfolio" style={{zIndex: windowIndice.portfolio}}>
    <Window className='portfolio-window' style={{display: portfolioDisplay}} onClick={handleClickInsideWindow}>
    <strong className="cursor"><WindowHeader  active={portfolioActive} className='window-title'>
        <span>portfolio.exe</span>
        <Button onClick={()=>{openingPortfolio('none')}} onTouchStart={()=>{openingPortfolio('none')}}>
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

    <ScrollView style={{ maxWidth: "300px", height: "260px", overflowWrap: 'anywhere' }} className='project-article'>
        
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