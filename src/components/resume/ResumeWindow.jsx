import React, {useState} from 'react';
import ResumePdf from './ResumePdf';
import Draggable from 'react-draggable';
import './scrollview.css';

import {
  Button,
  Window,
  WindowContent,
  WindowHeader,
  ScrollView,
  TextInput,
} from 'react95';
import styled from 'styled-components';
import './resumewindow.scss'
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

const ResumeWindow = ({resumeDisplay, openingResume, activatingResume, resumeActive, indexingWindows, windowIndice, bounds}) => {
  const [state, setState] = useState({
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  });

  const onStart = () => {
    activatingResume(true)
    if (windowIndice.portfolio > windowIndice.browser) {
      indexingWindows({resume: 3, portfolio: 2, browser: 1})
    } else {
      indexingWindows({resume: 3, portfolio: 1, browser: 2})
    }
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };

  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };
  const handleClickInsideWindow = (event) => {
    event.stopPropagation();
    activatingResume(true);
    if (windowIndice.portfolio > windowIndice.browser) {
      indexingWindows({resume: 3, portfolio: 2, browser: 1})
    } else {
      indexingWindows({resume: 3, portfolio: 1, browser: 2})
    }
  };

  return (
    <Draggable bounds={bounds} handle="strong" {...dragHandlers}>
    <Wrapper className="drag-resume" style={{zIndex: windowIndice.resume}}>
    <Window className='resume-window' style={{display: resumeDisplay}} onClick={handleClickInsideWindow}>
    <strong className="cursor"><WindowHeader  active={resumeActive} className='window-title'>
        <span>resume.exe</span>
        <Button onClick={()=>{openingResume('none')}} onTouchStart={()=>{openingResume('none')}}>
          <span className='close-icon' />
        </Button>
      </WindowHeader></strong>
      <WindowContent className='window-content'>
    
    
   
    


    <ScrollView style={{ width: "100%", height: "500px", overflowWrap: 'anywhere' }}>
        
        <ResumePdf />
      
        </ScrollView>
     
        
      </WindowContent>
     
    </Window>
  </Wrapper>
  </Draggable>
  )
}

export default ResumeWindow