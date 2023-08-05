import React, {useState} from 'react';
import ResumePdf from './ResumePdf';
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

const ResumeWindow = ({resumeDisplay, openingResume, activatingResume, resumeActive, indexingWindows, windowIndex}) => {
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
    indexingWindows({resume: 2, portfolio: 1})
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };

  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };
  const handleClickInsideWindow = (event) => {
    event.stopPropagation();
    activatingResume(true);
    indexingWindows({resume: 2, portfolio: 1})
  };
  return (
    <Draggable handle="strong" {...dragHandlers}>
    <Wrapper style={{zIndex: windowIndex}}>
    <Window className='resume-window' style={{display: resumeDisplay}} onClick={handleClickInsideWindow}>
    <strong className="cursor"><WindowHeader  active={resumeActive} className='window-title'>
        <span>resume.exe</span>
        <Button onClick={()=>{openingResume('none')}}>
          <span className='close-icon' />
        </Button>
      </WindowHeader></strong>
      <WindowContent className='window-content'>
    
    
   
    


    <StyledScrollView style={{ width: "100%", height: "500px", overflowWrap: 'anywhere' }}>
        
        <ResumePdf />
      
        </StyledScrollView>
     
        
      </WindowContent>
     
    </Window>
  </Wrapper>
  </Draggable>
  )
}

export default ResumeWindow