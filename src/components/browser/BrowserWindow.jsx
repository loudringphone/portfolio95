import React, {useState} from 'react';
import Draggable from 'react-draggable';
import {
  Button,
  Window,
  WindowContent,
  WindowHeader,
} from 'react95';
import styled from 'styled-components';
import './browserwindow.scss'
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

const BrowserWindow = ({settingProjectUrl, projectUrl, browserDisplay, openingBrowser, activatingBrowser, browserActive, indexingWindows, windowIndice, bounds}) => {
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
    activatingBrowser(true)
    activatingBrowser(true);
    if (windowIndice.portfolio > windowIndice.resume) {
      indexingWindows({browser: 3, portfolio: 2, resume: 1})
    } else {
      indexingWindows({browser: 3, portfolio: 1, resume: 2})
    }
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags + 1 }));
  };

  const onStop = () => {
    setState(prevState => ({ ...prevState, activeDrags: prevState.activeDrags - 1 }));
  };
  const dragHandlers = { onStart, onStop };
  const handleClickInsideWindow = (event) => {
    event.stopPropagation();
    activatingBrowser(true);
    if (windowIndice.portfolio > windowIndice.resume) {
      indexingWindows({browser: 3, portfolio: 2, resume: 1})
    } else {
      indexingWindows({browser: 3, portfolio: 1, resume: 2})
    }
  };

  const handleClose = () => {
    openingBrowser('none')
    settingProjectUrl(null)
  }
  return (
    <Draggable bounds={bounds} handle="strong" {...dragHandlers}>
    <Wrapper className="drag-browser" style={{zIndex: windowIndice.browser}}>
    <Window className='browser-window' style={{display: browserDisplay}} onClick={handleClickInsideWindow}>
    <strong className="cursor"><WindowHeader  active={browserActive} className='window-title'>
        <span>browser.exe</span>
        <Button onClick={handleClose} onTouchStart={handleClose}>
          <span className='close-icon' />
        </Button>
      </WindowHeader></strong>
      <WindowContent className='window-content'style={{ height: "500px" }}>
    {/* <StyledScrollView style={{ width: "100%", height: "500px", overflowWrap: 'anywhere' }} className='browser-view' > */}
      <div className='browser-screen' style={{display: browserActive?"none":"block"}}></div>
      <iframe
        src={projectUrl}
        width="100%"
        height="100%"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        scrolling="yes"
      />
      
        {/* </StyledScrollView> */}
     
        
      </WindowContent>
     
    </Window>
  </Wrapper>
  </Draggable>
  )
}

export default BrowserWindow