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

const PortfolioWindow = ({openingBrowser, settingProjectUrl, portfolioDisplay, openingPortfolio, activatingPortfolio, portfolioActive, indexingWindows, windowIndice}) => {
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
    indexingWindows({portfolio: 2, resume: 1, browser: 3})
    openingBrowser('block')
   }
  const selectingProject = (id) => {
    setProjectSelected(id)
  }
  const onStart = () => {
    activatingPortfolio(true)
    if (windowIndice.resume > windowIndice.browser) {
      indexingWindows({portfolio: 3, resume: 2, browser: 1})
    } else {
      indexingWindows({portfolio: 3, resume: 1, browser: 2})
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
      indexingWindows({portfolio: 3, resume: 2, browser: 1})
    } else {
      indexingWindows({portfolio: 3, resume: 1, browser: 2})
    }
  };

  
  return (
    <Draggable handle="strong" {...dragHandlers}>
    <Wrapper style={{zIndex: windowIndice.portfolio}}>
    <Window className='portfolio-window' style={{display: portfolioDisplay}} onClick={handleClickInsideWindow}>
    <strong className="cursor"><WindowHeader  active={portfolioActive} className='window-title'>
        <span>portfolio.exe</span>
        <Button onClick={()=>{openingPortfolio('none')}}>
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
   
    


    <StyledScrollView style={{ maxWidth: "300px", height: "260px", overflowWrap: 'anywhere' }}>
        
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

export default PortfolioWindow